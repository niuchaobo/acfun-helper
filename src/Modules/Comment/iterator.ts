import { ModuleStd } from "@/Declare/FeatureModule";

interface Conf {
    enable: boolean
}

const main = async () => {

}


export const defaultConf: Conf = {
    enable: true
}

/**
 * Module模板
 * @refer 参考
 * @ideaRefer 参考
 */
export const module: ModuleStd.manifest = {
    name: "CommentIterator",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}