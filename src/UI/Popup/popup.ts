import { MessageRouter } from "@/Core/CoreLibs/MessageRouter";

(async ()=>{
    const MsgClient = new MessageRouter.MsgClient({ module: chrome.runtime });
    const EchoMsg = await MsgClient.send("/bg/echo", { "data": "Hi There" })
    console.log(EchoMsg)
})

export { };
