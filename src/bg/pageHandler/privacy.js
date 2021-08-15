import { renderMarkdownDoc } from "./pagehandlerLibs.js";

window.addEventListener("load", (e) => {
    renderMarkdownDoc("/note/privacy.md", document.getElementById('content'));
})