import { ModuleStd } from "@/Declare/FeatureModule";

export interface RegEntry {
    enabled: boolean;
    option: chrome.alarms.AlarmCreateInfo
    task: Array<(...e: any) => any>
}

const triggerReg: Record<string, RegEntry> = {

}

const main = async (modules: Record<ModuleStd.lordManifest["name"], ModuleStd.manifest>) => {
    addMods(modules).then(() => {
        addTriggers()
        chrome.alarms.onAlarm.addListener(onAlarmFired);
    })
}

const addMods = async (modules: Record<ModuleStd.lordManifest["name"], ModuleStd.manifest>) => {
    for (let modName in modules) {
        const module = modules[modName];
        triggerReg[modName] = await module.main();
    }
}

const addTriggers = () => {
    for (let taskName in triggerReg) {
        const task = triggerReg[taskName];
        if (!(task.enabled)) {
            continue
        }
        if (!("option" in task)) {
            continue
        }
        chrome.alarms.create(taskName, task.option);
    }
}

const onAlarmFired = (e: chrome.alarms.Alarm) => {
    const taskItem = triggerReg[e.name];
    taskItem.task.forEach(c => {
        c();
    })
}

export const lord: ModuleStd.lordManifest = {
    name: "Scheduler",
    requiredSequentialType: ModuleStd.SequentialType.onScheduleTaskReg,
    main
}