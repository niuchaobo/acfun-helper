import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Video/WatchLater.vue")).template,
    data() {
        return {
            videos: {},
            articles: {},
            list: [],
            memberNum: 0,
        }
    },
    methods: {
        loadList: async function () {
            /**@type {string[]} */
            const list = await ExtOptions.getValue("WatchPlanList");
            if (list.length == 0) {
                mdui.snackbar({
                    message: "没有一个待完成的任务哦"
                })
                return;
            }

            let index = 0;
            let timer = setInterval(async () => {
                if (index == list.length) {
                    clearInterval(timer)
                }
                const e = list[index];
                this.memberNum = index;
                if (/\/v\/ac[0-9]+/.test(e)) {
                    //视频
                    const acvid = /\/v\/ac([0-9]+)/.exec(e)[1];
                    /**@type {{status:number,result:APIs.DougaInfo}} */
                    const dougaInfo = JSON.parse(await fetchResult(acfunApis.video.videoInfo + acvid));
                    if (dougaInfo.status == 0) {
                        this.videos[acvid] = dougaInfo.result
                    } else {
                        this.videos[acvid] = {
                            title: "视频不存在",
                            dougaId: acvid,
                        }
                    }
                }
                if (/\/a\/ac[0-9]+/.test(e)) {
                    //文章 - 没接口，暂时就不做了
                    const acaid = /\/a\/ac([0-9]+)/.exec(e)[1];
                    this.articles[acaid] = {
                        user: {
                            name: acaid,
                        },
                        title: acaid,
                    }
                }
                index++;
            }, 522);
        },
        remove: async function (e) {
            /**@type {HTMLElement} */
            const target = e.target.parentElement;
            const keyname = target.children[1].href;
            /**@type {Array} */
            let raw = await ExtOptions.getValue("WatchPlanList");
            const index = raw.indexOf(keyname)
            if (index == -1) {
                return;
            }

            const dataId = target.children[0].dataset.key;
            const elemType = target.dataset.type;

            raw.splice(index);
            this.list = raw;
            ExtOptions.setValue("WatchPlanList", raw);

            delete this[elemType + "s"][dataId]
            this.memberNum--;

        },
        start: function () {
            mdui.snackbar({
                message: `已经启动 稍后再看 排程。`,
            });
            MessageSwitch.sendMessage('fg', { target: "watchLater", params: {}, InvkSetting: { type: "function" } })
        }
    },
    mounted: async function () {

    }
}

export const watchLater = app