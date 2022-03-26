const regex = /[0-9]+/gm;
let m;
let regGrp = [];

while ((m = regex.exec(globalThis.location.href)) !== null) {
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    m.forEach((match, groupIndex) => {
        regGrp.push(match);
    });
}

const acid = regGrp[1];
const ncid = regGrp[2];
globalThis.location.href = `https://www.acfun.cn/v/ac${acid}?from=video#ncid=${ncid}`;