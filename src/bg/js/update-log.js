var url = "../update-log.md";
var r = new XMLHttpRequest();
r.open('get',url);
r.send();
r.onload = function() {
    if (r.status == 200) {
    HTMLElement.prototype.htmlContent = function(html)
        {
            var dom = new DOMParser().parseFromString('<template>'+html+'</template>', 'text/html').head;
            this.appendChild(dom.firstElementChild.content);
        }
    document.getElementById('content').htmlContent(marked(r.responseText));
    // document.getElementById("content").innerHTML = marked(r.responseText);
    }
}
