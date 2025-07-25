import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        new: "bg-linear-to-r from-light-500 to-yellow bg-light-500 text-tertiary-500 border-tertiary-480 shadow-xs",
        outline: "bg-transparent hover:bg-tertiary-500 active:bg-tertiary-480 text-tertiary-500 dark:text-white disabled:hover:bg-tertiary-500 border border-tertiary-480 hover:border-tertiary-450 disabled:border-tertiary-480 shadow-xs",
        primary: "bg-tertiary-500 hover:bg-tertiary-480 active:bg-tertiary-550 text-white disabled:hover:bg-tertiary-500 border border-tertiary-480 hover:border-tertiary-450 disabled:border-tertiary-480 shadow-xs",
        secondary: "active:bg-tertiary-550 dark:text-white text-black disabled:hover:text-white disabled:hover:bg-tertiary-500 border dark:border-tertiary-480 border-tertiary-100 dark:hover:border-tertiary-450 hover:border-tertiary-200 shadow-xs",
        ghost: "active:bg-tertiary-550 dark:text-white text-black disabled:hover:text-white disabled:hover:bg-tertiary-500 border border-transparent hover:border-tertiary-450"
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
