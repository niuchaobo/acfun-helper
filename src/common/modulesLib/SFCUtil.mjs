/**@returns {string} */
export async function importFile(filepath) {
    if (!filepath) {
        throw TypeError("filepath param shouldn't be empty.");
    }
    try {
        return await fetchResult(filepath);
    } catch (error) {
        throw TypeError("file not exist,or filepath param is empty.");
    }
}

/**@returns {{filename:string,data:HTMLElement[]}} */
export async function importHTML(filename) {
    const raw = await importFile(filename);
    return {
        filename: filename,
        data: stringToDOM(raw)
    }
}

/**
 * 
 * @param {import("fs").PathLike} filepath 
 * @description 也就只方便了写HTML和css，但是js是没法导入的
 */
export async function importVue(filepath) {
    const raw = await importHTML(filepath);
    return await parseVueFile(raw.data);
}

/**@param {HTMLElement[]} raw */
export async function parseVueFile(raw) {
    const targetTags = ["STYLE", "SCRIPT", "TEMPLATE"];
    const data = {
        template: null,
        script: null,
        style: null,
        loadStyle: null,
        /**@deprecated "it violates the Content Security Policy" */
        importScript: null,
    }

    for (let i = 0; i < raw.length; i++) {
        const node = raw[i]
        if (targetTags.includes(node.nodeName)) {
            data[node.nodeName.toLowerCase()] = node.innerHTML.replace(/\n/g, "");
        }
    }

    data["loadStyle"] = function (name, target) {
        if (this.style) {
            createElementStyle(this.style, target ?? document.head, name != undefined ? "AcFunHelperSFCstyle_" + (name ?? this.name) : undefined)
            return true;
        }
        return false;
    }

    data["importScript"] = async function () {
        if (this.script) {
            const content = new Blob([this.script], { "type": "application/javascript" });
            const url = URL.createObjectURL(content);
            return await import(url);
        }
    }
    return data
}

