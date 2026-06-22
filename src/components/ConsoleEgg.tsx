'use client'

import { useEffect } from 'react'

export default function ConsoleEgg() {
  useEffect(() => {
    console.log(
      '%c👀 你打开了控制台，看来是同道中人。\n%c虽然这个页面有一部分是 LLM 写的，但 Bug 归我。\n%c如果发现了什么问题 —— 那大概是我没 review 到。',
      'font-size:16px;color:#60a5fa;',
      'font-size:13px;color:#94a3b8;',
      'font-size:12px;color:#64748b;'
    )
    console.log(
      '%c' + [
        '    ╔══════════════════════════════════╗',
        '    ║   ⚡  ASK NOT WHAT AI CAN DO    ║',
        '    ║   ASK WHAT YOU CAN DO WITH AI  ║',
        '    ╚══════════════════════════════════╝',
      ].join('\n'),
      'color:#a78bfa;font-family:monospace;'
    )
  }, [])

  return null
}
