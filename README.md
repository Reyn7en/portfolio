# Portfolio — 个人主页

基于 **Next.js 14 + Tailwind CSS** 构建的个人主页，面向简历顶部展示场景。

## 功能概览

- **Hero** — 姓名、求职方向、一句话介绍
- **About** — 简短自我介绍，突出研究方向
- **Skills** — 分组技能栈（AI/ML、Python 工程、优化算法、工具链）
- **Work in Progress** — 三个方向卡片（LLM Agent / 调度优化 / 技术笔记）
- **Notes** — 学习笔记方向概览
- **Contact** — 邮箱、GitHub、简历下载

---

## 本地开发

### 前置依赖

- Node.js ≥ 18
- npm ≥ 9

### 启动步骤

```bash
# 1. 进入项目目录
cd portfolio

# 2. 安装依赖
npm install

# 3. 启动开发服务器（默认 http://localhost:3000）
npm run dev
```

### 生产构建

```bash
npm run build
# 输出到 out/ 目录（静态导出）
```

---

## 部署

### Vercel（推荐）

1. 将项目推送到 GitHub
2. 在 [vercel.com](https://vercel.com) 导入仓库
3. Framework 选 **Next.js**，其余默认
4. 点击 Deploy — Vercel 自动检测 `next.config.js` 中的 `output: 'export'`

### Cloudflare Pages

1. 推送到 GitHub
2. 在 Cloudflare Pages 中「Create a project」→ 连接 GitHub 仓库
3. 构建配置：
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
4. 点击 Save and Deploy

---

## 替换个人信息

| 文件 | 内容 |
|---|---|
| `src/components/Hero.tsx` | 姓名、英文名、一句话介绍 |
| `src/components/About.tsx` | 自我介绍正文 |
| `src/components/Contact.tsx` | 邮箱、GitHub 地址 |
| `public/resume.pdf` | 替换为真实简历文件 |
| `src/app/layout.tsx` | 页面 title / SEO meta |

---

## 项目结构

```
portfolio/
├── public/
│   └── resume.pdf          # 简历下载文件
├── src/
│   ├── app/
│   │   ├── layout.tsx      # 全局布局 + meta
│   │   ├── page.tsx        # 首页组合
│   │   └── globals.css     # 全局样式
│   └── components/
│       ├── Navbar.tsx      # 顶部导航
│       ├── Hero.tsx        # Hero 区
│       ├── About.tsx       # 关于我
│       ├── Skills.tsx      # 技能栈
│       ├── Work.tsx        # 项目方向卡片
│       ├── Notes.tsx       # 学习笔记
│       ├── Contact.tsx     # 联系方式
│       └── Footer.tsx      # 底部
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## License

MIT
