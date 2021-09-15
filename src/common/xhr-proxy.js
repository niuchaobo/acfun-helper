/*
 * https://github.com/wendux/Ajax-hook
 */
let XHRProxy = (function () {
    // Save original XMLHttpRequest as _rxhr
    var realXhr = "_rxhr"

    function configEvent(event, xhrProxy) {
        var e = {};
        for (var attr in event) e[attr] = event[attr];
        // xhrProxy instead
        e.target = e.currentTarget = xhrProxy
        return e;
    }

    /**
     * XHR Hook
     * @description hook()的拦截粒度细，可以具体到XMLHttpRequest对象的某一方法、属性、回调。
     * @param {import("../../declares/XHRProxy").XHRHooks} proxy 
     * @returns {XMLHttpRequest}
     */
    function hook(proxy) {
        // Avoid double hookAjax
        window[realXhr] = window[realXhr] || XMLHttpRequest

        XMLHttpRequest = function () {
            var xhr = new window[realXhr];
            // We shouldn't hookAjax XMLHttpRequest.prototype because we can't
            // guarantee that all attributes are on the prototype。
            // Instead, hooking XMLHttpRequest instance can avoid this problem.
            for (var attr in xhr) {
                var type = "";
                try {
                    type = typeof xhr[attr] // May cause exception on some browser
                } catch (e) {
                }
                if (type === "function") {
                    // hookAjax methods of xhr, such as `open`、`send` ...
                    this[attr] = hookFunction(attr);
                } else {
                    Object.defineProperty(this, attr, {
                        get: getterFactory(attr),
                        set: setterFactory(attr),
                        enumerable: true
                    })
                }
            }
            var that = this;
            xhr.getProxy = function () {
                return that
            }
            this.xhr = xhr;
        }

        // Generate getter for attributes of xhr
        function getterFactory(attr) {
            return function () {
                var v = this.hasOwnProperty(attr + "_") ? this[attr + "_"] : this.xhr[attr];
                var attrGetterHook = (proxy[attr] || {})["getter"]
                return attrGetterHook && attrGetterHook(v, this) || v
            }
        }

        // Generate setter for attributes of xhr; by this we have an opportunity
        // to hookAjax event callbacks （eg: `onload`） of xhr;
        function setterFactory(attr) {
            return function (v) {
                var xhr = this.xhr;
                var that = this;
                var hook = proxy[attr];
                // hookAjax  event callbacks such as `onload`、`onreadystatechange`...
                if (attr.substring(0, 2) === 'on') {
                    that[attr + "_"] = v;
                    xhr[attr] = function (e) {
                        e = configEvent(e, that)
                        var ret = proxy[attr] && proxy[attr].call(that, xhr, e)
                        ret || v.call(that, e);
                    }
                } else {
                    //If the attribute isn't writable, generate proxy attribute
                    var attrSetterHook = (hook || {})["setter"];
                    v = attrSetterHook && attrSetterHook(v, that) || v
                    this[attr + "_"] = v;
                    try {
                        // Not all attributes of xhr are writable(setter may undefined).
                        xhr[attr] = v;
                    } catch (e) {
                    }
                }
            }
        }

        // Hook methods of xhr.
        function hookFunction(fun) {
            return function () {
                var args = [].slice.call(arguments)
                if (proxy[fun]) {
                    var ret = proxy[fun].call(this, args, this.xhr)
                    // If the proxy return value exists, return it directly,
                    // otherwise call the function of xhr.
                    if (ret) return ret;
                }
                return this.xhr[fun].apply(this.xhr, args);
            }
        }

        // Return the real XMLHttpRequest
        return window[realXhr];
    }

    /**
     * 取消hook-Hook
     */
     function unHook() {
        if (window[realXhr]) XMLHttpRequest = window[realXhr];
        window[realXhr] = undefined;
    }

    var events = ['load', 'loadend', 'timeout', 'error', 'readystatechange', 'abort'];
    var eventLoad = events[0],
        eventLoadEnd = events[1],
        eventTimeout = events[2],
        eventError = events[3],
        eventReadyStateChange = events[4],
        eventAbort = events[5];

    var singleton,prototype = 'prototype';
    
    /**
     * 使用Proxy方式抽象对XHR的Hook。
     * @description proxy()抽象度高，并且构建了请求上下文（请求信息config在各个回调中都可以直接获取），使用起来更简单、高效。
     * @param {import("../../declares/XHRProxy").XHRProxy} proxy 
     * @returns {XMLHttpRequest}
     */
    function proxy(proxy) {
        if (singleton) throw "Proxy already exists";
        return singleton = new Proxy(proxy);
    }

    /**
     * 取消hook-Proxy
     */
    function unProxy() {
        singleton = null
        unHook()
    }

    function trim(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }

    function getEventTarget(xhr) {
        return xhr.watcher || (xhr.watcher = document.createElement('a'));
    }

    function triggerListener(xhr, name) {
        var xhrProxy = xhr.getProxy();
        var callback = 'on' + name + '_';
        var event = configEvent({ type: name }, xhrProxy);
        xhrProxy[callback] && xhrProxy[callback](event);
        var evt;
        if (typeof (Event) === 'function') {
            evt = new Event(name, { bubbles: false });
        } else {
            // https://stackoverflow.com/questions/27176983/dispatchevent-not-working-in-ie11
            evt = document.createEvent('Event');
            evt.initEvent(name, false, true);
        }
        getEventTarget(xhr).dispatchEvent(evt);
    }

    /**
     * @description 钩子函数 方法：next(arg)：继续进入后续流程；如果不调用，则请求链便会暂停，这种机制可以支持在钩子中执行一些异步任务。该方法在onResponse钩子中等价于resolve，在onError钩子中等价于reject。 resolve(response)：调用后，请求后续流程会被阻断，直接返回响应数据，上层xhr.onreadystatechange或xhr.onload会被调用。reject(err)：调用后，请求后续流程会被阻断，直接返回错误，上层的xhr.onerror、xhr.ontimeout、xhr.onabort之一会被调用，具体调用哪个取决于err.type的值，比如我们设置err.type为"timeout"，则xhr.ontimeout会被调用。
     * @param {*} xhr 
     */
    function Handler(xhr) {
        this.xhr = xhr;
        this.xhrProxy = xhr.getProxy();
    }

    Handler[prototype] = Object.create({
        resolve: function resolve(response) {
            var xhrProxy = this.xhrProxy;
            var xhr = this.xhr;
            xhrProxy.readyState = 4;
            xhr.resHeader = response.headers;
            xhrProxy.response = xhrProxy.responseText = response.response;
            xhrProxy.statusText = response.statusText;
            xhrProxy.status = response.status;
            triggerListener(xhr, eventReadyStateChange);
            triggerListener(xhr, eventLoad);
            triggerListener(xhr, eventLoadEnd);
        },
        reject: function reject(error) {
            this.xhrProxy.status = 0;
            triggerListener(this.xhr, error.type);
            triggerListener(this.xhr, eventLoadEnd);
        }
    });

    function makeHandler(next) {
        function sub(xhr) {
            Handler.call(this, xhr);
        }

        sub[prototype] = Object.create(Handler[prototype]);
        sub[prototype].next = next;
        return sub;
    }

    var RequestHandler = makeHandler(function (rq) {
        var xhr = this.xhr;
        rq = rq || xhr.config;
        xhr.withCredentials = rq.withCredentials;
        xhr.open(rq.method, rq.url, rq.async !== false, rq.user, rq.password);
        for (var key in rq.headers) {
            xhr.setRequestHeader(key, rq.headers[key]);
        }
        xhr.send(rq.body);
    });

    var ResponseHandler = makeHandler(function (response) {
        this.resolve(response);
    });

    var ErrorHandler = makeHandler(function (error) {
        this.reject(error);
    });

    /**
     * XHRProxy - Proxy 方式
     * @returns {import("../../declares/XHRProxy").XHRHooks}
     */
    function Proxy(proxy) {
        var onRequest = proxy.onRequest,
            onResponse = proxy.onResponse,
            onError = proxy.onError;

        function handleResponse(xhr, xhrProxy) {
            var handler = new ResponseHandler(xhr);
            if (!onResponse) return handler.resolve();
            var ret = {
                response: xhrProxy.response,
                status: xhrProxy.status,
                statusText: xhrProxy.statusText,
                config: xhr.config,
                headers: xhr.resHeader || xhr.getAllResponseHeaders().split('\r\n').reduce(function (ob, str) {
                    if (str === "") return ob;
                    var m = str.split(":");
                    ob[m.shift()] = trim(m.join(':'));
                    return ob;
                }, {})
            };
            onResponse(ret, handler);
        }

        function onerror(xhr, xhrProxy, e) {
            var handler = new ErrorHandler(xhr);
            var error = { config: xhr.config, error: e };
            if (onError) {
                onError(error, handler);
            } else {
                handler.next(error);
            }
        }

        function preventXhrProxyCallback() {
            return true;
        }

        function errorCallback(xhr, e) {
            onerror(xhr, this, e);
            return true;
        }

        function stateChangeCallback(xhr, xhrProxy) {
            if (xhr.readyState === 4 && xhr.status !== 0) {
                handleResponse(xhr, xhrProxy);
            } else if (xhr.readyState !== 4) {
                triggerListener(xhr, eventReadyStateChange);
            }
            return true;
        }

        return hook({
            onload: preventXhrProxyCallback,
            onloadend: preventXhrProxyCallback,
            onerror: errorCallback,
            ontimeout: errorCallback,
            onabort: errorCallback,
            onreadystatechange: function (xhr) {
                return stateChangeCallback(xhr, this);
            },
            open: function open(args, xhr) {
                var _this = this;
                var config = xhr.config = { headers: {} };
                config.method = args[0];
                config.url = args[1];
                config.async = args[2];
                config.user = args[3];
                config.password = args[4];
                config.xhr = xhr;
                var evName = 'on' + eventReadyStateChange;
                if (!xhr[evName]) {
                    xhr[evName] = function () {
                        return stateChangeCallback(xhr, _this);
                    };
                }

                var defaultErrorHandler = function defaultErrorHandler(e) {
                    onerror(xhr, _this, configEvent(e, _this));
                };
                [eventError, eventTimeout, eventAbort].forEach(function (e) {
                    var event = 'on' + e;
                    if (!xhr[event]) xhr[event] = defaultErrorHandler;
                });

                // 如果有请求拦截器，则在调用onRequest后再打开链接。因为onRequest最佳调用时机是在send前，
                // 所以我们在send拦截函数中再手动调用open，因此返回true阻止xhr.open调用。
                //
                // 如果没有请求拦截器，则不用阻断xhr.open调用
                if (onRequest) return true;
            },
            send: function (args, xhr) {
                var config = xhr.config
                config.withCredentials = xhr.withCredentials
                config.body = args[0];
                if (onRequest) {
                    // In 'onRequest', we may call XHR's event handler, such as `xhr.onload`.
                    // However, XHR's event handler may not be set until xhr.send is called in
                    // the user's code, so we use `setTimeout` to avoid this situation
                    var req = function () {
                        onRequest(config, new RequestHandler(xhr));
                    }
                    config.async === false ? req() : setTimeout(req)
                    return true;
                }
            },
            setRequestHeader: function (args, xhr) {
                // Collect request headers
                xhr.config.headers[args[0].toLowerCase()] = args[1];
                return true;
            },
            addEventListener: function (args, xhr) {
                var _this = this;
                if (events.indexOf(args[0]) !== -1) {
                    var handler = args[1];
                    getEventTarget(xhr).addEventListener(args[0], function (e) {
                        var event = configEvent(e, _this);
                        event.type = args[0];
                        event.isTrusted = true;
                        handler.call(_this, event);
                    });
                    return true;
                }
            },
            getAllResponseHeaders: function (_, xhr) {
                var headers = xhr.resHeader
                if (headers) {
                    var header = "";
                    for (var key in headers) {
                        header += key + ': ' + headers[key] + '\r\n';
                    }
                    return header;
                }
            },
            getResponseHeader: function (args, xhr) {
                var headers = xhr.resHeader
                if (headers) {
                    return headers[(args[0] || '').toLowerCase()];
                }
            }
        });
    }
    return { hook, unHook, proxy, unProxy }

})();
let {
    hook, unHook, proxy, unProxy
} = { ...XHRProxy }
