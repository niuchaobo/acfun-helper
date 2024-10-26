/**
    * 添加一层遮罩
    * @elementID divMask
    */
export function maskElement(obj: HTMLElement, styleText: string = "", divName: string = "") {
    if (!styleText) {
        styleText = `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: #fff; opacity: 0; filter: alpha(opacity=0);z-index:0;`
    }
    var hoverdiv = `<div id="${divName}" class="divMask" style="${styleText}"></div>`;
    $(obj).wrap('<div class="position:relative;"></div>');
    $(obj).before(hoverdiv);
    $(obj).data("mask", true);
}

interface addElementPayload {
    tag?: string;
    id?: string;
    css?: string;
    target?: Element;
    classes?: string;
    createMode?: "append" | "after" | "headChildAppend" | "headPrepend" | "before";
    thisHTML?: string;
    title?: string;
}

/**
 * 插入DOM对象
 */
export function addElement(options: addElementPayload) {
    let { tag = 'div', id = '', css = '', target = document.body, classes = '', createMode = "append", thisHTML = "", title = "" } = options
    let x = document.createElement(tag);
    x.id = id;
    x.className = classes;
    x.innerHTML = thisHTML;
    x.style.cssText = css;
    if (title) {
        x.title = title;
    };
    switch (createMode) {
        //在Element的最后一个子节点之后插入 - 子级
        case "append":
            target.append(x);
            break;
        //在其父节点的子节点列表中插入 - 同级
        case "after":
            target.after(x);
            break;
        case "headChildAppend":
            let tempTarget = target.firstChild;
            target.insertBefore(x, tempTarget);
            break;
        case "before":
            target.insertBefore(x, target);
    }
    return x
}

