"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.screeningRelativePath = exports.joiningSuffix = exports.rootPath = exports.screeningPath = void 0;
const vscode = __importStar(require("vscode"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const { mappings, rootpath: rootfile, allowedsuffix, } = vscode.workspace.getConfiguration().get("sparrow.alias-skip");
/**
 * 从文本中过滤出路径
 * @param {string} linetext 包含路径的字符串
 * @returns 目标路径
 */
const screeningPath = function (linetext, position) {
    let c = /('.+')|(".+")/;
    let arr = linetext.match(c);
    if (arr) {
        let text = arr[0].substring(1, arr[0].length - 1);
        const i = linetext.indexOf(text);
        const columns = [i, i + text.length];
        let [key, ...m] = text.split("/");
        if (mappings.hasOwnProperty(key)) {
            let e = mappings[key];
            if (e[0] === "/") {
                e = e.substring(1);
            }
            return {
                path: path_1.default.join(e, ...m),
                rang: new vscode.Range(position.line, columns[0], position.line, columns[1]),
                columns,
            };
        }
    }
    return "";
};
exports.screeningPath = screeningPath;
/**
 * 通过当前文件的绝对路径和配置的根文件解析出根目录，并储存已获取的项目根目录
 * @param {*} presentPath 当前文件路径
 * @param {*} context 当前上下文对象
 * @returns 输出根目录
 */
const rootPath = function (presentPath, context) {
    const memento = context.workspaceState;
    let rootList = memento.get("rootList", []);
    for (const item of rootList) {
        if (presentPath.indexOf(item) === 0) {
            return item;
        }
    }
    let arr = presentPath.split(path_1.default.sep);
    let len = arr.length;
    let base = "";
    for (let index = 0; index < len; index++) {
        let z = fs_1.default.existsSync(path_1.default.join(...arr, rootfile));
        if (z) {
            base = path_1.default.join(...arr);
            memento.update("rootList", [...rootList, base]);
            return base;
        }
        else {
            arr.pop();
        }
    }
    return base;
};
exports.rootPath = rootPath;
/**
 * 通过目标的路径拼接后缀并验证该文件存在
 * @param {*} targetPath 目标路径
 * @returns 拼接上后缀名并返回
 */
const joiningSuffix = function (targetPath) {
    const extname = path_1.default.extname(targetPath);
    if (!extname) {
        for (const item of allowedsuffix) {
            if (fs_1.default.existsSync(`${targetPath}.${item}`)) {
                return `${targetPath}.${item}`;
            }
        }
        targetPath = path_1.default.join(targetPath, "index");
        for (const item of allowedsuffix) {
            if (fs_1.default.existsSync(`${targetPath}.${item}`)) {
                return `${targetPath}.${item}`;
            }
        }
    }
    else if (fs_1.default.existsSync(targetPath)) {
        return targetPath;
    }
    else {
        return "";
    }
};
exports.joiningSuffix = joiningSuffix;
/**
 * 从文本中过滤出相对路径
 * @param {string} linetext 包含路径的字符串
 * @returns 目标路径的相对路径
 */
const screeningRelativePath = function (linetext, position) {
    let arr = linetext.match(/('.+')|(".+")/); // 正则匹配
    let text = "";
    if (arr) {
        text = arr[0].substring(1, arr[0].length - 1);
        const i = linetext.indexOf(text);
        const columns = [i, i + text.length];
        return {
            text,
            rang: new vscode.Range(position.line, columns[0], position.line, columns[1]),
            columns,
        };
    }
    return "";
};
exports.screeningRelativePath = screeningRelativePath;
