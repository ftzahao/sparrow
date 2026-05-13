# AGENTS.md

麻雀（Sparrow）项目的精简指导文件，用于帮助 OpenCode 会话快速上手。

## 项目类型

VS Code 扩展，提供以下功能：

1. 微信小程序支持（WXML/WXSS/WXS）
2. 支付宝小程序支持（AXML/ACSS/SJS）
3. 小程序文件的编辑器默认配置和 Prettier 集成

## 构建和打包

```bash
bun run build
```

此命令执行 `vsce package`，在项目根目录生成 `.vsix` 文件。

## 项目结构

- `main.js` — 编译后的扩展入口（package.json `main` 字段引用）
- `package.json` — 扩展清单，包含所有功能配置
- `syntaxes/` — WXML/AXML/ACSS 的 TextMate 语法文件
- `snippets/` — 微信小程序代码片段

## 关键细节

### 语言映射

- `.wxml` → `wxml` 语言（微信模板）
- `.wxss` → `css`（微信样式）
- `.wxs` → `javascript`（微信脚本）
- `.axml` → `axml` 语言（支付宝模板）
- `.acss` → `css`（支付宝样式）
- `.sjs` → `javascript`（支付宝脚本）

### Prettier 集成 (package.json:48-58, 199-228)

扩展设置了 `prettier.documentSelectors` 以识别小程序文件。

**建议用户在项目中配置 `.prettierrc`：**

```json
{
  "overrides": [
    {
      "files": ["*.axml", "*.wxml"],
      "options": { "parser": "html" }
    },
    {
      "files": ["*.acss", "*.wxss"],
      "options": { "parser": "css" }
    },
    {
      "files": ["*.sjs", "*.wxs"],
      "options": { "trailingComma": "none" }
    }
  ]
}
```

没有此配置，Prettier 无法正确格式化小程序文件。

## 无测试和 CI

仓库中没有测试套件、linter 配置或 CI 工作流。仅支持手动测试。

## README 使用中文

所有面向用户的文档和配置描述均使用中文。更新 `README.md` 或 `package.json` 描述字符串时保持一致性。

## 无 lockfile

未提交 `package-lock.json`、`yarn.lock` 或 `bun.lockb`。构建脚本使用 `bun`，但 `package.json` 中无 npm 依赖（扩展零依赖）。
