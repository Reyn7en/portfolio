'use client'

import { useEffect, useRef } from 'react'

/**
 * 鼠标跟随光晕
 * - 固定在视口的径向渐变层，跟随鼠标移动
 * - 深蓝色柔和光晕，mix-blend-mode 叠加在暗色背景上
 * - 用 lerp 实现丝滑延迟跟随
 */
export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const el = ref.current!
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let curX = mouseX, curY = mouseY
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      curX += (mouseX - curX) * 0.08
      curY += (mouseY - curY) * 0.08
      el.style.transform = `translate(${curX}px, ${curY}px)`
      raf = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: '-300px',
        left: '-300px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: 'screen',
      }}
    />
  )
}
