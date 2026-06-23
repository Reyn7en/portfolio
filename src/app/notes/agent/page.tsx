import SubPageLayout from "@/components/SubPageLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agent 笔记 — 学习笔记",
  description: "LLM Agent 方向学习笔记索引，覆盖 LangGraph、Tool Calling、RAG 等内容。",
}

/* ── article card data ─────────────────────── */

const articles = [
  {
    id: "langgraph",
    title: "LangGraph 学习记录：从 State、Node 到 Tool Calling",
    excerpt: "一份阶段性学习记录，覆盖 State 管理、节点与边、工具调用、Checkpointer 与 Streaming 等核心概念。基于 deeplearning.ai 公开课整理。",
    tags: ["LangGraph", "学习笔记"],
    status: "published" as const,
    href: "/notes/agent/langgraph",
  },
  {
    id: "state",
    title: "State 深入：add_messages、Reducer 与 StateGraph 选型",
    excerpt: "TypedDict + Annotated 标准写法、add_messages 的智能合并逻辑、Reducer 函数处理多节点写入冲突、MessageGraph vs StateGraph 的选型思路。",
    tags: ["LangGraph", "State", "学习笔记"],
    status: "published" as const,
    href: "/notes/agent/state",
  },
  {
    id: "router-tool-calling",
    title: "Router & Tool Calling Agent：条件边路由与工具调用",
    excerpt: "条件边路由机制、结构化输出 with_structured_output、@tool 装饰器、ToolNode 封装、bind_tools 绑定工具到 LLM。",
    tags: ["LangGraph", "Tool Calling", "学习笔记"],
    status: "published" as const,
    href: "/notes/agent/router-tool-calling",
  },
  {
    id: "react-loop",
    title: "ReAct 自治循环：Reasoning + Acting 的自主决策",
    excerpt: "create_react_agent 一行搭建、Thought→Action→Observation 循环、流式输出 stream_mode、终止条件与死循环防护。",
    tags: ["LangGraph", "ReAct", "学习笔记"],
    status: "published" as const,
    href: "/notes/agent/react-loop",
  },
  {
    id: "memory-system",
    title: "记忆系统：Checkpointer 与 Store 的分工与实践",
    excerpt: "Checkpointer 短期会话记忆、Store 长期跨会话记忆、MemorySaver/SqliteSaver/PostgresSaver 选型、混合使用场景与踩坑记录。",
    tags: ["LangGraph", "记忆系统", "学习笔记"],
    status: "published" as const,
    href: "/notes/agent/memory-system",
  },
  {
    id: "human-in-the-loop",
    title: "Human-in-the-Loop：人工审批与安全中断",
    excerpt: "interrupt / Command 机制、审批流设计、敏感操作的安全实践、中断与 Checkpointer 的配合。",
    tags: ["LangGraph", "Human-in-the-Loop", "学习笔记"],
    status: "published" as const,
    href: "/notes/agent/human-in-the-loop",
  },
  {
    id: "multi-agent",
    title: "Multi-Agent 架构：协作、分工与通信",
    excerpt: "Supervisor 模式、Hierarchical 分层架构、平级协作、Agent 间通信与任务路由、状态共享与冲突处理。",
    tags: ["LangGraph", "Multi-Agent", "学习笔记"],
    status: "published" as const,
    href: "/notes/agent/multi-agent",
  },
  {
    id: "rag",
    title: "RAG 集成 & 实战项目",
    excerpt: "Agentic RAG vs Naive RAG、检索工具设计、多步检索与自我纠错、端到端综合案例、调试技巧。",
    tags: ["LangGraph", "RAG", "学习笔记"],
    status: "published" as const,
    href: "/notes/agent/rag",
  },
]

const pendingTopics: [string, string][] = []

/* ── page component ───────────────────────── */

export default function NotesAgentIndex() {
  return (
    <SubPageLayout title="Agent 笔记" backHref="/#notes">
      {/* page header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Agent 笔记</h1>
        <p className="text-slate-400 leading-relaxed max-w-2xl">
          记录我在 LLM Agent 方向的学习过程，覆盖 LangGraph、Tool Calling、
          RAG 架构与 Agent 设计模式。内容以阶段性理解为主，持续更新。
        </p>
        <div className="flex items-center gap-3 mt-6 flex-wrap">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-900/40 text-blue-300 border border-blue-800">
            学习笔记
          </span>
          <span className="text-slate-500 text-xs">{articles.length} 篇已整理 · {pendingTopics.length} 篇待整理</span>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-8">
        {/* published articles */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            已整理
          </h2>
          <div className="space-y-4">
            {articles.map((a) => (
              <a
                key={a.id}
                href={a.href}
                className="block p-5 rounded-xl border border-slate-700 bg-slate-800/30 hover:border-blue-700/60 hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {a.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[0.7rem] font-medium rounded bg-slate-700/60 text-slate-300">
                      {t}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 text-[0.7rem] font-medium rounded bg-green-900/30 text-green-400 border border-green-800/40">
                    已整理
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {a.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed line-clamp-2">
                  {a.excerpt}
                </p>
                <p className="text-xs text-slate-500 mt-3">点击阅读全文 →</p>
              </a>
            ))}
          </div>
        </section>

        {/* pending topics */}
        <section>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            待整理大纲
          </h2>
          <div className="space-y-2">
            {pendingTopics.map(([title, desc]) => (
              <div
                key={title}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/20 border border-slate-700/30 opacity-60"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded text-xs font-mono text-slate-500 bg-slate-800 shrink-0 mt-0.5">
                  ?
                </span>
                <div>
                  <p className="text-slate-400 text-sm font-medium">{title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* learning sources */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm">
            学习来源：{" "}
            <a href="https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/" target="_blank" rel="noopener" className="text-blue-400 hover:underline">
              AI Agents in LangGraph
            </a>
            {" | "}
            <a href="https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/" target="_blank" rel="noopener" className="text-blue-400 hover:underline">
              Functions, Tools and Agents with LangChain
            </a>
          </p>
        </div>
      </div>
    </SubPageLayout>
  )
}
