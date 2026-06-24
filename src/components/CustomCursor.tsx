'use client'

import { useEffect, useRef } from 'react'

/**
 * 自定义光标 + 磁吸按钮
 * - 默认：小圆点跟随鼠标
 * - hover 到 [data-magnetic] 元素时：圆点放大 + 吸附到元素中心
 * - hover 到 a/button 时：圆点变大变成圆环
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 移动端不启用
    if (window.matchMedia('(hover: none)').matches) return

    document.body.classList.add('has-custom-cursor')

    const dot = dotRef.current!
    const ring = ringRef.current!
    let mouseX = 0, mouseY = 0
    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const target = e.target as HTMLElement
      const magnetic = target.closest('[data-magnetic]') as HTMLElement | null
      const interactive = target.closest('a, button, [data-cursor]') as HTMLElement | null

      if (magnetic) {
        // 磁吸：圆点吸附到元素中心偏移
        const rect = magnetic.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        // 向中心拉近 30%
        dotX = mouseX + (cx - mouseX) * 0.3
        dotY = mouseY + (cy - mouseY) * 0.3
        dot.classList.add('cursor-magnetic')
        ring.classList.add('cursor-ring-active')
      } else if (interactive) {
        dotX = mouseX
        dotY = mouseY
        dot.classList.remove('cursor-magnetic')
        dot.classList.add('cursor-hover')
        ring.classList.add('cursor-ring-active')
      } else {
        dotX = mouseX
        dotY = mouseY
        dot.classList.remove('cursor-magnetic', 'cursor-hover')
        ring.classList.remove('cursor-ring-active')
      }
    }

    // 光环用 lerp 跟随，制造延迟感
    const animate = () => {
      ringX += (dotX - ringX) * 0.15
      ringY += (dotY - ringY) * 0.15
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    // 鼠标离开页面时隐藏
    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1' }
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998 }}
      />
    </>
  )
}
