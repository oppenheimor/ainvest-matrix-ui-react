import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "./utils";
import { CHECK_ICON, LOADING_ICON } from "./components/Icons";
import { SIZE_MAP } from "./constant/index";

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  loading?: boolean;
  size?: "sm" | "md" | "lg";
}
function renderIcon(width: number, height: number, loading: boolean) {
  if (loading) {
    return LOADING_ICON(width, height);
  }
  return CHECK_ICON(width, height);
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    { className, loading = false, disabled = false, size = "lg", ...props },
    ref
  ) => {
    // 获取当前大小的尺寸和移动距离
    const { width, height, thumbWidth, thumbHeight, moveX } = SIZE_MAP[size];

    // 动态生成类名
    const rootClassName = cn(
      "peer inline-flex shrink-0 cursor-pointer items-center rounded-full px-[2px]",
      "border-1 border-divider-level2 shadow-sm transition-colors",
      "disabled:cursor-not-allowed data-[state=checked]:disabled:opacity-10 data-[state=unchecked]:disabled:opacity-40",
      "data-[state=checked]:bg-grey-0 data-[state=unchecked]:bg-background-weak text-text-primary",
      className
    );

    const thumbClassName = cn(
      "pointer-events-none rounded-full shadow-lg ring-0 transition-transform",
      "data-[state=unchecked]:translate-x-0",
      "flex items-center justify-center w-full h-full",
      "group bg-foreground-layer1",
      moveX
    );

    return (
      <SwitchPrimitives.Root
        {...props}
        disabled={disabled || loading}
        className={rootClassName}
        style={{ width, height }}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={thumbClassName}
          style={{ width: thumbWidth, height: thumbHeight }}
        >
          {renderIcon(width, height, loading)}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    );
  }
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
