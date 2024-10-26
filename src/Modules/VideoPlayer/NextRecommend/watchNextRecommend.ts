import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";

interface Conf {
    enable: boolean
}

let allOptions: Conf;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.video)) {
        return
    }
    modLog("Init", module.name, "main")

    document.getElementsByTagName("video")[0].addEventListener("ended", function () {
        const _timer = setTimeout(() => {
            $(".left-bottom-tip").eq(0).children().eq(0).remove();
            const recommendationItem = document.getElementsByClassName("recommendation")[0].children[1].children[0] as HTMLAnchorElement;
            recommendationItem?.click();
        }, 5000);

        const recommendationArea = document.querySelector(".area.recommendation") as HTMLDivElement;
        const descElem = recommendationArea?.children[0].children[1] as HTMLElement;
        const nameElem = descElem.children[0] as HTMLElement;
        const upnameElem = descElem.children[0] as HTMLElement;

        $(".left-bottom-tip").eq(0).append(`
            <div class="tip-item muted" id="cancelRecommand" ><div class="left-bottom-tip-text"><span>5秒后播放：《${nameElem.innerText}》 ${upnameElem.innerText.replace("UP：", "")}</span>&nbsp;&nbsp;<span><a style='color:red;cursor: pointer;' id="cancelRecommand">取消</span></div></div>
        `);

        const cancleBtn = document.querySelector("#cancelRecommand") as HTMLElement;
        cancleBtn?.addEventListener("click", () => {
            $(".left-bottom-tip").eq(0).children().eq(0).remove();
            clearTimeout(_timer);
        })
    });
}

export const defaultConf: Conf = {
    enable: false
}

export const module: ModuleStd.manifest = {
    name: "NextRecommend",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}