import * as React from "react"
import { motion, HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-light glow-primary border border-transparent",
      secondary: "bg-surface-elevated text-text hover:bg-border border border-border",
      outline: "bg-transparent text-primary border border-primary hover:bg-primary/10",
      ghost: "bg-transparent text-text hover:bg-surface-elevated cursor-pointer",
      danger: "bg-danger/20 text-danger hover:bg-danger/30 border border-danger/50"
    }

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-6 text-base font-medium",
      lg: "h-14 px-8 text-lg font-semibold"
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children as React.ReactNode}
      </motion.button>
    )
  }
)
Button.displayName = "Button"
