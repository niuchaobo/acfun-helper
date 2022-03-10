export async function OldUIHandler() {
    var default_options = {
        auto_throw: false,
        to_attention: true,
        to_attention_num: 5,
        to_special_items: []
    }
    var clickFlag = true;

    function save_options() {
        var items = [];

        $('#custom .site-tr').each(function () {
            var uid = $(this).children('td').eq(0).text();
            var up_url = $(this).children('td').eq(0).find('a').attr('href');
            var name = $(this).children('td').eq(1).text();
            var bananaNum = $(this).children('td').eq(2).text().replace('蕉', '');
            var obj = {
                uid: uid,
                name: name,
                bananaNum: bananaNum,
                up_url: up_url
            };
            items.push(obj);
        });

        chrome.storage.local.set({
            to_special_items: items
        }, function () {
            options.to_special_items = items;
            //AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            //location.reload();
        });
    }

    function updateUi() {
        if (auto_throw) {
            $('#switch').removeClass('switch-open').addClass('switch-close').attr('src', 'images/on.png');
            $(".huaci_selections").css('color', '#333');
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
            $(".huaci_selections").css('color', '#d8d8d8');
            $('.autoTranslate h3').css('color', '#ccc');
        }
    }

    function huaciUi() {
        /* globals huaci_switch */
        if (huaci_switch) {
            $('#huaci_switch').attr('src', 'images/on.png');
            $('#huaci_options').css('color', '#333');
            $('#fanyi_huaci').css({ background: '#fff', color: '#333' });
            $('.huaci_selections').siblings('hr').css('border-bottom', '1px solid #eee');
            // 还要分别判断 btn 和frame
        } else {
            $('#huaci_switch').attr('src', 'images/off.png');
            $('#huaci_options').css('color', '#ccc');
            $('#fanyi_huaci').css({ background: '#ededed', color: '#ccc' });
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
        let id = "num" + to_attention_num;
        $("#" + id).attr('src', 'images/selected.png');
        $("#" + id).siblings().attr('src', 'images/unselected.png');
    }

    function playModeUi() {
        let id = "mode_" + player_mode;
        $("#" + id).attr('src', 'images/selected.png');
        $("#" + id).siblings().attr('src', 'images/unselected.png');
    }
    let options
    let auto_throw
    let to_attention
    let to_special
    let to_attention_num
    let to_special_items
    let banana_notice
    let mark
    let scan
    let upHighlight
    let scanUserMap
    let beautify_nav
    let beautify_personal
    let custom_rate
    let player_mode
    chrome.storage.local.get(null, function (items) {
        options = ExtOptions.transOptions(items);
        auto_throw = options['auto_throw'];
        to_attention = options['to_attention'];
        to_special = options['to_special'];
        to_attention_num = options['to_attention_num'];
        to_special_items = options['to_special_items'];
        banana_notice = options['banana_notice'];
        mark = options['mark'];
        scan = options['scan'];
        upHighlight = options['upHighlight'];
        scanUserMap = ExtOptions.userMarkMap(items);
        beautify_nav = options['beautify_nav'];
        beautify_personal = options['beautify_personal'];
        custom_rate = options['custom_rate'];
        player_mode = options['player_mode'];

        attentionUi();
        attentionNumUi();
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

        if (scanUserMap && scanUserMap.size > 0) {
            $('#scan-users').addClass('table-custom-padding');
            scanUserMap.forEach(function (value, key) {
                let userId = key.replace("AC_", "");
                let user_home = options.upUrlTemplate.replace("{uid}", userId);
                let user_desc;
                if (value.desc == undefined) { user_desc = "无" } else { user_desc = value.desc }
                $('#scan-users').append('\
                <tr class="site-tr">\
                    <td class="site"><a href="' + user_home + '" target="_blank">' + userId + '</a></td>\
                    <td class="site-name"><a href="' + user_home + '" target="_blank">' + value.name + '</a></td>\
                    <td class="site-tag">' + value.tag + '</td>\
                    <td class="site-remove"><span href="#" data-key="'+ key + '" class="scan-remove">移除</span></td>\
                    <td class="site-evidence"><a href="'+ value.refer + '#ncid=' + value.commentId + '" target="_blank" class="scan-evidence">证据页</a></td>\
                    <td class="site-tag">'+ user_desc + '</td>\
                </tr>');
            })
            $('.scan-remove').click(async function () {
                if (mark) {
                    let key = $(this).data("key");
                    $(this).parent().parent().remove();
                    let raw = await getStorage("UserMarks");
                    delete raw.UserMarks[key];
                    chrome.storage.local.set({ "UserMarks": raw.UserMarks }, function () { })
                }
            });
        } else {
            $('#scan-users').append('\
                <tr id="mark-blank">\
                  <td class="custom-nothing">无</td>\
                </tr>');
        }
    });

    $('#switch').click(function () {
        if (auto_throw) {
            options.auto_throw = false;
            chrome.storage.local.set({
                'auto_throw': false
            }, function () {
                // location.reload();
                auto_throw = false;
                updateUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.auto_throw = true;
            chrome.storage.local.set({
                'auto_throw': true
            }, function () {
                // location.reload();
                auto_throw = true;
                updateUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        }
    });

    $('#detect-switch-r').click(function () {
        if (banana_notice) {
            options.banana_notice = false;
            chrome.storage.local.set({
                'banana_notice': false
            }, function () {
                // location.reload();
                banana_notice = false;
                detectUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.banana_notice = true;
            chrome.storage.local.set({
                'banana_notice': true
            }, function () {
                // location.reload();
                banana_notice = true;
                detectUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        }
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
                    AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
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
                    AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
                });
            }
        }
    });

    $(".attention_num").click(function () {
        if (auto_throw && to_attention) {
            let flag = $(this).attr('src');
            let attention_num = $(this).data('num');
            if (flag == 'images/unselected.png') {
                $(this).attr('src', 'images/selected.png');
                $(this).siblings().attr('src', 'images/unselected.png');
            } else {
                //$(this).attr('src', 'images/unselected.png');
                //$(this).siblings().attr('src', 'images/selected.png');
            }
            options.to_attention_num = attention_num;
            chrome.storage.local.set({
                'to_attention_num': attention_num
            }, function () {
                to_attention_num = attention_num;
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        }
    });

    $('#up-switch-r').click(function () {
        if (upHighlight) {
            options.upHighlight = false;
            chrome.storage.local.set({
                'upHighlight': false
            }, function () {
                // location.reload();
                upHighlight = false;
                commentUi()
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.upHighlight = true;
            chrome.storage.local.set({
                'upHighlight': true
            }, function () {
                // location.reload();
                upHighlight = true;
                commentUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        }
    });

    $('#scan-switch-r').click(function () {
        if (scan) {
            options.scan = false;
            chrome.storage.local.set({
                'scan': false
            }, function () {
                // location.reload();
                scan = false;
                commentUi()
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.scan = true;
            chrome.storage.local.set({
                'scan': true
            }, function () {
                // location.reload();
                scan = true;
                commentUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        }
    });

    $('#mark-switch-r').click(function () {
        if (mark) {
            options.mark = false;
            chrome.storage.local.set({
                'mark': false
            }, function () {
                // location.reload();
                mark = false;
                commentUi()
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.mark = true;
            chrome.storage.local.set({
                'mark': true
            }, function () {
                // location.reload();
                mark = true;
                commentUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        }
    });

    $('#filter-switch-r').click(function () {
        if (filter) {
            options.filter = false;
            chrome.storage.local.set({
                'filter': false
            }, function () {
                // location.reload();
                filter = false;
                filterUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.filter = true;
            chrome.storage.local.set({
                'filter': true
            }, function () {
                // location.reload();
                filter = true;
                filterUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        }
    });

    $('#nav-switch-r').click(function () {
        if (beautify_nav) {
            options.beautify_nav = false;
            chrome.storage.local.set({
                'beautify_nav': false
            }, function () {
                // location.reload();
                beautify_nav = false;
                beautifyUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.beautify_nav = true;
            chrome.storage.local.set({
                'beautify_nav': true
            }, function () {
                // location.reload();
                beautify_nav = true;
                beautifyUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        }
    });

    $('#personal-switch-r').click(function () {
        if (beautify_personal) {
            options.beautify_personal = false;
            chrome.storage.local.set({
                'beautify_personal': false
            }, function () {
                // location.reload();
                beautify_personal = false;
                beautifyUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.beautify_personal = true;
            chrome.storage.local.set({
                'beautify_personal': true
            }, function () {
                // location.reload();
                beautify_personal = true;
                beautifyUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        }
    });

    $('#rate-switch-r').click(function () {
        if (custom_rate) {
            options.custom_rate = false;
            chrome.storage.local.set({
                'custom_rate': false
            }, function () {
                // location.reload();
                custom_rate = false;
                customVideoUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        } else {
            /* globals bridge */
            options.custom_rate = true;
            chrome.storage.local.set({
                'custom_rate': true
            }, function () {
                // location.reload();
                custom_rate = true;
                customVideoUi();
                AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
            });
        }
    });


    $(".player_mode").click(function () {
        let flag = $(this).attr('src');
        let mode = $(this).data('mode');
        if (flag == 'images/unselected.png') {
            $(this).attr('src', 'images/selected.png');
            $(this).siblings().attr('src', 'images/unselected.png');
        } else {
            //$(this).attr('src', 'images/unselected.png');
            //$(this).siblings().attr('src', 'images/selected.png');
        }
        options.player_mode = mode;
        chrome.storage.local.set({
            'player_mode': mode
        }, function () {
            player_mode = mode;
            AcFunHelperHelper.getBackendInst().opt_optionUpdate(options);
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
            $('.add-remove').on('click', async function () {
                $(this).parent().parent().parent().parent().remove();
                if ($('#custom .site').length <= 0) {
                    $('#custom').removeClass('table-custom-padding');
                }
            });
            $('#' + c_id + ' .add-confirm').on('click', async function () {
                $('.fail').hide();

                var input_valid = true;
                var uid_input = $(this).parent().prev().prev().children('input').val().replace('。', '.').replace('http://', '').replace('https://', '');
                var bananaNum = $(this).parent().prev().children('select').val();
                if (uid_input === '') {
                    $('.fail').text('输入内容不能为空');
                    $('.fail').show();
                    input_valid = false;
                } else if (bananaNum == 0) {
                    $('.fail').text('请选择投蕉数');
                    $('.fail').show();
                    input_valid = false;
                } else if (!uid_input.match(uidReg)) {
                    $('.fail').text('uid必须为数字');
                    $('.fail').show();
                    input_valid = false;
                }
                if (!input_valid) {
                    return;
                }
                //判断此uid是否存在
                let res_items = await getStorage({ 'to_special_items': [] });
                let item_arr = res_items.to_special_items;

                for (let item of item_arr) {
                    if (item.uid && item.uid == uid_input) {
                        input_valid = false;
                        $('.fail').text('uid已存在');
                        $('.fail').show();
                        break;
                    }
                }

                if (input_valid) {
                    //根据uid解析出up主姓名
                    $("body").mLoading("show");
                    let up_url = options.upUrlTemplate.replace('{uid}', uid_input);
                    let up_info = defaults.userInfo.replace('{uid}', uid_input);
                    var up_html_str;
                    try {
                        up_html_str = await ajax('GET', up_info);
                    } catch (e) {
                        $("body").mLoading("hide");
                        $('.fail').text('此uid不存在');
                        $('.fail').show();
                        return;
                    }
                    let up_name = JSON.parse(up_html_str).profile.name;

                    if (up_name == '' || up_name == undefined) {
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
                    $('#specific').on('click', '.remove', function () {
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

    //==================用户标记================
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
              <input type="text" class="form-control site" placeholder="请输入用户Uid" required>\
            </td>\
            <td class="td-add-input">\
                <input type="text" class="form-control site" placeholder="请输入标记，最多10个字符" required>\
            </td>\
            <td class="tdesc-add-input">\
                <input type="text" class="form-control site" placeholder="[可选]请输入描述" required>\
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
            $('.mark-add-remove').on('click', async function () {
                $(this).parent().parent().parent().parent().remove();
                if ($('#scan-users .site').length <= 0) {
                    $('#scan-users').removeClass('table-custom-padding');
                }
            });
            $('#mark' + m_id + ' .mark-add-confirm').on('click', async function () {
                $('.mark-fail').hide();

                var input_valid = true;
                var uid_input = $(this).parent().prev().prev().prev().children('input').val();
                var _tag = $(this).parent().prev().prev().children('input').val();
                var user_desc = $(this).parent().prev().children('input').val();
                let user_key = uid_input;
                var tag = _tag.trim();
                if (uid_input === '') {
                    $('.mark-fail').text('输入内容不能为空');
                    $('.mark-fail').show();
                    input_valid = false;
                } else if (tag == '') {
                    $('.mark-fail').text('请输入标记');
                    $('.mark-fail').show();
                    input_valid = false;
                } else if (tag.length > 10) {
                    $('.mark-fail').text('标记最多10个字符');
                    $('.mark-fail').show();
                    input_valid = false;
                } else if (!uid_input.match(uidReg)) {
                    $('.mark-fail').text('Uid必须为数字');
                    $('.mark-fail').show();
                    input_valid = false;
                }
                if (!input_valid) {
                    return;
                }
                //判断此uid是否存在
                let raw = await getStorage("UserMarks");
                let usermarkList = Object.keys(raw.UserMarks);
                if (usermarkList.indexOf(uid_input) != -1) {
                    input_valid = false;
                    $('.mark-fail').text('此用户已被标记');
                    $('.mark-fail').show();
                }

                if (input_valid) {
                    //根据uid解析出up主姓名
                    $("body").mLoading("show");
                    let up_url = defaults.userInfo.replace('{uid}', uid_input);
                    var up_html_str;
                    try {
                        up_html_str = await ajax('GET', up_url);
                    } catch (e) {
                        $("body").mLoading("hide");
                        $('.mark-fail').text('此Uid不存在');
                        $('.mark-fail').show();
                        return;
                    }
                    let up_name = JSON.parse(up_html_str);

                    if (up_name.result != 0) {
                        $("body").mLoading("hide");
                        $('.mark-fail').text('此Uid不存在');
                        $('.mark-fail').show();
                        return;
                    }
                    up_name = up_name.profile.name;

                    raw.UserMarks[uid_input] = { "name": up_name, "tag": tag, "desc": user_desc ? user_desc : "" }
                    chrome.storage.local.set({ "UserMarks": raw.UserMarks }, function () {
                        $('#scan-users #mark-blank').remove();
                        $('#scan-users').prepend('\
                      <tr class="site-tr">\
                          <td class="site"><a href="' + up_url + '" target="_blank">' + uid_input + '</a></td>\
                          <td class="site-name"><a href="' + up_url + '" target="_blank">' + up_name + '</a></td>\
                          <td class="site-tag">' + tag + '</td>\
                          <td class="site-remove"><span href="#" class="scan-remove">移除</span></td>\
                          <td class="site-tag">'+ user_desc + '</td>\
                        </tr>');
                    });

                    $(this).parent().parent().parent().parent().remove();
                    $('#scan-users').on('click', '.scan-remove', async function () {
                        if (mark) {
                            $(this).parent().parent().remove();
                            let raw = await getStorage("UserMarks");
                            delete raw.UserMarks[user_key];
                            chrome.storage.local.set({ "UserMarks": raw.UserMarks }, function () { })
                        }
                    });
                    $("body").mLoading("hide");
                }
            });

            m_id += 1;
        }
    });

}