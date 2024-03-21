<template>
    <span data-bind-key="AddABPlayUI">AB</span>
    <div class="speed-panel acArbs-abplay-panel">
        <ul>
            <li class='acArbs-updateAbPlayStart' data-val="A" @click="updateAbPlayStart">{{ startMsg }}</li>
            <li class='acArbs-updateAbPlayEnd' data-val="B" @click="updateAbPlayEnd">{{ endMsg }}</li>
            <li class='acArbs-abPlayHandler' @click="abPlayHandler">{{ handlerMsg }}</li>
            <li class='acArbs-stopAbPlay' @click="stopAbPlay">{{ stopMsg }}</li>
        </ul>
        <div class="transparent-placeholder"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlayerNotification } from "@/Utils/GUI/playerNotification";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

const Player = document.getElementsByTagName("video")[0];

let abPlayFlag: boolean = false;
let End: number = -1;
let Start: number = -1;
let startMsg = ref("标记点A");
let endMsg = ref("标记点B");
let handlerMsg = ref("开始");
let stopMsg = ref("清除");

const updateAbPlayStart = () => {
    if (abPlayFlag) {
        PlayerNotification("请", "先停止");
        return;
    }
    let TargetTime = Player.currentTime;
    if (End != -1 && TargetTime >= End) {
        PlayerNotification("A要在B之前且不应该相等", "——鲁迅");
        return;
    }
    Start = TargetTime;
    let mm = dayjs.duration(Start, "seconds").format("mm:ss");
    PlayerNotification(`标记点A: `, `${mm}`);
    startMsg.value = `A: ${mm}`;
    End != -1 && PlayerNotification(
        `区间为`,
        `${mm} 至 ${dayjs.duration(End, "seconds").format("mm:ss")}`
    );
}

const updateAbPlayEnd = () => {
    if (abPlayFlag) {
        PlayerNotification("请", "先停止");
        return;
    }
    if (Start == -1) {
        PlayerNotification("没有开始，如何结束", "——鲁迅");
        return;
    }
    let TargetTime = Player.currentTime;
    if (Start != -1 && TargetTime <= Start) {
        PlayerNotification("B要在A之后且不应该相等", "——鲁迅");
        return;
    }
    End = TargetTime;
    let mm = dayjs.duration(End, "seconds").format("mm:ss");
    PlayerNotification(`标记点B: `, `${mm}`);
    endMsg.value = `B: ${mm}`;
    End && PlayerNotification(
        `区间为`,
        `${dayjs.duration(Start, "seconds").format("mm:ss")} 至 ${mm}`
    );
}

const abPlayHandler = () => {
    if (Start === -1 || End === -1) {
        PlayerNotification("请先设置", "标记点");
        return;
    }
    if (!abPlayFlag) {
        PlayerNotification("AB回放", "开启");
        handlerMsg.value = "停止";
        stopMsg.value = "清除&停止";
        Player.paused && Player.play();
        Player.removeEventListener(
            "timeupdate",
            abPlayMain.bind(this),
            false
        );
        Player.currentTime = Start;
        Player.addEventListener(
            "timeupdate",
            abPlayMain.bind(this),
            false
        );
        abPlayFlag = true;
    } else {
        Player.removeEventListener(
            "timeupdate",
            abPlayMain.bind(this),
            false
        );
        Player.pause();
        handlerMsg.value = "开始";
        abPlayFlag = false;
        PlayerNotification("AB回放", "停止");
    }
}

const stopAbPlay = () => {
    if (abPlayFlag) {
        abPlayFlag = false;
        Start = End = -1;
        startMsg.value = "标记点A";
        endMsg.value = "标记点B";
        handlerMsg.value = "开始";
        Player.removeEventListener("timeupdate", abPlayMain.bind(this), false);
        PlayerNotification("标记已清除，AB回放已退出", "");
    } else {
        PlayerNotification("菩提本无树", "——鲁迅");
    }
}

const abPlayMain = () => {
    if (!abPlayFlag) {
        return;
    }
    if (
        Math.floor(Player.currentTime) >= End
    ) {
        Player.currentTime = Start;
    }
}

</script>
