/**
 * 幸运抽奖
 */
class LuckyTtab {
    constructor(){

    }

    genNum(mode,num=0,min=0,max){
        //输出随机数或随机数列表
        if(mode==1){
            return Math.floor(Math.random() * Math.floor(max))+min;
        }else if(mode==2){
            let result = [];
            for(let i=0;i<=num-1;i++){
                result.push(Math.floor(Math.random() * Math.floor(max))+min);
            }
            return result
        }
    }

    getTotalPageNum_old(acid){
        //输出投稿对应的评论总页数
        let a={};
        let acCommentApi='https://www.acfun.cn/rest/pc-direct/comment/list?sourceId='+acid+'&sourceType=3&page=1';
        // console.log(acCommentApi);
        let x = fetch(acCommentApi)
            .then((res)=>{return res.text();})
            .then((res)=>{
                let x=JSON.parse(res);
                var pageNum=x.totalPage;
                a['pageNum']=pageNum;
            });
        return a
    }

    getMaxFloorNum_old(acid){
        //返回投稿楼层数（请勿与评论数混淆，楼层只是主楼层）
        let totalPageNum =this.getTotalPageNum(acid);
        let acCommentApi='https://www.acfun.cn/rest/pc-direct/comment/list?sourceId='+acid+'&sourceType=3&page='+totalPageNum;
        let floorNum = (totalPageNum-1) * 50
        fetch(acCommentApi)
            .then((res)=>{return res.text();})
            .then((res)=>{
                let x=JSON.parse(res);
                var lastPageFloorNum=x.rootComments.length;
                return floorNum + lastPageFloorNum
            });
    }

    getCommentData_old(acid){
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

    getdetailCommentData_old(acid){
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

    getNRdetailCommentData_old(acid,){
        let acCommentApi='https://www.acfun.cn/rest/pc-direct/comment/list?sourceId='+acid+'&sourceType=3&page=';
        let totalPageNum = this.getTotalPageNum(acid);
        let Comm_data={};
        let Comm_data_UIDList=[];
        let Comm_data_byUID={};
        if(totalPageNum && totalPageNum >=1){
            //循环获取分页下的评论
            console.log('LuckyTtab.getNRdetailCommentData');
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
            console.log(Comm_data_UIDList);
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

    async isFollowed(QueryUserId,FollowUserId,Count=300){
        //判断查询用户关注列表是否存在Follow的用户UID
        let followApi='https://api-new.app.acfun.cn/rest/app/relation/getFollows?toUserId='+QueryUserId+'&pcursor=&count='+Count+'&page=0&groupId=0&action=7';
        return new Promise((resolve, reject) => {
            fetch(followApi)
                .then((res)=>{return res.text();})
                .then((res)=>{
                    let x=JSON.parse(res);
                    for(let i=0;i<=x.friendList.length;i++){
                        if(x.friendList.userId[i] == FollowUserId){
                            resolve(true)
                            break
                        }else{
                            resolve(false)
                            break
                        }
                    }
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
                console.log(jsonfy_comment);
                for(let j=0;j<jsonfy_comment.rootComments.length;j++){
                    Comm_data_UIDList.push(jsonfy_comment.rootComments[j].userId);
                    Comm_data_byUID[jsonfy_comment.rootComments[j].userId]=jsonfy_comment.rootComments[j];
            }}
        }
        Comm_data['Comm_data_UIDList']=Comm_data_UIDList;
        Comm_data['Comm_data_byUID']=Comm_data_byUID;
        console.log(Comm_data);
        return Comm_data;
    }

    async RollOut(acid,num,isFollowed){
        //主函数
        let y = await this.getVCdetailCommentData(acid).then((res)=>{return res});
        let x = this.genNum(2,num,1,y['Comm_data_UIDList'].length);
        for(let i of x){
            console.log(y['Comm_data_UIDList'][i]);
            console.log(y['Comm_data_byUID'][y['Comm_data_UIDList'][i]]);
        }
    }
}