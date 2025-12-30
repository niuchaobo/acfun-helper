<template>
    <div class="danmuhide-message" style="position: absolute;width: 18px;left: 35px;top: 0px;cursor: pointer;">
        <div class="danmuhide-icon" @click="menuShow = !menuShow">
            <svg t="1591199578499" class="icon" viewBox="0 0 1077 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="5536" width="20px" height="20px">
                <path
                    d="M502.514526 33.953684l93.884632 65.428211a40.421053 40.421053 0 0 0 37.834105 4.473263l100.837053-39.343158a118.245053 118.245053 0 0 1 157.534316 139.317895l-29.103158 114.310737a40.421053 40.421053 0 0 0 7.868631 35.570526l78.362948 95.932631a114.688 114.688 0 0 1-86.662737 187.230316l-108.274527 2.048a40.421053 40.421053 0 0 0-33.845894 19.56379l-55.888842 92.698947a114.688 114.688 0 0 1-205.500632-18.539789l-6.359579-16.707369-255.730526 255.784421a107.789474 107.789474 0 0 1-145.569684 6.305684l-6.844632-6.305684a107.789474 107.789474 0 0 1-6.305684-145.569684l6.305684-6.898526 252.658526-252.712421-22.42021-6.305685a118.245053 118.245053 0 0 1-41.930105-206.093473l84.506947-67.637895a40.421053 40.421053 0 0 0 15.036631-35.031579l-9.701052-113.933474A114.364632 114.364632 0 0 1 502.514526 33.953684zM383.838316 590.794105l1.994105 2.048-283.648 283.648a26.947368 26.947368 0 0 0 34.384842 41.229474l3.772632-3.125895 281.49221-281.6-6.144-16.168421a40.421053 40.421053 0 0 0-26.839579-24.576l-5.01221-1.455158z m50.499368-496.316631a33.522526 33.522526 0 0 0-30.558316 36.271158l9.701053 113.987368a121.263158 121.263158 0 0 1-45.056 104.879158L283.917474 417.253053a37.402947 37.402947 0 0 0 13.258105 65.212631l113.55621 31.905684a121.263158 121.263158 0 0 1 80.572632 73.83579l43.870316 115.819789a33.845895 33.845895 0 0 0 60.631579 5.443369l55.888842-92.698948a121.263158 121.263158 0 0 1 101.645474-58.745263l108.220631-1.94021a33.845895 33.845895 0 0 0 25.6-55.296l-78.416842-95.932632a121.263158 121.263158 0 0 1-23.605895-106.711579l29.103158-114.256842a37.402947 37.402947 0 0 0-49.798737-44.085895l-100.837052 39.343158a121.263158 121.263158 0 0 1-113.394527-13.473684L456.326737 100.405895a33.522526 33.522526 0 0 0-21.989053-5.928421z m566.864842 150.096842c32.013474 0 58.044632 26.462316 58.044632 59.122526S1033.162105 362.711579 1001.202526 362.711579A58.583579 58.583579 0 0 1 943.157895 303.642947c0-32.660211 25.977263-59.122526 58.044631-59.122526z m0 39.397052a19.509895 19.509895 0 0 0-19.402105 19.725474c0 10.886737 8.730947 19.671579 19.402105 19.671579a19.509895 19.509895 0 0 0 19.348211-19.671579 19.509895 19.509895 0 0 0-19.402105-19.725474z"
                    fill="#8a8a8a" p-id="5537"></path>
            </svg>

        </div>
        <div class="danmuhide-message-panel"
            style="position: absolute; z-index: 100;display: none;position: absolute; z-index: 100;display: none;background-color: rgba(255, 255, 255, 0.92);margin: 10px;padding: 5px;box-shadow: rgb(0 0 0 / 30%) 0px 0px 5px 0px;left: -50px;top: -345px;"
            v-show="menuShow">
            <ul style="width:120px" title="双击项目仅查看此类型弹幕">
                <li style="height: 35px;display: flex; align-items: center;">
                    <input type="checkbox" data-type="anim" @change="hideOriginal">屏蔽礼物气泡</input>
                </li>
                <li style="height: 35px;display: flex; align-items: center;">
                    <input type="checkbox" data-type="gift" @change="hideOriginal">屏蔽礼物</input>
                </li>
                <li style="height: 35px;display: flex; align-items: center;">
                    <input type="checkbox" data-type="user-enter" @change="hideOriginal">屏蔽进场</input>
                </li>
                <li style="height: 35px;display: flex; align-items: center;">
                    <input type="checkbox" data-type="like" @change="hideOriginal">屏蔽点赞</input>
                </li>
                <li style="height: 35px;display: flex; align-items: center;">
                    <input type="checkbox" data-type="rich-text" @change="hideOriginal">屏蔽红包</input>
                </li>
                <li style="height: 35px;display: flex; align-items: center;">
                    <input type="checkbox" data-type="follow" @change="hideOriginal">屏蔽关注提醒</input>
                </li>
                <li style="height: 35px;display: flex; align-items: center;">
                    <input type="checkbox" data-type="join-club" @change="hideOriginal">屏蔽守护团消息</input>
                </li>
                <li style="height: 35px;display: flex; align-items: center;">
                    <input type="checkbox" data-type="medal-wrapper" @change="hideOriginal">屏蔽牌子</input>
                </li>
                <li style="height: 35px;display: flex; align-items: center;">
                    <input type="checkbox" data-type="comment" @change="hideOriginal">屏蔽评论</input>
                </li>
            </ul>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, watch } from "vue"

const menuShow = ref(false);

const hideOriginal = (e: Event) => {
    console.log(e)
    const target = e.target as HTMLInputElement;
    const hideType = target.dataset.type as string;
    const checked = target.checked as boolean;

    if (hideType == "anmi") {
        checked ? $(".live-feed-gift-slot").addClass('ban_' + hideType) : $(".live-feed-gift-slot").removeClass('ban_' + hideType)
    } else {
        checked ? $('.live-feed-messages').addClass('ban_' + hideType) : $('.live-feed-messages').removeClass('ban_' + hideType)
    }
}

AcFunHelperFg.StyleManager.add("LiveBanDanmu", "common", `
        .hide_popup{position: absolute; z-index: 100;display: none;} 
        .ban_gift .gift,
        .ban_user-enter .user-enter,
        .ban_like .like,
        .ban_follow .follow,
        .container-live-slot .ban_container-live-anim,
        .ban_rich-text .rich-text,
        .ban_join-club .join-club,
        .ban_emojiCommand .emojiCommand,
        .ban_comment .comment,
        .ban_medal-wrapper .medal-wrapper{display:none !important;}`
)
</script>