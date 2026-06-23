'use client'

import { useRef, ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** 倾斜最大角度（度），默认 8 */
  max?: number
}

/**
 * 3D Tilt 卡片
 * - 鼠标在卡片上移动时，卡片跟随做 perspective 3D 倾斜
 * - 附带光泽高光层跟随鼠标
 * - 鼠标离开时平滑回正
 */
export default function TiltCard({ children, className = '', max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current!
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    // 归一化到 -1 ~ 1
    const rx = (y - cy) / cy // Y 轴旋转：鼠标在上 → 正仰角
    const ry = (cx - x) / cx // X 轴旋转：鼠标在左 → 正转角
    el.style.transform = `perspective(800px) rotateX(${rx * max}deg) rotateY(${ry * max}deg)`

    // 光泽高光
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 50%)`
      glareRef.current.style.opacity = '1'
    }
  }

  const handleLeave = () => {
    const el = ref.current!
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
    >
      {children}
      <div
        ref={glareRef}
        className="tilt-glare"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s',
          zIndex: 1,
        }}
      />
    </div>
  )
}
