import { addElement } from "./dom";

export const PlayerNotification = (text: string, importantText: string = "") => {
    let target = document.querySelector(".left-bottom-tip");
    let notif:HTMLElement;
    if (target) {
        notif=addElement({
            target: target,
            createMode: "headChildAppend",
            id: "AcFunHelperAnot-PlayerNotif",
            thisHTML: `<div class="tip-item muted" ><div class="left-bottom-tip-text"><span>${text}</span>&nbsp;&nbsp;<span style='color:red;'>${importantText}</span></div></div>`
        })
    }
    let _timer = setTimeout(() => {
        notif && notif.remove();
        clearInterval(_timer);
    }, 2500);
}