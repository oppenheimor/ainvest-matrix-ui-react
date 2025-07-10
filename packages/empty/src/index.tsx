"use client";

import React from "react";
import { cn } from "./utils/clsx";
import {
  NetworkError,
  SearchEmpty,
  NoData,
  ServerError,
} from "./components/Icons";
import { EmptyProps, EmptyType, EmptyLevel } from "./types";
import { Button } from "../../button";

const iconVariants = {
  [EmptyType.NetworkError]: NetworkError,
  [EmptyType.SearchEmpty]: SearchEmpty,
  [EmptyType.NoData]: NoData,
  [EmptyType.ServerError]: ServerError,
};

function renderAction(
  level: EmptyLevel | keyof typeof EmptyLevel,
  customAction: React.ReactNode,
  actionButtonText: string
) {
  // 用户自定义的 action 优先级最高
  if (customAction) {
    return customAction;
  }

  // 默认的页面缺省图
  if (level === EmptyLevel.Page) {
    // 页面默认缺省图需要做响应式适配
    return (
      <Button className="h-9 min-w-[76px] px-4 text-sm @sm:h-11 @sm:min-w-[90px] @sm:px-5 @sm:text-base">
        {actionButtonText}
      </Button>
    );
  }

  // 默认的模块缺省图
  if (level === EmptyLevel.Module) {
    return <Button variant="secondary">{actionButtonText}</Button>;
  }

  return null;
}

export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      className,
      level = EmptyLevel.Module,
      iconType = EmptyType.NoData,
      title,
      description,
      size = 96,
      showAction = true,
      customAction,
      actionButtonText,
      onClickAction,
      ...props
    },
    ref
  ) => {
    // 只有当 type 不是 None 时才获取图标组件
    const IconComponent =
      iconType !== EmptyType.None ? iconVariants[iconType] : null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col justify-center items-center max-w-[570px]",
          className
        )}
        {...props}
      >
        {/* 图标 */}
        {IconComponent && (
          <div>
            <IconComponent size={size} />
          </div>
        )}
        {/* 标题 */}
        {title && (
          <h3 className="mt-2 text-base @sm:text-2xl font-semibold leading-7 text-center text-text-primary">
            {title}
          </h3>
        )}
        {/* 描述 */}
        {description && (
          <p className="mt-2 text-sm text-center text-text-secondary leading-[18px]">
            {description}
          </p>
        )}
        {/* 操作按钮 */}
        {showAction && (
          <div className="mt-6" onClick={onClickAction}>
            {renderAction(level, customAction, actionButtonText)}
          </div>
        )}
      </div>
    );
  }
);

Empty.displayName = "Empty";

export { EmptyType, EmptyLevel };
