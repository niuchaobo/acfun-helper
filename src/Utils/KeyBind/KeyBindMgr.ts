import { tinykeys,createKeybindingsHandler, KeyBindingMap } from "tinykeys"

export class KeyBindMgr {
    bindRelation: Record<string, Record<string, (e: any) => any>>;
    tinyKeyHandler: EventListener;
    bindConfigure: KeyBindingMap;

    constructor() {
        this.bindRelation = {};
        this.tinyKeyHandler = () => { };
        this.bindConfigure = {}
    }

    Hook() {
        this.tinyKeyHandler = createKeybindingsHandler(this.bindConfigure);
    }
}