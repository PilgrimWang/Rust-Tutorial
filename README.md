# Rust 学习网站（Vite + React）

一个面向初学者的 Rust 交互式教程站点：侧边栏章节导航、搜索、学习进度记录（localStorage）、代码示例复制与在线运行。

## 功能

- 教程内容：`src/data/rustTutorial.ts`
- 进度记录：自动保存已阅读条目
- 搜索：按标题/解释全文检索
- 在线运行：Rust 代码块可一键打开 `play.rust-lang.org`（弹窗内嵌 + 新标签页）

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## GitHub Pages 部署

- 已提供 workflow：`.github/workflows/deploy-pages.yml`
- 建议在 GitHub 仓库中启用 Pages：`Settings -> Pages -> Build and deployment -> Source: GitHub Actions`
- 推送到 `main` 后会自动构建并发布 `dist/`
- 你的仓库：`PilgrimWang/Rust-Tutorial`（Pages 地址通常为 `https://pilgrimwang.github.io/Rust-Tutorial/`）

## 继续完善（建议方向）

- 将教程从 TS 数据迁移到 Markdown/MDX，降低维护成本
- 加入练习题/小测验、答案解析、可选提示
- 为代码块增加更多语言显示（bash/toml）与更完整的高亮
- 增加“学习路线图”：从语法 → 所有权 → 工程实践 → 并发/异步 → unsafe
