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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const utils_1 = require("./utils");
const path_1 = __importDefault(require("path"));
const activate = function (context) {
    const hoverHander = vscode.languages.registerDefinitionProvider([
        { scheme: "file", language: "vue" },
        { scheme: "file", language: "scss" },
        { scheme: "file", language: "css" },
        { scheme: "file", language: "less" },
        { scheme: "file", language: "javascript" },
        { scheme: "file", language: "typescript" },
        { scheme: "file", language: "javascriptreact" },
    ], {
        provideDefinition(document, position, token) {
            const fileName = document.fileName; // 当前文件的绝对路径加文件名
            const workDir = path_1.default.dirname(fileName); // 当前文件的绝对路径
            const linetext = document.lineAt(position).text; // 当前行字符串
            const q = (0, utils_1.screeningPath)(linetext, position); // 路由别名目标路径
            const z = (0, utils_1.rootPath)(workDir, context); // 项目根目录
            const u = (0, utils_1.screeningRelativePath)(linetext, position); // 相对路径的目标路径
            let targetPath = ""; // 要跳转的目标路径
            let isPathInterior = false;
            let target = q;
            if (q && z) {
                targetPath = path_1.default.resolve(z, q.path);
                isPathInterior = position.character >= q.columns[0] && position.character <= q.columns[1];
            }
            else if (u) {
                targetPath = path_1.default.resolve(workDir, u.text);
                isPathInterior = position.character >= u.columns[0] && position.character <= u.columns[1];
                target = u;
            }
            const k = (0, utils_1.joiningSuffix)(targetPath); // 文件存在就返回目标文件，不存在就返回空字符串
            if (!k || !isPathInterior)
                return;
            return [
                {
                    originSelectionRange: target.rang,
                    targetRange: new vscode.Range(0, 0, 0, 0),
                    // targetSelectionRange: new vscode.Range(0,0,0,10),
                    targetUri: vscode.Uri.file(k),
                },
            ];
        },
    });
    context.subscriptions.push(hoverHander);
};
exports.activate = activate;
const deactivate = function () { };
exports.deactivate = deactivate;
