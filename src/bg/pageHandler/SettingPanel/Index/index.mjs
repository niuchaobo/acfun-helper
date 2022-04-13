import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"

const sfcData = await importVue("pageHandler/SettingPanel/Index/index.vue")

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: sfcData.template,
    components: {

    },
    data() {
        return {
            clickNum: 0
        }
    },
    methods: {
        openDevMode: function () {
            if(!globalThis.devMode){
                globalThis.devMode = true;
                mdui.snackbar({
                    message: '已经进入开发者模式。',
                    position: 'right-bottom',
                    timeout: 1000,
                });
            }
        },
        devMode: function () {
            this.clickNum >= 6 ? this.openDevMode() : ""
            document.querySelector("#AcFunHelperSFCstyle_devFeature").disabled = true;
            return this.clickNum++;
        }
    },
    mounted:function(){
        mdui.mutation("div.mdui-panel");
    }
}
export const indexApp = app