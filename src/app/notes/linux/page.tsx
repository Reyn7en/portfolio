'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ConsoleEgg from '@/components/ConsoleEgg'
import CustomCursor from '@/components/CustomCursor'
import MouseGlow from '@/components/MouseGlow'
import Particles from '@/components/Particles'
import { CODE_001, CODE_002, CODE_003, CODE_004, CODE_005, CODE_006, CODE_007, CODE_008, CODE_009, CODE_010, CODE_011, CODE_012, CODE_013, CODE_014, CODE_015, CODE_016, CODE_017, CODE_018, CODE_019, CODE_020, CODE_021, CODE_022, CODE_023, CODE_024, CODE_025, CODE_026, CODE_027, CODE_028, CODE_029, CODE_030, CODE_031, CODE_032, CODE_033, CODE_034, CODE_035, CODE_036, CODE_037, CODE_038, CODE_039, CODE_040, CODE_041, CODE_042, CODE_043, CODE_044, CODE_045, CODE_046, CODE_047, CODE_048, CODE_049, CODE_050, CODE_051, CODE_052, CODE_053, CODE_054, CODE_055, CODE_056, CODE_057, CODE_058, CODE_059, CODE_060, CODE_061, CODE_062 } from './code-data'

// === types ===

interface SectionMeta { id: string; title: string }
interface ChapterMeta {
  id: string
  label: string
  title: string
  pending?: boolean
  sections: SectionMeta[]
}

// === data ===

const chapters: ChapterMeta[] = [
  {
    id: 'wsl2-setup', label: '第一章', title: 'WSL2 & Ubuntu 开发环境搭建',
    sections: [
      { id: 'wsl2-intro',    title: 'WSL2 是什么、为什么用' },
      { id: 'wsl2-install',  title: 'WSL2 安装' },
      { id: 'ubuntu-config', title: 'Ubuntu 基础配置' },
      { id: 'filesystem',    title: '文件系统互通' },
      { id: 'dev-tools',     title: '开发工具链安装' },
      { id: 'wsl2-issues',   title: '常见问题 & 踩坑' },
    ],
  },
  {
    id: 'commands', label: '第二章', title: '常用命令速查',
    sections: [
      { id: 'cmd-file',      title: '文件与目录操作' },
      { id: 'cmd-view',      title: '文件查看与编辑' },
      { id: 'cmd-perm',      title: '权限管理' },
      { id: 'cmd-proc',      title: '进程管理' },
      { id: 'cmd-net',       title: '网络诊断' },
      { id: 'cmd-text',      title: '文本处理三剑客' },
    ],
  },
  {
    id: 'shell', label: '第三章', title: 'Shell 脚本与自动化',
    sections: [
      { id: 'shell-basics',  title: '基础语法速览' },
      { id: 'shell-ctrl',    title: '条件判断与循环' },
      { id: 'shell-func',    title: '函数与参数' },
      { id: 'shell-cases',   title: '实用脚本案例' },
      { id: 'shell-cron',    title: '定时任务 cron' },
    ],
  },
  {
    id: 'terminal', label: '第四章', title: '终端工具链配置',
    sections: [
      { id: 'term-zsh',      title: 'Zsh + Oh My Zsh 配置' },
      { id: 'term-tmux',     title: 'Tmux 会话管理' },
      { id: 'term-plugins',  title: '常用插件推荐' },
    ],
  },
  {
    id: 'ssh', label: '第五章', title: 'SSH 远程开发与服务器运维',
    sections: [
      { id: 'ssh-basics',    title: 'SSH 基础与密钥登录' },
      { id: 'ssh-config',    title: 'SSH Config 简化连接' },
      { id: 'ssh-tunnel',    title: '端口转发与隧道' },
      { id: 'ssh-vscode',    title: 'VSCode Remote SSH' },
      { id: 'ssh-transfer',  title: '文件传输与同步' },
    ],
  },
  {
    id: 'monitoring', label: '第六章', title: '性能监控与调优',
    sections: [
      { id: 'mon-cpu-mem',   title: 'CPU 与内存监控' },
      { id: 'mon-gpu',       title: 'GPU 监控 (nvidia-smi)' },
      { id: 'mon-disk',      title: '磁盘与 IO' },
      { id: 'mon-limit',     title: '资源限制' },
    ],
  },
  {
    id: 'docker', label: '第七章', title: 'Docker 基础与实践',
    sections: [
      { id: 'docker-concepts', title: '核心概念' },
      { id: 'docker-cmds',    title: '常用命令' },
      { id: 'docker-df',      title: 'Dockerfile 编写' },
      { id: 'docker-compose', title: 'Docker Compose' },
      { id: 'docker-dl',      title: '深度学习容器化实践' },
    ],
  },
]

// === helper components ===

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return <h2 id={id} className="text-xl font-bold text-white mt-12 mb-4 scroll-mt-28 pb-2 border-b border-slate-800">{children}</h2>
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-slate-200 mt-6 mb-2">{children}</h3>
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-400 text-[0.9375rem] leading-relaxed mb-3">{children}</p>
}
function Pre({ code }: { code: string }) {
  return <pre className="bg-slate-800/80 border border-slate-700/60 rounded-lg p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed my-4"><code>{code}</code></pre>
}
function C({ children }: { children: React.ReactNode }) {
  return <code className="px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 text-[0.85em] font-mono">{children}</code>
}
function NB({ children }: { children: React.ReactNode }) {
  return <div className="bg-blue-950/40 border border-blue-800/40 rounded-lg px-4 py-3 my-4 text-sm text-blue-300 leading-relaxed">💡 {children}</div>
}
function Warn({ children }: { children: React.ReactNode }) {
  return <div className="bg-yellow-950/30 border border-yellow-700/30 rounded-lg px-4 py-3 my-4 text-sm text-yellow-300 leading-relaxed">⚠️ {children}</div>
}
function Ul({ items }: { items: React.ReactNode[] }) {
  return <ul className="list-disc list-inside text-slate-400 text-[0.9375rem] leading-relaxed space-y-1 mb-3 ml-2">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
}

/* ════════════════════════════════════════════
   Chapter content renderers
   ════════════════════════════════════════════ */

// === 第一章：WSL2 ===

function ChapterWsl2() {
  return <>
    <H2 id="wsl2-intro">1. WSL2 是什么、为什么用</H2>
    <P>WSL2（Windows Subsystem for Linux 2）是 Windows 内置的 Linux 虚拟化方案，相比虚拟机更轻量，文件系统互通，能直接跑 Linux 二进制程序。</P>
    <P>对我而言最实用的几点：</P>
    <Ul items={[
      <><C>/mnt/c/</C> 挂载 C 盘，Linux 和 Windows 文件系统直接互通</>,
      '能跑 Docker，不需要 Docker Desktop 的额外开销',
      'VSCode 的 WSL 远程插件体验接近原生',
      '比完整虚拟机省内存，启动秒级',
    ]} />
    <Warn>如果机器是 Windows 10 且版本较老（19041 之前），建议先升级。WSL2 对内核版本有要求，老版本装起来很折腾。</Warn>

    <H2 id="wsl2-install">2. WSL2 安装（PowerShell 一行搞定）</H2>
    <P>以管理员身份打开 PowerShell，执行：</P>
    <Pre code={CODE_001} />
    <P>这条命令会自动完成：启用 WSL 可选功能、安装 WSL2 内核、设为默认版本、安装 Ubuntu 作为默认发行版。</P>
    <P>安装完成后重启电脑，首次进入 Ubuntu 会要求设置用户名和密码（输入密码时终端不显示字符，正常的）。重启后在开始菜单找 "Ubuntu" 或在 PowerShell 里输入 <C>wsl</C> 进入。</P>
    <NB>如果提示"无法解析服务器地址"或卡在下载，大概率是网络问题。可从 <a href="https://learn.microsoft.com/windows/wsl/install-manual" target="_blank" rel="noopener" className="text-blue-400 hover:underline">Microsoft 官方文档</a> 手动下载离线包安装。</NB>

    <H2 id="ubuntu-config">3. Ubuntu 基础配置</H2>
    <H3>3.1 换国内源（apt 加速）</H3>
    <P>Ubuntu 默认源在国外，<C>apt update</C> 经常超时。换成清华源：</P>
    
    <Pre code={CODE_002} />
    <P>Ubuntu 24.04（Noble）的 sources.list 格式变了（DEB822），直接编辑 <C>/etc/apt/sources.list.d/ubuntu.sources</C> 改 URL。</P>
    <H3>3.2 安装基础工具包</H3>
    
    <Pre code={CODE_003} />
    <P>这几个包覆盖了 90% 的日常需求：编译工具链、下载、Git、编辑器、进程监控、网络诊断。</P>
    <H3>3.3 配置 Git</H3>
    
    <Pre code={CODE_004} />

    <H2 id="filesystem">4. Windows 与 WSL 文件系统互通</H2>
    <H3>4.1 从 WSL 访问 Windows 文件</H3>
    <P>Windows 各盘符自动挂载在 <C>/mnt/</C> 下：</P>
    
    <Pre code={CODE_005} />
    <H3>4.2 从 Windows 访问 WSL 文件</H3>
    <P>在文件资源管理器地址栏输入 <C>\\wsl$\Ubuntu\home\用户名\</C>，或在 WSL 里输入 <C>explorer.exe .</C> 直接打开当前目录。</P>
    <H3>4.3 坑：跨文件系统性能差异</H3>
    <P>在 <C>/mnt/c/</C> 下跑 Linux 工具（<C>pip install</C>、<C>npm install</C>）会比 WSL 原生文件系统慢 5-10 倍。</P>
    <NB>最佳实践：开发项目放在 <C>~/projects/</C>（WSL 原生），不要用 Windows 文件系统跑 Linux 工具链。VSCode 用 Remote WSL 插件打开项目，不要直接打开 <C>\\wsl$\...</C> 路径。</NB>

    <H2 id="dev-tools">5. 开发工具链安装</H2>
    <H3>5.1 Python 环境（pyenv + venv）</H3>
    
    <Pre code={CODE_006} />
    <H3>5.2 VSCode + WSL 远程开发</H3>
    <P>在 Windows 侧 VSCode 安装 <C>WSL</C> 扩展，然后在 WSL 终端里输入 <C>code .</C>，VSCode 会自动连接 WSL 环境。左下角显示 "WSL: Ubuntu" 即连接成功，终端/解释器/linter 全部在 WSL 里跑。</P>
    <H3>5.3 Docker in WSL2（不装 Docker Desktop）</H3>
    
    <Pre code={CODE_007} />

    <H2 id="wsl2-issues">6. 常见问题 & 踩坑记录</H2>
    <H3>WSL2 占用内存过高</H3>
    <P>WSL2 默认会吃满宿主机内存。在 <C>%USERPROFILE%\.wslconfig</C>（Windows 侧）限制：</P>
    
    <Pre code={CODE_008} />
    <P>修改后执行 <C>wsl --shutdown</C> 重启生效。</P>
    <H3>apt update 时 GPG 密钥错误</H3>
    <P>现代 Ubuntu（22.04+）正确处理方式——不要用已废弃的 <C>apt-key</C>：</P>
    
    <Pre code={CODE_009} />
    <H3>WSL IP 每次重启后变化</H3>
    <P>WSL2 是 NAT 网络，IP 会变。访问 WSL 里的服务直接用 <C>localhost</C>，WSL2 会自动端口转发。如果转发失效，确认 <C>.wslconfig</C> 里有 <C>localhostForwarding=true</C>。</P>
  </>
}

// === 第二章：常用命令速查 ===

function ChapterCommands() {
  return <>
    <H2 id="cmd-file">1. 文件与目录操作</H2>
    <H3>基础导航</H3>
    
    <Pre code={CODE_010} />
    <H3>目录与文件管理</H3>
    
    <Pre code={CODE_011} />

    <H2 id="cmd-view">2. 文件查看与编辑</H2>
    
    <Pre code={CODE_012} />
    <NB>日常配 <C>alias less="less -R"</C> 可以让 <C>less</C> 正确显示带颜色的日志（如 pytest 输出）。</NB>

    <H2 id="cmd-perm">3. 权限管理</H2>
    
    <Pre code={CODE_013} />
    <P>权限三位一组：<C>rwx</C> = 读(4) + 写(2) + 执行(1)。<C>755</C> 即 owner 全权限、group 和 other 读+执行。常见组合：<C>644</C>（文件）、<C>755</C>（目录/脚本）、<C>600</C>（私钥）。</P>
    <Warn><C>chmod 777</C> 是"所有人都能读+写+执行"，除 <C>/tmp</C> 外几乎永远不该用。</Warn>

    <H2 id="cmd-proc">4. 进程管理</H2>
    
    <Pre code={CODE_014} />
    <H3>jobs / bg / fg 用法</H3>
    
    <Pre code={CODE_015} />
    <NB>在服务器跑长时间训练任务：优先用 <C>nohup</C> 或 <C>tmux</C>，比 <C>disown</C> 更可靠。</NB>

    <H2 id="cmd-net">5. 网络诊断</H2>
    
    <Pre code={CODE_016} />

    <H2 id="cmd-text">6. 文本处理三剑客</H2>
    <H3>grep — 搜索过滤</H3>
    
    <Pre code={CODE_017} />
    <H3>sed — 流编辑器（替换神器）</H3>
    
    <Pre code={CODE_018} />
    <H3>awk — 列处理</H3>
    
    <Pre code={CODE_019} />
    <P>日常最常用的组合拳：</P>
    
    <Pre code={CODE_020} />
  </>
}

// === 第三章：Shell 脚本 ===

function ChapterShell() {
  return <>
    <H2 id="shell-basics">1. 基础语法速览</H2>
    <H3>Shebang 与变量</H3>
    
    <Pre code={CODE_021} />
    <H3>字符串操作</H3>
    
    <Pre code={CODE_022} />
    <NB>变量一定要加引号！<C>rm -rf $DIR/</C>（若 <C>$DIR</C> 为空）= {'rm -rf /'}。改写成 {'rm -rf "$DIR/"'} 或 {'rm -rf "${DIR:?}"'} 安全得多。</NB>

    <H2 id="shell-ctrl">2. 条件判断与循环</H2>
    <H3>if 语句</H3>
    
    <Pre code={CODE_023} />
    <H3>for / while 循环</H3>
    
    <Pre code={CODE_024} />

    <H2 id="shell-func">3. 函数与参数</H2>
    
    <Pre code={CODE_025} />

    <H2 id="shell-cases">4. 实用脚本案例</H2>
    <H3>案例 1：批量超参数实验</H3>
    
    <Pre code={CODE_026} />
    <H3>案例 2：日志清理脚本</H3>
    
    <Pre code={CODE_027} />
    <H3>案例 3：检查 GPU 空闲后自动跑</H3>
    
    <Pre code={CODE_028} />

    <H2 id="shell-cron">5. 定时任务 cron</H2>
    
    <Pre code={CODE_029} />
    <NB>cron 的环境变量非常精简，<C>$PATH</C> 通常只含 <C>/usr/bin:/bin</C>。脚本中要用绝对路径，或在脚本开头 <C>export PATH=...</C>。</NB>
  </>
}

// === 第四章：终端工具链 ===

function ChapterTerminal() {
  return <>
    <H2 id="term-zsh">1. Zsh + Oh My Zsh 配置</H2>
    <H3>安装 Zsh 并设为默认</H3>
    
    <Pre code={CODE_030} />
    <H3>安装 Oh My Zsh</H3>
    <Pre code={CODE_031} />
    <P>安装后在 <C>~/.zshrc</C> 里配置主题和插件：</P>
    
    <Pre code={CODE_032} />
    <H3>常用 alias</H3>
    
    <Pre code={CODE_033} />

    <H2 id="term-tmux">2. Tmux 会话管理</H2>
    <H3>为什么要用 Tmux</H3>
    <Ul items={[
      'SSH 断线后训练任务不中断——重新连接后 <C>tmux attach</C> 恢复现场',
      '一个终端窗口切多个面板：左边写代码、右边跑命令、下边看日志',
      '多窗口管理：每个项目一个 tmux session，互不干扰',
    ]} />
    <H3>核心操作（默认前缀键：<C>Ctrl+b</C>）</H3>
    
    <Pre code={CODE_034} />
    <H3>推荐 .tmux.conf</H3>
    
    <Pre code={CODE_035} />

    <H2 id="term-plugins">3. 常用插件推荐</H2>
    <H3>zsh-autosuggestions（命令补全建议）</H3>
    
    <Pre code={CODE_036} />
    <P>效果：输入命令时自动弹灰色建议，按 <C>→</C> 补全。长时间敲过的命令不必再翻历史。</P>
    <H3>zsh-syntax-highlighting（命令语法高亮）</H3>
    
    <Pre code={CODE_037} />
    <P>效果：合法命令绿色，不存在的命令红色，帮助你敲完就发现拼写错误。</P>
    <H3>fzf（模糊搜索）</H3>
    
    <Pre code={CODE_038} />
    <NB>这三个插件加起来，终端操作效率和体验提升非常明显。安装顺序：zsh → oh-my-zsh → 插件 → fzf。</NB>
  </>
}

// === 第五章：SSH ===

function ChapterSsh() {
  return <>
    <H2 id="ssh-basics">1. SSH 基础与密钥登录</H2>
    <H3>生成密钥对并部署</H3>
    
    <Pre code={CODE_039} />
    <H3>安全加固（服务端）</H3>
    
    <Pre code={CODE_040} />
    <Warn>改端口前务必确认密钥登录正常，否则改完把自己锁在外面。</Warn>

    <H2 id="ssh-config">2. SSH Config — 简化连接</H2>
    
    <Pre code={CODE_041} />
    <P>常用配置项：<C>ServerAliveInterval 60</C>（每 60s 发心跳防止断连）、<C>ForwardAgent yes</C>（转发本机 SSH Agent，跳板机场景用）。</P>

    <H2 id="ssh-tunnel">3. 端口转发与隧道</H2>
    <H3>本地端口转发（访问服务器上的服务）</H3>
    
    <Pre code={CODE_042} />
    <H3>远程端口转发（让外网访问本机服务）</H3>
    
    <Pre code={CODE_043} />
    <H3>动态转发（SOCKS 代理）</H3>
    
    <Pre code={CODE_044} />
    <H3>跳板机（ProxyJump）</H3>
    
    <Pre code={CODE_045} />

    <H2 id="ssh-vscode">4. VSCode Remote SSH</H2>
    <P>安装 <C>Remote - SSH</C> 扩展后，VSCode 自动读取 <C>~/.ssh/config</C> 里的主机列表。点击左下角绿色按钮 → "Connect to Host..." → 选目标主机即可。</P>
    <P>首次连接会在远程安装 VSCode Server，之后所有扩展/终端/linter 都在远程机器运行，体验和本地开发几乎一样。</P>
    <NB>配合 <C>~/.ssh/config</C> 使用体验最佳。所有 Host 别名都会出现在 VSCode 的远程连接列表里。</NB>

    <H2 id="ssh-transfer">5. 文件传输与同步</H2>
    
    <Pre code={CODE_046} />
  </>
}

// === 第六章：性能监控 ===

function ChapterMonitoring() {
  return <>
    <H2 id="mon-cpu-mem">1. CPU 与内存监控</H2>
    <H3>htop — 交互式进程浏览器</H3>
    
    <Pre code={CODE_047} />
    <P>对比 <C>top</C>：<C>htop</C> 彩色、可鼠标点击、可直接杀进程、横竖滚动都支持，实用性强得多。</P>
    <H3>内存概况</H3>
    
    <Pre code={CODE_048} />

    <H2 id="mon-gpu">2. GPU 监控 (nvidia-smi)</H2>
    <H3>基础查询</H3>
    
    <Pre code={CODE_049} />
    <H3>检查 GPU 被谁占用</H3>
    
    <Pre code={CODE_050} />
    <H3>gpustat — 更清爽的 nvidia-smi</H3>
    
    <Pre code={CODE_051} />
    <P><C>gpustat</C> 输出比 <C>nvidia-smi</C> 紧凑得多，一眼看清哪些 GPU 空闲、谁在用什么。</P>

    <H2 id="mon-disk">3. 磁盘与 IO</H2>
    
    <Pre code={CODE_052} />

    <H2 id="mon-limit">4. 资源限制</H2>
    <H3>ulimit（进程级别限制）</H3>
    
    <Pre code={CODE_053} />
    <H3>限制训练任务 GPU 显存（PyTorch）</H3>
    
    <Pre code={CODE_054} />
    <NB>共享服务器上跑实验，务必 <C>nvidia-smi</C> 先看一眼谁在用哪张卡，避免踩到别人的训练任务。</NB>
  </>
}

// === 第七章：Docker ===

function ChapterDocker() {
  return <>
    <H2 id="docker-concepts">1. 核心概念</H2>
    <P>Docker 用"容器"打包应用及其所有依赖，确保在任何机器上运行一致。三个核心概念：</P>
    <Ul items={[
      <><b>镜像（Image）</b>：只读模板，含 OS 文件、依赖库、代码。从 Dockerfile 构建。</>,
      <><b>容器（Container）</b>：镜像的运行实例，轻量级沙箱，共享宿主机内核。</>,
      <><b>仓库（Registry）</b>：镜像的存储和分发中心（Docker Hub / 阿里云镜像仓库）。</>,
    ]} />

    <H2 id="docker-cmds">2. 常用命令</H2>
    
    <Pre code={CODE_055} />
    <H3>docker run 常用参数速查</H3>
    
    <Pre code={CODE_056} />

    <H2 id="docker-df">3. Dockerfile 编写</H2>
    <H3>Python 项目示例</H3>
    
    <Pre code={CODE_057} />
    <H3>PyTorch 项目示例</H3>
    
    <Pre code={CODE_058} />
    <NB>先 <C>COPY requirements.txt</C> 再 <C>COPY .</C> 是关键优化——依赖文件变动少，Docker 会复用缓存层，不需要每次重新安装。</NB>

    <H2 id="docker-compose">4. Docker Compose</H2>
    <P>当项目涉及多个容器（如 API + Redis + PostgreSQL），用 Compose 一把管理：</P>
    
    <Pre code={CODE_059} />
    
    <Pre code={CODE_060} />

    <H2 id="docker-dl">5. 深度学习容器化实践</H2>
    <P>把训练环境 Docker 化的几个实际好处：</P>
    <Ul items={[
      '论文复现仓库自带 Dockerfile → 一行命令获得完全相同的环境',
      '多台 GPU 服务器部署同一训练任务，不用担心 CUDA/cuDNN 版本差异',
      '实验环境隔离，Python 包冲突再也跟你没关系',
    ]} />
    <P>常用基础镜像选择：</P>
    
    <Pre code={CODE_061} />
    <H3>docker-compose 训练配置示例</H3>
    
    <Pre code={CODE_062} />
  </>
}

// === sidebar ===

function Sidebar({ activeChapter, activeSection, onNav }: {
  activeChapter: string
  activeSection: string
  onNav: (chapterId: string, sectionId?: string) => void
}) {
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">目录</p>
        <nav className="space-y-3">
          {chapters.map((ch) => (
            <div key={ch.id}>
              <button
                onClick={() => !ch.pending && onNav(ch.id)}
                className={`w-full text-left px-2 py-1 rounded text-sm font-semibold transition-colors ${
                  ch.pending
                    ? 'text-slate-600 cursor-default'
                    : activeChapter === ch.id
                      ? 'text-blue-400 bg-blue-950/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className={`font-mono text-[0.75rem] mr-1.5 ${activeChapter === ch.id ? 'text-blue-500' : 'text-slate-600'}`}>{ch.label}</span>
                {ch.title}
              </button>
              {ch.sections.length > 0 && (
                <div className="mt-0.5 space-y-0">
                  {ch.sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onNav(ch.id, s.id)}
                      className={`w-full text-left pl-5 pr-2 py-0.5 rounded text-[0.8125rem] transition-colors ${
                        activeSection === s.id
                          ? 'text-blue-400 bg-blue-950/30'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}

// === chapter switcher (mobile / above content) ===

function ChapterSwitcher({ activeChapter, onSwitch }: { activeChapter: string; onSwitch: (id: string) => void }) {
  return (
    <div className="flex items-center gap-2 mb-6 flex-wrap">
      {chapters.map((ch) => (
        <button
          key={ch.id}
          onClick={() => !ch.pending && onSwitch(ch.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
            ch.pending
              ? 'border-slate-800 text-slate-600 cursor-default bg-transparent'
              : activeChapter === ch.id
                ? 'border-blue-800 bg-blue-950/40 text-blue-300'
                : 'border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
          }`}
        >
          {ch.label}
        </button>
      ))}
    </div>
  )
}

// === render active chapter content ===

function ChapterContent({ chapterId }: { chapterId: string }) {
  switch (chapterId) {
    case 'wsl2-setup':  return <ChapterWsl2 />
    case 'commands':    return <ChapterCommands />
    case 'shell':       return <ChapterShell />
    case 'terminal':    return <ChapterTerminal />
    case 'ssh':         return <ChapterSsh />
    case 'monitoring':  return <ChapterMonitoring />
    case 'docker':      return <ChapterDocker />
    default:            return null
  }
}

// === main page ===

export default function NotesLinux() {
  const router = useRouter()
  const [activeChapter, setActiveChapter] = useState('wsl2-setup')
  const [activeSection, setActiveSection] = useState('wsl2-intro')
  const contentRef = useRef<HTMLDivElement>(null)

  // scroll tracking — highlight current section in sidebar
  useEffect(() => {
    const chapter = chapters.find(c => c.id === activeChapter)
    if (!chapter || chapter.sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    )

    const timer = setTimeout(() => {
      chapter.sections.forEach((s) => {
        const el = document.getElementById(s.id)
        if (el) observer.observe(el)
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [activeChapter])

  const handleNav = useCallback((chapterId: string, sectionId?: string) => {
    setActiveChapter(chapterId)
    const targetId = sectionId || chapters.find(c => c.id === chapterId)?.sections[0]?.id
    if (targetId) {
      setActiveSection(targetId)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      })
    }
  }, [])

  const activeChapterData = chapters.find(c => c.id === activeChapter)!

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <ConsoleEgg />
      <CustomCursor />
      <MouseGlow />
      <Particles />

      {/* header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <a
            href="/#notes"
            onClick={(e) => { e.preventDefault(); router.back() }}
            className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors cursor-pointer"
          >
            ← 返回首页
          </a>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 text-sm font-medium">Linux 笔记</span>
        </div>
      </header>

      {/* body: sidebar + content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-10">
          <Sidebar activeChapter={activeChapter} activeSection={activeSection} onNav={handleNav} />

          {/* content */}
          <div ref={contentRef} className="flex-1 min-w-0">
            {/* page header */}
            <div className="mb-6">
              <p className="text-blue-400 font-mono text-xs mb-1">// notes / linux</p>
              <h1 className="text-3xl font-bold text-white mb-3">Linux 笔记</h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                记录 Linux 开发环境配置、日常使用技巧与服务器运维经验。以实用为导向，覆盖 WSL2、Shell 脚本、性能监控等方向。<br/>
                <span className="text-slate-600 text-xs">注：以下内容在 AI 辅助下整理，命令示例和配置建议经过了人工验证。</span>
              </p>
            </div>

            {/* chapter switcher tabs */}
            <ChapterSwitcher activeChapter={activeChapter} onSwitch={(id) => handleNav(id)} />

            {/* chapter content — only current chapter */}
            <div key={activeChapter}>
              <div className="border border-slate-800 rounded-xl mb-6 overflow-hidden">
                <div className="px-5 py-4 bg-slate-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-blue-400 block">{activeChapterData.label}</span>
                    <span className="text-base font-semibold text-white">{activeChapterData.title}</span>
                  </div>
                </div>
                <div className="px-5 pb-6">
                  <ChapterContent chapterId={activeChapter} />
                </div>
              </div>
            </div>

            {/* prev / next navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
              <ChapterNavBtn
                chapters={chapters}
                currentId={activeChapter}
                direction="prev"
                onClick={(id) => handleNav(id)}
              />
              <ChapterNavBtn
                chapters={chapters}
                currentId={activeChapter}
                direction="next"
                onClick={(id) => handleNav(id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// === prev / next button ===

function ChapterNavBtn({ chapters, currentId, direction, onClick }: {
  chapters: ChapterMeta[]
  currentId: string
  direction: 'prev' | 'next'
  onClick: (id: string) => void
}) {
  const currentIdx = chapters.findIndex(c => c.id === currentId)
  const targetIdx = direction === 'prev' ? currentIdx - 1 : currentIdx + 1
  const target = chapters[targetIdx]
  const isPending = target?.pending && targetIdx < chapters.length

  if (!target || targetIdx < 0 || targetIdx >= chapters.length) {
    return <div />
  }

  if (isPending) {
    const nextReal = direction === 'prev'
      ? chapters.slice(0, currentIdx).reverse().find(c => !c.pending)
      : chapters.slice(currentIdx + 1).find(c => !c.pending)
    if (!nextReal) return <div />
    return (
      <button
        onClick={() => onClick(nextReal.id)}
        className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
      >
        {direction === 'prev' ? '← 上一章' : '下一章 →'} <span className="text-slate-600">({nextReal.title})</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => onClick(target.id)}
      className="text-slate-400 hover:text-slate-200 text-sm transition-colors flex items-center gap-1"
    >
      {direction === 'prev' ? '←' : ''} {direction === 'prev' ? '上一章' : '下一章'} {direction === 'next' ? '→' : ''}
      <span className="text-slate-600 hidden sm:inline">
        ({target.label} {target.title})
      </span>
    </button>
  )
}
