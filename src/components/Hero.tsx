export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-start px-6 pt-20 max-w-5xl ml-[6%] relative"
    >
      {/* Decorative gradient overlay */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 40%, rgba(37,99,235,0.12) 0%, transparent 55%), radial-gradient(circle at 80% 60%, rgba(124,58,237,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Asuka full background — positioned right, no mask (mask-image has CDN compat issues) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          style={{
            backgroundImage: 'url(/asuka-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.15,
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: '-10%',
            left: '30%',
          }}
        />
      </div>

      <div className="animate-fadeInUp relative z-10">
        <p className="text-blue-400 font-mono text-sm mb-4 tracking-widest uppercase">
          {'// Hello, World'}
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 leading-tight">
          你好，我是
          <br />
          <span className="gradient-text">许晨昊</span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl mt-4 mb-8 max-w-3xl leading-relaxed">
          电子信息方向在读硕士，研究主方向为{' '}
          <span className="text-blue-300 font-medium">强化学习（DRL）</span>
          与{' '}
          <span className="text-blue-300 font-medium">智能调度优化</span>。
          同时在自学{' '}
          <span className="text-blue-300 font-medium">LLM Agent</span> /{' '}
          <span className="text-blue-300 font-medium">RAG</span>{' '}
          应用开发，业余还在摸索游戏引擎。
          <br className="hidden md:block" />
          <br className="hidden md:block" />
          正在构建可交互的 AI 应用与工程化工具链。
        </p>

        <div className="flex flex-wrap gap-4 hero-cta">
          <a
            href="#work"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-blue-800/40"
          >
            查看项目方向 →
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-medium rounded-lg transition-all duration-200"
          >
            联系我
          </a>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-10">
          {['LLM Agent', 'RAG', 'Python', 'Scheduling', 'RL', 'FastAPI', 'Linux'].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 text-xs animate-bounce z-10">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
