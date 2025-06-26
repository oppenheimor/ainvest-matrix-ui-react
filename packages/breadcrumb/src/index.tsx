import React from "react";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./components/shadcn-breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/shadcn-dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/shadcn-tooltip";
import { useBreadcrumbCollapse } from "./hooks/useBreadcrumbCollapse";
import { BreadcrumbProvider } from "./context/BreadcrumbProvider";
import { BreadcrumbProps, BreadcrumbItemType } from "./types";

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  maxItems = 5,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 2,
  separator,
  ellipsisIcon,
  activeKey,
  onChange,
  renderItem,
  ellipsisProps,
  dropdownMenuProps,
  tooltipProps,
  className,
  style,
}) => {
  const { before, collapsed, after, isCollapsed, currentKey } =
    useBreadcrumbCollapse({
      items,
      maxItems,
      itemsBeforeCollapse,
      itemsAfterCollapse,
      activeKey,
    });

  // 渲染单项，支持 renderItem 和 Tooltip
  const renderBreadcrumbItem = (
    item: BreadcrumbItemType,
    index: number,
    isCurrent: boolean,
    isEllipsis?: boolean
  ) => {
    // 优先自定义渲染
    if (renderItem) {
      return (
        <BreadcrumbItem
          key={item.key}
          aria-current={isCurrent ? "page" : undefined}
        >
          {renderItem({
            item,
            index,
            isCurrent,
            isEllipsis,
            onClick: item.disabled ? undefined : () => onChange?.(item.key),
          })}
        </BreadcrumbItem>
      );
    }

    // 可点击链接分支
    if (item.href && !isCurrent && !item.disabled) {
      return (
        <BreadcrumbItem
          key={item.key}
          aria-current={isCurrent ? "page" : undefined}
        >
          <BreadcrumbLink href={item.href} onClick={() => onChange?.(item.key)}>
            {maybeTooltip(item.label, tooltipProps)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    }

    // 普通文本分支（当前项或禁用项）
    const pageClassName = isCurrent
      ? "flex items-center text-base font-normal text-text-quaternary leading-[18px]"
      : undefined;
    return (
      <BreadcrumbItem
        key={item.key}
        aria-current={isCurrent ? "page" : undefined}
      >
        <BreadcrumbPage className={pageClassName}>
          {maybeTooltip(item.label, tooltipProps)}
        </BreadcrumbPage>
      </BreadcrumbItem>
    );
  };

  // Tooltip 包装逻辑
  function maybeTooltip(
    label: React.ReactNode,
    tooltipProps?: Partial<React.ComponentProps<typeof TooltipContent>>
  ) {
    if (typeof label === "string" && label.length > 16) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="truncate max-w-[120px] inline-block align-middle overflow-hidden whitespace-nowrap">
              {label}
            </span>
          </TooltipTrigger>
          <TooltipContent {...tooltipProps}>{label}</TooltipContent>
        </Tooltip>
      );
    }
    return label;
  }

  // 渲染分隔符
  const renderSeparator = (i: number) => (
    <BreadcrumbSeparator key={`sep-${i}`}>{separator}</BreadcrumbSeparator>
  );

  // 折叠项 DropdownMenu
  const renderEllipsis = () => (
    <BreadcrumbItem key="ellipsis">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span>
            <BreadcrumbEllipsis {...ellipsisProps}>
              {ellipsisIcon}
            </BreadcrumbEllipsis>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent {...dropdownMenuProps} align="start">
          {collapsed.map((item, idx) => (
            <DropdownMenuItem
              key={item.key}
              onSelect={() => !item.disabled && onChange?.(item.key)}
              disabled={item.disabled}
            >
              {renderItem
                ? renderItem({
                    item,
                    index: itemsBeforeCollapse + idx,
                    isCurrent: currentKey === item.key,
                    isEllipsis: true,
                    onClick: item.disabled
                      ? undefined
                      : () => onChange?.(item.key),
                  })
                : item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </BreadcrumbItem>
  );

  // 组装所有项
  const allItems: React.ReactNode[] = [];
  before.forEach((item, i) => {
    allItems.push(renderBreadcrumbItem(item, i, currentKey === item.key));
    if (i < before.length - 1 || (isCollapsed && before.length > 0)) {
      allItems.push(renderSeparator(i));
    }
  });
  if (isCollapsed) {
    allItems.push(renderEllipsis());
    if (after.length > 0) {
      allItems.push(renderSeparator(before.length + 100));
    }
    after.forEach((item, i) => {
      allItems.push(
        renderBreadcrumbItem(
          item,
          before.length + collapsed.length + i,
          currentKey === item.key
        )
      );
      if (i < after.length - 1) {
        allItems.push(
          renderSeparator(before.length + collapsed.length + i + 1)
        );
      }
    });
  }

  return (
    <BreadcrumbProvider>
      <ShadcnBreadcrumb className={className} style={style}>
        <BreadcrumbList>{allItems}</BreadcrumbList>
      </ShadcnBreadcrumb>
    </BreadcrumbProvider>
  );
};
