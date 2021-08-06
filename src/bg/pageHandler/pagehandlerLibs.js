export async function getUid() {
    let Uid = await getStorage('LocalUserId');
    if (Uid != 0) {
        return Uid.LocalUserId
    } else {
        throw new UserException("Unexpected Uid,Please Navigate to www.acfun.cn First");
    }
}

export async function getResult(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => { return res.text(); })
            .then((res) => {
                let x = res;
                resolve(x);
            })
    });
}

export async function getFollowingNum() {
    return new Promise((resolve, reject) => {
        fetch(`https://www.acfun.cn/rest/pc-direct/user/personalInfo?`).then((res) => { return res.text() })
            .then((res) => {
                let x = JSON.parse(res);
                let followingNum = Number(x.info.following);
                resolve(followingNum)
            });
    });
}

export async function computePageNum() {
    let totalNum = await getFollowingNum();//总数
    let remainNum = totalNum % 100; //剩余
    let comple = totalNum - remainNum;//整
    let multip = (comple / 100) + 1 //页数
    return multip
}

/**
 * 在targetElem中将src所在的markdown文档渲染
 * @param {string} src 
 * @param {HTMLElement} targetElem 
 */
export async function renderMarkdownDoc(src="",targetElem){
    var url = src;
    var r = new XMLHttpRequest();
    r.open('get', url);
    r.send();
    r.onload = function () {
        if (r.status == 200) {
            HTMLElement.prototype.htmlContent = function (html) {
                var dom = new DOMParser().parseFromString('<template>' + html + '</template>', 'text/html').head;
                this.appendChild(dom.firstElementChild.content);
            }
            targetElem.htmlContent(marked(r.responseText));
        }
    }
}