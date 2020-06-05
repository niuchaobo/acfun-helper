var url = "../update-log.md";
var r = new XMLHttpRequest();
r.open('get',url);
r.send();
r.onload = function() {
    if (r.status == 200) {
        document.getElementById("content").innerHTML = marked(r.responseText);
    }
}
