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
export default function MemorySystemNotes() {
  const [expanded, setExpanded] = useState(true)

  return (
    <SubPageLayout title="记忆系统 · LangGraph 学习笔记">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">记忆系统</h1>
          <p className="text-slate-500 text-sm mt-1">
            LangGraph 学习笔记 · Checkpointer & Store
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
          <S id="why-memory" title="1. 为什么需要记忆系统">
            <P>
              在第一篇笔记里，我提到 LangGraph 的图每次执行都是「无状态」的：你调 <IC>graph.invoke(state)</IC>，它跑完就结束了，下次再调，它不记得上次发生了什么。
            </P>
            <P>
              这个问题在两类场景下会变得很突出：
            </P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>多轮对话</strong>：用户说「帮我查一下北京明天的天气」，然后接着说「那上海呢？」——Agent 需要知道上下文是「查天气」。</li>
              <li><strong>长时任务</strong>：一个任务需要分多次执行（比如今天做一半，明天继续），Agent 需要记住之前做到了哪一步。</li>
            </ul>
            <P>
              LangGraph 把「记忆」拆成了两层：<strong>Checkpointer（短期记忆）</strong>和<strong>Store（长期记忆）</strong>。我一开始没搞清楚这两者的区别，用错了好几次。
            </P>
          </S>

          {/* 2 */}
          <S id="checkpointer" title="2. Checkpointer：短期记忆（会话级别）">
            <P>
              Checkpointer 的作用是：<strong>让图在多次调用之间，记住上一次执行的完整 State</strong>。它本质上是把「图的执行快照」存到一个地方，下次调同一个线程时，自动恢复。
            </P>
            <P>几个关键点：</P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Checkpointer 是按「线程」（thread）组织的。同一个 thread_id，多次调用 <IC>graph.invoke()</IC> 或 <IC>graph.stream()</IC>，State 会延续。</li>
              <li>不同 thread_id 之间是隔离的，互不影响。</li>
              <li>Checkpointer 存的是「完整的 State 快照」，不是差分。</li>
            </ul>
            <P>
              我目前的用法是：给每个用户会话分配一个唯一的 <IC>thread_id</IC>，然后把这个 <IC>thread_id</IC> 传给 <IC>graph.invoke()</IC> 的 <IC>config</IC> 参数。这样即使用户关掉页面再打开，只要 <IC>thread_id</IC> 不变，对话历史就在。
            </P>
            <NB>
              我目前只用过 <IC>MemorySaver</IC>（内存存储，重启即丢）和 <IC>SqliteSaver</IC>（持久化到 SQLite）。生产环境应该用持久化的 Checkpointer，否则重启后所有会话都没了。
            </NB>
          </S>

          {/* 3 */}
          <S id="store" title="3. Store：长期记忆（跨会话）">
            <P>
              Checkpointer 解决的是「同一次对话（同一个 thread）里，图怎么记住之前的状态」。但有些信息是需要<strong>跨会话保留</strong>的，比如：
            </P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>用户偏好（「我喜欢简洁的回答」）</li>
              <li>用户画像（「这个用户是研究生，有编程基础」）</li>
              <li>长期积累的知识（「这个用户之前问过 RAG，我可以引用之前的讨论」）</li>
            </ul>
            <P>
              Store 就是干这个的。它的是一个<strong>键值存储</strong>（key-value store），可以按 <IC>namespace</IC>（命名空间）和 <IC>key</IC>（键）来存取数据。
            </P>
            <P>
              我目前对 Store 的理解还比较浅，还没有在真实项目里用过。我的理解是：Store 适合存「和用户相关但不属于当前对话 State」的信息，而 Checkpointer 适合存「当前对话的进展状态」。
            </P>
            <NB>
              这里有一个容易混淆的点：Store 里的数据，<strong>不会自动进入图的 State</strong>。你需要在节点里显式地去 Store 里读，然后决定怎么用。这个设计和 Checkpointer 不一样（Checkpointer 是自动恢复的）。
            </NB>
          </S>

          {/* 4 */}
          <S id="saver-types" title="4. MemorySaver vs SqliteSaver vs PostgresSaver">
            <P>LangGraph 提供了几种 Checkpointer 的实现，我目前接触过的是前两种：</P>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>MemorySaver</strong>：存在内存里，重启即丢。适合开发调试，不适合生产。
                <br /><span className="text-slate-500 text-sm">我目前本地调试都用这个，简单够用。</span>
              </li>
              <li>
                <strong>SqliteSaver</strong>：存到 SQLite 文件，重启不丢。适合单机部署、小规模应用。
                <br /><span className="text-slate-500 text-sm">我试过一次，配置比 MemorySaver 麻烦一点，但也不算难。</span>
              </li>
              <li>
                <strong>PostgresSaver</strong>：存到 PostgreSQL，支持分布式。适合生产环境、多实例部署。
                <br /><span className="text-slate-500 text-sm">我还没用过，但看文档应该是标准 PostgreSQL 连接配置。</span>
              </li>
            </ul>
            <P>
              选哪个，取决于你的部署规模和对持久化的需求。我目前的建议是：开发用 <IC>MemorySaver</IC>，上线前切换到 <IC>SqliteSaver</IC> 或 <IC>PostgresSaver</IC>。
            </P>
          </S>

          {/* 5 */}
          <S id="use-checkpointer" title="5. 如何在图中使用 Checkpointer">
            <P>以 <IC>MemorySaver</IC> 为例，基本用法是：</P>
            <C>{`from langgraph.checkpoint.memory import MemorySaver

checkpointer = MemorySaver()

graph = graph_builder.compile(checkpointer=checkpointer)

# 调用时传入 thread_id
config = {"configurable": {"thread_id": "user-123"}}

graph.invoke(initial_state, config)

# 下次再用同一个 thread_id 调用，State 会自动恢复
graph.invoke(new_input, config)`}</C>
            <P>我踩过的一个坑是：</P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><IC>thread_id</IC> 是在 <IC>config</IC> 的 <IC>configurable</IC> 字典里传的，不是直接传 <IC>thread_id=xxx</IC>。</li>
              <li>如果忘记传 <IC>config</IC>，Checkpointer 不会报错，但它也不会恢复 State——相当于每次都是全新的图。</li>
            </ul>
            <P>
              另一个观察：Checkpointer 是按「图」级别的。如果你有两个图，它们需要共享记忆，要么用同一个 Checkpointer 实例，要么用 Store（Store 是跨图的）。
            </P>
          </S>

          {/* 6 */}
          <S id="use-store" title="6. 如何在图中使用 Store">
            <P>
              这部分我还没有实际写过代码，以下内容是基于文档的理解，可能有误，欢迎指正。
            </P>
            <P>基本思路是：</P>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>在编译图的时候，传入一个 <IC>store</IC> 实例（类似 Checkpointer 的传法）。</li>
              <li>在节点函数里，通过 <IC>config</IC> 拿到 <IC>store</IC>，然后调用 <IC>store.get(namespace, key)</IC> 或 <IC>store.put(namespace, key, value)</IC>。</li>
              <li>Store 的数据不会自动进入 State，需要你手动读、手动决定怎么用。</li>
            </ul>
            <C>{`# 伪代码，我还没实际跑过
from langgraph.store.memory import InMemoryStore

store = InMemoryStore()

graph = graph_builder.compile(store=store)

# 在节点里
def my_node(state, config):
    store = config["store"]
    namespace = ("user_profile", config["configurable"]["user_id"])
    profile = store.get(namespace, "prefs")
    # 使用 profile ...`}</C>
            <NB>
              这部分内容我还没有实际验证过。等我真正在项目里用上 Store 了，会回来补充更准确的代码示例和踩坑记录。
            </NB>
          </S>

          {/* 7 */}
          <S id="hybrid" title="7. 混合使用场景">
            <P>
              我目前能想象到的，Checkpointer 和 Store 混合使用的典型场景是：
            </P>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>多轮对话 Agent</strong>：Checkpointer 记住当前对话的 State（消息历史、工具调用结果），Store 记住用户偏好（「这个用户喜欢详细的解释」）。
              </li>
              <li>
                <strong>长期任务 Agent</strong>：Checkpointer 记住任务执行到了哪一步（「正在执行第 3 个工具」），Store 记住任务相关的背景知识（「这个任务涉及的数据源是 XXX」）。
              </li>
              <li>
                <strong>多用户 Agent 系统</strong>：每个用户有自己的 Checkpointer thread，所有用户共享一个 Store（存系统级的知识库元数据）。
              </li>
            </ul>
            <P>
              我还没有在实际项目里同时用过这两者。目前的理解是：<strong>Checkpointer 管「对话进行到哪里了」，Store 管「关于这个用户/任务我知道什么」</strong>。这个理解等我有实际经验后会更新。
            </P>
          </S>

          {/* 8 */}
          <S id="summary" title="8. 阶段性总结">
            <P>目前我对记忆系统的理解可以浓缩为几条：</P>
            <ul className="space-y-2 ml-2">
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>LangGraph 的记忆系统分两层：Checkpointer（短期，会话级）和 Store（长期，跨会话）。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>Checkpointer 按 <IC>thread_id</IC> 组织，同一个 thread 多次调用会自动恢复 State。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>Store 是键值存储，需要手动在节点里读写，不会自动进入 State。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>开发用 <IC>MemorySaver</IC>，生产用 <IC>SqliteSaver</IC> 或 <IC>PostgresSaver</IC>。</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-1.5 shrink-0">&#8226;</span><span>我目前对 Store 的实际使用经验很少，以上内容部分来自文档，等我真正用过了会更新。</span></li>
            </ul>
          </S>

          {/* footer links */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-4 text-sm">
            <Link href="/notes/agent/react-loop" className="text-blue-400 hover:underline">
              ← ReAct 自治循环
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/notes/agent" className="text-blue-400 hover:underline">
              返回 Agent 笔记索引
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/notes/agent/human-in-the-loop" className="text-blue-400 hover:underline">
              下一篇：Human-in-the-Loop →
            </Link>
          </div>

        </div>
      )}
    </SubPageLayout>
  )
}
