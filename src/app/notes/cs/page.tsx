import SubPageLayout from '@/components/SubPageLayout'

const modules = [
  { title: '操作系统', desc: '进程与线程、内存管理、文件系统、用户态与内核态、Linux 系统调用' },
  { title: '计算机网络', desc: 'TCP/IP 协议栈、HTTP/HTTPS、DNS、WebSocket、常见网络故障排查' },
  { title: '数据库原理', desc: '索引结构（B+Tree）、事务与隔离级别、SQL 优化、Redis 数据结构' },
  { title: '数据结构与算法', desc: '数组 / 链表 / 栈 / 树 / 图、排序搜索、动态规划、常见面试题型' },
  { title: '设计模式', desc: '单例 / 工厂 / 观察者 / 策略模式，Python 实现与适用场景' },
  { title: '面试专题', desc: '项目描述、算法手写、系统设计基础、行为面试准备' },
]

export default function NotesCsPage() {
  return (
    <SubPageLayout title="计算机基础" backHref="/#notes">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
        计算机基础
      </h1>
      <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
        覆盖操作系统、计算机网络、数据库原理与 SQL 优化，
        以经典面试考点为导向，系统梳理核心知识，兼顾理论与实践。
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
          以面试与校招为导向整理，持续补充中。
        </p>
      </div>
    </SubPageLayout>
  )
}
