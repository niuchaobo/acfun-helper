import { tinykeys, KeyBindingMap } from "tinykeys";

const bindRelation: KeyBindingMap = {}

/** 快捷键<>事件处理<>钩子 */
/** 快捷键对钩子的关系 */
const EventHandler = (e: KeyboardEvent) => {
    const keyNameStr = KeyListToStr(EventToKeyName(e))
    bindRelation[keyNameStr].call(this, e)
}

const Add = (key: string, trigger: (e: any) => any, force: boolean = false): boolean => {
    if (Object.keys(bindRelation).includes(key) && !force) {
        return false
    }
    bindRelation[key] = trigger;
    return true
}

const Del = (key: string): boolean => {
    if (!Object.keys(bindRelation).includes(key)) {
        return false
    }
    bindRelation[key] = () => { };
    return true
}

const Hook = (hostEle?: HTMLElement | Window) => {
    const actDic: Record<string, (e: any) => any> = {};
    Object.keys(bindRelation).forEach(e => {
        actDic[e] = EventHandler;
    })
    tinykeys(hostEle ?? window, actDic);
}

const EventToKeyName = (e: KeyboardEvent): [string[], string] => {
    const list: [string[], string] = [[], ""] as unknown as [string[], string];
    e.altKey ? list[0].push("Alt") : ""
    e.shiftKey ? list[0].push("Shift") : ""
    e.ctrlKey ? list[0].push("Ctrl") : ""
    e.metaKey ? list[0].push("Meta") : ""

    list[1] = e.key
    return list
}

const KeyNameToEventList = (raw: string): [string[], string] => {
    let rawList = raw.split("+")
    const list: [string[], string] = [[], ""] as unknown as [string[], string];

    rawList.forEach(e => {
        e.length == 1 ? list[1] = e : list[0].push(e)
    })
    return list
}

const KeyListToStr = (raw: [string[], string]): string => {
    let upperKets = ""
    raw[0].forEach(e => {
        upperKets += (e + "+")
    })
    upperKets += raw[1];
    return upperKets
}

export const KeyBindMgr = {
    bindRelation, EventHandler, Add, Del, Hook,
    EventToKeyName, KeyListToStr, KeyNameToEventList,
}