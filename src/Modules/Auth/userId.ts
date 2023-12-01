import { ExtOptions } from "@/Core/CoreUtils";
import { ModuleStd } from "@/Declare/FeatureModule";
import { CookiesUtils } from "@/Utils/Storage/CookiesUtils";

//有没有可能在这边通过KeyBindMgr注册一下快捷键，然后那边通过TypedModules的字典来调用这个模块里面的功能函数
const main = () => {
    let UidInCookies: string;
    UidInCookies = CookiesUtils.getItem("auth_key")??"";
    return ExtOptions.setValue("LocalUserId",UidInCookies);
}

export const module: ModuleStd.manifest = {
    name: "GetUserId",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Frontend,
    main,
}