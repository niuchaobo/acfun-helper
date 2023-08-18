/**
 * 控制台消息代理
 */
export function devConsole(department: string, module: any, funcName: Function, message: string, logLevel: number, timeSw: boolean) {
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
 * @example fgConsole(this,this.loadOption,"loaded Configuration.",1,false)
 */
export function fgConsole(cls: any, clsFunc: Function, msg: string, logLevel: number = 0, timesw: boolean) {
    if (typeof (cls) != 'string') {
        cls = getEsClassName(cls);
    }
    if (typeof (clsFunc) != 'string') {
        clsFunc = getEsFuncName(clsFunc);
    }
    devConsole("fg", cls, clsFunc, msg, logLevel, timesw)
}

function getEsClassName(esClass: any) {
    return esClass.constructor.toString().match(/class\s+([^ \(]+)\s*\{/i)[1]
}

function getEsFuncName(esFunc: any) {
    let result;
    try {
        result = arguments[0].name;
    } catch (error) {
        result = esFunc.toString().toString().match(/\s+([^ \(]+)\s*\(/i)[1]
    }
    return result
}
