import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { panelSwitchesHandler, batchOprtSwitches } from "../../pagehandlerLibs.js"
import { userAddWrap } from "../../pagehandlerLibs.js";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/SettingPanel/Comment/BanUserInComment.vue")).template,
    data() {
        return {
            raw: {},
            memberNum: 0,
            require: false,
        }
    },
    methods: {
        switchHandler: panelSwitchesHandler,
        removeUser: function (e) {
            const target = e.target;
            const id = target.parentElement.children[0].dataset.key;
            const name = target.parentElement.children[0].dataset.name;
            delete this.raw[id];
            mdui.snackbar({
                message: '已将 ' + name + " 移除列表，通知消失后将会写入配置。",
                buttonText: '撤销',
                onButtonClick: () => {
                    this.raw[id] = name;
                    this.memberNum++;
                },
                onClose: () => {
                    ExtOptions.setValue("CommentFilter", this.raw);
                    this.memberNum--;
                },
            });
        },
        addUser: function () {
            mdui.prompt('请输入你需要关注的用户UID', '添加关注', async (e) => {
                userAddWrap(this.raw, e, (userInfo, uid) => {
                    const name = userInfo.profile.name;
                    this.raw[uid] = name;
                    ExtOptions.setValue("CommentFilter", this.raw).then(() => {
                        mdui.snackbar({
                            message: "也许把 " + name + " 成功添加了。",
                        })
                        this.memberNum++;
                    })
                })
            })
        }
    },
    mounted: async function () {
        batchOprtSwitches([{ key: "commentFilterSw" }]);
        this.raw = await ExtOptions.getValue("CommentFilter");
        this.require = await ExtOptions.getValue("xhrDrv");
        this.memberNum = Object.keys(this.raw).length;
    }
}

export const banuserIncomment = app