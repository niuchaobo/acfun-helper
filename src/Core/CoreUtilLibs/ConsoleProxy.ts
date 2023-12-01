export enum LogLevel {
    Debug = 0,
    Info,
    Warn,
    Error,
    Critical,
}


//https://github.com/alitajs/alita/tree/master/packages/chalk
const color: Record<string, string> = {
    black: '#000000',
    red: '#FF0000',
    green: '#008000',
    yellow: '#FFFF00',
    blue: '#0000FF',
    magenta: '#FF00FF',
    cyan: '#00FFFF',
    white: '#FFFFFF',
};
const colorHash: Record<string, string> = {
    log: 'black',
    wait: 'cyan',
    error: 'red',
    warn: 'yellow',
    ready: 'green',
    info: 'blue',
    event: 'magenta',
};
const chalk: Record<string, (...str: any) => void> = {};
const _console: any = console;
const add = (...arr: any) => {
    let fi = [
        []
    ];
    for (let key = 0; key < arr.length; key++) {
        const [first, ...other] = arr[key];
        fi[0] += first;
        fi = fi.concat(other);
    }
    return fi;
};
const createlog = (util: any) => (...args: any) => {
    const fun = _console[util] ? _console[util] : _console.log;
    fun.apply(void 0, args);
};
const colorUtils: Record<string, (...parm: any) => any> = {
    bold: (str: any) => {
        if (typeof str === 'string' || typeof str === 'number') {
            return `${str};font-weight: bold;`;
        }
        for (let key = 1; key < str.length; key++) {
            str[key] += `;font-weight: bold;`;
        }
        return str;
    }
};
const createChalk = (name: any) => (...str: any) => {
    if (typeof str[0] === 'object') {
        createlog(name)(...add(colorUtils.bold(colorUtils[colorHash[name]](`[${firstToUpperCase(name)}] `)), ...str));
        return;
    }
    let strArr = str;
    if (typeof str === 'string' || typeof str === 'number') {
        strArr = colorUtils[colorHash[name]](str);
    }
    createlog(name)(...add(colorUtils.bold(colorUtils[colorHash[name]](`[${firstToUpperCase(name)}] `)), strArr));
};

Object.keys(colorHash).forEach(key => {
    chalk[key] = createChalk(key);
});
const firstToUpperCase = (str: string) => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
Object.keys(color).forEach(key => {
    colorUtils[key] = (str) => {
        if (typeof str === 'string' || typeof str === 'number') {
            return [`%c${str}`, `color:${color[key]}`];
        }
        for (let i = 1; i < str.length; i++) {
            str[i] += `;color:${color[key]}`;
        }
        return str;
    };
    colorUtils[`bg${firstToUpperCase(key)}`] = (str) => {
        if (typeof str === 'string' || typeof str === 'number') {
            return [`%c${str}`, `padding: 2px 4px; border-radius: 3px; color: ${key === 'white' ? '#000' : '#fff'}; font-weight: bold; background:${color[key]};`];
        }
        for (let i = 1; i < str.length; i++) {
            str[i] += `;padding: 2px 4px; border-radius: 3px; font-weight: bold; background:${color[key]};`;
        }
        return str;
    };
});

const log = (title: string, msg: string) => {
    createlog('log')(
        `%c ${title} %c ${msg} `,
        `padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #F6465D; font-weight: bold;`,
        'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;',
    );
}
const warn = (title: string, msg: string) => {
    createlog('log')(
        `%c ${title} %c ${msg} `,
        `padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #F6465D; font-weight: bold;`,
        'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #cc00ff; font-weight: bold;',
    );
}
const error = (title: string, msg: string) => {
    createlog('log')(
        `%c ${title} %c ${msg} `,
        `padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #F6465D; font-weight: bold;`,
        'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #ff0000; font-weight: bold;',
    );
}

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
                _department = "AcFunHelperFg"
                break;
            case "bg":
                _department = "AcFunHelperBg"
                break;
            default:
                break;
        }
        if (timeSw) {
            var date = new Date();
            var logTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        } else {
            var logTime = "";
        }
        switch (logLevel) {
            case 0:
                _logLevel = "[DEBUG]"
                log(`${_department}`, `${logTime} ${module} ${funcName} ${message}`)
                break;
            case 1:
                _logLevel = "[INFO]"
                log(`${_department}`, `${logTime} ${module} ${funcName} ${message}`)
                break;
            case 2:
                _logLevel = "[WARN]"
                warn(`${_department}`, `${logTime} ${module} ${funcName} ${message}`)
                break;
            case 3:
                _logLevel = "[ERROR]"
                error(`${_department}`, `${logTime} ${module} ${funcName} ${message}`)
                break;
            case 4:
                _logLevel = "[CRITICAL]"
                error(`${_department}`, `${logTime} ${module} ${funcName} ${message}`)
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
export function fgDebugLog(cls: any, clsFunc: any, msg: string, logLevel: number = LogLevel.Debug, timesw: boolean = true) {
    if (typeof (cls) != 'string') {
        cls = getEsClassName(cls);
    }
    if (typeof (clsFunc) != 'string') {
        clsFunc = getEsFuncName(clsFunc);
    }
    devConsole("fg", cls, clsFunc, msg, logLevel, timesw);
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
