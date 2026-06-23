'use client'

import Link from 'next/link'
import { useState } from 'react'
import SubPageLayout from '@/components/SubPageLayout'

/* ── helpers ── */
function S({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
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

/* ── page ── */
export default function RouterToolCallingNotes() {
  const [expanded, setExpanded] = useState(true)

  return (
    <SubPageLayout title="Router & Tool Calling Agent · LangGraph 学习笔记">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Router & Tool Calling Agent</h1>
          <p className="text-slate-500 text-sm mt-1">
            LangGraph 学习笔记 · 阶段性理解
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors border border-slate-700 rounded-md px-3 py-1.5"
        >
          {expanded ? '收起' : '展开'}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-slate-800 pt-8">
          <NB>以下内容是我基于课程和文档的阶段性理解，不是权威教程。API 名称和参数请发布前对照 LangGraph 官方文档核实。</NB>

          {/* 1 */}
          <S id="why-router" title="1. 为什么需要 Router Agent">
            <P>
              最开始的 Agent 只有一条路：用户输入 → LLM → 输出。但实际场景下，不同问题需要不同的处理方式。比如「天气查询」和「写代码」，显然应该走不同的工具链。
            </P>
            <P>
              Router Agent 的核心思路是：<strong>让 LLM 先判断「该走哪条路」，再执行对应的流程</strong>。这比把所有工具都塞给 LLM 让它自己选要清晰得多。
            </P>
            <P>
              我目前的理解：Router 本质上是一个「分类器」——输入问题，输出一个路由标签，图根据这个标签走到不同的下游节点。
            </P>
          </S>

          {/* 2 */}
          <S id="conditional-edge" title="2. 条件边：LangGraph 的路由机制">
            <P>
              在 LangGraph 里，路由不是靠 <IC>if/else</IC> 写在代码里，而是靠<strong>条件边（conditional edge）</strong>声明。
            </P>
            <C>{`from langgraph.graph import StateGraph, END

def router_function(state: AgentState) -> str:
    # 根据 state 内容决定下一个节点
    if state["messages"][-1].content == "天气":
        return "weather_tool"
    else:
        return "chat_model"

# 添加条件边
graph.add_conditional_edges(
    "router",          # 来源节点
    router_function,  # 路由函数（返回下一个节点名）
    {
        "weather_tool": "weather_tool",
        "chat_model": "chat_model",
        END: END,
    }
)`}</C>
            <P>
              关键点：<IC>router_function</IC> 接收当前 State，返回一个<strong>字符串</strong>（下一个节点的名称）。LangGraph 根据这个返回值决定图的下一步走向。
            </P>
            <NB>
              我目前只写过简单的 router_function（基于关键词匹配）。课程里提到可以让 LLM 来生成这个路由判断，这个我还没实践过，后续学到 ReAct 部分应该会深入。
            </NB>
          </S>

          {/* 3 */}
          <S id="structured-output" title="3. 结构化输出：让路由判断更可靠">
            <P>
              如果让 LLM 自由文本输出「该走哪条路」，解析起来很不稳定。更好的方式是：<strong>强制 LLM 输出结构化结果</strong>（比如 JSON，或者 Pydantic 模型）。
            </P>
            <P>LangChain 提供了几种方式：</P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><IC>with_structured_output()</IC> — 推荐，直接绑定 Pydantic 模型</li>
              <li>提示工程 + 解析器 — 手动解析 LLM 输出，不够稳定</li>
              <li>JSON Schema — 比 Pydantic 更底层，不太直观</li>
            </ul>
            <C>{`from pydantic import BaseModel, Field

class RouterOutput(BaseModel):
    next_step: str = Field(..., description="下一步：weather / chat / END")

# 绑定到模型
model_with_structure = llm.with_structured_output(RouterOutput)

# 在 router_function 里调用
def router_function(state):
    response = model_with_structure.invoke(state["messages"])
    return response.next_step  # 直接返回字符串，用作节点名
`}</C>
            <P>
              这样做的好处：LLM 的输出被约束为固定格式，解析简单且稳定。我目前只试过 <IC>with_structured_output()</IC> 的简单用法，更复杂的嵌套结构还没实践过。
            </P>
          </S>

          {/* 4 */}
          <S id="tool-calling-basics" title="4. Tool Calling Agent：从「生成文本」到「调用能力」">
            <P>
              Tool Calling 的本质是：<strong>LLM 不直接生成最终回答，而是生成「工具调用请求」</strong>，由程序执行工具后把结果放回 State，再让 LLM 继续。
            </P>
            <P>标准的 Tool Calling 流程：</P>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>用户输入 → LLM 判断是否需要工具</li>
              <li>如果需要 → LLM 输出 <IC>tool_calls</IC>（工具名 + 参数）</li>
              <li>程序执行工具，拿到结果</li>
              <li>工具结果追加到 <IC>messages</IC> 列表</li>
              <li>LLM 再次被调用，基于完整上下文生成最终回答</li>
            </ol>
            <P>
              我目前的理解：Tool Calling 不是一个「魔法」，它就是「LLM 生成结构化输出 → 程序执行 → 结果回到 LLM」的循环。理解了这个循环，后面的 <IC>ToolNode</IC>、<IC>bind_tools()</IC> 都好理解。
            </P>
          </S>

          {/* 5 */}
          <S id="toolnode" title="5. ToolNode：工具执行的专用节点">
            <P>
              手动写「解析 LLM 的 tool_calls → 执行工具 → 把结果写回 State」这个流程很繁琐。LangGraph 提供了 <IC>ToolNode</IC> 来封装这个逻辑。
            </P>
            <C>{`from langgraph.prebuilt import ToolNode

# 定义工具列表
tools = [get_weather, search_web, calculate]

# 创建 ToolNode（自动执行 tools 列表里的工具）
tool_node = ToolNode(tools)

# 在图里添加
graph.add_node("tools", tool_node)
graph.add_conditional_edges("agent", should_continue)
graph.add_edge("tools", "agent")  # 工具执行完，回到 agent
`}</C>
            <P>
              <IC>ToolNode</IC> 做了什么：读取 State 里最后一个消息的 <IC>tool_calls</IC>，逐个执行对应的工具，把每个工具的结果作为 <IC>ToolMessage</IC> 追加到 <IC>messages</IC>。
            </P>
            <NB>
              我目前只用过 <IC>ToolNode</IC> 的默认行为。官方文档里提到可以自定义工具执行逻辑（比如加重试、加权限检查），这些我还没用到。
            </NB>
          </S>

          {/* 6 */}
          <S id="bind-tools" title="6. bind_tools()：把工具告诉 LLM">
            <P>
              LLM 本身不知道有哪些工具可用。<IC>bind_tools()</IC> 的作用就是：<strong>把工具的定义（名称、描述、参数 Schema）注入到 LLM 的调用上下文里</strong>，这样 LLM 才知道「我可以调用这些工具」。
            </P>
            <C>{`from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def get_weather(location: str) -> str:
    """获取指定地点的天气。"""
    return f"{location} 的天气是：晴天，25°C"

llm = ChatOpenAI(model="gpt-4o")
llm_with_tools = llm.bind_tools([get_weather])

# 现在 LLM 知道 get_weather 这个工具
response = llm_with_tools.invoke(messages)
# response.tool_calls 里会有工具调用请求
`}</C>
            <P>
              关键点：<IC>bind_tools()</IC> 返回的是一个新的 LLM 对象（原对象不变）。这个设计我一开始有点不习惯，后来理解：这样可以在不同的节点里绑定不同的工具列表。
            </P>
          </S>

          {/* 7 */}
          <S id="complete-example" title="7. 一个完整的 Tool Calling Agent 骨架">
            <P>把上面几节串起来，一个最简骨架：</P>
            <C>{`from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_openai import ChatOpenAI
from langchain_core.messages import add_messages

class AgentState(TypedDict):
    messages: Annotated[list, add_messages]

tools = [...]  # 工具列表
llm = ChatOpenAI().bind_tools(tools)

def agent_node(state: AgentState):
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

def should_continue(state: AgentState) -> str:
    last_msg = state["messages"][-1]
    if hasattr(last_msg, "tool_calls") and last_msg.tool_calls:
        return "tools"
    return END

graph = StateGraph(AgentState)
graph.add_node("agent", agent_node)
graph.add_node("tools", ToolNode(tools))
graph.add_conditional_edges("agent", should_continue)
graph.add_edge("tools", "agent")
graph.set_entry_point("agent")
`}</C>
            <NB>这段代码是学习过程中凭记忆重建的，<IC>ToolNode</IC>、<IC>bind_tools()</IC>、<IC>should_continue</IC> 等 API 名称和参数发布前请对照最新版 LangGraph 核实。</NB>
          </S>

          {/* 8 */}
          <S id="summary" title="8. 阶段性总结">
            <P>目前我对 Router & Tool Calling Agent 的理解：</P>
            <ul className="space-y-2 ml-2">
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong>Router 是分类器。</strong>条件边 + 路由函数，决定图的下一步走向。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong>结构化输出让路由更稳定。</strong><IC>with_structured_output()</IC> + Pydantic，避免自由文本解析的不稳定性。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong>Tool Calling 是循环。</strong>LLM 生成 tool_calls → 程序执行 → 结果回 State → LLM 继续。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong>ToolNode 封装了工具执行逻辑。</strong>不需要手动解析 tool_calls、手动调用工具。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong>bind_tools() 告诉 LLM 有哪些工具。</strong>返回新 LLM 对象，原对象不受影响。</span></li>
            </ul>
          </S>

          {/* 9 */}

          {/* footer links */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-4 text-sm">
            <Link href="/notes/agent/state" className="text-blue-400 hover:underline">
              ← State 深入
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/notes/agent" className="text-blue-400 hover:underline">
              返回 Agent 笔记索引
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/notes/agent/react-loop" className="text-blue-400 hover:underline">
              下一篇：ReAct 自治循环 →
            </Link>
          </div>

        </div>
      )}
    </SubPageLayout>
  )
}
