import { GetAsyncDOM } from "@/Core/CoreUtils"
import dayjs from "dayjs";

export const jumpTo = (data:any)=>{
    //https://www.acfun.cn/v/ac44837472#acfunhelper=%7B%22jumpTo%22:%2200:10%22%7D
    console.log(data)
    GetAsyncDOM.Get("video",()=>{
        const player = document.querySelector("video") as HTMLVideoElement;
        const second = timeTagToTimeSecond(data);
        player.currentTime = second;
    })
}