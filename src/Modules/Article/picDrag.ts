import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { FgBroadcastChannelName, isTargetPage, REG } from "@/Core/Regs";
import { addElement } from "@/Utils/GUI/dom";

interface Conf {
    enable: boolean
}

let allOptions: Conf;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }
    const MsgSw = new BroadcastChannel(FgBroadcastChannelName);

    if (!isTargetPage(REG.article)) {
        return
    }
    modLog("Init", module.name, "main")
    picDrag();
}


/**
 * 文章区漫画模式图片拖动支持
 * @param rotateSup 启用旋转支持
 * @refer https://www.acfun.cn/a/ac17306571
 * @author 奋不顾身 - https://www.acfun.cn/u/684816
 */
const picDrag = () => {
    //文章区漫画模式支持拖动
    let mangaNode = document.querySelector('#area-window') as HTMLDivElement;
    if (!mangaNode) {
        modLog("can't find #area-window", module.name, "picDrag")
        return
    }
    let mangaOptions = { attributes: false, childList: true, subtree: false, attributeOldValue: false };

    //监听是否点击图片进入了漫画模式
    let mangaObserver = new MutationObserver(() => {
        const headerElem = document.querySelector("#header") as HTMLElement;
        if (document.querySelector('#box-image-manga')) {
            headerElem.style.display = "none";
            drag();
            picRotate();
        } else {
            headerElem.style.display = "block";
        }
    });
    mangaObserver.observe(mangaNode, mangaOptions);
}

/**
 * 文章区漫画模式图片拖动支持 - 响应函数
 */
const drag = () => {
    let dv = document.querySelector('#box-image-manga') as HTMLElement;
    if (!dv) {
        modLog("can't find #box-image-manga", module.name, "drag")
        return
    }
    let isDown = false;
    let x = 0;
    let y = 0;
    let l = 0;
    let t = 0;
    //鼠标按下事件
    dv.onmousedown = function (e) {
        e.preventDefault();
        //获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;
        //获取左部和顶部的偏移量
        l = dv.offsetLeft;
        t = dv.offsetTop;
        //开关打开
        isDown = true;
        //设置样式
        dv.style.cursor = 'move';
    }
    //鼠标移动
    window.onmousemove = function (e) {
        if (isDown == false) {
            return;
        }
        //获取x和y
        let nx = e.clientX;
        let ny = e.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        let nl = nx - (x - l);
        let nt = ny - (y - t);

        dv.style.left = nl + 'px';
        dv.style.top = nt + 'px';
    }
    //鼠标抬起事件
    window.onmouseup = function () {
        // document.querySelector("#header").style.display = "block";
        //开关关闭
        isDown = false;
        dv.style.cursor = 'default';
    }
}

let curRotAngle = 0;

const picRotate = () => {
    const areaToolElem = document.querySelector("#area-tool-manga") as HTMLElement;
    const feedbackBtnElem = document.querySelector("#btn-feedback-manga") as HTMLElement;
    const targetImg = document.querySelector("#box-image-manga > img") as HTMLImageElement;
    if (!areaToolElem && !feedbackBtnElem) {
        modLog("can't find required element", module.name, "picRotate")
        return
    }
    addElement({ tag: "a", id: "btn-feedback-manga", classes: "btn primary", thisHTML: `<i class="icon icon-arrow-round-right"></i>旋转45°`, target: areaToolElem, createMode: "headPrepend" })
    feedbackBtnElem.addEventListener('click', () => {
        curRotAngle += 45;
        targetImg.style.transform = `rotate(${(curRotAngle) % 360}deg)`;
    });
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "ArticlePicDrag",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}
