import SubPageLayout from '@/components/SubPageLayout'

const sections = [
  {
    title: 'Python 工程实践',
    desc: '项目结构设计、依赖管理（Poetry / uv）、异步编程、类型注解、测试策略（pytest）、FastAPI 后端开发',
    tags: ['FastAPI', 'asyncio', 'pytest', 'Poetry'],
  },
  {
    title: 'LLM Agent 开发经验',
    desc: 'LangGraph / LangChain 实践踩坑、Function Calling 调试、RAG 调优、流式输出实现',
    tags: ['LangGraph', 'RAG', 'Prompt Engineering'],
  },
  {
    title: 'Linux 开发环境',
    desc: 'Ubuntu / WSL 配置、Shell 脚本、终端工具链（tmux / zsh / nvim）、SSH 与服务器运维',
    tags: ['Linux', 'Shell', 'tmux', 'nvim'],
  },
]

export default function WorkEngineeringPage() {
  return (
    <SubPageLayout title="技术笔记与工程积累" backHref="/#work">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
        技术笔记与工程积累
      </h1>
      <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
        持续整理 Python 工程实践、Linux 开发环境配置、LLM Agent 开发经验，
        形成系统化、可复用的技术参考资料。
      </p>

      {/* Badge row */}
      <div className="flex items-center gap-3 mb-10 flex-wrap">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-900/40 text-cyan-300 border border-cyan-800">
          持续积累
        </span>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-800">
          In Progress
        </span>
      </div>

      {/* Sections */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">覆盖领域</h2>
        <div className="space-y-4">
          {sections.map((s) => (
            <div
              key={s.title}
              className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/50"
            >
              <h3 className="text-white font-semibold mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded bg-slate-700/60 text-cyan-400 border border-slate-700 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <div className="mt-12 pt-8 border-t border-slate-800">
        <p className="text-slate-600 text-xs">
          笔记持续更新中，部分内容已同步至 <a href="/#notes" className="text-blue-500 hover:underline">学习笔记</a> 专区。
        </p>
      </div>
    </SubPageLayout>
  )
}
