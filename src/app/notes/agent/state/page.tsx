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
export default function StateNotes() {
  const [expanded, setExpanded] = useState(true)

  return (
    <SubPageLayout title="State 深入 · LangGraph 学习笔记">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">State 深入</h1>
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
          <S id="why-state" title="1. 为什么 State 值得单独学">
            <P>
              在第一篇笔记里，我把 State 概括为「Agent 的共享工作台」。这个说法够用，但真正写代码的时候会发现：State 怎么定义、怎么更新、多个节点怎么安全地读写，这些细节直接决定图能不能跑通。
            </P>
            <P>
              我一开始的理解是：「State 就是一个字典，节点往里面塞东西就行」。后来踩了几次坑才发现，LangGraph 的 State 设计有一套明确的规则，不理解这些规则，图的行为会和你预期的不一样。
            </P>
          </S>

          {/* 2 */}
          <S id="typeddict" title="2. TypedDict + Annotated：State 的标准写法">
            <P>
              课程里推荐的 State 定义方式是 <IC>TypedDict</IC> + <IC>Annotated</IC>。我之前不太理解为什么要搞这么复杂，直接用 <IC>dict</IC> 不行吗？
            </P>
            <P>后来意识到，LangGraph 需要回答两个问题：</P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>State 里有哪些字段？（类型检查、IDE 补全）</li>
              <li>每个字段怎么合并？（多个节点写入同一字段时的冲突处理）</li>
            </ul>
            <C>{`from typing import TypedDict, Annotated
from langgraph.graph import StateGraph
from langchain_core.messages import add_messages

class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    step: int
`}</C>
            <P>
              <IC>Annotated</IC> 的第二个参数 <IC>add_messages</IC> 就是「合并函数」（reducer）。当多个节点都往 <IC>messages</IC> 写值时，LangGraph 不是直接覆盖，而是用 <IC>add_messages</IC> 把新消息追加到列表里。
            </P>
            <NB>
              我目前只用过 <IC>add_messages</IC> 这一种 reducer。官方文档里还有其他用法（比如 <IC>operator.add</IC> 用于数值累加），这些我还没实际用过，后续学到了再补充。
            </NB>
          </S>

          {/* 3 */}
          <S id="add-messages" title="3. add_messages 到底在做什么">
            <P>
              这是我最开始困惑的地方。<IC>add_messages</IC> 听起来像「把消息追加到列表末尾」，但实际上它的行为更智能：
            </P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>如果新消息的 <IC>id</IC> 和已有消息相同 → 覆盖（更新）</li>
              <li>如果 <IC>id</IC> 不同 → 追加</li>
            </ul>
            <P>
              这意味着：如果 LLM 生成了一条带 <IC>tool_calls</IC> 的助手消息，随后工具执行结果回来，<IC>add_messages</IC> 会把工具结果追加，而不是覆盖之前的助手消息。这正是多轮对话需要的行为。
            </P>
            <P>
              我目前的理解是：<IC>add_messages</IC> 的设计目标是「让消息列表始终是一棵有序的对话树，而不是一堆乱序的碎片」。这个理解对不对，我还在验证。
            </P>
          </S>

          {/* 4 */}
          <S id="reducer" title="4. Reducer 函数：多个节点写入同一字段怎么办">
            <P>
              如果 State 里有一个 <IC>step</IC> 字段，节点 A 写 <IC>step=1</IC>，节点 B 写 <IC>step=2</IC>，LangGraph 用哪个值？
            </P>
            <P>答案是：取决于这个字段有没有声明 reducer。</P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>有 reducer</strong>（如 <IC>add_messages</IC>）→ 按 reducer 逻辑合并</li>
              <li><strong>没有 reducer</strong> → 后执行的节点覆盖先执行的节点（最后一次写入生效）</li>
            </ul>
            <P>
              我之前踩过一个坑：State 里定义了一个 <IC>results: list</IC>，但忘记加 <IC>Annotated[..., operator.add]</IC>。结果每次节点写入 <IC>results</IC>，之前的就被覆盖了。加上 reducer 之后才正常累加。
            </P>
            <NB>这个坑让我意识到：LangGraph 不会自动帮你「合并」任何东西，除非你显式声明 reducer。</NB>
          </S>

          {/* 5 */}
          <S id="messagegraph" title="5. MessageGraph vs StateGraph：该用哪个？">
            <P>
              课程里提到了 <IC>MessageGraph</IC>，这是一个专门针对「消息列表」场景的简化版 StateGraph。我目前的理解是：
            </P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><IC>MessageGraph</IC>：State 只有一个 <IC>messages</IC> 字段，适合纯对话场景，写法更简洁</li>
              <li><IC>StateGraph</IC>：State 可以有任意多个字段，适合需要管理多种状态（消息、步骤计数、检索结果、工具输出等）的场景</li>
            </ul>
            <P>
              我目前所有的练习都用的是 <IC>StateGraph</IC>，即使场景很简单。原因是：我担心用 <IC>MessageGraph</IC> 之后，如果后面想加一个新字段（比如 <IC>search_results</IC>），又要迁移到 <IC>StateGraph</IC>，不如一开始就直接用更通用的方案。
            </P>
            <P>
              但这个判断对不对，我不确定。如果场景确实只有一个 <IC>messages</IC> 列表，用 <IC>MessageGraph</IC> 可能更简洁。这个等我有实际对比经验之后再更新。
            </P>
          </S>

          {/* 6 */}
          <S id="state-in-practice" title="6. 实际写代码时的几个观察">
            <P>以下是我在写代码过程中逐渐发现的几点，不一定对，仅供参考：</P>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>节点函数的签名是固定的。</strong>
                每个节点函数接收当前 State，返回一个「部分 State」字典。这个设计一开始我觉得有点怪（为什么不是直接修改 State？），后来理解：返回部分 State + reducer 合并，避免了多个节点同时修改 State 带来的竞态问题。
              </li>
              <li>
                <strong>State 的「当前值」在节点执行期间是不变的。</strong>
                节点 A 读取到的 State，是图开始执行这个节点那一刻的快照。如果节点 B 和 A 并行执行，它们看到的 State 是同一个快照，互相不会影响。这个特性我还没有在实际项目里深度用到，但目前的理解是这样的。
              </li>
              <li>
                <strong>调试时打印 State 很有用。</strong>
                在每个节点函数开头加一句 <IC>print(state)</IC>，可以看到图执行到这一步时的完整状态。这比单纯看 LangSmith 的 trace 更直观（对我而言）。
              </li>
            </ul>
          </S>

          {/* 7 */}
          <S id="summary" title="7. 阶段性总结">
            <P>目前我对 State 的理解可以浓缩为几条：</P>
            <ul className="space-y-2 ml-2">
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>State 不是普通变量，它是图的「共享工作台」，所有节点通过它通信。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><IC>TypedDict</IC> + <IC>Annotated</IC> 是标准写法，后者声明 reducer，决定字段怎么合并。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><IC>add_messages</IC> 不是简单追加，而是按消息 <IC>id</IC> 智能合并（覆盖或追加）。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>没声明 reducer 的字段，最后一次写入生效（覆盖）。这个行为要特别小心。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span><IC>MessageGraph</IC> 是 <IC>StateGraph</IC> 的特化版本，适合纯对话场景，但我还没对比过两者的实际差异。</span></li>
            </ul>
          </S>

          {/* footer links */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-4 text-sm">
            <Link href="/notes/agent/langgraph" className="text-blue-400 hover:underline">
              ← LangGraph 基础概念
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/notes/agent" className="text-blue-400 hover:underline">
              返回 Agent 笔记索引
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/notes/agent/router-tool-calling" className="text-blue-400 hover:underline">
              下一篇：Router & Tool Calling Agent →
            </Link>
          </div>

        </div>
      )}
    </SubPageLayout>
  )
}
