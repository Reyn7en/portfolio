export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-800 py-8 px-6 text-center">
      <p className="text-slate-600 text-sm font-mono">
        {'// 人力 + LLM 联合出品 · 我出 Bug 它出代码 · 咖啡因驱动 · '}{year}
      </p>
    </footer>
  )
}
