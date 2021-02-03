(function ($) {
    if (window.loading) {
        return;
    }
    /**
     * 正在提交效果
     * 调用方法
     * var load=new loading($('#save'));  //正在提交
     * load.clear();                      //提交完成停止
     * @param {type} $obj  绑定操作的jquery对象,例子:$('#save')
     * @param {type} text  显示文件,默认'提交中'
     * @param {type} num   点的个数,默认3个
     * @param {type} rate  频率,默认1000ms
     * @returns {undefined}
     */
    function loading($obj, text, num, rate, style) {
        if (!($obj instanceof $) || $obj.length == 0) {
            this.$obj = $('');
            return this;
        } else if ($obj.length > 1) {
            $obj = $($obj[0]);
        }
        var exists = $obj.data('loading');
        if (exists && exists instanceof loading) {
            //如果存在则清除之前的操作
            exists.clear();
        }
        this.$obj = $obj;
        this.oldvalue = $obj.val();
        this.num = $.isNumeric(parseInt(num)) ? parseInt(num) : 3;
        this.rate = $.isNumeric(parseInt(rate)) ? parseInt(rate) : 1000;
        this.text = typeof (text) === 'undefined' || text === null ? '提交中' : text;
        this.style = typeof (style) === 'undefined' || style === null ? '.' : style;
        this.init();

    }

    loading.prototype = {
        init: function () {
            var self = this;
            var i = 1;
            function fn() {
                i++;
                self.$obj.val(loading.msg(self.text, i, self.style));
                if (i == self.num) {
                    i = 0;
                }
            }
            self.$obj.val(loading.msg(self.text, 1, self.style));
            this.handle = setInterval(fn, this.rate);
            self.$obj.attr('disabled', true);
            self.$obj.data('loading', this);
        },
        /**
         * 清除循环任务
         * @returns {undefined}
         */
        clear: function () {
            clearInterval(this.handle);
            this.$obj.val(this.oldvalue);
            this.$obj.removeAttr('disabled');
        }
    };
    loading.msg = function (text, time, style) {
        for (var i = 0; i < time; i++) {
            text += style.toString();
        }
        return text;
    };
    loading.isObject = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    loading.isString = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    var defaultConfig = {
        text: null,
        num: null,
        rate: null,
        style: null
    }
    /**
     * loading方法的jquery扩展
     * 调用方法
     * $('.bgc-green').loading();        //正在提交
     * $('.bgc-green').loading('stop');  //停止
     * $('.bgc-green').loading({text:'请稍候',num:5,rate: 2000,style:'=='});  //可配置的
     * @param {type} options
     * @returns {container_L52.$.fn}
     */
    $.fn.loading = $.fn.loading || function (options) {
        if (loading.isObject(options)) {
            options = $.extend({}, defaultConfig, options);
        } else if (options === 'stop') {
            //停止
            this.each(function (k, v) {
                var exists = $(this).data('loading');
                if (exists && exists instanceof loading) {
                    //如果存在则清除之前的操作
                    exists.clear();
                }
            });
            return this;
        } else {
            options = $.extend({}, defaultConfig);
        }
        this.each(function (k, v) {
            new loading($(this), options.text, options.num, options.rate, options.style);
        });
        return this;
    }
    window.loading = loading;
})(jQuery)