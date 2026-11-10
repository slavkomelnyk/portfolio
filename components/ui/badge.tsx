import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm font-medium whitespace-nowrap transition-all [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        neutral: "border-border bg-secondary/60 text-foreground",
        python: "border-sky-400/40 bg-sky-400/10 text-sky-900 dark:text-sky-100",
        javascript: "border-yellow-400/50 bg-yellow-400/10 text-yellow-900 dark:text-yellow-100",
        java: "border-orange-500/40 bg-orange-500/10 text-orange-900 dark:text-orange-100",
        kotlin: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-900 dark:text-fuchsia-100",
        obsidian: "border-violet-400/40 bg-violet-400/10 text-violet-900 dark:text-violet-100",
        django: "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
        android: "border-green-400/50 bg-green-400/10 text-green-900 dark:text-green-100",
        synology: "border-blue-400/40 bg-blue-400/10 text-blue-900 dark:text-blue-100",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
)

export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>["tone"]>

function Badge({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ tone }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
