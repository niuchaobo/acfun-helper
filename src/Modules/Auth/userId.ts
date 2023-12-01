import { ExtOptions } from "@/Core/CoreUtils";
import { ModuleStd } from "@/Declare/FeatureModule";
import { CookiesUtils } from "@/Utils/Storage/CookiesUtils";

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