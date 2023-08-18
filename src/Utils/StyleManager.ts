export class GlobalStyleManager {
    handlers: Record<string, HTMLStyleElement>
    constructor() {
        this.handlers = {}
    }

    //todo 可能还需要监听head有没有style标签加入
    initProbe() {
        document.querySelectorAll("style").forEach(e => {
            if (e.id && /^AcFunHelper.*/.test(e.id)) {
                const target = document.querySelector("style#" + e.id) as HTMLStyleElement;
                if (target != null) {
                    this.handlers[e.id] = target;
                }
            }
        })
    }

    add(rawName: string, id: string, content: string, specialTarget?: Element): boolean {
        const name = "AcFunHelper_" + rawName + "_" + id;
        if (!!this.handlers[name]) {
            return false;
        } else {
            const element = this.createStyleElement(name, content);
            this.handlers[name] = element;
            if (specialTarget) {
                specialTarget.append(element);
            } else {
                document.head.append(element);
            }
            return true;
        }
    }

    remove(rawName: string, id: string): boolean {
        const name = "AcFunHelper_" + rawName + "_" + id;
        if (!!this.handlers[name]) {
            const h = this.handlers[name];
            h.remove();
            return delete this.handlers[name];
        }
        return false
    }

    replace(rawName: string, id: string, newContent: string, specialTarget?:Element): boolean {
        if (this.remove(rawName, id)) {
            return this.add(rawName, id, newContent, specialTarget)
        }
        return false
    }

    createStyleElement(id: string, cssText: string) {
        let node = document.createElement("style");
        id ? node.id = id : null;
        node.textContent = cssText;
        return node;
    }
}