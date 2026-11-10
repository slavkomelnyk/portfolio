"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import { cn } from "cn"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]

type CarouselContextProps = {
  carouselRef: UseEmblaCarouselType[0]
  api: CarouselApi
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("useCarousel must be used within <Carousel />")
  return context
}

function Carousel({
  opts,
  autoplay,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  opts?: Parameters<typeof useEmblaCarousel>[0]
  /** Delay between automatic slides in ms. Pauses while the mouse is over the carousel or it has focus. */
  autoplay?: number
}) {
  const plugins = React.useMemo(
    () =>
      autoplay
        ? [Autoplay({ delay: autoplay, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })]
        : [],
    [autoplay]
  )
  const [carouselRef, api] = useEmblaCarousel({ align: "start", ...opts }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

  React.useEffect(() => {
    if (!api) return
    // Sync initial scroll state from the embla instance (external system).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect(api)
    api.on("reInit", onSelect).on("select", onSelect)
    return () => {
      api.off("reInit", onSelect).off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{ carouselRef, api, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        className={cn("relative", className)}
        onKeyDownCapture={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            scrollPrev()
          } else if (e.key === "ArrowRight") {
            e.preventDefault()
            scrollNext()
          }
        }}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef } = useCarousel()
  return (
    // Padding on the viewport leaves room for hover-scale without clipping.
    <div ref={carouselRef} className="overflow-hidden p-2 -m-2" data-slot="carousel-content">
      <div className={cn("flex -ml-5", className)} {...props} />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full pl-5", className)}
      {...props}
    />
  )
}

function CarouselPrevious({ className, label = "Previous slide", ...props }: React.ComponentProps<typeof Button> & { label?: string }) {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return (
    <Button
      variant="outline"
      size="icon-lg"
      className={cn(
        "absolute top-1/2 -left-4 z-10 -translate-y-1/2 rounded-full bg-background/90 backdrop-blur",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <LuArrowLeft />
      <span className="sr-only">{label}</span>
    </Button>
  )
}

function CarouselNext({ className, label = "Next slide", ...props }: React.ComponentProps<typeof Button> & { label?: string }) {
  const { scrollNext, canScrollNext } = useCarousel()
  return (
    <Button
      variant="outline"
      size="icon-lg"
      className={cn(
        "absolute top-1/2 -right-4 z-10 -translate-y-1/2 rounded-full bg-background/90 backdrop-blur",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <LuArrowRight />
      <span className="sr-only">{label}</span>
    </Button>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi }
