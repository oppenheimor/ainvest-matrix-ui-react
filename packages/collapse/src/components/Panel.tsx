import { useState, forwardRef, useCallback, useImperativeHandle } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "./IconForPanel";
import { cn } from "../utils/clsx";
import { IPanelProps, IPanelRef } from "../types";

export const Panel = forwardRef<IPanelRef, IPanelProps>(
  (
    {
      className,
      header,
      children,
      defaultExpanded = false,
      onExpandChange,
      iconSize = 16,
      ...props
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    const handleToggle = useCallback(() => {
      const newExpanded = !expanded;
      setExpanded(newExpanded);
      onExpandChange?.(newExpanded);
    }, [expanded, onExpandChange]);

    // 暴露方法给父组件
    useImperativeHandle(
      ref,
      () => ({
        expand: () => {
          if (!expanded) {
            setExpanded(true);
            onExpandChange?.(true);
          }
        },
        collapse: () => {
          if (expanded) {
            setExpanded(false);
            onExpandChange?.(false);
          }
        },
        toggle: handleToggle,
        isExpanded: () => expanded,
      }),
      [expanded, onExpandChange, handleToggle]
    );

    return (
      <div
        className={cn("flex flex-col text-text-primary", className)}
        {...props}
      >
        {/* 头部区域 */}
        <div
          onClick={handleToggle}
          className="flex items-center pt-3 pb-3 bg-foreground-layer1 hover:bg-[rgba(0,0,0,0.05)] hover:rounded-[6px] dark:hover:bg-[rgba(255,255,255,0.10)]"
        >
          <span className="ml-4 text-base leading-snug">{header}</span>
          <span className="ml-auto mr-4">
            {expanded ? (
              <ArrowUpIcon iconSize={iconSize} />
            ) : (
              <ArrowDownIcon iconSize={iconSize} />
            )}
          </span>
        </div>
        {/* 内容区域 */}
        {expanded && (
          <div className="bg-foreground-layer1 pl-4 pb-4 pr-4 leading-[18px] text-sm">
            {children}
          </div>
        )}
      </div>
    );
  }
);
