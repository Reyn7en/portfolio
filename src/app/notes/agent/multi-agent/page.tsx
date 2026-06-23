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
export default function MultiAgent() {
  return (
    <SubPageLayout title="Multi-Agent 架构">
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
            <span className="badge badge-blue">Multi-Agent</span>
            <span className="badge badge-green">学习笔记</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 leading-snug">
            Multi-Agent 架构：协作、分工与通信
          </h1>
          <p className="text-slate-400 text-sm">
            覆盖 Supervisor、Hierarchical、平级协作等模式，以及 Agent 间通信与任务分工机制。
            基于 deeplearning.ai 公开课整理，个人学习记录。
          </p>
        </header>

        {/* TOC */}
        <nav className="mb-10 p-5 rounded-xl bg-slate-800/40 border border-slate-700/60">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">目录</p>
          <ol className="list-decimal list-inside text-sm space-y-1.5 text-slate-300">
            <li><a href="#why-multi" className="text-blue-400 hover:underline">为什么需要 Multi-Agent</a></li>
            <li><a href="#supervisor" className="text-blue-400 hover:underline">Supervisor 模式</a></li>
            <li><a href="#hierarchical" className="text-blue-400 hover:underline">Hierarchical 分层架构</a></li>
            <li><a href="#peer-collab" className="text-blue-400 hover:underline">平级协作模式</a></li>
            <li><a href="#communication" className="text-blue-400 hover:underline">Agent 间通信机制</a></li>
            <li><a href="#task-routing" className="text-blue-400 hover:underline">任务路由与动态分工</a></li>
            <li><a href="#state-sharing" className="text-blue-400 hover:underline">状态共享与冲突处理</a></li>
            <li><a href="#summary" className="text-blue-400 hover:underline">小结</a></li>
          </ol>
        </nav>

        {/* ===== 1 ===== */}
        <S id="why-multi" title="1. 为什么需要 Multi-Agent">
          <P>
            在学这部分之前，我写的 Agent 都是「单兵作战」：一个图，一个 LLM，一把工具。但课程里提到，当任务复杂度上去之后，单体 Agent 会遇到几个天花板：
          </P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">Prompt 太长、太杂。</strong>一个 Agent 既要懂代码，又要懂法律，还要懂金融——prompt 塞不下，效果也差。</li>
            <li><strong className="text-white">工具太多，选择困难。</strong>给一个 Agent 绑 30 个工具，它经常选错或者用错参数。</li>
            <li><strong className="text-white">单点失败。</strong>一个 Agent 卡住或者进入死循环，整个流程就挂了。</li>
            <li><strong className="text-white">无法并行。</strong>单体 Agent 本质上是串行的，多个子任务无法同时推进。</li>
          </ul>
          <P>
            Multi-Agent 的思路是：<strong className="text-white">把复杂任务拆给多个专门化的 Agent，每个 Agent 只管自己擅长的事</strong>。就像软件工程里的「单一职责原则」，Agent 也该如此。
          </P>
          <NB>
            课程里 Harrison Chase 的一句话印象很深：「Agent 的边界应该和人类的角色边界对齐」。一个研究团队里有研究员、有工程师、有项目经理，Agent 团队也该这样分工。
          </NB>
        </S>

        {/* ===== 2 ===== */}
        <S id="supervisor" title="2. Supervisor 模式">
          <P>
            <strong className="text-white">Supervisor（监督者）模式</strong>是 Multi-Agent 最直观的架构：一个中央 Agent（Supervisor）负责任务分发和结果汇总，多个 Worker Agent 负责具体执行。
          </P>
          <P>
            在 LangGraph 里实现 Supervisor 模式，核心是用<strong className="text-white">条件边 + 路由函数</strong>：
          </P>
          <C>{`from langgraph.graph import StateGraph, END
from typing import Annotated, TypedDict
from langgraph.graph.message import add_messages

class TeamState(TypedDict):
    messages: Annotated[list, add_messages]
    next: str          # 下一个要执行的 Agent 名称
    task: str
    results: dict       # 各 Agent 的执行结果

# Supervisor 节点：决定下一个派给谁
def supervisor_node(state: TeamState):
    # 用一个「擅长调度」的模型来决定任务分配
    response = supervisor_llm.invoke([
        ("system", "你是一个项目管理者，决定下一个该派给谁：coder / researcher / writer / FINISH"),
        ("user", f"当前任务：{state['task']}\\n已有结果：{state['results']}\\n请决定下一步。")
    ])
    next_agent = response.content.strip()
    return {"next": next_agent}

# 构建图
graph = StateGraph(TeamState)
graph.add_node("supervisor", supervisor_node)
graph.add_node("coder", coder_agent)      # 每个 Worker 是一个编译好的 LangGraph 应用
graph.add_node("researcher", researcher_agent)
graph.add_node("writer", writer_agent)

# 条件边：supervisor 决定下一步去哪
graph.add_conditional_edges("supervisor", lambda s: s["next"])

graph.set_entry_point("supervisor")`}</C>
          <P>
            关键点：<strong className="text-white">每个 Worker Agent 本身可以是一个完整的 LangGraph 应用</strong>（用 <IC>as_node</IC> 或 <IC>with_types</IC> 包装成节点）。Supervisor 不用关心 Worker 内部怎么实现，只要知道它能处理什么类型的子任务。
          </P>
          <P>
            课程里给的一个更简洁的写法是直接用字符串条件边：
          </P>
          <C>{`# 不用显式写路由函数，直接在 add_conditional_edges 里用 lambda
graph.add_conditional_edges(
    "supervisor",
    lambda s: s["next"],       # 返回值直接是节点名
    {"coder": "coder", "researcher": "researcher", "FINISH": END}
)`}</C>
        </S>

        {/* ===== 3 ===== */}
        <S id="hierarchical" title="3. Hierarchical 分层架构">
          <P>
            Supervisor 模式有一个问题：<strong className="text-white">当 Worker 数量变多，Supervisor 的 prompt 和决策压力也会变大</strong>。Hierarchical（分层）架构解决这个问题——它不是扁平的「一对多」，而是「多层金字塔」。
          </P>
          <P>
            典型结构：
          </P>
          <ul className="list-decimal list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">L1 - 总控 Agent</strong>：接收用户任务，拆分成若干子目标，派给 L2 的组长 Agent。</li>
            <li><strong className="text-white">L2 - 组长 Agent</strong>：每个组长管 2-3 个执行 Agent，负责协调组内任务、汇总结果。</li>
            <li><strong className="text-white">L3 - 执行 Agent</strong>：具体干活的，绑定具体工具和 prompt。</li>
          </ul>
          <P>
            在 LangGraph 里的实现思路：<strong className="text-white">每个层级是一个子图（Subgraph）</strong>。L1 的图里，L2 组长是一个节点；L2 的图里，L3 执行者是一个节点。
          </P>
          <C>{`from langgraph.graph import StateGraph

# L3：执行层（具体干活）
coder_graph = StateGraph(CoderState)
coder_graph.add_node("write_code", write_code_node)
# ... 构建 coder_graph ...

# L2：组长层（协调多个 L3）
backend_lead_graph = StateGraph(TeamState)
backend_lead_graph.add_node("coder", coder_graph.compile())   # 把 L3 的编译结果作为节点
backend_lead_graph.add_node("tester", tester_graph.compile())
# ... 用条件边在 coder/tester 之间路由 ...

# L1：总控层
root_graph = StateGraph(RootState)
root_graph.add_node("backend_lead", backend_lead_graph.compile())
root_graph.add_node("frontend_lead", frontend_lead_graph.compile())
# ...`}</C>
          <P>
            这个架构的好处是<strong className="text-white">每层只需要关心下一层的接口</strong>，不需要知道最底层怎么执行。符合软件工程里的「关注点分离」原则。
          </P>
          <NB>
            课程里提到：分层不是越深越好。2-3 层通常够用，再深了调试和状态管理会变得非常复杂。我目前觉得 2 层（总控 + 执行）对大多数场景已经足够。
          </NB>
        </S>

        {/* ===== 4 ===== */}
        <S id="peer-collab" title="4. 平级协作模式">
          <P>
            不是所有 Multi-Agent 都需要层级结构。<strong className="text-white">平级协作（Peer Collaboration）</strong>模式里，多个 Agent 地位平等，通过「消息传递」或「共享状态」来协作。
          </P>
          <P>
            课程里讲了两种平级协作的实现方式：
          </P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">方式一：共享 State。</strong>多个 Agent 读写同一个 State 的不同字段，通过 State 里的标志位来协调（「我干完了，把 my_done 设为 True」）。</li>
            <li><strong className="text-white">方式二：消息传递。</strong>Agent A 的输出写入 State 的 <IC>messages</IC> 列表，Agent B 读取后处理，再把结果 append 进去。本质就是 <IC>add_messages</IC> 的 reducer 机制。</li>
          </ul>
          <P>
            我更喜欢方式二，因为：
          </P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>有<strong className="text-white">显式的通信记录</strong>（都在 <IC>messages</IC> 里），debug 的时候可以完整回溯。</li>
            <li>不需要预先设计「谁写哪个字段」，更灵活。</li>
            <li>和 LLM 的对话历史天然对齐。</li>
          </ul>
          <P>平级协作用 <IC>add_messages</IC> 的示例：</P>
          <C>{`class PeerState(TypedDict):
    messages: Annotated[list, add_messages]   # 所有 Agent 共享同一份对话历史

def researcher_node(state: PeerState):
    # Researcher 读完所有消息，产出研究结果
    result = researcher_llm.invoke(state["messages"])
    return {"messages": [("assistant", result.content)]}

def coder_node(state: PeerState):
    # Coder 接着消息历史，看到 Researcher 的结果
    result = coder_llm.invoke(state["messages"])
    return {"messages": [("assistant", result.content)]}

# 在图里用条件边控制轮流发言
graph.add_edge("researcher", "coder")   # 简单场景：固定顺序
# 或者：用路由函数决定下一个发言者`}</C>
        </S>

        {/* ===== 5 ===== */}
        <S id="communication" title="5. Agent 间通信机制">
          <P>
            这部分课程内容比较散，我结合自己的理解整理几种常见的 Agent 间通信方式。
          </P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">直接函数调用（Synchronous）</strong>：Agent A 的节点函数里直接调用 Agent B 的 <IC>invoke</IC>。最简单，但耦合度高，Agent B 挂了会拖垮 A。</li>
            <li><strong className="text-white">消息队列（Asynchronous）</strong>：Agent A 把任务写入队列，Agent B 异步消费。适合耗时长的任务。LangGraph 本身不提供队列，需要和 Celery/RabbitMQ 等集成。</li>
            <li><strong className="text-white">共享存储（Shared State / Database）</strong>：Agent A 写数据库，Agent B 轮询或监听变更。适合需要持久化的场景。</li>
            <li><strong className="text-white">Subgraph 嵌入</strong>：把 Agent B 编译后作为 Agent A 图中的一个节点（用 <IC>as_node()</IC> 或编译后的 <IC>app</IC> 直接当节点函数）。这是 LangGraph 最推荐的 Agent 组合方式。</li>
          </ul>
          <P>
            课程里重点讲了<strong className="text-white">Subgraph 嵌入</strong>这种方式，示例代码：
          </P>
          <C>{`from langgraph.graph import StateGraph

# Agent B：一个专门做代码 Review 的 Agent（独立构建）
reviewer_graph = StateGraph(ReviewerState)
# ... 构建 reviewer_graph ...
reviewer_app = reviewer_graph.compile()

# Agent A：主 Agent，把 reviewer 作为其中一个节点
main_graph = StateGraph(MainState)
main_graph.add_node("draft", draft_node)
main_graph.add_node("review", reviewer_app)   # 直接把编译好的 app 当节点！
main_graph.add_node("fix", fix_node)

main_graph.add_edge("draft", "review")
main_graph.add_conditional_edges("review", should_fix_or_finish)`}</C>
          <P>
            这个写法的好处：<strong className="text-white">Reviewer Agent 可以独立测试、独立部署，主图只关心它的输入输出接口</strong>。这和微服务架构的思想是一样的。
          </P>
        </S>

        {/* ===== 6 ===== */}
        <S id="task-routing" title="6. 任务路由与动态分工">
          <P>
            在 Multi-Agent 系统里，一个核心问题是：<strong className="text-white">收到一个任务后，派给谁？</strong>这就是任务路由（Task Routing）。
          </P>
          <P>
            课程里介绍了三种路由策略：
          </P>
          <ul className="list-decimal list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">LLM 路由（智能路由）</strong>：用一个「小型、快速」的 LLM，输入任务描述，输出最优 Agent 名称。灵活，能处理未见过的任务类型，但有延迟和成本。</li>
            <li><strong className="text-white">规则路由（Deterministic Routing）</strong>：用关键词匹配、正则表达式、或者向量相似度来路由。快，零 LLM 调用，但只能处理预设的场景。</li>
            <li><strong className="text-white">混合路由</strong>：先走规则路由，规则匹配不上的再走 LLM 路由。课程里推荐这种，兼顾效率和覆盖率。</li>
          </ul>
          <P>LLM 路由的代码示例（和 Router & Tool Calling 那篇里的路由函数写法一样）：</P>
          <C>{`from pydantic import BaseModel, Field

class RouteDecision(BaseModel):
    next_agent: str = Field(..., description="下一个执行的 Agent：coder / researcher / writer / FINISH")
    reason: str = Field(..., description="做这个选择的理由")

def route_task(state: TeamState) -> str:
    # 用 with_structured_output 做结构化路由决策
    router_llm = supervisor_llm.with_structured_output(RouteDecision)
    decision = router_llm.invoke([
        ("system", "根据任务描述，决定派给最合适的 Agent。"),
        ("user", f"任务：{state['task']}")
    ])
    return decision.next_agent`}</C>
          <NB>
            我自己的实践经验（虽然还不多）：路由 LLM 不需要用最强的模型，用 GPT-3.5 / GLM-4-Flash 这类又快又便宜的模型做路由完全够用，路由错了大不了多轮几次，成本可控。
          </NB>
        </S>

        {/* ===== 7 ===== */}
        <S id="state-sharing" title="7. 状态共享与冲突处理">
          <P>
            Multi-Agent 最容易出现 bug 的地方：<strong className="text-white">多个 Agent 同时写 State，出问题了怎么查？</strong>
          </P>
          <P>
            LangGraph 的设计里，<strong className="text-white">State 是中心化的、串行的</strong>——图按拓扑序执行，同一时刻只有一个节点在运行，所以不会出现真正的「并发写冲突」。但「逻辑上的冲突」还是会发生：
          </P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Agent A 写了 <IC>state["result"]</IC>，Agent B 后面又写了 <IC>state["result"]</IC>，A 的结果被覆盖了。</li>
            <li>Agent A 和 B 都往 <IC>state["messages"]</IC> 里 append，但顺序和预期不符。</li>
            <li>条件边的路由依赖于某个标志位，但多个 Agent 都可能修改它，路由行为变得不可预测。</li>
          </ul>
          <P>
            解决方法：
          </P>
          <ul className="list-decimal list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">用 Reducer 做增量合并，不用覆盖。</strong>比如 <IC>add_messages</IC> 就是典型，每个 Agent 的输出都 append，不会丢。</li>
            <li><strong className="text-white">为每个 Agent 分配独立的 State 字段。</strong>Agent A 写 <IC>state["coder_result"]</IC>，Agent B 写 <IC>state["reviewer_result"]</IC>，彻底避免覆盖。</li>
            <li><strong className="text-white">用 Subgraph 做状态隔离。</strong>每个 Subgraph 有自己的 State 定义，通过「入口节点」和「出口节点」做数据交换，内部状态不对外暴露。</li>
          </ul>
          <P>方式二的示例（独立字段）：</P>
          <C>{`class TeamState(TypedDict):
    messages: Annotated[list, add_messages]
    coder_result: str       # Coder 专用字段
    reviewer_result: str    # Reviewer 专用字段
    synthesizer_result: str # Synthesizer 专用字段
    # 不用一个通用的 "result" 字段，避免互相覆盖`}</C>
        </S>

        {/* ===== 8 ===== */}
        <S id="summary" title="8. 小结">
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Multi-Agent 解决单体 Agent 的 prompt 过长、工具过多、无法并行等问题。</li>
            <li>Supervisor 模式：中央调度 + 多个 Worker，适合任务可以 centralized 管理的场景。</li>
            <li>Hierarchical 模式：多层金字塔，每层只关心下一层，适合大型复杂任务。</li>
            <li>平级协作模式：共享 State 或消息传递，适合需要频繁交互的场景。</li>
            <li>Agent 间通信推荐 Subgraph 嵌入方式（编译后当节点），耦合度低、可独立测试。</li>
            <li>任务路由：推荐规则 + LLM 混合路由，兼顾效率和覆盖率。</li>
            <li>状态共享：用 Reducer 增量合并、为每 Agent 分配独立字段、或用 Subgraph 隔离状态。</li>
          </ul>
        </S>

        {/* Footer links */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-4 text-sm">
          <Link href="/notes/agent/human-in-the-loop" className="text-blue-400 hover:underline">
            ← Human-in-the-Loop
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/notes/agent" className="text-blue-400 hover:underline">
            返回 Agent 笔记索引
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/notes/agent/rag" className="text-blue-400 hover:underline">
            下一篇：RAG 集成 & 实战项目 →
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
