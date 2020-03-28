$.fn.extend({
    wxshow:function(){
        //let qrUrl = await getQrUrl();
        $('#ncb-shade-timeout').hide();
        $('#ncb-shade').hide();
        $(this).show();
    },
    wxhide:function () {
        $(this).hide();
    }

})