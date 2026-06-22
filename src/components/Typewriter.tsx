'use client'

import { useEffect, useState } from 'react'

export default function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const speed = 80

    function type() {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
        timer = setTimeout(type, speed + Math.random() * 60)
      } else {
        setDone(true)
      }
    }

    const start = setTimeout(type, 400)
    return () => {
      clearTimeout(start)
      clearTimeout(timer)
    }
  }, [text])

  return (
    <span className="gradient-text">
      {displayed}
      {!done && <span className="cursor-blink">|</span>}
    </span>
  )
}
