# 麻雀（Sparrow）

麻雀是一个面向 VS Code 的轻量扩展，聚焦两件事：

- 路径别名与相对路径跳转（按住组合键点击路径可跳转）
- 微信小程序 / 支付宝小程序的基础语法与片段支持

## 项目介绍

适合以下场景：

- 业务项目里大量使用 `@/`、`~/` 等别名，想要更顺畅地跳转到目标文件
- 在 VS Code 中进行小程序开发，希望补齐常用语法高亮、语言映射和 snippets

核心能力：

1. 别名路径跳转
2. 微信小程序基础支持
3. 支付宝小程序基础支持

## 功能清单

### 1. 别名路径跳转

- 在 JS / TS / Vue / CSS / SCSS / Less 等文件中识别路径
- 支持配置路径别名映射
- 支持相对路径跳转

使用方式：

- macOS：按住 Cmd 并单击路径
- Windows / Linux：按住 Ctrl 并单击路径

### 2. 微信小程序基础支持

- [x] wx-json（常见配置文件 JSON Schema 校验）
- [x] wx-snippets（JS / TS / JSON 片段）
- [x] wxml-basics（.wxml 基础语法支持）
- [x] wxs（.wxs 语言映射）
- [x] wxss（.wxss 语言映射）
- [ ] wxml-language-features

### 3. 支付宝小程序基础支持

- [x] axml（.axml 语言与语法支持）
- [x] acss（.acss 语言与语法支持）
- [x] sjs（.sjs 语言映射）

## 安装与启用

### 方式一：从扩展市场安装

在 VS Code 扩展市场搜索：麻雀 / Sparrow（发布者：ftzahao）。

### 方式二：本地打包安装

1. 在项目根目录安装依赖（按你的包管理器执行）。
2. 运行打包命令：

```bash
bun run build
```

3. 生成 `.vsix` 后，在 VS Code 中选择“从 VSIX 安装”。

## 配置说明

本扩展提供以下配置项（设置中搜索 sparrow.alias-skip）：

1. `sparrow.alias-skip.mappings`

- 类型：对象
- 默认值：`{"@": "/src", "~": "/src"}`
- 说明：路径别名映射，`/` 表示项目根目录

2. `sparrow.alias-skip.rootpath`

- 类型：字符串
- 默认值：`package.json`
- 说明：用于判断项目根目录的依据（存在该文件的目录视为项目根目录）

3. `sparrow.alias-skip.allowedsuffix`

- 类型：数组
- 默认值：`["js", "vue", "jsx", "ts"]`
- 说明：可省略后缀名时允许尝试补全的后缀列表

### 编辑器默认配置（configurationDefaults）

除上面的扩展配置外，麻雀还会提供一组编辑器默认项，主要用于提升小程序文件在 VS Code 中的编辑体验。

#### 1. 按语言指定默认格式化器

- `[wxml].editor.defaultFormatter`: `esbenp.prettier-vscode`
- `[wxss].editor.defaultFormatter`: `esbenp.prettier-vscode`
- `[wxs].editor.defaultFormatter`: `esbenp.prettier-vscode`
- `[axml].editor.defaultFormatter`: `esbenp.prettier-vscode`
- `[acss].editor.defaultFormatter`: `esbenp.prettier-vscode`
- `[sjs].editor.defaultFormatter`: `esbenp.prettier-vscode`

#### 2. AXML 编辑体验优化

- `[axml].editor.semanticHighlighting.enabled`: `false`
- `[axml].editor.quickSuggestions.other`: `true`
- `[axml].editor.quickSuggestions.strings`: `true`
- `[axml].editor.quickSuggestions.comments`: `false`

#### 3. Prettier 识别的小程序文档类型

- `prettier.documentSelectors` 默认包含：
  - `**/*.{wxml}`
  - `**/*.{wxss}`
  - `**/*.{wxs}`
  - `**/*.{axml}`
  - `**/*.{acss}`
  - `**/*.{sjs}`

#### 4. 样式语法检查兼容

- `css.lint.unknownAtRules`: `ignore`
- `less.lint.unknownAtRules`: `ignore`
- `scss.lint.unknownAtRules`: `ignore`

#### 5. 编辑器通用编辑体验优化

- `editor.defaultFormatter`: `esbenp.prettier-vscode`（全局默认格式化器）
- `editor.fontLigatures`: `true`（启用字体连字）
- `editor.formatOnPaste`: `true`（粘贴时自动格式化）
- `editor.formatOnSave`: `true`（保存时自动格式化）
- `editor.linkedEditing`: `true`（启用关联编辑）
- `editor.semanticTokenColorCustomizations`：针对以下内容启用斜体
  - `*.static`、`interface`、`keyword`、`selfParameter`
- `editor.tokenColorCustomizations`：通过 TextMate 规则为以下项启用斜体
  - 布尔常量：`constant.language.boolean`
  - 未定义/空值：`constant.language.undefined`、`constant.language.null`、`constant.language.nullptr`
  - 类型操作符：`meta.type keyword.operator.expression.typeof`、`meta.type keyword.operator.expression.keyof`
  - 关键字：`keyword.control`、`keyword.function`、`keyword.operator.new`、`keyword.operator.borrow.and.rust`
  - 存储类型：`storage.type`、`storage.modifier`
  - 语言变量：`variable.language.this`
  - 标记：`markup.italic`

#### 6. 文件和资源配置

- `explorer.fileNesting.enabled`: `true`（启用文件嵌套显示）
- `files.readonlyInclude`：将 Cargo 和 Rust 库文件标记为只读

#### 7. Git 相关配置

- `git.allowForcePush`: `true`（允许强制推送）
- `git.autofetch`: `true`（启用自动获取）
- `git.blame.editorDecoration.enabled`: `true`（显示 Git Blame）
- `git.pruneOnFetch`: `true`（获取时清理远程追踪分支）
- `git.rebaseWhenSync`: `true`（同步时使用变基）

#### 8. GitLens 配置

- 默认关闭大多数 GitLens 功能（AI 功能、注解、Heat Map 等）以减少编辑器负担
- 保留基础 Blame 功能的部分支持

#### 9. 国际化配置（i18n-ally）

- `i18n-ally.disabled`: `true`（禁用）
- 其他相关配置用于支持 JSON 格式的本地化文件

#### 10. 终端配置

- `terminal.integrated.fontLigatures.enabled`: `true`（启用终端字体连字）

#### 11. 窗口配置

- `window.autoDetectColorScheme`: `true`（自动检测系统配色方案）

**说明：** 以上为扩展提供的默认值。如果你在用户设置或工作区设置中显式配置了同名项，将以你的手动配置为准。

## Prettier 配置建议

在项目根目录创建 `.prettierrc`，推荐配置如下：

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "singleQuote": true,
  "printWidth": 200,
  "overrides": [
    {
      "files": ["*.axml", "*.wxml"],
      "options": {
        "parser": "html"
      }
    },
    {
      "files": ["*.acss", "*.wxss"],
      "options": {
        "parser": "css"
      }
    },
    {
      "files": ["*.sjs", "*.wxs"],
      "options": {
        "trailingComma": "none"
      }
    }
  ]
}
```

说明：

- `*.axml`、`*.wxml` 使用 `html` parser，使 Prettier 能正确格式化支付宝小程序模板文件
- `*.acss`、`*.wxss` 使用 `css` parser，使 Prettier 能正确格式化支付宝小程序样式文件
- `*.sjs`、`*.wxs` 禁用尾逗号，兼容支付宝/微信小程序 SJS、WXS 语法规范

## 快速示例

示例配置：

```json
{
  "sparrow.alias-skip.mappings": {
    "@": "/src",
    "components": "/src/components"
  },
  "sparrow.alias-skip.rootpath": "package.json",
  "sparrow.alias-skip.allowedsuffix": ["js", "ts", "vue"]
}
```

示例导入：

```ts
import Button from "@/components/Button";
import util from "../utils/index";
```

在路径字符串上按住 Cmd/Ctrl 并单击，即可跳转到对应文件。

## 开发说明

- 入口文件：`src/extension.ts`
- 构建命令：`bun run build`（内部执行 `vsce package`）
- 打包产物：项目根目录下的 `.vsix`

## 仓库

- GitHub: https://github.com/ftzahao/sparrow
