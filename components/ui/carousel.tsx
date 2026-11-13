"use client"

import * as React from "react"
import { cn } from "cn"

type CarouselProps = React.ComponentProps<"div"> & {
  /** Auto-scroll speed in pixels per second. Set to 0 to disable. */
  speed?: number
}

const EASE = 0.08 // 0..1, how quickly the scroll eases to/from a pause

/**
 * Infinite, auto-scrolling carousel.
 * - Items are rendered three times (the outer copies are aria-hidden and not tabbable) so the loop is seamless.
 * - Speed is time-based, so it is identical on 60Hz and 120Hz displays.
 * - Pauses (eased) on hover, focus, touch and drag; disabled for reduced motion.
 * - Touch/trackpad use native scrolling; mouse gets drag-to-scroll.
 */
function Carousel({ className, children, speed = 40, ...props }: CarouselProps) {
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const beforeRef = React.useRef<HTMLDivElement>(null)
  const realRef = React.useRef<HTMLDivElement>(null)
  const afterRef = React.useRef<HTMLDivElement>(null)
  const paused = React.useRef(false)
  const drag = React.useRef({ active: false, moved: false, startX: 0, startLeft: 0 })

  const items = React.Children.toArray(children)
  const cloneItems = (prefix: string) =>
    items.map((child, i) =>
      React.isValidElement(child) ? React.cloneElement(child, { key: `${prefix}-${i}` }) : child
    )

  /** Width of one full set of items, including the trailing gap. */
  const loopWidth = React.useCallback(() => {
    const before = beforeRef.current?.firstElementChild as HTMLElement | undefined
    const real = realRef.current?.firstElementChild as HTMLElement | undefined
    if (!before || !real) return 0
    return real.offsetLeft - before.offsetLeft
  }, [])

  /**
   * Three sets are rendered (clone, real, clone); keep scrollLeft inside the middle one, [w, 2w).
   * That leaves a full set of room to scroll or drag in either direction.
   */
  const wrap = React.useCallback(() => {
    const el = scrollerRef.current
    const w = loopWidth()
    if (!el || w <= 0) return
    if (el.scrollLeft >= 2 * w) el.scrollLeft -= w
    else if (el.scrollLeft < w) el.scrollLeft += w
  }, [loopWidth])

  // The copies stay clickable (they are visible while scrolling) but are removed from
  // the tab order, so keyboard users only meet each control once.
  React.useEffect(() => {
    for (const set of [beforeRef.current, afterRef.current]) {
      set?.querySelectorAll<HTMLElement>("a, button, input, select, textarea, [tabindex]").forEach((n) =>
        n.setAttribute("tabindex", "-1")
      )
    }
  })

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    // Start in the middle set so scrolling backwards works immediately.
    el.scrollLeft = loopWidth()

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let last = performance.now()
    let pos = el.scrollLeft
    let factor = 1 // eased 0 (stopped) .. 1 (full speed)

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      const target = paused.current || reduced.matches || speed <= 0 ? 0 : 1
      factor += (target - factor) * EASE

      // Someone else moved it (wheel, touch, drag): adopt that position.
      if (Math.abs(el.scrollLeft - pos) > 1) pos = el.scrollLeft
      if (factor > 0.001) {
        pos += speed * factor * dt
        el.scrollLeft = pos
      }
      const before = el.scrollLeft
      wrap()
      if (el.scrollLeft !== before) pos = el.scrollLeft

      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const onScroll = () => wrap()
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener("scroll", onScroll)
    }
  }, [speed, wrap, loopWidth])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return
    drag.current = { active: true, moved: false, startX: e.clientX, startLeft: scrollerRef.current!.scrollLeft }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    if (d.moved) scrollerRef.current!.scrollLeft = d.startLeft - dx
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    drag.current.active = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      className={cn("relative w-full", className)}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
      onTouchEnd={() => (paused.current = false)}
      {...props}
    >
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // Swallow the click that ends a drag so links/cards aren't triggered.
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault()
            e.stopPropagation()
            drag.current.moved = false
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        className={cn(
          "flex gap-6 overflow-x-auto px-3 py-4",
          "cursor-grab active:cursor-grabbing",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          // Soft fade at both edges
          "[mask-image:linear-gradient(to_right,transparent,#000_4%,#000_96%,transparent)]"
        )}
      >
        {/* Copies for the seamless loop: hidden from assistive tech and the tab order, but clickable.
            The middle set is the real, interactive one and is where scrolling starts. */}
        <div ref={beforeRef} className="contents" aria-hidden="true">
          {cloneItems("before")}
        </div>
        <div ref={realRef} className="contents">
          {items}
        </div>
        <div ref={afterRef} className="contents" aria-hidden="true">
          {cloneItems("after")}
        </div>
      </div>
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("w-[85%] shrink-0 sm:w-[60%] md:w-[calc(50%-0.75rem)]", className)}
      {...props}
    />
  )
}

export { Carousel, CarouselItem }
