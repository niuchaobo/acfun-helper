const amId = /\/moment\/([0-9]+)/.exec(globalThis.location.href)[1];
globalThis.location.href = `https://www.acfun.cn/moment/am${amId}`;