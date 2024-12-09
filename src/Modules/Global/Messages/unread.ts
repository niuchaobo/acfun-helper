import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { getUnreadMessage, UnReadCount } from "@/Utils/Api/unread/check";

interface Conf {
    enable: boolean
}

let allOptions: Conf;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return {
            enabled: false,
            item: {},
            trigger: () => { },
        }
    }
    return {
        enabled: true,
        option: { periodInMinutes: 1 },
        task: [async () => {
            const resp = await getUnreadMessage();
            if (resp.result != 0) {
                return
            }
            const allCount = countAll(resp.unReadCount);
            if(allCount<=0){
                return
            }
            updateBadge();
            checkMsg();
        },]
    }

}

const countAll = (e: Record<keyof UnReadCount, number>) => {
    let allNum = 0;
    const allName = Object.keys(e) as Array<keyof UnReadCount>;
    allName.forEach(n => {
        allNum += e[n];
    })
    return allNum;
}

const updateBadge = () => {

}

const checkMsg = () => {

}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "UnreadMsg",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Background,
    sequentialType: ModuleStd.SequentialType.onScheduleTaskReg,
    main
}