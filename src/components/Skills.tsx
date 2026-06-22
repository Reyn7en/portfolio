const skillGroups = [
  {
    category: 'AI / ML',
    color: 'blue',
    skills: [
      'LangChain',
      'LangGraph',
      'OpenAI API',
      'RAG',
      'Function Calling',
      'MCP Protocol',
      'Prompt Engineering',
      'Embedding & Vector DB',
    ],
  },
  {
    category: 'Python 工程',
    color: 'violet',
    skills: [
      'Python 3.x',
      'FastAPI',
      'Pydantic',
      'asyncio',
      'SQLAlchemy',
      'pytest',
      'Poetry / uv',
      'Docker',
    ],
  },
  {
    category: '优化 & 算法',
    color: 'cyan',
    skills: [
      'PyTorch',
      'Gymnasium',
      'DRL (PPO/DQN)',
      '演化算法 (GA/PSO)',
      'DAG 建模',
      '事件驱动仿真',
      'NumPy / SciPy',
      'Matplotlib',
    ],
  },
  {
    category: '工具 & 环境',
    color: 'emerald',
    skills: [
      'Git / GitHub',
      'Linux (Ubuntu)',
      'VS Code',
      'Jupyter Notebook',
      'PostgreSQL',
      'Redis',
      'Vercel / Cloudflare',
      'CI/CD',
    ],
  },
]

const colorMap: Record<string, string> = {
  blue: 'bg-blue-900/30 text-blue-300 border-blue-800',
  violet: 'bg-violet-900/30 text-violet-300 border-violet-800',
  cyan: 'bg-cyan-900/30 text-cyan-300 border-cyan-800',
  emerald: 'bg-emerald-900/30 text-emerald-300 border-emerald-800',
}

const headerColorMap: Record<string, string> = {
  blue: 'text-blue-400',
  violet: 'text-violet-400',
  cyan: 'text-cyan-400',
  emerald: 'text-emerald-400',
}

const dotColorMap: Record<string, string> = {
  blue: 'bg-blue-500',
  violet: 'bg-violet-500',
  cyan: 'bg-cyan-500',
  emerald: 'bg-emerald-500',
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-blue-400 font-mono text-sm mb-2">{'// 02. skills'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">技能栈</h2>
          <div className="w-16 h-1 bg-blue-600 rounded mt-3" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${dotColorMap[group.color]}`} />
                <h3 className={`font-semibold text-sm ${headerColorMap[group.color]}`}>
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-xs px-2.5 py-1 rounded-md border font-mono ${colorMap[group.color]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
