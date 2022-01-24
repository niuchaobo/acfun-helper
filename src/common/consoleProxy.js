/**
 * 控制台消息代理
 * @param {string} department "fg" "bg"
 * @param {*} module 模块名
 * @param {Function} funcName 函数名
 * @param {string} message 消息
 * @param {number} logLevel 日志级别 0-info 1-log 2-warnning 3-error 4-critical
 * @param {Boolean} timeSw 时间标签开关
 */
function devConsole(department, module, funcName, message, logLevel, timeSw) {
    chrome.storage.local.get(['logSetting'], (logSetting) => {
        if (logSetting.consoleOutput == false) {
            return
        }
        let _department, _logLevel
        //日志级别过滤
        if (logLevel > logSetting.logLevel) {
            return
        }
        switch (department) {
            case "fg":
                _department = "AcFunHelperFrontend"
                break;
            case "bg":
                _department = "AcFunHelperBackend"
                break;
            default:
                break;
        }
        //级别标签
        if (timeSw) {
            var date = new Date();
            var logTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        } else {
            var logTime = "";
        }
        switch (logLevel) {
            case 0:
                _logLevel = "[INFO]"
                console.info(`${logTime} ${_logLevel}${_department}-${module} > ${funcName}:${message}`)
                break;
            case 1:
                _logLevel = "[LOG]"
                console.log(`${logTime} ${_logLevel}${_department}-${module} > ${funcName}:${message}`)
                break;
            case 2:
                _logLevel = "[WARN]"
                console.warn(`${logTime} ${_logLevel}${_department}-${module} > ${funcName}:${message}`)
                break;
            case 3:
                _logLevel = "[ERROR]"
                console.error(`${logTime} ${_logLevel}${_department}-${module} > ${funcName}:${message}`)
                break;
            case 4:
                _logLevel = "[CRITICAL]"
                console.error(`${logTime} ${_logLevel}${_department}-${module} > ${funcName}:${message}`)
                break;
            default:
                break;
        }
    })

}

/**
 * 控制台代理前台封装
 * @param {*} cls 
 * @param {Function} clsFunc 
 * @param {string} msg 
 * @param {number} logLevel 
 * @param {boolean} timesw 
 * @example fgConsole(this,this.loadOption,"loaded Configuration.",1,false)
 */
function fgConsole(cls, clsFunc, msg, logLevel = 0, timesw) {
    if (typeof (cls) != 'string') {
        cls = getEsClassName(cls);
    }
    if (typeof (clsFunc) != 'string') {
        clsFunc = getEsFuncName(clsFunc);
    }
    devConsole("fg", cls, clsFunc, msg, logLevel, timesw)
}