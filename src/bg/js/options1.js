var clickFlag = true;


function save_options() {
    var items = [];

    $('.site-tr').each(function () {
        var uid = $(this).children('td').eq(0).text();
        var up_url = $(this).children('td').eq(0).find('a').attr('href');
        var name = $(this).children('td').eq(1).text();
        var bananaNum = $(this).children('td').eq(2).text().replace('蕉','');
        var obj = {
          uid:uid,
          name:name,
          bananaNum:bananaNum,
          up_url:up_url
        };
        items.push(obj);
    });

    chrome.storage.local.set({
        to_special_items: items
    }, function () {
        options.to_special_items = items;
        odhback().opt_optionUpdate(options);
        location.reload();
    });
}

function updateUi() {
    if (auto_throw) {
        $('#switch').removeClass('switch-open').addClass('switch-close').attr('src', 'images/on.png');
        $(".huaci_selections").css('color','#333');
        $('#custom').removeClass('closed');
        $('#custom').removeClass('text-closed');
        $('#thead-tip').removeClass('text-closed');
        $('#thead-tip-special').removeClass('text-closed');
        $('#add').removeClass('text-closed');
        $('.remove').removeClass('text-closed');
        $('.site a').removeClass('text-closed');
        $('.autoTranslate').css('background', '#fff');
    } else {
        $('#switch').removeClass('switch-close').addClass('switch-open').attr('src', 'images/off.png');
        $('#custom').addClass('closed');
        $('#custom').addClass('text-closed');
        $('#thead-tip').addClass('text-closed');
        $('#thead-tip-special').addClass('text-closed');
        $('#add').addClass('text-closed');
        $('.remove').addClass('text-closed');
        $('.site a').addClass('text-closed');
        $('.autoTranslate').css('background', '#ededed');
        $(".huaci_selections").css('color','#d8d8d8');
    }
}

function detectUi() {
    if (banana_notice) {
        $('#detect-switch').addClass('switch-close').attr('src', 'images/on.png');
        $('.div-lang-detect').css('background', '#fff');
        $('#detect-switch-l p').css('color', '#333');
    } else {
        $('#detect-switch').addClass('switch-open').attr('src', 'images/off.png');
        $('.div-lang-detect').css('background', '#ededed');
        $('#detect-switch-l p').css('color', '#ccc');
    }
}

function huaciUi() {
    /* globals huaci_switch */
    if (huaci_switch) {
        $('#huaci_switch').attr('src', 'images/on.png');
        $('#huaci_options').css('color', '#333');
        $('#fanyi_huaci').css({background: '#fff', color: '#333'});
        $('.huaci_selections').siblings('hr').css('border-bottom', '1px solid #eee');
        // 还要分别判断 btn 和frame
    } else {
        $('#huaci_switch').attr('src', 'images/off.png');
        $('#huaci_options').css('color', '#ccc');
        $('#fanyi_huaci').css({background: '#ededed', color: '#ccc'});
        $('.huaci_selections').siblings('hr').css('border-bottom', '1px solid #ddd');
        // 还要分别判断 btn 和 frame
    }
}

function attentionUi() {
    if (to_attention) {
        $('#attention_switch').attr('src', 'images/selected.png');
        $('#specific_switch').attr('src', 'images/unselected.png');
        $("#attention").show();
        $("#specific").hide();
    } else {
        $('#attention_switch').attr('src', 'images/unselected.png');
        $('#specific_switch').attr('src', 'images/selected.png');
        $("#attention").hide();
        $("#specific").show();
    }
}


function attentionNumUi() {
    let id = "num"+to_attention_num;
    $("#"+id).attr('src', 'images/selected.png');
    $("#"+id).siblings().attr('src', 'images/unselected.png');
}

/*
    auto_throw:自动投蕉
    to_attention:给已关注up主投
    to_attention_num:给已关注up主投蕉数量
    to_special:给指定up主投
    to_special_items:指定up的投蕉配置，数组
*/
var default_options={
    auto_throw:false,
    to_attention:true,
    to_attention_num:5,
    to_special_items:[]

}

function restore_options() {
    chrome.storage.local.get(null, function (items) {
        options = transOptions(items);
        //console.log('options', options);
        auto_throw = options['auto_throw'];
        to_attention = options['to_attention'];
        to_special = options['to_special'];
        to_attention_num = options['to_attention_num'];
        to_special_items = options['to_special_items'];
        banana_notice = options['banana_notice'];
        attentionUi();
        attentionNumUi();
        detectUi();


        if (to_special_items && to_special_items.length > 0) {
            $('#custom').addClass('table-custom-padding');
            for (var i in to_special_items) {
                var item = to_special_items[i];
                $('#custom').append('\
          <tr class="site-tr">\
              <td class="site"><a href="' + item.up_url + '" target="_blank">' + item.uid + '</a></td>\
              <td class="site"><a href="' + item.up_url + '" target="_blank">' + item.name + '</a></td>\
              <td class="site-name">' + item.bananaNum + '蕉</td>\
              <td class="site-remove"><a href="#" class="remove">移除</a></td>\
            </tr>');
                $('.remove').click(function () {
                    if (auto_throw) {
                        $(this).parent().parent().remove();
                        save_options();
                    }
                });
            }
        } else {
            $('#custom').append('\
        <tr id="blank">\
          <td class="custom-nothing">无</td>\
        </tr>');
        }

        updateUi();
    });
}

restore_options();

$(document).ready(function () {
    $('#switch').click(function () {
        if (auto_throw) {
            options.auto_throw=false;
            chrome.storage.local.set({
                'auto_throw':false
            }, function () {
                // location.reload();
                auto_throw = false;
                updateUi();
                odhback().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.auto_throw=true;
            chrome.storage.local.set({
                'auto_throw':true
            }, function () {
                // location.reload();
                auto_throw = true;
                updateUi();
                odhback().opt_optionUpdate(options);
            });
        }
    });

    $('#detect-switch-r').click(function () {
        if (banana_notice) {
            options.banana_notice=false;
            chrome.storage.local.set({
                'banana_notice':false
            }, function () {
                // location.reload();
                banana_notice = false;
                detectUi();
                odhback().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.banana_notice=true;
            chrome.storage.local.set({
                'banana_notice':true
            }, function () {
                // location.reload();
                banana_notice = true;
                detectUi();
                odhback().opt_optionUpdate(options);
            });
        }
    });


    $("h1").click(function () {
        chrome.storage.local.remove('options', function() {
            console.log('remove ');
        });
    });


    $('#attention_switch').click(function () {
        if (auto_throw) {
            if (!to_attention) {
                options.to_attention = true;
                chrome.storage.local.set({
                    'to_attention': true
                }, function () {
                    /* globals huaci_button */
                    to_attention = true;
                    attentionUi();
                    odhback().opt_optionUpdate(options);
                });
            }
        }
    });

    $('#specific_switch').click(function () {
        if (auto_throw) {
            if (to_attention) {
                options.to_attention = false;
                chrome.storage.local.set({
                    'to_attention': false
                }, function () {
                    /* globals huaci_button */
                    to_attention = false;
                    attentionUi();
                    odhback().opt_optionUpdate(options);
                });
            }
        }
    });

    $(".attention_num").click(function () {
        if(auto_throw && to_attention){
            let flag = $(this).attr('src');
            let attention_num = $(this).data('num');
            if(flag == 'images/unselected.png'){
                $(this).attr('src', 'images/selected.png');
                $(this).siblings().attr('src', 'images/unselected.png');
            }else{
                //$(this).attr('src', 'images/unselected.png');
                //$(this).siblings().attr('src', 'images/selected.png');
            }
            options.to_attention_num = attention_num;
            chrome.storage.local.set({
                'to_attention_num': attention_num
            }, function () {
                to_attention_num = attention_num;
                odhback().opt_optionUpdate(options);
            });
        }
    });



    $('#save').click(function () {
        save_options();
    });

    var url_expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var url_regex = new RegExp(url_expression);
    var uidReg = new RegExp("\\d+");

    var c_id = 0;
    $('#add').on('click', function () {
        if ($('.add-tr').length <= 0 && auto_throw) {
            if (!$('#custom').hasClass('table-custom-padding')) {
                $('#custom').addClass('table-custom-padding');
            }
            $('#custom').before('\
        <table id="' + c_id + '" class="add-table">\
          <tr class="add-tr">\
            <td class="td-add-input">\
              <input type="text" class="form-control site" placeholder="请输入up主uid" required>\
            </td>\
            <td class="td-add-input">\
                <select style="height: 25px"><option value="0">请选择投蕉数</option><option value="1">1蕉</option><option value="2">2蕉</option><option value="3">3蕉</option><option value="4">4蕉</option><option value="5">5蕉</option></select>\
            </td>\
            <td class="td-add-button">\
              <button type="button" class="switch-open add-confirm" style="width:79px;float: none;margin-left:16px;">添加</button>\
            </td>\
            <td class="td-add-remove-button">\
              <button type="button" class="switch-close add-remove" style="width:79px;float: none;">取消</button>\
            </td>\
          </tr>\
          <tr><td class="fail"></td></tr>\
        </table>');
            $('.add-remove').on('click',async function () {
                $(this).parent().parent().parent().parent().remove();
                if ($('.site').length <= 0) {
                    $('#custom').removeClass('table-custom-padding');
                }
            });
            $('#' + c_id + ' .add-confirm').on('click',async function () {
                $('.fail').hide();



                var input_valid = true;
                var uid_input = $(this).parent().prev().prev().children('input').val().replace('。', '.').replace('http://', '').replace('https://', '');
                var bananaNum = $(this).parent().prev().children('select').val();
                if (uid_input === '') {
                    $('.fail').text('输入内容不能为空');
                    $('.fail').show();
                    input_valid = false;
                }else if(bananaNum==0){
                    $('.fail').text('请选择投蕉数');
                    $('.fail').show();
                    input_valid = false;
                } else if (!uid_input.match(uidReg)) {
                    $('.fail').text('uid必须为数字');
                    $('.fail').show();
                    input_valid = false;
                }
                if(!input_valid){
                    return;
                }
                //判断此uid是否存在
                let res_items =await getStorage({'to_special_items':[]});
                let item_arr = res_items.to_special_items;

                for(let item of item_arr){
                    if(item.uid && item.uid==uid_input){
                        input_valid = false;
                        $('.fail').text('uid已存在');
                        $('.fail').show();
                        break;
                    }
                }

                if (input_valid) {
                    //根据uid解析出up主姓名
                    $("body").mLoading("show");
                    let up_url = options.upUrlTemplate.replace('{uid}',uid_input);
                    var up_html_str ;
                    try{
                        up_html_str = await ajax('GET',up_url);
                    }catch (e) {
                        $("body").mLoading("hide");
                        $('.fail').text('此uid不存在');
                        $('.fail').show();
                        return;
                    }
                    let up_name = $('<div></div>').html(up_html_str).find('.name.fl.text-overflow')[0].innerText;

                    if(up_name=='' || up_name==undefined){
                        $("body").mLoading("hide");
                        $('.fail').text('此uid不存在');
                        $('.fail').show();
                        return;
                    }



                    $('#custom #blank').remove();
                    $('#custom').prepend('\
            <tr class="site-tr">\
              <td class="site"><a href="' + up_url + '" target="_blank">' + uid_input + '</a></td>\
              <td class="site"><a href="' + up_url + '" target="_blank">' + up_name + '</a></td>\
              <td class="site-name">' + bananaNum + '蕉</td>\
              <td class="site-remove"><a href="#" class="remove">移除</a></td>\
            </tr>');
                    $(this).parent().parent().parent().parent().remove();
                    $('.remove').on('click', function () {
                        if (auto_throw) {
                            $(this).parent().parent().remove();
                            save_options();
                        }
                    });
                    save_options();
                    $("body").mLoading("hide");
                }
            });

            c_id += 1;
        }
    });
});