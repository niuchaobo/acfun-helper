import * as Vue from "vue";
import settingApp from "./setting.vue"
import 'material-design-icons/iconfont/material-icons.css';
import { ExtOptions } from "@/Core/CoreUtils";
import 'mdui/mdui.css';
import 'mdui';
import { createPinia } from "pinia";

const pinia = createPinia();
const app = Vue.createApp(settingApp);
app.use(pinia)
app.mount("#Main");

const AcFunHelperDevKit = {
    ExtOptions,
}

globalThis.AcFunHelperDevKit = AcFunHelperDevKit;

console.log(await ExtOptions.getAll())

/**
 document.querySelectorAll(".ac-member-favourite-douga-item").forEach(e=>{
    if(e.children[1].children[0].innerText=="该视频已下架"){
        console.log(JSON.parse(e.attributes[1].value)?.title)
        e.children[1].children[0].innerText = JSON.parse(e.attributes[1].value)?.title
    }
})
 */