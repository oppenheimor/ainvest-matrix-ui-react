"use client";

import React from "react";
import { cn } from "./utils/clsx";
import { cva, VariantProps } from "class-variance-authority";

const spinnerVariants = cva("relative block", {
  variants: {
    size: {
      sm: "w-5 h-5",
      md: "w-7 h-7",
      lg: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  variant?: "default" | "circle" | "circle-filled";
}

type SpinnerVariantProps = Omit<SpinnerProps, "variant">;

const Default = React.forwardRef<HTMLSpanElement, SpinnerVariantProps>(
  ({ className, size, ...props }, ref) => {
    const [bgColorClass, filteredClassName] = React.useMemo(() => {
      const bgClass = className?.match(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g) || [];
      const filteredClasses = className
        ?.replace(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g, "")
        .trim();

      return [bgClass, filteredClasses];
    }, [className]);

    return (
      <span
        className={cn(
          "opacity-[0.65]",
          spinnerVariants({ size, className: filteredClassName })
        )}
        ref={ref}
        {...props}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 left-1/2 w-[12.5%] h-full animate-spinner-leaf-fade"
            style={{
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${-(7 - i) * 100}ms`,
            }}
          >
            <span
              className={cn(
                "block w-full h-[30%] rounded-full bg-black dark:bg-white",
                bgColorClass
              )}
            />
          </span>
        ))}
      </span>
    );
  }
);

Default.displayName = "Default";

const LoaderCircleIcon = React.forwardRef<
  HTMLOrSVGElement,
  SpinnerVariantProps
>(({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="w-full"
    height="w-full"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role="img"
    aria-label="Loading spinner"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
));

LoaderCircleIcon.displayName = "LoaderCircleIcon";

const Circle = React.forwardRef<HTMLSpanElement, SpinnerVariantProps>(
  ({ className, size, ...props }, ref) => (
    <span
      className={cn("animate-spin", spinnerVariants({ size, className }))}
      ref={ref}
      {...props}
    >
      <LoaderCircleIcon />
    </span>
  )
);

Circle.displayName = "Circle";

const CircleFilled = React.forwardRef<HTMLSpanElement, SpinnerVariantProps>(
  ({ className, size, ...props }, ref) => (
    <span
      className={cn("relative", spinnerVariants({ size, className }))}
      ref={ref}
      {...props}
    >
      <span className="absolute inset-0 rotate-180">
        <LoaderCircleIcon
          className={cn(
            "animate-spin",
            className,
            "opacity-20 text-text-secondary"
          )}
          size={size}
          {...props}
        />
      </span>
      <LoaderCircleIcon
        className={cn("relative animate-spin", className)}
        size={size}
        {...props}
      />
    </span>
  )
);

CircleFilled.displayName = "CircleFilled";

export const Spinner = ({ variant, ...props }: SpinnerProps) => {
  switch (variant) {
    case "circle":
      return <Circle {...props} />;
    case "circle-filled":
      return <CircleFilled {...props} />;
    default:
      return <Default {...props} />;
  }
};
