function ByteArray(){
    this.list=[];
    this.byteOffset=0;
    this.length=0;
}
var p=ByteArray.prototype;
p.push=function(unit8Arr){
    this.list.push(unit8Arr);
    this.length+=unit8Arr.length;
}
p.readBytes=function(len){
    if(len>0){
        let rbuf=new Uint8Array(len);
        let rbuf_ind=0;
        while(rbuf_ind<len){
            if(this.list.length>0){
                let tmpbuf=this.list.shift();
                let tmplen=tmpbuf.length;
                let last_len=len-rbuf_ind;
                if(tmplen>=last_len){
                    //足夠了
                    let tmpbuf2 = tmpbuf.subarray(0, last_len);
                    rbuf.set(tmpbuf2,rbuf_ind);
                    rbuf_ind+=tmpbuf2.length;
                    if(last_len<tmplen){
                        let newUint8Array = tmpbuf.subarray(last_len, tmplen);
                        this.list.unshift(newUint8Array);
                    }
                    break;
                }else{
                    rbuf.set(tmpbuf,rbuf_ind);
                    rbuf_ind+=tmplen;
                }
            }else{
                rbuf=rbuf.subarray(0, rbuf_ind);
                break;
            }
        }
        this.length-=rbuf.length;
        return rbuf;
    }
    return null;
}
exports.byteArray=ByteArray;