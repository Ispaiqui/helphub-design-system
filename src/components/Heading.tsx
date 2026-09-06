import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes } from "react";

import { cn } from "../lib/cn";

const headingVariants = cva("font-heading text-balance tracking-tight text-foreground", {
  variants: {
    level: {
      1: "text-4xl font-extrabold sm:text-5xl",
      2: "text-3xl font-bold sm:text-4xl",
      3: "text-2xl font-semibold",
      4: "text-xl font-semibold",
      5: "text-lg font-semibold",
      6: "text-base font-semibold",
    },
  },
  defaultVariants: {
    level: 2,
  },
});

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const satisfies Record<HeadingLevel, ElementType>;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

function Heading({ as, className, level = 2, ...props }: HeadingProps) {
  const resolvedLevel = (level ?? 2) as HeadingLevel;
  const Component: ElementType = as ?? headingTags[resolvedLevel];

  return (
    <Component
      data-slot="heading"
      className={cn(headingVariants({ level: resolvedLevel, className }))}
      {...props}
    />
  );
}

export { Heading, headingVariants };
