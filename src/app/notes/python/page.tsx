import SubPageLayout from '@/components/SubPageLayout'

const modules = [
  { title: '项目结构设计', desc: 'src-layout、包管理、monorepo 入门、.gitignore 与 .env 最佳实践' },
  { title: '依赖管理', desc: 'pip / Poetry / uv / conda 选型对比，lock 文件与版本约束策略' },
  { title: '异步编程', desc: 'asyncio、async/await、事件循环、协程与线程对比、FastAPI 异步路由' },
  { title: '类型系统', desc: 'Type Hints、Pydantic 数据校验、mypy 静态检查、dataclass' },
  { title: '测试策略', desc: 'pytest 基础、fixture、mock、参数化测试、覆盖率与 CI 集成' },
  { title: 'FastAPI 开发', desc: '路由设计、依赖注入、中间件、异常处理、OpenAPI 文档生成' },
]

export default function NotesPythonPage() {
  return (
    <SubPageLayout title="Python 工程实践" backHref="/#notes">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
        Python 工程实践
      </h1>
      <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
        从脚本到工程：覆盖项目结构设计、依赖管理、异步编程、类型系统、
        测试策略与 FastAPI 后端开发，注重可维护性和团队协作规范。
      </p>

      <div className="flex items-center gap-3 mb-10 flex-wrap">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-900/40 text-blue-300 border border-blue-800">
          学习笔记
        </span>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-400 border border-slate-700">
          整理中
        </span>
      </div>

      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">计划覆盖</h2>
        <div className="space-y-2">
          {modules.map((m, i) => (
            <div
              key={m.title}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/40 hover:border-slate-600 transition-colors"
            >
              <span className="w-6 h-6 flex items-center justify-center rounded text-xs font-mono text-slate-500 bg-slate-800 shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-white text-sm font-medium">{m.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-slate-800">
        <p className="text-slate-600 text-xs">
          此部分基于日常项目实践与踩坑经验整理，持续补充中。
        </p>
      </div>
    </SubPageLayout>
  )
}
