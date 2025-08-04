import { AcFunHelperBackend } from "@/Background/background"
import { ExtOptions } from "@/Core/CoreUtils";

export default defineBackground(() => {
  globalThis.AcFunHelperBackend = new AcFunHelperBackend();
  globalThis.AcFunHelperDevKit = {
    ExtOptions,
  }
});
