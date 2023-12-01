import { ModuleStd } from "@/Declare/FeatureModule";

//有没有可能在这边通过KeyBindMgr注册一下快捷键，然后那边通过TypedModules的字典来调用这个模块里面的功能函数
const main = () => {
    return true
}

export const module: ModuleStd.manifest = {
    name: "pageTurningKeyBind",
    type: ModuleStd.ModType.Styling,
    workSpace: ModuleStd.WorkSpace.Frontend,
    main,
}