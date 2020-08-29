async function catList(){
    let x = await fetchResult("https://api-new.app.acfun.cn/rest/app/tag/getCategoryList?");
    let a = JSON.parse(x)
    console.log(a)
    for (let index = 0; index < a.categories.length; index++) {
        let nod = document.createElement("a");
        nod.href = `#topicClass`+a.categories[index].categoryId;
        nod.classList = "mdui-ripple mdui-ripple-white";
        nod.textContent = a.categories[index].categoryName;
        document.getElementById("topicList").append(nod);
        // console.log(nod);
        let nod2 = document.createElement("div");
        nod2.id = `topicClass`+a.categories[index].categoryId;
        nod2.classList = "mdui-p-a-2";
        nod2.textContent = "";
        document.body.append(nod2);

    }
    return a.categories
}


async function catFeeds(catId){
    console.log(catId)
    let x = await fetchResult(`https://api-new.app.acfun.cn/rest/app/tag/feed?categoryId=${catId}&count=20&pcursor=0`);
    let a = JSON.parse(x);
    console.log(a);
    for (let index = 0; index < a.tag.length; index++) {
        let nod = document.createElement("div");
        let mediaPic = a.tag[index].tagCover
        let mediaTitle = a.tag[index].tagName
        let mediaSubtitle = a.tag[index].tagCountStr +" - "+ a.tag[index].summary
        let dataKey = a.tag[index].id
        let mediaCard = `<div class="mdui-card contentcard">
        <div class="mdui-card-media" style="max-height: 330px">
          <img src="${mediaPic}"/>
          <div class="mdui-card-media-covered">
            <div class="mdui-card-primary">
              <div class="mdui-card-primary-title">${mediaTitle}</div>
              <div class="mdui-card-primary-subtitle">${mediaSubtitle}</div>
            </div>
            <div class="mdui-card-actions">
              <button class="checkIt mdui-btn mdui-ripple mdui-ripple-white" data-key=${dataKey}>查看</button>
            </div>
          </div>
        </div>
        </div>`
        nod.innerHTML = mediaCard;
        nod.style.width = 'calc(25% - 20px)';
        nod.style.display = 'inline-block';
        nod.style.padding = '10px'
        document.getElementById(`topicClass${catId}`).append(nod);
    }
}

async function main(){
    let x = await catList()
    for (let index = 0; index < x.length; index++) {
        catFeeds(x[index].categoryId);
        console.log(x[index].categoryId)
    }
    
}

main()