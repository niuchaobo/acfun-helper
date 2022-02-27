export async function playerConfigure() {
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

    //====================简单CC字幕===================
    chrome.storage.local.get(['simpleCC'], function (items) {
        var simpleCC = items.simpleCC;
        if (simpleCC) {
            document.getElementById('simpleCC').checked = true;
        } else {
            document.getElementById('simpleCC').checked = false;
        }
        $('#simpleCC').on('click', function () {
            if (!document.getElementById('simpleCC').checked) {
                document.getElementById('simpleCC').checked = false;
                chrome.storage.local.set({ 'simpleCC': false });
            } else {
                document.getElementById('simpleCC').checked = true;
                chrome.storage.local.set({ 'simpleCC': true });
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
