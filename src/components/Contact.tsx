const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: '城市',
    value: '杭州',
    href: null,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/your-username',
    href: 'https://github.com/your-username',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-12">
        <p className="text-blue-400 font-mono text-sm mb-2">{'// 05. contact'}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">联系方式</h2>
        <div className="w-16 h-1 bg-blue-600 rounded mt-3" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Text */}
        <div>
          <p className="text-slate-300 leading-relaxed mb-6">
            如果你对 AI 应用开发、智能调度、工程实践方向感兴趣，
            或有实习 / 合作机会，欢迎通过以下方式联系。
          </p>

          {/* Resume download */}
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-blue-800/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            下载简历 (PDF)
          </a>
        </div>

        {/* Contact cards */}
        <div className="space-y-4">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 hover:border-slate-600 transition-colors"
            >
              <div className="text-slate-400 shrink-0">{item.icon}</div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-white text-sm hover:text-blue-300 transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-white text-sm">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
