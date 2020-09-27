async function ListProcess() {
    let LcyHistory = await db_getLuckyHistory();
    for (let x = 0; x < LcyHistory.length; x++) {
        $("div.mdui-list").append(`<label class="mdui-list-item mdui-ripple" data-key=${LcyHistory[x].uid} ><div class="mdui-checkbox"><input class="switch" data-key=${LcyHistory[x].uid} data-name=${LcyHistory[x].userName} type="checkbox" checked/><i class="mdui-checkbox-icon" data-key=${LcyHistory[x].uid} ></i></div><div class="mdui-list-item-content" data-key=${LcyHistory[x].uid}>${LcyHistory[x].userName}  -  在${LcyHistory[x].acid}抽中</div><i class="mdui-list-item-icon mdui-icon material-icons"><a href="https://www.acfun.cn/u/${LcyHistory[x].uid}" target="_blank">chat</a></i><i class="mdui-list-item-icon mdui-icon material-icons"><a href="https://www.acfun.cn/v/${LcyHistory[x].acid}" target="_blank">airplay</a></i></label>`)
    }
    $('.switch').click(function () {
        if (!$(this).is(":checked")) {
            let this_uid = $(this).data("key");
            let this_uName = $(this).data("name");
            db_delLuckyHistory(Number(this_uid))
            mdui.snackbar({
                message: `已移除 "${this_uName}"`,
            });
        }
    });
}
ListProcess()