/**
 * 队列
 * @todo 之前想到了一个绝好的解决标签页面在后台执行失效的问题写下了这个队列的实现，但是过了几天就忘了，我现在先放在这儿，有好点子再来写完吧。
 */
class Queue {
    constructor() {
        this.dataField = [];
        this.enter = this.enter;
        this.exit = this.exit;
        this.getFirst = this.getFirst;
        this.getTail = this.getTail;
        this.clearQueue = this.clear;
        this.isEmpty = this.isEmpty;
    }

    /**
     * 入队，并返回状态和其值
     * @param {*} 入队对象
     * @returns bool 成功与否
     */
    enter(obj) {
        let x = this.dataField.length;
        this.dataField.push(obj);
        if (x != this.dataField.length) {
            return true
        } else {
            return false
        }
    }
    /**
     * 出队，并返回状态和其值
     * @returns {stat:bool,data}
     */
    exit() {
        if (this.isEmpty()) {
            return { stat: false, data: '' };
        } else {
            return { stat: true, data: this.dataField.shift() };
        }
    }
    /**
     * 获取对首元素
     * @returns stat->是否存在:bool,data
     */
    getHead() {
        if (this.dataField.length != 0) {
            return { stat: true, data: this.dataField[0] };
        }
        return { stat: false, data: '' };
    }
    /**
     * 获取队尾元素
     * @returns stat->是否存在:bool,data
     */
    getTail() {
        if (this.dataField.length != 0) {
            return { stat: true, data: this.dataField[length - 1] };
        }
        return { stat: false, data: '' };
    }
    /**
     * 队列是否为空
     * @returns bool
     */
    isEmpty() {
        if (this.dataField.length == 0) {
            return true
        }
        return false
    }
    /**
     * 清除队列
     */
    clear() {
        delete this.dataField
    }
}


/**
 * 排序一个数组
 * @param {Int16Array} x 需要排序的数组
 */
function bubbleSort(x) {
    // let x = [1, 4, 2, 7, 88, 54, 65]
    let temp
    for (let i = x.length; i > 1; --i) {
        for (let j = 1; j < i; ++j) {
            if (x[j] > x[j + 1]) {
                temp = x[j]
                x[j] = x[j + 1]
                x[j + 1] = temp
            }
        }
    }
    return x
}

/**
 * 将常见的数据类型转化为字符串
 * @param {*} e 
 */
function convertEverthingToStr(e) {
    var t;
    switch (typeof (t = e)) {
        case "string":
            return t;
        case "number":
            return t.toString();
        case "array":
            return JSON.stringify({
                _obj: t
            }).replace(/{(.*)}/, "$1").replace(/"_obj":/, "");
        case "object":
            return JSON.stringify(t);
        case "boolean":
            return t.toString();
        case "undefined":
            return "undefined";
        case "null":
            return "null";
        default:
            try {
                return t.toString()
            } catch (e) {
                return e,
                    ""
            }
    }
}
