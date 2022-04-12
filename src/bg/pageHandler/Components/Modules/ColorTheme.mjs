const { WebStorageUtil } = await import("../../../../common/modulesLib/WebStorageUtil.mjs")
const locaStrg = new WebStorageUtil("local");
/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    data() {
        return {

        }
    },
    methods: {
        autoTheme: function (e) {
            this.removeColors("layout")
            document.querySelector("body").classList.add("mdui-theme-layout-auto")
            locaStrg.setByKv('settingpanel-layout', "auto")
        },
        lightTheme: function (e) {
            this.removeColors("layout")
            document.querySelector("body").classList.add("mdui-theme-layout-light")
            locaStrg.setByKv('settingpanel-layout', "light")
        },
        nightTheme: function (e) {
            this.removeColors("layout")
            document.querySelector("body").classList.add("mdui-theme-layout-dark")
            locaStrg.setByKv('settingpanel-layout', "dark")
        },
        defaultTheme: function () {
            this.removeColors("primary")
            this.removeColors("accent")
            this.removeColors("layout")
            document.querySelector("body").classList.add("mdui-theme-layout-auto")
            document.querySelector("body").classList.add("mdui-theme-primary-indigo")
            locaStrg.setByKv('settingpanel-layout', "auto")
            locaStrg.setByKv('settingpanel-theme', "indigo")
            locaStrg.setByKv('settingpanel-accent', "red")
            mdui.snackbar({
                message: "重置主题ing...",
                position: "right-bottom"
            })
            const defaultData = { "#layoutChoose": "auto", "#themeColor": "indigo", "#accentColor": "red" };
            document.querySelectorAll("#layoutChoose > div > div > label > input").forEach(e => {
                if (e._value == defaultData["#layoutChoose"]) {
                    e.click()
                }
            })
            for (let type in defaultData) {
                document.querySelectorAll(type + " > div > label > input").forEach(e => {
                    if (e._value == defaultData[type]) {
                        e.click()
                    }
                })
            }
        },
        chooseTheme: function (e) {
            const target = e.target;
            if (target.value) {
                this.removeColors("primary")
                document.querySelector("body").classList.toggle("mdui-theme-primary-" + target.value)
                locaStrg.setByKv('settingpanel-theme', target.value)
            }
        },
        chooseAccent: function (e) {
            const target = e.target;
            if (target.value) {
                this.removeColors("accent")
                document.querySelector("body").classList.toggle("mdui-theme-accent-" + target.value)
                locaStrg.setByKv('settingpanel-accent', target.value)
            }
        },
        removeColors: function (type) {
            let bodyClassList = document.querySelector("body").classList;
            for (let i = 0; i < bodyClassList.length; i++) {
                const element = bodyClassList[i];
                if (new RegExp("mdui-theme-" + type + "-.*").test(element)) {
                    bodyClassList.remove(element);
                }
            }
        },
    },
    mounted: function () {
        let layout = locaStrg.getByKey("settingpanel-layout")
        let theme = locaStrg.getByKey("settingpanel-theme")
        let accent = locaStrg.getByKey("settingpanel-accent")
        if (layout) {
            this.removeColors("layout")
            document.querySelector("body").classList.toggle("mdui-theme-layout-" + layout)
            document.querySelectorAll("#layoutChoose > div > div > label > input").forEach(e => {
                if (e._value == layout) {
                    e.click()
                }
            })
        }
        if (theme) {
            this.removeColors("theme")
            document.querySelector("body").classList.toggle("mdui-theme-primary-" + theme)
            document.querySelectorAll("#themeColor > div > label > input").forEach(e => {
                if (e._value == theme) {
                    e.click()
                }
            })
        }
        if (accent) {
            this.removeColors("accent")
            document.querySelector("body").classList.toggle("mdui-theme-accent-" + accent)
            document.querySelectorAll("#accentColor  > div > label > input").forEach(e => {
                if (e._value == accent) {
                    e.click()
                }
            })
        }
        document.querySelector("#resetTheme").addEventListener("click", () => {
            this.defaultTheme();
        })
    }
}
export default app