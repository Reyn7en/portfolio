'use client'

import ConsoleEgg from './ConsoleEgg'

export default function SubPageLayout({
  title,
  backLabel = '← 返回首页',
  backHref = '/',
  children,
}: {
  title: string
  backLabel?: string
  backHref?: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <ConsoleEgg />

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <a
            href={backHref}
            className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors"
          >
            {backLabel}
          </a>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 text-sm font-medium">{title}</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">{children}</main>
    </div>
  )
}
