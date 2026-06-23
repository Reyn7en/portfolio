# 文件结构与链接关系表

> 本文档记录所有页面的文件位置、访问路径和返回链接，用于防止路径错误。
> **最后更新**: 2026-06-23

---

## 一、静态 HTML 文件结构

### 1.1 主页
| 文件名 | 实际路径 | 访问 URL | 说明 |
|--------|---------|---------|------|
| `preview.html` | `/portfolio/preview.html` | `file:///.../portfolio/preview.html` | 个人主页（静态版） |

### 1.2 Notes 笔记
| 文件名 | 实际路径 | 顶部返回链接 | 页脚导航 | 说明 |
|--------|---------|------------|---------|------|
| `notes/agent/index.html` | `/portfolio/notes/agent/index.html` | `../../preview.html` | — | Agent 笔记索引 |
| `notes/agent/langgraph/index.html` | `/portfolio/notes/agent/langgraph/index.html` | `../index.html` | 无上一篇 · 下一篇 `../state/` | 第1篇 |
| `notes/agent/state/index.html` | `/portfolio/notes/agent/state/index.html` | `../index.html` | 上一篇 `../langgraph/` · 下一篇 `../router-tool-calling/` | 第2篇 |
| `notes/agent/router-tool-calling/index.html` | `/portfolio/notes/agent/router-tool-calling/index.html` | `../index.html` | 上一篇 `../state/` · 下一篇 `../react-loop/` | 第3篇 |
| `notes/agent/react-loop/index.html` | `/portfolio/notes/agent/react-loop/index.html` | `../index.html` | 上一篇 `../router-tool-calling/` · 下一篇 `../memory-system/` | 第4篇 |
| `notes/agent/memory-system/index.html` | `/portfolio/notes/agent/memory-system/index.html` | `../index.html` | 上一篇 `../react-loop/` · 下一篇 `../human-in-the-loop/` | 第5篇 |
| `notes/agent/human-in-the-loop/index.html` | `/portfolio/notes/agent/human-in-the-loop/index.html` | `../index.html` | 上一篇 `../memory-system/` · 下一篇 `../multi-agent/` | 第6篇 |
| `notes/agent/multi-agent/index.html` | `/portfolio/notes/agent/multi-agent/index.html` | `../index.html` | 上一篇 `../human-in-the-loop/` · 下一篇 `../rag/` | 第7篇 |
| `notes/agent/rag/index.html` | `/portfolio/notes/agent/rag/index.html` | `../index.html` | 上一篇 `../multi-agent/` · 无下一篇 | 第8篇 |
| `notes/python/index.html` | `/portfolio/notes/python/index.html` | `../../preview.html` | — | Python 笔记（待整理）|
| `notes/linux/index.html` | `/portfolio/notes/linux/index.html` | `../../preview.html` | — | Linux 笔记（待整理）|
| `notes/cs/index.html` | `/portfolio/notes/cs/index.html` | `../../preview.html` | — | CS 笔记（待整理）|

### 1.3 Work 项目
| 文件名 | 实际路径 | 返回链接 | 说明 |
|--------|---------|---------|------|
| `work/index.html` | `/portfolio/work/index.html` | `../preview.html` | Work 索引页（待创建）|
| `work/agent/index.html` | `/portfolio/work/agent/index.html` | `../../preview.html` | Agent Demo（待创建）|
| `work/scheduling/index.html` | `/portfolio/work/scheduling/index.html` | `../../preview.html` | 云边调度（待创建）|
| `work/engineering/index.html` | `/portfolio/work/engineering/index.html` | `../../preview.html` | 笔记积累（待创建）|

---

## 二、React 页面结构（Next.js App Router）

### 2.1 主页
| 文件路径 | 访问路径 | 说明 |
|---------|---------|------|
| `src/app/page.tsx` | `/` | 个人主页 |

### 2.2 Notes 笔记
| 文件路径 | 访问路径 | 返回链接 | 说明 |
|---------|---------|---------|------|
| `src/app/notes/page.tsx` | `/notes` | `/` | Notes 索引页 |
| `src/app/notes/agent/page.tsx` | `/notes/agent` | `/notes` | Agent 笔记索引 |
| `src/app/notes/agent/langgraph/page.tsx` | `/notes/agent/langgraph` | `/notes/agent` | LangGraph 基础 |
| `src/app/notes/agent/state/page.tsx` | `/notes/agent/state` | `/notes/agent` | State 深入 |
| `src/app/notes/agent/router-tool-calling/page.tsx` | `/notes/agent/router-tool-calling` | `/notes/agent` | Router & Tool Calling |
| `src/app/notes/agent/react-loop/page.tsx` | `/notes/agent/react-loop` | `/notes/agent` | ReAct 循环 |
| `src/app/notes/agent/memory-system/page.tsx` | `/notes/agent/memory-system` | `/notes/agent` | 记忆系统 |
| `src/app/notes/agent/human-in-the-loop/page.tsx` | `/notes/agent/human-in-the-loop` | `/notes/agent` | Human-in-the-Loop |
| `src/app/notes/agent/multi-agent/page.tsx` | `/notes/agent/multi-agent` | `/notes/agent` | Multi-Agent |
| `src/app/notes/agent/rag/page.tsx` | `/notes/agent/rag` | `/notes/agent` | RAG 集成 |

### 2.3 Work 项目
| 文件路径 | 访问路径 | 返回链接 | 说明 |
|---------|---------|---------|------|
| `src/app/work/page.tsx` | `/work` | `/` | Work 索引页 |
| `src/app/work/agent/page.tsx` | `/work/agent` | `/work` | Agent Demo |
| `src/app/work/scheduling/page.tsx` | `/work/scheduling` | `/work` | 云边调度 |
| `src/app/work/engineering/page.tsx` | `/work/engineering` | `/work` | 笔记积累 |

---

## 三、链接规则

### 3.1 静态 HTML 返回链接规则
1. **一级页面**（直接在主目录下）: `href="../preview.html"`
   - 例: `notes/index.html`, `work/index.html`

2. **二级页面**（在子目录下）: `href="../../preview.html"`
   - 例: `notes/agent/index.html`, `work/agent/index.html`

3. **三级页面**（在子子目录下）: `href="../index.html"`（返回到同级索引页）
   - 例: `notes/agent/langgraph/index.html` → `../index.html`

### 3.2 React 页面返回链接规则
- 使用 `router.back()` 或 `<Link href="...">`
- 返回路径见上表"返回链接"列

---

## 四、同步检查清单

每次修改后，检查：
- [ ] 静态 HTML 的返回链接是否正确
- [ ] React 页面的返回链接是否正确
- [ ] 两个版本的内容是否同步
- [ ] 运行 `python3 scripts/verify_links.py` 验证

---

## 五、待办事项

- [ ] 创建 `work/` 下的静态 HTML 文件
- [ ] 创建 `notes/python/`, `notes/linux/`, `notes/cs/` 的内容
- [ ] 编写自动同步脚本（从 React 页面生成静态 HTML）
