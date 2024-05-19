import { AcFunHelperBackend } from "@/Background/background"
import { ExtOptions } from "../CoreUtils";

export default defineBackground(() => {
  globalThis.AcFunHelperBackend = new AcFunHelperBackend();
  globalThis.AcFunHelperDevKit = {
    ExtOptions,
  }
});
