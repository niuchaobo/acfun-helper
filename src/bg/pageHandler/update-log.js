var url = "/note/update-log.md";
var r = new XMLHttpRequest();
r.open('get', url);
r.send();
r.onload = function () {
    if (r.status == 200) {
        HTMLElement.prototype.htmlContent = function (html) {
            var dom = new DOMParser().parseFromString('<template>' + html + '</template>', 'text/html').head;
            this.appendChild(dom.firstElementChild.content);
        }
        document.getElementById('content').htmlContent(marked(r.responseText));
        // document.getElementById("content").innerHTML = marked(r.responseText);
    }
}
//获得传过来的login与在数据库中对应的表单
var paras = location.search;            //search获得地址中的参数，内容为'?itemId=12'
var result = paras.match(/[^\?&]*=[^&]*/g);     //match是字符串中符合的字段一个一个取出来，result中的值为['login=xx','table=admin']
paras = {};                    //让paras变成没有内容的json对象
console.log(result)
for (i in result) {
    var temp = result[i].split('=');    //split()将一个字符串分解成一个数组,两次遍历result中的值分别为['itemId','xx']
    paras[temp[0]] = temp[1];
}
var itemId = paras.itemId;     //根据参数名"itemId"，获取参数值
// console.log(itemId); 
