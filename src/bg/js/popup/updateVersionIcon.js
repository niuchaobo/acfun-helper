export default function updateVersionIcon(){
    chrome.storage.local.get(["Upgradeable"],  (data)=> {
        if(data.Upgradeable === 1){
            $('#update-box').css('display','inline-block')
            $('.update-letter').html('助手有轻量更新，点击查看')
            $('.head').addClass('lightUpdate')
            $('#update-box').click(()=>{
                window.open('https://www.acfun.cn/u/7054138')
            })
            return
        }
        if(data.Upgradeable === 2){
            $('#update-box').css('display','inline-block')
            $('.update-letter').html('助手有重大更新，点击查看')
            $('.update-icon').css('background','red')
            $('#update-box').click(()=>{
                window.open('https://www.acfun.cn/u/7054138')
            })
            $('.head').addClass('heavyUpdate')
            return 
        }
      }); 
}
