import SubPageLayout from '@/components/SubPageLayout'

const modules = [
  { title: 'Ubuntu / WSL 配置', desc: '系统初始化、用户权限、包管理（apt）、WSL2 与 Windows 互操作' },
  { title: 'Shell 脚本', desc: 'Bash 基础、变量与参数、条件判断、循环、函数、常用命令行工具链' },
  { title: '终端工具链', desc: 'tmux 会话管理、zsh + oh-my-zsh、nvim 基础配置与插件' },
  { title: 'SSH 与远程管理', desc: '密钥管理、端口转发、跳板机配置、screen 后台任务' },
  { title: '进程与性能', desc: 'ps / top / htop、systemd 服务管理、日志查看（journalctl / tail）' },
  { title: '常用运维操作', desc: 'Cron 定时任务、磁盘管理、用户与权限、防火墙基础' },
]

export default function NotesLinuxPage() {
  return (
    <SubPageLayout title="Linux 开发环境" backHref="/#notes">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
        Linux 开发环境
      </h1>
      <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
        整理 Ubuntu 配置、Shell 脚本、终端工具链（tmux / zsh / nvim）、
        SSH 与服务器运维常用操作，目标是能在纯终端环境下高效开发。
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
          基于日常开发环境配置经验整理，持续补充中。
        </p>
      </div>
    </SubPageLayout>
  )
}
