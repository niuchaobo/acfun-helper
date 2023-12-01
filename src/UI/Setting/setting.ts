import * as Vue from "vue";
import setting from "./setting.vue"
import 'mdui/mdui.css';
import 'mdui';
import 'material-design-icons/iconfont/material-icons.css';
import { ExtOptions } from "@/Core/CoreUtils";

const settingApp = Vue.createApp(setting)
settingApp.mount("#Main");

console.log(await ExtOptions.getAll())