var clickFlag = true;


function save_options() {
    var items = [];

    $('#custom .site-tr').each(function () {
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
        //odhback().opt_optionUpdate(options);
        //location.reload();
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
        $('#custom .site a').removeClass('text-closed');
        $('.autoTranslate').css('background', '#fff');
        $('.autoTranslate h3').css('color', '#333');
    } else {
        $('#switch').removeClass('switch-close').addClass('switch-open').attr('src', 'images/off.png');
        $('#custom').addClass('closed');
        $('#custom').addClass('text-closed');
        $('#thead-tip').addClass('text-closed');
        $('#thead-tip-special').addClass('text-closed');
        $('#add').addClass('text-closed');
        $('.remove').addClass('text-closed');
        $('#custom .site a').addClass('text-closed');
        $('.autoTranslate').css('background', '#ededed');
        $(".huaci_selections").css('color','#d8d8d8');
        $('.autoTranslate h3').css('color', '#ccc');
    }
}

function detectUi() {
    if (banana_notice) {
        $('#detect-switch').addClass('switch-close').attr('src', 'images/on.png');
        $('.div-lang-detect').css('background', '#fff');
        $('#detect-switch-l p').css('color', '#333');
        $(".div-lang-detect h3").css('color', '#333');
    } else {
        $('#detect-switch').addClass('switch-open').attr('src', 'images/off.png');
        $('.div-lang-detect').css('background', '#ededed');
        $('#detect-switch-l p').css('color', '#ccc');
        $(".div-lang-detect h3").css('color', '#ccc');
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

function commentUi(){
    if (mark) {
        $('#mark-switch').addClass('switch-close').attr('src', 'images/on.png');
        $('.div-common-mark').css('background', '#fff');
        $('#mark-switch-l p').css('color', '#333');
        $('.div-common-mark h3').css('color', '#333');

        $(".div-user-list").css('background', '#fff');
        $('.div-user-list td').css('color', '#333');
        $('.div-user-list .site a').removeClass('text-closed');
        $('.div-user-list .site-name a').removeClass('text-closed');
        $('.div-user-list .scan-remove').removeClass('text-closed');
        $('#mark-add').removeClass('text-closed');


    } else {
        $('#mark-switch').addClass('switch-open').attr('src', 'images/off.png');
        $('.div-common-mark').css('background', '#ededed');
        $('#mark-switch-l p').css('color', '#ccc');
        $('.div-common-mark h3').css('color', '#ccc');

        $(".div-user-list").css('background', '#ededed');
        $('.div-user-list td').css('color', '#ccc');
        $('.div-user-list .site a').addClass('text-closed');
        $('.div-user-list .site-name a').addClass('text-closed');
        $('.div-user-list .scan-remove').addClass('text-closed');
        $('#mark-add').addClass('text-closed');
    }

    if (scan) {
        $('#scan-switch').addClass('switch-close').attr('src', 'images/on.png');
        $('.div-common-scan').css('background', '#fff');
        $('#scan-switch-l p').css('color', '#333');
        $('.div-common-scan h3').css('color', '#333');
    } else {
        $('#scan-switch').addClass('switch-open').attr('src', 'images/off.png');
        $('.div-common-scan').css('background', '#ededed');
        $('#scan-switch-l p').css('color', '#ccc');
        $('.div-common-scan h3').css('color', '#ccc');
    }

    //up主的评论显示up主标记
    if (upHighlight) {
        $('#up-switch').addClass('switch-close').attr('src', 'images/on.png');
        $('.div-common-up').css('background', '#fff');
        $('#up-switch-l p').css('color', '#333');
        $('.div-common-up h3').css('color', '#333');
        $('.div-common-up img').removeClass('gray-img');
    } else {
        $('#up-switch').addClass('switch-open').attr('src', 'images/off.png');
        $('.div-common-up').css('background', '#ededed');
        $('#up-switch-l p').css('color', '#ccc');
        $('.div-common-up h3').css('color', '#ccc');
        $('.div-common-up img').addClass('gray-img');
    }


}

function filterUi() {
    if(filter){
        $('#filter-switch').addClass('switch-close').attr('src', 'images/on.png');
        $('.div-filter-switch').css('background', '#fff');
        $('#filter-switch-l p').css('color', '#333');
        $('.div-filter-switch h3').css('color', '#333');

        $(".div-filter-list").css('background', '#fff');
        $('.div-filter-list td').css('color', '#333');
        $('.div-filter-list .site a').removeClass('text-closed');
        $('.div-filter-list .site-name a').removeClass('text-closed');
        $('.div-filter-list .filter-remove').removeClass('text-closed');
        $('#filter-add').removeClass('text-closed');
    }else{
        $('#filter-switch').addClass('switch-open').attr('src', 'images/off.png');
        $('.div-filter-switch').css('background', '#ededed');
        $('#filter-switch-l p').css('color', '#ccc');
        $('.div-filter-switch h3').css('color', '#ccc');

        $(".div-filter-list").css('background', '#ededed');
        $('.div-filter-list td').css('color', '#ccc');
        $('.div-filter-list .site a').addClass('text-closed');
        $('.div-filter-list .site-name a').addClass('text-closed');
        $('.div-filter-list .filter-remove').addClass('text-closed');
        $('#filter-add').addClass('text-closed');
    }
    
}


function beautifyUi() {
    if (beautify_nav) {
        $('#nav-switch').addClass('switch-close').attr('src', 'images/on.png');
        $('.div-nav-switch').css('background', '#fff');
        $('#nav-switch-l p').css('color', '#333');
        $('.div-nav-switch h3').css('color', '#333');
    } else {
        $('#nav-switch').addClass('switch-open').attr('src', 'images/off.png');
        $('.div-nav-switch').css('background', '#ededed');
        $('#nav-switch-l p').css('color', '#ccc');
        $('.div-nav-switch h3').css('color', '#ccc');
    }
    if (beautify_personal) {
        $('#personal-switch').addClass('switch-close').attr('src', 'images/on.png');
        $('.div-personal-switch').css('background', '#fff');
        $('#personal-switch-l p').css('color', '#333');
        $('.div-personal-switch h3').css('color', '#333');
    } else {
        $('#personal-switch').addClass('switch-open').attr('src', 'images/off.png');
        $('.div-personal-switch').css('background', '#ededed');
        $('#personal-switch-l p').css('color', '#ccc');
        $('.div-personal-switch h3').css('color', '#ccc');
    }

    if (show_like) {
        $('#like-switch').addClass('switch-close').attr('src', 'images/on.png');
        $('.div-like-switch').css('background', '#fff');
        $('#like-switch-l p').css('color', '#333');
        $('.div-like-switch h3').css('color', '#333');
    } else {
        $('#like-switch').addClass('switch-open').attr('src', 'images/off.png');
        $('.div-like-switch').css('background', '#ededed');
        $('#like-switch-l p').css('color', '#ccc');
        $('.div-like-switch h3').css('color', '#ccc');
    }
}


function customVideoUi(){
    if (custom_rate) {
        $('#rate-switch').addClass('switch-close').attr('src', 'images/on.png');
        $('.div-rate-switch').css('background', '#fff');
        $('#rate-switch-l p').css('color', '#333');
        $('.div-rate-switch h3').css('color', '#333');
    } else {
        $('#rate-switch').addClass('switch-open').attr('src', 'images/off.png');
        $('.div-rate-switch').css('background', '#ededed');
        $('#rate-switch-l p').css('color', '#ccc');
        $('.div-rate-switch h3').css('color', '#ccc');
    }
}

function playModeUi() {
    let id = "mode_"+player_mode;
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
        // console.log('options', options);
        auto_throw = options['auto_throw'];
        to_attention = options['to_attention'];
        to_special = options['to_special'];
        to_attention_num = options['to_attention_num'];
        to_special_items = options['to_special_items'];
        banana_notice = options['banana_notice'];
        mark = options['mark'];
        scan = options['scan'];
        upHighlight = options['upHighlight'];
        scanUserMap = userMap(items);
        filter = options['filter'];
        filterUps = upMap(items);
        beautify_nav = options['beautify_nav'];
        beautify_personal = options['beautify_personal'];
        show_like = options['show_like'];
        custom_rate = options['custom_rate'];
        player_mode = options['player_mode'];


        attentionUi();
        attentionNumUi();
        detectUi();
        beautifyUi();
        customVideoUi();
        playModeUi();



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

        if(scanUserMap && scanUserMap.size>0){
            $('#scan-users').addClass('table-custom-padding');
            scanUserMap.forEach(function(value,key) {
                let userId = key.replace("AC_","");
                let user_home = options.upUrlTemplate.replace("{uid}",userId);
                $('#scan-users').append('\
          <tr class="site-tr">\
              <td class="site"><a href="' + user_home + '" target="_blank">' + userId + '</a></td>\
              <td class="site-name"><a href="' + user_home + '" target="_blank">' + value.name + '</a></td>\
              <td class="site-tag">' + value.tag + '</td>\
              <td class="site-remove"><span href="#" data-key="'+key+'" class="scan-remove">移除</span></td>\
            </tr>');

            })
            $('.scan-remove').click(function () {
                if (mark) {
                    let key = $(this).data("key");
                    $(this).parent().parent().remove();
                    chrome.storage.local.remove(key, function(){
                        //do something
                    });
                }
            });
        }else{
            $('#scan-users').append('\
                <tr id="mark-blank">\
                  <td class="custom-nothing">无</td>\
                </tr>');
        }
        commentUi();



        if(filterUps && filterUps.size>0){
            $('#filter-ups').addClass('table-custom-padding');
            filterUps.forEach(function(value,key) {
                let userId = key.replace("FILTER_","");
                let user_home = options.upUrlTemplate.replace("{uid}",userId);
                $('#filter-ups').append('\
          <tr class="site-tr">\
              <td style="width: 200px;" class="site"><a href="' + user_home + '" target="_blank">' + userId + '</a></td>\
              <td class="site-name"><a href="' + user_home + '" target="_blank">' + value.name + '</a></td>\
              <td class="site-remove"><span href="#" data-key="'+key+'" class="filter-remove">移除</span></td>\
            </tr>');

            })
            $('.filter-remove').click(function () {
                if (filter) {
                    let key = $(this).data("key");
                    $(this).parent().parent().remove();
                    chrome.storage.local.remove(key, function(){
                        //do something
                    });
                }
            });
        }else{
            $('#filter-ups').append('\
                <tr id="filter-blank">\
                  <td class="custom-nothing">无</td>\
                </tr>');
        }
        filterUi()
    });
}


$(document).ready(function () {
    restore_options();

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
        /*chrome.storage.local.clear(function(){
            console.log('clear');
        });*/
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

    $('#up-switch-r').click(function () {
        if (upHighlight) {
            options.upHighlight=false;
            chrome.storage.local.set({
                'upHighlight':false
            }, function () {
                // location.reload();
                upHighlight = false;
                commentUi()
                odhback().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.upHighlight=true;
            chrome.storage.local.set({
                'upHighlight':true
            }, function () {
                // location.reload();
                upHighlight = true;
                commentUi();
                odhback().opt_optionUpdate(options);
            });
        }
    });


    $('#scan-switch-r').click(function () {
        if (scan) {
            options.scan=false;
            chrome.storage.local.set({
                'scan':false
            }, function () {
                // location.reload();
                scan = false;
                commentUi()
                odhback().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.scan=true;
            chrome.storage.local.set({
                'scan':true
            }, function () {
                // location.reload();
                scan = true;
                commentUi();
                odhback().opt_optionUpdate(options);
            });
        }
    });

    $('#mark-switch-r').click(function () {
        if (mark) {
            options.mark=false;
            chrome.storage.local.set({
                'mark':false
            }, function () {
                // location.reload();
                mark = false;
                commentUi()
                odhback().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.mark=true;
            chrome.storage.local.set({
                'mark':true
            }, function () {
                // location.reload();
                mark = true;
                commentUi();
                odhback().opt_optionUpdate(options);
            });
        }
    });

    $('#filter-switch-r').click(function () {
        if (filter) {
            options.filter=false;
            chrome.storage.local.set({
                'filter':false
            }, function () {
                // location.reload();
                filter = false;
                filterUi();
                odhback().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.filter=true;
            chrome.storage.local.set({
                'filter':true
            }, function () {
                // location.reload();
                filter = true;
                filterUi();
                odhback().opt_optionUpdate(options);
            });
        }
    });

    $('#nav-switch-r').click(function () {
        if (beautify_nav) {
            options.beautify_nav=false;
            chrome.storage.local.set({
                'beautify_nav':false
            }, function () {
                // location.reload();
                beautify_nav = false;
                beautifyUi();
                odhback().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.beautify_nav=true;
            chrome.storage.local.set({
                'beautify_nav':true
            }, function () {
                // location.reload();
                beautify_nav = true;
                beautifyUi();
                odhback().opt_optionUpdate(options);
            });
        }
    });

    $('#personal-switch-r').click(function () {
        if (beautify_personal) {
            options.beautify_personal=false;
            chrome.storage.local.set({
                'beautify_personal':false
            }, function () {
                // location.reload();
                beautify_personal = false;
                beautifyUi();
                odhback().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.beautify_personal=true;
            chrome.storage.local.set({
                'beautify_personal':true
            }, function () {
                // location.reload();
                beautify_personal = true;
                beautifyUi();
                odhback().opt_optionUpdate(options);
            });
        }
    });

    $('#like-switch-r').click(function () {
        if (show_like) {
            options.show_like=false;
            chrome.storage.local.set({
                'show_like':false
            }, function () {
                // location.reload();
                show_like = false;
                beautifyUi();
                odhback().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.show_like=true;
            chrome.storage.local.set({
                'show_like':true
            }, function () {
                // location.reload();
                show_like = true;
                beautifyUi();
                odhback().opt_optionUpdate(options);
            });
        }
    });


    $('#rate-switch-r').click(function () {
        if (custom_rate) {
            options.custom_rate=false;
            chrome.storage.local.set({
                'custom_rate':false
            }, function () {
                // location.reload();
                custom_rate = false;
                customVideoUi();
                odhback().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.custom_rate=true;
            chrome.storage.local.set({
                'custom_rate':true
            }, function () {
                // location.reload();
                custom_rate = true;
                customVideoUi();
                odhback().opt_optionUpdate(options);
            });
        }
    });


    $(".player_mode").click(function () {
            let flag = $(this).attr('src');
            let mode = $(this).data('mode');
            if(flag == 'images/unselected.png'){
                $(this).attr('src', 'images/selected.png');
                $(this).siblings().attr('src', 'images/unselected.png');
            }else{
                //$(this).attr('src', 'images/unselected.png');
                //$(this).siblings().attr('src', 'images/selected.png');
            }
            options.player_mode = mode;
            chrome.storage.local.set({
                'player_mode': mode
            }, function () {
                player_mode = mode;
                odhback().opt_optionUpdate(options);
            });
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
                if ($('#custom .site').length <= 0) {
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
                    let up_url =options.upUrlTemplate.replace('{uid}',uid_input);
                    let up_info = options.userInfo.replace('{uid}',uid_input);
                    var up_html_str ;
                    try{
                        up_html_str = await ajax('GET',up_info);
                        console.log(up_html_str);
                    }catch (e) {
                        $("body").mLoading("hide");
                        $('.fail').text('此uid不存在');
                        $('.fail').show();
                        return;
                    }
                    let up_name = JSON.parse(up_html_str).profile.name;

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
              <td class="site-remove"><a href="#" class="remove">移除</a href="#"></td>\
            </tr>');
                    $(this).parent().parent().parent().parent().remove();
                    $('#specific').on('click','.remove', function () {
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








    var m_id = 0;
    $('#mark-add').on('click', function () {
        if ($('.mark-add-tr').length <= 0 && mark) {
            if (!$('#scan-users').hasClass('table-custom-padding')) {
                $('#scan-users').addClass('table-custom-padding');
            }
            $('#scan-users').before('\
        <table id="mark' + m_id + '" class="add-table">\
          <tr class="mark-add-tr">\
            <td class="td-add-input">\
              <input type="text" class="form-control site" placeholder="请输入用户uid" required>\
            </td>\
            <td class="td-add-input">\
                <input type="text" class="form-control site" placeholder="请输入标记，最多10个字符" required>\
            </td>\
            <td class="td-add-button">\
              <button type="button" class="switch-open mark-add-confirm" style="width:79px;float: none;margin-left:16px;">添加</button>\
            </td>\
            <td class="td-add-remove-button">\
              <button type="button" class="switch-close mark-add-remove" style="width:79px;float: none;">取消</button>\
            </td>\
          </tr>\
          <tr><td class="mark-fail"></td></tr>\
        </table>');
            $('.mark-add-remove').on('click',async function () {
                $(this).parent().parent().parent().parent().remove();
                if ($('#scan-users .site').length <= 0) {
                    $('#scan-users').removeClass('table-custom-padding');
                }
            });
            $('#mark' + m_id + ' .mark-add-confirm').on('click',async function () {
                $('.mark-fail').hide();



                var input_valid = true;
                var uid_input = $(this).parent().prev().prev().children('input').val();
                var _tag = $(this).parent().prev().children('input').val();
                let user_key = "AC_"+uid_input;
                var tag = _tag.trim();
                if (uid_input === '') {
                    $('.mark-fail').text('输入内容不能为空');
                    $('.mark-fail').show();
                    input_valid = false;
                }else if(tag==''){
                    $('.mark-fail').text('请输入标记');
                    $('.mark-fail').show();
                    input_valid = false;
                }else if(tag.length>10){
                    $('.mark-fail').text('标记最多10个字符');
                    $('.mark-fail').show();
                    input_valid = false;
                } else if (!uid_input.match(uidReg)) {
                    $('.mark-fail').text('uid必须为数字');
                    $('.mark-fail').show();
                    input_valid = false;
                }
                if(!input_valid){
                    return;
                }
                //判断此uid是否存在
                let ac_res =await getStorage("AC_"+uid_input).then(value=>{return value["AC_"+uid_input]});
                if(ac_res!=undefined && ac_res!=null && ac_res.tag!=''){
                    input_valid = false;
                    $('.mark-fail').text('此用户已被标记');
                    $('.mark-fail').show();
                }

                if (input_valid) {
                    //根据uid解析出up主姓名
                    $("body").mLoading("show");
                    let up_url = options.userInfo.replace('{uid}',uid_input);
                    var up_html_str ;
                    try{
                        up_html_str = await ajax('GET',up_url);
                    }catch (e) {
                        $("body").mLoading("hide");
                        $('.mark-fail').text('此uid不存在');
                        $('.mark-fail').show();
                        return;
                    }
                    let up_name = JSON.parse(up_html_str).profile.name;

                    if(up_name=='' || up_name==undefined){
                        $("body").mLoading("hide");
                        $('.mark-fail').text('此uid不存在');
                        $('.mark-fail').show();
                        return;
                    }

                    let user_scan={
                        name:up_name,
                        tag:tag
                    }
                    chrome.storage.local.set({[user_key]:user_scan}, function(){
                        $('#scan-users #mark-blank').remove();
                        $('#scan-users').prepend('\
                      <tr class="site-tr">\
                          <td class="site"><a href="' + up_url + '" target="_blank">' + uid_input + '</a></td>\
                          <td class="site-name"><a href="' + up_url + '" target="_blank">' + up_name + '</a></td>\
                          <td class="site-tag">' + tag + '</td>\
                          <td class="site-remove"><span href="#" class="scan-remove">移除</span></td>\
                        </tr>');
                    });

                    $(this).parent().parent().parent().parent().remove();
                    $('#scan-users').on('click','.scan-remove', function () {
                        if (mark) {
                            $(this).parent().parent().remove();
                            chrome.storage.local.remove(user_key, function(){
                                //do something
                            });
                        }
                    });
                    $("body").mLoading("hide");
                }
            });

            m_id += 1;
        }
    });

    //=====================评论区评论ID快速跳转================
    chrome.storage.local.get(['commentEasyJump'],function(items){
        var commentEasyJumpsw= items.commentEasyJump;
        if(commentEasyJumpsw){
            document.getElementById('commentEasyJump').checked='true';
        }else{
            document.getElementById('commentEasyJump').checked=false;
        }
        $('#commentEasyJump').on('click', function () {
            if(!document.getElementById('commentEasyJump').checked){
                document.getElementById('commentEasyJump').checked=false;
                chrome.storage.local.set({'commentEasyJump':false});
            }else{
                document.getElementById('commentEasyJump').checked=true;
                chrome.storage.local.set({'commentEasyJump':true});
            }
        });
    });

    //=====================页面优化============================
    chrome.storage.local.get(['hideAd'],function(items){
        var ifHideAd= items.hideAd;
        if(ifHideAd){
            document.getElementById('hideAd').checked='true';
        }else{
            document.getElementById('hideAd').checked=false;
        }
        $('#hideAd').on('click', function () {
            if(!document.getElementById('hideAd').checked){
                document.getElementById('hideAd').checked=false;
                chrome.storage.local.set({'hideAd':false});
            }else{
                document.getElementById('hideAd').checked=true;
                chrome.storage.local.set({'hideAd':true});
            }
        });
    });

    chrome.storage.local.get(['liveHideAd'],function(items){
        var liveHideAd= items.liveHideAd;
        if(liveHideAd){
            document.getElementById('liveHideAd').checked='true';
        }else{
            document.getElementById('liveHideAd').checked=false;
        }
        $('#liveHideAd').on('click', function () {
            if(!document.getElementById('liveHideAd').checked){
                document.getElementById('liveHideAd').checked=false;
                chrome.storage.local.set({'liveHideAd':false});
            }else{
                document.getElementById('liveHideAd').checked=true;
                chrome.storage.local.set({'liveHideAd':true});
            }
        });
    });

    chrome.storage.local.get(['livePlayerEnhc'],function(items){
        var livePlayerEnhc= items.livePlayerEnhc;
        if(livePlayerEnhc){
            document.getElementById('livePlayerEnhc').checked='true';
        }else{
            document.getElementById('livePlayerEnhc').checked=false;
        }
        $('#livePlayerEnhc').on('click', function () {
            if(!document.getElementById('livePlayerEnhc').checked){
                document.getElementById('livePlayerEnhc').checked=false;
                chrome.storage.local.set({'livePlayerEnhc':false});
            }else{
                document.getElementById('livePlayerEnhc').checked=true;
                chrome.storage.local.set({'livePlayerEnhc':true});
            }
        });
    });

    //=====================弹幕搜索================
    chrome.storage.local.get(['PlayerDamakuSearchSw'],function(items){
        var PlayerDamakuSearchSw= items.PlayerDamakuSearchSw;
        if(PlayerDamakuSearchSw){
            document.getElementById('PlayerDamakuSearchSw').checked='true';
        }else{
            document.getElementById('PlayerDamakuSearchSw').checked=false;
        }
        $('#PlayerDamakuSearchSw').on('click', function () {
            if(!document.getElementById('PlayerDamakuSearchSw').checked){
                document.getElementById('PlayerDamakuSearchSw').checked=false;
                chrome.storage.local.set({'PlayerDamakuSearchSw':false});
            }else{
                document.getElementById('PlayerDamakuSearchSw').checked=true;
                chrome.storage.local.set({'PlayerDamakuSearchSw':true});
            }
        });
    });

    //=====================倍速切换快捷键================
    chrome.storage.local.get(['PlaybackRateKeysw'],function(items){
        var PlaybackRateKeysw= items.PlaybackRateKeysw;
        if(PlaybackRateKeysw){
            document.getElementById('PlaybackRateKeysw').checked='true';
        }else{
            document.getElementById('PlaybackRateKeysw').checked=false;
        }
        $('#PlaybackRateKeysw').on('click', function () {
            if(!document.getElementById('PlaybackRateKeysw').checked){
                document.getElementById('PlaybackRateKeysw').checked=false;
                chrome.storage.local.set({'PlaybackRateKeysw':false});
            }else{
                document.getElementById('PlaybackRateKeysw').checked=true;
                chrome.storage.local.set({'PlaybackRateKeysw':true});
            }
        });
    });

    //=====================评论区时间播放器快速跳转================
    chrome.storage.local.get(['PlayerTimeCommentEasyJump'],function(items){
        var PlayerTimeCommentEasyJumpsw= items.PlayerTimeCommentEasyJump;
        if(PlayerTimeCommentEasyJumpsw){
            document.getElementById('PlayerTimeCommentEasyJump').checked='true';
        }else{
            document.getElementById('PlayerTimeCommentEasyJump').checked=false;
        }
        $('#PlayerTimeCommentEasyJump').on('click', function () {
            if(!document.getElementById('PlayerTimeCommentEasyJump').checked){
                document.getElementById('PlayerTimeCommentEasyJump').checked=false;
                chrome.storage.local.set({'PlayerTimeCommentEasyJump':false});
            }else{
                document.getElementById('PlayerTimeCommentEasyJump').checked=true;
                chrome.storage.local.set({'PlayerTimeCommentEasyJump':true});
            }
        });
    });

    //=====================评论区时间选中播放器快速跳转================
    chrome.storage.local.get(['easySearchScanForPlayerTimesw'],function(items){
        var easySearchScanForPlayerTimesw= items.easySearchScanForPlayerTimesw;
        if(easySearchScanForPlayerTimesw){
            document.getElementById('easySearchScanForPlayerTimesw').checked='true';
        }else{
            document.getElementById('easySearchScanForPlayerTimesw').checked=false;
        }
        $('#easySearchScanForPlayerTimesw').on('click', function () {
            if(!document.getElementById('easySearchScanForPlayerTimesw').checked){
                document.getElementById('easySearchScanForPlayerTimesw').checked=false;
                chrome.storage.local.set({'easySearchScanForPlayerTimesw':false});
            }else{
                document.getElementById('easySearchScanForPlayerTimesw').checked=true;
                chrome.storage.local.set({'easySearchScanForPlayerTimesw':true});
            }
        });
    });

    //====================配置播放器自动跳转到上次观看时间===============
    chrome.storage.local.get(['autoJumpLastWatchSw'],function(items){
        var autoJumpLastWatchSw_status= items.autoJumpLastWatchSw;
        if(autoJumpLastWatchSw_status){
            document.getElementById('autoJumpLastWatchSw').checked='true';
        }else{
            document.getElementById('autoJumpLastWatchSw').checked=false;
        }
        $('#autoJumpLastWatchSw').on('click', function () {
            if(!document.getElementById('autoJumpLastWatchSw').checked){
                document.getElementById('autoJumpLastWatchSw').checked=false;
                chrome.storage.local.set({'autoJumpLastWatchSw':false});
            }else{
                document.getElementById('autoJumpLastWatchSw').checked=true;
                chrome.storage.local.set({'autoJumpLastWatchSw':true});
            }
        });
    });

    //====================配置播放器结束时自动退出全屏模式===============
    chrome.storage.local.get(['endedAutoExitFullscreensw'],function(items){
        var endedAutoExitFullscreensw= items.endedAutoExitFullscreensw;
        if(endedAutoExitFullscreensw){
            document.getElementById('endedAutoExitFullscreensw').checked='true';
        }else{
            document.getElementById('endedAutoExitFullscreensw').checked=false;
        }
        $('#endedAutoExitFullscreensw').on('click', function () {
            if(!document.getElementById('endedAutoExitFullscreensw').checked){
                document.getElementById('endedAutoExitFullscreensw').checked=false;
                chrome.storage.local.set({'endedAutoExitFullscreensw':false});
            }else{
                document.getElementById('endedAutoExitFullscreensw').checked=true;
                chrome.storage.local.set({'endedAutoExitFullscreensw':true});
            }
        });
    });

    //====================观影模式关灯适配暗色===============
    chrome.storage.local.get(['FileModeExclusionsw'],function(items){
        var FileModeExclusionsw= items.FileModeExclusionsw;
        if(FileModeExclusionsw){
            document.getElementById('FileModeExclusionsw').checked='true';
        }else{
            document.getElementById('FileModeExclusionsw').checked=false;
        }
        $('#FileModeExclusionsw').on('click', function () {
            if(!document.getElementById('FileModeExclusionsw').checked){
                document.getElementById('FileModeExclusionsw').checked=false;
                chrome.storage.local.set({'FileModeExclusionsw':false});
            }else{
                document.getElementById('FileModeExclusionsw').checked=true;
                chrome.storage.local.set({'FileModeExclusionsw':true});
            }
        });
    });

    //====================配置播放器画质策略===============
    chrome.storage.local.get(['videoQualityStrategy'],function(items){
        $('#videoQualityStrategy_state').append(items.videoQualityStrategy)
        var inst = new mdui.Select('#videoQualityStrategy');
        $('#videoQualityStrategy').on('close.mdui.select', function () {
            chrome.storage.local.set({'videoQualityStrategy':inst.value});
        });
    });

    //=============================关注直播推送==========================
    chrome.storage.local.get(['liveFloowNotif'],function(items){
        var liveFloowingsw_status= items.liveFloowNotif;
        if(liveFloowingsw_status){
            document.getElementById('liveFollowNotifsw').checked='true';
        }else{
            document.getElementById('liveFollowNotifsw').checked=false;
        }
        $('#liveFollowNotifsw').on('click', function () {
            if(!document.getElementById('liveFollowNotifsw').checked){
                document.getElementById('liveFollowNotifsw').checked=false;
                chrome.storage.local.set({'liveFloowNotif':false});
            }else{
                document.getElementById('liveFollowNotifsw').checked=true;
                chrome.storage.local.set({'liveFloowNotif':true});
            }
        });

    });
    // chrome.storage.local.set({'liveFloowNotif':true});
    // let a={16416041:16416041,31541670:31541670,16012499:16012499,2888736:2888736}
    chrome.storage.local.get(['liveFloowings'],function(items){
        if(JSON.stringify(items) !== '{}'){
            for(i in items.liveFloowings){
                $('ul#liveFollowNotifList').append(`<li class="mdui-list-item mdui-ripple" data-key=${i} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveFloowingsItems" data-key=${i} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${i}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons liveWatchOrig" data-key=${i} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${i} UserName:${items.liveFloowings[i]}</div></li>`);
            }
            $('.liveFloowingsItems').click(function () {
                let this_uid=$(this).data("key");
                $(this).parent().hide();
                console.log(this_uid);
                mdui.snackbar({
                    message: `已移除 ${items.liveFloowings[this_uid]}`,
                  });
                delete items.liveFloowings[this_uid];
                chrome.storage.local.set({'liveFloowings':items.liveFloowings});
                });
            // $('.liveWatchOrig').click(function () {
            //     console.log('origin clicked.');
            //     let this_uid=$(this).data("key");
            //     window.open('https://live.acfun.cn/live/'+this_uid);
            // });
            }
        });
    chrome.storage.local.get(['liveFloowings'],function(items){
    if(JSON.stringify(items) == '{}'){
        let a={}
        chrome.storage.local.set({'liveFloowings':a});
        mdui.alert("列表初始化完成，请刷新页面");
    }else{
    $('#liveFollowAdd').on('click', function () {
        mdui.prompt('请输入你需要关注的用户UID', '添加关注',
        async function (value) {
            if(!value==''){
                var up_url = options.userInfo.replace('{uid}',value);
                for(i in items.liveFloowings){
                    if(i==value){
                        console.log('repeat');
                        var errN = 1;
                        break
                    }else{
                        var errN = 0;
                    }
                }
                if(errN!=1){
                    var up_html_str;
                    try{
                        up_html_str = await ajax('GET',up_url);
                    }catch (e) {
                        var errN = 2
                        return;
                    }
                    let status = JSON.parse(up_html_str).result;
                    if(status==0){
                        console.log('233');
                        var liveup_name = JSON.parse(up_html_str).profile.name;
                        var errN = 0;
                    }else {var errN = 2};
                }
                if(errN==0){
                    items.liveFloowings[value]=liveup_name;
                    chrome.storage.local.set({'liveFloowings':items.liveFloowings})
                    console.log(items);
                    mdui.snackbar({message: ` ${liveup_name} 已被加入关注列表`});
                    $('ul#liveFollowNotifList').append(`<li class="mdui-list-item mdui-ripple" data-key=${value} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveFloowingsItems" data-key=${value} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${value}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons liveWatch" data-key=${value} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${value} UserName:${liveup_name}</div></li>`);
                    // $('.liveWatch').click(function () {
                    //     console.log('action clicked.')
                    //     let this_uid=$(this).data("key");
                    //     window.open('https://live.acfun.cn/live/'+this_uid);
                    // });
                    $('.liveFloowingsItems').click(function () {
                        let this_uid=$(this).data("key");
                        $(this).parent().hide();
                        console.log(this_uid);
                        mdui.snackbar({
                            message: `已移除 ${items.liveFloowings[this_uid]}`,
                          });
                          delete items.liveFloowings[this_uid];
                          console.log(items);
                          chrome.storage.local.set({'liveFloowings':items.liveFloowings},function(){console.log(items)});
                        });
                }else if(errN == 1){
                    mdui.alert('你添加的用户已关注');
                }else if(errN == 2){
                    mdui.alert('用户不存在');
                }
            }else{
                mdui.alert('UID未输入');
            }
        },
        function () {
        }
      );
    })}});


    //===================直播屏蔽配置相关==========================//
    chrome.storage.local.get(['liveBansw'],function(items){
        var liveBans_status= items.liveBansw;
        if(liveBans_status){
            document.getElementById('liveBansw').checked='true';
        }else{
            document.getElementById('liveBansw').checked=false;
        }
        $('#liveBansw').on('click', function () {
            if(!document.getElementById('liveBansw').checked){
                document.getElementById('liveBansw').checked=false;
                chrome.storage.local.set({'liveBansw':false});
            }else{
                document.getElementById('liveBansw').checked=true;
                chrome.storage.local.set({'liveBansw':true});
            }
        });
    });
    chrome.storage.local.get(['liveBans'],function(items){
        if(JSON.stringify(items) !== '{}'){
            for(i in items.liveBans){
                $('ul#liveBanList').append(`<li class="mdui-list-item mdui-ripple" data-key=${i} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveBansItems" data-key=${i} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${i}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons BanWatchOrig" data-key=${i} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${i} UserName:${items.liveBans[i]}</div></li>`);
            }
            $('.liveBansItems').click(function () {
                let this_uid=$(this).data("key");
                $(this).parent().hide();
                console.log(this_uid);
                mdui.snackbar({
                    message: `已移除 ${items.liveBans[this_uid]}`,
                  });
                delete items.liveBans[this_uid];
                chrome.storage.local.set({'liveBans':items.liveBans});
                });
            }
        });
    chrome.storage.local.get(['liveBans'],function(items){
        if(JSON.stringify(items) == '{}'){
            let a={}
            chrome.storage.local.set({'liveBans':a});
        }else{
        $('#liveBanAdd').on('click', function () {
            mdui.prompt('请输入你需要屏蔽的用户UID', '添加用户',
            async function (value) {
                if(!value==''){
                    var up_url = options.userInfo.replace('{uid}',value);
                    for(i in items.liveFloowings){
                        if(i==value){
                            console.log('repeat');
                            var errN = 1;
                            break
                        }else{
                            var errN = 0;
                        }
                    }
                    if(errN!=1){
                        var up_html_str;
                        try{
                            up_html_str = await ajax('GET',up_url);
                        }catch (e) {
                            var errN = 2
                            return;
                        }
                        let status = JSON.parse(up_html_str).result;
                        if(status==0){
                            console.log('233');
                            var liveup_name = JSON.parse(up_html_str).profile.name;
                            var errN = 0;
                        }else {var errN = 2};
                    }
                    if(errN==0){
                        items.liveBans[value]=liveup_name;
                        chrome.storage.local.set({'liveBans':items.liveBans})
                        console.log(items);
                        mdui.snackbar({message: ` ${liveup_name} 已被加入关注列表`});
                        $('ul#liveBanList').append(`<li class="mdui-list-item mdui-ripple" data-key=${value} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveBansItems" data-key=${value} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${value}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons BanWatchOrig" data-key=${value} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${value} UserName:${liveup_name}</div></li>`);
                        $('.liveBansItems').click(function () {
                            let this_uid=$(this).data("key");
                            $(this).parent().hide();
                            console.log(this_uid);
                            mdui.snackbar({
                                message: `已移除 ${items.liveBans[this_uid]}`,
                                });
                                delete items.liveBans[this_uid];
                                console.log(items);
                                chrome.storage.local.set({'liveBans':items.liveBans},function(){console.log(items)});
                            });
                    }else if(errN == 1){
                        mdui.alert('你添加的用户已关注');
                    }else if(errN == 2){
                        mdui.alert('用户不存在');
                    }
                }else{
                    mdui.alert('UID未输入');
                }
            },
            function () {
            }
            );
        })}});

    



    //=======================配置导入导出================================//
    let config_downloadObj=document.getElementById('configExport');
    config_downloadObj.addEventListener('click', function createDownload(){
        options_data=chrome.storage.local.get(null, function (items) {
            var options_data = sanitizeOptions(items);
            var blob = new Blob([JSON.stringify(options_data)], { type: 'application/octet-stream' });
            var url = window.URL.createObjectURL(blob);
            var saveas = document.createElement('a');
            saveas.href = url;
            saveas.style.display = 'none';
            document.body.appendChild(saveas);
            saveas.download = 'AcFun-Helper.conf';
            saveas.click();
            setTimeout(function () { saveas.parentNode.removeChild(saveas); }, 0)
            document.addEventListener('unload', function () { window.URL.revokeObjectURL(url); });
        });
      });

      let playerConfig_downloadObj=document.getElementById('configPlayerExport');
      playerConfig_downloadObj.addEventListener('click', function createPconfDownload(){
        player_conf=chrome.storage.local.get(['AcGConf'], function (items) {
              var player_conf = sanitizeOptions(items);
              var blob = new Blob([JSON.stringify(player_conf)], { type: 'application/octet-stream' });
              var url = window.URL.createObjectURL(blob);
              var saveas = document.createElement('a');
              saveas.href = url;
              saveas.style.display = 'none';
              document.body.appendChild(saveas);
              saveas.download = 'AcFun-Player.conf';
              saveas.click();
              setTimeout(function () { saveas.parentNode.removeChild(saveas); }, 0)
              document.addEventListener('unload', function () { window.URL.revokeObjectURL(url); });
          });
        });

        let jsonfy_pconfig;
        let input2=document.getElementById("emlwX3V0aWxp_file");
            input2.onchange=function () {
                var file = this.files[0];
                if(!!file){
                    var reader=new FileReader();
                    reader.readAsText(file,"utf-8");
                    reader.onload=function () {
                        try{
                            jsonfy_pconfig=JSON.parse(this.result);
                        }catch (e) {
                            alert("文件格式不正确");
                            return;
                        }
                        chrome.storage.local.set({AcGConf:jsonfy_pconfig.AcGConf});
                        // console.log(jsonfy_pconfig);
                        chrome.storage.local.set({SyncPlayerConfigNeed: 1});
                      notice("AcFun助手","播放器导入配置成功;请在主站非视频页面刷新一次以导入配置。");
                    };
                }
        };
          

      let jsonfy_config;
      let input=document.getElementById("input_emlwX3V0aWxz_file");
          input.onchange=function () {
              var file = this.files[0];
              if(!!file){
                  var reader=new FileReader();
                  reader.readAsText(file,"utf-8");
                  reader.onload=function () {
                      try{
                          jsonfy_config=JSON.parse(this.result);
                      }catch (e) {
                          alert("文件格式不正确");
                          return;
                      }
                    for(i in jsonfy_config){
                        if(i !='AcpushList'){
                            chrome.storage.local.set({[i]:jsonfy_config[i]});
                    }}
                    notice("AcFun助手","导入配置成功~");
                  };
              }
      };

      let config_CleanObj=document.getElementById('configClean');
      config_CleanObj.addEventListener('click', function createClean(){
          console.log("clicked.");
          let notice_this=prompt("确认清除小助手的所有配置吗？请考虑清楚哦。Y/N",'');
          if(notice_this=='Y'){
          chrome.storage.local.clear(function(){
            console.log('Zero');
          });}
      });

    $('.Pushresult_act').on('click', function(){
        chrome.storage.local.get(['AcCookies'],function(datao){
            console.log(datao);
            let prob=$('.SyncWait1');
            prob.show();        
            let x=$('p.read_result')[0];
            let UidReg = new RegExp('auth_key=(.*); ac_username');
            let Uid = Number(UidReg.exec(datao.AcCookies)[1]);
            x.innerText = '[ AcFun-Uid : '+Uid+ ' ]';
            chrome.storage.local.get(null, function (items) {
                if(typeof(Uid)=='number'){
                    chrome.storage.local.get(null, function (items) {
                        if(typeof(Uid)=='number'){
                            // chrome.storage.local.get(['AcHlp-SyncToken'],function(rawtoken){
                                delete items["AcpushList1"];
                                delete items["danmakuCache"];
                                delete items["AcMomentCircle1"];
                                delete items["AcLives1"];
                                var options_data = JSON.stringify(sanitizeOptions(items));
                                // if(JSON.stringify(rawtoken) == '{}'){token=0}else{token=JSON.stringify(rawtoken)};
                                let uploadData = new FormData();
                                uploadData.append("options_data",`${options_data}`);
                                console.log(`${options_data}`);
                                fetch('https://mini.pocketword.cn/api/acfun-helper/options/upload',{method:"POST", credentials: 'include', body:uploadData})
                                .then((res=>{return res.text()}))
                                .then((res)=>{
                                    // console.log(res);
                                    // if(res!=''){chrome.storage.local.set({'AcHlp-SyncToken':`${res}`})};
                                })
                            // });
                        }           
                    });
                }           
            });
            prob.hide();
        });
    });

    $('.Pullresult_act').on('click', function(){
        var inst = new mdui.Dialog('#dialog');
        inst.open();
        var dialog = document.getElementById('dialog');
        dialog.addEventListener('confirm.mdui.dialog', function () {
          console.log('confirm');
        //   chrome.storage.local.get(['AcHlp-SyncToken'],function(rawtoken){
        //     if(JSON.stringify(rawtoken)!='{}'){
        //     }else{
                chrome.storage.local.get(null, function (items) {
                    let svrCookies={}
                    console.log(items);
                    svrCookies['AcCookies']=items['AcCookies'];
                    svrCookies['AcPassToken']=items['AcPassToken'];
                    console.log(svrCookies)
                    let upCookies = new FormData();
                    upCookies.set("authCookie",`${JSON.stringify(svrCookies)}`);
                    fetch('https://mini.pocketword.cn/api/acfun-helper/options/download',{method:"POST", credentials: 'include', body:upCookies})
                    .then((res=>{return res.text()}))
                    .then((res)=>{
                        let x = unescape(res.replace(/\\u/g, "%u"));
                        try{
                            jsonfy_config=JSON.parse(x);
                        }catch (e) {
                            mdui.alert("格式不正确");
                            return;
                        }
                        for(i in jsonfy_config){
                            chrome.storage.local.set({[i]:jsonfy_config[i]});
                        }
                        notice("AcFun助手","配置同步成功~");
                        });
                });
        //     }
        // });
        });
    });







  
    $('#filter-add').on('click', function () {
        if ($('.filter-add-tr').length <= 0 && filter) {
            if (!$('#filter-ups').hasClass('table-custom-padding')) {
                $('#filter-ups').addClass('table-custom-padding');
            }
            $('#filter-ups').before('\
        <table id="filter_table" class="add-table">\
          <tr class="filter-add-tr">\
            <td style="width: 400px" class="td-add-input">\
              <input style="width: 400px" type="text" class="form-control site" placeholder="请输入up主uid" required>\
            </td>\
            <td class="td-add-button">\
              <button type="button" class="switch-open filter-add-confirm" style="width:79px;float: none;margin-left:16px;">添加</button>\
            </td>\
            <td class="td-add-remove-button">\
              <button type="button" class="switch-close filter-add-remove" style="width:79px;float: none;">取消</button>\
            </td>\
          </tr>\
          <tr><td class="filter-fail"></td></tr>\
        </table>');
            $('.filter-add-remove').on('click',async function () {
                $(this).parent().parent().parent().parent().remove();
                if ($('#filter-ups .site').length <= 0) {
                    $('#filter-ups').removeClass('table-custom-padding');
                }
            });
            $('#filter_table .filter-add-confirm').on('click',async function () {
                $('.filter-fail').hide();
                var input_valid = true;
                var uid_input = $(this).parent().prev().children('input').val();
                let user_key = "FILTER_"+uid_input;
                if (uid_input === '') {
                    $('.filter-fail').text('输入内容不能为空');
                    $('.filter-fail').show();
                    input_valid = false;
                }else if (!uid_input.match(uidReg)) {
                    $('.mark-fail').text('uid必须为数字');
                    $('.mark-fail').show();
                    input_valid = false;
                }
                if(!input_valid){
                    return;
                }
                //判断此uid是否存在
                let ac_res =await getStorage("FILTER_"+uid_input).then(value=>{return value["FILTER_"+uid_input]});
                if(ac_res!=undefined && ac_res!=null && ac_res.name!=''){
                    input_valid = false;
                    $('.filter-fail').text('此up已被屏蔽');
                    $('.filter-fail').show();
                }

                if (input_valid) {
                    //根据uid解析出up主姓名
                    $("body").mLoading("show");
                    let up_url = options.userInfo.replace('{uid}',uid_input);
                    var up_html_str ;
                    try{
                        up_html_str = await ajax('GET',up_url);
                    }catch (e) {
                        $("body").mLoading("hide");
                        $('.mark-fail').text('此uid不存在');
                        $('.mark-fail').show();
                        return;
                    }
                    let up_name = JSON.parse(up_html_str).profile.name;

                    if(up_name=='' || up_name==undefined){
                        $("body").mLoading("hide");
                        $('.mark-fail').text('此uid不存在');
                        $('.mark-fail').show();
                        return;
                    }

                    let user_scan={
                        name:up_name,
                    }
                    chrome.storage.local.set({[user_key]:user_scan}, function(){
                        $('#filter-ups #filter-blank').remove();
                        $('#filter-ups').prepend('\
                      <tr class="site-tr">\
                          <td style="width: 200px" class="site"><a href="' + up_url + '" target="_blank">' + uid_input + '</a></td>\
                          <td class="site-name"><a href="' + up_url + '" target="_blank">' + up_name + '</a></td>\
                          <td class="site-remove"><span href="#" class="filter-remove">移除</span></td>\
                        </tr>');
                    });

                    $(this).parent().parent().parent().parent().remove();
                    $('#filter-ups').on('click','.filter-remove', function () {
                        if (filter) {
                            $(this).parent().parent().remove();
                            chrome.storage.local.remove(user_key, function(){
                                //do something
                            });
                        }
                    });
                    $("body").mLoading("hide");
                }
            });

            m_id += 1;
        }
    });


});