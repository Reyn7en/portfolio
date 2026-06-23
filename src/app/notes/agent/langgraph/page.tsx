import Link from 'next/link'
import SubPageLayout from "@/components/SubPageLayout"

/* ── helper components ──────────────────────── */

function S({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-20">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="text-slate-300 leading-relaxed space-y-3 text-[0.9375rem]">{children}</div>
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-300 leading-relaxed">{children}</p>
}

function Pre({ code }: { code: string }) {
  return (
    <pre className="bg-slate-800/80 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed my-4">
      <code>{code}</code>
    </pre>
  )
}

function C({ children }: { children: React.ReactNode }) {
  return <code className="px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 text-[0.85em] font-mono">{children}</code>
}

function NB({ children }: { children: React.ReactNode }) {
  return <div className="bg-blue-900/20 border border-blue-800/40 rounded-lg px-4 py-3 my-4 text-sm text-blue-300">{children}</div>
}

/* ── code snippets ──────────────────────────── */

const codeNodeExample = `# LLM Node
def call_model(state: AgentState) -> dict:
    response = llm.bind_tools(tools).invoke(state["messages"])
    return {"messages": [response]}

# Tool Node
def call_tools(state: AgentState) -> dict:
    last_message = state["messages"][-1]
    tool_results = []
    for tool_call in last_message.tool_calls:
        result = execute_tool(tool_call)
        tool_results.append(result)
    return {"messages": tool_results}`

const codeRouter = `def should_continue(state: AgentState) -> str:
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        return "tools"
    return "__end__"

graph.add_conditional_edges("agent", should_continue, {
    "tools": "tools",
    "__end__": "__end__"
})`

const codeFull = `from typing import TypedDict, Annotated, Sequence
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.memory import MemorySaver

class AgentState(TypedDict):
    messages: Annotated[Sequence, add_messages]

def agent_node(state: AgentState):
    response = model_with_tools.invoke(state["messages"])
    return {"messages": [response]}

def tool_node(state: AgentState):
    last_msg = state["messages"][-1]
    results = [execute(tc) for tc in last_msg.tool_calls]
    return {"messages": results}

def router(state: AgentState):
    last_msg = state["messages"][-1]
    if getattr(last_msg, "tool_calls", None):
        return "tools"
    return END

builder = StateGraph(AgentState)
builder.add_node("agent", agent_node)
builder.add_node("tools", tool_node)
builder.set_entry_point("agent")
builder.add_conditional_edges("agent", router)
builder.add_edge("tools", "agent")
graph = builder.compile(checkpointer=MemorySaver())

config = {"configurable": {"thread_id": "1"}}
events = graph.stream(
    {"messages": [HumanMessage(content="weather?")]},
    config
)
for event in events:
    print(event)`

const toolSteps = [
  "LLM 接收用户输入，判断是否需要调用工具",
  "如果需要，LLM 不输出文本，而是输出 tool_calls（包含工具名和参数）",
  "条件边检测到 tool_calls，路由到工具执行节点",
  "工具节点实际执行工具，将结果以 ToolMessage 形式追加",
  "流程回到 LLM 节点，LLM 结合工具结果生成最终回答",
]


/* ── page ───────────────────────────────────── */

export default function LangGraphPage() {
  return (
    <SubPageLayout title="LangGraph 学习记录" backHref="/notes/agent" backLabel="← 返回 Agent 笔记">

      {/* Article header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          LangGraph 学习记录：从 State、Node 到 Tool Calling
        </h1>
        <p className="text-slate-400 leading-relaxed max-w-2xl">
          一份阶段性的学习记录，基于 deeplearning.ai 公开课内容整理。
          覆盖 State 管理、节点与边、工具调用、Checkpointer 与 Streaming 等核心概念。
        </p>
        <div className="flex items-center gap-3 mt-6 flex-wrap">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-900/30 text-green-400 border border-green-800">LangGraph 专题</span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-900/40 text-blue-300 border border-blue-800">学习笔记</span>
          <span className="text-slate-500 text-xs">2026 年 6 月</span>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-8">

        {/* 1 */}
        <S id="why" title="1. 为什么学 LangGraph">
          <P>在接触 LangGraph 之前，我对 Agent 的理解就是简单的 LLM 调用：扔一个 prompt，拿回结果，完事。这在单轮问答场景下没问题，但一旦涉及多轮对话、工具调用、条件分支，这种简单模式就撑不住了。</P>
          <P>我在 deeplearning.ai 课程中第一次看到 LangGraph 时，最大的感受是：<strong className="text-white">它把 Agent 的工作流变得显式可读了。</strong>Agent 不只是"调 LLM + 解析输出"，而是一个多步骤的工作流——每一步有明确的输入输出，步骤之间有条件跳转，中间状态需要被保存和追踪。</P>
          <P>对我来说，LangGraph 解决了一个核心问题：<strong className="text-white">如何让 Agent 的行为可控、可追踪、可中断。</strong>这在涉及工具调用和多步推理的场景中尤为关键。</P>
        </S>

        {/* 2 */}
        <S id="overview" title="2. 我对 LangGraph 的整体理解">
          <P>我目前的理解是：LangGraph 是一个把 Agent 应用<strong className="text-white">组织成"带状态的图"的框架</strong>。三个概念就能概括：</P>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong className="text-white">State（状态）：</strong>在所有节点间共享的数据字典，承载消息历史、工具结果和中间推理步骤。</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong className="text-white">Node（节点）：</strong>一个处理单元。比如"调用 LLM"是一个节点，"执行工具"是另一个节点。</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong className="text-white">Edge（边）：</strong>节点之间的跳转规则。普通边是固定跳转，条件边则根据当前 State 决定下一步去哪。</span></li>
          </ul>
          <P>打个比方：如果 Agent 是一个"自动化办事流程"，State 就是那张流转中的表格，Node 是各个办事窗口，Edge 就是连接窗口的箭头。这个结构让复杂流程变得可管理。</P>
        </S>

        {/* 3 */}
        <S id="state" title="3. State：Agent 的共享工作台">
          <P>State 不是普通的 Python 变量。它最关键的特性是：<strong className="text-white">每个节点返回的部分状态会和全局 State 合并（merge），而不是覆盖。</strong>不同节点更新不同字段，互不干扰。</P>
          <P>在多轮对话中，State 通常包含：</P>
          <ul className="space-y-1.5 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><C>messages</C>：完整的对话历史（用户消息、AI 回复、工具调用、工具结果）</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><C>next_step</C>：供条件边判断路由方向</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>自定义字段，比如 <C>context</C>、<C>intermediate_steps</C></span></li>
          </ul>
          <P>LangGraph 中使用 <C>TypedDict</C> 或 Pydantic 模型定义 State。我目前用 <C>TypedDict</C> + <C>Annotated</C>，因为它可以为每个字段指定 reducer 逻辑（比如消息字段用 <C>add_messages</C> 来累积而不是覆盖）。</P>
          <NB>提醒：<C>add_messages</C> 的具体行为（如同 ID 消息的更新逻辑）发布前需要对照最新 LangGraph 文档核实。</NB>
        </S>

        {/* 4 */}
        <S id="node-edge" title="4. Node 和 Edge：把流程拆成可控的步骤">
          <P>在用 LangGraph 之前，我写 Agent 逻辑的方式是一个大函数吃到底：调 LLM → 解析 → 需要就调工具 → 再解析 → 返回。简单场景能跑，但问题很明显：</P>
          <ul className="space-y-1.5 ml-4">
            <li className="flex items-start gap-2"><span className="text-red-400 mt-1.5 shrink-0">&#215;</span><span>所有逻辑搅在一起，加一个步骤就要改主函数</span></li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-1.5 shrink-0">&#215;</span><span>出问题时很难判断是"LLM 判断错了"还是"工具执行错了"</span></li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-1.5 shrink-0">&#215;</span><span>没有复用性，"调工具"这段逻辑每次都要重写</span></li>
          </ul>
          <P>LangGraph 的 Node + Edge 模式解决了这个问题。每个节点是一个单一职责的函数：</P>
          <Pre code={codeNodeExample} />
          <P>条件边负责路由决策：</P>
          <Pre code={codeRouter} />
          <NB>提醒：<C>bind_tools()</C> 和 <C>add_conditional_edges()</C> 的签名可能随 LangGraph 版本变化，发布前请对照最新文档。</NB>
        </S>

        {/* 5 */}
        <S id="tool-calling" title="5. Tool Calling：让模型从「生成文本」变成「调用能力」">
          <P>这是学 LangGraph 最让我开眼界的部分。LLM 只能输出文本，但 Tool Calling 把它从"回答者"变成了"编排者"——它不执行，而是判断需要什么、然后请求执行。</P>
          <P>完整的工具调用流程：</P>
          <div className="space-y-2 ml-4">
            {toolSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-900/50 text-blue-300 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <P>关键认知：<strong className="text-white">模型不执行工具——它请求执行。</strong>实际的工具执行发生在程序代码中。这把"决策"和"执行"分开了，意味着工具可以是一切：数据库查询、API 调用、脚本执行，甚至启动另一个 Agent。</P>
        </S>

        {/* 6 */}
        <S id="checkpointer" title="6. Checkpointer：为什么 Agent 需要记住状态">
          <P>一开始我很困惑：对话之间的状态怎么持久化？没有持久化，每次新的用户输入都从零开始，之前的工具结果和推理全都丢了。</P>
          <P>Checkpointer 解决了这个问题，它像游戏的存档系统：</P>
          <ul className="space-y-1.5 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>每个 <C>thread_id</C> 对应一个独立的对话线程</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>每经过一个图步骤，State 自动存档（checkpoint）</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>下次用同一个 <C>thread_id</C> 调用，从上次存档点恢复</span></li>
          </ul>
          <P>目前我开发调试只用内存 <C>MemorySaver</C>。如果要上线，需要换成持久化后端（<C>SqliteSaver</C> 或 <C>PostgresSaver</C>）。</P>
          <NB>提醒：<C>SqliteSaver</C> 和 <C>PostgresSaver</C> 的导入路径可能随 LangGraph 版本变化，发布前请确认。</NB>
        </S>

        {/* 7 */}
        <S id="streaming" title="7. Streaming：为什么流式输出很重要">
          <P><C>graph.stream()</C> 是我觉得最实用的功能之一。除了渐进式输出带来的用户体验提升，它对我更大的价值是<strong className="text-white">调试可见性</strong>。</P>
          <P>通过流式输出，你能看到：</P>
          <ul className="space-y-1.5 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>Agent 每一步执行了哪个 Node</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>LLM 输出了什么（包括 tool_calls）</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>工具调用的参数和返回值</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>条件边的路由决策</span></li>
          </ul>
          <P>没有流式输出时，我靠 print 语句追踪流程。有了流式，每一步都清清楚楚，调试效率大幅提升。把这个过程暴露给前端，也能让用户看到 Agent 的"思考过程"，增加信任感。</P>
        </S>

        {/* 8 */}
        <S id="example" title="8. 一个最小工作流例子">
          <P>一个最小的 LangGraph 工作流，展示了 ReAct 循环的核心逻辑：</P>
          <Pre code={codeFull} />
          <P>如果 LLM 判断需要天气工具，流程是：agent → tools → agent → END。如果不需要：agent → END。整个过程逐步流式输出，Agent 的决策链一目了然。</P>
          <NB>这段代码是学习过程中凭记忆重建的，<C>HumanMessage</C>、<C>add_messages</C>、<C>StateGraph.compile()</C> 等 API 名称和参数发布前请对照最新版 LangGraph 核实。</NB>
        </S>

        {/* 9 */}
        <S id="understanding" title="9. 我的阶段性理解">
          <P>目前我对 LangGraph 的核心认知：</P>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong className="text-white">它不是聊天封装，是工作流引擎。</strong>LangGraph 把 Agent 的每一步（调用模型、执行工具、条件跳转）显式组织成图，流程可控可追踪。</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong className="text-white">State 是核心。</strong>理解了 State 的 merge 机制和 reducer 设计，基本就理解了 LangGraph 的一半。</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong className="text-white">图和条件边让流程显式化。</strong>Agent 不再是黑盒——每一步、每个分支都可追踪。</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong className="text-white">Tool Calling 不神秘。</strong>它就是一个结构化的"请求-执行-反馈"循环，LLM 只做判断。</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong className="text-white">我目前处于"能用"阶段，离"用好"还有距离。</strong>复杂路由场景、异常处理、多工具时的性能——这些都还在学习中。</span></li>
          </ul>
        </S>

      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-4 text-sm">
        <span className="text-slate-500">← LangGraph 基础概念（本篇）</span>
        <span className="text-slate-600">|</span>
        <Link href="/notes/agent" className="text-blue-400 hover:underline">
          返回 Agent 笔记索引
        </Link>
        <span className="text-slate-600">|</span>
        <Link href="/notes/agent/state" className="text-blue-400 hover:underline">
          下一篇：State 深入 →
        </Link>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800">
        <p className="text-slate-600 text-xs leading-relaxed">
          个人学习记录，2026 年 6 月。API 名称和代码片段依据课程记忆重建，已尽力核对，但发布前建议对照{" "}
          <a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noopener" className="text-blue-400 hover:underline">LangGraph 官方文档</a>
          {" "}确认最新用法。如有不准确之处，也是学习过程的一部分 :)
        </p>
      </div>
    </SubPageLayout>
  )
}
