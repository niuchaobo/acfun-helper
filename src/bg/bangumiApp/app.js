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
    g.countries = [{
        code: "af",
        email: "opt-in"
    },
    {
        code: "ax",
        email: "opt-in"
    },
    {
        code: "al",
        email: "opt-in"
    },
    {
        code: "dz",
        email: "opt-out"
    },
    {
        code: "as",
        email: "opt-in"
    },
    {
        code: "ad",
        email: "opt-in"
    },
    {
        code: "ao",
        email: "opt-in"
    },
    {
        code: "ai",
        email: "opt-in"
    },
    {
        code: "aq",
        email: "opt-in"
    },
    {
        code: "ag",
        email: "opt-in"
    },
    {
        code: "ar",
        email: "opt-in"
    },
    {
        code: "am",
        email: "opt-in"
    },
    {
        code: "aw",
        email: "opt-in"
    },
    {
        code: "au",
        email: "opt-in"
    },
    {
        code: "at",
        email: "double opt-in"
    },
    {
        code: "az",
        email: "opt-in"
    },
    {
        code: "bs",
        email: "opt-in"
    },
    {
        code: "bh",
        email: "notice"
    },
    {
        code: "bd",
        email: "opt-in"
    },
    {
        code: "bb",
        email: "opt-in"
    },
    {
        code: "by",
        email: "opt-in"
    },
    {
        code: "be",
        email: "opt-in"
    },
    {
        code: "bz",
        email: "opt-in"
    },
    {
        code: "bj",
        email: "opt-in"
    },
    {
        code: "bm",
        email: "opt-in"
    },
    {
        code: "bt",
        email: "opt-in"
    },
    {
        code: "bo",
        email: "notice"
    },
    {
        code: "bq",
        email: "opt-in"
    },
    {
        code: "ba",
        email: "opt-in"
    },
    {
        code: "bw",
        email: "notice"
    },
    {
        code: "bv",
        email: "opt-in"
    },
    {
        code: "br",
        email: "notice"
    },
    {
        code: "io",
        email: "opt-in"
    },
    {
        code: "vg",
        email: "opt-in"
    },
    {
        code: "bn",
        email: "opt-in"
    },
    {
        code: "bg",
        email: "opt-in"
    },
    {
        code: "bf",
        email: "opt-in"
    },
    {
        code: "bi",
        email: "notice"
    },
    {
        code: "cv",
        email: "opt-in"
    },
    {
        code: "kh",
        email: "opt-in"
    },
    {
        code: "cm",
        email: "notice"
    },
    {
        code: "ca",
        email: "opt-in"
    },
    {
        code: "ky",
        email: "opt-in"
    },
    {
        code: "cf",
        email: "notice"
    },
    {
        code: "td",
        email: "notice"
    },
    {
        code: "cl",
        email: "opt-out"
    },
    {
        code: "cn",
        email: "opt-out"
    },
    {
        code: "cx",
        email: "opt-in"
    },
    {
        code: "cc",
        email: "opt-in"
    },
    {
        code: "co",
        email: "opt-in"
    },
    {
        code: "km",
        email: "opt-in"
    },
    {
        code: "cg",
        email: "opt-out"
    },
    {
        code: "cd",
        email: "notice"
    },
    {
        code: "ck",
        email: "opt-in"
    },
    {
        code: "cr",
        email: "opt-in"
    },
    {
        code: "ci",
        email: "notice"
    },
    {
        code: "hr",
        email: "opt-in"
    },
    {
        code: "cu",
        email: "opt-in"
    },
    {
        code: "cw",
        email: "opt-in"
    },
    {
        code: "cy",
        email: "opt-in"
    },
    {
        code: "cz",
        email: "opt-out"
    },
    {
        code: "dk",
        email: "opt-in"
    },
    {
        code: "dj",
        email: "opt-in"
    },
    {
        code: "dm",
        email: "opt-in"
    },
    {
        code: "do",
        email: "notice"
    },
    {
        code: "ec",
        email: "notice"
    },
    {
        code: "eg",
        email: "opt-out"
    },
    {
        code: "sv",
        email: "notice"
    },
    {
        code: "gq",
        email: "notice"
    },
    {
        code: "er",
        email: "notice"
    },
    {
        code: "ee",
        email: "opt-in"
    },
    {
        code: "sz",
        email: "opt-out"
    },
    {
        code: "et",
        email: "opt-out"
    },
    {
        code: "fk",
        email: "opt-in"
    },
    {
        code: "fo",
        email: "opt-in"
    },
    {
        code: "fj",
        email: "opt-in"
    },
    {
        code: "fi",
        email: "opt-in"
    },
    {
        code: "fr",
        email: "opt-in"
    },
    {
        code: "gf",
        email: "opt-in"
    },
    {
        code: "pf",
        email: "opt-in"
    },
    {
        code: "tf",
        email: "opt-in"
    },
    {
        code: "ga",
        email: "notice"
    },
    {
        code: "gm",
        email: "notice"
    },
    {
        code: "ge",
        email: "opt-in"
    },
    {
        code: "de",
        email: "double opt-in"
    },
    {
        code: "gh",
        email: "opt-in"
    },
    {
        code: "gi",
        email: "opt-in"
    },
    {
        code: "gr",
        email: "double opt-in"
    },
    {
        code: "gl",
        email: "opt-in"
    },
    {
        code: "gd",
        email: "opt-in"
    },
    {
        code: "gp",
        email: "opt-in"
    },
    {
        code: "gu",
        email: "opt-in"
    },
    {
        code: "gt",
        email: "opt-out"
    },
    {
        code: "gg",
        email: "opt-in"
    },
    {
        code: "gn",
        email: "notice"
    },
    {
        code: "gw",
        email: "opt-out"
    },
    {
        code: "gy",
        email: "opt-in"
    },
    {
        code: "ht",
        email: "opt-in"
    },
    {
        code: "hm",
        email: "opt-in"
    },
    {
        code: "hn",
        email: "notice"
    },
    {
        code: "hk",
        email: "opt-out"
    },
    {
        code: "hu",
        email: "opt-in"
    },
    {
        code: "is",
        email: "opt-in"
    },
    {
        code: "in",
        email: "notice"
    },
    {
        code: "id",
        email: "opt-out"
    },
    {
        code: "ir",
        email: "opt-out"
    },
    {
        code: "iq",
        email: "opt-out"
    },
    {
        code: "ie",
        email: "opt-in"
    },
    {
        code: "im",
        email: "opt-in"
    },
    {
        code: "il",
        email: "opt-in"
    },
    {
        code: "it",
        email: "opt-in"
    },
    {
        code: "jm",
        email: "notice"
    },
    {
        code: "xj",
        email: "opt-in"
    },
    {
        code: "jp",
        email: "opt-in"
    },
    {
        code: "je",
        email: "opt-in"
    },
    {
        code: "jo",
        email: "opt-out"
    },
    {
        code: "kz",
        email: "opt-out"
    },
    {
        code: "ke",
        email: "notice"
    },
    {
        code: "ki",
        email: "opt-in"
    },
    {
        code: "kr",
        email: "opt-in"
    },
    {
        code: "xk",
        email: "opt-in"
    },
    {
        code: "kw",
        email: "opt-in"
    },
    {
        code: "kg",
        email: "opt-in"
    },
    {
        code: "la",
        email: "opt-in"
    },
    {
        code: "lv",
        email: "opt-in"
    },
    {
        code: "lb",
        email: "opt-out"
    },
    {
        code: "ls",
        email: "notice"
    },
    {
        code: "lr",
        email: "opt-out"
    },
    {
        code: "ly",
        email: "notice"
    },
    {
        code: "li",
        email: "opt-in"
    },
    {
        code: "lt",
        email: "opt-in"
    },
    {
        code: "lu",
        email: "opt-in"
    },
    {
        code: "mo",
        email: "notice"
    },
    {
        code: "mk",
        email: "opt-out"
    },
    {
        code: "mg",
        email: "opt-in"
    },
    {
        code: "mw",
        email: "notice"
    },
    {
        code: "my",
        email: "opt-in"
    },
    {
        code: "mv",
        email: "opt-in"
    },
    {
        code: "ml",
        email: "notice"
    },
    {
        code: "mt",
        email: "opt-in"
    },
    {
        code: "mh",
        email: "opt-in"
    },
    {
        code: "mq",
        email: "opt-in"
    },
    {
        code: "mr",
        email: "notice"
    },
    {
        code: "mu",
        email: "opt-in"
    },
    {
        code: "yt",
        email: "opt-in"
    },
    {
        code: "mx",
        email: "opt-out"
    },
    {
        code: "fm",
        email: "opt-in"
    },
    {
        code: "md",
        email: "opt-in"
    },
    {
        code: "mc",
        email: "opt-in"
    },
    {
        code: "mn",
        email: "opt-in"
    },
    {
        code: "me",
        email: "opt-in"
    },
    {
        code: "ms",
        email: "opt-in"
    },
    {
        code: "ma",
        email: "opt-in"
    },
    {
        code: "mz",
        email: "opt-in"
    },
    {
        code: "mm",
        email: "opt-in"
    },
    {
        code: "na",
        email: "opt-out"
    },
    {
        code: "nr",
        email: "opt-in"
    },
    {
        code: "np",
        email: "opt-in"
    },
    {
        code: "nl",
        email: "opt-in"
    },
    {
        code: "nc",
        email: "opt-in"
    },
    {
        code: "nz",
        email: "opt-in"
    },
    {
        code: "ni",
        email: "opt-in"
    },
    {
        code: "ne",
        email: "notice"
    },
    {
        code: "ng",
        email: "opt-out"
    },
    {
        code: "nu",
        email: "opt-in"
    },
    {
        code: "nf",
        email: "opt-in"
    },
    {
        code: "kp",
        email: "opt-in"
    },
    {
        code: "mp",
        email: "opt-in"
    },
    {
        code: "no",
        email: "opt-in"
    },
    {
        code: "om",
        email: "notice"
    },
    {
        code: "pk",
        email: "opt-in"
    },
    {
        code: "pw",
        email: "opt-in"
    },
    {
        code: "ps",
        email: "opt-in"
    },
    {
        code: "pa",
        email: "opt-out"
    },
    {
        code: "pg",
        email: "opt-in"
    },
    {
        code: "py",
        email: "notice"
    },
    {
        code: "pe",
        email: "opt-in"
    },
    {
        code: "ph",
        email: "opt-in"
    },
    {
        code: "pn",
        email: "opt-in"
    },
    {
        code: "pl",
        email: "opt-in"
    },
    {
        code: "pt",
        email: "opt-in"
    },
    {
        code: "pr",
        email: "opt-in"
    },
    {
        code: "qa",
        email: "notice"
    },
    {
        code: "re",
        email: "opt-in"
    },
    {
        code: "ro",
        email: "opt-in"
    },
    {
        code: "ru",
        email: "double opt-in"
    },
    {
        code: "rw",
        email: "notice"
    },
    {
        code: "xs",
        email: "opt-in"
    },
    {
        code: "bl",
        email: "opt-in"
    },
    {
        code: "kn",
        email: "opt-in"
    },
    {
        code: "lc",
        email: "opt-in"
    },
    {
        code: "mf",
        email: "opt-in"
    },
    {
        code: "pm",
        email: "opt-in"
    },
    {
        code: "vc",
        email: "opt-in"
    },
    {
        code: "ws",
        email: "opt-in"
    },
    {
        code: "sm",
        email: "opt-in"
    },
    {
        code: "st",
        email: "opt-in"
    },
    {
        code: "sa",
        email: "opt-in"
    },
    {
        code: "sn",
        email: "opt-out"
    },
    {
        code: "rs",
        email: "opt-in"
    },
    {
        code: "sc",
        email: "notice"
    },
    {
        code: "sl",
        email: "opt-in"
    },
    {
        code: "sg",
        email: "opt-in"
    },
    {
        code: "xe",
        email: "opt-in"
    },
    {
        code: "sx",
        email: "opt-in"
    },
    {
        code: "sk",
        email: "opt-in"
    },
    {
        code: "si",
        email: "opt-in"
    },
    {
        code: "sb",
        email: "opt-in"
    },
    {
        code: "so",
        email: "opt-in"
    },
    {
        code: "za",
        email: "opt-out"
    },
    {
        code: "gs",
        email: "opt-in"
    },
    {
        code: "ss",
        email: "opt-in"
    },
    {
        code: "es",
        email: "opt-in"
    },
    {
        code: "lk",
        email: "opt-in"
    },
    {
        code: "sh",
        email: "opt-in"
    },
    {
        code: "sd",
        email: "notice"
    },
    {
        code: "sr",
        email: "opt-in"
    },
    {
        code: "sj",
        email: "opt-in"
    },
    {
        code: "se",
        email: "opt-in"
    },
    {
        code: "ch",
        email: "opt-in"
    },
    {
        code: "sy",
        email: "notice"
    },
    {
        code: "tw",
        email: "opt-in"
    },
    {
        code: "tj",
        email: "opt-in"
    },
    {
        code: "tz",
        email: "notice"
    },
    {
        code: "th",
        email: "opt-out"
    },
    {
        code: "tl",
        email: "opt-in"
    },
    {
        code: "tg",
        email: "notice"
    },
    {
        code: "tk",
        email: "opt-in"
    },
    {
        code: "to",
        email: "opt-in"
    },
    {
        code: "tt",
        email: "notice"
    },
    {
        code: "tn",
        email: "opt-in"
    },
    {
        code: "tr",
        email: "opt-in"
    },
    {
        code: "tm",
        email: "notice"
    },
    {
        code: "tc",
        email: "opt-in"
    },
    {
        code: "tv",
        email: "opt-in"
    },
    {
        code: "um",
        email: "opt-in"
    },
    {
        code: "vi",
        email: "opt-in"
    },
    {
        code: "ug",
        email: "notice"
    },
    {
        code: "ua",
        email: "opt-in"
    },
    {
        code: "ae",
        email: "opt-in"
    },
    {
        code: "gb",
        email: "opt-in"
    },
    {
        code: "us",
        email: "notice"
    },
    {
        code: "uy",
        email: "opt-in"
    },
    {
        code: "uz",
        email: "opt-in"
    },
    {
        code: "vu",
        email: "opt-in"
    },
    {
        code: "va",
        email: "opt-in"
    },
    {
        code: "ve",
        email: "opt-in"
    },
    {
        code: "vn",
        email: "opt-in"
    },
    {
        code: "wf",
        email: "opt-in"
    },
    {
        code: "ye",
        email: "notice"
    },
    {
        code: "zm",
        email: "notice"
    },
    {
        code: "zw",
        email: "notice"
    }],
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
            }),
            $(".dl-platforms-popup button").on("click",
            function(e) {
                var t = $(e.currentTarget).data("platform");
                g.analytics.aria.sendEvent("microsoft.webbrowser.installer.insider.DownloadDropdownMenuClick", {
                    iid: o.visitId,
                    platformClicked: t
                })
            })
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
        },
        $("#c-shellmenu_42").on("click",
        function(e) {
            g.analytics.sendFloodlight("download"),
            g.analytics.sendGeminiTag("download")
        }),
        $("#home-more-platforms").on("click",
        function(e) {
            g.analytics.sendFloodlight("download"),
            g.analytics.sendGeminiTag("download")
        })
    } (),
    function() {
        g.analytics = g.analytics || {},
        g.analytics.twitter = g.analytics.twitter || {};
        function e(e) {
            "undefined" != typeof twttr && twttr.conversion.trackPid(e, {
                tw_sale_amount: 0,
                tw_order_quantity: 0
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
    function v(t, i, o) {
        t.removeClass("app-popup-confirm-show");
        var n = $.extend({},
        r, o);
        n.title && t.find(".eula-title").html(n.title),
        n.imageUrl && t.find(".eula-image").css("background-image", "url(" + n.imageUrl + ")"),
        $("#consent-text").text(o.consentText);
        var a = t.find("#eula-accept-checkbox");
        function s() {
            var e, t = a.prop("checked"),
            i = o.requireConsent && !t;
            c.attr("disabled", i),
            e = o.hideConsent ? n.downloadUrl.replace("&Consent={consent}", "") : n.downloadUrl.replace("{consent}", t ? 1 : 0),
            t ? n.yesTelemetryLinkId && (e = e.replace("{linkId}", n.yesTelemetryLinkId)) : n.noTelemetryLinkId && (e = e.replace("{linkId}", n.noTelemetryLinkId)),
            c.attr("href", i ? "": e)
        }
        a.prop("checked", !o.hideConsent && o.consentCheckDefault),
        a.off(),
        t.find(".eula-standard").toggle(!o.isSupplemental),
        t.find(".eula-supplemental").toggle(o.isSupplemental);
        var c = t.find(".eula-button");
        s(),
        a.on("change",
        function() {
            s();
            var e = a.prop("checked");
            g.analytics.aria.eulaConsentChange(e)
        }),
        o.hideConsent ? a.closest(".checkbox").hide() : a.closest(".checkbox").show(),
        t.find("#eula-required-info").toggle(o.showRequiredInfo),
        t.find("#eula-privacy").toggle(!o.showRequiredInfo),
        c.off(),
        c.on("click",
        function() {
            if (c.attr("disabled")) return ! 1;
            setTimeout(function() {
                t.addClass("app-popup-confirm-show"),
                setTimeout(function() {
                    i.getFocusables(!0),
                    t.find(".app-popup-confirm-close").focus()
                },
                10)
            },
            50);
            var e = a.prop("checked");
            o.enterpriseId ? (g.analytics.aria.enterpriseDownloadSubmit(o.enterpriseId), g.analytics.awa.download("Accept and Download", o.enterpriseId)) : g.analytics.aria.downloadSubmit(o.channelId, e),
            g.analytics.sendFloodlight("AgreeandDownload"),
            g.analytics.sendGeminiTag("AgreeandDownload"),
            g.analytics.twitter.agreeAndDownload(),
            g.analytics.facebook.agreeAndDownload(),
            g.analytics.reddit.agreeAndDownload(),
            g.analytics.linkedIn.agreeAndDownload()
        })
    }
    g.exports.renderPage = function(e) {
        new g.controls.TipCollection(e.tips, 4),
        g.analytics.aria.initPage(e.aria)
    },
    r = {
        title: "",
        downloadUrl: "",
        imageUrl: ""
    },
    g.controls.initEulaPopup = function(m) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "eula-popup",
        h = m.requireConsentPlatforms || [],
        t = g.controls.Popup.getInstance(e);
        t.on("show",
        function(e) {
            var t = $(e.popup.trigger),
            i = t.data("download-title"),
            o = t.data("download-url"),
            n = t.data("yes-telemetry-id"),
            a = t.data("no-telemetry-id"),
            s = t.data("image-url"),
            c = t.data("channel"),
            l = t.data("platform"),
            r = t.data("consent"),
            d = t.data("consent-hidden"),
            u = t.data("show-required-info"),
            p = t.data("download-enterpriseid"),
            f = t.data("supplemental");
            v(e.popup.$el, e.popup, {
                title: i || "",
                consentCheckDefault: m.consentCheckDefault,
                requireConsent: 0 <= h.indexOf(l),
                consentText: r,
                hideConsent: d,
                showRequiredInfo: u,
                imageUrl: s,
                downloadUrl: o,
                channelId: c,
                yesTelemetryLinkId: n,
                noTelemetryLinkId: a,
                enterpriseId: p,
                isSupplemental: f
            }),
            p ? (g.analytics.aria.enterpriseDownloadButtonClick(p), g.analytics.awa.download("Download", p, !0)) : g.analytics.aria.eulaPopup(c, m.consentCheckDefault),
            g.analytics.sendFloodlight("download"),
            g.analytics.sendGeminiTag("download"),
            g.analytics.twitter.eulaOpen(),
            g.analytics.facebook.eulaOpen(),
            g.analytics.reddit.eulaOpen(),
            g.analytics.linkedIn.eulaOpen()
        }),
        t.on("hide",
        function(e) {
            var t = $(e.currentTarget);
            t.hasClass("eula-button") || (t.hasClass("app-popup-close") ? g.analytics.aria.eulaCloseDialogButton() : t.hasClass("app-popup-confirm-close") ? g.analytics.aria.eulaCloseConfirmButton() : g.analytics.aria.eulaBackgroundHide())
        }),
        g.analytics.twitter.downloadPageVisit(),
        g.analytics.facebook.downloadPageVisit(),
        g.analytics.reddit.downloadPageVisit()
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
    g.controls.EventEmitter = i,
    g.controls.initNotifyPopup = function() {
        var e = g.controls.Popup.getInstance("notify-popup");
        if (e) {
            var t = e.$el,
            a = $("#firstname"),
            s = $("#lastname"),
            c = $("#email"),
            i = $("#emailCountry"),
            l = $("#notify-signup-error"),
            r = !1,
            d = function() {
                var i = [];
                return $(".notify-platform-checkbox:checked").each(function(e, t) {
                    i.push($(t).val())
                }),
                i
            },
            o = function() {
                l.text("");
                var e, t = "" !== a.val(),
                i = "" !== s.val(),
                o = (e = c.val(), /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(String(e).toLowerCase())),
                n = 0 < d().length;
                return r && (a.toggleClass("invalid", !t), s.toggleClass("invalid", !i), c.toggleClass("invalid", !o), n || l.text("Please select the platforms you would like to receive notifications for.").show()),
                t && i && o && n
            };
            t.find("input").on("keyup keyblur change",
            function() {
                o()
            });
            var n = $(".notify-signup-submit").on("click",
            function() {
                if (r = !0, o()) {
                    var e = {
                        firstName: a.val(),
                        lastName: s.val(),
                        email: c.val(),
                        countryCode: i.val(),
                        platformIds: d(),
                        otherEmails: $("#notify-form-disclaimer-accept").prop("checked")
                    };
                    g.utils.apiCall({
                        isPost: !0,
                        url: "/api/notify",
                        $button: n,
                        $error: l,
                        data: e
                    }).done(function() {
                        t.addClass("app-popup-confirm-show"),
                        e.platformIds.forEach(function(e) {
                            g.analytics.aria.notifySubmit(e)
                        })
                    })
                }
            });
            e.on("show",
            function(e) {
                e.popup.$el.removeClass("app-popup-confirm-show");
                var t = $(e.currentTarget).data("platform");
                t && (e.popup.$el.find("input[type=checkbox]").removeAttr("checked"), e.popup.$el.find("#notify-form-platform-" + t).attr("checked", "checked"));
                var i = $(e.currentTarget).data("source");
                g.analytics.aria.notifyPopup(t, i)
            })
        }
    };
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