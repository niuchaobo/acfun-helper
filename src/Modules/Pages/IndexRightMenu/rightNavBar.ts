import { GetAsyncDOM } from "@/Core/CoreUtils";
import { REG, isTargetPage } from "@/Core/Regs";
import { ModuleStd } from "@/Declare/FeatureModule";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import "./backTopAsCtr.scss"

let navItems: { name: string; title: string; id: string }[] = [];
let container: HTMLDivElement;
let bannedPart = [];
export const presetList = [
    { name: '排行', id: 'pagelet_top_area', title: '？' },
    { name: '正在直播', id: 'pagelet_live', title: '单推还是DD？' },
    { name: '猴子推荐', id: 'pagelet_monkey_recommend', title: '吃我五蕉啦！' },
    { name: '香蕉榜', id: 'pagelet_list_banana', title: '为什么只能投5蕉' },
    { name: '动画', id: 'pagelet_douga', title: '' },
    { name: '游戏', id: 'pagelet_game', title: '' },
    { name: '娱乐', id: 'pagelet_amusement', title: '' },
    { name: '番剧', id: 'pagelet_bangumi_list', title: '' },
    { name: '生活', id: 'pagelet_life', title: '' },
    { name: '科技', id: 'pagelet_tech', title: '' },
    { name: '舞蹈', id: 'pagelet_dance', title: '' },
    { name: '音乐', id: 'pagelet_music', title: '' },
    { name: '影视', id: 'pagelet_film', title: '' },
    { name: '鱼塘', id: 'pagelet_fishpond', title: '' },
    { name: '体育', id: 'pagelet_sport', title: '' },
]
const transName: Record<string, string> = { "舞蹈·偶像": "舞蹈" }
const partNameProc = (rawName: string) => {
    return Object.keys(transName).includes(rawName) ? transName[rawName] : rawName;
}

//点击之后的滑动到相应的分区的动作
const scrollEventHandler = (e: any) => {
    e.stopPropagation();
    const target = document.querySelector("#" + e.target.getAttribute("data-id")) as HTMLElement;

    globalThis.scrollTo({
        //60(header)+45(navBar)+20(extra)
        top: target.offsetTop - 125,
        left: 0,
        behavior: "smooth",
    })
}

const collectItem = () => {
    const mainBody = document.querySelector(".home-main-content");
    if (!mainBody) {
        return false;
    }
    //根据主页各个分区版块的标题获取内容
    let items = Array.from(mainBody.children);
    for (const i in items) {
        const item = items[Number(i)];
        const titleDom = item?.querySelector(".header-title") as HTMLSpanElement;
        const subtitleDom = item?.querySelector(".header-subtitle") as HTMLSpanElement;
        if (titleDom) {
            navItems.push({
                "name": partNameProc(titleDom.innerText),
                "id": titleDom.id,
                "title": !!subtitleDom ? subtitleDom.innerText : "",
            })
        }
    }

    return true;
}

const applyMenu = () => {
    //列表没有获取好，还是用预置的列表吧
    if (navItems.length < presetList.length) {
        navItems = presetList;
        modLog("RightNavBar Init", module.name, "main");
    }

    const outer = document.createElement("div");
    outer.id = "AcFunHelperAnot-right-nav";
    container.appendChild(outer);

    for (let item of navItems) {
        const inner = document.createElement("div");

        inner.classList.add("AcFunHelperAnot-right-nav-item");
        inner.innerText = item.name;
        inner.title = item.title;
        inner.dataset.id = item.id;

        outer.appendChild(inner);
    }
    //挂载事件钩子
    outer.addEventListener("click", scrollEventHandler);
    return true;
}

const adjustContainer = () => {
    if (!container) {
        return false
    }
    //add style
    container.classList.add("AcFunHelperAnot-backTopCtr");
    return true
}

const main = () => {
    if (!isTargetPage(REG.index)) {
        return
    }
    GetAsyncDOM.Get("#back-top", () => {
        let containerCandi = document.querySelector("div#back-top") as HTMLDivElement;
        containerCandi && (container = containerCandi);
    })
    //收集分区信息
    if (!collectItem()) {
        return
    }
    //准备外部容器
    if (!adjustContainer()) {
        return
    }
    //应用菜单项
    if (!applyMenu()) {
        return
    }
}

export const module: ModuleStd.manifest = {
    name: "RightNavBar",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main,
}