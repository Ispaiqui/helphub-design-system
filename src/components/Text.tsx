import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes } from "react";

import { cn } from "../lib/cn";

const textVariants = cva("text-pretty", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
    weight: "regular",
  },
});

export type TextProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: "p" | "span" | "div" | "label" | "small" | "strong";
  };

function Text({
  as,
  className,
  size,
  tone,
  weight,
  ...props
}: TextProps) {
  const Component: ElementType = as ?? "p";

  return (
    <Component
      data-slot="text"
      className={cn(textVariants({ size, tone, weight, className }))}
      {...props}
    />
  );
}

export { Text, textVariants };
