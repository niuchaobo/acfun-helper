let _timer = setInterval(function () {
    let node = document.getElementsByClassName("live-feed-messages");
    if(node.length>0){
        document.getElementsByClassName("live-feed-messages")[0].addEventListener("DOMNodeInserted",(e)=>{
            if(e.target.classList[0]=="comment" || e.target.classList[0]=="user-enter"){
                let x =new Date()
                let w = e.target.children[0].innerHTML
                e.target.children[0].innerHTML = `<span>[${x.getHours()}:${x.getMinutes()}] </span>`+w
            }
        })
        clearInterval(_timer);
    }
},2000)