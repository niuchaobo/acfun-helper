/**
 * 幸运抽奖
 */
class LuckyTtab {
    constructor(){
        this.messageFormat = "https://message.acfun.cn/im?targetId={userId}"
    }

    genNum(mode,num=0,min=0,max){
        //输出随机数或随机数列表
        if(mode==1){
            //输出一个数字
            return Math.floor(Math.random() * (max - min)) + min;
        }else if(mode==2){
            //输出一个不重复的字典
            let result={};
            for(let i=0;i<=num-1;i++){
                let a = Math.floor(Math.random() * Math.floor(max))+min;
                result[a]=a;
            }
            // console.log('Object.keys(result).length: '+Object.keys(result).length);
            while(Object.keys(result).length<num){
                let need = num-Object.keys(result).length;
                for(let i=0;i<=need-1;i++){
                    let a = Math.floor(Math.random() * Math.floor(max))+min;
                    result[a]=a;
                }
            }
            // console.log(result);
            return result
        }else if(mode==3){
            //输出可能重复的列表
            let result = [];
            for(let i=0;i<=num-1;i++){
                result.push(Math.floor(Math.random() * Math.floor(max))+min);
            }
            return result
        }
    }

    getCommentData(acid){
        let acCommentApi='https://www.acfun.cn/rest/pc-direct/comment/list?sourceId='+acid+'&sourceType=3&page=';
        let totalPageNum = this.getTotalPageNum(acid);
        let Comm_data=[];
        if(totalPageNum && totalPageNum >=1){
            //循环获取分页下的评论
            for(let i=0;i<=totalPageNum-1;i++){
                fetch(acCommentApi+i).then((res)=>{return res.text();})
                .then(()=>{
                    let jsonfy_comment = JSON.parse(res);
                    for(let j=0;i<jsonfy_comment.pageSize;i++){
                        //返回一个列表
                        Comm_data.push(jsonfy_comment.rootComments[j]);
                    }
                }
                )
            }
        }
        return Comm_data;
    }

    getdetailCommentData(acid){
        let acCommentApi='https://www.acfun.cn/rest/pc-direct/comment/list?sourceId='+acid+'&sourceType=3&page=';
        let totalPageNum = this.getTotalPageNum(acid);
        let Comm_data={};
        if(totalPageNum && totalPageNum >=1){
            //循环获取分页下的评论
            for(let i=0;i<=totalPageNum-1;i++){
                fetch(acCommentApi+i).then((res)=>{return res.text();})
                .then(()=>{
                    let jsonfy_comment = JSON.parse(res);
                    for(let j=0;i<jsonfy_comment.pageSize;i++){
                        //返回一个对象（根据楼层号返回一个对象）
                        Comm_data[jsonfy_comment.rootComments[j].floor]=jsonfy_comment.rootComments[j];
                    }
                }
                )
            }
        }
        return Comm_data;
    }

    getNRdetailCommentData(acid,){
        let acCommentApi='https://www.acfun.cn/rest/pc-direct/comment/list?sourceId='+acid+'&sourceType=3&page=';
        let totalPageNum = this.getTotalPageNum(acid);
        let Comm_data={};
        let Comm_data_UIDList=[];
        let Comm_data_byUID={};
        if(totalPageNum && totalPageNum >=1){
            //循环获取分页下的评论
            for(let i=0;i<=totalPageNum-1;i++){
                fetch(acCommentApi+i).then((res)=>{return res.text();})
                .then((res)=>{
                    let jsonfy_comment = JSON.parse(res);
                    for(let j=0;i<jsonfy_comment.pageSize;i++){
                        //返回一个对象
                        Comm_data_UIDList.push(jsonfy_comment.rootComments[j].userId);
                        Comm_data_byUID[jsonfy_comment.rootComments[j].userId]=jsonfy_comment.rootComments[j];
                    }
                }
                )
            }
        }
        Comm_data['Comm_data_UIDList']=Comm_data_UIDList;
        Comm_data['Comm_data_byUID']=Comm_data_byUID;
        return Comm_data;
    }

    async getResult(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
            .then((res)=>{return res.text();})
                .then((res)=>{
                    let x=res;
                    resolve(x);
                })
            });
    }

    async getTotalPageNum(acid){
        //输出投稿对应的评论总页数
        return new Promise((resolve, reject) => {
            let acCommentApi='https://www.acfun.cn/rest/pc-direct/comment/list?sourceId='+acid+'&sourceType=3&page=1';
            fetch(acCommentApi)
            .then((res)=>{return res.text();})
                .then((res)=>{
                    let x=JSON.parse(res);
                    resolve(x.totalPage);
                })
            });    
        }

    async getMaxFloorNum(acid){
        //返回投稿楼层数（请勿与评论数混淆，楼层只是主楼层）
        let totalPageNum =await this.getTotalPageNum(acid).then((res)=>{return res});
        let acCommentApi='https://www.acfun.cn/rest/pc-direct/comment/list?sourceId='+acid+'&sourceType=3&page='+totalPageNum;
        let floorNum = (totalPageNum-1) * 50
        return new Promise((resolve, reject) => {
            fetch(acCommentApi)
                .then((res)=>{return res.text();})
                .then((res)=>{
                    let x=JSON.parse(res);
                    let lastPageFloorNum=x.rootComments.length;
                    resolve(floorNum + lastPageFloorNum);
                });
        })
    }

    async getVCdetailCommentData(acid,){
        let acCommentApi='https://www.acfun.cn/rest/pc-direct/comment/list?sourceId='+acid+'&sourceType=3&page=';
        let totalPageNum = await this.getTotalPageNum(acid).then((res)=>{return res});
        let Comm_data={};
        let Comm_data_UIDList=[];
        let Comm_data_byUID={};
        if(totalPageNum && totalPageNum >=1){
            //循环获取分页下的评论
            for(let i=1;i<=totalPageNum;i++){
                let jsonfy_comment =JSON.parse(await this.getResult(acCommentApi+i).then((res)=>{return res}));
                for(let j=0;j<jsonfy_comment.rootComments.length;j++){
                    let obj = jsonfy_comment.rootComments[j];
                    //跳过up主自己
                    if(obj.isUp){
                        continue;
                    }
                    Comm_data_UIDList.push(obj.userId);
                    Comm_data_byUID[obj.userId]=obj;
            }}
        }
        Comm_data['Comm_data_UIDList']=Comm_data_UIDList;
        Comm_data['Comm_data_byUID']=Comm_data_byUID;
        return Comm_data;
    }

    async getFollowingNum(QueryUserId){
        //判断查询用户关注列表是否存在Follow的用户UID
        let Api_url='https://www.acfun.cn/rest/pc-direct/user/userInfo?userId='+QueryUserId;
        return new Promise((resolve, reject) => {
            fetch(Api_url)
                .then((res)=>{return res.text();})
                .then((res)=>{
                    let x=JSON.parse(res);
                    resolve(x.profile.following);
                });
        })    
    }

    async isFollowed_old(QueryUserId,FollowUserId){
        //判断查询用户关注列表是否存在Follow的用户UID
        //直接使用会出现CORB跨域问题
        let qHdr=Number(await this.getFollowingNum(QueryUserId).then((res)=>{return res}))/100;
        qHdr%1? qHdr = qHdr+1:qHdr = qHdr;
        let Count = qHdr*100;
        let followApi='https://api-new.app.acfun.cn/rest/app/relation/getFollows?toUserId='+QueryUserId+'&pcursor=&count='+Count+'&page=0&groupId=0&action=7';
        return new Promise((resolve, reject) => {
            fetch(followApi,{headers: {"Content-Type": "application/json"}})
                .then((res)=>{return res.text();})
                .then((res)=>{
                    let x=JSON.parse(res);
                    for(let i=0;i<=x.friendList.length;i++){
                        if(x.friendList.userId[i] == FollowUserId){
                            resolve(true)
                        }else{
                            resolve(false)
                        }
                    }
                });
        })    
    }

    async isFollowed(QueryUserId){
        //使用用github@BDPO这位acer的新 判断是否关注PO主 的解决办法
        let checkApi = "https://www.acfun.cn/usercard.aspx?uid="+String(QueryUserId);
        return new Promise((resolve,reject)=>{
            fetch(checkApi).then((res)=>{return res.text();})
            .then((res)=>{
                let x = JSON.parse(res);
                if(x.userjson.isFriend==1){
                    resolve(true)
                }else if(x.userjson.isFriend==0){
                    resolve(false)
                }else{
                    resolve(false);
                }
            })
        })
    }


    async RollOut(acid,num){
        //主函数
        let y = await this.getVCdetailCommentData(acid).then((res)=>{return res});
        let max = y['Comm_data_UIDList'].length;
        if(num>max){
            num = max;
        }
        //let x = this.genNum(2,num,0,max);
        //console.log(x);
        var arr = new Array();
        let min = 0;
        while(arr.length<num){
            //获取随机下标
            let i = Math.floor(Math.random() * (max - min)) + min;

            let userId = y['Comm_data_UIDList'][i];
            let commentInfo = y['Comm_data_byUID'][userId];
            let url = this.messageFormat.replace("{userId}",userId);
            let lucyUser = {
                name : commentInfo.userName,
                url : url,
                comment : commentInfo.content,
                floor: commentInfo.floor,
            };
            arr.push(lucyUser);
            y['Comm_data_UIDList'].splice(i,1);
            max--;
        }



        /*for(let i in x){
            console.log(y['Comm_data_UIDList'][i]);
            console.log(y['Comm_data_byUID'][y['Comm_data_UIDList'][i]]);
            let userId = y['Comm_data_UIDList'][i];
            let commentInfo = y['Comm_data_byUID'][userId];
            let url = this.messageFormat.replace("{userId}",userId);
            let lucyUser = {
                name : commentInfo.userName,
                url : url,
                comment : commentInfo.content,
                floor: commentInfo.floor,
            }
            arr.push(lucyUser);
        }*/
        //显示抽奖结果
        var obj = document.getElementById("acfun-popup-helper");
        var frameWindow = obj.contentWindow;
        frameWindow.postMessage({
            action: 'showLucyResult',
            params: {
                arr:JSON.stringify(arr),
            }
        }, '*');
    }
}