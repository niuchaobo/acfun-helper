import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";
import { Encylopedia } from "@/Declare/Std";

export interface Conf {
    enable: boolean
}

let allOptions: Conf;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.videoAndBangumi)) {
        return
    }
    modLog("Init", module.name, "main")
    GetAsyncDOM.Get(".box-right",appendUI)
}

const foward = (mode: "f" | "b") => {
    const frameRate = getVideoFrameRate()
    if (frameRate != undefined && !document.activeElement?.hasAttribute("contentEditable")) {
        document.getElementsByTagName("video")?.[0].pause();
        switch (mode) {
            case "f":
                document.getElementsByTagName("video")[0].currentTime += 1000 / frameRate;
                break;
            case "b":
                document.getElementsByTagName("video")[0].currentTime -= 1000 / frameRate;
                break;
        }
    }
}

const getVideoFrameRate = () => {
    const qualityMenu = document.querySelector("div.control-btn.quality");
    if (qualityMenu == null) {
        return
    }
    const vQuality = (qualityMenu.children[0] as HTMLDivElement).innerText;
    const frameRateExp = new RegExp("[0-9].*p([0-9].*)");
    let vFrameRate: RegExpExecArray | null = null;
    //假如是自动画质选项，那么稳定之后的画质应该是当前稿件可选画质的最高选项，我们获取到最高选项之后在画质参考选项中获取名称，然后获取标准帧率。
    if (vQuality == "自动") {
        const referQuality = qualityMenu.children[1].children[0].children[0] as unknown as HTMLElement
        if (!referQuality.dataset["qualityType"]) {
            return
        }
        vFrameRate = frameRateExp.exec(Encylopedia.videoQualitiesRefer[referQuality.dataset.qualityType].qualityType);
    }
    //如果选定了画质，那么直接在画质参考中获取标准帧率。
    if (vFrameRate) {
        return Encylopedia.standardFrameRate[vFrameRate[1]];
    } else {
        //如果没有已经选择的参考画质和帧率，那么就以24帧为标准。
        return Encylopedia.standardFrameRate["24"];
    }
}

const appendUI = () => {
    const contentElem = `<div id="AcFunHelperAnot-frameStep" class="control-btn speed AcFunHelperAnot">
      <div class="speed-panel frameStep-panel">
        <ul>
          <li id="AcFunHelperAnot-PerFrameStep-f" data-mode="f"">下一帧</li>
          <li id="AcFunHelperAnot-PerFrameStep-b" data-mode="b"">上一帧</li>
        </ul>
            <div class="transparent-placeholder"></div>
      </div>
      <svg t="1628246559047" style="transform: scale(0.3);" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3172" width="200" height="200"><path d="M475.542857 961.142857c-9.371429 0-18.742857-3.542857-25.942857-10.742857-14.285714-14.285714-14.285714-37.485714 0-51.885714L836.228571 512 449.6 125.485714c-14.285714-14.285714-14.285714-37.485714 0-51.885714 14.285714-14.285714 37.485714-14.285714 51.885714 0l412.457143 412.457143c14.285714 14.285714 14.285714 37.485714 0 51.885714L501.485714 950.4c-7.2 7.2-16.571429 10.742857-25.942857 10.742857z" fill="#ffffff" p-id="3173"></path><path d="M169.257143 961.142857c-9.371429 0-18.742857-3.542857-25.942857-10.742857-14.285714-14.285714-14.285714-37.485714 0-51.885714L529.942857 512 143.314286 125.485714c-14.285714-14.285714-14.285714-37.485714 0-51.885714 14.285714-14.285714 37.485714-14.285714 51.885714 0l412.457143 412.457143c14.285714 14.285714 14.285714 37.485714 0 51.885714L195.2 950.4c-7.2 7.2-16.571429 10.742857-25.942857 10.742857z" fill="#ffffff" p-id="3174"></path></svg>`;
    jQuery(".box-right").prepend(contentElem);
    jQuery("#AcFunHelperAnot-PerFrameStep-f").on("click", (e: JQuery.TriggeredEvent) => {foward("f")})
    jQuery("#AcFunHelperAnot-PerFrameStep-b").on("click", (e: JQuery.TriggeredEvent) => {foward("b")})
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "PerFrameStep",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}