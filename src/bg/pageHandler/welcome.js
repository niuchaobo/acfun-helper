import { closeMe, ParticlesAnimation } from "./pagehandlerLibs.js"

document.querySelector("#welcome").addEventListener("animationend",()=>{
    var dialogInst;
    document.querySelector("#openDialog").addEventListener("click",()=>{
        dialogInst = new mdui.Dialog('#privacyDialog');
        dialogInst.open();
    })
    document.querySelector("#iagree").addEventListener("click", (e) => {
        ExtOptions.changeFeatureSwitch("permission", true);
        chrome.tabs.create({ url: chrome.runtime.getURL('bg/options.html') });
        closeMe();
    })
    document.querySelector("#idisagree").addEventListener("click", (e) => {
        ExtOptions.changeFeatureSwitch("permission", false);
        AcFunHelper.reloadAll();
        closeMe();
    })
})

window.addEventListener("load", () => {
    ParticlesAnimation.start();
})