import SubPageLayout from '@/components/SubPageLayout'

const techStack = [
  'Python', 'PyTorch', 'NumPy', 'Matplotlib',
  'Gymnasium', '演化算法 (GA/PSO)', '事件驱动仿真', 'DAG 建模',
]

const plannedContent = [
  { label: '问题建模', desc: '云边协同环境下的 DAG 工作流形式化定义，任务依赖与资源约束建模' },
  { label: '仿真框架', desc: '事件驱动仿真引擎，支持动态任务到达、异构设备、通信延迟等场景' },
  { label: '强化学习策略', desc: '基于 DRL（PPO / DQN）的调度决策策略设计与训练' },
  { label: '演化算法对比', desc: 'GA / PSO 等启发式方法作为 Baseline，多维度性能对比' },
  { label: '实验评估', desc: '能耗、工作流完成时间、延期率等指标的系统对比与可视化' },
]

export default function WorkSchedulingPage() {
  return (
    <SubPageLayout title="云边协同动态工作流调度优化" backHref="/#work">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
        云边协同动态工作流调度优化
      </h1>
      <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
        面向云边协同环境下的动态工作流调度与任务卸载问题。使用 DAG 描述任务依赖，
        构建事件驱动仿真环境，结合强化学习与演化算法优化终端能耗与工作流延期。
        体现算法建模、仿真实验与对比评估能力。
      </p>

      {/* Badge row */}
      <div className="flex items-center gap-3 mb-10 flex-wrap">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-900/40 text-violet-300 border border-violet-800">
          学术研究
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

      {/* Planned content */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">研究内容</h2>
        <div className="space-y-3">
          {plannedContent.map((f) => (
            <div
              key={f.label}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50"
            >
              <span className="mt-0.5 w-2 h-2 rounded-full bg-violet-500 shrink-0" />
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
          相关研究论文与实验数据整理中，完成后将在此页面展示方法与结果。
        </p>
      </div>
    </SubPageLayout>
  )
}
