//ts-nocheck
import { OutputBundle, PluginContext } from "rollup";
import { findChunkByName, removeFileExtension } from "./utils";
import { ChromeExtensionOptions } from "./plugin-options";
import { mixinChunksForIIFE } from "./mixin";

export class ContentScriptProcessor {
  singleScripts = [];

  constructor(private options: ChromeExtensionOptions) {
    this.singleScripts = options.singleScripts;
  }
  public async generateBundle(
    context: PluginContext,
    bundle: OutputBundle
  ): Promise<void> {
    const { singleScripts } = this;
    for (const jsName of singleScripts || []) {
      const chunk = findChunkByName(removeFileExtension(jsName), bundle);
      if (chunk) {
        await mixinChunksForIIFE(context, chunk, bundle);
      }
    }
  }
}
