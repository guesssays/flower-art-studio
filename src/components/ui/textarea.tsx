import * as React from "react"

import { cn } from "@/lib/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-neutral-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-base ring-offset-background placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-300 hover:border-neutral-300 hover:bg-white/70 shadow-sm hover:shadow-md",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
