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
export default function ReactLoopNotes() {
  const [expanded, setExpanded] = useState(true)

  return (
    <SubPageLayout title="ReAct 自治循环 · LangGraph 学习笔记">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">ReAct 自治循环</h1>
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
          <S id="why-react" title="1. 为什么需要 ReAct Agent">
            <P>
              之前的 Router Agent 和 Tool Calling Agent，流程都是「我（开发者）定好路线，Agent 按路线走」。但真实场景里，有些任务的步骤数、决策路径是事先没法写死的。
            </P>
            <P>
              比如「帮我查北京天气，如果下雨就推荐室内活动」。这需要：查天气 → 判断结果 → 决定下一步。这个「判断→执行→再判断」的循环，就是 ReAct。
            </P>
            <P>
              我目前的理解：ReAct Agent 的核心就是<strong>让 LLM 自己决定「下一步做什么」</strong>，而不是把所有分支都写死在代码里。
            </P>
          </S>

          {/* 2 */}
          <S id="react-cycle" title="2. ReAct 循环：Thought → Action → Observation">
            <P>ReAct 的全称是 Reasoning + Acting，循环步骤：</P>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li><strong>Thought</strong>：LLM 思考当前状态和目标，决定下一步</li>
              <li><strong>Action</strong>：LLM 输出工具调用（tool_call）</li>
              <li><strong>Observation</strong>：工具执行结果回到 State</li>
              <li>回到 1，直到 LLM 判断可以输出最终答案</li>
            </ol>
            <C>{`# ReAct 循环伪代码
while not done:
    response = llm.invoke(state["messages"])
    if response.has_tool_calls:
        for tool_call in response.tool_calls:
            result = execute_tool(tool_call)
            state["messages"].append(result)
    else:
        break  # LLM 输出了最终答案
`}</C>
            <P>
              我一开始不理解「为什么 LLM 知道什么时候停」。后来明白：靠的是<strong>训练时的指令遵循能力</strong>——当不需要再调用工具时，LLM 直接生成普通文本回复，而不是 tool_calls。
            </P>
          </S>

          {/* 3 */}
          <S id="create-react" title="3. create_react_agent：一行搭建 ReAct Agent">
            <P>
              LangGraph 提供了 <IC>create_react_agent</IC> 这个预置函数，一行代码就能搭建一个完整的 ReAct Agent。
            </P>
            <C>{`from langgraph.prebuilt import create_react_agent

agent = create_react_agent(
    model=ChatOpenAI(model="gpt-4o"),
    tools=[get_weather, search_web, calculate],
    state_modifier="你是一个有帮助的助手，使用工具来回答用户问题。"
)

# 使用：直接 invoke
result = agent.invoke({"messages": [HumanMessage(content="北京天气怎么样？")]})
`}</C>
            <P>
              这行代码背后做了什么：创建了一个 StateGraph，包含 agent 节点（调用 LLM）、tools 节点（执行工具）、条件边（判断是否有 tool_calls，决定下一步），以及循环逻辑。
            </P>
            <NB>
              我目前只用过 <IC>create_react_agent</IC> 的默认行为。官方文档里提到可以自定义 <IC>state_modifier</IC>（相当于系统提示）、自定义中断条件等，这些我还没实践过。
            </NB>
          </S>

          {/* 4 */}
          <S id="streaming" title="4. 流式输出：看到 Agent 的思考过程">
            <P>
              ReAct Agent 的循环可能有很多步，如果不流式输出，用户只能看到「thinking...」然后突然收到一大段答案。体验很差。
            </P>
            <P>LangGraph 提供了几种流式模式：</P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><IC>stream_mode="values"</IC>：每次 State 更新后，输出完整 State</li>
              <li><IC>stream_mode="updates"</IC>：只输出这次更新了 State 的哪部分（更精简）</li>
              <li><IC>stream_mode="messages"</IC>：逐个 token 输出 LLM 的回复（最像聊天体验）</li>
            </ul>
            <C>{`from langgraph.prebuilt import create_react_agent

agent = create_react_agent(...)

# 流式调用
for chunk in agent.stream(
    {"messages": [HumanMessage(content="北京天气，如果下雨推荐室内活动")]},
    stream_mode="messages"
):
    # chunk 是 (message, metadata) 元组
    print(chunk[0].content, end="", flush=True)
`}</C>
            <P>
              我目前的体会：<IC>stream_mode="messages"</IC> 最适合和用户交互的场景。<IC>"values"</IC> 更适合调试，因为你能看到每一步完整的 State。
            </P>
          </S>

          {/* 5 */}
          <S id="termination" title="5. 终止条件：Agent 什么时候停">
            <P>
              ReAct Agent 的终止条件其实很朴素：<strong>LLM 不再输出 tool_calls，而是输出普通文本</strong>。此时 <IC>create_react_agent</IC> 内部的循环就结束了。
            </P>
            <P>但有些边界情况需要小心：</P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>LLM 陷入死循环（一直输出 tool_calls，但每次结果都一样）→ 需要设最大步数限制</li>
              <li>工具执行失败，LLM 不知道怎么处理 → 需要在 State 里加入错误信息，让 LLM 有机会调整</li>
              <li>LLM 「觉得」任务完成了，但实际没完成 → 需要在系统提示里强调完成标准</li>
            </ul>
            <NB>
              我目前没有在实际项目里遇到死循环问题。课程里提到了 <IC>max_iterations</IC> 参数，但我还没用过。后续实践后再补充。
            </NB>
          </S>

          {/* 6 */}
          <S id="vs-tool-calling" title="6. ReAct Agent vs Tool Calling Agent：什么时候用哪个">
            <P>我目前的判断标准：</P>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>流程固定、步骤明确</strong> → Tool Calling Agent（用条件边控制流程）</li>
              <li><strong>步骤数不固定、需要 LLM 自主决策</strong> → ReAct Agent（让 LLM 自己判断下一步）</li>
            </ul>
            <P>
              举个例子：「用户问天气 → 调用天气工具 → 回复」这个流程是固定的，用 Tool Calling Agent 就够了。「帮我研究一下 XX 领域的最新进展」这种开放任务，步骤数没法事先确定，适合用 ReAct。
            </P>
            <P>
              当然，这个边界挺模糊的。我目前也没有太多实战经验来判断什么时候该用哪个。后续碰到具体场景后再更新这里。
            </P>
          </S>

          {/* 7 */}
          <S id="summary" title="7. 阶段性总结">
            <P>目前我对 ReAct 自治循环的理解：</P>
            <ul className="space-y-2 ml-2">
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong>ReAct = Reasoning + Acting。</strong>LLM 自己决定下一步，而不是开发者写死所有分支。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong>循环终止条件很简单。</strong>LLM 不输出 tool_calls 了，就停了。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><IC>create_react_agent</IC> <strong>一行搭建</strong>，但背后是一整套 StateGraph + 条件边 + 循环逻辑。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong>流式输出很重要。</strong>ReAct 可能有很多步，不流式的话用户体验很差。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><strong>和 Tool Calling Agent 的选择</strong>取决于流程是否固定。目前我还没有太多实战来判断边界。</span></li>
            </ul>
          </S>

          {/* footer links */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-4 text-sm">
            <Link href="/notes/agent/router-tool-calling" className="text-blue-400 hover:underline">
              ← Router & Tool Calling Agent
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/notes/agent" className="text-blue-400 hover:underline">
              返回 Agent 笔记索引
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/notes/agent/memory-system" className="text-blue-400 hover:underline">
              下一篇：记忆系统 →
            </Link>
          </div>

        </div>
      )}
    </SubPageLayout>
  )
}
