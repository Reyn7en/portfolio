import SubPageLayout from '@/components/SubPageLayout'

const outline = [
  { title: 'Function Calling', desc: 'JSON Schema 工具定义、tool_choice 策略、错误处理与重试' },
  { title: 'LangChain Expression Language', desc: 'Runnable 接口、管道语法、invoke / batch / stream 模式' },
  { title: 'ReAct 推理循环', desc: 'Thought → Action → Observation 循环、终止条件、Token 管理' },
  { title: 'LangGraph 基础', desc: 'StateGraph 构建、Node / Edge / 条件边定义与 DAG 编排' },
  { title: '工具路由与检索增强', desc: '@tool 装饰器、Agentic Search vs 传统检索、RAG 集成模式' },
  { title: '持久化与流式', desc: 'Checkpointer、thread_id、三种 Stream Mode 对比' },
  { title: 'Human-in-the-Loop', desc: 'interrupt_before 中断机制、审批流程设计、安全实践' },
  { title: 'Multi-Agent 架构', desc: 'Single Agent / Supervisor / Hierarchical 三种协作模式对比' },
]

export default function NotesAgentPage() {
  return (
    <SubPageLayout title="LLM & Agent 开发" backHref="/#notes">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
        LLM & Agent 开发
      </h1>
      <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
        基于 deeplearning.ai 公开课（AI Agents in LangGraph / Functions, Tools and Agents with LangChain）
        的系统学习笔记，覆盖 Agent 设计模式、工具调用、RAG 架构与 LangGraph 实践要点。
      </p>

      <div className="flex items-center gap-3 mb-10 flex-wrap">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-900/40 text-blue-300 border border-blue-800">
          学习笔记
        </span>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-900/30 text-green-400 border border-green-800">
          已整理 8 节
        </span>
      </div>

      {/* Note outline */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">笔记大纲</h2>
        <div className="space-y-2">
          {outline.map((item, i) => (
            <div
              key={item.title}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/40 hover:border-slate-600 transition-colors"
            >
              <span className="w-6 h-6 flex items-center justify-center rounded text-xs font-mono text-slate-500 bg-slate-800 shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-white text-sm font-medium">{item.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-slate-800">
        <p className="text-slate-500 text-sm">
          学习来源：
          <a href="https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/" target="_blank" rel="noopener" className="text-blue-400 hover:underline ml-1">
            AI Agents in LangGraph
          </a>
          <span className="mx-1.5 text-slate-700">|</span>
          <a href="https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/" target="_blank" rel="noopener" className="text-blue-400 hover:underline">
            Functions, Tools and Agents with LangChain
          </a>
        </p>
      </div>
    </SubPageLayout>
  )
}
