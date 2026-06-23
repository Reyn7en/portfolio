"use client"

import Link from "next/link"
import SubPageLayout from "@/components/SubPageLayout"

/* ---------- inline components ---------- */
function S({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-white mb-5">{title}</h2>
      <div className="text-slate-300 leading-relaxed space-y-4 text-[0.9375rem]">
        {children}
      </div>
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

function C({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-slate-800/80 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed my-4">
      <code>{children}</code>
    </pre>
  )
}

function IC({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 text-[0.85em] font-mono">
      {children}
    </code>
  )
}

function NB({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-900/20 border border-blue-800/40 rounded-lg px-4 py-3 my-4 text-sm text-blue-300">
      {children}
    </div>
  )
}

/* ---------- main page ---------- */
export default function HumanInTheLoop() {
  return (
    <SubPageLayout title="Human-in-the-Loop">
      <article className="prose prose-invert max-w-none
        prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-[0.9375rem]
        prose-li:text-slate-300 prose-li:leading-relaxed prose-li:text-[0.9375rem]
        prose-strong:text-white
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-code:text-blue-300 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.85em] prose-code:font-mono
        prose-pre:bg-slate-800/80 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-lg prose-pre:p-4">

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-blue">LangGraph</span>
            <span className="badge badge-blue">Human-in-the-Loop</span>
            <span className="badge badge-green">学习笔记</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 leading-snug">
            Human-in-the-Loop：人工审批与安全中断
          </h1>
          <p className="text-slate-400 text-sm">
            覆盖 interrupt / Command 机制、审批流设计、敏感操作的安全实践。
            基于 deeplearning.ai 公开课整理，个人学习记录。
          </p>
        </header>

        {/* TOC */}
        <nav className="mb-10 p-5 rounded-xl bg-slate-800/40 border border-slate-700/60">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">目录</p>
          <ol className="list-decimal list-inside text-sm space-y-1.5 text-slate-300">
            <li><a href="#why" className="text-blue-400 hover:underline">为什么需要 Human-in-the-Loop</a></li>
            <li><a href="#interrupt" className="text-blue-400 hover:underline">interrupt：在节点中主动中断</a></li>
            <li><a href="#command" className="text-blue-400 hover:underline">Command：恢复执行与注入人工输入</a></li>
            <li><a href="#approval-flow" className="text-blue-400 hover:underline">审批流设计模式</a></li>
            <li><a href="#sensitive-ops" className="text-blue-400 hover:underline">敏感操作的安全实践</a></li>
            <li><a href="#checkpointer" className="text-blue-400 hover:underline">中断与 Checkpointer 的配合</a></li>
            <li><a href="#streaming" className="text-blue-400 hover:underline">流式输出下的人工介入</a></li>
            <li><a href="#summary" className="text-blue-400 hover:underline">小结</a></li>
          </ol>
        </nav>

        {/* ===== 1 ===== */}
        <S id="why" title="1. 为什么需要 Human-in-the-Loop">
          <P>
            从课程视频里了解到，LangGraph 的核心理念之一是把 Agent 的每一步都变成<strong className="text-white">显式的、可中断的、可恢复的</strong>。这和传统 Agent 框架很不一样——很多框架把 LLM 的推理过程封装成一个黑盒，你想让人审一下再执行，往往要在 prompt 层面 hack，非常不优雅。
          </P>
          <P>
            实际场景里，有几类情况你必须让人介入：
          </P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">高风险操作</strong>：发邮件、转账、删除数据——执行前必须人工确认。</li>
            <li><strong className="text-white">不确定性高</strong>：模型置信度低，或者多个候选 action 得分接近，需要人做最终判断。</li>
            <li><strong className="text-white">合规要求</strong>：金融、医疗等领域，某些决策必须有审计轨迹和人工签字。</li>
            <li><strong className="text-white">长期运行的 Agent</strong>：Agent 跑了几轮后状态已经很复杂，人需要定期 review，决定继续还是调整方向。</li>
          </ul>
          <NB>
            LangGraph 的设计哲学：<strong className="text-blue-200">中断不是异常，而是正常流程的一部分。</strong>
            interrupt 是图中的一个普通节点逻辑，Checkpointer 负责保存现场，Command 负责恢复执行。
          </NB>
        </S>

        {/* ===== 2 ===== */}
        <S id="interrupt" title="2. interrupt：在节点中主动中断">
          <P>
            <IC>interrupt()</IC> 是 LangGraph 提供的一个<strong className="text-white">特殊函数</strong>，调用它时，图的执行会立即暂停，并把中断信息返回给调用方。等人工处理完，再通过 <IC>Command</IC> 恢复执行。
          </P>
          <P>
            最基本的使用方式，在节点函数里直接调用 <IC>interrupt</IC>：
          </P>
          <C>{`from langgraph.types import interrupt

def human_approval_node(state: State) -> dict:
    # 准备一个需要人工确认的信息
    draft = state["draft_reply"]
    
    # 中断！执行到这里会暂停，把 draft 返回给调用方
    approval = interrupt(
        {"question": "请审核这封邮件，是否发送？", "draft": draft}
    )
    
    # 恢复后，approval 里包含了人工的输入
    return {"approved": approval["approved"], "comment": approval["comment"]}`}</C>
          <P>
            关键点：<IC>interrupt()</IC> 接收的参数会被原封不动地返回给调用方（通常是你的后端 API 或前端）。调用方拿到这个信息后，展示给人工，收集输入，再通过 <IC>Command</IC> 恢复图。
          </P>
          <P>
            在课程示例里，中断的典型位置有两个：
          </P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">interrupt_before</strong>：在某个关键节点<strong className="text-white">执行前</strong>中断（比如发邮件工具调用前）。</li>
            <li><strong className="text-white">interrupt_after</strong>：在某个节点执行完后、下一个节点开始前中断（比如模型生成了回复草稿，让人审核后再发）。</li>
          </ul>
          <P>
            实际上 API 层面就是一个 <IC>interrupt()</IC> 调用，放在节点函数的合适位置就行。「before/after」是你放的位置不同，不是两个不同函数。
          </P>
          <NB>
            我一开始以为 <IC>interrupt</IC> 会抛异常或者改 State，其实都不会。它更像是一个「协程 yield」——把控制权交还给调用方，State 保持不变，等恢复时从 <IC>interrupt</IC> 调用后的下一行继续执行。
          </NB>
        </S>

        {/* ===== 3 ===== */}
        <S id="command" title="3. Command：恢复执行与注入人工输入">
          <P>
            中断后怎么恢复？用 <IC>Command</IC>。它是 LangGraph 提供的另一个特殊类型，用来向图中<strong className="text-white">注入外部输入并指定恢复位置</strong>。
          </P>
          <P>典型恢复流程（后端代码）：</P>
          <C>{`from langgraph.types import Command

# 假设图的当前状态被 interrupt 暂停了
# 前端收集到人工审批结果后，调用后端 API

def resume_graph(thread_id: str, approved: bool, comment: str):
    # Command 告诉图：从哪个节点恢复（通常是被中断的节点），以及注入什么数据
    command = Command(
        goto="human_approval_node",   # 恢复到哪个节点
        update={"approved": approved, "comment": comment}  # 注入到 State 的数据
    )
    
    # 用同一个 thread_id 继续运行
    result = app.invoke(command, config={"configurable": {"thread_id": thread_id}})
    return result`}</C>
          <P>
            这里有一个我初学时容易混淆的点：<IC>Command</IC> 的 <IC>goto</IC> 指定的是「恢复后从哪个节点继续执行」，而 <IC>update</IC> 是直接 merge 进当前 State 的数据。恢复后，节点函数从 <IC>interrupt()</IC> 调用后的那行继续跑，同时 State 里已经有了人工输入的数据。
          </P>
          <P>
            课程里特别强调：<strong className="text-white">恢复时不需要从头重跑</strong>。Checkpointer 已经把中断前的完整 State 存好了，恢复时 LangGraph 会从断点继续，之前的节点不会重复执行。这对长链路 Agent 来说非常重要——你不会想让人审批一次就把前面 10 步全部重跑一遍。
          </P>
        </S>

        {/* ===== 4 ===== */}
        <S id="approval-flow" title="4. 审批流设计模式">
          <P>
            课程里给了一个比较完整的「邮件发送 Agent」作为 Human-in-the-Loop 的案例。我把它整理成一个可复用的设计模式。
          </P>
          <P>
            <strong className="text-white">模式：审批节点（Approval Node）</strong>
          </P>
          <ul className="list-decimal list-inside space-y-2 text-slate-300">
            <li>模型生成一个「待审批操作」（比如邮件草稿），写入 State。</li>
            <li>下一个节点是「审批节点」，里面调用 <IC>interrupt()</IC>，把草稿内容返回给调用方。</li>
            <li>前端/API 展示草稿，收集用户决策（批准 / 修改 / 拒绝）。</li>
            <li>用 <IC>Command</IC> 恢复，注入审批结果。</li>
            <li>审批节点根据结果决定下一个节点：批准 → 执行发送；拒绝 → 结束或重新规划。</li>
          </ul>
          <P>用条件边实现分支：</P>
          <C>{`from langgraph.graph import END

def after_approval(state: State) -> str:
    if state["approved"]:
        return "send_email_node"   # 批准 → 执行
    else:
        return END                  # 拒绝 → 结束

# 在图里
graph.add_conditional_edges("human_approval_node", after_approval)`}</C>
          <P>
            这个模式的好处是：<strong className="text-white">审批逻辑是图的一个普通节点，不是特殊处理</strong>。你可以对它做所有对普通节点能做的事——加工具调用、加条件边、在前面加一个 LLM 节点来「预处理」待审批内容。
          </P>
          <NB>
            课程里提到一个 trick：如果审批被拒绝，可以让图转到一个新的「重新规划」节点，让模型根据拒绝原因重新生成方案，而不是直接 END。这样 Agent 有自我修正的机会，体验更好。
          </NB>
        </S>

        {/* ===== 5 ===== */}
        <S id="sensitive-ops" title="5. 敏感操作的安全实践">
          <P>
            学完这部分后我总结了几条实际写代码时需要注意的安全实践，课程里也有提到类似思路。
          </P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">永远在工具执行前中断。</strong>不要等工具执行完了再让人审核——那时候副作用已经发生了。正确做法是在调用敏感工具的节点前放一个审批节点。</li>
            <li><strong className="text-white">中断信息要足够详细。</strong><IC>interrupt()</IC> 的参数就是你展示给用户的内容，尽量结构化（操作类型、目标、参数、预计影响），让人能做出 informed decision。</li>
            <li><strong className="text-white">恢复时验证输入。</strong>人工输入的数据（特别是自由文本）可能有毒或不合理，恢复后在节点里做一层校验再往下走。</li>
            <li><strong className="text-white">超时处理。</strong>如果人工一直不审批怎么办？需要设计超时机制（比如 10 分钟没响应自动拒绝或走备用流程），课程里没细讲，但实际部署必须考虑。</li>
            <li><strong className="text-white">审计日志。</strong>每次中断 + 恢复都要记录日志（谁审批的、什么决策、时间戳），方便事后审计和 debug。</li>
          </ul>
          <P>
            课程里有一个比较好的实践：把「待执行操作」和「执行结果」分开存在 State 里。中断时展示「待执行操作」，恢复后执行，执行完把结果写回 State。这样整个流程的记录是完整的，出了问题可以回溯。
          </P>
        </S>

        {/* ===== 6 ===== */}
        <S id="checkpointer" title="6. 中断与 Checkpointer 的配合">
          <P>
            这一部分我在学的时候觉得是 LangGraph 设计最巧妙的地方之一：<strong className="text-white">interrupt 能工作，完全依赖 Checkpointer</strong>。
          </P>
          <P>
            没有 Checkpointer 的话，图的状态只存在于内存里。一旦进程重启、或者你想把中断期间的数据持久化到数据库，状态就丢了。用了 Checkpointer 之后：
          </P>
          <ul className="list-decimal list-inside space-y-2 text-slate-300">
            <li>调用 <IC>interrupt()</IC> 时，LangGraph 自动把当前完整 State 通过 Checkpointer 存起来（就像普通 checkpoint 一样）。</li>
            <li>你的应用可以把 <IC>thread_id</IC> 存到数据库里，返回一个「审批链接」给前端用户。</li>
            <li>用户点链接、审批、提交——后端用同一个 <IC>thread_id</IC> 创建 <IC>Command</IC> 恢复执行。</li>
            <li>LangGraph 从 Checkpointer 里读出中断前的 State，从中断点继续。</li>
          </ul>
          <P>代码示例（结合 Checkpointer）：</P>
          <C>{`from langgraph.checkpoint.sqlite import SqliteSaver

# 用持久化的 Checkpointer
with SqliteSaver.from_conn_string("checkpoints.db") as saver:
    app = graph.compile(checkpointer=saver)
    
    # 第一次运行，到 interrupt 处暂停
    thread_id = "email-approval-001"
    result = app.invoke(
        {"messages": [("user", "帮我回复这封邮件")]},
        config={"configurable": {"thread_id": thread_id}}
    )
    # result 里会包含 interrupt 的信息，图的状态已存入 checkpoints.db
    
    # --- 这里可以停很久，甚至重启进程 ---
    
    # 恢复：用同一个 thread_id
    command = Command(
        goto="human_approval_node",
        update={"approved": True, "comment": "看起来没问题"}
    )
    result = app.invoke(
        command,
        config={"configurable": {"thread_id": thread_id}}
    )`}</C>
          <P>
            这个设计让我意识到：<strong className="text-white">Human-in-the-Loop 不是 LangGraph 的「附加功能」，而是和 Checkpointer 深度集成的核心能力</strong>。没有持久化，Human-in-the-Loop 就只能做同步审批（人在 loop 里等着），有了持久化，可以做异步审批（发个链接，几小时后再回来继续）。
          </P>
        </S>

        {/* ===== 7 ===== */}
        <S id="streaming" title="7. 流式输出下的人工介入">
          <P>
            这一部分课程讲得比较快，我结合自己的理解整理一下。
          </P>
          <P>
            当图在 <IC>stream_mode="messages"</IC> 下运行时，你可以在「流式接收模型输出」的过程中检测是否需要人工介入。一个典型场景：
          </P>
          <ul className="list-decimal list-inside space-y-2 text-slate-300">
            <li>模型正在流式输出一段文字……</li>
            <li>你在前端实时展示这段文字，同时用另一个模型或规则检测内容是否「不安全」。</li>
            <li>如果检测到危险内容，立即调用一个「中断接口」，让当前图的执行暂停。</li>
            <li>前端弹出确认框：「模型正在生成可能不合适的内容，是否继续？」</li>
            <li>用户选择「停止」→ 图走到一个「安全终止」节点；选择「继续」→ 恢复流式输出。</li>
          </ul>
          <P>
            技术上实现这个需要在流的消费端（你的应用代码）里做判断，然后调用类似 <IC>app.interrupt()</IC> 的接口（具体 API 我还没有在实践中用过，课程里也没有完整的代码示例）。这部分我先标记为「待在实践中验证」。
          </P>
          <P>
            课程里给的一个更简单的替代方案是：<strong className="text-white">不在流式过程中介入，而是在模型输出完成后、工具执行前介入</strong>。这样实现简单很多，也能覆盖大多数场景。
          </P>
        </S>

        {/* ===== 8 ===== */}
        <S id="summary" title="8. 小结">
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><IC>interrupt()</IC> 是 LangGraph 实现 Human-in-the-Loop 的核心，调用时图暂停，State 保持不变。</li>
            <li><IC>Command</IC> 用来恢复执行，指定恢复节点并注入人工输入，不需要从头重跑。</li>
            <li>审批流设计：审批节点是普通节点，用条件边根据审批结果决定下一步走向。</li>
            <li>中断 + Checkpointer 配合，支持异步审批（跨进程、跨时间）。</li>
            <li>敏感操作的安全实践：执行前中断、结构化中断信息、恢复时校验输入、记录审计日志。</li>
            <li>流式输出中的实时介入比较 tricky，课程建议改成「输出完成后介入」更简单。</li>
          </ul>
          <NB>
            这一篇没有「未搞清楚的问题」章节——因为课程这一部分讲得比较完整，我目前没有特别大的疑问。如果后续实践中遇到坑，会回来补充。
          </NB>
        </S>

        {/* Footer links */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-4 text-sm">
          <Link href="/notes/agent/memory-system" className="text-blue-400 hover:underline">
            ← 记忆系统
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/notes/agent" className="text-blue-400 hover:underline">
            返回 Agent 笔记索引
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/notes/agent/multi-agent" className="text-blue-400 hover:underline">
            下一篇：Multi-Agent 架构 →
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-800">
          <p className="text-slate-600 text-xs leading-relaxed">
            个人学习记录，2026 年 6 月。内容基于 deeplearning.ai 公开课整理，
            如有不准确之处，欢迎指正。
          </p>
        </div>

      </article>
    </SubPageLayout>
  )
}
