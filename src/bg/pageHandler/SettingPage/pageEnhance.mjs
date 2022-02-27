export async function pageEnhance() {
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

    chrome.storage.local.get(['userBatchManage'], function (items) {
        var userBatchManage = items.userBatchManage;
        if (userBatchManage) {
            document.getElementById('userBatchManage').checked = true;
        } else {
            document.getElementById('userBatchManage').checked = false;
        }
        $('#userBatchManage').on('click', function () {
            if (!document.getElementById('userBatchManage').checked) {
                document.getElementById('userBatchManage').checked = false;
                chrome.storage.local.set({ 'userBatchManage': false });
            } else {
                document.getElementById('userBatchManage').checked = true;
                chrome.storage.local.set({ 'userBatchManage': true });
            }
        });
    });

}
