import { ContentScriptProcessor } from "./content-script";
import { ChromeExtensionOptions } from "./plugin-options";

export const chromeExtension = (
  options = {} as ChromeExtensionOptions
): any => {
  /* --------------- LOAD PACKAGE.JSON --------------- */
  const normalizedOptions = { ...options } as ChromeExtensionOptions;
  const contentProcessor = new ContentScriptProcessor(normalizedOptions);

  /* ----------------- RETURN PLUGIN ----------------- */
  return {
    name: "chrome-extension",
    async generateBundle(options, bundle, isWrite) {
      await contentProcessor.generateBundle(this, bundle);
    },
  };
};
