/**
 * Shared effects for static HTML notes pages
 * - Particles canvas background
 * - CustomCursor replacement
 * - MouseGlow radial follow
 */

(function () {
  // ── Skip on touch devices ──
  if (window.matchMedia('(hover: none)').matches) return

  // ═══════════════════════════════════════
  // 1. Particles canvas background
  // ═══════════════════════════════════════
  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position:fixed;inset:0;z-index:-10;pointer-events:none'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let w = 0, h = 0
  const COUNT = 60
  const particles = []
  const mouse = { x: -9999, y: -9999 }

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = document.documentElement.scrollHeight
  }

  document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX
    mouse.y = e.clientY + window.scrollY
  })

  function create() {
    var r = Math.random() * 2 + 0.8
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: r,
      baseR: r,
      alpha: Math.random() * 0.35 + 0.1
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h)
    var color = '96, 165, 250'

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i]
      p.x += p.vx; p.y += p.vy
      if (p.x < 0) p.x = w
      if (p.x > w) p.x = 0
      if (p.y < 0) p.y = h
      if (p.y > h) p.y = 0

      var dx = mouse.x - p.x, dy = mouse.y - p.y
      var dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150) {
        var force = (150 - dist) / 150
        p.vx -= dx * force * 0.0006
        p.vy -= dy * force * 0.0006
        p.r = p.baseR + force * 2.5
      } else {
        p.r += (p.baseR - p.r) * 0.1
      }
      p.vx *= 0.999; p.vy *= 0.999

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(' + color + ',' + p.alpha + ')'
      ctx.fill()
    }

    // connections
    for (var a = 0; a < particles.length; a++) {
      for (var b = a + 1; b < particles.length; b++) {
        var dx2 = particles[a].x - particles[b].x
        var dy2 = particles[a].y - particles[b].y
        var d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
        if (d2 < 120) {
          ctx.beginPath()
          ctx.moveTo(particles[a].x, particles[a].y)
          ctx.lineTo(particles[b].x, particles[b].y)
          ctx.strokeStyle = 'rgba(' + color + ',' + (0.06 * (1 - d2 / 120)) + ')'
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(draw)
  }

  resize()
  for (var k = 0; k < COUNT; k++) particles.push(create())
  draw()
  window.addEventListener('resize', resize)
  window.addEventListener('scroll', resize, { passive: true })

  // ═══════════════════════════════════════
  // 2. MouseGlow — radial gradient that follows cursor
  // ═══════════════════════════════════════
  var glowEl = document.createElement('div')
  glowEl.style.cssText =
    'position:fixed;top:-300px;left:-300px;width:600px;height:600px;' +
    'border-radius:50%;pointer-events:none;z-index:0;mix-blend-mode:screen;' +
    'background:radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 60%)'
  document.body.appendChild(glowEl)

  var gMouseX = window.innerWidth / 2, gMouseY = window.innerHeight / 2
  var gCurX = gMouseX, gCurY = gMouseY

  document.addEventListener('mousemove', function (e) {
    gMouseX = e.clientX
    gMouseY = e.clientY
  })

  function animateGlow() {
    gCurX += (gMouseX - gCurX) * 0.08
    gCurY += (gMouseY - gCurY) * 0.08
    glowEl.style.transform = 'translate(' + gCurX + 'px, ' + gCurY + 'px)'
    requestAnimationFrame(animateGlow)
  }
  animateGlow()

  // ═══════════════════════════════════════
  // 3. CustomCursor — ring + dot replacement
  // ═══════════════════════════════════════
  document.body.classList.add('has-custom-cursor')

  var cursorRing = document.createElement('div')
  cursorRing.className = 'cursor-ring'
  cursorRing.style.cssText =
    'position:fixed;pointer-events:none;z-index:9999;' +
    'width:24px;height:24px;border:1.5px solid rgba(96,165,250,0.5);' +
    'border-radius:50%;transform:translate(-50%,-50%);transition:width 0.2s,height 0.2s,border-color 0.2s;' +
    'opacity:0'

  var cursorDot = document.createElement('div')
  cursorDot.className = 'cursor-dot'
  cursorDot.style.cssText =
    'position:fixed;pointer-events:none;z-index:10000;' +
    'width:6px;height:6px;background:#60a5fa;border-radius:50%;' +
    'transform:translate(-50%,-50%);opacity:0'

  document.body.appendChild(cursorRing)
  document.body.appendChild(cursorDot)

  var cMouseX = -100, cMouseY = -100
  var cRingX = -100, cRingY = -100

  document.addEventListener('mousemove', function (e) {
    cMouseX = e.clientX
    cMouseY = e.clientY
    if (cursorRing.style.opacity === '0') {
      cursorRing.style.opacity = '1'
      cursorDot.style.opacity = '1'
    }
  })

  document.addEventListener('mouseleave', function () {
    cursorRing.style.opacity = '0'
    cursorDot.style.opacity = '0'
  })

  document.addEventListener('mouseenter', function () {
    cursorRing.style.opacity = '1'
    cursorDot.style.opacity = '1'
  })

  // hover on links/buttons → enlarge ring
  document.addEventListener('mouseover', function (e) {
    var t = e.target
    if (
      t.tagName === 'A' || t.tagName === 'BUTTON' ||
      t.closest('a') || t.closest('button')
    ) {
      cursorRing.style.width = '38px'
      cursorRing.style.height = '38px'
      cursorRing.style.borderColor = 'rgba(96,165,250,0.8)'
    }
  })

  document.addEventListener('mouseout', function (e) {
    var t = e.target
    if (
      t.tagName === 'A' || t.tagName === 'BUTTON' ||
      t.closest('a') || t.closest('button')
    ) {
      cursorRing.style.width = '24px'
      cursorRing.style.height = '24px'
      cursorRing.style.borderColor = 'rgba(96,165,250,0.5)'
    }
  })

  function animateCursor() {
    cRingX += (cMouseX - cRingX) * 0.15
    cRingY += (cMouseY - cRingY) * 0.15
    cursorRing.style.left = cRingX + 'px'
    cursorRing.style.top = cRingY + 'px'
    cursorDot.style.left = cMouseX + 'px'
    cursorDot.style.top = cMouseY + 'px'
    requestAnimationFrame(animateCursor)
  }
  animateCursor()

  // Hide default cursor on body
  var style = document.createElement('style')
  style.textContent =
    'body.has-custom-cursor, body.has-custom-cursor * { cursor: none !important; }' +
    '@media (hover: none) { body.has-custom-cursor, body.has-custom-cursor * { cursor: auto !important; } }'
  document.head.appendChild(style)
})()
