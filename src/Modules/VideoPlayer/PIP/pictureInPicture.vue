<template>
    <div class="control-btn pip">
        <div class=" control-btn btn-pip" @click="toggle">
            <span class="btn-span setPictureInPictureMode"></span>
        </div>
        <span class="tip-pip">画中画</span>
    </div>
</template>

<script setup lang="ts">
import { modLog } from '@/Core/CoreLibs/ConsoleProxy';

let status: boolean = false;

const log = (msg: string) => {
    modLog(msg, "PictureInPicture", "_view.main");
}

const toggle = () => {
    log("StatusChange: " + String(status));
    if (status) {
        document.exitPictureInPicture();
        status = false;
    } else {
        document.getElementsByTagName("video")[0].requestPictureInPicture();
        status = true;
    }
}

</script>

<style>
.pip {
    position: relative;
    width: 38px;
    height: 20px;
}

.btn-pip {
    opacity: 0.9;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    flex: none;
    box-sizing: border-box;
    -webkit-box-flex: 0;
    align-items: center;
    justify-content: center;
    -webkit-box-align: center;
    display: flex;
    -webkit-box-pack: center;
    position: relative;
    width: 100%;
    height: 100%;
}

.setPictureInPictureMode {
    display: block;
    width: 22px;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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');
}

.tip-pip {
    position: absolute;
    display: none;
    bottom: 40px;
    text-align: center;
    background: rgba(21, 21, 21, 0.8);
    border-radius: 4px;
    line-height: 32px;
    height: 32px;
    opacity: 0.9;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    width: 116px;
    left: 50%;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
}
</style>