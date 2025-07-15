import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-neutral-900 to-neutral-800 text-white shadow-xl hover:shadow-2xl hover:from-neutral-800 hover:to-neutral-700 transform hover:scale-[1.02] active:scale-[0.98] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl hover:shadow-2xl hover:from-red-500 hover:to-red-600 transform hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-2 border-neutral-300 bg-transparent text-neutral-900 shadow-lg hover:shadow-xl hover:bg-neutral-50 hover:border-neutral-400 transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm",
        secondary:
          "bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-900 shadow-lg hover:shadow-xl hover:from-neutral-200 hover:to-neutral-300 transform hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900 backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-[1.05]",
        link:
          "text-neutral-900 underline-offset-4 hover:underline font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current after:transition-all hover:after:w-full",
        premium:
          "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-neutral-900 shadow-2xl hover:shadow-amber-500/25 hover:from-amber-300 hover:via-yellow-400 hover:to-amber-500 transform hover:scale-[1.02] active:scale-[0.98] font-semibold before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        elegant:
          "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-900 border border-rose-200 shadow-lg hover:shadow-xl hover:from-rose-200 hover:to-pink-200 hover:border-rose-300 transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base font-semibold",
        xl: "h-16 px-10 py-5 text-lg font-semibold",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
