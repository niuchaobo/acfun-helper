!function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, function(A, e) {
    "use strict";
    function v(e) {
        return null != e && e === e.window
    }
    var t = []
      , r = Object.getPrototypeOf
      , a = t.slice
      , y = t.flat ? function(e) {
        return t.flat.call(e)
    }
    : function(e) {
        return t.concat.apply([], e)
    }
      , u = t.push
      , i = t.indexOf
      , n = {}
      , o = n.toString
      , g = n.hasOwnProperty
      , s = g.toString
      , c = s.call(Object)
      , m = {}
      , T = function(e) {
        return "function" == typeof e && "number" != typeof e.nodeType
    }
      , S = A.document
      , l = {
        type: !0,
        src: !0,
        nonce: !0,
        noModule: !0
    };
    function b(e, t, n) {
        var r, i, o = (n = n || S).createElement("script");
        if (o.text = e,
        t)
            for (r in l)
                (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
        n.head.appendChild(o).parentNode.removeChild(o)
    }
    function x(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e
    }
    var f = "3.5.1"
      , E = function(e, t) {
        return new E.fn.init(e,t)
    };
    function p(e) {
        var t = !!e && "length"in e && e.length
          , n = x(e);
        return !T(e) && !v(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    E.fn = E.prototype = {
        jquery: f,
        constructor: E,
        length: 0,
        toArray: function() {
            return a.call(this)
        },
        get: function(e) {
            return null == e ? a.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = E.merge(this.constructor(), e);
            return t.prevObject = this,
            t
        },
        each: function(e) {
            return E.each(this, e)
        },
        map: function(n) {
            return this.pushStack(E.map(this, function(e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function() {
            return this.pushStack(a.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        even: function() {
            return this.pushStack(E.grep(this, function(e, t) {
                return (t + 1) % 2
            }))
        },
        odd: function() {
            return this.pushStack(E.grep(this, function(e, t) {
                return t % 2
            }))
        },
        eq: function(e) {
            var t = this.length
              , n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: u,
        sort: t.sort,
        splice: t.splice
    },
    E.extend = E.fn.extend = function() {
        var e, t, n, r, i, o, s = arguments[0] || {}, a = 1, u = arguments.length, c = !1;
        for ("boolean" == typeof s && (c = s,
        s = arguments[a] || {},
        a++),
        "object" == typeof s || T(s) || (s = {}),
        a === u && (s = this,
        a--); a < u; a++)
            if (null != (e = arguments[a]))
                for (t in e)
                    r = e[t],
                    "__proto__" !== t && s !== r && (c && r && (E.isPlainObject(r) || (i = Array.isArray(r))) ? (n = s[t],
                    o = i && !Array.isArray(n) ? [] : i || E.isPlainObject(n) ? n : {},
                    i = !1,
                    s[t] = E.extend(c, o, r)) : void 0 !== r && (s[t] = r));
        return s
    }
    ,
    E.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== o.call(e) || (t = r(e)) && ("function" != typeof (n = g.call(t, "constructor") && t.constructor) || s.call(n) !== c))
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        globalEval: function(e, t, n) {
            b(e, {
                nonce: t && t.nonce
            }, n)
        },
        each: function(e, t) {
            var n, r = 0;
            if (p(e))
                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++)
                    ;
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r]))
                        break;
            return e
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (p(Object(e)) ? E.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)),
            n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : i.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                e[i++] = t[r];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, s = !n; i < o; i++)
                !t(e[i], i) != s && r.push(e[i]);
            return r
        },
        map: function(e, t, n) {
            var r, i, o = 0, s = [];
            if (p(e))
                for (r = e.length; o < r; o++)
                    null != (i = t(e[o], o, n)) && s.push(i);
            else
                for (o in e)
                    null != (i = t(e[o], o, n)) && s.push(i);
            return y(s)
        },
        guid: 1,
        support: m
    }),
    "function" == typeof Symbol && (E.fn[Symbol.iterator] = t[Symbol.iterator]),
    E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        n["[object " + t + "]"] = t.toLowerCase()
    });
    var d = function(n) {
        function f(e, t) {
            var n = "0x" + e.slice(1) - 65536;
            return t || (n < 0 ? String.fromCharCode(65536 + n) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
        }
        function i() {
            w()
        }
        var e, d, b, o, s, h, p, v, x, u, c, w, A, a, S, y, l, g, m, E = "sizzle" + +new Date, T = n.document, C = 0, r = 0, P = ue(), k = ue(), N = ue(), D = ue(), _ = function(e, t) {
            return e === t && (c = !0),
            0
        }, O = {}.hasOwnProperty, t = [], R = t.pop, j = t.push, W = t.push, I = t.slice, L = function(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] === t)
                    return n;
            return -1
        }, M = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", U = "[\\x20\\t\\r\\n\\f]", q = "(?:\\\\[\\da-fA-F]{1,6}" + U + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", H = "\\[" + U + "*(" + q + ")(?:" + U + "*([*^$|!~]?=)" + U + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + q + "))|)" + U + "*\\]", B = ":(" + q + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + H + ")*)|.*)\\)|)", F = new RegExp(U + "+","g"), z = new RegExp("^" + U + "+|((?:^|[^\\\\])(?:\\\\.)*)" + U + "+$","g"), $ = new RegExp("^" + U + "*," + U + "*"), V = new RegExp("^" + U + "*([>+~]|" + U + ")" + U + "*"), K = new RegExp(U + "|>"), X = new RegExp(B), G = new RegExp("^" + q + "$"), Q = {
            ID: new RegExp("^#(" + q + ")"),
            CLASS: new RegExp("^\\.(" + q + ")"),
            TAG: new RegExp("^(" + q + "|[*])"),
            ATTR: new RegExp("^" + H),
            PSEUDO: new RegExp("^" + B),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + U + "*(even|odd|(([+-]|)(\\d*)n|)" + U + "*(?:([+-]|)" + U + "*(\\d+)|))" + U + "*\\)|)","i"),
            bool: new RegExp("^(?:" + M + ")$","i"),
            needsContext: new RegExp("^" + U + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + U + "*((?:-\\d)?\\d*)" + U + "*\\)|)(?=[^-]|$)","i")
        }, J = /HTML$/i, Y = /^(?:input|select|textarea|button)$/i, Z = /^h\d$/i, ee = /^[^{]+\{\s*\[native \w/, te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ne = /[+~]/, re = new RegExp("\\\\[\\da-fA-F]{1,6}" + U + "?|\\\\([^\\r\\n\\f])","g"), ie = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, oe = function(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        }, se = be(function(e) {
            return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            W.apply(t = I.call(T.childNodes), T.childNodes),
            t[T.childNodes.length].nodeType
        } catch (e) {
            W = {
                apply: t.length ? function(e, t) {
                    j.apply(e, I.call(t))
                }
                : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++]; )
                        ;
                    e.length = n - 1
                }
            }
        }
        function ae(e, t, n, r) {
            var i, o, s, a, u, c, l, f = t && t.ownerDocument, p = t ? t.nodeType : 9;
            if (n = n || [],
            "string" != typeof e || !e || 1 !== p && 9 !== p && 11 !== p)
                return n;
            if (!r && (w(t),
            t = t || A,
            S)) {
                if (11 !== p && (u = te.exec(e)))
                    if (i = u[1]) {
                        if (9 === p) {
                            if (!(s = t.getElementById(i)))
                                return n;
                            if (s.id === i)
                                return n.push(s),
                                n
                        } else if (f && (s = f.getElementById(i)) && m(t, s) && s.id === i)
                            return n.push(s),
                            n
                    } else {
                        if (u[2])
                            return W.apply(n, t.getElementsByTagName(e)),
                            n;
                        if ((i = u[3]) && d.getElementsByClassName && t.getElementsByClassName)
                            return W.apply(n, t.getElementsByClassName(i)),
                            n
                    }
                if (d.qsa && !D[e + " "] && (!y || !y.test(e)) && (1 !== p || "object" !== t.nodeName.toLowerCase())) {
                    if (l = e,
                    f = t,
                    1 === p && (K.test(e) || V.test(e))) {
                        for ((f = ne.test(e) && ge(t.parentNode) || t) === t && d.scope || ((a = t.getAttribute("id")) ? a = a.replace(ie, oe) : t.setAttribute("id", a = E)),
                        o = (c = h(e)).length; o--; )
                            c[o] = (a ? "#" + a : ":scope") + " " + Te(c[o]);
                        l = c.join(",")
                    }
                    try {
                        return W.apply(n, f.querySelectorAll(l)),
                        n
                    } catch (t) {
                        D(e, !0)
                    } finally {
                        a === E && t.removeAttribute("id")
                    }
                }
            }
            return v(e.replace(z, "$1"), t, n, r)
        }
        function ue() {
            var r = [];
            return function e(t, n) {
                return r.push(t + " ") > b.cacheLength && delete e[r.shift()],
                e[t + " "] = n
            }
        }
        function ce(e) {
            return e[E] = !0,
            e
        }
        function le(e) {
            var t = A.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function fe(e, t) {
            for (var n = e.split("|"), r = n.length; r--; )
                b.attrHandle[n[r]] = t
        }
        function pe(e, t) {
            var n = t && e
              , r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r)
                return r;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function de(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }
        function he(n) {
            return function(e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n
            }
        }
        function ve(t) {
            return function(e) {
                return "form"in e ? e.parentNode && !1 === e.disabled ? "label"in e ? "label"in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && se(e) === t : e.disabled === t : "label"in e && e.disabled === t
            }
        }
        function ye(s) {
            return ce(function(o) {
                return o = +o,
                ce(function(e, t) {
                    for (var n, r = s([], e.length, o), i = r.length; i--; )
                        e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                })
            })
        }
        function ge(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        for (e in d = ae.support = {},
        s = ae.isXML = function(e) {
            var t = e.namespaceURI
              , n = (e.ownerDocument || e).documentElement;
            return !J.test(t || n && n.nodeName || "HTML")
        }
        ,
        w = ae.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : T;
            return r != A && 9 === r.nodeType && r.documentElement && (a = (A = r).documentElement,
            S = !s(A),
            T != A && (n = A.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", i, !1) : n.attachEvent && n.attachEvent("onunload", i)),
            d.scope = le(function(e) {
                return a.appendChild(e).appendChild(A.createElement("div")),
                void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
            }),
            d.attributes = le(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }),
            d.getElementsByTagName = le(function(e) {
                return e.appendChild(A.createComment("")),
                !e.getElementsByTagName("*").length
            }),
            d.getElementsByClassName = ee.test(A.getElementsByClassName),
            d.getById = le(function(e) {
                return a.appendChild(e).id = E,
                !A.getElementsByName || !A.getElementsByName(E).length
            }),
            d.getById ? (b.filter.ID = function(e) {
                var t = e.replace(re, f);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ,
            b.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && S) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }
            ) : (b.filter.ID = function(e) {
                var n = e.replace(re, f);
                return function(e) {
                    var t = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return t && t.value === n
                }
            }
            ,
            b.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && S) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                            return [o];
                        for (i = t.getElementsByName(e),
                        r = 0; o = i[r++]; )
                            if ((n = o.getAttributeNode("id")) && n.value === e)
                                return [o]
                    }
                    return []
                }
            }
            ),
            b.find.TAG = d.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" !== e)
                    return o;
                for (; n = o[i++]; )
                    1 === n.nodeType && r.push(n);
                return r
            }
            ,
            b.find.CLASS = d.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && S)
                    return t.getElementsByClassName(e)
            }
            ,
            l = [],
            y = [],
            (d.qsa = ee.test(A.querySelectorAll)) && (le(function(e) {
                var t;
                a.appendChild(e).innerHTML = "<a id='" + E + "'></a><select id='" + E + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && y.push("[*^$]=" + U + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || y.push("\\[" + U + "*(?:value|" + M + ")"),
                e.querySelectorAll("[id~=" + E + "-]").length || y.push("~="),
                (t = A.createElement("input")).setAttribute("name", ""),
                e.appendChild(t),
                e.querySelectorAll("[name='']").length || y.push("\\[" + U + "*name" + U + "*=" + U + "*(?:''|\"\")"),
                e.querySelectorAll(":checked").length || y.push(":checked"),
                e.querySelectorAll("a#" + E + "+*").length || y.push(".#.+[+~]"),
                e.querySelectorAll("\\\f"),
                y.push("[\\r\\n\\f]")
            }),
            le(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = A.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && y.push("name" + U + "*[*^$|!~]?="),
                2 !== e.querySelectorAll(":enabled").length && y.push(":enabled", ":disabled"),
                a.appendChild(e).disabled = !0,
                2 !== e.querySelectorAll(":disabled").length && y.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                y.push(",.*:")
            })),
            (d.matchesSelector = ee.test(g = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && le(function(e) {
                d.disconnectedMatch = g.call(e, "*"),
                g.call(e, "[s!='']:x"),
                l.push("!=", B)
            }),
            y = y.length && new RegExp(y.join("|")),
            l = l.length && new RegExp(l.join("|")),
            t = ee.test(a.compareDocumentPosition),
            m = t || ee.test(a.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e
                  , r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }
            : function(e, t) {
                if (t)
                    for (; t = t.parentNode; )
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            _ = t ? function(e, t) {
                if (e === t)
                    return c = !0,
                    0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e == A || e.ownerDocument == T && m(T, e) ? -1 : t == A || t.ownerDocument == T && m(T, t) ? 1 : u ? L(u, e) - L(u, t) : 0 : 4 & n ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return c = !0,
                    0;
                var n, r = 0, i = e.parentNode, o = t.parentNode, s = [e], a = [t];
                if (!i || !o)
                    return e == A ? -1 : t == A ? 1 : i ? -1 : o ? 1 : u ? L(u, e) - L(u, t) : 0;
                if (i === o)
                    return pe(e, t);
                for (n = e; n = n.parentNode; )
                    s.unshift(n);
                for (n = t; n = n.parentNode; )
                    a.unshift(n);
                for (; s[r] === a[r]; )
                    r++;
                return r ? pe(s[r], a[r]) : s[r] == T ? -1 : a[r] == T ? 1 : 0
            }
            ),
            A
        }
        ,
        ae.matches = function(e, t) {
            return ae(e, null, null, t)
        }
        ,
        ae.matchesSelector = function(e, t) {
            if (w(e),
            d.matchesSelector && S && !D[t + " "] && (!l || !l.test(t)) && (!y || !y.test(t)))
                try {
                    var n = g.call(e, t);
                    if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return n
                } catch (e) {
                    D(t, !0)
                }
            return 0 < ae(t, A, null, [e]).length
        }
        ,
        ae.contains = function(e, t) {
            return (e.ownerDocument || e) != A && w(e),
            m(e, t)
        }
        ,
        ae.attr = function(e, t) {
            (e.ownerDocument || e) != A && w(e);
            var n = b.attrHandle[t.toLowerCase()]
              , r = n && O.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !S) : void 0;
            return void 0 !== r ? r : d.attributes || !S ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }
        ,
        ae.escape = function(e) {
            return (e + "").replace(ie, oe)
        }
        ,
        ae.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        ae.uniqueSort = function(e) {
            var t, n = [], r = 0, i = 0;
            if (c = !d.detectDuplicates,
            u = !d.sortStable && e.slice(0),
            e.sort(_),
            c) {
                for (; t = e[i++]; )
                    t === e[i] && (r = n.push(i));
                for (; r--; )
                    e.splice(n[r], 1)
            }
            return u = null,
            e
        }
        ,
        o = ae.getText = function(e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += o(e)
                } else if (3 === i || 4 === i)
                    return e.nodeValue
            } else
                for (; t = e[r++]; )
                    n += o(t);
            return n
        }
        ,
        (b = ae.selectors = {
            cacheLength: 50,
            createPseudo: ce,
            match: Q,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(re, f),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(re, f),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || ae.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ae.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return Q.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(re, f).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = P[e + " "];
                    return t || (t = new RegExp("(^|" + U + ")" + e + "(" + U + "|$)")) && P(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(n, r, i) {
                    return function(e) {
                        var t = ae.attr(e, n);
                        return null == t ? "!=" === r : !r || (t += "",
                        "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(F, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(h, e, t, v, y) {
                    var g = "nth" !== h.slice(0, 3)
                      , m = "last" !== h.slice(-4)
                      , T = "of-type" === e;
                    return 1 === v && 0 === y ? function(e) {
                        return !!e.parentNode
                    }
                    : function(e, t, n) {
                        var r, i, o, s, a, u, c = g != m ? "nextSibling" : "previousSibling", l = e.parentNode, f = T && e.nodeName.toLowerCase(), p = !n && !T, d = !1;
                        if (l) {
                            if (g) {
                                for (; c; ) {
                                    for (s = e; s = s[c]; )
                                        if (T ? s.nodeName.toLowerCase() === f : 1 === s.nodeType)
                                            return !1;
                                    u = c = "only" === h && !u && "nextSibling"
                                }
                                return !0
                            }
                            if (u = [m ? l.firstChild : l.lastChild],
                            m && p) {
                                for (d = (a = (r = (i = (o = (s = l)[E] || (s[E] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[h] || [])[0] === C && r[1]) && r[2],
                                s = a && l.childNodes[a]; s = ++a && s && s[c] || (d = a = 0) || u.pop(); )
                                    if (1 === s.nodeType && ++d && s === e) {
                                        i[h] = [C, a, d];
                                        break
                                    }
                            } else if (p && (d = a = (r = (i = (o = (s = e)[E] || (s[E] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[h] || [])[0] === C && r[1]),
                            !1 === d)
                                for (; (s = ++a && s && s[c] || (d = a = 0) || u.pop()) && ((T ? s.nodeName.toLowerCase() !== f : 1 !== s.nodeType) || !++d || (p && ((i = (o = s[E] || (s[E] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[h] = [C, d]),
                                s !== e)); )
                                    ;
                            return (d -= y) === v || d % v == 0 && 0 <= d / v
                        }
                    }
                },
                PSEUDO: function(e, o) {
                    var t, s = b.pseudos[e] || b.setFilters[e.toLowerCase()] || ae.error("unsupported pseudo: " + e);
                    return s[E] ? s(o) : 1 < s.length ? (t = [e, e, "", o],
                    b.setFilters.hasOwnProperty(e.toLowerCase()) ? ce(function(e, t) {
                        for (var n, r = s(e, o), i = r.length; i--; )
                            e[n = L(e, r[i])] = !(t[n] = r[i])
                    }) : function(e) {
                        return s(e, 0, t)
                    }
                    ) : s
                }
            },
            pseudos: {
                not: ce(function(e) {
                    var r = []
                      , i = []
                      , a = p(e.replace(z, "$1"));
                    return a[E] ? ce(function(e, t, n, r) {
                        for (var i, o = a(e, null, r, []), s = e.length; s--; )
                            (i = o[s]) && (e[s] = !(t[s] = i))
                    }) : function(e, t, n) {
                        return r[0] = e,
                        a(r, null, n, i),
                        r[0] = null,
                        !i.pop()
                    }
                }),
                has: ce(function(t) {
                    return function(e) {
                        return 0 < ae(t, e).length
                    }
                }),
                contains: ce(function(t) {
                    return t = t.replace(re, f),
                    function(e) {
                        return -1 < (e.textContent || o(e)).indexOf(t)
                    }
                }),
                lang: ce(function(n) {
                    return G.test(n || "") || ae.error("unsupported lang: " + n),
                    n = n.replace(re, f).toLowerCase(),
                    function(e) {
                        var t;
                        do {
                            if (t = S ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                                return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                        } while ((e = e.parentNode) && 1 === e.nodeType);return !1
                    }
                }),
                target: function(e) {
                    var t = n.location && n.location.hash;
                    return t && t.slice(1) === e.id
                },
                root: function(e) {
                    return e === a
                },
                focus: function(e) {
                    return e === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: ve(!1),
                disabled: ve(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !b.pseudos.empty(e)
                },
                header: function(e) {
                    return Z.test(e.nodeName)
                },
                input: function(e) {
                    return Y.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: ye(function() {
                    return [0]
                }),
                last: ye(function(e, t) {
                    return [t - 1]
                }),
                eq: ye(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: ye(function(e, t) {
                    for (var n = 0; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                odd: ye(function(e, t) {
                    for (var n = 1; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                lt: ye(function(e, t, n) {
                    for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; )
                        e.push(r);
                    return e
                }),
                gt: ye(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; )
                        e.push(r);
                    return e
                })
            }
        }).pseudos.nth = b.pseudos.eq,
        {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            b.pseudos[e] = de(e);
        for (e in {
            submit: !0,
            reset: !0
        })
            b.pseudos[e] = he(e);
        function me() {}
        function Te(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++)
                r += e[t].value;
            return r
        }
        function be(a, e, t) {
            var u = e.dir
              , c = e.next
              , l = c || u
              , f = t && "parentNode" === l
              , p = r++;
            return e.first ? function(e, t, n) {
                for (; e = e[u]; )
                    if (1 === e.nodeType || f)
                        return a(e, t, n);
                return !1
            }
            : function(e, t, n) {
                var r, i, o, s = [C, p];
                if (n) {
                    for (; e = e[u]; )
                        if ((1 === e.nodeType || f) && a(e, t, n))
                            return !0
                } else
                    for (; e = e[u]; )
                        if (1 === e.nodeType || f)
                            if (i = (o = e[E] || (e[E] = {}))[e.uniqueID] || (o[e.uniqueID] = {}),
                            c && c === e.nodeName.toLowerCase())
                                e = e[u] || e;
                            else {
                                if ((r = i[l]) && r[0] === C && r[1] === p)
                                    return s[2] = r[2];
                                if ((i[l] = s)[2] = a(e, t, n))
                                    return !0
                            }
                return !1
            }
        }
        function xe(i) {
            return 1 < i.length ? function(e, t, n) {
                for (var r = i.length; r--; )
                    if (!i[r](e, t, n))
                        return !1;
                return !0
            }
            : i[0]
        }
        function we(e, t, n, r, i) {
            for (var o, s = [], a = 0, u = e.length, c = null != t; a < u; a++)
                (o = e[a]) && (n && !n(o, r, i) || (s.push(o),
                c && t.push(a)));
            return s
        }
        function Ae(d, h, v, y, g, e) {
            return y && !y[E] && (y = Ae(y)),
            g && !g[E] && (g = Ae(g, e)),
            ce(function(e, t, n, r) {
                var i, o, s, a = [], u = [], c = t.length, l = e || function(e, t, n) {
                    for (var r = 0, i = t.length; r < i; r++)
                        ae(e, t[r], n);
                    return n
                }(h || "*", n.nodeType ? [n] : n, []), f = !d || !e && h ? l : we(l, a, d, n, r), p = v ? g || (e ? d : c || y) ? [] : t : f;
                if (v && v(f, p, n, r),
                y)
                    for (i = we(p, u),
                    y(i, [], n, r),
                    o = i.length; o--; )
                        (s = i[o]) && (p[u[o]] = !(f[u[o]] = s));
                if (e) {
                    if (g || d) {
                        if (g) {
                            for (i = [],
                            o = p.length; o--; )
                                (s = p[o]) && i.push(f[o] = s);
                            g(null, p = [], i, r)
                        }
                        for (o = p.length; o--; )
                            (s = p[o]) && -1 < (i = g ? L(e, s) : a[o]) && (e[i] = !(t[i] = s))
                    }
                } else
                    p = we(p === t ? p.splice(c, p.length) : p),
                    g ? g(null, t, p, r) : W.apply(t, p)
            })
        }
        function Se(e) {
            for (var i, t, n, r = e.length, o = b.relative[e[0].type], s = o || b.relative[" "], a = o ? 1 : 0, u = be(function(e) {
                return e === i
            }, s, !0), c = be(function(e) {
                return -1 < L(i, e)
            }, s, !0), l = [function(e, t, n) {
                var r = !o && (n || t !== x) || ((i = t).nodeType ? u : c)(e, t, n);
                return i = null,
                r
            }
            ]; a < r; a++)
                if (t = b.relative[e[a].type])
                    l = [be(xe(l), t)];
                else {
                    if ((t = b.filter[e[a].type].apply(null, e[a].matches))[E]) {
                        for (n = ++a; n < r && !b.relative[e[n].type]; n++)
                            ;
                        return Ae(1 < a && xe(l), 1 < a && Te(e.slice(0, a - 1).concat({
                            value: " " === e[a - 2].type ? "*" : ""
                        })).replace(z, "$1"), t, a < n && Se(e.slice(a, n)), n < r && Se(e = e.slice(n)), n < r && Te(e))
                    }
                    l.push(t)
                }
            return xe(l)
        }
        return me.prototype = b.filters = b.pseudos,
        b.setFilters = new me,
        h = ae.tokenize = function(e, t) {
            var n, r, i, o, s, a, u, c = k[e + " "];
            if (c)
                return t ? 0 : c.slice(0);
            for (s = e,
            a = [],
            u = b.preFilter; s; ) {
                for (o in n && !(r = $.exec(s)) || (r && (s = s.slice(r[0].length) || s),
                a.push(i = [])),
                n = !1,
                (r = V.exec(s)) && (n = r.shift(),
                i.push({
                    value: n,
                    type: r[0].replace(z, " ")
                }),
                s = s.slice(n.length)),
                b.filter)
                    !(r = Q[o].exec(s)) || u[o] && !(r = u[o](r)) || (n = r.shift(),
                    i.push({
                        value: n,
                        type: o,
                        matches: r
                    }),
                    s = s.slice(n.length));
                if (!n)
                    break
            }
            return t ? s.length : s ? ae.error(e) : k(e, a).slice(0)
        }
        ,
        p = ae.compile = function(e, t) {
            var n, y, g, m, T, r, i = [], o = [], s = N[e + " "];
            if (!s) {
                for (n = (t = t || h(e)).length; n--; )
                    (s = Se(t[n]))[E] ? i.push(s) : o.push(s);
                (s = N(e, (y = o,
                m = 0 < (g = i).length,
                T = 0 < y.length,
                r = function(e, t, n, r, i) {
                    var o, s, a, u = 0, c = "0", l = e && [], f = [], p = x, d = e || T && b.find.TAG("*", i), h = C += null == p ? 1 : Math.random() || .1, v = d.length;
                    for (i && (x = t == A || t || i); c !== v && null != (o = d[c]); c++) {
                        if (T && o) {
                            for (s = 0,
                            t || o.ownerDocument == A || (w(o),
                            n = !S); a = y[s++]; )
                                if (a(o, t || A, n)) {
                                    r.push(o);
                                    break
                                }
                            i && (C = h)
                        }
                        m && ((o = !a && o) && u--,
                        e && l.push(o))
                    }
                    if (u += c,
                    m && c !== u) {
                        for (s = 0; a = g[s++]; )
                            a(l, f, t, n);
                        if (e) {
                            if (0 < u)
                                for (; c--; )
                                    l[c] || f[c] || (f[c] = R.call(r));
                            f = we(f)
                        }
                        W.apply(r, f),
                        i && !e && 0 < f.length && 1 < u + g.length && ae.uniqueSort(r)
                    }
                    return i && (C = h,
                    x = p),
                    l
                }
                ,
                m ? ce(r) : r))).selector = e
            }
            return s
        }
        ,
        v = ae.select = function(e, t, n, r) {
            var i, o, s, a, u, c = "function" == typeof e && e, l = !r && h(e = c.selector || e);
            if (n = n || [],
            1 === l.length) {
                if (2 < (o = l[0] = l[0].slice(0)).length && "ID" === (s = o[0]).type && 9 === t.nodeType && S && b.relative[o[1].type]) {
                    if (!(t = (b.find.ID(s.matches[0].replace(re, f), t) || [])[0]))
                        return n;
                    c && (t = t.parentNode),
                    e = e.slice(o.shift().value.length)
                }
                for (i = Q.needsContext.test(e) ? 0 : o.length; i-- && (s = o[i],
                !b.relative[a = s.type]); )
                    if ((u = b.find[a]) && (r = u(s.matches[0].replace(re, f), ne.test(o[0].type) && ge(t.parentNode) || t))) {
                        if (o.splice(i, 1),
                        !(e = r.length && Te(o)))
                            return W.apply(n, r),
                            n;
                        break
                    }
            }
            return (c || p(e, l))(r, t, !S, n, !t || ne.test(e) && ge(t.parentNode) || t),
            n
        }
        ,
        d.sortStable = E.split("").sort(_).join("") === E,
        d.detectDuplicates = !!c,
        w(),
        d.sortDetached = le(function(e) {
            return 1 & e.compareDocumentPosition(A.createElement("fieldset"))
        }),
        le(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || fe("type|href|height|width", function(e, t, n) {
            if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        d.attributes && le(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || fe("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue
        }),
        le(function(e) {
            return null == e.getAttribute("disabled")
        }) || fe(M, function(e, t, n) {
            var r;
            if (!n)
                return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }),
        ae
    }(A);
    E.find = d,
    E.expr = d.selectors,
    E.expr[":"] = E.expr.pseudos,
    E.uniqueSort = E.unique = d.uniqueSort,
    E.text = d.getText,
    E.isXMLDoc = d.isXML,
    E.contains = d.contains,
    E.escapeSelector = d.escape;
    function h(e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
            if (1 === e.nodeType) {
                if (i && E(e).is(n))
                    break;
                r.push(e)
            }
        return r
    }
    function w(e, t) {
        for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
        return n
    }
    var C = E.expr.match.needsContext;
    function P(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var k = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function N(e, n, r) {
        return T(n) ? E.grep(e, function(e, t) {
            return !!n.call(e, t, e) !== r
        }) : n.nodeType ? E.grep(e, function(e) {
            return e === n !== r
        }) : "string" != typeof n ? E.grep(e, function(e) {
            return -1 < i.call(n, e) !== r
        }) : E.filter(n, e, r)
    }
    E.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === r.nodeType ? E.find.matchesSelector(r, e) ? [r] : [] : E.find.matches(e, E.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }
    ,
    E.fn.extend({
        find: function(e) {
            var t, n, r = this.length, i = this;
            if ("string" != typeof e)
                return this.pushStack(E(e).filter(function() {
                    for (t = 0; t < r; t++)
                        if (E.contains(i[t], this))
                            return !0
                }));
            for (n = this.pushStack([]),
            t = 0; t < r; t++)
                E.find(e, i[t], n);
            return 1 < r ? E.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(N(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(N(this, e || [], !0))
        },
        is: function(e) {
            return !!N(this, "string" == typeof e && C.test(e) ? E(e) : e || [], !1).length
        }
    });
    var D, _ = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (E.fn.init = function(e, t, n) {
        var r, i;
        if (!e)
            return this;
        if (n = n || D,
        "string" != typeof e)
            return e.nodeType ? (this[0] = e,
            this.length = 1,
            this) : T(e) ? void 0 !== n.ready ? n.ready(e) : e(E) : E.makeArray(e, this);
        if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : _.exec(e)) || !r[1] && t)
            return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
        if (r[1]) {
            if (t = t instanceof E ? t[0] : t,
            E.merge(this, E.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : S, !0)),
            k.test(r[1]) && E.isPlainObject(t))
                for (r in t)
                    T(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
            return this
        }
        return (i = S.getElementById(r[2])) && (this[0] = i,
        this.length = 1),
        this
    }
    ).prototype = E.fn,
    D = E(S);
    var O = /^(?:parents|prev(?:Until|All))/
      , R = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    function j(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType; )
            ;
        return e
    }
    E.fn.extend({
        has: function(e) {
            var t = E(e, this)
              , n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (E.contains(this, t[e]))
                        return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0, i = this.length, o = [], s = "string" != typeof e && E(e);
            if (!C.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && E.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
            return this.pushStack(1 < o.length ? E.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? i.call(E(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(E.uniqueSort(E.merge(this.get(), E(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    E.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return h(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return h(e, "parentNode", n)
        },
        next: function(e) {
            return j(e, "nextSibling")
        },
        prev: function(e) {
            return j(e, "previousSibling")
        },
        nextAll: function(e) {
            return h(e, "nextSibling")
        },
        prevAll: function(e) {
            return h(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return h(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return h(e, "previousSibling", n)
        },
        siblings: function(e) {
            return w((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return w(e.firstChild)
        },
        contents: function(e) {
            return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (P(e, "template") && (e = e.content || e),
            E.merge([], e.childNodes))
        }
    }, function(r, i) {
        E.fn[r] = function(e, t) {
            var n = E.map(this, i, e);
            return "Until" !== r.slice(-5) && (t = e),
            t && "string" == typeof t && (n = E.filter(t, n)),
            1 < this.length && (R[r] || E.uniqueSort(n),
            O.test(r) && n.reverse()),
            this.pushStack(n)
        }
    });
    var W = /[^\x20\t\r\n\f]+/g;
    function I(e) {
        return e
    }
    function L(e) {
        throw e
    }
    function M(e, t, n, r) {
        var i;
        try {
            e && T(i = e.promise) ? i.call(e).done(t).fail(n) : e && T(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    E.Callbacks = function(r) {
        var n;
        r = "string" == typeof r ? (n = {},
        E.each(r.match(W) || [], function(e, t) {
            n[t] = !0
        }),
        n) : E.extend({}, r);
        function i() {
            for (s = s || r.once,
            t = o = !0; u.length; c = -1)
                for (e = u.shift(); ++c < a.length; )
                    !1 === a[c].apply(e[0], e[1]) && r.stopOnFalse && (c = a.length,
                    e = !1);
            r.memory || (e = !1),
            o = !1,
            s && (a = e ? [] : "")
        }
        var o, e, t, s, a = [], u = [], c = -1, l = {
            add: function() {
                return a && (e && !o && (c = a.length - 1,
                u.push(e)),
                function n(e) {
                    E.each(e, function(e, t) {
                        T(t) ? r.unique && l.has(t) || a.push(t) : t && t.length && "string" !== x(t) && n(t)
                    })
                }(arguments),
                e && !o && i()),
                this
            },
            remove: function() {
                return E.each(arguments, function(e, t) {
                    for (var n; -1 < (n = E.inArray(t, a, n)); )
                        a.splice(n, 1),
                        n <= c && c--
                }),
                this
            },
            has: function(e) {
                return e ? -1 < E.inArray(e, a) : 0 < a.length
            },
            empty: function() {
                return a = a && [],
                this
            },
            disable: function() {
                return s = u = [],
                a = e = "",
                this
            },
            disabled: function() {
                return !a
            },
            lock: function() {
                return s = u = [],
                e || o || (a = e = ""),
                this
            },
            locked: function() {
                return !!s
            },
            fireWith: function(e, t) {
                return s || (t = [e, (t = t || []).slice ? t.slice() : t],
                u.push(t),
                o || i()),
                this
            },
            fire: function() {
                return l.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!t
            }
        };
        return l
    }
    ,
    E.extend({
        Deferred: function(e) {
            var o = [["notify", "progress", E.Callbacks("memory"), E.Callbacks("memory"), 2], ["resolve", "done", E.Callbacks("once memory"), E.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", E.Callbacks("once memory"), E.Callbacks("once memory"), 1, "rejected"]]
              , i = "pending"
              , s = {
                state: function() {
                    return i
                },
                always: function() {
                    return a.done(arguments).fail(arguments),
                    this
                },
                catch: function(e) {
                    return s.then(null, e)
                },
                pipe: function() {
                    var i = arguments;
                    return E.Deferred(function(r) {
                        E.each(o, function(e, t) {
                            var n = T(i[t[4]]) && i[t[4]];
                            a[t[1]](function() {
                                var e = n && n.apply(this, arguments);
                                e && T(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                            })
                        }),
                        i = null
                    }).promise()
                },
                then: function(t, n, r) {
                    var u = 0;
                    function c(i, o, s, a) {
                        return function() {
                            function e() {
                                var e, t;
                                if (!(i < u)) {
                                    if ((e = s.apply(n, r)) === o.promise())
                                        throw new TypeError("Thenable self-resolution");
                                    t = e && ("object" == typeof e || "function" == typeof e) && e.then,
                                    T(t) ? a ? t.call(e, c(u, o, I, a), c(u, o, L, a)) : (u++,
                                    t.call(e, c(u, o, I, a), c(u, o, L, a), c(u, o, I, o.notifyWith))) : (s !== I && (n = void 0,
                                    r = [e]),
                                    (a || o.resolveWith)(n, r))
                                }
                            }
                            var n = this
                              , r = arguments
                              , t = a ? e : function() {
                                try {
                                    e()
                                } catch (e) {
                                    E.Deferred.exceptionHook && E.Deferred.exceptionHook(e, t.stackTrace),
                                    u <= i + 1 && (s !== L && (n = void 0,
                                    r = [e]),
                                    o.rejectWith(n, r))
                                }
                            }
                            ;
                            i ? t() : (E.Deferred.getStackHook && (t.stackTrace = E.Deferred.getStackHook()),
                            A.setTimeout(t))
                        }
                    }
                    return E.Deferred(function(e) {
                        o[0][3].add(c(0, e, T(r) ? r : I, e.notifyWith)),
                        o[1][3].add(c(0, e, T(t) ? t : I)),
                        o[2][3].add(c(0, e, T(n) ? n : L))
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? E.extend(e, s) : s
                }
            }
              , a = {};
            return E.each(o, function(e, t) {
                var n = t[2]
                  , r = t[5];
                s[t[1]] = n.add,
                r && n.add(function() {
                    i = r
                }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock),
                n.add(t[3].fire),
                a[t[0]] = function() {
                    return a[t[0] + "With"](this === a ? void 0 : this, arguments),
                    this
                }
                ,
                a[t[0] + "With"] = n.fireWith
            }),
            s.promise(a),
            e && e.call(a, a),
            a
        },
        when: function(e) {
            function t(t) {
                return function(e) {
                    i[t] = this,
                    o[t] = 1 < arguments.length ? a.call(arguments) : e,
                    --n || s.resolveWith(i, o)
                }
            }
            var n = arguments.length
              , r = n
              , i = Array(r)
              , o = a.call(arguments)
              , s = E.Deferred();
            if (n <= 1 && (M(e, s.done(t(r)).resolve, s.reject, !n),
            "pending" === s.state() || T(o[r] && o[r].then)))
                return s.then();
            for (; r--; )
                M(o[r], t(r), s.reject);
            return s.promise()
        }
    });
    var U = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    E.Deferred.exceptionHook = function(e, t) {
        A.console && A.console.warn && e && U.test(e.name) && A.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
    }
    ,
    E.readyException = function(e) {
        A.setTimeout(function() {
            throw e
        })
    }
    ;
    var q = E.Deferred();
    function H() {
        S.removeEventListener("DOMContentLoaded", H),
        A.removeEventListener("load", H),
        E.ready()
    }
    E.fn.ready = function(e) {
        return q.then(e).catch(function(e) {
            E.readyException(e)
        }),
        this
    }
    ,
    E.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --E.readyWait : E.isReady) || (E.isReady = !0) !== e && 0 < --E.readyWait || q.resolveWith(S, [E])
        }
    }),
    E.ready.then = q.then,
    "complete" === S.readyState || "loading" !== S.readyState && !S.documentElement.doScroll ? A.setTimeout(E.ready) : (S.addEventListener("DOMContentLoaded", H),
    A.addEventListener("load", H));
    var B = function(e, t, n, r, i, o, s) {
        var a = 0
          , u = e.length
          , c = null == n;
        if ("object" === x(n))
            for (a in i = !0,
            n)
                B(e, t, a, n[a], !0, o, s);
        else if (void 0 !== r && (i = !0,
        T(r) || (s = !0),
        c && (t = s ? (t.call(e, r),
        null) : (c = t,
        function(e, t, n) {
            return c.call(E(e), n)
        }
        )),
        t))
            for (; a < u; a++)
                t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
        return i ? e : c ? t.call(e) : u ? t(e[0], n) : o
    }
      , F = /^-ms-/
      , z = /-([a-z])/g;
    function $(e, t) {
        return t.toUpperCase()
    }
    function V(e) {
        return e.replace(F, "ms-").replace(z, $)
    }
    function K(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }
    function X() {
        this.expando = E.expando + X.uid++
    }
    X.uid = 1,
    X.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {},
            K(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))),
            t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t)
                i[V(t)] = n;
            else
                for (r in t)
                    i[V(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][V(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n),
            void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(V) : (t = V(t))in r ? [t] : t.match(W) || []).length;
                    for (; n--; )
                        delete r[t[n]]
                }
                void 0 !== t && !E.isEmptyObject(r) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !E.isEmptyObject(t)
        }
    };
    var G = new X
      , Q = new X
      , J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , Y = /[A-Z]/g;
    function Z(e, t, n) {
        var r, i;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(Y, "-$&").toLowerCase(),
            "string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i)
                } catch (e) {}
                Q.set(e, t, n)
            } else
                n = void 0;
        return n
    }
    E.extend({
        hasData: function(e) {
            return Q.hasData(e) || G.hasData(e)
        },
        data: function(e, t, n) {
            return Q.access(e, t, n)
        },
        removeData: function(e, t) {
            Q.remove(e, t)
        },
        _data: function(e, t, n) {
            return G.access(e, t, n)
        },
        _removeData: function(e, t) {
            G.remove(e, t)
        }
    }),
    E.fn.extend({
        data: function(n, e) {
            var t, r, i, o = this[0], s = o && o.attributes;
            if (void 0 !== n)
                return "object" == typeof n ? this.each(function() {
                    Q.set(this, n)
                }) : B(this, function(e) {
                    var t;
                    if (o && void 0 === e)
                        return void 0 !== (t = Q.get(o, n)) || void 0 !== (t = Z(o, n)) ? t : void 0;
                    this.each(function() {
                        Q.set(this, n, e)
                    })
                }, null, e, 1 < arguments.length, null, !0);
            if (this.length && (i = Q.get(o),
            1 === o.nodeType && !G.get(o, "hasDataAttrs"))) {
                for (t = s.length; t--; )
                    s[t] && 0 === (r = s[t].name).indexOf("data-") && (r = V(r.slice(5)),
                    Z(o, r, i[r]));
                G.set(o, "hasDataAttrs", !0)
            }
            return i
        },
        removeData: function(e) {
            return this.each(function() {
                Q.remove(this, e)
            })
        }
    }),
    E.extend({
        queue: function(e, t, n) {
            var r;
            if (e)
                return t = (t || "fx") + "queue",
                r = G.get(e, t),
                n && (!r || Array.isArray(n) ? r = G.access(e, t, E.makeArray(n)) : r.push(n)),
                r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = E.queue(e, t)
              , r = n.length
              , i = n.shift()
              , o = E._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(),
            r--),
            i && ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(e, function() {
                E.dequeue(e, t)
            }, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return G.get(e, n) || G.access(e, n, {
                empty: E.Callbacks("once memory").add(function() {
                    G.remove(e, [t + "queue", n])
                })
            })
        }
    }),
    E.fn.extend({
        queue: function(t, n) {
            var e = 2;
            return "string" != typeof t && (n = t,
            t = "fx",
            e--),
            arguments.length < e ? E.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                var e = E.queue(this, t, n);
                E._queueHooks(this, t),
                "fx" === t && "inprogress" !== e[0] && E.dequeue(this, t)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                E.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            function n() {
                --i || o.resolveWith(s, [s])
            }
            var r, i = 1, o = E.Deferred(), s = this, a = this.length;
            for ("string" != typeof e && (t = e,
            e = void 0),
            e = e || "fx"; a--; )
                (r = G.get(s[a], e + "queueHooks")) && r.empty && (i++,
                r.empty.add(n));
            return n(),
            o.promise(t)
        }
    });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$","i")
      , ne = ["Top", "Right", "Bottom", "Left"]
      , re = S.documentElement
      , ie = function(e) {
        return E.contains(e.ownerDocument, e)
    }
      , oe = {
        composed: !0
    };
    re.getRootNode && (ie = function(e) {
        return E.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument
    }
    );
    function se(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === E.css(e, "display")
    }
    function ae(e, t, n, r) {
        var i, o, s = 20, a = r ? function() {
            return r.cur()
        }
        : function() {
            return E.css(e, t, "")
        }
        , u = a(), c = n && n[3] || (E.cssNumber[t] ? "" : "px"), l = e.nodeType && (E.cssNumber[t] || "px" !== c && +u) && te.exec(E.css(e, t));
        if (l && l[3] !== c) {
            for (u /= 2,
            c = c || l[3],
            l = +u || 1; s--; )
                E.style(e, t, l + c),
                (1 - o) * (1 - (o = a() / u || .5)) <= 0 && (s = 0),
                l /= o;
            l *= 2,
            E.style(e, t, l + c),
            n = n || []
        }
        return n && (l = +l || +u || 0,
        i = n[1] ? l + (n[1] + 1) * n[2] : +n[2],
        r && (r.unit = c,
        r.start = l,
        r.end = i)),
        i
    }
    var ue = {};
    function ce(e, t) {
        for (var n, r, i, o, s, a, u = [], c = 0, l = e.length; c < l; c++)
            (r = e[c]).style && (n = r.style.display,
            t ? ("none" === n && (u[c] = G.get(r, "display") || null,
            u[c] || (r.style.display = "")),
            "" === r.style.display && se(r) && (u[c] = (a = o = i = void 0,
            o = r.ownerDocument,
            s = r.nodeName,
            (a = ue[s]) || (i = o.body.appendChild(o.createElement(s)),
            a = E.css(i, "display"),
            i.parentNode.removeChild(i),
            "none" === a && (a = "block"),
            ue[s] = a)))) : "none" !== n && (u[c] = "none",
            G.set(r, "display", n)));
        for (c = 0; c < l; c++)
            null != u[c] && (e[c].style.display = u[c]);
        return e
    }
    E.fn.extend({
        show: function() {
            return ce(this, !0)
        },
        hide: function() {
            return ce(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                se(this) ? E(this).show() : E(this).hide()
            })
        }
    });
    var le, fe, pe = /^(?:checkbox|radio)$/i, de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, he = /^$|^module$|\/(?:java|ecma)script/i;
    le = S.createDocumentFragment().appendChild(S.createElement("div")),
    (fe = S.createElement("input")).setAttribute("type", "radio"),
    fe.setAttribute("checked", "checked"),
    fe.setAttribute("name", "t"),
    le.appendChild(fe),
    m.checkClone = le.cloneNode(!0).cloneNode(!0).lastChild.checked,
    le.innerHTML = "<textarea>x</textarea>",
    m.noCloneChecked = !!le.cloneNode(!0).lastChild.defaultValue,
    le.innerHTML = "<option></option>",
    m.option = !!le.lastChild;
    var ve = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    function ye(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
        void 0 === t || t && P(e, t) ? E.merge([e], n) : n
    }
    function ge(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            G.set(e[n], "globalEval", !t || G.get(t[n], "globalEval"))
    }
    ve.tbody = ve.tfoot = ve.colgroup = ve.caption = ve.thead,
    ve.th = ve.td,
    m.option || (ve.optgroup = ve.option = [1, "<select multiple='multiple'>", "</select>"]);
    var me = /<|&#?\w+;/;
    function Te(e, t, n, r, i) {
        for (var o, s, a, u, c, l, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
            if ((o = e[d]) || 0 === o)
                if ("object" === x(o))
                    E.merge(p, o.nodeType ? [o] : o);
                else if (me.test(o)) {
                    for (s = s || f.appendChild(t.createElement("div")),
                    a = (de.exec(o) || ["", ""])[1].toLowerCase(),
                    u = ve[a] || ve._default,
                    s.innerHTML = u[1] + E.htmlPrefilter(o) + u[2],
                    l = u[0]; l--; )
                        s = s.lastChild;
                    E.merge(p, s.childNodes),
                    (s = f.firstChild).textContent = ""
                } else
                    p.push(t.createTextNode(o));
        for (f.textContent = "",
        d = 0; o = p[d++]; )
            if (r && -1 < E.inArray(o, r))
                i && i.push(o);
            else if (c = ie(o),
            s = ye(f.appendChild(o), "script"),
            c && ge(s),
            n)
                for (l = 0; o = s[l++]; )
                    he.test(o.type || "") && n.push(o);
        return f
    }
    var be = /^key/
      , xe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , we = /^([^.]*)(?:\.(.+)|)/;
    function Ae() {
        return !0
    }
    function Se() {
        return !1
    }
    function Ee(e, t) {
        return e === function() {
            try {
                return S.activeElement
            } catch (e) {}
        }() == ("focus" === t)
    }
    function Ce(e, t, n, r, i, o) {
        var s, a;
        if ("object" == typeof t) {
            for (a in "string" != typeof n && (r = r || n,
            n = void 0),
            t)
                Ce(e, a, n, r, t[a], o);
            return e
        }
        if (null == r && null == i ? (i = n,
        r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
        r = void 0) : (i = r,
        r = n,
        n = void 0)),
        !1 === i)
            i = Se;
        else if (!i)
            return e;
        return 1 === o && (s = i,
        (i = function(e) {
            return E().off(e),
            s.apply(this, arguments)
        }
        ).guid = s.guid || (s.guid = E.guid++)),
        e.each(function() {
            E.event.add(this, t, i, r, n)
        })
    }
    function Pe(e, i, o) {
        o ? (G.set(e, i, !1),
        E.event.add(e, i, {
            namespace: !1,
            handler: function(e) {
                var t, n, r = G.get(this, i);
                if (1 & e.isTrigger && this[i]) {
                    if (r.length)
                        (E.event.special[i] || {}).delegateType && e.stopPropagation();
                    else if (r = a.call(arguments),
                    G.set(this, i, r),
                    t = o(this, i),
                    this[i](),
                    r !== (n = G.get(this, i)) || t ? G.set(this, i, !1) : n = {},
                    r !== n)
                        return e.stopImmediatePropagation(),
                        e.preventDefault(),
                        n.value
                } else
                    r.length && (G.set(this, i, {
                        value: E.event.trigger(E.extend(r[0], E.Event.prototype), r.slice(1), this)
                    }),
                    e.stopImmediatePropagation())
            }
        })) : void 0 === G.get(e, i) && E.event.add(e, i, Ae)
    }
    E.event = {
        global: {},
        add: function(t, e, n, r, i) {
            var o, s, a, u, c, l, f, p, d, h, v, y = G.get(t);
            if (K(t))
                for (n.handler && (n = (o = n).handler,
                i = o.selector),
                i && E.find.matchesSelector(re, i),
                n.guid || (n.guid = E.guid++),
                (u = y.events) || (u = y.events = Object.create(null)),
                (s = y.handle) || (s = y.handle = function(e) {
                    return void 0 !== E && E.event.triggered !== e.type ? E.event.dispatch.apply(t, arguments) : void 0
                }
                ),
                c = (e = (e || "").match(W) || [""]).length; c--; )
                    d = v = (a = we.exec(e[c]) || [])[1],
                    h = (a[2] || "").split(".").sort(),
                    d && (f = E.event.special[d] || {},
                    d = (i ? f.delegateType : f.bindType) || d,
                    f = E.event.special[d] || {},
                    l = E.extend({
                        type: d,
                        origType: v,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && E.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, o),
                    (p = u[d]) || ((p = u[d] = []).delegateCount = 0,
                    f.setup && !1 !== f.setup.call(t, r, h, s) || t.addEventListener && t.addEventListener(d, s)),
                    f.add && (f.add.call(t, l),
                    l.handler.guid || (l.handler.guid = n.guid)),
                    i ? p.splice(p.delegateCount++, 0, l) : p.push(l),
                    E.event.global[d] = !0)
        },
        remove: function(e, t, n, r, i) {
            var o, s, a, u, c, l, f, p, d, h, v, y = G.hasData(e) && G.get(e);
            if (y && (u = y.events)) {
                for (c = (t = (t || "").match(W) || [""]).length; c--; )
                    if (d = v = (a = we.exec(t[c]) || [])[1],
                    h = (a[2] || "").split(".").sort(),
                    d) {
                        for (f = E.event.special[d] || {},
                        p = u[d = (r ? f.delegateType : f.bindType) || d] || [],
                        a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        s = o = p.length; o--; )
                            l = p[o],
                            !i && v !== l.origType || n && n.guid !== l.guid || a && !a.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (p.splice(o, 1),
                            l.selector && p.delegateCount--,
                            f.remove && f.remove.call(e, l));
                        s && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, y.handle) || E.removeEvent(e, d, y.handle),
                        delete u[d])
                    } else
                        for (d in u)
                            E.event.remove(e, d + t[c], n, r, !0);
                E.isEmptyObject(u) && G.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, s, a = new Array(arguments.length), u = E.event.fix(e), c = (G.get(this, "events") || Object.create(null))[u.type] || [], l = E.event.special[u.type] || {};
            for (a[0] = u,
            t = 1; t < arguments.length; t++)
                a[t] = arguments[t];
            if (u.delegateTarget = this,
            !l.preDispatch || !1 !== l.preDispatch.call(this, u)) {
                for (s = E.event.handlers.call(this, u, c),
                t = 0; (i = s[t++]) && !u.isPropagationStopped(); )
                    for (u.currentTarget = i.elem,
                    n = 0; (o = i.handlers[n++]) && !u.isImmediatePropagationStopped(); )
                        u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o,
                        u.data = o.data,
                        void 0 !== (r = ((E.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a)) && !1 === (u.result = r) && (u.preventDefault(),
                        u.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, u),
                u.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, s, a = [], u = t.delegateCount, c = e.target;
            if (u && c.nodeType && !("click" === e.type && 1 <= e.button))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                        for (o = [],
                        s = {},
                        n = 0; n < u; n++)
                            void 0 === s[i = (r = t[n]).selector + " "] && (s[i] = r.needsContext ? -1 < E(i, this).index(c) : E.find(i, this, null, [c]).length),
                            s[i] && o.push(r);
                        o.length && a.push({
                            elem: c,
                            handlers: o
                        })
                    }
            return c = this,
            u < t.length && a.push({
                elem: c,
                handlers: t.slice(u)
            }),
            a
        },
        addProp: function(t, e) {
            Object.defineProperty(E.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: T(e) ? function() {
                    if (this.originalEvent)
                        return e(this.originalEvent)
                }
                : function() {
                    if (this.originalEvent)
                        return this.originalEvent[t]
                }
                ,
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(e) {
            return e[E.expando] ? e : new E.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && P(t, "input") && Pe(t, "click", Ae),
                    !1
                },
                trigger: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && P(t, "input") && Pe(t, "click"),
                    !0
                },
                _default: function(e) {
                    var t = e.target;
                    return pe.test(t.type) && t.click && P(t, "input") && G.get(t, "click") || P(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    },
    E.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }
    ,
    E.Event = function(e, t) {
        if (!(this instanceof E.Event))
            return new E.Event(e,t);
        e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ae : Se,
        this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target,
        this.currentTarget = e.currentTarget,
        this.relatedTarget = e.relatedTarget) : this.type = e,
        t && E.extend(this, t),
        this.timeStamp = e && e.timeStamp || Date.now(),
        this[E.expando] = !0
    }
    ,
    E.Event.prototype = {
        constructor: E.Event,
        isDefaultPrevented: Se,
        isPropagationStopped: Se,
        isImmediatePropagationStopped: Se,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = Ae,
            e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = Ae,
            e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = Ae,
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    E.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && be.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && xe.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, E.event.addProp),
    E.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        E.event.special[e] = {
            setup: function() {
                return Pe(this, e, Ee),
                !1
            },
            trigger: function() {
                return Pe(this, e),
                !0
            },
            delegateType: t
        }
    }),
    E.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, i) {
        E.event.special[e] = {
            delegateType: i,
            bindType: i,
            handle: function(e) {
                var t, n = e.relatedTarget, r = e.handleObj;
                return n && (n === this || E.contains(this, n)) || (e.type = r.origType,
                t = r.handler.apply(this, arguments),
                e.type = i),
                t
            }
        }
    }),
    E.fn.extend({
        on: function(e, t, n, r) {
            return Ce(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return Ce(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)
                return r = e.handleObj,
                E(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                this;
            if ("object" != typeof e)
                return !1 !== t && "function" != typeof t || (n = t,
                t = void 0),
                !1 === n && (n = Se),
                this.each(function() {
                    E.event.remove(this, e, n, t)
                });
            for (i in e)
                this.off(i, t, e[i]);
            return this
        }
    });
    var ke = /<script|<style|<link/i
      , Ne = /checked\s*(?:[^=]|=\s*.checked.)/i
      , De = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function _e(e, t) {
        return P(e, "table") && P(11 !== t.nodeType ? t : t.firstChild, "tr") && E(e).children("tbody")[0] || e
    }
    function Oe(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
        e
    }
    function Re(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"),
        e
    }
    function je(e, t) {
        var n, r, i, o, s, a;
        if (1 === t.nodeType) {
            if (G.hasData(e) && (a = G.get(e).events))
                for (i in G.remove(t, "handle events"),
                a)
                    for (n = 0,
                    r = a[i].length; n < r; n++)
                        E.event.add(t, i, a[i][n]);
            Q.hasData(e) && (o = Q.access(e),
            s = E.extend({}, o),
            Q.set(t, s))
        }
    }
    function We(n, r, i, o) {
        r = y(r);
        var e, t, s, a, u, c, l = 0, f = n.length, p = f - 1, d = r[0], h = T(d);
        if (h || 1 < f && "string" == typeof d && !m.checkClone && Ne.test(d))
            return n.each(function(e) {
                var t = n.eq(e);
                h && (r[0] = d.call(this, e, t.html())),
                We(t, r, i, o)
            });
        if (f && (t = (e = Te(r, n[0].ownerDocument, !1, n, o)).firstChild,
        1 === e.childNodes.length && (e = t),
        t || o)) {
            for (a = (s = E.map(ye(e, "script"), Oe)).length; l < f; l++)
                u = e,
                l !== p && (u = E.clone(u, !0, !0),
                a && E.merge(s, ye(u, "script"))),
                i.call(n[l], u, l);
            if (a)
                for (c = s[s.length - 1].ownerDocument,
                E.map(s, Re),
                l = 0; l < a; l++)
                    u = s[l],
                    he.test(u.type || "") && !G.access(u, "globalEval") && E.contains(c, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? E._evalUrl && !u.noModule && E._evalUrl(u.src, {
                        nonce: u.nonce || u.getAttribute("nonce")
                    }, c) : b(u.textContent.replace(De, ""), u, c))
        }
        return n
    }
    function Ie(e, t, n) {
        for (var r, i = t ? E.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
            n || 1 !== r.nodeType || E.cleanData(ye(r)),
            r.parentNode && (n && ie(r) && ge(ye(r, "script")),
            r.parentNode.removeChild(r));
        return e
    }
    E.extend({
        htmlPrefilter: function(e) {
            return e
        },
        clone: function(e, t, n) {
            var r, i, o, s, a, u, c, l = e.cloneNode(!0), f = ie(e);
            if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || E.isXMLDoc(e)))
                for (s = ye(l),
                r = 0,
                i = (o = ye(e)).length; r < i; r++)
                    a = o[r],
                    "input" === (c = (u = s[r]).nodeName.toLowerCase()) && pe.test(a.type) ? u.checked = a.checked : "input" !== c && "textarea" !== c || (u.defaultValue = a.defaultValue);
            if (t)
                if (n)
                    for (o = o || ye(e),
                    s = s || ye(l),
                    r = 0,
                    i = o.length; r < i; r++)
                        je(o[r], s[r]);
                else
                    je(e, l);
            return 0 < (s = ye(l, "script")).length && ge(s, !f && ye(e, "script")),
            l
        },
        cleanData: function(e) {
            for (var t, n, r, i = E.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (K(n)) {
                    if (t = n[G.expando]) {
                        if (t.events)
                            for (r in t.events)
                                i[r] ? E.event.remove(n, r) : E.removeEvent(n, r, t.handle);
                        n[G.expando] = void 0
                    }
                    n[Q.expando] && (n[Q.expando] = void 0)
                }
        }
    }),
    E.fn.extend({
        detach: function(e) {
            return Ie(this, e, !0)
        },
        remove: function(e) {
            return Ie(this, e)
        },
        text: function(e) {
            return B(this, function(e) {
                return void 0 === e ? E.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return We(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || _e(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return We(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = _e(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return We(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return We(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                1 === e.nodeType && (E.cleanData(ye(e, !1)),
                e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e,
            t = null == t ? e : t,
            this.map(function() {
                return E.clone(this, e, t)
            })
        },
        html: function(e) {
            return B(this, function(e) {
                var t = this[0] || {}
                  , n = 0
                  , r = this.length;
                if (void 0 === e && 1 === t.nodeType)
                    return t.innerHTML;
                if ("string" == typeof e && !ke.test(e) && !ve[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = E.htmlPrefilter(e);
                    try {
                        for (; n < r; n++)
                            1 === (t = this[n] || {}).nodeType && (E.cleanData(ye(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var n = [];
            return We(this, arguments, function(e) {
                var t = this.parentNode;
                E.inArray(this, n) < 0 && (E.cleanData(ye(this)),
                t && t.replaceChild(e, this))
            }, n)
        }
    }),
    E.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, s) {
        E.fn[e] = function(e) {
            for (var t, n = [], r = E(e), i = r.length - 1, o = 0; o <= i; o++)
                t = o === i ? this : this.clone(!0),
                E(r[o])[s](t),
                u.apply(n, t.get());
            return this.pushStack(n)
        }
    });
    function Le(e, t, n) {
        var r, i, o = {};
        for (i in t)
            o[i] = e.style[i],
            e.style[i] = t[i];
        for (i in r = n.call(e),
        t)
            e.style[i] = o[i];
        return r
    }
    var Me, Ue, qe, He, Be, Fe, ze, $e, Ve = new RegExp("^(" + ee + ")(?!px)[a-z%]+$","i"), Ke = function(e) {
        var t = e.ownerDocument.defaultView;
        return t && t.opener || (t = A),
        t.getComputedStyle(e)
    }, Xe = new RegExp(ne.join("|"),"i");
    function Ge(e, t, n) {
        var r, i, o, s, a = e.style;
        return (n = n || Ke(e)) && ("" !== (s = n.getPropertyValue(t) || n[t]) || ie(e) || (s = E.style(e, t)),
        !m.pixelBoxStyles() && Ve.test(s) && Xe.test(t) && (r = a.width,
        i = a.minWidth,
        o = a.maxWidth,
        a.minWidth = a.maxWidth = a.width = s,
        s = n.width,
        a.width = r,
        a.minWidth = i,
        a.maxWidth = o)),
        void 0 !== s ? s + "" : s
    }
    function Qe(e, t) {
        return {
            get: function() {
                if (!e())
                    return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }
    function Je() {
        if ($e) {
            ze.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
            $e.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
            re.appendChild(ze).appendChild($e);
            var e = A.getComputedStyle($e);
            Me = "1%" !== e.top,
            Fe = 12 === Ye(e.marginLeft),
            $e.style.right = "60%",
            He = 36 === Ye(e.right),
            Ue = 36 === Ye(e.width),
            $e.style.position = "absolute",
            qe = 12 === Ye($e.offsetWidth / 3),
            re.removeChild(ze),
            $e = null
        }
    }
    function Ye(e) {
        return Math.round(parseFloat(e))
    }
    ze = S.createElement("div"),
    ($e = S.createElement("div")).style && ($e.style.backgroundClip = "content-box",
    $e.cloneNode(!0).style.backgroundClip = "",
    m.clearCloneStyle = "content-box" === $e.style.backgroundClip,
    E.extend(m, {
        boxSizingReliable: function() {
            return Je(),
            Ue
        },
        pixelBoxStyles: function() {
            return Je(),
            He
        },
        pixelPosition: function() {
            return Je(),
            Me
        },
        reliableMarginLeft: function() {
            return Je(),
            Fe
        },
        scrollboxSize: function() {
            return Je(),
            qe
        },
        reliableTrDimensions: function() {
            var e, t, n, r;
            return null == Be && (e = S.createElement("table"),
            t = S.createElement("tr"),
            n = S.createElement("div"),
            e.style.cssText = "position:absolute;left:-11111px",
            t.style.height = "1px",
            n.style.height = "9px",
            re.appendChild(e).appendChild(t).appendChild(n),
            r = A.getComputedStyle(t),
            Be = 3 < parseInt(r.height),
            re.removeChild(e)),
            Be
        }
    }));
    var Ze = ["Webkit", "Moz", "ms"]
      , et = S.createElement("div").style
      , tt = {};
    function nt(e) {
        return E.cssProps[e] || tt[e] || (e in et ? e : tt[e] = function(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = Ze.length; n--; )
                if ((e = Ze[n] + t)in et)
                    return e
        }(e) || e)
    }
    var rt = /^(none|table(?!-c[ea]).+)/
      , it = /^--/
      , ot = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , st = {
        letterSpacing: "0",
        fontWeight: "400"
    };
    function at(e, t, n) {
        var r = te.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }
    function ut(e, t, n, r, i, o) {
        var s = "width" === t ? 1 : 0
          , a = 0
          , u = 0;
        if (n === (r ? "border" : "content"))
            return 0;
        for (; s < 4; s += 2)
            "margin" === n && (u += E.css(e, n + ne[s], !0, i)),
            r ? ("content" === n && (u -= E.css(e, "padding" + ne[s], !0, i)),
            "margin" !== n && (u -= E.css(e, "border" + ne[s] + "Width", !0, i))) : (u += E.css(e, "padding" + ne[s], !0, i),
            "padding" !== n ? u += E.css(e, "border" + ne[s] + "Width", !0, i) : a += E.css(e, "border" + ne[s] + "Width", !0, i));
        return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - a - .5)) || 0),
        u
    }
    function ct(e, t, n) {
        var r = Ke(e)
          , i = (!m.boxSizingReliable() || n) && "border-box" === E.css(e, "boxSizing", !1, r)
          , o = i
          , s = Ge(e, t, r)
          , a = "offset" + t[0].toUpperCase() + t.slice(1);
        if (Ve.test(s)) {
            if (!n)
                return s;
            s = "auto"
        }
        return (!m.boxSizingReliable() && i || !m.reliableTrDimensions() && P(e, "tr") || "auto" === s || !parseFloat(s) && "inline" === E.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === E.css(e, "boxSizing", !1, r),
        (o = a in e) && (s = e[a])),
        (s = parseFloat(s) || 0) + ut(e, t, n || (i ? "border" : "content"), o, r, s) + "px"
    }
    function lt(e, t, n, r, i) {
        return new lt.prototype.init(e,t,n,r,i)
    }
    E.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Ge(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, s, a = V(t), u = it.test(t), c = e.style;
                if (u || (t = nt(a)),
                s = E.cssHooks[t] || E.cssHooks[a],
                void 0 === n)
                    return s && "get"in s && void 0 !== (i = s.get(e, !1, r)) ? i : c[t];
                "string" == (o = typeof n) && (i = te.exec(n)) && i[1] && (n = ae(e, t, i),
                o = "number"),
                null != n && n == n && ("number" !== o || u || (n += i && i[3] || (E.cssNumber[a] ? "" : "px")),
                m.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"),
                s && "set"in s && void 0 === (n = s.set(e, n, r)) || (u ? c.setProperty(t, n) : c[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i, o, s, a = V(t);
            return it.test(t) || (t = nt(a)),
            (s = E.cssHooks[t] || E.cssHooks[a]) && "get"in s && (i = s.get(e, !0, n)),
            void 0 === i && (i = Ge(e, t, r)),
            "normal" === i && t in st && (i = st[t]),
            "" === n || n ? (o = parseFloat(i),
            !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }),
    E.each(["height", "width"], function(e, u) {
        E.cssHooks[u] = {
            get: function(e, t, n) {
                if (t)
                    return !rt.test(E.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? ct(e, u, n) : Le(e, ot, function() {
                        return ct(e, u, n)
                    })
            },
            set: function(e, t, n) {
                var r, i = Ke(e), o = !m.scrollboxSize() && "absolute" === i.position, s = (o || n) && "border-box" === E.css(e, "boxSizing", !1, i), a = n ? ut(e, u, n, s, i) : 0;
                return s && o && (a -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - ut(e, u, "border", !1, i) - .5)),
                a && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t,
                t = E.css(e, u)),
                at(0, t, a)
            }
        }
    }),
    E.cssHooks.marginLeft = Qe(m.reliableMarginLeft, function(e, t) {
        if (t)
            return (parseFloat(Ge(e, "marginLeft")) || e.getBoundingClientRect().left - Le(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
    }),
    E.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(i, o) {
        E.cssHooks[i + o] = {
            expand: function(e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++)
                    n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
                return n
            }
        },
        "margin" !== i && (E.cssHooks[i + o].set = at)
    }),
    E.fn.extend({
        css: function(e, t) {
            return B(this, function(e, t, n) {
                var r, i, o = {}, s = 0;
                if (Array.isArray(t)) {
                    for (r = Ke(e),
                    i = t.length; s < i; s++)
                        o[t[s]] = E.css(e, t[s], !1, r);
                    return o
                }
                return void 0 !== n ? E.style(e, t, n) : E.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }),
    ((E.Tween = lt).prototype = {
        constructor: lt,
        init: function(e, t, n, r, i, o) {
            this.elem = e,
            this.prop = n,
            this.easing = i || E.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = o || (E.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = lt.propHooks[this.prop];
            return e && e.get ? e.get(this) : lt.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = lt.propHooks[this.prop];
            return this.options.duration ? this.pos = t = E.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : lt.propHooks._default.set(this),
            this
        }
    }).init.prototype = lt.prototype,
    (lt.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = E.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                E.fx.step[e.prop] ? E.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !E.cssHooks[e.prop] && null == e.elem.style[nt(e.prop)] ? e.elem[e.prop] = e.now : E.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = lt.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    E.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    },
    E.fx = lt.prototype.init,
    E.fx.step = {};
    var ft, pt, dt, ht, vt = /^(?:toggle|show|hide)$/, yt = /queueHooks$/;
    function gt() {
        pt && (!1 === S.hidden && A.requestAnimationFrame ? A.requestAnimationFrame(gt) : A.setTimeout(gt, E.fx.interval),
        E.fx.tick())
    }
    function mt() {
        return A.setTimeout(function() {
            ft = void 0
        }),
        ft = Date.now()
    }
    function Tt(e, t) {
        var n, r = 0, i = {
            height: e
        };
        for (t = t ? 1 : 0; r < 4; r += 2 - t)
            i["margin" + (n = ne[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function bt(e, t, n) {
        for (var r, i = (xt.tweeners[t] || []).concat(xt.tweeners["*"]), o = 0, s = i.length; o < s; o++)
            if (r = i[o].call(n, t, e))
                return r
    }
    function xt(o, e, t) {
        var n, s, r = 0, i = xt.prefilters.length, a = E.Deferred().always(function() {
            delete u.elem
        }), u = function() {
            if (s)
                return !1;
            for (var e = ft || mt(), t = Math.max(0, c.startTime + c.duration - e), n = 1 - (t / c.duration || 0), r = 0, i = c.tweens.length; r < i; r++)
                c.tweens[r].run(n);
            return a.notifyWith(o, [c, n, t]),
            n < 1 && i ? t : (i || a.notifyWith(o, [c, 1, 0]),
            a.resolveWith(o, [c]),
            !1)
        }, c = a.promise({
            elem: o,
            props: E.extend({}, e),
            opts: E.extend(!0, {
                specialEasing: {},
                easing: E.easing._default
            }, t),
            originalProperties: e,
            originalOptions: t,
            startTime: ft || mt(),
            duration: t.duration,
            tweens: [],
            createTween: function(e, t) {
                var n = E.Tween(o, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing);
                return c.tweens.push(n),
                n
            },
            stop: function(e) {
                var t = 0
                  , n = e ? c.tweens.length : 0;
                if (s)
                    return this;
                for (s = !0; t < n; t++)
                    c.tweens[t].run(1);
                return e ? (a.notifyWith(o, [c, 1, 0]),
                a.resolveWith(o, [c, e])) : a.rejectWith(o, [c, e]),
                this
            }
        }), l = c.props;
        for (function(e, t) {
            var n, r, i, o, s;
            for (n in e)
                if (i = t[r = V(n)],
                o = e[n],
                Array.isArray(o) && (i = o[1],
                o = e[n] = o[0]),
                n !== r && (e[r] = o,
                delete e[n]),
                (s = E.cssHooks[r]) && "expand"in s)
                    for (n in o = s.expand(o),
                    delete e[r],
                    o)
                        n in e || (e[n] = o[n],
                        t[n] = i);
                else
                    t[r] = i
        }(l, c.opts.specialEasing); r < i; r++)
            if (n = xt.prefilters[r].call(c, o, l, c.opts))
                return T(n.stop) && (E._queueHooks(c.elem, c.opts.queue).stop = n.stop.bind(n)),
                n;
        return E.map(l, bt, c),
        T(c.opts.start) && c.opts.start.call(o, c),
        c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always),
        E.fx.timer(E.extend(u, {
            elem: o,
            anim: c,
            queue: c.opts.queue
        })),
        c
    }
    E.Animation = E.extend(xt, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return ae(n.elem, e, te.exec(t), n),
                n
            }
            ]
        },
        tweener: function(e, t) {
            for (var n, r = 0, i = (e = T(e) ? (t = e,
            ["*"]) : e.match(W)).length; r < i; r++)
                n = e[r],
                xt.tweeners[n] = xt.tweeners[n] || [],
                xt.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var r, i, o, s, a, u, c, l, f = "width"in t || "height"in t, p = this, d = {}, h = e.style, v = e.nodeType && se(e), y = G.get(e, "fxshow");
            for (r in n.queue || (null == (s = E._queueHooks(e, "fx")).unqueued && (s.unqueued = 0,
            a = s.empty.fire,
            s.empty.fire = function() {
                s.unqueued || a()
            }
            ),
            s.unqueued++,
            p.always(function() {
                p.always(function() {
                    s.unqueued--,
                    E.queue(e, "fx").length || s.empty.fire()
                })
            })),
            t)
                if (i = t[r],
                vt.test(i)) {
                    if (delete t[r],
                    o = o || "toggle" === i,
                    i === (v ? "hide" : "show")) {
                        if ("show" !== i || !y || void 0 === y[r])
                            continue;
                        v = !0
                    }
                    d[r] = y && y[r] || E.style(e, r)
                }
            if ((u = !E.isEmptyObject(t)) || !E.isEmptyObject(d))
                for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY],
                null == (c = y && y.display) && (c = G.get(e, "display")),
                "none" === (l = E.css(e, "display")) && (c ? l = c : (ce([e], !0),
                c = e.style.display || c,
                l = E.css(e, "display"),
                ce([e]))),
                ("inline" === l || "inline-block" === l && null != c) && "none" === E.css(e, "float") && (u || (p.done(function() {
                    h.display = c
                }),
                null == c && (l = h.display,
                c = "none" === l ? "" : l)),
                h.display = "inline-block")),
                n.overflow && (h.overflow = "hidden",
                p.always(function() {
                    h.overflow = n.overflow[0],
                    h.overflowX = n.overflow[1],
                    h.overflowY = n.overflow[2]
                })),
                u = !1,
                d)
                    u || (y ? "hidden"in y && (v = y.hidden) : y = G.access(e, "fxshow", {
                        display: c
                    }),
                    o && (y.hidden = !v),
                    v && ce([e], !0),
                    p.done(function() {
                        for (r in v || ce([e]),
                        G.remove(e, "fxshow"),
                        d)
                            E.style(e, r, d[r])
                    })),
                    u = bt(v ? y[r] : 0, r, p),
                    r in y || (y[r] = u.start,
                    v && (u.end = u.start,
                    u.start = 0))
        }
        ],
        prefilter: function(e, t) {
            t ? xt.prefilters.unshift(e) : xt.prefilters.push(e)
        }
    }),
    E.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? E.extend({}, e) : {
            complete: n || !n && t || T(e) && e,
            duration: e,
            easing: n && t || t && !T(t) && t
        };
        return E.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in E.fx.speeds ? r.duration = E.fx.speeds[r.duration] : r.duration = E.fx.speeds._default),
        null != r.queue && !0 !== r.queue || (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
            T(r.old) && r.old.call(this),
            r.queue && E.dequeue(this, r.queue)
        }
        ,
        r
    }
    ,
    E.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(se).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(t, e, n, r) {
            function i() {
                var e = xt(this, E.extend({}, t), s);
                (o || G.get(this, "finish")) && e.stop(!0)
            }
            var o = E.isEmptyObject(t)
              , s = E.speed(e, n, r);
            return i.finish = i,
            o || !1 === s.queue ? this.each(i) : this.queue(s.queue, i)
        },
        stop: function(i, e, o) {
            function s(e) {
                var t = e.stop;
                delete e.stop,
                t(o)
            }
            return "string" != typeof i && (o = e,
            e = i,
            i = void 0),
            e && this.queue(i || "fx", []),
            this.each(function() {
                var e = !0
                  , t = null != i && i + "queueHooks"
                  , n = E.timers
                  , r = G.get(this);
                if (t)
                    r[t] && r[t].stop && s(r[t]);
                else
                    for (t in r)
                        r[t] && r[t].stop && yt.test(t) && s(r[t]);
                for (t = n.length; t--; )
                    n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o),
                    e = !1,
                    n.splice(t, 1));
                !e && o || E.dequeue(this, i)
            })
        },
        finish: function(s) {
            return !1 !== s && (s = s || "fx"),
            this.each(function() {
                var e, t = G.get(this), n = t[s + "queue"], r = t[s + "queueHooks"], i = E.timers, o = n ? n.length : 0;
                for (t.finish = !0,
                E.queue(this, s, []),
                r && r.stop && r.stop.call(this, !0),
                e = i.length; e--; )
                    i[e].elem === this && i[e].queue === s && (i[e].anim.stop(!0),
                    i.splice(e, 1));
                for (e = 0; e < o; e++)
                    n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }),
    E.each(["toggle", "show", "hide"], function(e, r) {
        var i = E.fn[r];
        E.fn[r] = function(e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(Tt(r, !0), e, t, n)
        }
    }),
    E.each({
        slideDown: Tt("show"),
        slideUp: Tt("hide"),
        slideToggle: Tt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, r) {
        E.fn[e] = function(e, t, n) {
            return this.animate(r, e, t, n)
        }
    }),
    E.timers = [],
    E.fx.tick = function() {
        var e, t = 0, n = E.timers;
        for (ft = Date.now(); t < n.length; t++)
            (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || E.fx.stop(),
        ft = void 0
    }
    ,
    E.fx.timer = function(e) {
        E.timers.push(e),
        E.fx.start()
    }
    ,
    E.fx.interval = 13,
    E.fx.start = function() {
        pt || (pt = !0,
        gt())
    }
    ,
    E.fx.stop = function() {
        pt = null
    }
    ,
    E.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    E.fn.delay = function(r, e) {
        return r = E.fx && E.fx.speeds[r] || r,
        e = e || "fx",
        this.queue(e, function(e, t) {
            var n = A.setTimeout(e, r);
            t.stop = function() {
                A.clearTimeout(n)
            }
        })
    }
    ,
    dt = S.createElement("input"),
    ht = S.createElement("select").appendChild(S.createElement("option")),
    dt.type = "checkbox",
    m.checkOn = "" !== dt.value,
    m.optSelected = ht.selected,
    (dt = S.createElement("input")).value = "t",
    dt.type = "radio",
    m.radioValue = "t" === dt.value;
    var wt, At = E.expr.attrHandle;
    E.fn.extend({
        attr: function(e, t) {
            return B(this, E.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                E.removeAttr(this, e)
            })
        }
    }),
    E.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return void 0 === e.getAttribute ? E.prop(e, t, n) : (1 === o && E.isXMLDoc(e) || (i = E.attrHooks[t.toLowerCase()] || (E.expr.match.bool.test(t) ? wt : void 0)),
                void 0 !== n ? null === n ? void E.removeAttr(e, t) : i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                n) : !(i && "get"in i && null !== (r = i.get(e, t))) && null == (r = E.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!m.radioValue && "radio" === t && P(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0, i = t && t.match(W);
            if (i && 1 === e.nodeType)
                for (; n = i[r++]; )
                    e.removeAttribute(n)
        }
    }),
    wt = {
        set: function(e, t, n) {
            return !1 === t ? E.removeAttr(e, n) : e.setAttribute(n, n),
            n
        }
    },
    E.each(E.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var s = At[t] || E.find.attr;
        At[t] = function(e, t, n) {
            var r, i, o = t.toLowerCase();
            return n || (i = At[o],
            At[o] = r,
            r = null != s(e, t, n) ? o : null,
            At[o] = i),
            r
        }
    });
    var St = /^(?:input|select|textarea|button)$/i
      , Et = /^(?:a|area)$/i;
    function Ct(e) {
        return (e.match(W) || []).join(" ")
    }
    function Pt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    function kt(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(W) || []
    }
    E.fn.extend({
        prop: function(e, t) {
            return B(this, E.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[E.propFix[e] || e]
            })
        }
    }),
    E.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return 1 === o && E.isXMLDoc(e) || (t = E.propFix[t] || t,
                i = E.propHooks[t]),
                void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = E.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : St.test(e.nodeName) || Et.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }),
    m.optSelected || (E.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    E.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        E.propFix[this.toLowerCase()] = this
    }),
    E.fn.extend({
        addClass: function(t) {
            var e, n, r, i, o, s, a, u = 0;
            if (T(t))
                return this.each(function(e) {
                    E(this).addClass(t.call(this, e, Pt(this)))
                });
            if ((e = kt(t)).length)
                for (; n = this[u++]; )
                    if (i = Pt(n),
                    r = 1 === n.nodeType && " " + Ct(i) + " ") {
                        for (s = 0; o = e[s++]; )
                            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (a = Ct(r)) && n.setAttribute("class", a)
                    }
            return this
        },
        removeClass: function(t) {
            var e, n, r, i, o, s, a, u = 0;
            if (T(t))
                return this.each(function(e) {
                    E(this).removeClass(t.call(this, e, Pt(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ((e = kt(t)).length)
                for (; n = this[u++]; )
                    if (i = Pt(n),
                    r = 1 === n.nodeType && " " + Ct(i) + " ") {
                        for (s = 0; o = e[s++]; )
                            for (; -1 < r.indexOf(" " + o + " "); )
                                r = r.replace(" " + o + " ", " ");
                        i !== (a = Ct(r)) && n.setAttribute("class", a)
                    }
            return this
        },
        toggleClass: function(i, t) {
            var o = typeof i
              , s = "string" == o || Array.isArray(i);
            return "boolean" == typeof t && s ? t ? this.addClass(i) : this.removeClass(i) : T(i) ? this.each(function(e) {
                E(this).toggleClass(i.call(this, e, Pt(this), t), t)
            }) : this.each(function() {
                var e, t, n, r;
                if (s)
                    for (t = 0,
                    n = E(this),
                    r = kt(i); e = r[t++]; )
                        n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                else
                    void 0 !== i && "boolean" != o || ((e = Pt(this)) && G.set(this, "__className__", e),
                    this.setAttribute && this.setAttribute("class", !e && !1 !== i && G.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++]; )
                if (1 === n.nodeType && -1 < (" " + Ct(Pt(n)) + " ").indexOf(t))
                    return !0;
            return !1
        }
    });
    var Nt = /\r/g;
    E.fn.extend({
        val: function(n) {
            var r, e, i, t = this[0];
            return arguments.length ? (i = T(n),
            this.each(function(e) {
                var t;
                1 === this.nodeType && (null == (t = i ? n.call(this, e, E(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = E.map(t, function(e) {
                    return null == e ? "" : e + ""
                })),
                (r = E.valHooks[this.type] || E.valHooks[this.nodeName.toLowerCase()]) && "set"in r && void 0 !== r.set(this, t, "value") || (this.value = t))
            })) : t ? (r = E.valHooks[t.type] || E.valHooks[t.nodeName.toLowerCase()]) && "get"in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(Nt, "") : null == e ? "" : e : void 0
        }
    }),
    E.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = E.find.attr(e, "value");
                    return null != t ? t : Ct(E.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options, o = e.selectedIndex, s = "select-one" === e.type, a = s ? null : [], u = s ? o + 1 : i.length;
                    for (r = o < 0 ? u : s ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !P(n.parentNode, "optgroup"))) {
                            if (t = E(n).val(),
                            s)
                                return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = E.makeArray(t), s = i.length; s--; )
                        ((r = i[s]).selected = -1 < E.inArray(E.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1),
                    o
                }
            }
        }
    }),
    E.each(["radio", "checkbox"], function() {
        E.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t))
                    return e.checked = -1 < E.inArray(E(e).val(), t)
            }
        },
        m.checkOn || (E.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    }),
    m.focusin = "onfocusin"in A;
    function Dt(e) {
        e.stopPropagation()
    }
    var _t = /^(?:focusinfocus|focusoutblur)$/;
    E.extend(E.event, {
        trigger: function(e, t, n, r) {
            var i, o, s, a, u, c, l, f, p = [n || S], d = g.call(e, "type") ? e.type : e, h = g.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = f = s = n = n || S,
            3 !== n.nodeType && 8 !== n.nodeType && !_t.test(d + E.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(),
            h.sort()),
            u = d.indexOf(":") < 0 && "on" + d,
            (e = e[E.expando] ? e : new E.Event(d,"object" == typeof e && e)).isTrigger = r ? 2 : 3,
            e.namespace = h.join("."),
            e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            e.result = void 0,
            e.target || (e.target = n),
            t = null == t ? [e] : E.makeArray(t, [e]),
            l = E.event.special[d] || {},
            r || !l.trigger || !1 !== l.trigger.apply(n, t))) {
                if (!r && !l.noBubble && !v(n)) {
                    for (a = l.delegateType || d,
                    _t.test(a + d) || (o = o.parentNode); o; o = o.parentNode)
                        p.push(o),
                        s = o;
                    s === (n.ownerDocument || S) && p.push(s.defaultView || s.parentWindow || A)
                }
                for (i = 0; (o = p[i++]) && !e.isPropagationStopped(); )
                    f = o,
                    e.type = 1 < i ? a : l.bindType || d,
                    (c = (G.get(o, "events") || Object.create(null))[e.type] && G.get(o, "handle")) && c.apply(o, t),
                    (c = u && o[u]) && c.apply && K(o) && (e.result = c.apply(o, t),
                    !1 === e.result && e.preventDefault());
                return e.type = d,
                r || e.isDefaultPrevented() || l._default && !1 !== l._default.apply(p.pop(), t) || !K(n) || u && T(n[d]) && !v(n) && ((s = n[u]) && (n[u] = null),
                E.event.triggered = d,
                e.isPropagationStopped() && f.addEventListener(d, Dt),
                n[d](),
                e.isPropagationStopped() && f.removeEventListener(d, Dt),
                E.event.triggered = void 0,
                s && (n[u] = s)),
                e.result
            }
        },
        simulate: function(e, t, n) {
            var r = E.extend(new E.Event, n, {
                type: e,
                isSimulated: !0
            });
            E.event.trigger(r, null, t)
        }
    }),
    E.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                E.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n)
                return E.event.trigger(e, t, n, !0)
        }
    }),
    m.focusin || E.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, r) {
        function i(e) {
            E.event.simulate(r, e.target, E.event.fix(e))
        }
        E.event.special[r] = {
            setup: function() {
                var e = this.ownerDocument || this.document || this
                  , t = G.access(e, r);
                t || e.addEventListener(n, i, !0),
                G.access(e, r, (t || 0) + 1)
            },
            teardown: function() {
                var e = this.ownerDocument || this.document || this
                  , t = G.access(e, r) - 1;
                t ? G.access(e, r, t) : (e.removeEventListener(n, i, !0),
                G.remove(e, r))
            }
        }
    });
    var Ot = A.location
      , Rt = {
        guid: Date.now()
    }
      , jt = /\?/;
    E.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e)
            return null;
        try {
            t = (new A.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {
            t = void 0
        }
        return t && !t.getElementsByTagName("parsererror").length || E.error("Invalid XML: " + e),
        t
    }
    ;
    var Wt = /\[\]$/
      , It = /\r?\n/g
      , Lt = /^(?:submit|button|image|reset|file)$/i
      , Mt = /^(?:input|select|textarea|keygen)/i;
    function Ut(n, e, r, i) {
        var t;
        if (Array.isArray(e))
            E.each(e, function(e, t) {
                r || Wt.test(n) ? i(n, t) : Ut(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
            });
        else if (r || "object" !== x(e))
            i(n, e);
        else
            for (t in e)
                Ut(n + "[" + t + "]", e[t], r, i)
    }
    E.param = function(e, t) {
        function n(e, t) {
            var n = T(t) ? t() : t;
            i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
        }
        var r, i = [];
        if (null == e)
            return "";
        if (Array.isArray(e) || e.jquery && !E.isPlainObject(e))
            E.each(e, function() {
                n(this.name, this.value)
            });
        else
            for (r in e)
                Ut(r, e[r], t, n);
        return i.join("&")
    }
    ,
    E.fn.extend({
        serialize: function() {
            return E.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = E.prop(this, "elements");
                return e ? E.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !E(this).is(":disabled") && Mt.test(this.nodeName) && !Lt.test(e) && (this.checked || !pe.test(e))
            }).map(function(e, t) {
                var n = E(this).val();
                return null == n ? null : Array.isArray(n) ? E.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(It, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(It, "\r\n")
                }
            }).get()
        }
    });
    var qt = /%20/g
      , Ht = /#.*$/
      , Bt = /([?&])_=[^&]*/
      , Ft = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , zt = /^(?:GET|HEAD)$/
      , $t = /^\/\//
      , Vt = {}
      , Kt = {}
      , Xt = "*/".concat("*")
      , Gt = S.createElement("a");
    function Qt(o) {
        return function(e, t) {
            "string" != typeof e && (t = e,
            e = "*");
            var n, r = 0, i = e.toLowerCase().match(W) || [];
            if (T(t))
                for (; n = i[r++]; )
                    "+" === n[0] ? (n = n.slice(1) || "*",
                    (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
        }
    }
    function Jt(t, i, o, s) {
        var a = {}
          , u = t === Kt;
        function c(e) {
            var r;
            return a[e] = !0,
            E.each(t[e] || [], function(e, t) {
                var n = t(i, o, s);
                return "string" != typeof n || u || a[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n),
                c(n),
                !1)
            }),
            r
        }
        return c(i.dataTypes[0]) || !a["*"] && c("*")
    }
    function Yt(e, t) {
        var n, r, i = E.ajaxSettings.flatOptions || {};
        for (n in t)
            void 0 !== t[n] && ((i[n] ? e : r = r || {})[n] = t[n]);
        return r && E.extend(!0, e, r),
        e
    }
    Gt.href = Ot.href,
    E.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ot.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ot.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Xt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": E.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Yt(Yt(e, E.ajaxSettings), t) : Yt(E.ajaxSettings, e)
        },
        ajaxPrefilter: Qt(Vt),
        ajaxTransport: Qt(Kt),
        ajax: function(e, t) {
            "object" == typeof e && (t = e,
            e = void 0),
            t = t || {};
            var l, f, p, n, d, r, h, v, i, o, y = E.ajaxSetup({}, t), g = y.context || y, m = y.context && (g.nodeType || g.jquery) ? E(g) : E.event, T = E.Deferred(), b = E.Callbacks("once memory"), x = y.statusCode || {}, s = {}, a = {}, u = "canceled", w = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (h) {
                        if (!n)
                            for (n = {}; t = Ft.exec(p); )
                                n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
                        t = n[e.toLowerCase() + " "]
                    }
                    return null == t ? null : t.join(", ")
                },
                getAllResponseHeaders: function() {
                    return h ? p : null
                },
                setRequestHeader: function(e, t) {
                    return null == h && (e = a[e.toLowerCase()] = a[e.toLowerCase()] || e,
                    s[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return null == h && (y.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (h)
                            w.always(e[w.status]);
                        else
                            for (t in e)
                                x[t] = [x[t], e[t]];
                    return this
                },
                abort: function(e) {
                    var t = e || u;
                    return l && l.abort(t),
                    c(0, t),
                    this
                }
            };
            if (T.promise(w),
            y.url = ((e || y.url || Ot.href) + "").replace($t, Ot.protocol + "//"),
            y.type = t.method || t.type || y.method || y.type,
            y.dataTypes = (y.dataType || "*").toLowerCase().match(W) || [""],
            null == y.crossDomain) {
                r = S.createElement("a");
                try {
                    r.href = y.url,
                    r.href = r.href,
                    y.crossDomain = Gt.protocol + "//" + Gt.host != r.protocol + "//" + r.host
                } catch (e) {
                    y.crossDomain = !0
                }
            }
            if (y.data && y.processData && "string" != typeof y.data && (y.data = E.param(y.data, y.traditional)),
            Jt(Vt, y, t, w),
            h)
                return w;
            for (i in (v = E.event && y.global) && 0 == E.active++ && E.event.trigger("ajaxStart"),
            y.type = y.type.toUpperCase(),
            y.hasContent = !zt.test(y.type),
            f = y.url.replace(Ht, ""),
            y.hasContent ? y.data && y.processData && 0 === (y.contentType || "").indexOf("application/x-www-form-urlencoded") && (y.data = y.data.replace(qt, "+")) : (o = y.url.slice(f.length),
            y.data && (y.processData || "string" == typeof y.data) && (f += (jt.test(f) ? "&" : "?") + y.data,
            delete y.data),
            !1 === y.cache && (f = f.replace(Bt, "$1"),
            o = (jt.test(f) ? "&" : "?") + "_=" + Rt.guid++ + o),
            y.url = f + o),
            y.ifModified && (E.lastModified[f] && w.setRequestHeader("If-Modified-Since", E.lastModified[f]),
            E.etag[f] && w.setRequestHeader("If-None-Match", E.etag[f])),
            (y.data && y.hasContent && !1 !== y.contentType || t.contentType) && w.setRequestHeader("Content-Type", y.contentType),
            w.setRequestHeader("Accept", y.dataTypes[0] && y.accepts[y.dataTypes[0]] ? y.accepts[y.dataTypes[0]] + ("*" !== y.dataTypes[0] ? ", " + Xt + "; q=0.01" : "") : y.accepts["*"]),
            y.headers)
                w.setRequestHeader(i, y.headers[i]);
            if (y.beforeSend && (!1 === y.beforeSend.call(g, w, y) || h))
                return w.abort();
            if (u = "abort",
            b.add(y.complete),
            w.done(y.success),
            w.fail(y.error),
            l = Jt(Kt, y, t, w)) {
                if (w.readyState = 1,
                v && m.trigger("ajaxSend", [w, y]),
                h)
                    return w;
                y.async && 0 < y.timeout && (d = A.setTimeout(function() {
                    w.abort("timeout")
                }, y.timeout));
                try {
                    h = !1,
                    l.send(s, c)
                } catch (e) {
                    if (h)
                        throw e;
                    c(-1, e)
                }
            } else
                c(-1, "No Transport");
            function c(e, t, n, r) {
                var i, o, s, a, u, c = t;
                h || (h = !0,
                d && A.clearTimeout(d),
                l = void 0,
                p = r || "",
                w.readyState = 0 < e ? 4 : 0,
                i = 200 <= e && e < 300 || 304 === e,
                n && (a = function(e, t, n) {
                    for (var r, i, o, s, a = e.contents, u = e.dataTypes; "*" === u[0]; )
                        u.shift(),
                        void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (i in a)
                            if (a[i] && a[i].test(r)) {
                                u.unshift(i);
                                break
                            }
                    if (u[0]in n)
                        o = u[0];
                    else {
                        for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                o = i;
                                break
                            }
                            s = s || i
                        }
                        o = o || s
                    }
                    if (o)
                        return o !== u[0] && u.unshift(o),
                        n[o]
                }(y, w, n)),
                !i && -1 < E.inArray("script", y.dataTypes) && (y.converters["text script"] = function() {}
                ),
                a = function(e, t, n, r) {
                    var i, o, s, a, u, c = {}, l = e.dataTypes.slice();
                    if (l[1])
                        for (s in e.converters)
                            c[s.toLowerCase()] = e.converters[s];
                    for (o = l.shift(); o; )
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t),
                        !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                        u = o,
                        o = l.shift())
                            if ("*" === o)
                                o = u;
                            else if ("*" !== u && u !== o) {
                                if (!(s = c[u + " " + o] || c["* " + o]))
                                    for (i in c)
                                        if ((a = i.split(" "))[1] === o && (s = c[u + " " + a[0]] || c["* " + a[0]])) {
                                            !0 === s ? s = c[i] : !0 !== c[i] && (o = a[0],
                                            l.unshift(a[1]));
                                            break
                                        }
                                if (!0 !== s)
                                    if (s && e.throws)
                                        t = s(t);
                                    else
                                        try {
                                            t = s(t)
                                        } catch (e) {
                                            return {
                                                state: "parsererror",
                                                error: s ? e : "No conversion from " + u + " to " + o
                                            }
                                        }
                            }
                    return {
                        state: "success",
                        data: t
                    }
                }(y, a, w, i),
                i ? (y.ifModified && ((u = w.getResponseHeader("Last-Modified")) && (E.lastModified[f] = u),
                (u = w.getResponseHeader("etag")) && (E.etag[f] = u)),
                204 === e || "HEAD" === y.type ? c = "nocontent" : 304 === e ? c = "notmodified" : (c = a.state,
                o = a.data,
                i = !(s = a.error))) : (s = c,
                !e && c || (c = "error",
                e < 0 && (e = 0))),
                w.status = e,
                w.statusText = (t || c) + "",
                i ? T.resolveWith(g, [o, c, w]) : T.rejectWith(g, [w, c, s]),
                w.statusCode(x),
                x = void 0,
                v && m.trigger(i ? "ajaxSuccess" : "ajaxError", [w, y, i ? o : s]),
                b.fireWith(g, [w, c]),
                v && (m.trigger("ajaxComplete", [w, y]),
                --E.active || E.event.trigger("ajaxStop")))
            }
            return w
        },
        getJSON: function(e, t, n) {
            return E.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return E.get(e, void 0, t, "script")
        }
    }),
    E.each(["get", "post"], function(e, i) {
        E[i] = function(e, t, n, r) {
            return T(t) && (r = r || n,
            n = t,
            t = void 0),
            E.ajax(E.extend({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            }, E.isPlainObject(e) && e))
        }
    }),
    E.ajaxPrefilter(function(e) {
        var t;
        for (t in e.headers)
            "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
    }),
    E._evalUrl = function(e, t, n) {
        return E.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(e) {
                E.globalEval(e, t, n)
            }
        })
    }
    ,
    E.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (T(e) && (e = e.call(this[0])),
            t = E(e, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && t.insertBefore(this[0]),
            t.map(function() {
                for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                return e
            }).append(this)),
            this
        },
        wrapInner: function(n) {
            return T(n) ? this.each(function(e) {
                E(this).wrapInner(n.call(this, e))
            }) : this.each(function() {
                var e = E(this)
                  , t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        },
        wrap: function(t) {
            var n = T(t);
            return this.each(function(e) {
                E(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                E(this).replaceWith(this.childNodes)
            }),
            this
        }
    }),
    E.expr.pseudos.hidden = function(e) {
        return !E.expr.pseudos.visible(e)
    }
    ,
    E.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }
    ,
    E.ajaxSettings.xhr = function() {
        try {
            return new A.XMLHttpRequest
        } catch (e) {}
    }
    ;
    var Zt = {
        0: 200,
        1223: 204
    }
      , en = E.ajaxSettings.xhr();
    m.cors = !!en && "withCredentials"in en,
    m.ajax = en = !!en,
    E.ajaxTransport(function(i) {
        var o, s;
        if (m.cors || en && !i.crossDomain)
            return {
                send: function(e, t) {
                    var n, r = i.xhr();
                    if (r.open(i.type, i.url, i.async, i.username, i.password),
                    i.xhrFields)
                        for (n in i.xhrFields)
                            r[n] = i.xhrFields[n];
                    for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType),
                    i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"),
                    e)
                        r.setRequestHeader(n, e[n]);
                    o = function(e) {
                        return function() {
                            o && (o = s = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null,
                            "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Zt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                                binary: r.response
                            } : {
                                text: r.responseText
                            }, r.getAllResponseHeaders()))
                        }
                    }
                    ,
                    r.onload = o(),
                    s = r.onerror = r.ontimeout = o("error"),
                    void 0 !== r.onabort ? r.onabort = s : r.onreadystatechange = function() {
                        4 === r.readyState && A.setTimeout(function() {
                            o && s()
                        })
                    }
                    ,
                    o = o("abort");
                    try {
                        r.send(i.hasContent && i.data || null)
                    } catch (e) {
                        if (o)
                            throw e
                    }
                },
                abort: function() {
                    o && o()
                }
            }
    }),
    E.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }),
    E.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return E.globalEval(e),
                e
            }
        }
    }),
    E.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET")
    }),
    E.ajaxTransport("script", function(n) {
        var r, i;
        if (n.crossDomain || n.scriptAttrs)
            return {
                send: function(e, t) {
                    r = E("<script>").attr(n.scriptAttrs || {}).prop({
                        charset: n.scriptCharset,
                        src: n.url
                    }).on("load error", i = function(e) {
                        r.remove(),
                        i = null,
                        e && t("error" === e.type ? 404 : 200, e.type)
                    }
                    ),
                    S.head.appendChild(r[0])
                },
                abort: function() {
                    i && i()
                }
            }
    });
    var tn, nn = [], rn = /(=)\?(?=&|$)|\?\?/;
    E.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = nn.pop() || E.expando + "_" + Rt.guid++;
            return this[e] = !0,
            e
        }
    }),
    E.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r, i, o, s = !1 !== e.jsonp && (rn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && rn.test(e.data) && "data");
        if (s || "jsonp" === e.dataTypes[0])
            return r = e.jsonpCallback = T(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
            s ? e[s] = e[s].replace(rn, "$1" + r) : !1 !== e.jsonp && (e.url += (jt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
            e.converters["script json"] = function() {
                return o || E.error(r + " was not called"),
                o[0]
            }
            ,
            e.dataTypes[0] = "json",
            i = A[r],
            A[r] = function() {
                o = arguments
            }
            ,
            n.always(function() {
                void 0 === i ? E(A).removeProp(r) : A[r] = i,
                e[r] && (e.jsonpCallback = t.jsonpCallback,
                nn.push(r)),
                o && T(i) && i(o[0]),
                o = i = void 0
            }),
            "script"
    }),
    m.createHTMLDocument = ((tn = S.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>",
    2 === tn.childNodes.length),
    E.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t,
        t = !1),
        t || (m.createHTMLDocument ? ((r = (t = S.implementation.createHTMLDocument("")).createElement("base")).href = S.location.href,
        t.head.appendChild(r)) : t = S),
        o = !n && [],
        (i = k.exec(e)) ? [t.createElement(i[1])] : (i = Te([e], t, o),
        o && o.length && E(o).remove(),
        E.merge([], i.childNodes)));
        var r, i, o
    }
    ,
    E.fn.load = function(e, t, n) {
        var r, i, o, s = this, a = e.indexOf(" ");
        return -1 < a && (r = Ct(e.slice(a)),
        e = e.slice(0, a)),
        T(t) ? (n = t,
        t = void 0) : t && "object" == typeof t && (i = "POST"),
        0 < s.length && E.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments,
            s.html(r ? E("<div>").append(E.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            s.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }
        ),
        this
    }
    ,
    E.expr.pseudos.animated = function(t) {
        return E.grep(E.timers, function(e) {
            return t === e.elem
        }).length
    }
    ,
    E.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, s, a, u, c = E.css(e, "position"), l = E(e), f = {};
            "static" === c && (e.style.position = "relative"),
            a = l.offset(),
            o = E.css(e, "top"),
            u = E.css(e, "left"),
            i = ("absolute" === c || "fixed" === c) && -1 < (o + u).indexOf("auto") ? (s = (r = l.position()).top,
            r.left) : (s = parseFloat(o) || 0,
            parseFloat(u) || 0),
            T(t) && (t = t.call(e, n, E.extend({}, a))),
            null != t.top && (f.top = t.top - a.top + s),
            null != t.left && (f.left = t.left - a.left + i),
            "using"in t ? t.using.call(e, f) : ("number" == typeof f.top && (f.top += "px"),
            "number" == typeof f.left && (f.left += "px"),
            l.css(f))
        }
    },
    E.fn.extend({
        offset: function(t) {
            if (arguments.length)
                return void 0 === t ? this : this.each(function(e) {
                    E.offset.setOffset(this, t, e)
                });
            var e, n, r = this[0];
            return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(),
            n = r.ownerDocument.defaultView,
            {
                top: e.top + n.pageYOffset,
                left: e.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0], i = {
                    top: 0,
                    left: 0
                };
                if ("fixed" === E.css(r, "position"))
                    t = r.getBoundingClientRect();
                else {
                    for (t = this.offset(),
                    n = r.ownerDocument,
                    e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === E.css(e, "position"); )
                        e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((i = E(e).offset()).top += E.css(e, "borderTopWidth", !0),
                    i.left += E.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - i.top - E.css(r, "marginTop", !0),
                    left: t.left - i.left - E.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === E.css(e, "position"); )
                    e = e.offsetParent;
                return e || re
            })
        }
    }),
    E.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, i) {
        var o = "pageYOffset" === i;
        E.fn[t] = function(e) {
            return B(this, function(e, t, n) {
                var r;
                if (v(e) ? r = e : 9 === e.nodeType && (r = e.defaultView),
                void 0 === n)
                    return r ? r[i] : e[t];
                r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
            }, t, e, arguments.length)
        }
    }),
    E.each(["top", "left"], function(e, n) {
        E.cssHooks[n] = Qe(m.pixelPosition, function(e, t) {
            if (t)
                return t = Ge(e, n),
                Ve.test(t) ? E(e).position()[n] + "px" : t
        })
    }),
    E.each({
        Height: "height",
        Width: "width"
    }, function(s, a) {
        E.each({
            padding: "inner" + s,
            content: a,
            "": "outer" + s
        }, function(r, o) {
            E.fn[o] = function(e, t) {
                var n = arguments.length && (r || "boolean" != typeof e)
                  , i = r || (!0 === e || !0 === t ? "margin" : "border");
                return B(this, function(e, t, n) {
                    var r;
                    return v(e) ? 0 === o.indexOf("outer") ? e["inner" + s] : e.document.documentElement["client" + s] : 9 === e.nodeType ? (r = e.documentElement,
                    Math.max(e.body["scroll" + s], r["scroll" + s], e.body["offset" + s], r["offset" + s], r["client" + s])) : void 0 === n ? E.css(e, t, i) : E.style(e, t, n, i)
                }, a, n ? e : void 0, n)
            }
        })
    }),
    E.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        E.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    E.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
        E.fn[n] = function(e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    });
    var on = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    E.proxy = function(e, t) {
        var n, r, i;
        if ("string" == typeof t && (n = e[t],
        t = e,
        e = n),
        T(e))
            return r = a.call(arguments, 2),
            (i = function() {
                return e.apply(t || this, r.concat(a.call(arguments)))
            }
            ).guid = e.guid = e.guid || E.guid++,
            i
    }
    ,
    E.holdReady = function(e) {
        e ? E.readyWait++ : E.ready(!0)
    }
    ,
    E.isArray = Array.isArray,
    E.parseJSON = JSON.parse,
    E.nodeName = P,
    E.isFunction = T,
    E.isWindow = v,
    E.camelCase = V,
    E.type = x,
    E.now = Date.now,
    E.isNumeric = function(e) {
        var t = E.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }
    ,
    E.trim = function(e) {
        return null == e ? "" : (e + "").replace(on, "")
    }
    ,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return E
    });
    var sn = A.jQuery
      , an = A.$;
    return E.noConflict = function(e) {
        return A.$ === E && (A.$ = an),
        e && A.jQuery === E && (A.jQuery = sn),
        E
    }
    ,
    void 0 === e && (A.jQuery = A.$ = E),
    E
}),
function(e, t) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        var n = t();
        for (var r in n)
            ("object" == typeof exports ? exports : e)[r] = n[r]
    }
}(this, function() {
    return i = {},
    r.m = n = [function(e, t, n) {
        "use strict";
        var r, i, o, s, a, u;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        (r = t.AWTPropertyType || (t.AWTPropertyType = {}))[r.Unspecified = 0] = "Unspecified",
        r[r.String = 1] = "String",
        r[r.Int64 = 2] = "Int64",
        r[r.Double = 3] = "Double",
        r[r.Boolean = 4] = "Boolean",
        r[r.Date = 5] = "Date",
        (i = t.AWTPiiKind || (t.AWTPiiKind = {}))[i.NotSet = 0] = "NotSet",
        i[i.DistinguishedName = 1] = "DistinguishedName",
        i[i.GenericData = 2] = "GenericData",
        i[i.IPV4Address = 3] = "IPV4Address",
        i[i.IPv6Address = 4] = "IPv6Address",
        i[i.MailSubject = 5] = "MailSubject",
        i[i.PhoneNumber = 6] = "PhoneNumber",
        i[i.QueryString = 7] = "QueryString",
        i[i.SipAddress = 8] = "SipAddress",
        i[i.SmtpAddress = 9] = "SmtpAddress",
        i[i.Identity = 10] = "Identity",
        i[i.Uri = 11] = "Uri",
        i[i.Fqdn = 12] = "Fqdn",
        i[i.IPV4AddressLegacy = 13] = "IPV4AddressLegacy",
        (o = t.AWTCustomerContentKind || (t.AWTCustomerContentKind = {}))[o.NotSet = 0] = "NotSet",
        o[o.GenericContent = 1] = "GenericContent",
        (s = t.AWTEventPriority || (t.AWTEventPriority = {}))[s.Low = 1] = "Low",
        s[s.Normal = 2] = "Normal",
        s[s.High = 3] = "High",
        s[s.Immediate_sync = 5] = "Immediate_sync",
        (a = t.AWTEventsDroppedReason || (t.AWTEventsDroppedReason = {}))[a.NonRetryableStatus = 1] = "NonRetryableStatus",
        a[a.QueueFull = 3] = "QueueFull",
        (u = t.AWTEventsRejectedReason || (t.AWTEventsRejectedReason = {}))[u.InvalidEvent = 1] = "InvalidEvent",
        u[u.SizeLimitExceeded = 2] = "SizeLimitExceeded",
        u[u.KillSwitch = 3] = "KillSwitch"
    }
    , function(e, i, t) {
        "use strict";
        function o(e) {
            return "string" == typeof e
        }
        function s(e) {
            return "number" == typeof e
        }
        function a(e) {
            return "boolean" == typeof e
        }
        function u(e) {
            return e instanceof Date
        }
        function c(e) {
            return (e + h) * v
        }
        function n() {
            return !("undefined" == typeof navigator || !navigator.product) && "ReactNative" === navigator.product
        }
        function r(e) {
            return e < 10 ? "0" + e : e.toString()
        }
        function l(e) {
            return void 0 === e || e === y || "" === e
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var f = t(4)
          , p = t(0)
          , d = /[xy]/g
          , h = 621355968e5
          , v = 1e4
          , y = null;
        i.EventNameAndTypeRegex = /^[a-zA-Z]([a-zA-Z0-9]|_){2,98}[a-zA-Z0-9]$/,
        i.EventNameDotRegex = /\./g,
        i.PropertyNameRegex = /^[a-zA-Z](([a-zA-Z0-9|_|\.]){0,98}[a-zA-Z0-9])?$/,
        i.StatsApiKey = "a387cfcf60114a43a7699f9fbb49289e-9bceb9fe-1c06-460f-96c5-6a0b247358bc-7238";
        var g = y
          , m = y
          , T = y;
        i.numberToBondInt64 = function(e) {
            var t = new f.Int64("0");
            return t.low = 4294967295 & e,
            t.high = Math.floor(e / 4294967296),
            t
        }
        ,
        i.newGuid = function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(d, function(e) {
                var t = 16 * Math.random() | 0;
                return ("x" === e ? t : 3 & t | 8).toString(16)
            })
        }
        ,
        i.isString = o,
        i.isNumber = s,
        i.isBoolean = a,
        i.isDate = u,
        i.msToTicks = c,
        i.getTenantId = function(e) {
            var t = e.indexOf("-");
            return -1 < t ? e.substring(0, t) : ""
        }
        ,
        i.isBeaconsSupported = function() {
            return g === y && (g = "undefined" != typeof navigator && Boolean(navigator.sendBeacon)),
            g
        }
        ,
        i.isUint8ArrayAvailable = function() {
            return m === y && (m = "undefined" != typeof Uint8Array && !function() {
                if ("undefined" != typeof navigator && navigator.userAgent) {
                    var e = navigator.userAgent.toLowerCase();
                    if ((0 <= e.indexOf("safari") || 0 <= e.indexOf("firefox")) && e.indexOf("chrome") < 0)
                        return 1
                }
                return
            }() && !n()),
            m
        }
        ,
        i.isPriority = function(e) {
            return !(!s(e) || !(1 <= e && e <= 3 || 5 === e))
        }
        ,
        i.sanitizeProperty = function(e, t) {
            return !i.PropertyNameRegex.test(e) || l(t) ? y : (l(t.value) && (t = {
                value: t,
                type: p.AWTPropertyType.Unspecified
            }),
            t.type = function(e, t) {
                switch (t = function(e) {
                    return s(e) && 0 <= e && e <= 4
                }(t) ? t : p.AWTPropertyType.Unspecified) {
                case p.AWTPropertyType.Unspecified:
                    return function(e) {
                        switch (typeof e) {
                        case "string":
                            return p.AWTPropertyType.String;
                        case "boolean":
                            return p.AWTPropertyType.Boolean;
                        case "number":
                            return p.AWTPropertyType.Double;
                        case "object":
                            return u(e) ? p.AWTPropertyType.Date : y
                        }
                        return y
                    }(e);
                case p.AWTPropertyType.String:
                    return o(e) ? t : y;
                case p.AWTPropertyType.Boolean:
                    return a(e) ? t : y;
                case p.AWTPropertyType.Date:
                    return u(e) && NaN !== e.getTime() ? t : y;
                case p.AWTPropertyType.Int64:
                    return s(e) && e % 1 == 0 ? t : y;
                case p.AWTPropertyType.Double:
                    return s(e) ? t : y
                }
                return y
            }(t.value, t.type),
            t.type ? (u(t.value) && (t.value = c(t.value.getTime())),
            0 < t.pii && 0 < t.cc ? y : t.pii ? s(r = t.pii) && 0 <= r && r <= 13 ? t : y : t.cc ? s(n = t.cc) && 0 <= n && n <= 1 ? t : y : t) : y);
            var n, r
        }
        ,
        i.getISOString = function(e) {
            return e.getUTCFullYear() + "-" + r(e.getUTCMonth() + 1) + "-" + r(e.getUTCDate()) + "T" + r(e.getUTCHours()) + ":" + r(e.getUTCMinutes()) + ":" + r(e.getUTCSeconds()) + "." + ((t = e.getUTCMilliseconds()) < 10 ? "00" + t : t < 100 ? "0" + t : t.toString()) + "Z";
            var t
        }
        ,
        i.useXDomainRequest = function() {
            if (T === y) {
                var e = new XMLHttpRequest;
                T = void 0 === e.withCredentials && "undefined" != typeof XDomainRequest
            }
            return T
        }
        ,
        i.isReactNative = n
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = (i.addNotificationListener = function(e) {
            this.listeners.push(e)
        }
        ,
        i.removeNotificationListener = function(e) {
            for (var t = this.listeners.indexOf(e); -1 < t; )
                this.listeners.splice(t, 1),
                t = this.listeners.indexOf(e)
        }
        ,
        i.eventsSent = function(t) {
            for (var n = this, r = this, e = 0; e < this.listeners.length; ++e)
                !function(e) {
                    r.listeners[e].eventsSent && setTimeout(function() {
                        return n.listeners[e].eventsSent(t)
                    }, 0)
                }(e)
        }
        ,
        i.eventsDropped = function(t, n) {
            for (var r = this, i = this, e = 0; e < this.listeners.length; ++e)
                !function(e) {
                    i.listeners[e].eventsDropped && setTimeout(function() {
                        return r.listeners[e].eventsDropped(t, n)
                    }, 0)
                }(e)
        }
        ,
        i.eventsRetrying = function(t) {
            for (var n = this, r = this, e = 0; e < this.listeners.length; ++e)
                !function(e) {
                    r.listeners[e].eventsRetrying && setTimeout(function() {
                        return n.listeners[e].eventsRetrying(t)
                    }, 0)
                }(e)
        }
        ,
        i.eventsRejected = function(t, n) {
            for (var r = this, i = this, e = 0; e < this.listeners.length; ++e)
                !function(e) {
                    i.listeners[e].eventsRejected && setTimeout(function() {
                        return r.listeners[e].eventsRejected(t, n)
                    }, 0)
                }(e)
        }
        ,
        i.listeners = [],
        i);
        function i() {}
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(14)
          , o = n(0)
          , s = n(28)
          , a = n(10)
          , u = n(5)
          , c = n(11)
          , l = n(1)
          , i = (f.setEventsHandler = function(e) {
            this.t = e
        }
        ,
        f.getEventsHandler = function() {
            return this.t
        }
        ,
        f.scheduleTimer = function() {
            var e = this
              , t = this.r[this.a][2];
            this.u < 0 && 0 <= t && !this._ && (this.t.hasEvents() ? (0 === t && 0 < this.f && (t = 1),
            this.u = setTimeout(function() {
                return e.h()
            }, t * (1 << this.f) * 1e3)) : this.v = 0)
        }
        ,
        f.initialize = function(e) {
            var i = this;
            this.y = !0,
            this.T = e,
            this.t = new s.default(e.collectorUri,e.cacheMemorySizeLimitInNumberOfEvents,e.httpXHROverride,e.clockSkewRefreshDurationInMins),
            this.g(),
            a.default.initialize(function(e, t) {
                if (i.T.canSendStatEvent("awt_stats")) {
                    var n = new u.default("awt_stats");
                    for (var r in n.setEventPriority(o.AWTEventPriority.High),
                    n.setProperty("TenantId", t),
                    e)
                        e.hasOwnProperty(r) && n.setProperty(r, e[r].toString());
                    c.default.getLogger(l.StatsApiKey).logEvent(n)
                }
            })
        }
        ,
        f.setTransmitProfile = function(e) {
            this.a !== e && void 0 !== this.r[e] && (this.clearTimeout(),
            this.a = e,
            this.scheduleTimer())
        }
        ,
        f.loadTransmitProfiles = function(e) {
            for (var t in this.S(),
            e)
                if (e.hasOwnProperty(t)) {
                    if (3 !== e[t].length)
                        continue;
                    for (var n = 2; 0 <= n; --n)
                        if (e[t][n] < 0) {
                            for (var r = n; 0 <= r; --r)
                                e[t][r] = -1;
                            break
                        }
                    for (n = 2; 0 < n; --n)
                        if (0 < e[t][n] && 0 < e[t][n - 1]) {
                            var i = e[t][n - 1] / e[t][n];
                            e[t][n - 1] = Math.ceil(i) * e[t][n]
                        }
                    this.r[t] = e[t]
                }
        }
        ,
        f.sendEvent = function(e) {
            this.y && (0 < this.f && e.priority === o.AWTEventPriority.Immediate_sync && (e.priority = o.AWTEventPriority.High),
            this.t.addEvent(e),
            this.scheduleTimer())
        }
        ,
        f.flush = function(e) {
            var t = (new Date).getTime();
            !this._ && this.A + 3e4 < t && (this.A = t,
            -1 < this.u && (clearTimeout(this.u),
            this.u = -1),
            this.t.uploadNow(e))
        }
        ,
        f.pauseTransmission = function() {
            this._ || (this.clearTimeout(),
            this.t.pauseTransmission(),
            this._ = !0)
        }
        ,
        f.resumeTransmision = function() {
            this._ && (this._ = !1,
            this.t.resumeTransmission(),
            this.scheduleTimer())
        }
        ,
        f.flushAndTeardown = function() {
            a.default.teardown(),
            this.y = !1,
            this.clearTimeout(),
            this.t.teardown()
        }
        ,
        f.backOffTransmission = function() {
            this.f < 4 && (this.f++,
            this.clearTimeout(),
            this.scheduleTimer())
        }
        ,
        f.clearBackOff = function() {
            0 < this.f && (this.f = 0,
            this.clearTimeout(),
            this.scheduleTimer())
        }
        ,
        f.S = function() {
            this.clearTimeout(),
            this.g(),
            this.a = r.AWT_REAL_TIME,
            this.scheduleTimer()
        }
        ,
        f.clearTimeout = function() {
            0 < this.u && (clearTimeout(this.u),
            this.u = -1,
            this.v = 0)
        }
        ,
        f.h = function() {
            var e = o.AWTEventPriority.High;
            this.v++,
            this.v * this.r[this.a][2] === this.r[this.a][0] ? (e = o.AWTEventPriority.Low,
            this.v = 0) : this.v * this.r[this.a][2] === this.r[this.a][1] && (e = o.AWTEventPriority.Normal),
            this.t.sendEventsForPriorityAndAbove(e),
            this.u = -1,
            this.scheduleTimer()
        }
        ,
        f.g = function() {
            this.r = {},
            this.r[r.AWT_REAL_TIME] = [4, 2, 1],
            this.r[r.AWT_NEAR_REAL_TIME] = [12, 6, 3],
            this.r[r.AWT_BEST_EFFORT] = [36, 18, 9]
        }
        ,
        f.y = !1,
        f.a = r.AWT_REAL_TIME,
        f.u = -1,
        f.f = 0,
        f._ = !1,
        f.v = 0,
        f.A = 0,
        f);
        function f() {}
        t.default = i
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = (i.prototype.I = function(e) {
            var t = new i(e);
            return this.low === t.low && this.high === t.high
        }
        ,
        i);
        function i(e) {
            this.low = 0,
            this.high = 0,
            this.low = parseInt(e, 10),
            this.low < 0 && (this.high = -1)
        }
        t.Int64 = r;
        var o = (s.prototype.I = function(e) {
            var t = new s(e);
            return this.low === t.low && this.high === t.high
        }
        ,
        s);
        function s(e) {
            this.low = 0,
            this.high = 0,
            this.low = parseInt(e, 10)
        }
        t.UInt64 = o;
        var a = (u.W = function(e) {
            return this.P(e)
        }
        ,
        u.P = function(e) {
            return 255 & e
        }
        ,
        u.B = function(e) {
            return 2147483647 & e | 2147483648 & e
        }
        ,
        u.w = function(e) {
            return 4294967295 & e
        }
        ,
        u);
        function u() {}
        t.Number = a
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(1)
          , s = n(0)
          , r = (i.prototype.setName = function(e) {
            this.C.name = e
        }
        ,
        i.prototype.getName = function() {
            return this.C.name
        }
        ,
        i.prototype.setType = function(e) {
            this.C.type = e
        }
        ,
        i.prototype.getType = function() {
            return this.C.type
        }
        ,
        i.prototype.setTimestamp = function(e) {
            this.C.timestamp = e
        }
        ,
        i.prototype.getTimestamp = function() {
            return this.C.timestamp
        }
        ,
        i.prototype.setEventPriority = function(e) {
            this.C.priority = e
        }
        ,
        i.prototype.getEventPriority = function() {
            return this.C.priority
        }
        ,
        i.prototype.setProperty = function(e, t, n) {
            void 0 === n && (n = s.AWTPropertyType.Unspecified);
            var r = {
                value: t,
                type: n,
                pii: s.AWTPiiKind.NotSet,
                cc: s.AWTCustomerContentKind.NotSet
            };
            null !== (r = o.sanitizeProperty(e, r)) ? this.C.properties[e] = r : delete this.C.properties[e]
        }
        ,
        i.prototype.setPropertyWithPii = function(e, t, n, r) {
            void 0 === r && (r = s.AWTPropertyType.Unspecified);
            var i = {
                value: t,
                type: r,
                pii: n,
                cc: s.AWTCustomerContentKind.NotSet
            };
            null !== (i = o.sanitizeProperty(e, i)) ? this.C.properties[e] = i : delete this.C.properties[e]
        }
        ,
        i.prototype.setPropertyWithCustomerContent = function(e, t, n, r) {
            void 0 === r && (r = s.AWTPropertyType.Unspecified);
            var i = {
                value: t,
                type: r,
                pii: s.AWTPiiKind.NotSet,
                cc: n
            };
            null !== (i = o.sanitizeProperty(e, i)) ? this.C.properties[e] = i : delete this.C.properties[e]
        }
        ,
        i.prototype.getPropertyMap = function() {
            return this.C.properties
        }
        ,
        i.prototype.getEvent = function() {
            return this.C
        }
        ,
        i);
        function i(e) {
            this.C = {
                name: "",
                properties: {}
            },
            e && this.setName(e)
        }
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        var r, i;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        (r = t.AWTUserIdType || (t.AWTUserIdType = {}))[r.Unknown = 0] = "Unknown",
        r[r.MSACID = 1] = "MSACID",
        r[r.MSAPUID = 2] = "MSAPUID",
        r[r.ANID = 3] = "ANID",
        r[r.OrgIdCID = 4] = "OrgIdCID",
        r[r.OrgIdPUID = 5] = "OrgIdPUID",
        r[r.UserObjectId = 6] = "UserObjectId",
        r[r.Skype = 7] = "Skype",
        r[r.Yammer = 8] = "Yammer",
        r[r.EmailAddress = 9] = "EmailAddress",
        r[r.PhoneNumber = 10] = "PhoneNumber",
        r[r.SipAddress = 11] = "SipAddress",
        r[r.MUID = 12] = "MUID",
        (i = t.AWTSessionState || (t.AWTSessionState = {}))[i.Started = 0] = "Started",
        i[i.Ended = 1] = "Ended"
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(1)
          , i = "MicrosoftApplicationsTelemetryDeviceId"
          , o = "MicrosoftApplicationsTelemetryFirstLaunchTime"
          , s = "MSIE"
          , a = "Chrome"
          , u = "Firefox"
          , c = "Safari"
          , l = "Edge"
          , f = "Electron"
          , p = "SkypeShell"
          , d = "PhantomJS"
          , h = "Opera"
          , v = "Windows"
          , y = "Mac OS X"
          , g = "Windows Phone"
          , m = "Windows RT"
          , T = "iOS"
          , b = "Android"
          , x = "Linux"
          , w = "Chrome OS"
          , A = /(windows|win32)/i
          , S = / arm;/i
          , E = /windows\sphone\s\d+\.\d+/i
          , C = /(macintosh|mac os x)/i
          , P = /(iPad|iPhone|iPod)(?=.*like Mac OS X)/i
          , k = /(linux|joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)/i
          , N = /android/i
          , D = /CrOS/i
          , _ = {
            5.1: "XP",
            "6.0": "Vista",
            6.1: "7",
            6.2: "8",
            6.3: "8.1",
            "10.0": "10"
        }
          , O = (R.addPropertyStorageOverride = function(e) {
            return !!e && (this.b = e,
            !0)
        }
        ,
        R.autoCollect = function(e, t, n) {
            if (this.R = e,
            this.D = t,
            this.O(),
            n || "undefined" == typeof navigator || (n = navigator.userAgent || ""),
            this.N(n),
            this.D && !this.b)
                return this.M(i),
                void this.M(o);
            (this.b || this.k && !this.D) && this.U()
        }
        ,
        R.checkAndSaveDeviceId = function(e) {
            if (e) {
                var t = this.x(i)
                  , n = this.x(o);
                t !== e && (n = r.getISOString(new Date)),
                this.L(i, e),
                this.L(o, n),
                this.F(n)
            }
        }
        ,
        R.U = function() {
            var e = this.x(i);
            e = e || r.newGuid(),
            this.R.setDeviceId(e)
        }
        ,
        R.O = function() {
            "undefined" != typeof document && document.documentElement && this.R.setAppLanguage(document.documentElement.lang),
            "undefined" != typeof navigator && this.R.setUserLanguage(navigator.userLanguage || navigator.language);
            var e = (new Date).getTimezoneOffset()
              , t = e % 60
              , n = (e - t) / 60
              , r = "+";
            0 < n && (r = "-"),
            n = Math.abs(n),
            t = Math.abs(t),
            this.R.setUserTimeZone(r + (n < 10 ? "0" + n : n.toString()) + ":" + (t < 10 ? "0" + t : t.toString()))
        }
        ,
        R.N = function(e) {
            if (e) {
                var t = this.q(e);
                this.R.setDeviceBrowserName(t),
                this.R.setDeviceBrowserVersion(this.H(e, t));
                var n = this.Q(e);
                this.R.setDeviceOsName(n),
                this.R.setDeviceOsVersion(this.j(e, n))
            }
        }
        ,
        R.q = function(e) {
            return this.z("OPR/", e) ? h : this.z(d, e) ? d : this.z(l, e) ? l : this.z(f, e) ? f : this.z(a, e) ? a : this.z("Trident", e) ? s : this.z(u, e) ? u : this.z(c, e) ? c : this.z(p, e) ? p : "Unknown"
        }
        ,
        R.F = function(e) {
            if (!isNaN(e)) {
                var t = new Date;
                t.setTime(parseInt(e, 10)),
                e = r.getISOString(t)
            }
            this.firstLaunchTime = e
        }
        ,
        R.z = function(e, t) {
            return -1 < t.indexOf(e)
        }
        ,
        R.H = function(e, t) {
            return t === s ? this.K(e) : this.G(t, e)
        }
        ,
        R.K = function(e) {
            var t = e.match(new RegExp(s + " ([\\d,.]+)"));
            if (t)
                return t[1];
            var n = e.match(new RegExp("rv:([\\d,.]+)"));
            return n ? n[1] : void 0
        }
        ,
        R.G = function(e, t) {
            e === c && (e = "Version");
            var n = t.match(new RegExp(e + "/([\\d,.]+)"));
            return n ? n[1] : "Unknown"
        }
        ,
        R.Q = function(e) {
            return e.match(E) ? g : e.match(S) ? m : e.match(P) ? T : e.match(N) ? b : e.match(k) ? x : e.match(C) ? y : e.match(A) ? v : e.match(D) ? w : "Unknown"
        }
        ,
        R.j = function(e, t) {
            return t === v ? this.V(e, "Windows NT") : t === b ? this.V(e, t) : t === y ? this.X(e) : "Unknown"
        }
        ,
        R.V = function(e, t) {
            var n = e.match(new RegExp(t + " ([\\d,.]+)"));
            return n ? _[n[1]] ? _[n[1]] : n[1] : "Unknown"
        }
        ,
        R.X = function(e) {
            var t = e.match(new RegExp(y + " ([\\d,_,.]+)"));
            if (t) {
                var n = t[1].replace(/_/g, ".");
                if (n) {
                    var r = this.Z(n);
                    return r ? n.split(r)[0] : n
                }
            }
            return "Unknown"
        }
        ,
        R.Z = function(e) {
            return -1 < e.indexOf(".") ? "." : -1 < e.indexOf("_") ? "_" : null
        }
        ,
        R.L = function(e, t) {
            if (this.b)
                this.b.setProperty(e, t);
            else if (this.k) {
                var n = new Date;
                n.setTime(n.getTime() + 31536e6);
                var r = "expires=" + n.toUTCString();
                document.cookie = e + "=" + t + "; " + r
            }
        }
        ,
        R.x = function(e) {
            if (this.b)
                return this.b.getProperty(e) || "";
            if (this.k) {
                e += "=";
                for (var t = document.cookie.split(";"), n = 0; n < t.length; n++) {
                    for (var r = t[n], i = 0; " " === r.charAt(i); )
                        i++;
                    if (0 === (r = r.substring(i)).indexOf(e))
                        return r.substring(e.length, r.length)
                }
            }
            return ""
        }
        ,
        R.M = function(e) {
            this.k && (document.cookie = e + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;")
        }
        ,
        R.D = !1,
        R.k = "undefined" != typeof document && void 0 !== document.cookie,
        R);
        function R() {}
        t.default = O
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(7)
          , i = n(0)
          , o = n(6)
          , s = (a.prototype.setAppId = function(e) {
            this.$("AppInfo.Id", e)
        }
        ,
        a.prototype.setAppVersion = function(e) {
            this.$("AppInfo.Version", e)
        }
        ,
        a.prototype.setAppLanguage = function(e) {
            this.$("AppInfo.Language", e)
        }
        ,
        a.prototype.setDeviceId = function(e) {
            this.J && (r.default.checkAndSaveDeviceId(e),
            this.$("DeviceInfo.Id", e))
        }
        ,
        a.prototype.setDeviceOsName = function(e) {
            this.J && this.$("DeviceInfo.OsName", e)
        }
        ,
        a.prototype.setDeviceOsVersion = function(e) {
            this.J && this.$("DeviceInfo.OsVersion", e)
        }
        ,
        a.prototype.setDeviceBrowserName = function(e) {
            this.J && this.$("DeviceInfo.BrowserName", e)
        }
        ,
        a.prototype.setDeviceBrowserVersion = function(e) {
            this.J && this.$("DeviceInfo.BrowserVersion", e)
        }
        ,
        a.prototype.setDeviceMake = function(e) {
            this.J && this.$("DeviceInfo.Make", e)
        }
        ,
        a.prototype.setDeviceModel = function(e) {
            this.J && this.$("DeviceInfo.Model", e)
        }
        ,
        a.prototype.setUserId = function(e, t, n) {
            if (!isNaN(n) && null !== n && 0 <= n && n <= 12)
                this.$("UserInfo.IdType", n.toString());
            else {
                var r = void 0;
                switch (t) {
                case i.AWTPiiKind.SipAddress:
                    r = o.AWTUserIdType.SipAddress;
                    break;
                case i.AWTPiiKind.PhoneNumber:
                    r = o.AWTUserIdType.PhoneNumber;
                    break;
                case i.AWTPiiKind.SmtpAddress:
                    r = o.AWTUserIdType.EmailAddress;
                    break;
                default:
                    r = o.AWTUserIdType.Unknown
                }
                this.$("UserInfo.IdType", r.toString())
            }
            if (isNaN(t) || null === t || t === i.AWTPiiKind.NotSet || 13 < t)
                switch (n) {
                case o.AWTUserIdType.Skype:
                    t = i.AWTPiiKind.Identity;
                    break;
                case o.AWTUserIdType.EmailAddress:
                    t = i.AWTPiiKind.SmtpAddress;
                    break;
                case o.AWTUserIdType.PhoneNumber:
                    t = i.AWTPiiKind.PhoneNumber;
                    break;
                case o.AWTUserIdType.SipAddress:
                    t = i.AWTPiiKind.SipAddress;
                    break;
                default:
                    t = i.AWTPiiKind.NotSet
                }
            this.ee("UserInfo.Id", e, t)
        }
        ,
        a.prototype.setUserAdvertisingId = function(e) {
            this.$("UserInfo.AdvertisingId", e)
        }
        ,
        a.prototype.setUserTimeZone = function(e) {
            this.$("UserInfo.TimeZone", e)
        }
        ,
        a.prototype.setUserLanguage = function(e) {
            this.$("UserInfo.Language", e)
        }
        ,
        a.prototype.$ = function(e, t) {
            "string" == typeof t && this.Y.setProperty(e, t)
        }
        ,
        a.prototype.ee = function(e, t, n) {
            "string" == typeof t && this.Y.setPropertyWithPii(e, t, n)
        }
        ,
        a);
        function a(e, t) {
            this.J = e,
            this.Y = t
        }
        t.default = s
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var T = n(21)
          , b = n(0)
          , p = n(2)
          , x = n(1)
          , r = (i.getPayloadBlob = function(e, t) {
            var n, r = !1, i = new T.IO.MemoryStream, o = new T.CompactBinaryProtocolWriter(i);
            for (var s in o.te(T.ne.ie, 3, null),
            o.re(t, T.ne.oe, T.ne.se),
            e)
                if (r)
                    (n = n || {})[s] = e[s],
                    delete e[s];
                else if (e.hasOwnProperty(s)) {
                    o.ae(s);
                    var a = e[s];
                    o.ue(1, T.ne.de),
                    o.te(T.ne.oe, 2, null),
                    o.ae("act_default_source"),
                    o.te(T.ne.oe, 5, null),
                    o.ae(x.newGuid()),
                    o.te(T.ne.ce, 6, null),
                    o._e(x.numberToBondInt64(Date.now())),
                    o.te(T.ne.se, 8, null);
                    var u = i.le().length + 1;
                    o.ue(e[s].length, T.ne.de);
                    for (var c = i.le().length - u, l = 0; l < a.length; ++l) {
                        var f = i.le().length;
                        if (this.writeEvent(a[l], o),
                        2936012 < i.le().length - f)
                            p.default.eventsRejected([a[l]], b.AWTEventsRejectedReason.SizeLimitExceeded),
                            a.splice(l--, 1),
                            i.le().splice(f),
                            this.pe(a.length, i, c, u);
                        else if (2936012 < i.le().length) {
                            i.le().splice(f),
                            n = n || {},
                            e[s] = a.splice(0, l),
                            n[s] = a,
                            this.pe(e[s].length, i, c, u),
                            r = !0;
                            break
                        }
                    }
                    o.fe(!1)
                }
            return o.fe(!1),
            {
                payloadBlob: i.le(),
                remainingRequest: n
            }
        }
        ,
        i.pe = function(e, t, n, r) {
            for (var i = T.ve.he(T.Number.w(e)), o = 0; o < n; ++o) {
                if (!(o < i.length)) {
                    t.le().slice(r + o, n - o);
                    break
                }
                t.le()[r + o] = i[o]
            }
        }
        ,
        i.writeEvent = function(e, t) {
            t.te(T.ne.oe, 1, null),
            t.ae(e.id),
            t.te(T.ne.ce, 3, null),
            t._e(x.numberToBondInt64(e.timestamp)),
            t.te(T.ne.oe, 5, null),
            t.ae(e.type),
            t.te(T.ne.oe, 6, null),
            t.ae(e.name);
            var n = {}
              , r = 0
              , i = {}
              , o = 0
              , s = {}
              , a = 0
              , u = {}
              , c = 0
              , l = {}
              , f = 0
              , p = {}
              , d = 0
              , h = {}
              , v = 0;
            for (var y in e.properties)
                if (e.properties.hasOwnProperty(y))
                    if (0 < (m = e.properties[y]).cc)
                        h[y] = m,
                        v++;
                    else if (0 < m.pii)
                        p[y] = m,
                        d++;
                    else
                        switch (m.type) {
                        case b.AWTPropertyType.String:
                            n[y] = m.value,
                            r++;
                            break;
                        case b.AWTPropertyType.Int64:
                            i[y] = m.value,
                            o++;
                            break;
                        case b.AWTPropertyType.Double:
                            s[y] = m.value,
                            a++;
                            break;
                        case b.AWTPropertyType.Boolean:
                            u[y] = m.value,
                            c++;
                            break;
                        case b.AWTPropertyType.Date:
                            l[y] = m.value,
                            f++
                        }
            if (r)
                for (var y in t.te(T.ne.ie, 13, null),
                t.re(r, T.ne.oe, T.ne.oe),
                n)
                    if (n.hasOwnProperty(y)) {
                        var g = n[y];
                        t.ae(y),
                        t.ae(g.toString())
                    }
            if (d)
                for (var y in t.te(T.ne.ie, 30, null),
                t.re(d, T.ne.oe, T.ne.de),
                p)
                    if (p.hasOwnProperty(y)) {
                        var m = p[y];
                        t.ae(y),
                        t.te(T.ne.ye, 1, null),
                        t.Te(1),
                        t.te(T.ne.ye, 2, null),
                        t.Te(m.pii),
                        t.te(T.ne.oe, 3, null),
                        t.ae(m.value.toString()),
                        t.fe(!1)
                    }
            if (c)
                for (var y in t.te(T.ne.ie, 31, null),
                t.re(c, T.ne.oe, T.ne.ge),
                u)
                    u.hasOwnProperty(y) && (g = u[y],
                    t.ae(y),
                    t.me(g));
            if (f)
                for (var y in t.te(T.ne.ie, 32, null),
                t.re(f, T.ne.oe, T.ne.ce),
                l)
                    l.hasOwnProperty(y) && (g = l[y],
                    t.ae(y),
                    t._e(x.numberToBondInt64(g)));
            if (o)
                for (var y in t.te(T.ne.ie, 33, null),
                t.re(o, T.ne.oe, T.ne.ce),
                i)
                    i.hasOwnProperty(y) && (g = i[y],
                    t.ae(y),
                    t._e(x.numberToBondInt64(g)));
            if (a)
                for (var y in t.te(T.ne.ie, 34, null),
                t.re(a, T.ne.oe, T.ne.Se),
                s)
                    s.hasOwnProperty(y) && (g = s[y],
                    t.ae(y),
                    t.Ae(g));
            if (v)
                for (var y in t.te(T.ne.ie, 36, null),
                t.re(v, T.ne.oe, T.ne.de),
                h)
                    h.hasOwnProperty(y) && (m = h[y],
                    t.ae(y),
                    t.te(T.ne.ye, 1, null),
                    t.Te(m.cc),
                    t.te(T.ne.oe, 2, null),
                    t.ae(m.value.toString()),
                    t.fe(!1));
            t.fe(!1)
        }
        ,
        i.base64Encode = function(e) {
            return T.ve.Ie(e)
        }
        ,
        i);
        function i() {}
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(1)
          , r = n(2)
          , o = n(0)
          , s = (a.initialize = function(e) {
            var n = this;
            this.Ee = e,
            this.We = !0,
            r.default.addNotificationListener({
                eventsSent: function(e) {
                    n.Pe("records_sent_count", e.length, e[0].apiKey)
                },
                eventsDropped: function(e, t) {
                    switch (t) {
                    case o.AWTEventsDroppedReason.NonRetryableStatus:
                        n.Pe("d_send_fail", e.length, e[0].apiKey),
                        n.Pe("records_dropped_count", e.length, e[0].apiKey);
                        break;
                    case o.AWTEventsDroppedReason.QueueFull:
                        n.Pe("d_queue_full", e.length, e[0].apiKey)
                    }
                },
                eventsRejected: function(e, t) {
                    switch (t) {
                    case o.AWTEventsRejectedReason.InvalidEvent:
                        n.Pe("r_inv", e.length, e[0].apiKey);
                        break;
                    case o.AWTEventsRejectedReason.KillSwitch:
                        n.Pe("r_kl", e.length, e[0].apiKey);
                        break;
                    case o.AWTEventsRejectedReason.SizeLimitExceeded:
                        n.Pe("r_size", e.length, e[0].apiKey)
                    }
                    n.Pe("r_count", e.length, e[0].apiKey)
                },
                eventsRetrying: null
            }),
            setTimeout(function() {
                return n.flush()
            }, 6e4)
        }
        ,
        a.teardown = function() {
            this.We && (this.flush(),
            this.We = !1)
        }
        ,
        a.eventReceived = function(e) {
            a.Pe("records_received_count", 1, e)
        }
        ,
        a.flush = function() {
            var e = this;
            if (this.We) {
                for (var t in this.Be)
                    this.Be.hasOwnProperty(t) && this.Ee(this.Be[t], t);
                this.Be = {},
                setTimeout(function() {
                    return e.flush()
                }, 6e4)
            }
        }
        ,
        a.Pe = function(e, t, n) {
            if (this.We && n !== i.StatsApiKey) {
                var r = i.getTenantId(n);
                this.Be[r] || (this.Be[r] = {}),
                this.Be[r][e] ? this.Be[r][e] = this.Be[r][e] + t : this.Be[r][e] = t
            }
        }
        ,
        a.We = !1,
        a.Be = {},
        a);
        function a() {}
        t.default = s
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0)
          , r = n(6)
          , o = n(12)
          , s = n(13)
          , a = n(3)
          , u = n(2)
          , c = n(7)
          , l = (f.initialize = function(e, t) {
            if (void 0 === t && (t = {}),
            !this.we)
                return this.we = !0,
                o.default.defaultTenantToken = e,
                this.Ce(t),
                this.T.disableCookiesUsage && !this.T.propertyStorageOverride && (o.default.sessionEnabled = !1),
                c.default.addPropertyStorageOverride(this.T.propertyStorageOverride),
                c.default.autoCollect(o.default.semanticContext, this.T.disableCookiesUsage, this.T.userAgent),
                a.default.initialize(this.T),
                o.default.loggingEnabled = !0,
                this.T.enableAutoUserSession && (this.getLogger().logSession(r.AWTSessionState.Started),
                window.addEventListener("beforeunload", this.flushAndTeardown)),
                this.getLogger()
        }
        ,
        f.getSemanticContext = function() {
            return o.default.semanticContext
        }
        ,
        f.flush = function(e) {
            this.we && !this.be && a.default.flush(e)
        }
        ,
        f.flushAndTeardown = function() {
            this.we && !this.be && (this.T.enableAutoUserSession && this.getLogger().logSession(r.AWTSessionState.Ended),
            a.default.flushAndTeardown(),
            o.default.loggingEnabled = !1,
            this.be = !0)
        }
        ,
        f.pauseTransmission = function() {
            this.we && !this.be && a.default.pauseTransmission()
        }
        ,
        f.resumeTransmision = function() {
            this.we && !this.be && a.default.resumeTransmision()
        }
        ,
        f.setTransmitProfile = function(e) {
            this.we && !this.be && a.default.setTransmitProfile(e)
        }
        ,
        f.loadTransmitProfiles = function(e) {
            this.we && !this.be && a.default.loadTransmitProfiles(e)
        }
        ,
        f.setContext = function(e, t, n) {
            void 0 === n && (n = i.AWTPropertyType.Unspecified),
            o.default.logManagerContext.setProperty(e, t, n)
        }
        ,
        f.setContextWithPii = function(e, t, n, r) {
            void 0 === r && (r = i.AWTPropertyType.Unspecified),
            o.default.logManagerContext.setPropertyWithPii(e, t, n, r)
        }
        ,
        f.setContextWithCustomerContent = function(e, t, n, r) {
            void 0 === r && (r = i.AWTPropertyType.Unspecified),
            o.default.logManagerContext.setPropertyWithCustomerContent(e, t, n, r)
        }
        ,
        f.getLogger = function(e) {
            var t = e;
            return t && t !== o.default.defaultTenantToken || (t = ""),
            this.Re[t] || (this.Re[t] = new s.default(t)),
            this.Re[t]
        }
        ,
        f.addNotificationListener = function(e) {
            u.default.addNotificationListener(e)
        }
        ,
        f.removeNotificationListener = function(e) {
            u.default.removeNotificationListener(e)
        }
        ,
        f.Ce = function(e) {
            e.collectorUri && (this.T.collectorUri = e.collectorUri),
            0 < e.cacheMemorySizeLimitInNumberOfEvents && (this.T.cacheMemorySizeLimitInNumberOfEvents = e.cacheMemorySizeLimitInNumberOfEvents),
            e.httpXHROverride && e.httpXHROverride.sendPOST && (this.T.httpXHROverride = e.httpXHROverride),
            e.propertyStorageOverride && e.propertyStorageOverride.getProperty && e.propertyStorageOverride.setProperty && (this.T.propertyStorageOverride = e.propertyStorageOverride),
            e.userAgent && (this.T.userAgent = e.userAgent),
            e.disableCookiesUsage && (this.T.disableCookiesUsage = e.disableCookiesUsage),
            e.canSendStatEvent && (this.T.canSendStatEvent = e.canSendStatEvent),
            e.enableAutoUserSession && "undefined" != typeof window && window.addEventListener && (this.T.enableAutoUserSession = e.enableAutoUserSession),
            0 < e.clockSkewRefreshDurationInMins && (this.T.clockSkewRefreshDurationInMins = e.clockSkewRefreshDurationInMins)
        }
        ,
        f.Re = {},
        f.we = !1,
        f.be = !1,
        f.T = {
            collectorUri: "",
            cacheMemorySizeLimitInNumberOfEvents: 1e4,
            disableCookiesUsage: !1,
            canSendStatEvent: function(e) {
                return !0
            },
            clockSkewRefreshDurationInMins: 0
        },
        f);
        function f() {}
        t.default = l
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(5)
          , i = n(8)
          , o = (s.logManagerContext = new r.default,
        s.sessionEnabled = !0,
        s.loggingEnabled = !1,
        s.defaultTenantToken = "",
        s.semanticContext = new i.default(!0,s.logManagerContext),
        s);
        function s() {}
        t.default = o
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(0)
          , i = n(6)
          , r = n(5)
          , o = n(1)
          , a = n(10)
          , u = n(2)
          , c = n(3)
          , l = n(12)
          , f = n(15)
          , p = n(8)
          , d = n(7)
          , h = (v.prototype.setContext = function(e, t, n) {
            void 0 === n && (n = s.AWTPropertyType.Unspecified),
            this.Oe.setProperty(e, t, n)
        }
        ,
        v.prototype.setContextWithPii = function(e, t, n, r) {
            void 0 === r && (r = s.AWTPropertyType.Unspecified),
            this.Oe.setPropertyWithPii(e, t, n, r)
        }
        ,
        v.prototype.setContextWithCustomerContent = function(e, t, n, r) {
            void 0 === r && (r = s.AWTPropertyType.Unspecified),
            this.Oe.setPropertyWithCustomerContent(e, t, n, r)
        }
        ,
        v.prototype.getSemanticContext = function() {
            return this.R
        }
        ,
        v.prototype.logEvent = function(e) {
            if (l.default.loggingEnabled) {
                this.De || (this.De = l.default.defaultTenantToken,
                this.Me());
                var t = !0;
                o.isString(e) ? e = {
                    name: e
                } : e instanceof r.default && (e = e.getEvent(),
                t = !1),
                a.default.eventReceived(this.De),
                v.ke(v.Ue(e, this.De, t), this.Oe)
            }
        }
        ,
        v.prototype.logSession = function(e, t) {
            if (l.default.sessionEnabled) {
                var n = {
                    name: "session",
                    type: "session",
                    properties: {}
                };
                if (v.xe(n, t),
                n.priority = s.AWTEventPriority.High,
                e === i.AWTSessionState.Started) {
                    if (0 < this.Ne)
                        return;
                    this.Ne = (new Date).getTime(),
                    this.Le = o.newGuid(),
                    this.setContext("Session.Id", this.Le),
                    n.properties["Session.State"] = "Started"
                } else {
                    if (e !== i.AWTSessionState.Ended)
                        return;
                    if (0 === this.Ne)
                        return;
                    var r = Math.floor(((new Date).getTime() - this.Ne) / 1e3);
                    n.properties["Session.Id"] = this.Le,
                    n.properties["Session.State"] = "Ended",
                    n.properties["Session.Duration"] = r.toString(),
                    n.properties["Session.DurationBucket"] = v.Fe(r),
                    this.Ne = 0,
                    this.setContext("Session.Id", null),
                    this.Le = void 0
                }
                n.properties["Session.FirstLaunchTime"] = d.default.firstLaunchTime,
                this.logEvent(n)
            }
        }
        ,
        v.prototype.getSessionId = function() {
            return this.Le
        }
        ,
        v.prototype.logFailure = function(e, t, n, r, i) {
            if (e && t) {
                var o = {
                    name: "failure",
                    type: "failure",
                    properties: {}
                };
                v.xe(o, i),
                o.properties["Failure.Signature"] = e,
                o.properties["Failure.Detail"] = t,
                n && (o.properties["Failure.Category"] = n),
                r && (o.properties["Failure.Id"] = r),
                o.priority = s.AWTEventPriority.High,
                this.logEvent(o)
            }
        }
        ,
        v.prototype.logPageView = function(e, t, n, r, i, o) {
            if (e && t) {
                var s = {
                    name: "pageview",
                    type: "pageview",
                    properties: {}
                };
                v.xe(s, o),
                s.properties["PageView.Id"] = e,
                s.properties["PageView.Name"] = t,
                n && (s.properties["PageView.Category"] = n),
                r && (s.properties["PageView.Uri"] = r),
                i && (s.properties["PageView.ReferrerUri"] = i),
                this.logEvent(s)
            }
        }
        ,
        v.prototype.Me = function() {
            !v.qe[this.De] && this.De && (v.qe[this.De] = o.newGuid())
        }
        ,
        v.xe = function(e, t) {
            if (t)
                for (var n in t instanceof r.default && (t = t.getEvent()),
                t.name && (e.name = t.name),
                t.priority && (e.priority = t.priority),
                t.properties)
                    t.properties.hasOwnProperty(n) && (e.properties[n] = t.properties[n])
        }
        ,
        v.Fe = function(e) {
            return e < 0 ? "Undefined" : e <= 3 ? "UpTo3Sec" : e <= 10 ? "UpTo10Sec" : e <= 30 ? "UpTo30Sec" : e <= 60 ? "UpTo60Sec" : e <= 180 ? "UpTo3Min" : e <= 600 ? "UpTo10Min" : e <= 1800 ? "UpTo30Min" : "Above30Min"
        }
        ,
        v.ke = function(e, t) {
            return e.name && o.isString(e.name) ? (e.name = e.name.toLowerCase(),
            e.name = e.name.replace(o.EventNameDotRegex, "_"),
            e.type && o.isString(e.type) ? e.type = e.type.toLowerCase() : e.type = "custom",
            o.EventNameAndTypeRegex.test(e.name) && o.EventNameAndTypeRegex.test(e.type) ? ((!o.isNumber(e.timestamp) || e.timestamp < 0) && (e.timestamp = (new Date).getTime()),
            e.properties || (e.properties = {}),
            this.He(e, t.getPropertyMap()),
            this.He(e, l.default.logManagerContext.getPropertyMap()),
            this.Qe(e, "EventInfo.InitId", this.je(e.apiKey)),
            this.Qe(e, "EventInfo.Sequence", this.ze(e.apiKey)),
            this.Qe(e, "EventInfo.SdkVersion", f.FullVersionString),
            this.Qe(e, "EventInfo.Name", e.name),
            this.Qe(e, "EventInfo.Time", new Date(e.timestamp).toISOString()),
            o.isPriority(e.priority) || (e.priority = s.AWTEventPriority.Normal),
            void this.Ke(e)) : void u.default.eventsRejected([e], s.AWTEventsRejectedReason.InvalidEvent)) : void u.default.eventsRejected([e], s.AWTEventsRejectedReason.InvalidEvent)
        }
        ,
        v.He = function(e, t) {
            if (t)
                for (var n in t)
                    t.hasOwnProperty(n) && (e.properties[n] || (e.properties[n] = t[n]))
        }
        ,
        v.Qe = function(e, t, n) {
            e.properties[t] = {
                value: n,
                pii: s.AWTPiiKind.NotSet,
                type: s.AWTPropertyType.String
            }
        }
        ,
        v.Ke = function(e) {
            c.default.sendEvent(e)
        }
        ,
        v.Ue = function(e, t, n) {
            if (e.properties = e.properties || {},
            n)
                for (var r in e.properties)
                    e.properties.hasOwnProperty(r) && (e.properties[r] = o.sanitizeProperty(r, e.properties[r]),
                    null === e.properties[r] && delete e.properties[r]);
            var i = e;
            return i.id = o.newGuid(),
            i.apiKey = t,
            i
        }
        ,
        v.je = function(e) {
            return v.qe[e]
        }
        ,
        v.ze = function(e) {
            return void 0 === v.Ge[e] && (v.Ge[e] = 0),
            (++v.Ge[e]).toString()
        }
        ,
        v.Ge = {},
        v.qe = {},
        v);
        function v(e) {
            this.De = e,
            this.Oe = new r.default,
            this.R = new p.default(!1,this.Oe),
            this.Ne = 0,
            this.Me()
        }
        t.default = h
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.AWT_REAL_TIME = "REAL_TIME",
        t.AWT_NEAR_REAL_TIME = "NEAR_REAL_TIME",
        t.AWT_BEST_EFFORT = "BEST_EFFORT"
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.Version = "1.8.3",
        t.FullVersionString = "AWT-Web-JS-" + t.Version
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(0);
        t.AWTPropertyType = r.AWTPropertyType,
        t.AWTPiiKind = r.AWTPiiKind,
        t.AWTEventPriority = r.AWTEventPriority,
        t.AWTEventsDroppedReason = r.AWTEventsDroppedReason,
        t.AWTEventsRejectedReason = r.AWTEventsRejectedReason,
        t.AWTCustomerContentKind = r.AWTCustomerContentKind;
        var i = n(6);
        t.AWTUserIdType = i.AWTUserIdType,
        t.AWTSessionState = i.AWTSessionState;
        var o = n(14);
        t.AWT_BEST_EFFORT = o.AWT_BEST_EFFORT,
        t.AWT_NEAR_REAL_TIME = o.AWT_NEAR_REAL_TIME,
        t.AWT_REAL_TIME = o.AWT_REAL_TIME;
        var s = n(5);
        t.AWTEventProperties = s.default;
        var a = n(13);
        t.AWTLogger = a.default;
        var u = n(11);
        t.AWTLogManager = u.default;
        var c = n(29);
        t.AWTTransmissionManager = c.default;
        var l = n(9);
        t.AWTSerializer = l.default;
        var f = n(8);
        t.AWTSemanticContext = f.default
    }
    , function(e, t, n) {
        "use strict";
        var r;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        (r = t.ne || (t.ne = {}))[r.Ve = 0] = "_BT_STOP",
        r[r.Xe = 1] = "_BT_STOP_BASE",
        r[r.ge = 2] = "_BT_BOOL",
        r[r.Se = 8] = "_BT_DOUBLE",
        r[r.oe = 9] = "_BT_STRING",
        r[r.de = 10] = "_BT_STRUCT",
        r[r.se = 11] = "_BT_LIST",
        r[r.ie = 13] = "_BT_MAP",
        r[r.ye = 16] = "_BT_INT32",
        r[r.ce = 17] = "_BT_INT64"
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(4)
          , i = n(19)
          , o = n(22);
        t.Ye = function(e) {
            for (var t = [], n = 0; n < e.length; ++n) {
                var r = e.charCodeAt(n);
                r < 128 ? t.push(r) : r < 2048 ? t.push(192 | r >> 6, 128 | 63 & r) : r < 55296 || 57344 <= r ? t.push(224 | r >> 12, 128 | r >> 6 & 63, 128 | 63 & r) : (r = 65536 + ((1023 & r) << 10 | 1023 & e.charCodeAt(++n)),
                t.push(240 | r >> 18, 128 | r >> 12 & 63, 128 | r >> 6 & 63, 128 | 63 & r))
            }
            return t
        }
        ,
        t.Ie = function(e) {
            for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = [], r = e.length % 3, i = 0, o = e.length - r; i < o; i += 3) {
                var s = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2];
                n.push([t.charAt((a = s) >> 18 & 63), t.charAt(a >> 12 & 63), t.charAt(a >> 6 & 63), t.charAt(63 & a)].join(""))
            }
            var a;
            switch (r) {
            case 1:
                s = e[e.length - 1];
                n.push(t.charAt(s >> 2)),
                n.push(t.charAt(s << 4 & 63)),
                n.push("==");
                break;
            case 2:
                var u = (e[e.length - 2] << 8) + e[e.length - 1];
                n.push(t.charAt(u >> 10)),
                n.push(t.charAt(u >> 4 & 63)),
                n.push(t.charAt(u << 2 & 63)),
                n.push("=")
            }
            return n.join("")
        }
        ,
        t.he = function(e) {
            for (var t = []; 4294967168 & e; )
                t.push(127 & e | 128),
                e >>>= 7;
            return t.push(127 & e),
            t
        }
        ,
        t.$e = function(e) {
            for (var t = e.low, n = e.high, r = []; n || 4294967168 & t; )
                r.push(127 & t | 128),
                t = (127 & n) << 25 | t >>> 7,
                n >>>= 7;
            return r.push(127 & t),
            r
        }
        ,
        t.et = function(e) {
            if (o.BrowserChecker.Ze()) {
                var t = new DataView(new ArrayBuffer(8));
                t.setFloat64(0, e, !0);
                for (var n = [], r = 0; r < 8; ++r)
                    n.push(t.getUint8(r));
                return n
            }
            return i.FloatUtils.Je(e, !0)
        }
        ,
        t.tt = function(e) {
            return (e = s.Number.B(e)) << 1 ^ e >> 31
        }
        ,
        t.it = function(e) {
            var t = e.low
              , n = e.high
              , r = n << 1 | t >>> 31
              , i = t << 1;
            2147483648 & n && (r = ~r,
            i = ~i);
            var o = new s.UInt64("0");
            return o.low = i,
            o.high = r,
            o
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = (i.Je = function(e, t) {
            if (!e)
                return t ? this.nt : this.rt;
            var n = t ? 52 : 23
              , r = (1 << (t ? 11 : 8) - 1) - 1
              , i = 1 - r
              , o = r
              , s = e < 0 ? 1 : 0;
            e = Math.abs(e);
            for (var a = Math.floor(e), u = e - a, c = 2 * (2 + r) + n, l = new Array(c), f = 0; f < c; )
                l[f++] = 0;
            for (f = 2 + r; f && a; )
                l[--f] = a % 2,
                a = Math.floor(a / 2);
            for (f = 1 + r; f < c - 1 && 0 < u; )
                1 <= (u *= 2) ? (l[++f] = 1,
                --u) : l[++f] = 0;
            for (var p = 0; p < c && !l[p]; )
                p++;
            var d = 1 + r - p
              , h = p + n;
            if (l[h + 1]) {
                for (f = h; p < f && (l[f] = 1 - l[f],
                !l); --f)
                    ;
                f === p && ++d
            }
            if (o < d || a)
                return s ? t ? this.ot : this.st : t ? this.at : this.ut;
            if (d < i)
                return t ? this.nt : this.rt;
            if (t) {
                var v = 0;
                for (f = 0; f < 20; ++f)
                    v = v << 1 | l[++p];
                for (var y = 0; f < 52; ++f)
                    y = y << 1 | l[++p];
                return [255 & y, y >> 8 & 255, y >> 16 & 255, y >>> 24, 255 & (v = s << 31 | 2147483647 & (v | d + r << 20)), v >> 8 & 255, v >> 16 & 255, v >>> 24]
            }
            var g = 0;
            for (f = 0; f < 23; ++f)
                g = g << 1 | l[++p];
            return [255 & (g = s << 31 | 2147483647 & (g | d + r << 23)), g >> 8 & 255, g >> 16 & 255, g >>> 24]
        }
        ,
        i.rt = [0, 0, 0, 0],
        i.nt = [0, 0, 0, 0, 0, 0, 0, 0],
        i.ut = [0, 0, 128, 127],
        i.st = [0, 0, 128, 255],
        i.at = [0, 0, 0, 0, 0, 0, 240, 127],
        i.ot = [0, 0, 0, 0, 0, 0, 240, 255],
        i);
        function i() {}
        t.FloatUtils = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(4)
          , i = (o.prototype.ct = function(e) {
            this.dt.push(r.Number.W(e))
        }
        ,
        o.prototype._t = function(e, t, n) {
            for (; n--; )
                this.ct(e[t++])
        }
        ,
        o.prototype.le = function() {
            return this.dt
        }
        ,
        o);
        function o() {
            this.dt = []
        }
        t.MemoryStream = i
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(17);
        t.ne = r.ne;
        var i = n(18);
        t.ve = i;
        var o = n(20);
        t.IO = o;
        var s = n(4);
        t.Int64 = s.Int64,
        t.UInt64 = s.UInt64,
        t.Number = s.Number;
        var a = (u.prototype.pt = function(e) {
            this.lt._t(e, 0, e.length)
        }
        ,
        u.prototype.me = function(e) {
            this.lt.ct(e ? 1 : 0)
        }
        ,
        u.prototype.ue = function(e, t) {
            this.ft(t),
            this.ht(e)
        }
        ,
        u.prototype.re = function(e, t, n) {
            this.ft(t),
            this.ft(n),
            this.ht(e)
        }
        ,
        u.prototype.Ae = function(e) {
            var t = i.et(e);
            this.lt._t(t, 0, t.length)
        }
        ,
        u.prototype.te = function(e, t, n) {
            t <= 5 ? this.lt.ct(e | t << 5) : t <= 255 ? (this.lt.ct(192 | e),
            this.lt.ct(t)) : (this.lt.ct(224 | e),
            this.lt.ct(t),
            this.lt.ct(t >> 8))
        }
        ,
        u.prototype.Te = function(e) {
            e = i.tt(e),
            this.ht(e)
        }
        ,
        u.prototype._e = function(e) {
            this.vt(i.it(e))
        }
        ,
        u.prototype.ae = function(e) {
            if ("" === e)
                this.ht(0);
            else {
                var t = i.Ye(e);
                this.ht(t.length),
                this.lt._t(t, 0, t.length)
            }
        }
        ,
        u.prototype.fe = function(e) {
            this.ft(e ? r.ne.Xe : r.ne.Ve)
        }
        ,
        u.prototype.ht = function(e) {
            var t = i.he(s.Number.w(e));
            this.lt._t(t, 0, t.length)
        }
        ,
        u.prototype.vt = function(e) {
            var t = i.$e(e);
            this.lt._t(t, 0, t.length)
        }
        ,
        u.prototype.ft = function(e) {
            this.lt.ct(s.Number.P(e))
        }
        ,
        u);
        function u(e) {
            this.lt = e
        }
        t.CompactBinaryProtocolWriter = a
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = (i.Ze = function() {
            return "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView
        }
        ,
        i);
        function i() {}
        t.BrowserChecker = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = (i.prototype.allowRequestSending = function() {
            return this.Tt && !this.gt ? (this.Tt = !1,
            !(this.mt = !1)) : this.mt
        }
        ,
        i.prototype.shouldAddClockSkewHeaders = function() {
            return this.St
        }
        ,
        i.prototype.getClockSkewHeaderValue = function() {
            return this.At
        }
        ,
        i.prototype.setClockSkew = function(e) {
            this.gt || (e ? this.At = e : this.St = !1,
            this.gt = !0,
            this.mt = !0)
        }
        ,
        i.prototype.yt = function() {
            var e = this;
            this.Tt = !0,
            this.gt = !1,
            this.mt = !0,
            this.St = !0,
            this.At = "use-collector-delta",
            0 < this.clockSkewRefreshDurationInMins && setTimeout(function() {
                return e.yt()
            }, 6e4 * this.clockSkewRefreshDurationInMins)
        }
        ,
        i);
        function i(e) {
            this.clockSkewRefreshDurationInMins = e,
            this.yt()
        }
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = (i.prototype.setKillSwitchTenants = function(e, t) {
            if (e && t)
                try {
                    var n = e.split(",");
                    if ("this-request-only" === t)
                        return n;
                    for (var r = 1e3 * parseInt(t, 10), i = 0; i < n.length; ++i)
                        this.It[n[i]] = Date.now() + r
                } catch (e) {
                    return []
                }
            return []
        }
        ,
        i.prototype.isTenantKilled = function(e) {
            return void 0 !== this.It[e] && this.It[e] > Date.now() || (delete this.It[e],
            !1)
        }
        ,
        i);
        function i() {
            this.It = {}
        }
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(0)
          , i = (o.prototype.addEventToBatch = function(e) {
            if (e.priority !== r.AWTEventPriority.Immediate_sync)
                return this.Bt >= this.Wt && this.flushBatch(),
                void 0 === this.Pt[e.apiKey] && (this.Pt[e.apiKey] = []),
                this.Pt[e.apiKey].push(e),
                this.Bt++,
                null;
            var t = {};
            return t[e.apiKey] = [e],
            t
        }
        ,
        o.prototype.flushBatch = function() {
            0 < this.Bt && (this.Et.push(this.Pt),
            this.Pt = {},
            this.Bt = 0)
        }
        ,
        o.prototype.hasBatch = function() {
            return 0 < this.Bt
        }
        ,
        o);
        function o(e, t) {
            this.Et = e,
            this.Wt = t,
            this.Pt = {},
            this.Bt = 0
        }
        t.default = i
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = (i.shouldRetryForStatus = function(e) {
            return !(300 <= e && e < 500 && 408 !== e || 501 === e || 505 === e)
        }
        ,
        i.getMillisToBackoffForRetry = function(e) {
            var t, n = Math.floor(1200 * Math.random()) + 2400;
            return t = Math.pow(4, e) * n,
            Math.min(t, 12e4)
        }
        ,
        i);
        function i() {}
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var d = n(0)
          , p = n(9)
          , h = n(26)
          , o = n(24)
          , s = n(23)
          , a = n(15)
          , v = n(1)
          , y = n(2)
          , g = n(3)
          , c = "POST"
          , r = (i.prototype.hasIdleConnection = function() {
            return this.Nt < 2
        }
        ,
        i.prototype.sendQueuedRequests = function() {
            for (; this.hasIdleConnection() && !this._ && 0 < this.wt.length && this.Mt.allowRequestSending(); )
                this.Nt++,
                this.Ut(this.wt.shift(), 0, !1);
            this.hasIdleConnection() && g.default.scheduleTimer()
        }
        ,
        i.prototype.isCompletelyIdle = function() {
            return 0 === this.Nt
        }
        ,
        i.prototype.teardown = function() {
            for (; 0 < this.wt.length; )
                this.Ut(this.wt.shift(), 0, !0)
        }
        ,
        i.prototype.pause = function() {
            this._ = !0
        }
        ,
        i.prototype.resume = function() {
            this._ = !1,
            this.sendQueuedRequests()
        }
        ,
        i.prototype.removeQueuedRequests = function() {
            this.wt.length = 0
        }
        ,
        i.prototype.sendSynchronousRequest = function(e, t) {
            this._ && (e[t][0].priority = d.AWTEventPriority.High),
            this.Nt++,
            this.Ut(e, 0, !1, !0)
        }
        ,
        i.prototype.Ut = function(n, r, i, o) {
            var s = this;
            void 0 === o && (o = !1);
            try {
                if (this._)
                    return this.Nt--,
                    void this.Ct.addBackRequest(n);
                var a = 0
                  , u = "";
                for (var e in n)
                    n.hasOwnProperty(e) && (this.Dt.isTenantKilled(e) ? (y.default.eventsRejected(n[e], d.AWTEventsRejectedReason.KillSwitch),
                    delete n[e]) : (0 < u.length && (u += ","),
                    u += e,
                    a++));
                if (0 < a) {
                    var t = p.default.getPayloadBlob(n, a);
                    t.remainingRequest && this.wt.push(t.remainingRequest);
                    var c, l = this.Rt + "&x-apikey=" + u + "&client-time-epoch-millis=" + Date.now().toString();
                    for (var e in this.Mt.shouldAddClockSkewHeaders() && (l = l + "&time-delta-to-apply-millis=" + this.Mt.getClockSkewHeaderValue()),
                    c = v.isUint8ArrayAvailable() ? new Uint8Array(t.payloadBlob) : p.default.base64Encode(t.payloadBlob),
                    n)
                        if (n.hasOwnProperty(e))
                            for (var f = 0; f < n[e].length; ++f)
                                0 < n[e][f].sendAttempt ? n[e][f].sendAttempt++ : n[e][f].sendAttempt = 1;
                    if (this.Ot && i && v.isBeaconsSupported() && navigator.sendBeacon(l, c))
                        return;
                    this.bt.sendPOST(l, c, function(e, t) {
                        s.xt(e, t, n, a, u, r, i, o)
                    }, function(e, t) {
                        s.xt(e, t, n, a, u, r, i, o)
                    }, function(e, t) {
                        s.xt(e, t, n, a, u, r, i, o)
                    }, i || o)
                } else
                    i || this.Lt(!1, {}, i, o)
            } catch (n) {
                this.Lt(!1, {}, i, o)
            }
        }
        ,
        i.prototype.xt = function(e, t, n, r, i, o, s, a) {
            var u = this
              , c = !0;
            if (void 0 !== e) {
                if (t) {
                    var l = this.Dt.setKillSwitchTenants(t["kill-tokens"], t["kill-duration-seconds"]);
                    this.Mt.setClockSkew(t["time-delta-millis"]);
                    for (var f = 0; f < l.length; ++f)
                        y.default.eventsRejected(n[l[f]], d.AWTEventsRejectedReason.KillSwitch),
                        delete n[l[f]],
                        r--
                } else
                    this.Mt.setClockSkew(null);
                if (200 === e)
                    return void this.Lt(!0, n, s, a);
                (!h.default.shouldRetryForStatus(e) || r <= 0) && (c = !1)
            }
            if (c)
                if (a)
                    this.Nt--,
                    n[i][0].priority = d.AWTEventPriority.High,
                    this.Ct.addBackRequest(n);
                else if (o < 1) {
                    for (var p in n)
                        n.hasOwnProperty(p) && y.default.eventsRetrying(n[p]);
                    setTimeout(function() {
                        return u.Ut(n, o + 1, !1)
                    }, h.default.getMillisToBackoffForRetry(o))
                } else
                    this.Nt--,
                    g.default.backOffTransmission(),
                    this.Ct.addBackRequest(n);
            else
                this.Lt(!1, n, s, a)
        }
        ,
        i.prototype.Lt = function(e, t, n, r) {
            for (var i in e && g.default.clearBackOff(),
            t)
                t.hasOwnProperty(i) && (e ? y.default.eventsSent(t[i]) : y.default.eventsDropped(t[i], d.AWTEventsDroppedReason.NonRetryableStatus));
            this.Nt--,
            r || n || this.sendQueuedRequests()
        }
        ,
        i.prototype.kt = function(e) {
            var t = {};
            if (e)
                for (var n = e.split("\n"), r = 0; r < n.length; ++r) {
                    var i = n[r].split(": ");
                    t[i[0]] = i[1]
                }
            return t
        }
        ,
        i);
        function i(e, t, n, r, i) {
            var u = this;
            this.wt = e,
            this.Ct = n,
            this.bt = r,
            this.Rt = "?qsp=true&content-type=application%2Fbond-compact-binary&client-id=NO_AUTH&sdk-version=" + a.FullVersionString,
            this.Dt = new o.default,
            this._ = !1,
            this.Ot = !1,
            this.Nt = 0,
            this.Mt = new s.default(i),
            v.isUint8ArrayAvailable() || (this.Rt += "&content-encoding=base64"),
            this.Rt = t + this.Rt,
            this.bt || (this.Ot = !v.isReactNative(),
            this.bt = {
                sendPOST: function(e, t, n, r, i, o) {
                    try {
                        if (v.useXDomainRequest()) {
                            var s = new XDomainRequest;
                            s.open(c, e),
                            s.onload = function() {
                                i(200, null)
                            }
                            ,
                            s.onerror = function() {
                                r(400, null)
                            }
                            ,
                            s.ontimeout = function() {
                                n(500, null)
                            }
                            ,
                            s.send(t)
                        } else if (v.isReactNative())
                            fetch(e, {
                                body: t,
                                method: c
                            }).then(function(e) {
                                var n = {};
                                e.headers && e.headers.forEach(function(e, t) {
                                    n[t] = e
                                }),
                                i(e.status, n)
                            }).catch(function(e) {
                                r(0, {})
                            });
                        else {
                            var a = new XMLHttpRequest;
                            a.open(c, e, !o),
                            a.onload = function() {
                                i(a.status, u.kt(a.getAllResponseHeaders()))
                            }
                            ,
                            a.onerror = function() {
                                r(a.status, u.kt(a.getAllResponseHeaders()))
                            }
                            ,
                            a.ontimeout = function() {
                                n(a.status, u.kt(a.getAllResponseHeaders()))
                            }
                            // ,
                            // a.send(t)
                        }
                    } catch (e) {
                        r(400, null)
                    }
                }
            })
        }
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0)
          , o = n(27)
          , r = n(3)
          , s = n(25)
          , a = n(2)
          , u = n(1)
          , c = (l.prototype.addEvent = function(e) {
            u.isPriority(e.priority) || (e.priority = i.AWTEventPriority.Normal),
            e.priority === i.AWTEventPriority.Immediate_sync ? this.Vt.sendSynchronousRequest(this.Gt.addEventToBatch(e), e.apiKey) : this.jt < this.Ft || this.Zt(e.priority) ? this.Xt(e) : a.default.eventsDropped([e], i.AWTEventsDroppedReason.QueueFull)
        }
        ,
        l.prototype.sendEventsForPriorityAndAbove = function(e) {
            this.Jt(e),
            this.Vt.sendQueuedRequests()
        }
        ,
        l.prototype.hasEvents = function() {
            return (0 < this.zt[i.AWTEventPriority.High][0].length || 0 < this.zt[i.AWTEventPriority.Normal][0].length || 0 < this.zt[i.AWTEventPriority.Low][0].length || this.Gt.hasBatch()) && this.Vt.hasIdleConnection()
        }
        ,
        l.prototype.addBackRequest = function(e) {
            if (!this._ || !this.Qt) {
                for (var t in e)
                    if (e.hasOwnProperty(t))
                        for (var n = 0; n < e[t].length; ++n)
                            e[t][n].sendAttempt < 6 ? this.addEvent(e[t][n]) : a.default.eventsDropped([e[t][n]], i.AWTEventsDroppedReason.NonRetryableStatus);
                r.default.scheduleTimer()
            }
        }
        ,
        l.prototype.teardown = function() {
            this._ || (this.Jt(i.AWTEventPriority.Low),
            this.Vt.teardown())
        }
        ,
        l.prototype.uploadNow = function(e) {
            var t = this;
            this.Kt(),
            this.qt ? this.Ht.push(e) : (this.qt = !0,
            setTimeout(function() {
                return t.Yt(e)
            }, 0))
        }
        ,
        l.prototype.pauseTransmission = function() {
            this._ = !0,
            this.Vt.pause(),
            this.shouldDropEventsOnPause && (this.jt -= this.zt[i.AWTEventPriority.High][0].length + this.zt[i.AWTEventPriority.Normal][0].length + this.zt[i.AWTEventPriority.Low][0].length,
            this.zt[i.AWTEventPriority.High][0] = [],
            this.zt[i.AWTEventPriority.Normal][0] = [],
            this.zt[i.AWTEventPriority.Low][0] = [],
            this.Vt.removeQueuedRequests())
        }
        ,
        l.prototype.resumeTransmission = function() {
            this._ = !1,
            this.Vt.resume()
        }
        ,
        l.prototype.shouldDropEventsOnPause = function(e) {
            this.Qt = e
        }
        ,
        l.prototype.$t = function() {
            this.zt[i.AWTEventPriority.High].shift(),
            this.zt[i.AWTEventPriority.Normal].shift(),
            this.zt[i.AWTEventPriority.Low].shift()
        }
        ,
        l.prototype.Kt = function() {
            this.zt[i.AWTEventPriority.High].push([]),
            this.zt[i.AWTEventPriority.Normal].push([]),
            this.zt[i.AWTEventPriority.Low].push([])
        }
        ,
        l.prototype.Xt = function(e) {
            this._ && this.Qt || (this.jt++,
            this.zt[e.priority][this.zt[e.priority].length - 1].push(e))
        }
        ,
        l.prototype.Zt = function(e) {
            for (var t = i.AWTEventPriority.Low; t <= e; ) {
                if (0 < this.zt[t][this.zt[t].length - 1].length)
                    return a.default.eventsDropped([this.zt[t][this.zt[t].length - 1].shift()], i.AWTEventsDroppedReason.QueueFull),
                    !0;
                t++
            }
            return !1
        }
        ,
        l.prototype.Jt = function(e) {
            for (var t = i.AWTEventPriority.High; e <= t; ) {
                for (; 0 < this.zt[t][0].length; ) {
                    var n = this.zt[t][0].pop();
                    this.jt--,
                    this.Gt.addEventToBatch(n)
                }
                t--
            }
            this.Gt.flushBatch()
        }
        ,
        l.prototype.Yt = function(e) {
            var t = this;
            this.hasEvents() && this.sendEventsForPriorityAndAbove(i.AWTEventPriority.Low),
            this.ei(function() {
                t.$t(),
                null != e && e(),
                0 < t.Ht.length ? setTimeout(function() {
                    return t.Yt(t.Ht.shift())
                }, 0) : (t.qt = !1,
                t.hasEvents() && r.default.scheduleTimer())
            })
        }
        ,
        l.prototype.ei = function(e) {
            var t = this;
            this.Vt.isCompletelyIdle() ? e() : setTimeout(function() {
                return t.ei(e)
            }, 250)
        }
        ,
        l);
        function l(e, t, n, r) {
            this.Ft = t,
            this.qt = !1,
            this.Ht = [],
            this.Qt = !1,
            this._ = !1,
            this.jt = 0,
            this.Et = [],
            this.zt = {},
            this.zt[i.AWTEventPriority.High] = [],
            this.zt[i.AWTEventPriority.Normal] = [],
            this.zt[i.AWTEventPriority.Low] = [],
            this.Kt(),
            this.Gt = new s.default(this.Et,500),
            this.Vt = new o.default(this.Et,e,this,n,r)
        }
        t.default = c
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(3)
          , i = (o.setEventsHandler = function(e) {
            r.default.setEventsHandler(e)
        }
        ,
        o.getEventsHandler = function() {
            return r.default.getEventsHandler()
        }
        ,
        o.scheduleTimer = function() {
            r.default.scheduleTimer()
        }
        ,
        o);
        function o() {}
        t.default = i
    }
    , function(e, t, n) {
        e.exports = n(16)
    }
    ],
    r.c = i,
    r.i = function(e) {
        return e
    }
    ,
    r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }
    ,
    r.n = function(e) {
        var t = e && e.e ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return r.d(t, "a", t),
        t
    }
    ,
    r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    r.p = "",
    r(r.s = 30);
    function r(e) {
        if (i[e])
            return i[e].exports;
        var t = i[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, r),
        t.l = !0,
        t.exports
    }
    var n, i
}),
function() {
    function e(e) {
        return "function" == typeof e || !1
    }
    function f(e) {
        return "string" == typeof e ? e : null == e ? "" : e + ""
    }
    function t(e) {
        return F[e]
    }
    function p(e) {
        return "\\" + z[e]
    }
    function n(e) {
        return !!e && "object" == typeof e
    }
    function d() {}
    function h(e, t, n, r) {
        return e !== A && te.call(r, n) ? e : t
    }
    function v(e, t, n) {
        var r = xe(t);
        oe.apply(r, me(t));
        for (var i = -1, o = r.length; ++i < o; ) {
            var s = r[i]
              , a = e[s]
              , u = n(a, t[s], s, e, t);
            (u == u ? u === a : a != a) && (a !== A || s in e) || (e[s] = u)
        }
        return e
    }
    function r(e, t, n) {
        n = n || {};
        for (var r = -1, i = t.length; ++r < i; ) {
            var o = t[r];
            n[o] = e[o]
        }
        return n
    }
    function y(e) {
        return null != e && m(ge(e))
    }
    function g(e, t) {
        return t = null == t ? de : t,
        -1 < (e = +e) && 0 == e % 1 && e < t
    }
    function m(e) {
        return "number" == typeof e && -1 < e && 0 == e % 1 && e <= de
    }
    function i(e) {
        for (var t = u(e), n = t.length, r = n && e.length, i = d.support, o = (i = r && m(r) && (Te(e) || i.nonEnumStrings && w(e) || i.nonEnumArgs && T(e)),
        -1), s = []; ++o < n; ) {
            var a = t[o];
            (i && g(a, r) || te.call(e, a)) && s.push(a)
        }
        return s
    }
    function o(e) {
        if (d.support.unindexedChars && w(e)) {
            for (var t = -1, n = e.length, r = Object(e); ++t < n; )
                r[t] = e.charAt(t);
            return r
        }
        return x(e) ? e : Object(e)
    }
    function s(i, o) {
        if ("function" != typeof i)
            throw new TypeError(S);
        return o = pe(o === A ? i.length - 1 : +o || 0, 0),
        function() {
            for (var e = arguments, t = -1, n = pe(e.length - o, 0), r = Array(n); ++t < n; )
                r[t] = e[o + t];
            switch (o) {
            case 0:
                return i.call(this, r);
            case 1:
                return i.call(this, e[0], r);
            case 2:
                return i.call(this, e[0], e[1], r)
            }
            for (n = Array(o + 1),
            t = -1; ++t < o; )
                n[t] = e[t];
            return n[o] = r,
            i.apply(this, n)
        }
    }
    function T(e) {
        return n(e) && y(e) && ne.call(e) == E
    }
    function b(e) {
        return n(e) && "string" == typeof e.message && ne.call(e) == C
    }
    function x(e) {
        var t = typeof e;
        return "function" == t || !!e && "object" == t
    }
    function a(e) {
        return null != e && (ne.call(e) == P ? re.test(ee.call(e)) : n(e) && (Q(e) ? re : U).test(e))
    }
    function w(e) {
        return "string" == typeof e || n(e) && ne.call(e) == N
    }
    function u(e) {
        if (null == e)
            return [];
        x(e) || (e = Object(e));
        for (var t = e.length, n = d.support, r = (t = t && m(t) && (Te(e) || n.nonEnumStrings && w(e) || n.nonEnumArgs && T(e)) && t || 0,
        e.constructor), i = -1, o = (r = be(r) && r.prototype || Y) === e, s = Array(t), a = 0 < t, u = n.enumErrorProps && (e === J || e instanceof Error), c = n.enumPrototypes && be(e); ++i < t; )
            s[i] = i + "";
        for (var l in e)
            c && "prototype" == l || u && ("message" == l || "name" == l) || a && g(l, t) || "constructor" == l && (o || !te.call(e, l)) || s.push(l);
        if (n.nonEnumShadows && e !== Y)
            for (t = e === Z ? N : e === J ? C : ne.call(e),
            n = he[t] || he[k],
            t == k && (r = Y),
            t = B.length; t--; )
                i = n[l = B[t]],
                o && i || (i ? !te.call(e, l) : e[l] === r[l]) || s.push(l);
        return s
    }
    function c(e) {
        return (e = f(e)) && L.test(e) ? e.replace(I, "\\$&") : e
    }
    function l(e) {
        return function() {
            return e
        }
    }
    var A, S = "Expected a function", E = "[object Arguments]", C = "[object Error]", P = "[object Function]", k = "[object Object]", N = "[object String]", D = /\b__p\+='';/g, _ = /\b(__p\+=)''\+/g, O = /(__e\(.*?\)|\b__t\))\+'';/g, R = /[&<>"'`]/g, j = RegExp(R.source), W = /<%=([\s\S]+?)%>/g, I = /[.*+?^${}()|[\]\/\\]/g, L = RegExp(I.source), M = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, U = /^\[object .+?Constructor\]$/, q = /($^)/, H = /['\n\r\u2028\u2029\\]/g, B = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), F = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "`": "&#96;"
    }, z = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, $ = (G = {
        function: !0,
        object: !0
    })[typeof exports] && exports && !exports.nodeType && exports, V = G[typeof module] && module && !module.nodeType && module, K = G[typeof self] && self && self.Object && self, X = G[typeof window] && window && window.Object && window, G = V && V.exports === $ && $, Q = (K = $ && V && "object" == typeof global && global && global.Object && global || X !== (this && this.window) && X || K || this,
    function() {
        try {
            Object({
                toString: 0
            } + "")
        } catch (e) {
            return function() {
                return !1
            }
        }
        return function(e) {
            return "function" != typeof e.toString && "string" == typeof (e + "")
        }
    }()), J = (X = Array.prototype,
    Error.prototype), Y = Object.prototype, Z = String.prototype, ee = Function.prototype.toString, te = Y.hasOwnProperty, ne = Y.toString, re = RegExp("^" + c(ne).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), ie = a(ie = Object.getOwnPropertySymbols) && ie, oe = X.push, se = a(se = Object.preventExtensions) && se, ae = Y.propertyIsEnumerable, ue = X.splice, ce = a(ce = K.Uint8Array) && ce, le = (X = function() {
        var t = se && a(t = Object.assign) && t;
        try {
            if (t) {
                var n = se({
                    1: 0
                });
                n[0] = 1
            }
        } catch (e) {
            try {
                t(n, "xo")
            } catch (e) {}
            return !n[1] && t
        }
        return !1
    }(),
    a(le = Array.isArray) && le), fe = a(fe = Object.keys) && fe, pe = Math.max, de = Math.pow(2, 53) - 1, he = {};
    he["[object Array]"] = he["[object Date]"] = he["[object Number]"] = {
        constructor: !0,
        toLocaleString: !0,
        toString: !0,
        valueOf: !0
    },
    he["[object Boolean]"] = he[N] = {
        constructor: !0,
        toString: !0,
        valueOf: !0
    },
    he[C] = he[P] = he["[object RegExp]"] = {
        constructor: !0,
        toString: !0
    },
    he[k] = {
        constructor: !0
    },
    function(e, t) {
        for (var n = -1, r = e.length; ++n < r && !1 !== t(e[n]); )
            ;
    }(B, function(e) {
        for (var t in he)
            if (te.call(he, t)) {
                var n = he[t];
                n[e] = te.call(n, e)
            }
    });
    var ve = d.support = {};
    !function(e) {
        function t() {
            this.x = e
        }
        var n = arguments
          , r = {
            0: e,
            length: e
        }
          , i = [];
        for (var o in t.prototype = {
            valueOf: e,
            y: e
        },
        new t)
            i.push(o);
        ve.argsTag = ne.call(n) == E,
        ve.enumErrorProps = ae.call(J, "message") || ae.call(J, "name"),
        ve.enumPrototypes = ae.call(t, "prototype"),
        ve.funcDecomp = /\bthis\b/.test(function() {
            return this
        }),
        ve.funcNames = "string" == typeof Function.name,
        ve.nonEnumStrings = !ae.call("x", 0),
        ve.nonEnumShadows = !/valueOf/.test(i),
        ve.spliceObjects = (ue.call(r, 0, 1),
        !r[0]),
        ve.unindexedChars = "xx" != "x"[0] + Object("x")[0];
        try {
            ve.nonEnumArgs = !ae.call(n, 1)
        } catch (e) {
            ve.nonEnumArgs = !0
        }
    }(1, 0),
    d.templateSettings = {
        escape: /<%-([\s\S]+?)%>/g,
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: W,
        variable: "",
        imports: {
            _: d
        }
    };
    var ye = X || function(e, t) {
        return null == t ? e : r(t, me(t), r(t, xe(t), e))
    }
      , ge = function(e) {
        return null == e ? A : o(e).length
    }
      , me = ie ? function(e) {
        return ie(o(e))
    }
    : l([]);
    ve.argsTag || (T = function(e) {
        return n(e) && y(e) && te.call(e, "callee") && !ae.call(e, "callee")
    }
    );
    var Te = le || function(e) {
        return n(e) && m(e.length) && "[object Array]" == ne.call(e)
    }
      , be = e(/x/) || ce && !e(ce) ? function(e) {
        return ne.call(e) == P
    }
    : e
      , xe = fe ? function(e) {
        var t = null != e && e.constructor;
        return "function" == typeof t && t.prototype === e || ("function" == typeof e ? d.support.enumPrototypes : y(e)) ? i(e) : x(e) ? fe(e) : []
    }
    : i
      , we = s(function(e, t) {
        try {
            return e.apply(A, t)
        } catch (e) {
            return b(e) ? e : Error(e)
        }
    });
    d.constant = l,
    d.keys = xe,
    d.keysIn = u,
    d.restParam = s,
    d.attempt = we,
    d.escape = function(e) {
        return (e = f(e)) && j.test(e) ? e.replace(R, t) : e
    }
    ,
    d.escapeRegExp = c,
    d.isArguments = T,
    d.isArray = Te,
    d.isError = b,
    d.isFunction = be,
    d.isNative = a,
    d.isObject = x,
    d.isString = w,
    d.template = function(s, e, t) {
        var n = d.templateSettings;
        t && function(e, t, n) {
            if (x(n)) {
                var r = typeof t;
                return ("number" == r ? y(n) && g(t, n.length) : "string" == r && t in n) && (t = n[t],
                e == e ? e === t : t != t)
            }
        }(s, e, t) && (e = t = null),
        s = f(s),
        e = v(ye({}, t || e), n, h),
        t = v(ye({}, e.imports), n.imports, h);
        var a, u, r = xe(t), i = function(e, t) {
            for (var n = -1, r = t.length, i = Array(r); ++n < r; )
                i[n] = e[t[n]];
            return i
        }(t, r), c = 0;
        t = e.interpolate || q;
        var l = "__p+='"
          , o = "sourceURL"in e ? "//# sourceURL=" + e.sourceURL + "\n" : "";
        if (s.replace(RegExp((e.escape || q).source + "|" + t.source + "|" + (t === W ? M : q).source + "|" + (e.evaluate || q).source + "|$", "g"), function(e, t, n, r, i, o) {
            return n = n || r,
            l += s.slice(c, o).replace(H, p),
            t && (a = !0,
            l += "'+__e(" + t + ")+'"),
            i && (u = !0,
            l += "';" + i + ";\n__p+='"),
            n && (l += "'+((__t=(" + n + "))==null?'':__t)+'"),
            c = o + e.length,
            e
        }),
        l += "';",
        (e = e.variable) || (l = "with(obj){" + l + "}"),
        l = (u ? l.replace(D, "") : l).replace(_, "$1").replace(O, "$1;"),
        l = "function(" + (e || "obj") + "){" + (e ? "" : "obj||(obj={});") + "var __t,__p=''" + (a ? ",__e=_.escape" : "") + (u ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + l + "return __p}",
        (e = we(function() {
            return Function(r, o + "return " + l).apply(A, i)
        })).source = l,
        b(e))
            throw e;
        return e
    }
    ,
    d.VERSION = "3.8.0",
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (K._ = d,
    define(function() {
        return d
    })) : $ && V ? G ? (V.exports = d)._ = d : $._ = d : K._ = d
}
.call(this),
function(e) {
    var t;
    if ("function" == typeof define && define.amd && (define(e),
    t = !0),
    "object" == typeof exports && (module.exports = e(),
    t = !0),
    !t) {
        var n = window.Cookies
          , r = window.Cookies = e();
        r.noConflict = function() {
            return window.Cookies = n,
            r
        }
    }
}(function() {
    function a() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n)
                t[r] = n[r]
        }
        return t
    }
    function c(e) {
        return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
    }
    return function e(u) {
        function s() {}
        function n(e, t, n) {
            if ("undefined" != typeof document) {
                "number" == typeof (n = a({
                    path: "/"
                }, s.defaults, n)).expires && (n.expires = new Date(+new Date + 864e5 * n.expires)),
                n.expires = n.expires ? n.expires.toUTCString() : "";
                try {
                    var r = JSON.stringify(t);
                    /^[\{\[]/.test(r) && (t = r)
                } catch (e) {}
                t = u.write ? u.write(t, e) : encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                e = encodeURIComponent(String(e)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                var i = "";
                for (var o in n)
                    n[o] && (i += "; " + o,
                    !0 !== n[o] && (i += "=" + n[o].split(";")[0]));
                return document.cookie = e + "=" + t + i
            }
        }
        function t(e, t) {
            if ("undefined" != typeof document) {
                for (var n = {}, r = document.cookie ? document.cookie.split("; ") : [], i = 0; i < r.length; i++) {
                    var o = r[i].split("=")
                      , s = o.slice(1).join("=");
                    t || '"' !== s.charAt(0) || (s = s.slice(1, -1));
                    try {
                        var a = c(o[0]);
                        if (s = (u.read || u)(s, a) || c(s),
                        t)
                            try {
                                s = JSON.parse(s)
                            } catch (e) {}
                        if (n[a] = s,
                        e === a)
                            break
                    } catch (e) {}
                }
                return e ? n[e] : n
            }
        }
        return s.set = n,
        s.get = function(e) {
            return t(e, !1)
        }
        ,
        s.getJSON = function(e) {
            return t(e, !0)
        }
        ,
        s.remove = function(e, t) {
            n(e, "", a(t, {
                expires: -1
            }))
        }
        ,
        s.defaults = {},
        s.withConverter = e,
        s
    }(function() {})
});
