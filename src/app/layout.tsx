import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: '个人主页 | CS / AI 方向研究生',
  description: '电子信息硕士在读，关注 AI 应用开发、LLM Agent、RAG 与智能调度优化。',
  keywords: ['AI', 'LLM', 'Agent', 'RAG', 'Python', '智能优化', '调度'],
  authors: [{ name: 'Portfolio Owner' }],
  openGraph: {
    title: '个人主页 | AI 应用开发方向',
    description: '电子信息硕士在读，关注 AI 应用开发、LLM Agent、RAG 与智能调度优化。',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
