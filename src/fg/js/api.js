async function sendtoBackend(request){
    return new Promise((resolve, reject)=>{
        chrome.runtime.sendMessage(request, result => {
            resolve(result);
        });
    });
}

async  function addNote(notedef){
    try {
        return await sendtoBackend({action:'addNote',params:{notedef}});
    } catch (err) {
        return null;
    }
}

async  function addFavourite(){
    try {
        return await sendtoBackend({action:'addFavourite',params:{}});
    } catch (err) {
        return null;
    }
}

async function parsePage(href){
    try {
        return await sendtoBackend({action:'parsePage', params:{href}});
    } catch (err) {
        return null;
    }
}

