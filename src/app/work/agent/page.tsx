import SubPageLayout from '@/components/SubPageLayout'

const techStack = [
  'LangGraph', 'LangChain', 'OpenAI API', 'FastAPI',
  'Function Calling', 'RAG', 'Streaming', 'Next.js',
]

const plannedFeatures = [
  { label: '多步骤 Agent 工作流', desc: '基于 LangGraph StateGraph 编排工具调用与状态转移' },
  { label: 'Function Calling 工具链', desc: '天气查询、网页搜索、简单计算等工具绑定与路由' },
  { label: 'RAG 知识检索', desc: '向量检索 + 上下文增强，提升回答准确度' },
  { label: '流式输出', desc: 'SSE / Streaming Response 实时展示 Agent 推理过程' },
  { label: '工具调用可视化', desc: '前端展示 Thought → Action → Observation 链路' },
]

export default function WorkAgentPage() {
  return (
    <SubPageLayout title="LLM Agent 应用开发 Demo" backHref="/#work">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
        LLM Agent 应用开发 Demo
      </h1>
      <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
        基于 LangGraph / LangChain / LLM API 构建多步骤 Agent Demo，
        关注工具调用、状态管理、RAG 检索增强、流式输出与前端交互展示。
        定位为 AI 应用开发与工程实践项目。
      </p>

      {/* Badge row */}
      <div className="flex items-center gap-3 mb-10 flex-wrap">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-900/40 text-blue-300 border border-blue-800">
          Demo 项目
        </span>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-800">
          In Progress
        </span>
      </div>

      {/* Tech stack */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">技术栈</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-sm rounded-md bg-slate-800/80 text-slate-300 border border-slate-700 font-mono"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Planned features */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">预计包含功能</h2>
        <div className="space-y-3">
          {plannedFeatures.map((f) => (
            <div
              key={f.label}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50"
            >
              <span className="mt-0.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">{f.label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <div className="mt-12 pt-8 border-t border-slate-800">
        <p className="text-slate-600 text-xs">
          此 Demo 正在开发中，详细内容将在完成后更新到此页面。相关代码将同步至 GitHub。
        </p>
      </div>
    </SubPageLayout>
  )
}
