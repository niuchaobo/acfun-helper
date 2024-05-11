import { ModuleStd } from "@/Declare/FeatureModule";
const style = import("./asset/navGlass.scss")

const main = () => {
    return style
}

export const module: ModuleStd.manifest = {
    name: "NavGlass",
    type: ModuleStd.ModType.Styling,
    workSpace: ModuleStd.WorkSpace.Frontend,
    main,
}