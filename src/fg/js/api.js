async function sendtoBackend(request){
    return new Promise((resolve, reject)=>{
        chrome.runtime.sendMessage(request, result => {
            resolve(result);
        });
    });
}

async function isConnected(){
    try {
        return await sendtoBackend({action:'isConnected', params:{}});
    } catch (err) {
        return null;
    }
}

async function getTranslation(expression){
    try {
        return await sendtoBackend({action:'getTranslation', params:{expression}});
    } catch (err) {
        return null;
    }
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
function ajax(method, url, data,header) {
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.status);
                }
            }
        };
        request.open(method, url);
        if(header){
            header.forEach(function (value, key) {
                request.setRequestHeader(key, value);
            })
        }
        request.send(data);
    });
}
