import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full  font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      /**
       * variant: 按钮类型
       * - primary: 主按钮
       * - default: 默认按钮
       * - secondary: 次按钮
       * - text: 文本按钮
       * - link: 链接按钮
       * - outline: 描边按钮
       */
      variant: {
        primary:
          "bg-brand-primary text-text-inverse hover:opacity-85 active:opacity-60",
        default:
          "bg-grey-0 text-text-inverse hover:opacity-85 active:opacity-60 dark:text-black",
        secondary:
          "bg-button-grey-default text-text-primary hover:opacity-85 active:opacity-60",
        text: "text-base text-text-primary",
        link: "text-base text-brand-primary hover:opacity-85 active:opacity-60",
        outline: "bg-transparent border border-divider-level2 text-text-primary hover:bg-hover-5 active:bg-click-10",
      },
      /**
       * size: 按钮大小
       * - xs: 超小按钮
       * - sm: 小按钮
       * - base: 正常按钮
       * - lg: 大按钮
       */
      size: {
        xs: "h-6 min-w-[50px] rounded-full px-2 text-[11px]",
        sm: "h-7 min-w-[62px] rounded-full px-3 text-xs",
        base: "h-9 min-w-[76px] px-4 text-sm",
        lg: "h-11 min-w-[90px] px-5 text-base",
      },
      /**
       * shape: 按钮形状
       * - default: 常规按钮
       * - circle: 圆形按钮（需配合 w/h className 使用，自动移除 min-width/padding，强制圆形）
       */
      shape: {
        default: "",
        circle: "min-w-0 p-0 rounded-full flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
      shape: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * shape: 按钮形状
   * - default: 常规按钮
   * - circle: 圆形按钮（需配合 w/h className 使用，自动移除 min-width/padding，强制圆形）
   */
  shape?: "default" | "circle";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <div id="ainvest-button">
        <Comp
          className={cn(buttonVariants({ variant, size, shape, className }), 'overflow-hidden focus:outline-none')}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
