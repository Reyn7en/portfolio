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
export default function RAGIntegration() {
  return (
    <SubPageLayout title="RAG 集成 & 实战项目">
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
            <span className="badge badge-blue">RAG</span>
            <span className="badge badge-green">学习笔记</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 leading-snug">
            RAG 集成 & 实战项目
          </h1>
          <p className="text-slate-400 text-sm">
            覆盖 Agentic RAG、检索工具暴露、端到端综合案例与调试技巧。
            基于 deeplearning.ai 公开课整理，个人学习记录。
          </p>
        </header>

        {/* TOC */}
        <nav className="mb-10 p-5 rounded-xl bg-slate-800/40 border border-slate-700/60">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">目录</p>
          <ol className="list-decimal list-inside text-sm space-y-1.5 text-slate-300">
            <li><a href="#why-rag" className="text-blue-400 hover:underline">为什么 Agent 需要 RAG</a></li>
            <li><a href="#agentic-rag" className="text-blue-400 hover:underline">Agentic RAG vs Naive RAG</a></li>
            <li><a href="#tool-design" className="text-blue-400 hover:underline">检索工具的设计与暴露</a></li>
            <li><a href="#multi-step-rag" className="text-blue-400 hover:underline">多步检索与自我纠错</a></li>
            <li><a href="#end-to-end" className="text-blue-400 hover:underline">端到端综合案例</a></li>
            <li><a href="#debugging" className="text-blue-400 hover:underline">调试技巧与常见坑</a></li>
            <li><a href="#evaluation" className="text-blue-400 hover:underline">效果评估</a></li>
            <li><a href="#summary" className="text-blue-400 hover:underline">小结</a></li>
          </ol>
        </nav>

        {/* ===== 1 ===== */}
        <S id="why-rag" title="1. 为什么 Agent 需要 RAG">
          <P>
            学这部分之前，我对 RAG 的理解停留在「检索 + 拼 prompt + 让 LLM 回答」。这套流程在「单轮问答」场景里够用，但放到 Agent 里就有明显局限：
          </P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">只检索一次。</strong>用户的 question 可能有歧义或者需要多轮澄清，一次性检索往往召回不全。</li>
            <li><strong className="text-white">不会反思检索质量。</strong>召回的文档不相关？传统 RAG 不会因为「这文档不靠谱」而重新检索。</li>
            <li><strong className="text-white">无法利用工具。</strong>用户问「帮我对比 A 和 B 两个文档里的数据」，单次检索只能看到一个视角。</li>
          </ul>
          <P>
            <strong className="text-white">Agentic RAG</strong> 的思路是：<strong className="text-white">把检索本身变成一个可由 Agent 调度、反思、重试的工具</strong>，而不只是 pipeline 里的一个固定步骤。
          </P>
          <NB>
            课程里反复强调一个观点：RAG 的本质是「给 LLM 提供外部知识」，Agent 的本质是「让 LLM 自主决定下一步做什么」。两者结合后，LLM 可以自主决定「我还需要查更多资料」、「刚才查的不对，换个 query 再查」。
          </NB>
        </S>

        {/* ===== 2 ===== */}
        <S id="agentic-rag" title="2. Agentic RAG vs Naive RAG">
          <P>
            用一个表格整理两者的核心差异（课程里有类似对比）：
          </P>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left text-slate-300 border border-slate-700 rounded-lg overflow-hidden">
              <thead className="bg-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-2">维度</th>
                  <th className="px-4 py-2">Naive RAG</th>
                  <th className="px-4 py-2">Agentic RAG</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-700">
                  <td className="px-4 py-2 text-white font-medium">检索次数</td>
                  <td className="px-4 py-2">固定 1 次</td>
                  <td className="px-4 py-2">动态，可多轮</td>
                </tr>
                <tr className="border-t border-slate-700 bg-slate-800/30">
                  <td className="px-4 py-2 text-white font-medium">Query 生成</td>
                  <td className="px-4 py-2">用户原始问题</td>
                  <td className="px-4 py-2">LLM 重写 / 分解</td>
                </tr>
                <tr className="border-t border-slate-700">
                  <td className="px-4 py-2 text-white font-medium">结果过滤</td>
                  <td className="px-4 py-2">无</td>
                  <td className="px-4 py-2">LLM 评估相关性后决定是否使用</td>
                </tr>
                <tr className="border-t border-slate-700 bg-slate-800/30">
                  <td className="px-4 py-2 text-white font-medium">工具使用</td>
                  <td className="px-4 py-2">无</td>
                  <td className="px-4 py-2">可调用 Web Search、SQL 等多种工具</td>
                </tr>
                <tr className="border-t border-slate-700">
                  <td className="px-4 py-2 text-white font-medium">适用场景</td>
                  <td className="px-4 py-2">简单问答</td>
                  <td className="px-4 py-2">研究、分析、多步推理</td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>
            课程里给的一个关键设计：<strong className="text-white">Agentic RAG 里，检索是一个 Tool，不是 pipeline 的前置步骤</strong>。这意味着 Agent 可以在任意时刻调用检索，甚至多次调用不同检索工具（向量库检索 + 网页搜索 + SQL 查询）后综合结果。
          </P>
        </S>

        {/* ===== 3 ===== */}
        <S id="tool-design" title="3. 检索工具的设计与暴露">
          <P>
            在 LangGraph 里把 RAG 接入 Agent，核心是把「检索」封装成一个 <IC>@tool</IC>。课程里给了一个比较规范的写法：
          </P>
          <C>{`@tool
def retrieve_docs(query: str) -> list[dict]:
    """根据查询语句，从向量数据库中检索相关文档片段。
    
    Args:
        query: 检索查询语句
        
    Returns:
        相关文档片段列表，每个元素包含 text 和 metadata
    """
    # 这里是你的向量检索实现（Chroma/Pinecone/Weaviate 等）
    results = vector_store.similarity_search(query, k=5)
    return [{"text": doc.page_content, "metadata": doc.metadata} for doc in results]

# 把工具绑定到模型
tools = [retrieve_docs, web_search, query_database]
llm_with_tools = ChatOpenAI().bind_tools(tools)

# 在图里，这个 LLM 可以自主调用 retrieve_docs
graph.add_node("model", TalkToModel(llm_with_tools))
graph.add_node("tools", ToolNode(tools))
graph.add_edge("model", "tools")
graph.add_conditional_edges("tools", should_continue)`}</C>
          <P>
            设计检索工具时的几个注意点（课程里提到的）：
          </P>
          <ul className="list-decimal list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">工具描述（docstring）要写清楚。</strong>LLM 根据 docstring 决定「什么时候该调用这个工具」。如果写得太模糊，LLM 会不爱用；写得太窄，又会错过该用的时候。</li>
            <li><strong className="text-white">返回格式要稳定。</strong>返回 list of dict 比返回一段拼接文本好——下游节点（比如一个「答案合成」节点）可以更灵活地使用每个文档的 metadata。</li>
            <li><strong className="text-white">考虑返回空结果的情况。</strong>检索不到相关文档时，返回空列表 + 一个标志位，让 LLM 有机会决定「要不要换个 query 再查一次」或者「改用网页搜索」。</li>
          </ul>
          <NB>
            我自己的体会：工具描述是检索工具设计里最值得花时间调的部分。课程里 Harrison 演示了一个例子——改了工具的 docstring 之后，Agent 调用检索工具的准确率明显提升了。
          </NB>
        </S>

        {/* ===== 4 ===== */}
        <S id="multi-step-rag" title="4. 多步检索与自我纠错">
          <P>
            这是 Agentic RAG 最有价值的部分：<strong className="text-white">Agent 可以根据第一次检索的结果，决定是否需要进一步检索</strong>。
          </P>
          <P>
            课程里给出了一个典型的多步检索循环设计：
          </P>
          <C>{`from langgraph.graph import END

def should_continue(state: State) -> str:
    """条件边路由：根据当前状态决定继续检索还是结束。"""
    messages = state["messages"]
    last_message = messages[-1]
    
    # 如果模型认为已经收集到足够信息，就结束检索
    if "FINAL_ANSWER" in last_message.content:
        return END
    
    # 否则，继续调用检索工具
    return "retrieve"}

# 图结构
graph = StateGraph(State)
graph.add_node("retrieve", ToolNode([retrieve_docs]))
graph.add_node("analyze", analyze_node)   # 分析当前检索结果是否足够
graph.add_conditional_edges("analyze", should_continue)
graph.set_entry_point("retrieve")`}</C>
          <P>
            更实用的一种写法是<strong className="text-white">让模型自己判断</strong>（而不是靠关键词 <IC>FINAL_ANSWER</IC>）：
          </P>
          <C>{`def analyze_node(state: State):
    # 让模型分析：当前检索结果是否足以回答用户问题？
    response = analyzer_llm.invoke([
        ("system", "分析当前检索结果是否足以回答用户问题。如果需要更多检索，输出 RETREIVE；如果足够，输出 ANSWER。"),
        ("user", f"用户问题：{state['question']}\n\n当前检索结果：\\n{format_docs(state['retrieved_docs'])}")
    ])
    
    if "ANSWER" in response.content:
        return {"next_step": "synthesize_answer"}
    else:
        return {"next_step": "retrieve_more"}`}</C>
          <P>
            这种写法的好处：<strong className="text-white">模型可以基于检索结果的质量动态决定下一步</strong>，而不是靠一个固定规则。课程里提到，这比 Naive RAG 的准确率高不少，尤其是在需要多视角信息的复杂问题上。
          </P>
        </S>

        {/* ===== 5 ===== */}
        <S id="end-to-end" title="5. 端到端综合案例">
          <P>
            课程最后给了一个比较完整的「研究助手 Agent」案例，我把它整理成一个可以参照的端到端流程。
          </P>
          <P>
            <strong className="text-white">场景</strong>：用户抛一个研究性问题（比如「对比 LangChain 和 LangGraph 在 Agent 构建上的差异」），Agent 自动完成多源检索、信息综合、答案生成。
          </P>
          <P><strong className="text-white">图的节点设计</strong>：</P>
          <ol className="list-decimal list-inside space-y-2 text-slate-300">
            <li><strong>query_rewrite</strong>：把用户的自然语言问题，改写成更适合向量检索的 query（可能分解成多个 sub-query）。</li>
            <li><strong>retrieve_vector</strong>：对向量库做检索，返回 top-K 文档。</li>
            <li><strong>retrieve_web</strong>：调用 Web Search API（比如 Tavily），补充向量库里没有的最新信息。</li>
            <li><strong>analyze_coverage</strong>：分析当前召回的文档是否覆盖了问题的所有方面。如果覆盖不全，回到 query_rewrite 重新检索。</li>
            <li><strong>synthesize_answer</strong>：综合所有检索结果，生成最终答案，并附上引用来源。</li>
          </ol>
          <P><strong className="text-white">关键边</strong>：</P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><IC>query_rewrite</IC> → <IC>retrieve_vector</IC> 和 <IC>retrieve_web</IC>（并行）</li>
            <li><IC>retrieve_vector</IC> / <IC>retrieve_web</IC> → <IC>analyze_coverage</IC></li>
            <li><IC>analyze_coverage</IC> → 如果覆盖不全 → <IC>query_rewrite</IC>（循环）</li>
            <li><IC>analyze_coverage</IC> → 如果覆盖足够 → <IC>synthesize_answer</IC> → END</li>
          </ul>
          <C>{`# 伪代码：构建研究助手 Agent
from langgraph.graph import StateGraph, END

graph = StateGraph(ResearchState)

graph.add_node("query_rewrite", query_rewrite_node)
graph.add_node("retrieve_vector", vector_retrieve_node)
graph.add_node("retrieve_web", web_retrieve_node)
graph.add_node("analyze_coverage", analyze_node)
graph.add_node("synthesize_answer", synthesize_node)

# 并行检索
graph.add_edge("query_rewrite", "retrieve_vector")
graph.add_edge("query_rewrite", "retrieve_web")

# 两个检索都完成后，进入 analyze
graph.add_edge(["retrieve_vector", "retrieve_web"], "analyze_coverage")

# 条件边：继续检索 or 生成答案
graph.add_conditional_edges("analyze_coverage", 
    lambda s: "query_rewrite" if s["need_more"] else "synthesize_answer")

graph.add_edge("synthesize_answer", END)`}</C>
          <NB>
            这个案例里最巧妙的设计是「并行检索」：向量库和网页搜索可以同时发起，等两个都返回后再做结果融合。LangGraph 的 <IC>add_edge(["node_a", "node_b"], "next_node")</IC> 语法天然支持这种「多入度节点」的同步等待。
          </NB>
        </S>

        {/* ===== 6 ===== */}
        <S id="debugging" title="6. 调试技巧与常见坑">
          <P>
            这部分是课程里比较实用但比较散的内容，我结合自己的体会整理一下。
          </P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">坑一：检索工具被频繁调用，token 消耗大。</strong><br/>原因：模型在 ReAct 循环里反复调用同一个检索工具，每次都重新算 embedding、查向量库。解决：在 State 里加一个 <IC>retrieved_cache</IC> 字段，同样的 query 不重复检索。</li>
            <li><strong className="text-white">坑二：检索结果太长，撑爆上下文窗口。</strong><br/>原因：把 top-10 个文档全文都拼进 prompt 了。解决：在检索工具里做摘要（先让小模型把每个文档压缩成 2-3 句），只把摘要传给大模型。</li>
            <li><strong className="text-white">坑三：模型「假装」检索到了内容。</strong><br/>原因：检索返回空结果，但模型基于预训练知识「编」了一个答案，还附上了假引用。解决：在 prompt 里明确告诉模型「如果检索结果为空，必须说『我没有找到相关信息』，禁止编造」。</li>
            <li><strong className="text-white">坑四：多步检索陷入死循环。</strong><br/>原因：<IC>analyze_coverage</IC> 节点一直认为「还不够」，无限循环。解决：在 State 里加一个 <IC>retrieve_count</IC> 计数器，超过 3 次强制进入 <IC>synthesize_answer</IC>。</li>
          </ul>
          <P>
            <strong className="text-white">调试技巧</strong>（课程里推荐的）：
          </P>
          <ul className="list-decimal list-inside space-y-2 text-slate-300">
            <li>用 <IC>stream_mode="messages"</IC> 实时看模型在想什么、调了什么工具。</li>
            <li>在关键节点里 <IC>print(state)</IC>（或写日志），记录每步的 State 快照。</li>
            <li>用 <IC>MemorySaver</IC> 做本地调试，每次改动后可以从最后一个 checkpoint 恢复，不用从头跑。</li>
            <li>给检索工具加一个「Mock 模式」，返回固定结果，先调通 Agent 的逻辑流，再接真实向量库。</li>
          </ul>
        </S>

        {/* ===== 7 ===== */}
        <S id="evaluation" title="7. 效果评估">
          <P>
            课程里这部分讲得比较简略，我结合自己的理解补充一些。
          </P>
          <P>
            RAG Agent 的效果评估，比普通 RAG 更复杂，因为<strong className="text-white">Agent 的行为是不确定的</strong>——同样的问题，两次跑可能检索的文档不同、推理路径不同、最终答案也不同。
          </P>
          <P>
            课程里提到几个可以量化的指标：
          </P>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><strong className="text-white">检索准确率</strong>：召回的文档里，有多少是真正相关的（可以用人工标注或 LLM-as-judge）。</li>
            <li><strong className="text-white">答案准确率</strong>：最终答案是否正确（需要 ground truth 或者 LLM-as-judge）。</li>
            <li><strong className="text-white">检索步数</strong>：平均需要几次检索才能给出答案（越少越好，但和准确率需要平衡）。</li>
            <li><strong className="text-white">工具调用正确率</strong>：Agent 是否在合适的时机调用了合适的工具（比如该查向量库的时候没有去调 SQL）。</li>
          </ul>
          <P>
            我目前觉得最实用的评估方式是：<strong className="text-white">用一组固定 test case，每次改了 prompt / 工具描述 / 检索参数后，跑一遍所有 case，对比答案质量和检索步数</strong>。不需要很复杂的评估框架，暴力但有效。
          </P>
        </S>

        {/* ===== 8 ===== */}
        <S id="summary" title="8. 小结">
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Agentic RAG 把检索变成 Agent 可自主调度、反思、重试的工具，而不只是 pipeline 的前置步骤。</li>
            <li>检索工具设计关键：清晰的 docstring、稳定的返回格式、处理空结果的能力。</li>
            <li>多步检索：让模型动态判断是否需要进一步检索，用条件边实现循环。</li>
            <li>端到端案例：query 重写 → 并行检索（向量 + Web）→ 覆盖分析 → 综合答案。</li>
            <li>常见坑：token 消耗大、检索结果太长、模型编造答案、多步检索死循环。</li>
            <li>调试技巧：stream_mode、State 快照日志、Mock 模式、Checkpointer 恢复。</li>
            <li>效果评估：检索准确率 + 答案准确率 + 检索步数 + 工具调用正确率。</li>
          </ul>
        </S>

        {/* Footer links */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-4 text-sm">
          <Link href="/notes/agent/multi-agent" className="text-blue-400 hover:underline">
            ← Multi-Agent 架构
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/notes/agent" className="text-blue-400 hover:underline">
            返回 Agent 笔记索引
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
