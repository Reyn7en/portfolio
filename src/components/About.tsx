const highlights = [
  {
    icon: '🎓',
    label: '电子信息',
    desc: '硕士在读，研究方向聚焦 AI 应用与系统优化',
  },
  {
    icon: '🤖',
    label: 'LLM & Agent',
    desc: '关注 Agent Workflow、Function Calling 与 RAG 检索增强',
  },
  {
    icon: '⚙️',
    label: '智能调度',
    desc: '探索强化学习与演化算法在复杂调度场景中的应用',
  },
  {
    icon: '🔧',
    label: 'Python 工程',
    desc: '重视工程化实践：模块化设计、测试覆盖与 CI/CD',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-12">
        <p className="text-blue-400 font-mono text-sm mb-2">{'// 01. about'}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">关于我</h2>
        <div className="w-16 h-1 bg-blue-600 rounded mt-3" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Text block */}
        <div className="space-y-5 text-slate-300 leading-relaxed">
          <p>
            目前就读于电子信息专业，硕士研究生阶段。
            主要方向是将大语言模型与工程实践相结合，
            构建具备实际可用性的 AI 应用系统。
          </p>
          <p>
            在 <span className="text-blue-300 font-medium">AI 应用开发</span> 方向，
            关注 LLM Agent 架构设计、RAG 知识检索、Function Calling 与 MCP 协议、
            以及面向实际业务场景的可交互 Demo 构建。
          </p>
          <p>
            在 <span className="text-blue-300 font-medium">智能优化调度</span> 方向，
            研究强化学习（DRL）、演化算法与 DAG 建模在工作流调度问题中的应用，
            结合事件驱动仿真进行多场景实验评估。
          </p>
          <p>
            同步积累 Python 工程实践、Linux 开发环境配置、计算机基础与面试准备笔记，
            持续整理为可复用的学习资料。
          </p>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 hover:border-blue-700 transition-colors"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{item.label}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
