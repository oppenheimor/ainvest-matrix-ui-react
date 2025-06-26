import { forwardRef, useState, useCallback, useMemo } from "react";
import { cva } from "class-variance-authority";
import { ArrowDownIconMap, ArrowUpIconMap } from "./components/ToggleIcon";
import { cn } from "./utils/clsx";
import { CollapseModeMap, FloorLevelMap } from "./constants";
import { CollapseMode, CustomEventProps, FloorTitleProps } from "./types";

const titleVariants = cva("flex items-center text-text-primary", {
  variants: {
    level: {
      [FloorLevelMap.Level1]:
        "text-[32px]/[38px] @sm:text-[40px]/[48px] font-bold",
      [FloorLevelMap.Level2]:
        "text-2xl/[28px] @sm:text-[32px]/[38px] font-bold",
      [FloorLevelMap.Level3]:
        "text-xl/[24px] @sm:text-2xl/[28px] font-semibold @sm:font-bold",
    },
  },
});

const descriptionVariants = cva("text-text-secondary font-normal", {
  variants: {
    level: {
      [FloorLevelMap.Level1]: "text-sm/[18px] @sm:text-lg/[22px] mt-2",
      [FloorLevelMap.Level2]:
        "text-sm/[18px] @sm:text-base/[22px] mt-[10px] @sm:mt-[5px]",
      [FloorLevelMap.Level3]: "text-xs/[16px] @sm:text-base/[22px] mt-2",
    },
  },
});

export const FloorTitle = forwardRef<HTMLDivElement, FloorTitleProps>(
  (
    {
      level,
      title,
      titleClassName,
      titleIcon,
      description,
      actionBarElement,
      collapseMode = CollapseModeMap.None,
      defaultCollapsed = false,
      children,
      ...props
    },
    ref
  ) => {
    // 外部div的props
    const componentProps = Object.entries(props).reduce((acc, [key, value]) => {
      if (!key.startsWith("onTitle")) {
        acc[key] = value;
      }
      return acc;
    }, {} as React.HTMLAttributes<HTMLDivElement>);
    // 内部title的事件
    const titleEventProps = Object.entries(props).reduce(
      (acc, [key, value]) => {
        if (key.startsWith("onTitle")) {
          const newKey = key.replace("onTitle", "on");
          acc[newKey] = value;
        }
        return acc;
      },
      {} as CustomEventProps
    );
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    const isShowDescription = useMemo(() => {
      // 折叠模式为描述或全部时，描述是可折叠的
      const shouldHideWhenCollapsed = (
        [CollapseModeMap.Description, CollapseModeMap.All] as CollapseMode[]
      ).includes(collapseMode);
      // 只有在描述可折叠且当前状态为被折叠时才隐藏描述
      return !(shouldHideWhenCollapsed && isCollapsed);
    }, [collapseMode, isCollapsed]);

    const isShowContent = useMemo(() => {
      // 折叠模式为内容或全部时，内容是可折叠的
      const shouldHideWhenCollapsed = (
        [CollapseModeMap.Content, CollapseModeMap.All] as CollapseMode[]
      ).includes(collapseMode);
      // 只有在内容可折叠且当前状态为“被折叠”时才隐藏内容
      return !(shouldHideWhenCollapsed && isCollapsed);
    }, [collapseMode, isCollapsed]);

    const renderTitleIcon = useCallback(() => {
      if (collapseMode !== CollapseModeMap.None) {
        return isCollapsed ? ArrowDownIconMap[level] : ArrowUpIconMap[level];
      }
      return titleIcon;
    }, [collapseMode, isCollapsed, level]);

    return (
      <div ref={ref} {...componentProps}>
        <div className={cn(titleVariants({ level }))}>
          <div {...titleEventProps} className={titleClassName}>
            {title}
          </div>
          <span onClick={() => setIsCollapsed(!isCollapsed)} className="mt-0.5">
            {renderTitleIcon()}
          </span>
          {!!actionBarElement && (
            <span className="ml-auto items-end">{actionBarElement}</span>
          )}
        </div>
        {!!description && isShowDescription && (
          <div className={cn(descriptionVariants({ level }))}>
            {description}
          </div>
        )}
        {isShowContent && children}
      </div>
    );
  }
);

FloorTitle.displayName = "FloorTitle";
