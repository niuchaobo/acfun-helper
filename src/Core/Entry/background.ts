import { AcFunHelperBackend } from "@/Background/background"

export default defineBackground(() => {
  globalThis.AcFunHelperBackend = new AcFunHelperBackend();
});
