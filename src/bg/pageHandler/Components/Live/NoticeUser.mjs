import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { panelSwitchesHandler, batchOprtSwitches } from "../../pagehandlerLibs.js"
import { userAddWrap } from "../Modules/Utils.mjs";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Live/NoticeUser.vue")).template,
    data() {
        return {
            raw: {},
            memberNum: 0,
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
                message: '已将 ' + name + " 移除自定义直播关注列表，通知消失后将会写入配置。",
                buttonText: '撤销',
                onButtonClick: () => {
                    this.raw[id] = name;
                },
                onClose: () => {
                    ExtOptions.setValue("liveFloowings", this.raw);
                    this.memberNum--;
                },
            });
        },
        addUser: function () {
            mdui.prompt('请输入你需要关注的用户 UID 或者 用户中心链接 或者 直播间链接', '添加关注', async (e) => {
                userAddWrap(this.raw, e, (userInfo, uid) => {
                    const name = userInfo.profile.name;
                    this.raw[uid] = name;
                    this.memberNum++;
                    ExtOptions.setValue("liveFloowings", this.raw).then(() => {
                        mdui.snackbar({
                            message: "也许把 " + name + " 成功添加了。",
                            position: "right-bottom"
                        })
                    })
                })
            })
        }
    },
    mounted: async function () {
        batchOprtSwitches([{ key: "liveFloowNotif" }, { key: "liveFollowOpenNow" }, { key: "followLiveNotif" }]);
        this.raw = await ExtOptions.getValue("liveFloowings");
        this.memberNum = Object.keys(this.raw).length;
    }
}

export const noticeUser = app