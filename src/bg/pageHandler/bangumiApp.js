"use strict";
function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    })(e)
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            writable: !0,
            configurable: !0
        }
    }),
    t && _setPrototypeOf(e, t)
}
function _setPrototypeOf(e, t) {
    return (_setPrototypeOf = Object.setPrototypeOf ||
    function(e, t) {
        return e.__proto__ = t,
        e
    })(e, t)
}
function _createSuper(o) {
    var n = _isNativeReflectConstruct();
    return function() {
        var e, t = _getPrototypeOf(o);
        if (n) {
            var i = _getPrototypeOf(this).constructor;
            e = Reflect.construct(t, arguments, i)
        } else e = t.apply(this, arguments);
        return _possibleConstructorReturn(this, e)
    }
}
function _possibleConstructorReturn(e, t) {
    return ! t || "object" !== _typeof(t) && "function" != typeof t ? _assertThisInitialized(e) : t
}
function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
}
function _isNativeReflectConstruct() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return ! 1;
    if (Reflect.construct.sham) return ! 1;
    if ("function" == typeof Proxy) return ! 0;
    try {
        return Date.prototype.toString.call(Reflect.construct(Date, [],
        function() {})),
        !0
    } catch(e) {
        return ! 1
    }
}
function _getPrototypeOf(e) {
    return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf: function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
    })(e)
}
function _classCallCheck(e, t) {
    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
function _defineProperties(e, t) {
    for (var i = 0; i < t.length; i++) {
        var o = t[i];
        o.enumerable = o.enumerable || !1,
        o.configurable = !0,
        "value" in o && (o.writable = !0),
        Object.defineProperty(e, o.key, o)
    }
}
function _createClass(e, t, i) {
    return t && _defineProperties(e.prototype, t),
    i && _defineProperties(e, i),
    e
} !
function() {
    window.View = window.View || {},
    _.templateSettings.variable = "data";
    var o, e, n, a, s, g = {
        controls: {},
        utils: {},
        views: {},
        data: {},
        models: {},
        templates: {},
        exports: window.View
    };
    function c(e, t, i) {
        var o = document.createElement("script");
        o.async = !!t,
        o.onload = i,
        o.src = e;
        var n = document.getElementsByTagName("script")[0];
        n.parentNode.insertBefore(o, n)
    }
    function t() {
        var t, e = location.search.substr(1),
        i = {};
        return e && e.split("&").forEach(function(e) {
            e = e.split("="),
            void 0 === (t = e[1]) && (t = !0),
            i[e[0]] = decodeURIComponent(t)
        }),
        i
    }
    function l(e, t, i, a) {
        var o = i || $,
        n = $(o.find(e)),
        s = 0;
        a = a || 0,
        $(o.find(e + " " + t)).each(function() {
            s = Math.max($(this).outerHeight(), s)
        }),
        n.each(function(e, t) {
            var i = $(t),
            o = i.outerHeight() - i.height(),
            n = s + o;
            window.innerWidth < a && (n = ""),
            o < s && i.css("min-height", n)
        })
    }
    o = [],
    g.analytics = g.analytics || {},
    g.analytics.currentFragment = null,
    g.analytics.start = function() {
        "undefined" != typeof Backbone && this.pageView(Backbone.history.fragment)
    },
    g.analytics.trigger = function(t, i) {
        o.forEach(function(e) {
            try {
                e(t, i)
            } catch(e) {
                console.error(e)
            }
        })
    },
    g.analytics.listen = function(e) {
        o.push(e)
    },
    g.analytics.pageView = function(e) {
        if ((e = e || "") !== this.currentFragment) {
            var t = g.rootPath || "";
            t && e && "/" === t[t.length - 1] && "/" === e[0] ? t += e.substr(1) : t += e,
            this.trigger("pageView", {
                url: t
            }),
            this.currentFragment = e
        }
    },
    g.analytics.videoPlay = function(e) {
        this.trigger("videoPlay", {
            videoId: e
        })
    },
    g.analytics.videoCompleted = function(e) {
        this.trigger("videoCompleted", {
            videoId: e
        })
    },
    g.analytics.completeProcess = function(e) {
        this.trigger("completeProcess", {
            title: e
        })
    },
    g.analytics.buttonClick = function(e) {
        this.trigger("buttonClick", {
            button: e
        })
    },
    function() {
        g.analytics = g.analytics || {},
        g.analytics.aria = g.analytics.aria || {};
        var i = null;
        g.analytics.aria.init = function(e) {
            i = AWTLogManager.initialize(e)
        },
        g.analytics.aria.sendEvent = function(e, t) {
            i && i.logEvent({
                name: e,
                properties: t
            })
        }
    } (),
    g.analytics = g.analytics || {},
    g.analytics.awa = g.analytics.awa || {},
    g.analytics.initAWA = function(e, t, i) {
        function o() {
            "undefined" != typeof awa && (awa.init(e), i && i(awa))
        }
        if (t) {
            g.insertMsccScript("", !0, o)
        } else o()
    },
    g.analytics.otherPageAction = function(e) {
        "undefined" != typeof awa && awa.ct.captureContentPageAction({
            behavior: awa.behavior.OTHER,
            actionType: "O",
            isManual: !0,
            content: e
        })
    },
    g.analytics.awa.download = function(e, t, i) {
        if ("undefined" != typeof awa) {
            var o = {
                behavior: i ? awa.behavior.DOWNLOADCOMMIT: awa.behavior.DOWNLOAD,
                actionType: "CL",
                contentTags: {
                    dlnm: e,
                    dlid: t
                }
            };
            awa.ct.captureContentPageAction(o)
        }
    },
    g.analytics.awa.contentPageAction = function(e, t, i) {
        if ("undefined" != typeof awa) {
            var o = {
                behavior: e,
                actionType: t,
                content: {
                    contentName: i
                }
            };
            awa.ct.captureContentPageAction(o)
        }
    },
    g.analytics.experiment = function(e) {
        "undefined" != typeof awa && awa.ct.captureContentUpdate({
            actionType: "A",
            behavior: awa.behavior.EXPERIMENTATION,
            content: JSON.stringify({}),
            pageTags: {
                expname: e.experimentName,
                expid: e.experimentId,
                variationid: e.variationId,
                expengine: e.engine,
                expstatus: e.status || "active"
            }
        })
    },
    g.analytics.videoPlayAction = function(e) {
        "undefined" != typeof awa && awa.ct.captureContentPageAction({
            actionType: "CL",
            behavior: awa.behavior.VIDEOSTART,
            content: {
                vidid: e
            }
        })
    },
    g.analytics.timerPageAction = function(e) {
        "undefined" != typeof awa && awa.ct.captureContentPageAction({
            actionType: "AT",
            behavior: awa.behavior.OTHER,
            content: e
        })
    },
    g.analytics.listen(function(e, t) {
        if ("undefined" != typeof awa) switch (e) {
        case "pageView":
            awa.ct.capturePageView({
                isAuto:
                !1
            });
            break;
        case "videoPlay":
        case "videoCompleted":
        case "socialShare":
        case "completeProcess":
            break;
        case "engagementTime":
            g.analytics.timerPageAction({
                contentId:
                "engagementTime",
                elapsedSeconds: t.elapsedTime
            })
        }
    }),
    g.analytics = g.analytics || {},
    function() {
        g.analytics = g.analytics || {};
        g.analytics.sendFloodlight = function(e) {}
    } (),
    function() {
        g.analytics = g.analytics || {};
        g.analytics.sendGeminiTag = function(e) {}
    } (),
    g.exports.setAnalyticsLogging = function(e) {
        g.settings.set("logAnalytics", !!e)
    },
    g.analytics = g.analytics || {},
    g.analytics = g.analytics || {},
    function() {
        g.analytics = g.analytics || {},
        g.analytics.aria = g.analytics.aria || {};
        var o = {};
        function e(e) {
            g.analytics.aria.sendEvent("microsoft.webbrowser.installer.insider.DownloadDropdownClick", {
                iid: o.visitId,
                channel: e
            })
        }
        var n = function() {
            g.onDownloadMenuOpen = e,
            document.getElementById("popup-build-canary") && g.controls.Popup.getInstance("popup-build-canary").on("show",
            function() {
                e(1)
            }),
            document.getElementById("popup-build-dev") && g.controls.Popup.getInstance("popup-build-dev").on("show",
            function() {
                e(2)
            }),
            document.getElementById("popup-build-beta") && g.controls.Popup.getInstance("popup-build-beta").on("show",
            function() {
                e(3)
            });
        };
        g.analytics.aria.welcomeTileClick = function(e, t, i) {
            g.analytics.aria.sendEvent("microsoft.webbrowser.installer.insider.WelcomeTileClick", {
                iid: o.visitId,
                tileId: e,
                tileIndex: t,
                isTruncated: i
            })
        },
        g.analytics.aria.welcomeTileButtonClick = function(e) {
            g.analytics.aria.sendEvent("microsoft.webbrowser.installer.insider.WelcomeTileButtonClick", {
                iid: o.visitId,
                tileId: e
            })
        },
        g.analytics.aria.welcomeTilesExpand = function() {
            g.analytics.aria.sendEvent("microsoft.webbrowser.installer.insider.WelcomeTilesExpand", {
                iid: o.visitId
            })
        },
        g.analytics.aria.welcomeTilesFilter = function(e) {
            g.analytics.aria.sendEvent("microsoft.webbrowser.installer.insider.WelcomeTilesFilter", {
                iid: o.visitId,
                filterClicked: e
            })
        }
    } (),
    g.utils.apiCall = function(t) {
        var n = jQuery.Deferred();
        if (t.$button) {
            if (t.$button.attr("disabled")) return n.reject("operation in progress"),
            n;
            t.$button.attr("disabled", !0)
        }
        function e() {
            t.$button && t.$button.attr("disabled", !1)
        }
        if (t.$error && t.$error.empty().text(""), t.confirmMessage && !confirm(t.confirmMessage)) return n.reject("user did not confirm operation"),
        e(),
        n;
        var i = t.data || {};
        t.isPost && (i._csrf = $("#csrf").val());
        function a(e) {
            t.$error && t.$error.text(e).show(),
            console.error(e)
        }
        return $.ajax({
            type: t.isPost ? "POST": "GET",
            url: t.url,
            data: JSON.stringify(i),
            contentType: "application/json"
        }).done(function(e) {
            e.success ? n.resolve(e.data) : (a(e.error), n.reject(e.error))
        }).fail(function(e, t, i) {
            var o = e.statusText || t;
            a(o),
            n.reject(o)
        }).always(e),
        n
    },
    g.utils.apiButtonAction = function(e, t, i, o) {
        return g.utils.apiCall({
            isPost: !0,
            $button: e,
            $error: t,
            url: i,
            data: o
        })
    },
    navigator.msMaxTouchPoints && $("body").addClass("touch"),
    g.utils.debounce = function(o, n, a) {
        var s;
        return function() {
            var e = this,
            t = arguments,
            i = a && !s;
            clearTimeout(s),
            s = setTimeout(function() {
                s = null,
                a || o.apply(e, t)
            },
            n),
            i && o.apply(e, t)
        }
    },
    g.utils.getLocale = function() {
        var e = location.pathname.substring(1) || "",
        t = e.indexOf("/");
        return 0 < t && (e = e.substring(0, t)),
        e
    },
    g.isMouseActive = !1,
    g.focusElements = "button, input, select, a, video, [tabindex]",
    $("body").on("mousedown touchdown pointerdown", g.focusElements,
    function(e) {
        $(e.target).hasClass("screen-read-btn") || (g.isMouseActive = !0, setTimeout(function() {
            g.isMouseActive = !1
        },
        200))
    }),
    $("body").on("focus", g.focusElements,
    function(e) {
        g.isMouseActive || (e.stopPropagation(), $(this).addClass("keyboard-focused"))
    }),
    $("body").on("blur", g.focusElements,
    function() {
        $(".keyboard-focused").removeClass("keyboard-focused")
    }),
    g.onMsccConsent = function(e) {
        "undefined" == typeof mscc || mscc.hasConsent() ? e() : mscc.on("consent", e)
    },
    g.insertMsccScript = function(e, t, i) {
        g.onMsccConsent(function() {
            c(e, t, i)
        })
    },
    window.documentWriteMsccScript = function(e, t) {
        "undefined" == typeof mscc || mscc.hasConsent() ? document.write('<script type="text/javascript" src="' + e + '"><\/script>') : mscc.on("consent",
        function() {
            c(e, t)
        })
    },
    g.getObjectPath = function(e, t) {
        if (!t) return e;
        if (!Array.isArray(t)) return e[t];
        for (var i = e,
        o = 0; o < t.length; o++) i = i && i[t[o]];
        return i
    },
    Date.now = Date.now ||
    function() {
        return + new Date
    },
    window.console || (window.console = {
        log: $.noop
    }),
    String.prototype.trim || (e = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, String.prototype.trim = function() {
        return this.replace(e, "")
    }),
    String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
        return (void 0 === t || t > this.length) && (t = this.length),
        this.substring(t - e.length, t) === e
    }),
    Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        var i;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var o = Object(this),
        n = o.length >>> 0;
        if (0 == n) return - 1;
        var a = +t || 0;
        if (Math.abs(a) === 1 / 0 && (a = 0), n <= a) return - 1;
        for (i = Math.max(0 <= a ? a: n - Math.abs(a), 0); i < n;) {
            if (i in o && o[i] === e) return i;
            i++
        }
        return - 1
    }),
    Array.prototype.forEach || (Array.prototype.forEach = function(e) {
        var t, i;
        if (null == this) throw new TypeError("this is null or not defined");
        var o = Object(this),
        n = o.length >>> 0;
        if ("function" != typeof e) throw new TypeError(e + " is not a function");
        for (1 < arguments.length && (t = arguments[1]), i = 0; i < n;) {
            var a;
            i in o && (a = o[i], e.call(t, a, i, o)),
            i++
        }
    }),
    function(e) {
        e.console || (e.console = {});
        for (var t, i, o = e.console,
        n = function() {},
        a = ["memory"], s = "assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(","); t = a.pop();) o[t] || (o[t] = {});
        for (; i = s.pop();) o[i] || (o[i] = n)
    } ("undefined" == typeof window ? this: window),
    Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
        value: function(e, t) {
            if (null == this) throw new TypeError('"this" is null or not defined');
            var i = Object(this),
            o = i.length >>> 0;
            if (0 == o) return ! 1;
            var n, a, s = 0 | t,
            c = Math.max(0 <= s ? s: o - Math.abs(s), 0);
            for (; c < o;) {
                if ((n = i[c]) === (a = e) || "number" == typeof n && "number" == typeof a && isNaN(n) && isNaN(a)) return ! 0;
                c++
            }
            return ! 1
        }
    }),
    g.utils.addQueryString = function(e, t, i) {
        return i && (e += -1 === e.indexOf("?") ? "?": "&", e += t + "=" + encodeURIComponent(i)),
        e
    },
    g.querystring = t(),
    g.getQuerystringValues = g.exports.getQuerystringValues = t,
    function() {
        var i = !1;
        try {
            i = !!window.localStorage
        } catch(e) {}
        g.settings = {
            get: function(e) {
                return i ? localStorage.getItem(e) : null
            },
            set: function(e, t) {
                i && (null === t ? localStorage.removeItem(e) : localStorage.setItem(e, t.toString()))
            },
            remove: function(e) {
                i && localStorage.removeItem(e)
            },
            getBoolOrDefault: function(e, t) {
                var i = this.get(e);
                return null === i ? t: "true" === i
            },
            getIntOrDefault: function(e, t) {
                var i = this.get(e);
                return null === i ? t: parseInt(i, 10)
            },
            getFloatOrDefault: function(e, t) {
                var i = this.get(e);
                return null === i ? t: parseFloat(i)
            }
        }
    } (),
    g.utils.smoothScroll = function(i) {
        $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(e) {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var t = $(this.hash); (t = t.length ? t: $("[name=" + this.hash.slice(1) + "]")).length && (e.preventDefault(), $("html, body").animate({
                    scrollTop: t.offset().top
                },
                400,
                function() {
                    if (i) {
                        var e = $(t);
                        if (e.focus(), e.is(":focus")) return ! 1;
                        e.attr("tabindex", "-1"),
                        e.focus()
                    }
                }))
            }
        })
    },
    g.utils.spacenator = function(e) {
        for (var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "&nbsp;", i = document.querySelectorAll(e), o = 0; o < i.length; o++) {
            var n = i[o],
            a = n.innerHTML.trim(),
            s = a.lastIndexOf(" ");
            0 < s && n.children && 0 === n.children.length && (n.innerHTML = a.slice(0, s) + t + a.slice(s + 1))
        }
    },
    n = [],
    a = null,
    s = function() {
        $.each(n,
        function(e, t) {
            l(t.outerSelector, t.innerSelector, t.$parent, t.minEnabledWidth)
        })
    },
    g.utils.syncHeight = l,
    g.utils.syncHeightOnResize = function(e, t, i, o) {
        n.push({
            outerSelector: e,
            innerSelector: t,
            $parent: i,
            minEnabledWidth: o
        }),
        a || (a = g.utils.debounce(s, 50), $(window).on("resize", a)),
        setTimeout(function() {
            l(e, t, i, o)
        },
        0)
    },
    g.exports.basicPage = function(e) {
        g.analytics.aria.initPage(e.aria)
    },
    g.exports.homePage = function(e) {
        g.controls.initEulaPopup({
            consentCheckDefault: e.consentCheckDefault
        }),
        g.analytics.aria.initPage(e.aria)
    };
    var r, d = function(t, i) {
        var e, o;
        if (void 0 !== document.hidden ? (e = "hidden", o = "visibilitychange") : void 0 !== document.msHidden ? (e = "msHidden", o = "msvisibilitychange") : void 0 !== document.webkitHidden && (e = "webkitHidden", o = "webkitvisibilitychange"), void 0 !== document.addEventListener && void 0 !== e) {
            var n = !1,
            a = !1,
            s = 0,
            c = 0,
            l = function() {
                a = document[e] ? (!n && c && (s += Date.now() - c), !1) : (c = Date.now(), !0)
            };
            document.addEventListener(o, l, !1),
            l();
            var r = setInterval(function() {
                var e = Date.now();
                a && (s += e - c, c = e),
                t <= s && (clearInterval(r), n = !0, i())
            },
            500)
        } else setTimeout(i, t)
    };
    g.exports.renderPage = function(e) {
        new g.controls.TipCollection(e.tips, 4)
    },
    r = {
        title: "",
        downloadUrl: "",
        imageUrl: ""
    };
    var i = function() {
        function e() {
            _classCallCheck(this, e),
            this.events = {}
        }
        return _createClass(e, [{
            key: "on",
            value: function(e, t) {
                this.events[e] = this.events[e] || [],
                this.events[e].push(t)
            }
        },
        {
            key: "off",
            value: function(e, t) {
                if (this.events[e]) if (t) {
                    for (var i = 0; i < this.events[e].length; i++) if (this.events[e][i] === t) {
                        this.events[e].splice(i, 1);
                        break
                    }
                } else this.events[e] = []
            }
        },
        {
            key: "emit",
            value: function(e, t, i) {
                this.events[e] && this.events[e].forEach(function(e) {
                    e.call(t, i)
                })
            }
        }]),
        e
    } ();
    g.controls.EventEmitter = i
    var u, p, f, m, h, y, w, b, F = function() {
        _inherits(s, g.controls.EventEmitter);
        var i = _createSuper(s);
        function s(e) {
            var t;
            if (_classCallCheck(this, s), t = i.call(this), s.popups || (s.popups = {}), !e) throw 'Missing required parameter "el".';
            if (!e.id) throw "Popup elements must have an id.";
            if (s.popups[e.id]) throw "Multiple Popup instances per element not supported. Use Popup.getInstance(el).";
            return s.popups[e.id] = _assertThisInitialized(t),
            t.el = e,
            t.$el = $(e),
            t.$el.on("click", ".popup-close", s.hideAll),
            t.mode = t.$el.attr("data-popup-mode"),
            t
        }
        return _createClass(s, [{
            key: "show",
            value: function(e, t) {
                this.trigger = this.returnFocus = e,
                this.emit("prepareshow", this, s.createEventArgs(this, t)),
                s.hideAll(t);
                var i = this.$el,
                o = s.getOverlay();
                o.addClass(i.attr("data-popup-overlay")),
                $(i.attr("data-popup-blur")).addClass("popup-blur"),
                "true" === (i.attr("data-popup-noscroll") + "").toLowerCase() && s.toggleScroll(!1),
                "static" === this.mode ? o.insertBefore(i) : (this.$container = $("<div />").addClass("popup-container"), this.updateLayout(), this.$container.append(i).appendTo($("body")), o.insertBefore(this.$container)),
                o.addClass("popup-show"),
                i.addClass("popup-show"),
                $(e).addClass("popup-showing");
                var n = this.getFocusables(!0),
                a = n.filter('[data-focus-first="true"]');
                0 < a.length ? a.focus() : n.first().focus(),
                $(document).on("keydown", $.proxy(this.onKeyDown, this)),
                this.emit("show", this, s.createEventArgs(this, t))
            }
        },
        {
            key: "isOpen",
            value: function() {
                return $(this.el).hasClass("popup-show")
            }
        },
        {
            key: "updateLayout",
            value: function() {
                if (this.trigger) {
                    var e = $(this.trigger);
                    this.$container.css({
                        top: e.offset().top,
                        left: e.offset().left,
                        width: e.outerWidth(),
                        height: e.outerHeight()
                    })
                }
            }
        },
        {
            key: "getFocusables",
            value: function(e) {
                return this.$focusables && !e || (this.$focusables = this.$el.find(g.focusElements).filter(":visible").sort(function(e, t) {
                    return e.tabIndex === t.tabIndex ? 0 : e.tabIndex > t.tabIndex ? 1 : -1
                })),
                this.$focusables
            }
        },
        {
            key: "onKeyDown",
            value: function(e) {
                if (27 === e.which && s.hideAll(e), 9 === e.which) {
                    var t = this.$focusables.first(),
                    i = this.$focusables.last();
                    e.shiftKey && t.is(e.target) ? (e.preventDefault(), i.focus()) : !e.shiftKey && i.is(e.target) && (e.preventDefault(), t.focus())
                }
            }
        }], [{
            key: "getInstance",
            value: function(e) {
                var t = "string" == typeof e ? document.getElementById(e) : e;
                return t ? s.popups && s.popups[t.id] ? s.popups[t.id] : new s(t) : null
            }
        },
        {
            key: "createEventArgs",
            value: function(e, t) {
                return {
                    popup: e,
                    currentTarget: t ? t.currentTarget: null,
                    originalEvent: t
                }
            }
        },
        {
            key: "hideAll",
            value: function(i) {
                var o = this;
                $.each(s.popups,
                function(e, t) {
                    t.isOpen() && (t.returnFocus && t.returnFocus.focus(), t.emit("hide", t, s.createEventArgs(t, i)), "static" !== t.mode && t.$el.appendTo($("body"))),
                    $(document).off("keydown", $.proxy(t.onKeyDown, o))
                }),
                $(".popup, .popup-overlay").removeClass("popup-show"),
                $(".popup-container").remove(),
                $(".popup-showing").removeClass("popup-showing"),
                $(".popup-blur").removeClass("popup-blur"),
                $(".popup-overlay").removeClass().addClass("popup-overlay"),
                s.toggleScroll(!0)
            }
        },
        {
            key: "getOverlay",
            value: function() {
                return s.$overlay || (s.$overlay = $('<div class="popup-overlay" />'), s.$overlay.appendTo($("body")), s.$overlay.on("click", s.hideAll)),
                s.$overlay
            }
        },
        {
            key: "toggleScroll",
            value: function(e) {
                if (e) $("body").removeClass("popup-noscroll").css({
                    paddingRight: ""
                });
                else {
                    var t = window.innerWidth - document.documentElement.clientWidth,
                    i = window.scrollY;
                    $("body").addClass("popup-noscroll").css({
                        paddingRight: t
                    }),
                    setTimeout(function() {
                        return $("window").scrollTop(i)
                    })
                }
            }
        },
        {
            key: "initHandlers",
            value: function() {
                $("[data-popup]").off(),
                $("[data-popup]").on("click",
                function(e) {
                    var t = s.getInstance($(this).attr("data-popup"));
                    t && t.show(e.currentTarget, e)
                })
            }
        }]),
        s
    } ();
    function C(e, t, i) {
        var o = e.text();
        o = o.replace(/(\s+)(,|\.)(\s+)/gm, "$2 "),
        h = h ||
        function(e) {
            var t = e.cloneNode();
            t.innerHTML = "<br>",
            e.appendChild(t);
            var i = t.offsetHeight;
            t.innerHTML = "M<br>M";
            var o = t.offsetHeight;
            return e.removeChild(t),
            o - i
        } (e.get(0));
        var n = Math.min(5, Math.round(i / h));
        t.css({
            maxHeight: n * h + 1
        }),
        t.addClass("tip-desc-lines-" + n),
        t.text(o)
    }
    g.controls.Popup = F,
    "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function(e, t) {
            if (null == e) throw new TypeError("Cannot convert undefined or null to object");
            for (var i = Object(e), o = 1; o < arguments.length; o++) {
                var n = arguments[o];
                if (null != n) for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (i[a] = n[a])
            }
            return i
        },
        writable: !0,
        configurable: !0
    }),
    u = {},
    p = function() {
        function o() {
            _classCallCheck(this, o)
        }
        return _createClass(o, null, [{
            key: "init",
            value: function(e) {
                o.elements = [],
                o.frames = 0,
                o.framesRAF = 0,
                o.options = Object.assign({},
                u, e),
                window.addEventListener("resize", o._onResize),
                window.addEventListener("scroll", o._onScroll),
                o._isInitialized = !0
            }
        },
        {
            key: "watch",
            value: function(e, t) {
                o._isInitialized || o.init();
                var i = new g.controls.ScrollWatcherElement(e, t);
                return o.elements.push(i),
                i
            }
        },
        {
            key: "removeWatch",
            value: function(e) {
                var t = this.elements.indexOf(e);
                this.elements = this.elements.slice(0, t).concat(this.elements.slice(t + 1, this.elements.length))
            }
        },
        {
            key: "_onResize",
            value: function() {
                o.elements.forEach(function(e) {
                    e.updatePosition()
                })
            }
        },
        {
            key: "_onScroll",
            value: function() {
                for (var e = window.scrollY,
                t = 0; t < o.elements.length; t++) o.elements[t].updateProgress(e)
            }
        }]),
        o
    } (),
    window.jQuery && window.jQuery.fn && (window.jQuery.fn.ScrollWatcher = function(i) {
        return this.each(function(e, t) {
            p.watch(t, i)
        }),
        this
    }),
    g.controls.ScrollWatcher = p,
    f = {
        viewportStart: 0,
        viewportHeight: 1,
        progressMode: "traverse",
        onScroll: null,
        onProgress: null,
        onEnter: null,
        onEnterFromAbove: null,
        onEnterFromBelow: null,
        onExit: null,
        onExitToAbove: null,
        onExitToBelow: null,
        onEnterOrExit: null
    },
    m = function() {
        function i(e, t) {
            _classCallCheck(this, i),
            Object.assign(this, f, t),
            this.element = e,
            this.isFirstUpdate = !0,
            this.frameCount = 0,
            this.calc = {
                element: e,
                viewport: {}
            },
            this.updatePosition(),
            this.updateProgress(window.scrollY)
        }
        return _createClass(i, [{
            key: "updatePosition",
            value: function() {
                this.calc.windowHeight = window.innerHeight,
                this.calc.viewport.top = this.calc.windowHeight * this.viewportStart,
                this.calc.viewport.height = this.calc.windowHeight * this.viewportHeight,
                this.calc.viewport.bottom = this.calc.viewport.top + this.calc.viewport.height;
                var e = this.element.getBoundingClientRect();
                this.calc.elementRect = {
                    top: e.top + window.scrollY,
                    bottom: e.top + e.height + window.scrollY,
                    height: e.height
                },
                "overlap" === this.progressMode ? this.calc.elementRect.height <= this.calc.viewport.height ? (this.calc.progressBegin = Math.round(this.calc.elementRect.bottom - this.calc.viewport.bottom), this.calc.progressDuration = Math.round(this.calc.viewport.height - this.calc.elementRect.height)) : (this.calc.progressBegin = Math.round(this.calc.elementRect.top - this.calc.viewport.top), this.calc.progressDuration = Math.round(this.calc.elementRect.height - this.calc.viewport.height)) : (this.calc.progressBegin = Math.round(this.calc.elementRect.top - this.calc.viewport.bottom), this.calc.progressDuration = Math.round(this.calc.viewport.height + this.calc.elementRect.height)),
                this.calc.progressEnd = this.calc.progressBegin + this.calc.progressDuration
            }
        },
        {
            key: "updateProgress",
            value: function(e) {
                this.calc.wasInViewport = this.calc.isInViewport,
                this.calc.wasAboveViewport = this.calc.isAboveViewport,
                this.calc.wasBelowViewport = this.calc.isBelowViewport,
                this.calc.lastScrollTop = this.calc.currentScrollTop ? this.calc.currentScrollTop: e,
                this.calc.currentScrollTop = e,
                this.calc.scrollDelta = e - this.calc.lastScrollTop,
                this.calc.actualProgress = (e - this.calc.progressBegin) / this.calc.progressDuration,
                this.calc.progress = Math.max(0, Math.min(1, this.calc.actualProgress)),
                this.calc.isAboveViewport = 1 < this.calc.actualProgress,
                this.calc.isBelowViewport = this.calc.actualProgress < 0,
                this.calc.isInViewport = 0 < this.calc.actualProgress && this.calc.actualProgress <= 1,
                this.onScroll && this.onScroll(this.calc),
                (this.calc.isInViewport || this.calc.wasInViewport) && this.onProgress && this.onProgress(this.calc),
                (!this.calc.wasInViewport && this.calc.isInViewport || this.calc.wasAboveViewport && !this.calc.isAboveViewport || this.calc.wasBelowViewport && !this.calc.isBelowViewport) && (this.onEnter && this.onEnter(this.calc), this.onEnterOrExit && this.onEnterOrExit(this.calc), this.calc.wasBelowViewport && !this.calc.isBelowViewport && this.onEnterFromBelow && this.onEnterFromBelow(this.calc), this.calc.wasAboveViewport && !this.calc.isAboveViewport && this.onEnterFromAbove && this.onEnterFromAbove(this.calc)),
                (this.calc.wasInViewport && !this.calc.isInViewport || this.isFirstUpdate && this.calc.isAboveViewport) && (this.onExit && this.onExit(this.calc), this.onEnterOrExit && this.onEnterOrExit(this.calc), this.calc.isAboveViewport && this.onExitToAbove && this.onExitToAbove(this.calc), this.calc.isBelowViewport && this.onExitToBelow && this.onExitToBelow(this.calc)),
                this.isFirstUpdate = !1
            }
        }]),
        i
    } (),
    g.controls.ScrollWatcherElement = m,
    y = null,
    w = function() {
        function r(e) {
            var n = this,
            t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            i = t.autoExpand,
            o = void 0 === i || i,
            a = t.layout,
            s = void 0 === a || a,
            c = t.onTipReady,
            l = void 0 === c ? null: c;
            _classCallCheck(this, r),
            this.data = e,
            y = y || _.template(document.getElementById("template-tip-card").innerHTML),
            this.$el = $(y(this.data)),
            this.$el.on("click", ".tip-action",
            function(e) {
                var t = n.data.id;
                g.analytics.aria.welcomeTileButtonClick(t)
            }),
            this.thisCloseIfNotFocused = this.closeIfNotFocused.bind(this),
            this.events = $({}),
            o && this.$el.on("click focusin", g.utils.debounce(function(e) {
                var t = !1,
                i = function() {
                    if (window.getSelection) {
                        var e = window.getSelection(),
                        t = e.toString();
                        if (t && t.length && 0 < e.rangeCount) return e.getRangeAt(0).startContainer.parentNode
                    }
                    return null
                } ();
                if (i) {
                    var o = $(i).closest(".snap-tip-card");
                    t = o.length && o[0] === n.$el[0]
                }
                t || ("focusin" === e.type ? n.toggleCard(!0) : n.toggleCard())
            },
            300, !0)),
            s && setTimeout(function() {
                return n.updateLayout()
            },
            100),
            this.onTipReady = l
        }
        return _createClass(r, [{
            key: "updateLayout",
            value: function() {
                var e = this,
                t = this.$el.find(".tip");
                this.collapseCard(),
                this.$el.removeClass("tips-layout-ready tip-ready"),
                t.removeClass("tip-has-more"),
                t.css("height", "");
                var i = this.$el.find(".tip-outer").height(),
                o = t.height();
                t.attr("data-height", o),
                t.height(o);
                var n = i < o;
                if (t.toggleClass("tip-has-more", n), t.css("height", ""), this.$el.addClass("tips-layout-ready"), t.hasClass("tip-has-more")) {
                    var a = t.find(".tip-desc-full div"),
                    s = t.find(".tip-desc-summary"),
                    c = t.find(".tip-desc").outerHeight();
                    a.find('a:not([target="_blank"])').each(function() {
                        $(this).attr("target", "_blank")
                    }),
                    C(a, s, c)
                } else t.find("tip-desc-summary").remove();
                setTimeout(function() {
                    e.$el.addClass("tip-ready"),
                    e.onTipReady && e.onTipReady(e)
                },
                100)
            }
        },
        {
            key: "isExpanded",
            value: function() {
                return this.$el.hasClass("tip-expanded")
            }
        },
        {
            key: "toggleCard",
            value: function(e) {
                e || !this.isExpanded() ? this.expandCard() : this.collapseCard()
            }
        },
        {
            key: "expandCard",
            value: function() {
                var t = this;
                if (!this.isExpanded()) {
                    this.$el.get(0).setAttribute("aria-expanded", "true"),
                    this.$el.find(".tip-desc-summary").get(0).setAttribute("aria-hidden", "true"),
                    this.$el.find(".tip-desc-full").attr("aria-hidden", "false").find("a").attr("tabindex", "0");
                    var e = this.$el.find(".tip"),
                    i = e.hasClass("tip-has-more"),
                    o = e.closest(".snap-tip-card").index(),
                    n = this.data.id;
                    g.analytics.aria.welcomeTileClick(n, o, i),
                    this.events.trigger("expanded"),
                    e.css({
                        height: parseInt(e.attr("data-height"))
                    }),
                    this.$el.addClass("tip-expanded"),
                    this.video = this.$el.find(".tip-media video").get(0),
                    g.utils.isMobile() && setTimeout(function() {
                        var e = t.$el.offset().top;
                        $("html, body").animate({
                            scrollTop: e
                        },
                        400)
                    },
                    400),
                    this.video && (this.video.currentTime = 0, this.video.play()),
                    $(window).on("click", this.thisCloseIfNotFocused),
                    $(window).on("focus", this.thisCloseIfNotFocused)
                }
            }
        },
        {
            key: "collapseCard",
            value: function() {
                this.$el.get(0).setAttribute("aria-expanded", "false"),
                this.$el.find(".tip-desc-summary").get(0).setAttribute("aria-hidden", "false"),
                this.$el.find(".tip-desc-full").attr("aria-hidden", "true").find("a").attr("tabindex", -1),
                this.$el.removeClass("tip-expanded"),
                this.$el.find(".tip").css({
                    height: ""
                }),
                this.video && (this.video.pause(), this.video = null),
                $(".tips-mobile-popup").hide().empty(),
                $(window).off("click", this.thisCloseIfNotFocused),
                $(window).off("focus", this.thisCloseIfNotFocused),
                this.events.trigger("collapsed")
            }
        },
        {
            key: "closeIfNotFocused",
            value: function(e) {
                this.$el.has(e.originalEvent.target).length || this.collapseCard()
            }
        },
        {
            key: "on",
            value: function() {
                this.events.on.apply(this.events, arguments)
            }
        },
        {
            key: "off",
            value: function() {
                this.events.off.apply(this.events, arguments)
            }
        }]),
        r
    } (),
    g.controls.TipCard = w,
    b = function() {
        function r(e, t) {
            var n = this,
            i = t.initialFilter,
            o = void 0 === i ? null: i,
            a = t.onFilterChange,
            s = void 0 === a ? null: a;
            _classCallCheck(this, r),
            this.tips = e,
            this.onFilterChange = s,
            this.cards = [],
            this.expandedCard = null,
            this.$tipsContainer = $(".tips-container").empty(),
            this.isMobile = g.utils.isMobile();
            var c = 9999;
            this.tips.forEach(function(e) {
                e.z = c--,
                e.description = e.description.replace(/(\s+)(,|\.)(\s+)/gm, "$2 ");
                var t = new g.controls.TipCard(e);
                t.on("expanded",
                function() {
                    n.clearSelection(),
                    n.expandedCard = t,
                    $(".tips-container").addClass("has-tip-expanded")
                }),
                n.cards.push(t),
                o && t.$el.addClass("tip-prefilter"),
                t.$el.appendTo(n.$tipsContainer)
            }),
            o && this.filterCards(o),
            this.tips.filter(function(e) {
                return e.isNew
            }).length || $('.tip-filter[data-categoryid="new"]').hide();
            var l = $(".tip-filter").on("click",
            function(e) {
                var t = $(e.currentTarget),
                i = t.hasClass("selected");
                l.attr("aria-selected", "false"),
                t.attr("aria-selected", "true"),
                l.removeClass("selected"),
                t.addClass("selected");
                var o = t.data("categoryid");
                i || g.analytics.aria.welcomeTilesFilter(o),
                n.filterCards(function(e) {
                    if ("all" === o) return ! 0;
                    if ("new" === o) return !! $(e).data("isnew");
                    var t = $(e).data("categoryid");
                    return "all" === o || o === t
                })
            });
            $(window).on("resize", this.onResize.bind(this))
        }
        return _createClass(r, [{
            key: "clearSelection",
            value: function() {
                this.expandedCard && (this.expandedCard.collapseCard(), this.expandedCard = null)
            }
        },
        {
            key: "hideAll",
            value: function() {
                $(".snap-tip-card").removeClass("tip-delay-0 tip-delay-1 tip-delay-2"),
                $(".tips-container").addClass("hide-all")
            }
        },
        {
            key: "filterCards",
            value: function(n) {
                this.clearSelection(),
                this.hideAll();
                var a = Math.floor($(".tips-container").outerWidth() / $(".snap-item").outerWidth()),
                s = 0;
                this.onFilterChange && this.onFilterChange(n),
                setTimeout(function() {
                    $(".snap-tip-card").each(function(e, t) {
                        var i = n(t);
                        if ($(t).toggle( !! i), $(t).removeClass("tip-prefilter"), i) {
                            var o = Math.floor(s / a);
                            o < 3 && $(t).addClass("tip-delay-" + o),
                            s++
                        }
                    }),
                    $(".tips-container").removeClass("hide-all")
                },
                400)
            }
        },
        {
            key: "onResize",
            value: function() {
                var e = this;
                this.isMobile !== g.utils.isMobile() && (this.isMobile = g.utils.isMobile(), this.$tipsContainer.css({
                    opacity: 0
                }), this.cards.forEach(function(e) {
                    e.updateLayout()
                }), setTimeout(function() {
                    e.$tipsContainer.css({
                        opacity: 1
                    })
                },
                500))
            }
        }]),
        r
    } (),
    g.controls.TipCollection = b;
    var x = g.clientDetectedPlatform = null;
    try {
        x = JSON.parse(window.external.getHostEnvironmentValue("os-sku"))["os-sku"]
    } catch(e) {}
    "189" === x || 189 === x ? g.clientDetectedPlatform = "win10x": "135" !== x && 135 !== x || (g.clientDetectedPlatform = "hololens"),
    !g.querystring.platform && g.clientDetectedPlatform && (window.location.href = g.utils.addQueryString(window.location.href, "platform", g.clientDetectedPlatform));
    var k = g.utils.getLocale();
    function E(e) {
        var t = e.split("/");
        return 2 < t.length ? t[2] : e
    }
    g.utils.spacenator(".spacenator"),
    g.utils.isMobile = function() {
        return window.innerWidth <= 540
    }
} ();