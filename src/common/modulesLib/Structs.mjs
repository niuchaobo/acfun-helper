/**
 * 队列
 */
export class Queue {
    constructor() {
        this.dataField = [];
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
    get head() {
        return !this.isEmpty() ? this.dataField[0] : null;
    }
    /**
     * 获取队尾元素
     * @returns stat->是否存在:bool,data
     */
    getTail() {
        if (this.dataField.length != 0) {
            return { stat: true, data: this.dataField[this.dataField.length - 1] };
        }
        return { stat: false, data: '' };
    }
    get tail() {
        return !this.isEmpty() ? this.dataField[this.dataField.length - 1] : null;
    }
    /**
     * 队列是否为空
     * @returns bool
     */
    isEmpty() {
        return !!this.dataField ? !!this.dataField.length : false;
    }
    get status() {
        return this.isEmpty() ? "empty" : "not empty";
    }
    /**
     * 清除队列
     */
    clear() {
        delete this.dataField;
    }
}

export class Stack {
    constructor() {
        this.dataField = [];
    }

    push(e) {
        return !!e ? this.dataField.push(e) : false;
    }

    pop() {
        return this.isEmpty() ? false : this.dataField.pop();
    }

    get peak() {
        return this.isEmpty() ? false : this.dataField[this.dataField.length - 1];
    }

    get top() {
        return this.isEmpty() ? false : this.dataField.length;
    }

    isEmpty() {
        return !!!this.dataField;
    }

    clear() {
        return delete this.dataField;
    }
}