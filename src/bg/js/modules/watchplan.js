/**
 * 稍后再看
 */
class WatchPlan{
    constructor(){
        this.OpFlag = false;
    }

    ifExist(list,obj){
        if(
            list.find(item=>{
                return item ==obj;
            })
        ){
            return true
        }else{
            return false
        }
    }

    async PushInList(data){
        console.log(data)
        var ori_list = await getStorage("WatchPlanList");
        if(ori_list.WatchPlanList==null){
            chrome.storage.local.set({WatchPlanList : []});
            ori_list = await getStorage("WatchPlanList");
        }
        console.log(ori_list)
        if((REG.video.test(data)||REG.article.test(data)||REG.userHome.test(data))&&!this.ifExist(ori_list.WatchPlanList,data)){
            ori_list.WatchPlanList.push(data)
            chrome.storage.local.set({"WatchPlanList":ori_list.WatchPlanList});
            this.OpFlag = true
        }else{
            this.OpFlag = false
        }
    }

    getOpRes(){
        return this.OpFlag;
    }

    test1(){
        console.log('hello from Backend.WatchPlan.test()');
    }

}