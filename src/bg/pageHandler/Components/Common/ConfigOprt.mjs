import { importVue } from "../../../../../common/modulesLib/SFCUtil.mjs";
import { afterReconfigure } from "../Modules/Utils.mjs";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Common/configOprt.vue")).template,
    props: ["name"],
    data() {
        return {

        }
    },
    methods: {
        configExport: async function () {
            let all = await ExtOptions.getAll();
            all = ExtOptions.sanitizeOptions(all);
            let blob = new Blob([JSON.stringify(all)], { type: 'application/octet-stream' });
            let url = window.URL.createObjectURL(blob);
            let saveas = document.createElement('a');
            saveas.href = url;
            saveas.style.display = 'none';
            document.body.appendChild(saveas);
            saveas.download = 'AcFun-Helper.conf';
            saveas.click();
            setTimeout(function () {
                saveas.parentNode.removeChild(saveas);
            }, 0)

            document.addEventListener('unload', function () {
                window.URL.revokeObjectURL(url);
            });
        },
        configImport: async function () {
            /**@type {HTMLInputElement} */
            const fileHandler = document.querySelector("input#importConfig");
            fileHandler.click()
            fileHandler.addEventListener("change", function () {
                let file = this.files[0];
                let jsonfy_config;
                if (!!file) {
                    var reader = new FileReader();
                    reader.readAsText(file, "utf-8");
                    reader.addEventListener("error", () => {
                        mdui.alert("文件可能不存在，或者没有权限。");
                    })
                    reader.addEventListener("load", () => {
                        try {
                            jsonfy_config = JSON.parse(reader.result);
                        } catch (e) {
                            mdui.alert("文件格式不正确");
                            return;
                        }
                        ExtOptions.resetAll();
                        ExtOptions.saveAll(jsonfy_config);
                        afterReconfigure();
                    })
                }
            })
        },
        configClean: async function () {
            let notice_this = prompt("确认清除所有配置吗？请考虑清楚哦。Y/N", '');
            if (notice_this == 'Y') {
                chrome.storage.local.clear(function () {
                    //重置设置选项
                    let x = ExtOptions.sanitizeOptions({});
                    optionsSave(x);
                });
                afterReconfigure();
            }
        }
    },
    mounted: function () {
        mdui.mutation("div#configOprt");
    }
}
export const confOprt = app