import { AcFunHelperFrontend } from "@/Frontend/frontend";

export default defineContentScript({
  matches: ['*://*.acfun.cn/*'],
  runAt: 'document_start',
  main() {
    const AcFunHelperFg = new AcFunHelperFrontend();
    globalThis.AcFunHelperFg = AcFunHelperFg;
  },
});
