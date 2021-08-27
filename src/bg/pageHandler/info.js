import { infoPages, renderMarkdownDoc } from "./pagehandlerLibs.js";

window.addEventListener("load", (e) => {
    const requestParm = new URL(window.location.href);
    /**
     * @type {infoPages}
     * privacy userAgreement updateLog
     */
    const pageType = requestParm.searchParams.get("type");
    renderMarkdownDoc(`/note/${pageType}.md`, document.getElementById('content'));
    document.title = infoPages[pageType];
})