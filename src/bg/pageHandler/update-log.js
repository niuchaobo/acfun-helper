import { renderMarkdownDoc } from "./pagehandlerLibs.js";

window.addEventListener("load", (e) => {
    renderMarkdownDoc("/note/update-log.md", document.getElementById('content'));
})