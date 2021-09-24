function OldUIHandler() {
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
            //getBackendInst().opt_optionUpdate(options);
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

    function filterUi() {
        if (filter) {
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
        } else {
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

    function playModeUi() {
        let id = "mode_" + player_mode;
        $("#" + id).attr('src', 'images/selected.png');
        $("#" + id).siblings().attr('src', 'images/unselected.png');
    }
    chrome.storage.local.get(null, function (items) {
        options = transOptions(items);
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
        filter = options['filter'];
        filterUps = ExtOptions.upFilterMap(items);
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

        if (filterUps && filterUps.size > 0) {
            $('#filter-ups').addClass('table-custom-padding');
            filterUps.forEach(function (value, key) {
                let userId = key.replace("FILTER_", "");
                let user_home = options.upUrlTemplate.replace("{uid}", userId);
                $('#filter-ups').append('\
                <tr class="site-tr">\
                    <td style="width: 200px;" class="site"><a href="' + user_home + '" target="_blank">' + userId + '</a></td>\
                    <td class="site-name"><a href="' + user_home + '" target="_blank">' + value.name + '</a></td>\
                    <td class="site-remove"><span href="#" data-key="'+ key + '" class="filter-remove">移除</span></td>\
                </tr>');
            })
            $('.filter-remove').click(function () {
                if (filter) {
                    let key = $(this).data("key");
                    $(this).parent().parent().remove();
                    chrome.storage.local.remove(key, function () {
                        //do something
                    });
                }
            });
        } else {
            $('#filter-ups').append('\
                <tr id="filter-blank">\
                  <td class="custom-nothing">无</td>\
                </tr>');
        }
        filterUi()
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                    getBackendInst().opt_optionUpdate(options);
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
                    getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
                getBackendInst().opt_optionUpdate(options);
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
            getBackendInst().opt_optionUpdate(options);
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
                    let up_info = options.userInfo.replace('{uid}', uid_input);
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
                    let up_url = options.userInfo.replace('{uid}', uid_input);
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

function indexSiteConfigure() {
    //=====================文章投蕉==========================
    chrome.storage.local.get(['banana_notice'], function (items) {
        var bananaNotice = items.banana_notice;
        if (bananaNotice) {
            document.getElementById('bananaNotice').checked = true;
        } else {
            document.getElementById('bananaNotice').checked = false;
        }
        $('#bananaNotice').on('click', function () {
            if (!document.getElementById('bananaNotice').checked) {
                document.getElementById('bananaNotice').checked = false;
                chrome.storage.local.set({ 'banana_notice': false });
            } else {
                document.getElementById('bananaNotice').checked = true;
                chrome.storage.local.set({ 'banana_notice': true });
            }
        });
    });

    //=====================文章投蕉==========================
    chrome.storage.local.get(['articleBanana'], function (items) {
        var articleBanana = items.articleBanana;
        if (articleBanana) {
            document.getElementById('articleBanana').checked = true;
        } else {
            document.getElementById('articleBanana').checked = false;
        }
        $('#articleBanana').on('click', function () {
            if (!document.getElementById('articleBanana').checked) {
                document.getElementById('articleBanana').checked = false;
                chrome.storage.local.set({ 'articleBanana': false });
            } else {
                document.getElementById('articleBanana').checked = true;
                chrome.storage.local.set({ 'articleBanana': true });
            }
        });
    });

    //=====================在投蕉后播放投蕉音效==========================
    chrome.storage.local.get(['audioAfterBanana'], function (items) {
        var audioAfterBanana = items.audioAfterBanana;
        if (audioAfterBanana) {
            document.getElementById('audioAfterBanana').checked = true;
        } else {
            document.getElementById('audioAfterBanana').checked = false;
        }
        $('#audioAfterBanana').on('click', function () {
            if (!document.getElementById('audioAfterBanana').checked) {
                document.getElementById('audioAfterBanana').checked = false;
                chrome.storage.local.set({ 'audioAfterBanana': false });
            } else {
                document.getElementById('audioAfterBanana').checked = true;
                chrome.storage.local.set({ 'audioAfterBanana': true });
            }
        });
    });

    //=====================点赞之后弹出通知==========================
    chrome.storage.local.get(['LikeHeartNotif'], function (items) {
        var LikeHeartNotif = items.LikeHeartNotif;
        if (LikeHeartNotif) {
            document.getElementById('LikeHeartNotif').checked = true;
        } else {
            document.getElementById('LikeHeartNotif').checked = false;
        }
        $('#LikeHeartNotif').on('click', function () {
            if (!document.getElementById('LikeHeartNotif').checked) {
                document.getElementById('LikeHeartNotif').checked = false;
                chrome.storage.local.set({ 'LikeHeartNotif': false });
            } else {
                document.getElementById('LikeHeartNotif').checked = true;
                chrome.storage.local.set({ 'LikeHeartNotif': true });
            }
        });
    });

    //=====================自动给Up主的投稿点赞===================
    chrome.storage.local.get(['LikeHeart'], function (items) {
        var LikeHeart = items.LikeHeart;
        if (LikeHeart) {
            document.getElementById('LikeHeart').checked = true;
            document.getElementsByClassName('LikeHeartClasses')[0].style.display = 'block';
        } else {
            document.getElementById('LikeHeart').checked = false;
            document.getElementsByClassName('LikeHeartClasses')[0].style.display = 'none';
        }
        $('#LikeHeart').on('click', function () {
            if (!document.getElementById('LikeHeart').checked) {
                document.getElementById('LikeHeart').checked = false;
                chrome.storage.local.set({ 'LikeHeart': false });
                document.getElementsByClassName('LikeHeartClasses')[0].style.display = 'none';
            } else {
                document.getElementById('LikeHeart').checked = true;
                document.getElementsByClassName('LikeHeartClasses')[0].style.display = 'block';
                chrome.storage.local.set({ 'LikeHeart': true });
            }
        });
    });
    chrome.storage.local.get(['LikeHeartClass'], function (items) {
        document.querySelector("#LikeHeartClass").parentElement.children[1].children[1].children[items.LikeHeartClass].click()
        var inst = new mdui.Select('#LikeHeartClass');
        $('#LikeHeartClass').on('close.mdui.select', function () {
            chrome.storage.local.set({ 'LikeHeartClass': inst.value });
        });
    });

    //=====================评论区Up标记==========================
    chrome.storage.local.get(['upHighlight'], function (items) {
        var UpMark = items.upHighlight;
        if (UpMark) {
            document.getElementById('UpMark').checked = true;
        } else {
            document.getElementById('UpMark').checked = false;
        }
        $('#UpMark').on('click', function () {
            if (!document.getElementById('UpMark').checked) {
                document.getElementById('UpMark').checked = false;
                chrome.storage.local.set({ 'upHighlight': false });
            } else {
                document.getElementById('UpMark').checked = true;
                chrome.storage.local.set({ 'upHighlight': true });
            }
        });
    });

    //=====================评论用户扫描==========================
    chrome.storage.local.get(['scan'], function (items) {
        var UserScan = items.scan;
        if (UserScan) {
            document.getElementById('UserScan').checked = true;
        } else {
            document.getElementById('UserScan').checked = false;
        }
        $('#UserScan').on('click', function () {
            if (!document.getElementById('UserScan').checked) {
                document.getElementById('UserScan').checked = false;
                chrome.storage.local.set({ 'scan': false });
            } else {
                document.getElementById('UserScan').checked = true;
                chrome.storage.local.set({ 'scan': true });
            }
        });
    });

    //=====================评论用户标记==========================
    chrome.storage.local.get(['mark'], function (items) {
        var UserScanUI = items.mark;
        if (UserScanUI) {
            document.getElementById('UserScanUI').checked = true;
        } else {
            document.getElementById('UserScanUI').checked = false;
        }
        $('#UserScanUI').on('click', function () {
            if (!document.getElementById('UserScanUI').checked) {
                document.getElementById('UserScanUI').checked = false;
                chrome.storage.local.set({ 'mark': false });
            } else {
                document.getElementById('UserScanUI').checked = true;
                chrome.storage.local.set({ 'mark': true });
            }
        });
    });

    //====================关注在主站关注的直播开播推送===================
    chrome.storage.local.get(['followLiveNotif'], function (items) {
        var followLiveNotif = items.followLiveNotif;
        if (followLiveNotif) {
            document.getElementById('followLiveNotif').checked = true;
        } else {
            document.getElementById('followLiveNotif').checked = false;
        }
        $('#followLiveNotif').on('click', function () {
            if (!document.getElementById('followLiveNotif').checked) {
                document.getElementById('followLiveNotif').checked = false;
                chrome.storage.local.set({ 'followLiveNotif': false });
            } else {
                document.getElementById('followLiveNotif').checked = true;
                chrome.storage.local.set({ 'followLiveNotif': true });
            }
        });
    });

    //=============================关注直播推送==========================
    chrome.storage.local.get(['liveFloowNotif'], function (items) {
        var liveFloowingsw_status = items.liveFloowNotif;
        if (liveFloowingsw_status) {
            document.getElementById('liveFollowNotifsw').checked = true;
        } else {
            document.getElementById('liveFollowNotifsw').checked = false;
        }
        $('#liveFollowNotifsw').on('click', function () {
            if (!document.getElementById('liveFollowNotifsw').checked) {
                document.getElementById('liveFollowNotifsw').checked = false;
                chrome.storage.local.set({ 'liveFloowNotif': false });
            } else {
                document.getElementById('liveFollowNotifsw').checked = true;
                chrome.storage.local.set({ 'liveFloowNotif': true });
            }
        });
    });
    chrome.storage.local.get(['liveFloowings'], function (items) {
        if (JSON.stringify(items) !== '{}') {
            for (i in items.liveFloowings) {
                $('ul#liveFollowNotifList').append(`<li class="mdui-list-item mdui-ripple" data-key=${i} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveFloowingsItems" data-key=${i} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${i}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons liveWatchOrig" data-key=${i} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${i} UserName:${items.liveFloowings[i]}</div></li>`);
            }
            $('.liveFloowingsItems').click(function () {
                let this_uid = $(this).data("key");
                $(this).parent().hide();
                mdui.snackbar({
                    message: `已移除 ${items.liveFloowings[this_uid]}`,
                });
                delete items.liveFloowings[this_uid];
                chrome.storage.local.set({ 'liveFloowings': items.liveFloowings });
            });
            // $('.liveWatchOrig').click(function () {
            //     let this_uid=$(this).data("key");
            //     window.open('https://live.acfun.cn/live/'+this_uid);
            // });
        }
    });
    chrome.storage.local.get(['liveFloowings'], function (items) {
        if (JSON.stringify(items) == '{}') {
            let a = {}
            chrome.storage.local.set({ 'liveFloowings': a });
        } else {
            $('#liveFollowAdd').on('click', function () {
                mdui.prompt('请输入你需要关注的用户UID', '添加关注',
                    async function (value) {
                        if (!value == '') {
                            var up_url = options.userInfo.replace('{uid}', value);
                            for (i in items.liveFloowings) {
                                if (i == value) {
                                    var errN = 1;
                                    break
                                } else {
                                    var errN = 0;
                                }
                            }
                            if (errN != 1) {
                                var up_html_str;
                                try {
                                    up_html_str = await ajax('GET', up_url);
                                } catch (e) {
                                    var errN = 2
                                    return;
                                }
                                let status = JSON.parse(up_html_str).result;
                                if (status == 0) {
                                    var liveup_name = JSON.parse(up_html_str).profile.name;
                                    var errN = 0;
                                } else { var errN = 2 };
                            }
                            if (errN == 0) {
                                items.liveFloowings[value] = liveup_name;
                                chrome.storage.local.set({ 'liveFloowings': items.liveFloowings })
                                mdui.snackbar({ message: ` ${liveup_name} 已被加入关注列表` });
                                $('ul#liveFollowNotifList').append(`<li class="mdui-list-item mdui-ripple" data-key=${value} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveFloowingsItems" data-key=${value} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${value}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons liveWatch" data-key=${value} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${value} UserName:${liveup_name}</div></li>`);
                                $('.liveFloowingsItems').click(function () {
                                    let this_uid = $(this).data("key");
                                    $(this).parent().hide();
                                    mdui.snackbar({
                                        message: `已移除 ${items.liveFloowings[this_uid]}`,
                                    });
                                    delete items.liveFloowings[this_uid];
                                    chrome.storage.local.set({ 'liveFloowings': items.liveFloowings });
                                });
                            } else if (errN == 1) {
                                mdui.alert('你添加的用户已关注');
                            } else if (errN == 2) {
                                mdui.alert('用户不存在');
                            }
                        } else {
                            mdui.alert('UID未输入');
                        }
                    },
                    function () {
                    }
                );
            })
        }
    });

    //========================立即打开直播推送==========================//
    chrome.storage.local.get(['liveFollowOpenNow'], function (items) {
        var liveFollowOpenNow = items.liveFollowOpenNow;
        if (liveFollowOpenNow) {
            document.getElementById('liveFollowOpenNow').checked = true;
        } else {
            document.getElementById('liveFollowOpenNow').checked = false;
        }
        $('#liveFollowOpenNow').on('click', function () {
            if (!document.getElementById('liveFollowOpenNow').checked) {
                document.getElementById('liveFollowOpenNow').checked = false;
                chrome.storage.local.set({ 'liveFollowOpenNow': false });
            } else {
                document.getElementById('liveFollowOpenNow').checked = true;
                chrome.storage.local.set({ 'liveFollowOpenNow': true });
            }
        });
    });
}

function contentConfigure() {
    //========================稍后再看==========================//
    chrome.storage.local.get(['watchLater'], function (items) {
        var watchLater = items.watchLater;
        if (watchLater) {
            document.getElementById('watchLater').checked = true;
        } else {
            document.getElementById('watchLater').checked = false;
        }
        $('#watchLater').on('click', function () {
            if (!document.getElementById('watchLater').checked) {
                document.getElementById('watchLater').checked = false;
                chrome.storage.local.set({ 'watchLater': false });
            } else {
                document.getElementById('watchLater').checked = true;
                chrome.storage.local.set({ 'watchLater': true });
            }
        });
        $('#watchLaterStart').click(() => {
            if (document.getElementById('watchLater').checked) {
                mdui.snackbar({
                    message: `已经启动 稍后再看 排程。`,
                });
                MessageSwitch.sendMessage('fg', { target: "watchLater", params: {}, InvkSetting: { type: "function" } })
            } else {
                mdui.snackbar({
                    message: `稍后再看列表没有项目或者没有打开开关，助手不知道从何而起，巧妇难为无米之炊；请先添加或打开开关。`,
                });
            }
        });
        let eventObj = document.getElementById('watchLaterList');
        eventObj.onclick = async (ev) => {
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if (target.nodeName.toLowerCase() == 'i') {
                let x = await getStorage("WatchPlanList");
                let Url = "https://www.acfun.cn/" + target.dataset.type + "/ac" + target.dataset.key;
                mdui.snackbar({
                    message: `已移除 ${target.parentNode.children[3].innerText}`,
                });
                x.WatchPlanList.splice(x.WatchPlanList.indexOf(Url), 1)
                target.parentNode.remove();
                chrome.storage.local.set({ 'WatchPlanList': x.WatchPlanList });
            }
        }
        $('#firstwatchLaterList').click(async () => {
            $("#watchLaterList").empty();
            let x = await getStorage("WatchPlanList");
            for (let i in x.WatchPlanList) {
                let y = new RegExp("/v/ac([0-9].*)");
                let z = new RegExp("/a/ac([0-9].*)");
                try {
                    var acId = y.exec(x.WatchPlanList[i])[1]
                } catch (error) {
                    var acId = null;
                }
                if (acId != null) {
                    fetch("https://mini.pocketword.cn/api/acfun/info?dougaId=" + acId).then((res => { return res.text() }))
                        .then((res) => {
                            let x = JSON.parse(res);
                            $("#watchLaterList").append(`
                            <li class="mdui-list-item mdui-ripple" style="cursor:default">
                            <i class="mdui-list-item-icon mdui-icon material-icons watchLaterListdelItem" data-key=${x.dougaId} data-type="v" style="cursor:pointer">delete</i>
                            <a href=${x.shareUrl} target="_blank">
                              <i class="mdui-list-item-icon mdui-icon material-icons" data-key=${x.dougaId} style="cursor:pointer">desktop_windows</i></a>
                              <div class="mdui-list-item-content">[视频] ${x.user.name}： ${x.title}{</div>
                            </li>
                            `)
                        })
                } else if (z.exec(x.WatchPlanList[i])[1]) {
                    let acAid = z.exec(x.WatchPlanList[i])[1];
                    fetch("https://api-new.app.acfun.cn/rest/app/article/info?articleId=" + acAid).then((res => { return res.text() }))
                        .then((res) => {
                            let x = JSON.parse(res);
                            $("#watchLaterList").append(`
                            <li class="mdui-list-item mdui-ripple" style="cursor:default">
                            <i class="mdui-list-item-icon mdui-icon material-icons watchLaterListdelItem" data-key=${x.articleId} data-type="a" style="cursor:pointer">delete</i>
                            <a href=${x.shareUrl} target="_blank">
                              <i class="mdui-list-item-icon mdui-icon material-icons" data-key=${x.articleId} style="cursor:pointer">desktop_windows</i></a>
                              <div class="mdui-list-item-content">[文章] ${x.user.name}： ${x.title}</div>
                            </li>
                            `)
                        })
                }
            }
        })
    });

    //===================直播屏蔽配置相关==========================//
    chrome.storage.local.get(['liveBansw'], function (items) {
        var liveBans_status = items.liveBansw;
        if (liveBans_status) {
            document.getElementById('liveBansw').checked = true;
        } else {
            document.getElementById('liveBansw').checked = false;
        }
        $('#liveBansw').on('click', function () {
            if (!document.getElementById('liveBansw').checked) {
                document.getElementById('liveBansw').checked = false;
                chrome.storage.local.set({ 'liveBansw': false });
            } else {
                document.getElementById('liveBansw').checked = true;
                chrome.storage.local.set({ 'liveBansw': true });
            }
        });
    });
    chrome.storage.local.get(['liveBans'], function (items) {
        if (JSON.stringify(items) !== '{}') {
            for (i in items.liveBans) {
                $('ul#liveBanList').append(`<li class="mdui-list-item mdui-ripple" data-key=${i} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveBansItems" data-key=${i} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${i}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons BanWatchOrig" data-key=${i} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${i} UserName:${items.liveBans[i]}</div></li>`);
            }
            $('.liveBansItems').click(function () {
                let this_uid = $(this).data("key");
                $(this).parent().hide();
                mdui.snackbar({
                    message: `已移除 ${items.liveBans[this_uid]}`,
                });
                delete items.liveBans[this_uid];
                chrome.storage.local.set({ 'liveBans': items.liveBans });
            });
        }
    });
    chrome.storage.local.get(['liveBans'], function (items) {
        if (JSON.stringify(items) == '{}') {
            let a = {}
            chrome.storage.local.set({ 'liveBans': a });
        } else {
            $('#liveBanAdd').on('click', function () {
                mdui.prompt('请输入你需要屏蔽的用户UID', '添加用户',
                    async function (value) {
                        if (!value == '') {
                            var up_url = options.userInfo.replace('{uid}', value);
                            for (i in items.liveFloowings) {
                                if (i == value) {
                                    var errN = 1;
                                    break
                                } else {
                                    var errN = 0;
                                }
                            }
                            if (errN != 1) {
                                var up_html_str;
                                try {
                                    up_html_str = await ajax('GET', up_url);
                                } catch (e) {
                                    var errN = 2
                                    return;
                                }
                                let status = JSON.parse(up_html_str).result;
                                if (status == 0) {
                                    var liveup_name = JSON.parse(up_html_str).profile.name;
                                    var errN = 0;
                                } else { var errN = 2 };
                            }
                            if (errN == 0) {
                                items.liveBans[value] = liveup_name;
                                chrome.storage.local.set({ 'liveBans': items.liveBans })
                                mdui.snackbar({ message: ` ${liveup_name} 已被加入关注列表` });
                                $('ul#liveBanList').append(`<li class="mdui-list-item mdui-ripple" data-key=${value} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveBansItems" data-key=${value} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${value}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons BanWatchOrig" data-key=${value} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${value} UserName:${liveup_name}</div></li>`);
                                $('.liveBansItems').click(function () {
                                    let this_uid = $(this).data("key");
                                    $(this).parent().hide();
                                    mdui.snackbar({
                                        message: `已移除 ${items.liveBans[this_uid]}`,
                                    });
                                    delete items.liveBans[this_uid];
                                    chrome.storage.local.set({ 'liveBans': items.liveBans });
                                });
                            } else if (errN == 1) {
                                mdui.alert('你添加的用户已关注');
                            } else if (errN == 2) {
                                mdui.alert('用户不存在');
                            }
                        } else {
                            mdui.alert('UID未输入');
                        }
                    },
                    function () {
                    }
                );
            })
        }
    });

    //====================通知===============
    chrome.storage.local.get(['notificationContent'], function (items) {
        var commentNotif = items.notificationContent.commentNotif;
        var likeNotif = items.notificationContent.likeNotif;
        var giftNotif = items.notificationContent.giftNotif;
        if (commentNotif) {
            document.getElementById('commentNotif').checked = true;
        } else {
            document.getElementById('commentNotif').checked = false;
        }
        if (likeNotif) {
            document.getElementById('likeNotif').checked = true;
        } else {
            document.getElementById('likeNotif').checked = false;
        }
        if (giftNotif) {
            document.getElementById('giftNotif').checked = true;
        } else {
            document.getElementById('giftNotif').checked = false;
        }
        $('#commentNotif').on('click', function () {
            if (!document.getElementById('commentNotif').checked) {
                document.getElementById('commentNotif').checked = false;
                items.notificationContent.commentNotif = false;
            } else {
                document.getElementById('commentNotif').checked = true;
                items.notificationContent.commentNotif = true;
            }
            chrome.storage.local.set({ 'notificationContent': items.notificationContent });
        });
        $('#likeNotif').on('click', function () {
            if (!document.getElementById('likeNotif').checked) {
                document.getElementById('likeNotif').checked = false;
                items.notificationContent.likeNotif = false;
            } else {
                document.getElementById('likeNotif').checked = true;
                items.notificationContent.likeNotif = true;
            }
            chrome.storage.local.set({ 'notificationContent': items.notificationContent });
        });
        $('#giftNotif').on('click', function () {
            if (!document.getElementById('giftNotif').checked) {
                document.getElementById('giftNotif').checked = false;
                items.notificationContent.giftNotif = false;
            } else {
                document.getElementById('giftNotif').checked = true;
                items.notificationContent.giftNotif = true;
            }
            chrome.storage.local.set({ 'notificationContent': items.notificationContent });
        });
    });

    //===================Up主文章屏蔽=======================
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
            $('.filter-add-remove').on('click', async function () {
                $(this).parent().parent().parent().parent().remove();
                if ($('#filter-ups .site').length <= 0) {
                    $('#filter-ups').removeClass('table-custom-padding');
                }
            });
            $('#filter_table .filter-add-confirm').on('click', async function () {
                $('.filter-fail').hide();
                var input_valid = true;
                var uid_input = $(this).parent().prev().children('input').val();
                let user_key = "FILTER_" + uid_input;
                if (uid_input === '') {
                    $('.filter-fail').text('输入内容不能为空');
                    $('.filter-fail').show();
                    input_valid = false;
                } else if (!uid_input.match(uidReg)) {
                    $('.mark-fail').text('uid必须为数字');
                    $('.mark-fail').show();
                    input_valid = false;
                }
                if (!input_valid) {
                    return;
                }
                //判断此uid是否存在
                let ac_res = await getStorage("FILTER_" + uid_input).then(value => { return value["FILTER_" + uid_input] });
                if (ac_res != undefined && ac_res != null && ac_res.name != '') {
                    input_valid = false;
                    $('.filter-fail').text('此up已被屏蔽');
                    $('.filter-fail').show();
                }

                if (input_valid) {
                    //根据uid解析出up主姓名
                    $("body").mLoading("show");
                    let up_url = options.userInfo.replace('{uid}', uid_input);
                    var up_html_str;
                    try {
                        up_html_str = await ajax('GET', up_url);
                    } catch (e) {
                        $("body").mLoading("hide");
                        $('.mark-fail').text('此uid不存在');
                        $('.mark-fail').show();
                        return;
                    }
                    let up_name = JSON.parse(up_html_str).profile.name;

                    if (up_name == '' || up_name == undefined) {
                        $("body").mLoading("hide");
                        $('.mark-fail').text('此uid不存在');
                        $('.mark-fail').show();
                        return;
                    }

                    let user_scan = {
                        name: up_name,
                    }
                    chrome.storage.local.set({ [user_key]: user_scan }, function () {
                        $('#filter-ups #filter-blank').remove();
                        $('#filter-ups').prepend('\
                          <tr class="site-tr">\
                              <td style="width: 200px" class="site"><a href="' + up_url + '" target="_blank">' + uid_input + '</a></td>\
                              <td class="site-name"><a href="' + up_url + '" target="_blank">' + up_name + '</a></td>\
                              <td class="site-remove"><span href="#" class="filter-remove">移除</span></td>\
                            </tr>');
                    });

                    $(this).parent().parent().parent().parent().remove();
                    $('#filter-ups').on('click', '.filter-remove', function () {
                        if (filter) {
                            $(this).parent().parent().remove();
                            chrome.storage.local.remove(user_key, function () {
                                //do something
                            });
                        }
                    });
                    $("body").mLoading("hide");
                }
            });
        }
    });

}

function pageEnhance() {
    //=====================主页顶栏页面美化============================
    chrome.storage.local.get(['Dev_indexBlurSW'], function (items) {
        var Dev_indexBlurSW = items.Dev_indexBlurSW;
        if (Dev_indexBlurSW) {
            document.getElementById('Dev_indexBlurSW').checked = true;
        } else {
            document.getElementById('Dev_indexBlurSW').checked = false;
        }
        $('#Dev_indexBlurSW').on('click', function () {
            if (!document.getElementById('Dev_indexBlurSW').checked) {
                document.getElementById('Dev_indexBlurSW').checked = false;
                chrome.storage.local.set({ 'Dev_indexBlurSW': false });
            } else {
                document.getElementById('Dev_indexBlurSW').checked = true;
                chrome.storage.local.set({ 'Dev_indexBlurSW': true });
            }
        });
    });

    chrome.storage.local.get(['Dev_thinScrollbar'], function (items) {
        var Dev_thinScrollbar = items.Dev_thinScrollbar;
        if (Dev_thinScrollbar) {
            document.getElementById('Dev_thinScrollbar').checked = true;
        } else {
            document.getElementById('Dev_thinScrollbar').checked = false;
        }
        $('#Dev_thinScrollbar').on('click', function () {
            if (!document.getElementById('Dev_thinScrollbar').checked) {
                document.getElementById('Dev_thinScrollbar').checked = false;
                chrome.storage.local.set({ 'Dev_thinScrollbar': false });
            } else {
                document.getElementById('Dev_thinScrollbar').checked = true;
                chrome.storage.local.set({ 'Dev_thinScrollbar': true });
            }
        });
    });

    //=====================视频稿件评论区ac号信息弹框==========================
    chrome.storage.local.get(['uddPopUp'], function (items) {
        var uddPopUp = items.uddPopUp;
        if (uddPopUp) {
            document.getElementById('uddPopUp').checked = true;
            document.getElementsByClassName("uddPopUptypesw")[0].hidden = false;
        } else {
            document.getElementById('uddPopUp').checked = false;
            document.getElementsByClassName("uddPopUptypesw")[0].hidden = true;
        }
        $('#uddPopUp').on('click', function () {
            if (!document.getElementById('uddPopUp').checked) {
                document.getElementById('uddPopUp').checked = false;
                chrome.storage.local.set({ 'uddPopUp': false });
                document.getElementsByClassName("uddPopUptypesw")[0].hidden = true;
            } else {
                document.getElementById('uddPopUp').checked = true;
                chrome.storage.local.set({ 'uddPopUp': true });
                document.getElementsByClassName("uddPopUptypesw")[0].hidden = false;
            }
        });
    });

    //====================视频稿件评论区ac号信息弹框模式===============
    chrome.storage.local.get(['uddPopUptype'], function (items) {
        document.querySelector("#uddPopUptype").parentElement.children[1].children[1].children[items.uddPopUptype].click();
        var inst = new mdui.Select('#uddPopUptype');
        $('#uddPopUptype').on('close.mdui.select', function () {
            chrome.storage.local.set({ 'uddPopUptype': inst.value });
        });
    });

    //=====================视频稿件评论区ac号信息弹框==========================
    chrome.storage.local.get(['articleReadMode'], function (items) {
        var articleReadMode = items.articleReadMode;
        if (articleReadMode) {
            document.getElementById('articleReadMode').checked = true;
        } else {
            document.getElementById('articleReadMode').checked = false;
        }
        $('#articleReadMode').on('click', function () {
            if (!document.getElementById('articleReadMode').checked) {
                document.getElementById('articleReadMode').checked = false;
                chrome.storage.local.set({ 'articleReadMode': false });
            } else {
                document.getElementById('articleReadMode').checked = true;
                chrome.storage.local.set({ 'articleReadMode': true });
            }
        });
    });

    //=====================隐藏播放器推荐宫格============================
    chrome.storage.local.get(['playerRecommendHide'], function (items) {
        var playerRecommendHide = items.playerRecommendHide;
        if (playerRecommendHide) {
            document.getElementById('playerRecommendHide').checked = true;
        } else {
            document.getElementById('playerRecommendHide').checked = false;
        }
        $('#playerRecommendHide').on('click', function () {
            if (!document.getElementById('playerRecommendHide').checked) {
                document.getElementById('playerRecommendHide').checked = false;
                chrome.storage.local.set({ 'playerRecommendHide': false });
            } else {
                document.getElementById('playerRecommendHide').checked = true;
                chrome.storage.local.set({ 'playerRecommendHide': true });
            }
        });
    });

    //=====================文章区图片拖动支持============================
    chrome.storage.local.get(['picDrag'], function (items) {
        var picDrag = items.picDrag;
        if (picDrag) {
            document.getElementById('picDrag').checked = true;
        } else {
            document.getElementById('picDrag').checked = false;
        }
        $('#picDrag').on('click', function () {
            if (!document.getElementById('picDrag').checked) {
                document.getElementById('picDrag').checked = false;
                chrome.storage.local.set({ 'picDrag': false });
            } else {
                document.getElementById('picDrag').checked = true;
                chrome.storage.local.set({ 'picDrag': true });
            }
        });
    });

    //=====================文章区图片旋转支持============================
    chrome.storage.local.get(['picRotate'], function (items) {
        var picRotate = items.picRotate;
        if (picRotate) {
            document.getElementById('picRotate').checked = true;
        } else {
            document.getElementById('picRotate').checked = false;
        }
        $('#picRotate').on('click', function () {
            if (!document.getElementById('picRotate').checked) {
                document.getElementById('picRotate').checked = false;
                chrome.storage.local.set({ 'picRotate': false });
            } else {
                document.getElementById('picRotate').checked = true;
                chrome.storage.local.set({ 'picRotate': true });
            }
        });
    });

    //=====================评论区快捷翻页============================
    chrome.storage.local.get(['commentPageEasyTrans'], function (items) {
        var commentPageEasyTrans = items.commentPageEasyTrans;
        if (commentPageEasyTrans) {
            document.getElementById('commentPageEasyTrans').checked = true;
        } else {
            document.getElementById('commentPageEasyTrans').checked = false;
        }
        $('#commentPageEasyTrans').on('click', function () {
            if (!document.getElementById('commentPageEasyTrans').checked) {
                document.getElementById('commentPageEasyTrans').checked = false;
                chrome.storage.local.set({ 'commentPageEasyTrans': false });
            } else {
                document.getElementById('commentPageEasyTrans').checked = true;
                chrome.storage.local.set({ 'commentPageEasyTrans': true });
            }
        });
    });

    //=====================个人中心排版优化============================
    chrome.storage.local.get(['userCenterBeautify'], function (items) {
        var userCenterBeautify = items.userCenterBeautify;
        if (userCenterBeautify) {
            document.getElementById('userCenterBeautify').checked = true;
        } else {
            document.getElementById('userCenterBeautify').checked = false;
        }
        $('#userCenterBeautify').on('click', function () {
            if (!document.getElementById('userCenterBeautify').checked) {
                document.getElementById('userCenterBeautify').checked = false;
                chrome.storage.local.set({ 'userCenterBeautify': false });
            } else {
                document.getElementById('userCenterBeautify').checked = true;
                chrome.storage.local.set({ 'userCenterBeautify': true });
            }
        });
    });

    //=====================个人中心宽式视频列表============================
    chrome.storage.local.get(['widenUCVideoList'], function (items) {
        var widenUCVideoList = items.widenUCVideoList;
        if (widenUCVideoList) {
            document.getElementById('widenUCVideoList').checked = true;
        } else {
            document.getElementById('widenUCVideoList').checked = false;
        }
        $('#widenUCVideoList').on('click', function () {
            if (!document.getElementById('widenUCVideoList').checked) {
                document.getElementById('widenUCVideoList').checked = false;
                chrome.storage.local.set({ 'widenUCVideoList': false });
            } else {
                document.getElementById('widenUCVideoList').checked = true;
                chrome.storage.local.set({ 'widenUCVideoList': true });
            }
        });
    });

    //=====================个人中心快捷键翻页============================
    chrome.storage.local.get(['pageTransKeyBind'], function (items) {
        var pageTransKeyBind = items.pageTransKeyBind;
        if (pageTransKeyBind) {
            document.getElementById('pageTransKeyBind').checked = true;
        } else {
            document.getElementById('pageTransKeyBind').checked = false;
        }
        $('#pageTransKeyBind').on('click', function () {
            if (!document.getElementById('pageTransKeyBind').checked) {
                document.getElementById('pageTransKeyBind').checked = false;
                chrome.storage.local.set({ 'pageTransKeyBind': false });
            } else {
                document.getElementById('pageTransKeyBind').checked = true;
                chrome.storage.local.set({ 'pageTransKeyBind': true });
            }
        });
    });

    //=====================个人中心时间流稿件============================
    chrome.storage.local.get(['userPageTimeline'], function (items) {
        var userPageTimeline = items.userPageTimeline;
        if (userPageTimeline) {
            document.getElementById('userPageTimeline').checked = true;
        } else {
            document.getElementById('userPageTimeline').checked = false;
        }
        $('#userPageTimeline').on('click', function () {
            if (!document.getElementById('userPageTimeline').checked) {
                document.getElementById('userPageTimeline').checked = false;
                chrome.storage.local.set({ 'userPageTimeline': false });
            } else {
                document.getElementById('userPageTimeline').checked = true;
                chrome.storage.local.set({ 'userPageTimeline': true });
            }
        });
    });

    //=====================快捷键发送评论============================
    chrome.storage.local.get(['quickCommentSubmit'], function (items) {
        var quickCommentSubmit = items.quickCommentSubmit;
        if (quickCommentSubmit) {
            document.getElementById('quickCommentSubmit').checked = true;
        } else {
            document.getElementById('quickCommentSubmit').checked = false;
        }
        $('#quickCommentSubmit').on('click', function () {
            if (!document.getElementById('quickCommentSubmit').checked) {
                document.getElementById('quickCommentSubmit').checked = false;
                chrome.storage.local.set({ 'quickCommentSubmit': false });
            } else {
                document.getElementById('quickCommentSubmit').checked = true;
                chrome.storage.local.set({ 'quickCommentSubmit': true });
            }
        });
    });

    //=====================直播评论时间Tag============================
    chrome.storage.local.get(['liveCommentTimeTag'], function (items) {
        var liveCommentTimeTag = items.liveCommentTimeTag;
        if (liveCommentTimeTag) {
            document.getElementById('liveCommentTimeTag').checked = true;
        } else {
            document.getElementById('liveCommentTimeTag').checked = false;
        }
        $('#liveCommentTimeTag').on('click', function () {
            if (!document.getElementById('liveCommentTimeTag').checked) {
                document.getElementById('liveCommentTimeTag').checked = false;
                chrome.storage.local.set({ 'liveCommentTimeTag': false });
            } else {
                document.getElementById('liveCommentTimeTag').checked = true;
                chrome.storage.local.set({ 'liveCommentTimeTag': true });
            }
        });
    })

    //=====================直播评论临时标记============================
    chrome.storage.local.get(['LiveUserFocus'], function (items) {
        var LiveUserFocus = items.LiveUserFocus;
        if (LiveUserFocus) {
            document.getElementById('LiveUserFocus').checked = true;
        } else {
            document.getElementById('LiveUserFocus').checked = false;
        }
        $('#LiveUserFocus').on('click', function () {
            if (!document.getElementById('LiveUserFocus').checked) {
                document.getElementById('LiveUserFocus').checked = false;
                chrome.storage.local.set({ 'LiveUserFocus': false });
            } else {
                document.getElementById('LiveUserFocus').checked = true;
                chrome.storage.local.set({ 'LiveUserFocus': true });
            }
        });
    })

    //=====================Windows MediaSession支持============================
    chrome.storage.local.get(['liveMediaSession'], function (items) {
        if ("mediaSession" in navigator) {
            var liveMediaSession = items.liveMediaSession;
            if (liveMediaSession) {
                document.getElementById('liveMediaSession').checked = true;
            } else {
                document.getElementById('liveMediaSession').checked = false;
            }
            $('#liveMediaSession').on('click', function () {
                if (!document.getElementById('liveMediaSession').checked) {
                    document.getElementById('liveMediaSession').checked = false;
                    chrome.storage.local.set({ 'liveMediaSession': false });
                } else {
                    document.getElementById('liveMediaSession').checked = true;
                    chrome.storage.local.set({ 'liveMediaSession': true });
                }
            });
        } else {
            let elem = document.getElementById('liveMediaSession');
            elem.disabled = true;
            elem.parentElement.parentElement.parentElement.children[2].style.display = "block";
        }
    })

    //=====================首页右侧导航============================
    chrome.storage.local.get(['beautify_nav'], function (items) {
        var ifbeautify_nav = items.beautify_nav;
        if (ifbeautify_nav) {
            document.getElementById('beautify_nav').checked = true;
        } else {
            document.getElementById('beautify_nav').checked = false;
        }
        $('#beautify_nav').on('click', function () {
            if (!document.getElementById('beautify_nav').checked) {
                document.getElementById('beautify_nav').checked = false;
                chrome.storage.local.set({ 'beautify_nav': false });
            } else {
                document.getElementById('beautify_nav').checked = true;
                chrome.storage.local.set({ 'beautify_nav': true });
            }
        });
    });

    //=====================首页顶栏个人中心修改============================
    chrome.storage.local.get(['beautify_personal'], function (items) {
        var ifbeautify_personal = items.beautify_personal;
        if (ifbeautify_personal) {
            document.getElementById('beautify_personal').checked = true;
        } else {
            document.getElementById('beautify_personal').checked = false;
        }
        $('#beautify_personal').on('click', function () {
            if (!document.getElementById('beautify_personal').checked) {
                document.getElementById('beautify_personal').checked = false;
                chrome.storage.local.set({ 'beautify_personal': false });
            } else {
                document.getElementById('beautify_personal').checked = true;
                chrome.storage.local.set({ 'beautify_personal': true });
            }
        });
    });

    //=====================页面优化============================
    chrome.storage.local.get(['hideAd'], function (items) {
        var ifHideAd = items.hideAd;
        if (ifHideAd) {
            document.getElementById('hideAd').checked = true;
        } else {
            document.getElementById('hideAd').checked = false;
        }
        $('#hideAd').on('click', function () {
            if (!document.getElementById('hideAd').checked) {
                document.getElementById('hideAd').checked = false;
                chrome.storage.local.set({ 'hideAd': false });
            } else {
                document.getElementById('hideAd').checked = true;
                chrome.storage.local.set({ 'hideAd': true });
            }
        });
    });

    chrome.storage.local.get(['liveHideAd'], function (items) {
        var liveHideAd = items.liveHideAd;
        if (liveHideAd) {
            document.getElementById('liveHideAd').checked = true;
            document.getElementsByClassName("liveHideAdsw")[0].hidden = false;
        } else {
            document.getElementById('liveHideAd').checked = false;
            document.getElementsByClassName("liveHideAdsw")[0].hidden = true;
        }
        $('#liveHideAd').on('click', function () {
            if (!document.getElementById('liveHideAd').checked) {
                document.getElementById('liveHideAd').checked = false;
                chrome.storage.local.set({ 'liveHideAd': false });
                document.getElementsByClassName("liveHideAdsw")[0].hidden = true;
            } else {
                document.getElementById('liveHideAd').checked = true;
                chrome.storage.local.set({ 'liveHideAd': true });
                document.getElementsByClassName("liveHideAdsw")[0].hidden = false;
            }
        });
    });

    chrome.storage.local.get(['liveHideAdType'], function (items) {
        document.querySelector("#liveHideAdType").parentElement.children[1].children[1].children[items.liveHideAdType].click();
        var inst = new mdui.Select('#liveHideAdType');
        $('#liveHideAdType').on('close.mdui.select', function () {
            chrome.storage.local.set({ 'liveHideAdType': inst.value });
        });
    });

    chrome.storage.local.get(['liveHideAdMute'], function (items) {
        var liveHideAdMute = items.liveHideAdMute;
        if (liveHideAdMute) {
            document.getElementById('liveHideAdMute').checked = true;
        } else {
            document.getElementById('liveHideAdMute').checked = false;
        }
        $('#liveHideAdMute').on('click', function () {
            if (!document.getElementById('liveHideAdMute').checked) {
                document.getElementById('liveHideAdMute').checked = false;
                chrome.storage.local.set({ 'liveHideAdMute': false });
            } else {
                document.getElementById('liveHideAdMute').checked = true;
                chrome.storage.local.set({ 'liveHideAdMute': true });
            }
        });
    });

    chrome.storage.local.get(['livePlayerEnhc'], function (items) {
        var livePlayerEnhc = items.livePlayerEnhc;
        if (livePlayerEnhc) {
            document.getElementById('livePlayerEnhc').checked = true;
        } else {
            document.getElementById('livePlayerEnhc').checked = false;
        }
        $('#livePlayerEnhc').on('click', function () {
            if (!document.getElementById('livePlayerEnhc').checked) {
                document.getElementById('livePlayerEnhc').checked = false;
                chrome.storage.local.set({ 'livePlayerEnhc': false });
            } else {
                document.getElementById('livePlayerEnhc').checked = true;
                chrome.storage.local.set({ 'livePlayerEnhc': true });
            }
        });
    });

    chrome.storage.local.get(['liveIndexRankNum'], function (items) {
        var liveIndexRankNum = items.liveIndexRankNum;
        if (liveIndexRankNum) {
            document.getElementById('liveIndexRankNum').checked = true;
        } else {
            document.getElementById('liveIndexRankNum').checked = false;
        }
        $('#liveIndexRankNum').on('click', function () {
            if (!document.getElementById('liveIndexRankNum').checked) {
                document.getElementById('liveIndexRankNum').checked = false;
                chrome.storage.local.set({ 'liveIndexRankNum': false });
            } else {
                document.getElementById('liveIndexRankNum').checked = true;
                chrome.storage.local.set({ 'liveIndexRankNum': true });
            }
        });
    });

}

function playerConfigure() {
    //=====================弹幕搜索================
    chrome.storage.local.get(['PlayerDamakuSearchSw'], function (items) {
        var PlayerDamakuSearchSw = items.PlayerDamakuSearchSw;
        if (PlayerDamakuSearchSw) {
            document.getElementById('PlayerDamakuSearchSw').checked = true;
        } else {
            document.getElementById('PlayerDamakuSearchSw').checked = false;
        }
        $('#PlayerDamakuSearchSw').on('click', function () {
            if (!document.getElementById('PlayerDamakuSearchSw').checked) {
                document.getElementById('PlayerDamakuSearchSw').checked = false;
                chrome.storage.local.set({ 'PlayerDamakuSearchSw': false });
            } else {
                document.getElementById('PlayerDamakuSearchSw').checked = true;
                chrome.storage.local.set({ 'PlayerDamakuSearchSw': true });
            }
        });
    });

    //=====================弹幕搜索================
    chrome.storage.local.get(['PictureInPictureModeUI'], function (items) {
        var PictureInPictureModeUI = items.PictureInPictureModeUI;
        if (PictureInPictureModeUI) {
            document.getElementById('PictureInPictureModeUI').checked = true;
        } else {
            document.getElementById('PictureInPictureModeUI').checked = false;
        }
        $('#PictureInPictureModeUI').on('click', function () {
            if (!document.getElementById('PictureInPictureModeUI').checked) {
                document.getElementById('PictureInPictureModeUI').checked = false;
                chrome.storage.local.set({ 'PictureInPictureModeUI': false });
            } else {
                document.getElementById('PictureInPictureModeUI').checked = true;
                chrome.storage.local.set({ 'PictureInPictureModeUI': true });
            }
        });
    });

    //=====================AB回放================
    chrome.storage.local.get(['ABPlaysw'], function (items) {
        var ABPlaysw = items.ABPlaysw;
        if (ABPlaysw) {
            document.getElementById('ABPlaysw').checked = true;
        } else {
            document.getElementById('ABPlaysw').checked = false;
        }
        $('#ABPlaysw').on('click', function () {
            if (!document.getElementById('ABPlaysw').checked) {
                document.getElementById('ABPlaysw').checked = false;
                chrome.storage.local.set({ 'ABPlaysw': false });
            } else {
                document.getElementById('ABPlaysw').checked = true;
                chrome.storage.local.set({ 'ABPlaysw': true });
            }
        });
    });

    //=====================倍速切换快捷键================
    chrome.storage.local.get(['PlaybackRateKeysw'], function (items) {
        var PlaybackRateKeysw = items.PlaybackRateKeysw;
        if (PlaybackRateKeysw) {
            document.getElementById('PlaybackRateKeysw').checked = true;
        } else {
            document.getElementById('PlaybackRateKeysw').checked = false;
        }
        $('#PlaybackRateKeysw').on('click', function () {
            if (!document.getElementById('PlaybackRateKeysw').checked) {
                document.getElementById('PlaybackRateKeysw').checked = false;
                chrome.storage.local.set({ 'PlaybackRateKeysw': false });
            } else {
                document.getElementById('PlaybackRateKeysw').checked = true;
                chrome.storage.local.set({ 'PlaybackRateKeysw': true });
            }
        });
    });

    //=====================视频帧步进================
    chrome.storage.local.get(['frameStepSetting'], function (items) {
        var frameStepSetting = items.frameStepSetting.enabled;
        if (frameStepSetting) {
            document.getElementById('frameStepSetting').checked = true;
        } else {
            document.getElementById('frameStepSetting').checked = false;
        }
        $('#frameStepSetting').on('click', function () {
            if (!document.getElementById('frameStepSetting').checked) {
                document.getElementById('frameStepSetting').checked = false;
                items.frameStepSetting.enabled = false;
                chrome.storage.local.set({ 'frameStepSetting': items.frameStepSetting });
            } else {
                document.getElementById('frameStepSetting').checked = true;
                items.frameStepSetting.enabled = true;
                chrome.storage.local.set({ 'frameStepSetting': items.frameStepSetting });
            }
        });
    });
    //=====================视频帧步进UI================
    chrome.storage.local.get(['frameStepSetting'], function (items) {
        var frameStepUI = items.frameStepSetting.controlUI;
        if (frameStepUI) {
            document.getElementById('frameStepUI').checked = true;
        } else {
            document.getElementById('frameStepUI').checked = false;
        }
        $('#frameStepUI').on('click', function () {
            if (!document.getElementById('frameStepUI').checked) {
                document.getElementById('frameStepUI').checked = false;
                items.frameStepSetting.controlUI = false;
                chrome.storage.local.set({ 'frameStepSetting': items.frameStepSetting });
            } else {
                document.getElementById('frameStepUI').checked = true;
                items.frameStepSetting.controlUI = true;
                chrome.storage.local.set({ 'frameStepSetting': items.frameStepSetting });
            }
        });
    });

    //=====================评论区时间播放器快速跳转================
    chrome.storage.local.get(['PlayerTimeCommentEasyJump'], function (items) {
        var PlayerTimeCommentEasyJumpsw = items.PlayerTimeCommentEasyJump;
        if (PlayerTimeCommentEasyJumpsw) {
            document.getElementById('PlayerTimeCommentEasyJump').checked = true;
        } else {
            document.getElementById('PlayerTimeCommentEasyJump').checked = false;
        }
        $('#PlayerTimeCommentEasyJump').on('click', function () {
            if (!document.getElementById('PlayerTimeCommentEasyJump').checked) {
                document.getElementById('PlayerTimeCommentEasyJump').checked = false;
                chrome.storage.local.set({ 'PlayerTimeCommentEasyJump': false });
            } else {
                document.getElementById('PlayerTimeCommentEasyJump').checked = true;
                chrome.storage.local.set({ 'PlayerTimeCommentEasyJump': true });
            }
        });
    });

    //=====================评论区时间选中播放器快速跳转================
    chrome.storage.local.get(['easySearchScanForPlayerTimesw'], function (items) {
        var easySearchScanForPlayerTimesw = items.easySearchScanForPlayerTimesw;
        if (easySearchScanForPlayerTimesw) {
            document.getElementById('easySearchScanForPlayerTimesw').checked = true;
        } else {
            document.getElementById('easySearchScanForPlayerTimesw').checked = false;
        }
        $('#easySearchScanForPlayerTimesw').on('click', function () {
            if (!document.getElementById('easySearchScanForPlayerTimesw').checked) {
                document.getElementById('easySearchScanForPlayerTimesw').checked = false;
                chrome.storage.local.set({ 'easySearchScanForPlayerTimesw': false });
            } else {
                document.getElementById('easySearchScanForPlayerTimesw').checked = true;
                chrome.storage.local.set({ 'easySearchScanForPlayerTimesw': true });
            }
        });
    });

    //=====================选中时间文本给时间轴增加章节标记================
    chrome.storage.local.get(['timelineDots'], function (items) {
        var timelineDots = items.timelineDots;
        if (timelineDots) {
            document.getElementById('timelineDots').checked = true;
        } else {
            document.getElementById('timelineDots').checked = false;
        }
        $('#timelineDots').on('click', function () {
            if (!document.getElementById('timelineDots').checked) {
                document.getElementById('timelineDots').checked = false;
                chrome.storage.local.set({ 'timelineDots': false });
            } else {
                document.getElementById('timelineDots').checked = true;
                chrome.storage.local.set({ 'timelineDots': true });
            }
        });
    });

    //====================配置播放器自动跳转到上次观看时间===============
    chrome.storage.local.get(['custom_rate'], function (items) {
        var customRate_status = items.custom_rate;
        if (customRate_status) {
            document.getElementById('customRate').checked = true;
        } else {
            document.getElementById('customRate').checked = false;
        }
        $('#customRate').on('click', function () {
            if (!document.getElementById('customRate').checked) {
                document.getElementById('customRate').checked = false;
                chrome.storage.local.set({ 'custom_rate': false });
            } else {
                document.getElementById('customRate').checked = true;
                chrome.storage.local.set({ 'custom_rate': true });
            }
        });
    });

    //====================配置播放器自动跳转到上次观看时间===============
    chrome.storage.local.get(['autoJumpLastWatchSw'], function (items) {
        var autoJumpLastWatchSw_status = items.autoJumpLastWatchSw;
        if (autoJumpLastWatchSw_status) {
            document.getElementById('autoJumpLastWatchSw').checked = true;
        } else {
            document.getElementById('autoJumpLastWatchSw').checked = false;
        }
        $('#autoJumpLastWatchSw').on('click', function () {
            if (!document.getElementById('autoJumpLastWatchSw').checked) {
                document.getElementById('autoJumpLastWatchSw').checked = false;
                chrome.storage.local.set({ 'autoJumpLastWatchSw': false });
            } else {
                document.getElementById('autoJumpLastWatchSw').checked = true;
                chrome.storage.local.set({ 'autoJumpLastWatchSw': true });
            }
        });
    });

    //====================配置播放器结束时自动退出全屏模式===============
    chrome.storage.local.get(['endedAutoExitFullscreensw'], function (items) {
        var endedAutoExitFullscreensw = items.endedAutoExitFullscreensw;
        if (endedAutoExitFullscreensw) {
            document.getElementById('endedAutoExitFullscreensw').checked = true;
        } else {
            document.getElementById('endedAutoExitFullscreensw').checked = false;
            document.querySelector("#endedAutoToCommentAreasw").style.display = "none";
        }
        $('#endedAutoExitFullscreensw').on('click', function () {
            if (!document.getElementById('endedAutoExitFullscreensw').checked) {
                document.getElementById('endedAutoExitFullscreensw').checked = false;
                chrome.storage.local.set({ 'endedAutoExitFullscreensw': false });
                document.querySelector("#endedAutoToCommentAreasw").style.display = "none";
            } else {
                document.getElementById('endedAutoExitFullscreensw').checked = true;
                chrome.storage.local.set({ 'endedAutoExitFullscreensw': true });
                document.querySelector("#endedAutoToCommentAreasw").style.display = "block";
            }
        });
    });

    chrome.storage.local.get(['hideDanmakuOperator'], function (items) {
        if (items.hideDanmakuOperator.defaultMode) {
            document.getElementById('hideDanmakuOperator').checked = true;
        } else {
            document.getElementById('hideDanmakuOperator').checked = false;
        }
        if (items.hideDanmakuOperator.UI) {
            document.getElementById('hideDanmakuOperatorUI').checked = true;
        } else {
            document.getElementById('hideDanmakuOperatorUI').checked = false;
        }
        if (items.hideDanmakuOperator.maskSw) {
            document.getElementById('hideDanmakuOperatorMaskSw').checked = true;
        } else {
            document.getElementById('hideDanmakuOperatorMaskSw').checked = false;
        }
        $('#hideDanmakuOperator').on('click', function () {
            if (!document.getElementById('hideDanmakuOperator').checked) {
                document.getElementById('hideDanmakuOperator').checked = false;
                items.hideDanmakuOperator.defaultMode = false;
            } else {
                document.getElementById('hideDanmakuOperator').checked = true;
                items.hideDanmakuOperator.defaultMode = true;
            }
            chrome.storage.local.set({ 'hideDanmakuOperator': items.hideDanmakuOperator });
        });
        $('#hideDanmakuOperatorUI').on('click', function () {
            if (!document.getElementById('hideDanmakuOperatorUI').checked) {
                document.getElementById('hideDanmakuOperatorUI').checked = false;
                items.hideDanmakuOperator.UI = false;
            } else {
                document.getElementById('hideDanmakuOperatorUI').checked = true;
                items.hideDanmakuOperator.UI = true;
            }
            chrome.storage.local.set({ 'hideDanmakuOperator': items.hideDanmakuOperator });
        })
        $('#hideDanmakuOperatorMaskSw').on('click', function () {
            if (!document.getElementById('hideDanmakuOperatorMaskSw').checked) {
                document.getElementById('hideDanmakuOperatorMaskSw').checked = false;
                items.hideDanmakuOperator.maskSw = false;
            } else {
                document.getElementById('hideDanmakuOperatorMaskSw').checked = true;
                items.hideDanmakuOperator.maskSw = true;
            }
            chrome.storage.local.set({ 'hideDanmakuOperator': items.hideDanmakuOperator });
        })
    });

    chrome.storage.local.get(['sleepPause'], function (items) {
        if (items.sleepPause.defaultMode) {
            document.getElementById('sleepPause').checked = true;
        } else {
            document.getElementById('sleepPause').checked = false;
        }
        if (items.sleepPause.UI) {
            document.getElementById('sleepPauseUI').checked = true;
        } else {
            document.getElementById('sleepPauseUI').checked = false;
        }
        $('#sleepPause').on('click', function () {
            if (!document.getElementById('sleepPause').checked) {
                document.getElementById('sleepPause').checked = false;
                items.sleepPause.defaultMode = false;
            } else {
                document.getElementById('sleepPause').checked = true;
                items.sleepPause.defaultMode = true;
            }
            chrome.storage.local.set({ 'sleepPause': items.sleepPause });
        });
        $('#sleepPauseUI').on('click', function () {
            if (!document.getElementById('sleepPauseUI').checked) {
                document.getElementById('sleepPauseUI').checked = false;
                items.sleepPause.UI = false;
            } else {
                document.getElementById('sleepPauseUI').checked = true;
                items.sleepPause.UI = true;
            }
            chrome.storage.local.set({ 'sleepPause': items.sleepPause });
        })
    });

    //====================配置播放结束自动退出全屏然后滚动到评论区===============
    chrome.storage.local.get(['liveVolumeMild'], function (items) {
        var liveVolumeMild = items.liveVolumeMild;
        if (liveVolumeMild) {
            document.getElementById('liveVolumeMild').checked = true;
        } else {
            document.getElementById('liveVolumeMild').checked = false;
        }
        $('#liveVolumeMild').on('click', function () {
            if (!document.getElementById('liveVolumeMild').checked) {
                document.getElementById('liveVolumeMild').checked = false;
                ExtOptions.changeFeatureSwitch("liveVolumeMild", false);
            } else {
                document.getElementById('liveVolumeMild').checked = true;
                ExtOptions.changeFeatureSwitch("liveVolumeMild", true);
            }
        });
    });

    //====================配置播放结束自动退出全屏然后滚动到评论区===============
    chrome.storage.local.get(['endedAutoToCommentArea'], function (items) {
        var endedAutoToCommentArea = items.endedAutoToCommentArea;
        if (endedAutoToCommentArea) {
            document.getElementById('endedAutoToCommentArea').checked = true;
        } else {
            document.getElementById('endedAutoToCommentArea').checked = false;
        }
        $('#endedAutoToCommentArea').on('click', function () {
            if (!document.getElementById('endedAutoToCommentArea').checked) {
                document.getElementById('endedAutoToCommentArea').checked = false;
                chrome.storage.local.set({ 'endedAutoToCommentArea': false });
            } else {
                document.getElementById('endedAutoToCommentArea').checked = true;
                chrome.storage.local.set({ 'endedAutoToCommentArea': true });
            }
        });
    });

    //====================观影模式关灯适配暗色===============
    chrome.storage.local.get(['FilmModeExclusionsw'], function (items) {
        var FilmModeExclusionsw = items.FilmModeExclusionsw;
        if (FilmModeExclusionsw) {
            document.getElementById('FilmModeExclusionsw').checked = true;
        } else {
            document.getElementById('FilmModeExclusionsw').checked = false;
        }
        $('#FilmModeExclusionsw').on('click', function () {
            if (!document.getElementById('FilmModeExclusionsw').checked) {
                document.getElementById('FilmModeExclusionsw').checked = false;
                chrome.storage.local.set({ 'FilmModeExclusionsw': false });
            } else {
                document.getElementById('FilmModeExclusionsw').checked = true;
                chrome.storage.local.set({ 'FilmModeExclusionsw': true });
            }
        });
    });

    //====================全局播放进度条===============
    chrome.storage.local.get(['ProgressBarsw'], function (items) {
        var ProgressBarsw = items.ProgressBarsw;
        if (ProgressBarsw) {
            document.getElementById('ProgressBarsw').checked = true;
        } else {
            document.getElementById('ProgressBarsw').checked = false;
        }
        $('#ProgressBarsw').on('click', function () {
            if (!document.getElementById('ProgressBarsw').checked) {
                document.getElementById('ProgressBarsw').checked = false;
                chrome.storage.local.set({ 'ProgressBarsw': false });
            } else {
                document.getElementById('ProgressBarsw').checked = true;
                chrome.storage.local.set({ 'ProgressBarsw': true });
            }
        });
    });

    //====================视频播放器倍率音量放大===============
    chrome.storage.local.get(['audioGain'], function (items) {
        var audioGain = items.audioGain;
        if (audioGain) {
            document.getElementById('audioGain').checked = true;
        } else {
            document.getElementById('audioGain').checked = false;
        }
        $('#audioGain').on('click', function () {
            if (!document.getElementById('audioGain').checked) {
                document.getElementById('audioGain').checked = false;
                chrome.storage.local.set({ 'audioGain': false });
            } else {
                document.getElementById('audioGain').checked = true;
                chrome.storage.local.set({ 'audioGain': true });
                mdui.alert("启用此功能会导致与主站的“高级音效”和“JoySound”冲突，确定要启用吗");
            }
        });
    });

    //====================视频播放器 MediaSession支持===============
    chrome.storage.local.get(['videoMediaSession'], function (items) {
        if ("mediaSession" in navigator) {

        } else {
            document.getElementById('videoMediaSession').disabled = true;
        }
        var videoMediaSession = items.videoMediaSession;
        if (videoMediaSession) {
            document.getElementById('videoMediaSession').checked = true;
        } else {
            document.getElementById('videoMediaSession').checked = false;
        }
        $('#videoMediaSession').on('click', function () {
            if (!document.getElementById('videoMediaSession').checked) {
                document.getElementById('videoMediaSession').checked = false;
                chrome.storage.local.set({ 'videoMediaSession': false });
            } else {
                document.getElementById('videoMediaSession').checked = true;
                chrome.storage.local.set({ 'videoMediaSession': true });
            }
        });
    });

    //====================自动续播==================
    chrome.storage.local.get(['endedAutoJumpRecommandFirstDougasw'], function (items) {
        var endedAutoJumpRecommandFirstDougasw = items.endedAutoJumpRecommandFirstDougasw;
        if (endedAutoJumpRecommandFirstDougasw) {
            document.getElementById('endedAutoJumpRecommandFirstDougasw').checked = true;
        } else {
            document.getElementById('endedAutoJumpRecommandFirstDougasw').checked = false;
        }
        $('#endedAutoJumpRecommandFirstDougasw').on('click', function () {
            if (!document.getElementById('endedAutoJumpRecommandFirstDougasw').checked) {
                document.getElementById('endedAutoJumpRecommandFirstDougasw').checked = false;
                chrome.storage.local.set({ 'endedAutoJumpRecommandFirstDougasw': false });
            } else {
                document.getElementById('endedAutoJumpRecommandFirstDougasw').checked = true;
                chrome.storage.local.set({ 'endedAutoJumpRecommandFirstDougasw': true });
            }
        });
    });

    //====================自动展开视频简介==================
    chrome.storage.local.get(['autoOpenVideoDescsw'], function (items) {
        var autoOpenVideoDescsw = items.autoOpenVideoDescsw;
        if (autoOpenVideoDescsw) {
            document.getElementById('autoOpenVideoDescsw').checked = true;
        } else {
            document.getElementById('autoOpenVideoDescsw').checked = false;
        }
        $('#autoOpenVideoDescsw').on('click', function () {
            if (!document.getElementById('autoOpenVideoDescsw').checked) {
                document.getElementById('autoOpenVideoDescsw').checked = false;
                chrome.storage.local.set({ 'autoOpenVideoDescsw': false });
            } else {
                document.getElementById('autoOpenVideoDescsw').checked = true;
                chrome.storage.local.set({ 'autoOpenVideoDescsw': true });
            }
        });
    });

    //====================排行榜历史成就提示==================
    chrome.storage.local.get(['videoAchievement'], function (items) {
        var videoAchievement = items.videoAchievement;
        if (videoAchievement) {
            document.getElementById('videoAchievement').checked = true;
        } else {
            document.getElementById('videoAchievement').checked = false;
        }
        $('#videoAchievement').on('click', function () {
            if (!document.getElementById('videoAchievement').checked) {
                document.getElementById('videoAchievement').checked = false;
                chrome.storage.local.set({ 'videoAchievement': false });
            } else {
                document.getElementById('videoAchievement').checked = true;
                chrome.storage.local.set({ 'videoAchievement': true });
            }
        });
    });

    //====================弹幕列表增加发送用户跳转===================
    chrome.storage.local.get(['danmuSearchListToUsersw'], function (items) {
        var danmuSearchListToUsersw = items.danmuSearchListToUsersw;
        if (danmuSearchListToUsersw) {
            document.getElementById('danmuSearchListToUsersw').checked = true;
        } else {
            document.getElementById('danmuSearchListToUsersw').checked = false;
        }
        $('#danmuSearchListToUsersw').on('click', function () {
            if (!document.getElementById('danmuSearchListToUsersw').checked) {
                document.getElementById('danmuSearchListToUsersw').checked = false;
                chrome.storage.local.set({ 'danmuSearchListToUsersw': false });
            } else {
                document.getElementById('danmuSearchListToUsersw').checked = true;
                chrome.storage.local.set({ 'danmuSearchListToUsersw': true });
            }
        });
    });

    //====================展开多分P列表===================
    chrome.storage.local.get(['multiPartListSpread'], function (items) {
        var multiPartListSpread = items.multiPartListSpread;
        if (multiPartListSpread) {
            document.getElementById('multiPartListSpread').checked = true;
        } else {
            document.getElementById('multiPartListSpread').checked = false;
        }
        $('#multiPartListSpread').on('click', function () {
            if (!document.getElementById('multiPartListSpread').checked) {
                document.getElementById('multiPartListSpread').checked = false;
                chrome.storage.local.set({ 'multiPartListSpread': false });
            } else {
                document.getElementById('multiPartListSpread').checked = true;
                chrome.storage.local.set({ 'multiPartListSpread': true });
            }
        });
    });

    //====================鼠标滚动音量调整===================
    chrome.storage.local.get(['wheelToChangeVolume'], function (items) {
        var wheelToChangeVolume = items.wheelToChangeVolume;
        if (wheelToChangeVolume) {
            document.getElementById('wheelToChangeVolume').checked = true;
        } else {
            document.getElementById('wheelToChangeVolume').checked = false;
        }
        $('#wheelToChangeVolume').on('click', function () {
            if (!document.getElementById('wheelToChangeVolume').checked) {
                document.getElementById('wheelToChangeVolume').checked = false;
                chrome.storage.local.set({ 'wheelToChangeVolume': false });
            } else {
                document.getElementById('wheelToChangeVolume').checked = true;
                chrome.storage.local.set({ 'wheelToChangeVolume': true });
            }
        });
    });

    //====================配置播放器画质策略===============
    chrome.storage.local.get(['videoQualityStrategy'], function (items) {
        document.querySelector("#videoQualityStrategy").parentElement.children[1].children[1].children[items.videoQualityStrategy].click()
        var inst = new mdui.Select('#videoQualityStrategy');
        $('#videoQualityStrategy').on('close.mdui.select', function () {
            chrome.storage.local.set({ 'videoQualityStrategy': inst.value });
        });
    });

    //====================自定义ProgressBar样式=============
    $('#proBarConfSave').on('click', function () {
        chrome.storage.local.get(['ProgressBarStyle'], function (items) {
            items.ProgressBarStyle.barColor = $('#barColor').val();
            items.ProgressBarStyle.barHeight = $('#barHeight').val();
            items.ProgressBarStyle.loadedColor = $('#loadedColor').val();
            items.ProgressBarStyle.loadedHeight = $('#loadedHeight').val();
            chrome.storage.local.set({ 'ProgressBarStyle': items.ProgressBarStyle });
        });
        mdui.snackbar({ message: "已保存。", position: 'right-bottom' });
    });
    chrome.storage.local.get(['ProgressBarStyle'], function (items) {
        $('#barColor').val(items.ProgressBarStyle.barColor);
        $('#barHeight').val(items.ProgressBarStyle.barHeight);
        $('#loadedColor').val(items.ProgressBarStyle.loadedColor);
        $('#loadedHeight').val(items.ProgressBarStyle.loadedHeight);
    })

}

function globalConfigure() {
    //=======================配置导入导出================================//
    let config_downloadObj = document.getElementById('configExport');
    config_downloadObj.addEventListener('click', function createDownload() {
        options_data = chrome.storage.local.get(null, function (items) {
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

    let jsonfy_config;
    let input = document.getElementById("input_emlwX3V0aWxz_file");
    input.onchange = function () {
        var file = this.files[0];
        if (!!file) {
            var reader = new FileReader();
            reader.readAsText(file, "utf-8");
            reader.onload = function () {
                try {
                    jsonfy_config = JSON.parse(this.result);
                } catch (e) {
                    mdui.alert("文件格式不正确");
                    return;
                }
                for (i in jsonfy_config) {
                    if (i != 'AcpushList') {
                        chrome.storage.local.set({ [i]: jsonfy_config[i] });
                    }
                }
                notice("AcFun助手", "导入配置成功~");
                afterReconfigure();
            };
        }
    };

    let config_CleanObj = document.getElementById('configClean');
    config_CleanObj.addEventListener('click', function createClean() {
        let notice_this = prompt("确认清除小助手的所有配置吗？请考虑清楚哦。Y/N", '');
        if (notice_this == 'Y') {
            chrome.storage.local.clear(function () {
                //重置设置选项
                let x = sanitizeOptions({});
                optionsSave(x);
                afterReconfigure();
            });
        }
    });

    $('.Pushresult_act').on('click', function () {
        chrome.storage.local.get(['AcCookies'], function (datao) {
            let UidReg, Uid;
            $('.SyncWait1').show();
            let x = $('p.read_result')[0];
            try {
                UidReg = new RegExp('auth_key=(.*); ac_username');
                Uid = Number(UidReg.exec(datao.AcCookies)[1]);
            } catch (error) {
                Uid = null;
                mdui.alert("请先在主站登录。");
            }
            if (Uid) {
                x.innerText = DOMPurify.sanitize('[ AcFun-Uid : ' + Uid + ' ]');
                chrome.storage.local.get(null, function (items) {
                    delete items["AcpushList1"]; delete items["Mkey"]; delete items["danmakuCache"]; delete items["AcMomentCircle1"]; delete items["AcLives1"];
                    var options_data = JSON.stringify(sanitizeOptions(items));
                    let uploadData = new FormData();
                    uploadData.append("options_data", `${options_data}`);
                    // fetch('http://localhost/api/v1/acfun-helper/options/upload', { method: "POST", credentials: 'include', body: uploadData })
                    fetch('https://mini.pocketword.cn/api/acfun-helper/options/upload', { method: "POST", credentials: 'include', body: uploadData })
                        .then((res => { return res.text() }))
                        .then((res) => {
                            if (res) {
                                mdui.snackbar({
                                    message: '同步完成。',
                                    position: 'right-top',
                                    timeout: 1000,
                                });
                            }
                        })
                });
            }
            $('.SyncWait1').hide();
        });
    });

    $('.Pullresult_act').on('click', function () {
        var inst = new mdui.Dialog('#dialog');
        inst.open();
        var dialog = document.getElementById('dialog');
        dialog.addEventListener('confirm.mdui.dialog', function () {
            chrome.storage.local.get(null, function (items) {
                $('.SyncWait1').show();
                let svrCookies = {}
                svrCookies['AcCookies'] = items['AcCookies'];
                svrCookies['AcPassToken'] = items['AcPassToken'];
                svrCookies['LocalUserId'] = items['LocalUserId']
                let upCookies = new FormData();
                upCookies.set("authCookie", `${JSON.stringify(svrCookies)}`);
                // fetch('http://localhost/api/v1/acfun-helper/options/download', { method: "POST", credentials: 'include', body: upCookies })
                fetch('https://mini.pocketword.cn/api/acfun-helper/options/download', { method: "POST", credentials: 'include', body: upCookies })
                    .then((res => { return res.text() }))
                    .then((x) => {
                        try {
                            jsonfy_config = JSON.parse(x);
                        } catch (e) {
                            mdui.alert("认证信息格式不正确，请至少在主站登录并进入主站的稿件一次，或者说请不要伪造Cookie信息。");
                            return;
                        }
                        for (i in jsonfy_config) {
                            chrome.storage.local.set({ [i]: jsonfy_config[i] });
                        }
                        notice("AcFun助手", "配置同步成功~");
                        afterReconfigure();
                    });
            });
        });
    });

    //====================未读计数消息轮询===================
    chrome.storage.local.get(['fetchPushList_daemonsw'], function (items) {
        var fetchPushList_daemonsw = items.fetchPushList_daemonsw;
        if (fetchPushList_daemonsw) {
            document.getElementById('fetchPushList_daemonsw').checked = true;
        } else {
            document.getElementById('fetchPushList_daemonsw').checked = false;
        }
        $('#fetchPushList_daemonsw').on('click', function () {
            if (!document.getElementById('fetchPushList_daemonsw').checked) {
                document.getElementById('fetchPushList_daemonsw').checked = false;
                chrome.storage.local.set({ 'fetchPushList_daemonsw': false });
            } else {
                document.getElementById('fetchPushList_daemonsw').checked = true;
                chrome.storage.local.set({ 'fetchPushList_daemonsw': true });
            }
        });
    });

    //====================插件系统定时器===================
    chrome.storage.local.get(['krnl_globalTimer'], function (items) {
        var krnl_globalTimer = items.krnl_globalTimer;
        if (krnl_globalTimer) {
            document.getElementById('krnl_globalTimer').checked = true;
        } else {
            document.getElementById('krnl_globalTimer').checked = false;
        }
        $('#krnl_globalTimer').on('click', function () {
            if (!document.getElementById('krnl_globalTimer').checked) {
                document.getElementById('krnl_globalTimer').checked = false;
                chrome.storage.local.set({ 'krnl_globalTimer': false });
            } else {
                document.getElementById('krnl_globalTimer').checked = true;
                chrome.storage.local.set({ 'krnl_globalTimer': true });
            }
        });
    });

    //====================推送消息轮询===================
    chrome.storage.local.get(['timer4Unread_daemonsw'], function (items) {
        var timer4Unread_daemonsw = items.timer4Unread_daemonsw;
        if (timer4Unread_daemonsw) {
            document.getElementById('timer4Unread_daemonsw').checked = true;
        } else {
            document.getElementById('timer4Unread_daemonsw').checked = false;
        }
        $('#timer4Unread_daemonsw').on('click', function () {
            if (!document.getElementById('timer4Unread_daemonsw').checked) {
                document.getElementById('timer4Unread_daemonsw').checked = false;
                chrome.storage.local.set({ 'timer4Unread_daemonsw': false });
            } else {
                document.getElementById('timer4Unread_daemonsw').checked = true;
                chrome.storage.local.set({ 'timer4Unread_daemonsw': true });
            }
        });
    });

    //====================直播观看计时板===================
    chrome.storage.local.get(['LiveWatchTimeRec_popup'], function (items) {
        var LiveWatchTimeRec_popup = items.LiveWatchTimeRec_popup;
        if (LiveWatchTimeRec_popup) {
            document.getElementById('LiveWatchTimeRec_popup').checked = true;
        } else {
            document.getElementById('LiveWatchTimeRec_popup').checked = false;
        }
        $('#LiveWatchTimeRec_popup').on('click', function () {
            if (!document.getElementById('LiveWatchTimeRec_popup').checked) {
                document.getElementById('LiveWatchTimeRec_popup').checked = false;
                chrome.storage.local.set({ 'LiveWatchTimeRec_popup': false });
            } else {
                document.getElementById('LiveWatchTimeRec_popup').checked = true;
                chrome.storage.local.set({ 'LiveWatchTimeRec_popup': true });
            }
        });
    });

    //====================直播观看计时表===================
    chrome.storage.local.get(['krnl_videossEarly'], function (items) {
        var krnl_videossEarly = items.krnl_videossEarly;
        if (krnl_videossEarly) {
            document.getElementById('krnl_videossEarly').checked = true;
        } else {
            document.getElementById('krnl_videossEarly').checked = false;
        }
        $('#krnl_videossEarly').on('click', function () {
            if (!document.getElementById('krnl_videossEarly').checked) {
                document.getElementById('krnl_videossEarly').checked = false;
                chrome.storage.local.set({ 'krnl_videossEarly': false });
            } else {
                document.getElementById('krnl_videossEarly').checked = true;
                chrome.storage.local.set({ 'krnl_videossEarly': true });
            }
        });
    });

    //====================自定义样式===================
    chrome.storage.local.get(['custom_css'], function (items) {
        var custom_css = items.custom_css;
        $('#custom-css').on('keyup', function () {
            chrome.storage.local.set({ 'custom_css_style': $('#custom-css').val() })
        })
        if (custom_css) {
            document.getElementById('custom-css-checkbox').checked = true;
        } else {
            document.getElementById('custom-css-checkbox').checked = false;
        }

        $('#custom-css-checkbox').on('click', function () {
            if (!document.getElementById('custom-css-checkbox').checked) {
                document.getElementById('custom-css-checkbox').checked = false;
                chrome.storage.local.set({ 'custom_css': false });
            } else {
                document.getElementById('custom-css-checkbox').checked = true;
                chrome.storage.local.set({ 'custom_css': true });
            }
        });
    });
    chrome.storage.local.get(['custom_css_style'], function (items) {
        var custom_css_style = items.custom_css_style;
        $('#custom-css').val(custom_css_style);
    })

    function afterReconfigure() {
        mdui.snackbar({
            message: '配置完成，正在等待刷新。',
            position: 'right-top',
            timeout: 1000,
        });
        setTimeout(() => {
            $('.SyncWait1').hide();
            if (mention['devMode'] === false) {
                location.reload();
            }
        }, 1500);
    }

}

function Final() {
    if (myBrowser() == "Chrome") {
        document.querySelectorAll(".chromeOnly").forEach(function (e) {
            e.style.display = "block"
        })
    }
    chrome.notifications.getPermissionLevel(e => {
        if (e != "granted") {
            mdui.snackbar({
                message: `您没有允许助手的通知权限，有些功能可能不会生效。`,
                position: 'right-top',
                timeout: 5000,
            });
        }
    })
    var devSwitchClick = 0
    document.querySelector("#devSwitch").addEventListener('click', function devMode() {
        if (devSwitchClick == 5) {
            document.querySelectorAll(".devFeature").forEach(function (e) { e.style.display = "block" });
            mdui.snackbar({
                message: `已进入特殊模式。`,
                position: 'right-bottom',
            });
            mention['devMode'] = true;
        }
        devSwitchClick++;
    })
}

var mention = { devMode: false };
window.addEventListener('load', function () {
    OldUIHandler()
    indexSiteConfigure()
    contentConfigure()
    pageEnhance()
    playerConfigure()
    globalConfigure()
    Final()
})
