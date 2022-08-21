import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { panelSwitchesHandler, batchOprtSwitches } from "../../pagehandlerLibs.js"
import { removeExtalElem, userAddWrap } from "../../pagehandlerLibs.js";
import { saveConfromIndexDic } from "../../pagehandlerLibs.js";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/SettingPanel/Utils/AutoBanana.vue")).template,
    data() {
        return {
            /**@type {[{bananaNum:string,name:string,uid:string,up_url:string}]} */
            raw: [],
            isToFollowed: false,
            memberNum: 0,
        }
    },
    methods: {
        switchHandler: panelSwitchesHandler,
        removeUser: function (e) {
            const target = e.target;
            const id = target.parentElement.children[0].dataset.key;
            const name = target.parentElement.children[0].dataset.name;
            const bananaNum = target.parentElement.children[0].dataset.num;
            this.delFromRaw(id);

            mdui.snackbar({
                message: '已将 ' + name + " 移除特别重要人物列表，通知消失后将会写入配置。",
                buttonText: '撤销',
                onButtonClick: async () => {
                    this.addFromRaw({
                        bananaNum: bananaNum,
                        name: name,
                        uid: id,
                        up_url: "https://www.acfun.cn/u/" + id
                    })
                    this.memberNum++;
                },
                onClose: () => {
                    saveConfromIndexDic(this.raw)
                    this.memberNum--
                },
            });
        },
        addUser: function () {
            mdui.prompt('请输入用户UID 或者 用户中心链接', '添加', async (e) => {
                userAddWrap(this.fromRawUpdateList(), e, (userInfo, userid) => {
                    const name = userInfo.profile.name;
                    mdui.prompt('请输入需要给予用户每个稿件的香蕉数量', '添加', async (bananaNum) => {
                        if (/^[1-5]$/.test(bananaNum)) {
                            this.addFromRaw({
                                bananaNum: bananaNum,
                                name: name,
                                uid: userid,
                                up_url: `https://www.acfun.cn/u/${userid}`
                            })
                            this.memberNum++;
                            saveConfromIndexDic(this.raw)
                        } else {
                            mdui.alert("一个投稿也许不能投除了0-5这些数字以外的蕉；逻辑错乱.jpg")
                        }
                    })
                })
            })
        },
        changeNum: function (e) {
            /**@type {HTMLElement} */
            const target = e.target;
            const infoEle = target.parentElement.parentElement.children[0];
            const uid = infoEle.dataset.key;
            const name = infoEle.dataset.name;
            mdui.prompt('请输入需要修改的每个稿件的香蕉数量', '修改', async (bananaNum) => {
                if (/^[1-5]$/.test(bananaNum)) {
                    this.delFromRaw(uid);
                    this.addFromRaw({
                        bananaNum: bananaNum,
                        name: name,
                        uid: uid,
                        up_url: `https://www.acfun.cn/u/${uid}`
                    })
                    saveConfromIndexDic(this.raw)
                } else {
                    mdui.alert("一个投稿也许不能投除了0-5这些数字以外的蕉；逻辑错乱.jpg")
                }
            })
            //刷新
            this.$nextTick(() => {
                this.refresh = true;
            })
        },
        fromRawUpdateList: function () {
            const list = [];
            for (let i in this.raw) {
                list[this.raw[i].uid] = this.raw[i]
            }
            return list
        },
        addFromRaw: function (f) {
            let newData = [];

            for (let i in this.raw) {
                const e = this.raw[i];
                newData.push({
                    bananaNum: e.bananaNum,
                    name: e.name,
                    uid: e.uid,
                    up_url: e.up_url
                })
            }
            newData.push({
                bananaNum: f.bananaNum,
                name: f.name,
                uid: f.uid,
                up_url: f.up_url
            })
            this.raw = newData;
        },
        delFromRaw: function (id) {
            let newData = [];

            for (let i in this.raw) {
                const e = this.raw[i];
                if (e.uid == id) {
                    continue
                }
                newData.push({
                    bananaNum: e.bananaNum,
                    name: e.name,
                    uid: e.uid,
                    up_url: e.up_url
                })
            }
            this.raw = newData;
        }
    },
    mounted: async function () {
        batchOprtSwitches([
            { key: "auto_throw" },
            { key: "articleBanana" },
            { key: "banana_notice" },
            { key: "audioAfterBanana" },
        ]);
        const to_attention = await ExtOptions.getValue("to_attention");

        this.isToFollowed = !!(to_attention);

        document.querySelector("#to_attention").parentElement.children[1].children[1].children[to_attention ? 0 : 1].click();
        document.querySelector("#to_attention").addEventListener("close.mdui.select", (e) => {
            this.isToFollowed = JSON.parse(e.detail.inst.value);
            ExtOptions.setValue("to_attention", JSON.parse(e.detail.inst.value));
        });

        if (to_attention) {
            const to_attention_num = await ExtOptions.getValue("to_attention_num");
            document.querySelector("#to_attention_num").parentElement.children[1].children[1].children[to_attention_num - 1].click();
            document.querySelector("#to_attention_num").addEventListener("close.mdui.select", (e) => {
                ExtOptions.setValue("to_attention_num", e.detail.inst.value);
            });
        }

        this.raw = await ExtOptions.getValue("to_special_items")
        if (!!this.raw) {
            await ExtOptions.setValue("to_special_items", {});
        }
        this.memberNum = Object.keys(this.raw).length

        removeExtalElem("#to_attention")
        removeExtalElem("#to_attention_num")
    }
}

export const autoBanana = app