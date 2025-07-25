import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon'

const buttonVariants = cva(
  "group/button cursor-pointer items-center w-fit font-normal h-fit rounded-lg flex flex-row justify-center disabled:opacity-70 disabled:cursor-not-allowed transition duration-200 ease-in-out",
  {
    variants: {
      variant: {
        outline: 'bg-transparent hover:bg-tertiary-500 active:bg-tertiary-480 text-tertiary-500 dark:text-white disabled:hover:bg-tertiary-500 border border-tertiary-480 hover:border-tertiary-450 disabled:border-tertiary-480 shadow-xs',
        primary: 'bg-tertiary-500 hover:bg-tertiary-480 active:bg-tertiary-550 text-white disabled:hover:bg-tertiary-500 border border-tertiary-480 hover:border-tertiary-450 disabled:border-tertiary-480 shadow-xs',
        secondary: 'active:bg-tertiary-550 dark:text-white text-black disabled:hover:text-white disabled:hover:bg-tertiary-500 border dark:border-tertiary-480 border-tertiary-100 dark:hover:border-tertiary-450 hover:border-tertiary-200 shadow-xs',
        ghost: 'active:bg-tertiary-550 dark:text-white text-black disabled:hover:text-white disabled:hover:bg-tertiary-500 border border-transparent hover:border-tertiary-450'
      },
      size: {
        icon: 'p-2',
        sm: 'py-1 px-2 text-sm md:text-base',
        md: 'py-1.5 px-4 text-sm md:text-base',
        lg: 'py-2 px-5 text-sm md:text-base',
        xs: 'py-1 px-3 text-xs md:text-sm'
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

const getRingColor = (variant: string) => {
  switch (variant) {
    case 'primary':
      return 'ring-tertiary-480';
    case 'secondary':
      return 'ring-tertiary-480';
    case 'ghost':
      return 'ring-tertiary-480';
    default:
      return 'ring-tertiary-500';
  }
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  shiny?: boolean
  ring?: boolean
  link?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, shiny, ring, link, children, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (link) {
        window.open(link, '_blank');
      } else if (onClick) {
        onClick(e);
      }
    };

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          className,
          ring && 'ring-2 ring-opacity-0 ring-offset-0 hover:ring-offset-2 hover:ring-opacity-100 dark:ring-offset-tertiary-700 ring-offset-white',
          ring && getRingColor(variant as string),
          shiny && 'relative overflow-hidden'
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {shiny && (
          <div className='absolute inset-0 flex h-full w-full justify-center animate-slide'>
            <div className={cn(
              'absolute w-16 h-full bg-linear-to-r',
              variant === 'primary' ? 'from-white/0 dark:via-white/5 via-white/15 to-white/0' : 'dark:from-white/0 dark:via-white/5 dark:to-white/0 from-black/0 via-black/5 to-black/0'
            )} />
          </div>
        )}
        {loading ? (
          <ArrowPathIcon className='animate-spin h-5 w-5 mr-3' />
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
