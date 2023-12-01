/**
    * 添加一层遮罩
    * @elementID divMask
    */
export function DOMElementMask(obj: HTMLElement, styleText: string = "", divName: string = "") {
    if (!styleText) {
        styleText = `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: #fff; opacity: 0; filter: alpha(opacity=0);z-index:0;`
    }
    var hoverdiv = `<div id="${divName}" class="divMask" style="${styleText}"></div>`;
    $(obj).wrap('<div class="position:relative;"></div>');
    $(obj).before(hoverdiv);
    $(obj).data("mask", true);
}