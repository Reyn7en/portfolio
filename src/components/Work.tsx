const workItems = [
  {
    id: 'A',
    title: 'LLM Agent Applications',
    subtitle: 'AI 应用开发',
    description:
      '关注 Agent Workflow 设计、Function Calling 与外部 API 工具调用、RAG 知识检索与增强、长期记忆管理，以及可交互 Demo 的工程化构建。探索 LangChain / LangGraph 框架与 MCP 协议在实际任务中的落地路径。',
    tags: ['LangChain', 'LangGraph', 'RAG', 'Function Calling', 'MCP', 'FastAPI'],
    icon: '🤖',
    accent: 'blue',
    href: '/work/agent/',
  },
  {
    id: 'B',
    title: 'Scheduling & Optimization',
    subtitle: '调度与智能优化',
    description:
      '关注工作流调度问题的建模（DAG）与求解，结合强化学习（DRL）和演化算法（GA/PSO）设计智能调度策略。使用事件驱动仿真框架进行多场景实验评估，系统比较各类方法在不同负载下的表现。',
    tags: ['DRL', 'DAG', 'GA/PSO', '仿真', 'PyTorch', 'Gymnasium'],
    icon: '⚙️',
    accent: 'violet',
    href: '/work/scheduling/',
  },
  {
    id: 'C',
    title: 'Engineering Notes',
    subtitle: '技术笔记与工程积累',
    description:
      '持续整理 Python 工程实践、Linux 开发环境配置、LLM Agent 开发经验与技术笔记。目标是形成系统化、可复用的技术参考资料。',
    tags: ['Python', 'Linux', 'Agent 开发', '笔记体系', 'Obsidian', 'Git'],
    icon: '📝',
    accent: 'cyan',
    href: '/work/engineering/',
  },
]

const accentMap: Record<string, { border: string; bg: string; tag: string; badge: string }> = {
  blue: {
    border: 'hover:border-blue-700',
    bg: 'bg-blue-900/20',
    tag: 'bg-blue-900/40 text-blue-300 border-blue-800',
    badge: 'text-blue-400 bg-blue-900/40 border-blue-800',
  },
  violet: {
    border: 'hover:border-violet-700',
    bg: 'bg-violet-900/20',
    tag: 'bg-violet-900/40 text-violet-300 border-violet-800',
    badge: 'text-violet-400 bg-violet-900/40 border-violet-800',
  },
  cyan: {
    border: 'hover:border-cyan-700',
    bg: 'bg-cyan-900/20',
    tag: 'bg-cyan-900/40 text-cyan-300 border-cyan-800',
    badge: 'text-cyan-400 bg-cyan-900/40 border-cyan-800',
  },
}

import TiltCard from './TiltCard'
import Link from 'next/link'

export default function Work() {
  return (
    <section id="work" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-12">
        <p className="text-blue-400 font-mono text-sm mb-2">{'// 03. work in progress'}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">项目方向</h2>
        <div className="w-16 h-1 bg-blue-600 rounded mt-3" />
        <p className="text-slate-400 text-sm mt-4 max-w-xl">
          以下是目前正在深耕的三个方向，相关项目持续迭代中。
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {workItems.map((item) => {
          const a = accentMap[item.accent]
          return (
            <Link key={item.id} href={item.href} className="block">
            <TiltCard
              max={10}
              className={`relative flex flex-col bg-slate-800/50 border border-slate-700 ${a.border} rounded-2xl p-6 transition-colors duration-200 hover:shadow-xl`}
            >
              {/* Icon & badge */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${a.bg} flex items-center justify-center text-2xl`}>
                  {item.icon}
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${a.badge}`}>
                  In Progress
                </span>
              </div>

              <h3 className="text-white font-bold text-lg leading-tight mb-1">
                {item.title}
              </h3>
              <p className="text-slate-500 text-xs mb-3 font-medium">{item.subtitle}</p>

              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-0.5 rounded border font-mono ${a.tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </TiltCard>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
