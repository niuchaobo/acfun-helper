<template lang="html">
    <div id="AcFunHelperAnot-danmaku-search" @click="start">
        <Transition>
            <div id="AcFunHelperAnot-danmaku-search-title" v-show="isTitleShow">弹幕搜索</div>
        </Transition>
        <div class="AcFunHelperAnot-danmaku-search-content" style="display:flex">
            <input id='AcFunHelperAnot-danmaku-search-input' v-model="searchContent" style="flex:1" @focus="">
            <div id='AcFunHelperAnot-danmaku-search-button' @click="searchStart" @keypress="searchStart"
                class="AcFunHelperAnot-danmaku-search-button"
                :class="{ btnUnHide: !buttonStatus, btnHide: buttonStatus }">
                ⏎
            </div>
            <div id='AcFunHelperAnot-danmaku-search-last' @click="searchLast"
                :class="{ btnHide: buttonStatus, btnUnHide: !buttonStatus }"
                class="AcFunHelperAnot-danmaku-search-button">
                △
            </div>
            <div id='AcFunHelperAnot-danmaku-search-next' @click="searchNext"
                :class="{ btnHide: buttonStatus, btnUnHide: !buttonStatus }"
                class="AcFunHelperAnot-danmaku-search-button">
                ▽
            </div>
            <!-- 
            <div id='AcFunHelperAnot-danmaku-search-close' @click="searchClose"
                class="AcFunHelperAnot-danmaku-search-button" style="flex:.2;font-weight:bold">
                ✕
            </div>
            -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { GetAsyncDOM } from '@/Core/CoreUtils';
import { addElement } from '@/Utils/GUI/dom';
import { ref } from 'vue';
let lock = ref(true);
let buttonStatus = ref(false);
let searchContent = ref("");
let isTitleShow = ref(true);
let searchList: Array<Array<{ "time": string, "offsetTop": number, "item": HTMLElement, }>> = [];
let index = 0;
let locatedPageNum = 0;
const otherColor = { background: "#ff00001f", color: "#999999" };
const selectColor = { background: "red", color: "white" };

const start = () => {
    isTitleShow.value = false;
}

const inputFocus = () => {
    lock.value = true;
    buttonStatus.value = true;
}

const searchNext = () => {
    SearchMove("next")
}

const searchLast = () => {
    SearchMove("last")
}

const SearchMove = (type: "next" | "last" = "next") => {
    let canChangePage = !$(".next-page").hasClass("disabled");
    if (type == "next") {
        index += 1
        if (searchList[locatedPageNum] != undefined && index != searchList[locatedPageNum].length) {
            JumpTo(locatedPageNum, index);
        } else {
            index = 0;
            if (canChangePage) {
                console.log("page=================change===============", locatedPageNum);
                $(".next-page").trigger("click");
                $("#danmaku .list-body").scrollTop(0);
                locatedPageNum += 1
                //在点击下一页之后，弹幕列表的转换的时序不是连续的，在不定时间之后内容才会更换，所以我打算在原本的列表中加入一个tag放在最前或最后，这样的话首先判断tag还在不在，不在的话就可以安全执行了，如果在的话就等待这个tag对象被覆盖
                const probe = new GetAsyncDOM("", () => {
                    Search(locatedPageNum);
                }, 3000, true, () => { }, "", false, 30000, () => {
                    const target = document.querySelector(".danmaku-items")?.children[0] as HTMLDivElement
                    if (!target) {
                        return false
                    }
                    console.log(target?.id)
                    return target?.id != "AcFunHelperAnot-danmaku-note";
                },)
                probe.probe();
            }
        }
    } else {
        index -= 1
        if (index < 0) {
            if (locatedPageNum > 0) {
                locatedPageNum -= 1;
                $(".last-page").trigger("click");
            }
            index = 0
        }
        JumpTo(locatedPageNum, index);
    }
}

const searchClose = () => {
    searchInit();
    GetAsyncDOM.Get(".danmaku-item", Search, 200);
}

const searchStart = () => {
    if (!lock.value) {
        return
    }
    if (!searchContent) {
        return
    }
    console.log(lock.value, searchContent)
    searchInit();
    GetAsyncDOM.Get(".danmaku-item", Search, 200);
}


const searchInit = () => {
    //去掉背景
    searchList.forEach((item, index) => {
        $(item).css({ background: "", color: "" });
    });
    //初始化
    searchList = [];
    index = 0;
    //滚动到最顶上
    $("#danmaku .list-body").scrollTop(0);
}

const Search = (pageNum: number = 0) => {
    const insertParent = document.querySelector("ul.danmaku-items");
    if (insertParent != null) {
        addElement({ "id": "AcFunHelperAnot-danmaku-note", "createMode": "headChildAppend", "target": insertParent, "tag": "div" })
    }
    const a = $("#danmaku .danmaku-item").get();
    if (!a.length) {
        return
    }
    searchList[pageNum] = []
    a.forEach((item, index) => {
        if (item == null) {
            return
        }
        const danmakuContent = item?.getAttribute("data-message");
        if (danmakuContent && danmakuContent.includes(searchContent.value)) {
            console.log(danmakuContent)
            const targetItem = $(item);
            const listBody = $(".list-body");
            if (targetItem != undefined && targetItem.length) {
                const targetOffset = targetItem?.offset();
                const listBodyOffset = listBody.offset();
                if (!targetOffset || !listBodyOffset) {
                    return
                }
                searchList[pageNum].push({
                    time: item.getAttribute("data-time") ?? "",
                    offsetTop: targetOffset.top - listBodyOffset.top,
                    item: item,
                });
            }
        }
    });
    lock.value = false;
    buttonStatus.value = false;
    JumpTo(locatedPageNum, index);
    // locatedPageNum = parseInt($(".cur-page").text().trim().slice(1, -1)) ?? 1;
    // searchCounterReload();
}

const searchCounterReload = () => {
    $(".danmaku-items").off("DOMNodeInserted");
    $(".danmaku-items").on("DOMNodeInserted", () => {
        debounce(() => {

        }, 500)
    });
}

const JumpTo = (pageNum: number, targetIndex: number) => {
    console.log(pageNum, index, targetIndex, searchList)
    if (!searchList[pageNum].length) {
        return
    }
    if (targetIndex == -1) {
        targetIndex = searchList[pageNum].length - 1;
    }
    searchList[pageNum].forEach((item, i) => {
        if (i == targetIndex) {
            $(item.item).css(selectColor);
            $("#danmaku .list-body").scrollTop(item.offsetTop);
        } else {
            $(item.item).css(otherColor);
        }
    })
}

</script>

<style lang="scss">
.AcFunHelperAnot-danmaku-search-button {
    display: inline-block;
    cursor: pointer;
    user-select: none;
    text-align: center;
    transition-duration: 0.5s;
    padding: 0px 5px;
}

#AcFunHelperAnot-danmaku-search-input {
    width: 100px;
    font-size: 10px;
    height: 18px;
    margin-top: 5px;
}

#AcFunHelperAnot-danmaku-wrapper {
    position: absolute;
    right: 0px;
    z-index: 1000;
    height: 30px;
    width: 184px;
    line-height: 30px;
    margin-left: 5px;
    padding-left: 5px;
    overflow: hidden;
}

.btnUnHide {
    flex: .2;
    display: inline-block
}

.btnHide {
    flex: .2;
    display: none
}
</style>