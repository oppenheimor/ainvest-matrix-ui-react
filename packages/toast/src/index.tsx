import React, { useEffect, useRef, useState } from "react";
import type { ToastProps } from "./types/types";
import clsx from "clsx";
import { Spinner } from "./components/Spinner";

import {
  DEFAULT_TYPE,
  DEFAULT_CONTENT,
  DEFAULT_DURATION,
  DEFAULT_MAX_WIDTH,
  DEFAULT_MAX_LINE,
  iconSvgMap,
} from "./constant/index";

/**
 * Toast 组件主入口文件
 * 主要功能：定义 Toast 反馈提示的渲染逻辑，支持多类型、自动消失、最大宽度/行数等配置
 * 导出内容：Toast 组件（默认导出）、相关类型
 * 适用场景：全局/页面级操作反馈提示
 */

/**
 * Toast 组件
 * @param type - 提示类型
 * @param content - 展示内容
 * @param duration - 自动关闭时间（ms）
 * @param maxWidth - 最大宽度
 * @param maxLine - 最大显示行数
 * @param className - 自定义类名
 */
export const Toast: React.FC<ToastProps> = ({
  type = DEFAULT_TYPE,
  content = DEFAULT_CONTENT,
  duration = DEFAULT_DURATION,
  maxWidth = DEFAULT_MAX_WIDTH,
  maxLine = DEFAULT_MAX_LINE,
  className,
}) => {
  // 控制可见性
  const [open, setOpen] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 是否为 loading 状态（决定布局和内容样式）
  const isLoading = type === "loading";
  // 是否需要显示图标（type 不为 none 时显示）
  const hasIcon = type !== "none";

  // 自动关闭逻辑
  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => setOpen(false), duration);
      return () => timerRef.current && clearTimeout(timerRef.current);
    }
    return undefined;
  }, [duration]);

  // 早返回：不可见时不渲染
  if (!open) return null;

  // 图标渲染逻辑
  let iconNode: React.ReactNode = null;
  if (isLoading) {
    iconNode = <Spinner size="md" className="text-white" />;
  } else if (hasIcon) {
    const svgNode = iconSvgMap[type] ?? iconSvgMap.success;
    iconNode = svgNode;
  }

  // 公共样式
  const toastWrapperClass = "flex items-center justify-center py-4 pl-4 pr-4 rounded-[20px] shadow-lg bg-[#222] min-w-[120px] min-h-[80px] transition-all duration-300 animate-fade-in box-border";

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={clsx(
        toastWrapperClass,
        isLoading ? "flex-row gap-3" : "flex-col",
        className
      )}
      style={{
        maxWidth,
      }}
    >
      {/* 图标区域 */}
      <div className="shrink-0 mb-2">{iconNode}</div>
      {/* 内容区域 */}
      <div
        className={clsx(
          "text-base font-normal leading-[22px] text-white break-words overflow-hidden text-ellipsis max-w-full",
          isLoading ? "text-left" : "text-center"
        )}
        style={{
          maxWidth,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: maxLine,
        }}
        title={content}
      >
        {content}
      </div>
    </div>
  );
};

export default Toast;