'use client';

import * as React from 'react';
import { cn } from './utils';
import { ShadcnTooltip, TooltipProvider } from './components/shadcn-tooltip';
import { CloseIcon } from './components/Icon';
import { TooltipProps, TooltipRef } from './types';
import {
  DEFAULT_DELAY_DURATION,
  DEFAULT_SKIP_DELAY_DURATION,
  TOOLTIP_CLASSES,
  TOOLTIP_ARIA,
} from './constants';

/**
 * Tooltip 基础组件
 *
 * 基于 Radix UI 实现，提供以下功能：
 * - 多种触发方式（hover、focus、click）
 * - 可选的关闭按钮
 * - 自动关闭计时器
 * - 文本截断处理
 * - 响应式设计
 * - 完整的可访问性支持
 * - 项目 Token 样式系统

 */
const Tooltip = React.forwardRef<TooltipRef, TooltipProps>(
  (
    {
      content,
      children,
      placement = 'top',
      trigger = 'hover',
      variant = 'neutral',
      closable = false,
      showArrow = true,
      disabled = false,
      delayDuration = DEFAULT_DELAY_DURATION,
      hideDelayDuration = DEFAULT_SKIP_DELAY_DURATION,
      autoCloseDelayDuration = 0,
      open: controlledOpen,
      onOpenChange,
      onClose,
      className,
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [autoCloseTimerId, setAutoCloseTimerId] = React.useState<NodeJS.Timeout | null>(null);
    const triggerRef = React.useRef<HTMLElement>(null);

    // 使用受控或非受控状态
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    // 处理显示状态变化
    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);

        // 管理自动关闭计时器
        if (autoCloseTimerId) {
          clearTimeout(autoCloseTimerId);
          setAutoCloseTimerId(null);
        }

        if (newOpen && autoCloseDelayDuration > 0) {
          const timerId = setTimeout(() => {
            handleClose();
          }, autoCloseDelayDuration);
          setAutoCloseTimerId(timerId);
        }
      },
      [isControlled, onOpenChange, autoCloseDelayDuration, autoCloseTimerId],
    );

    // 处理关闭
    const handleClose = React.useCallback(() => {
      handleOpenChange(false);
      onClose?.();
    }, [handleOpenChange, onClose]);

    // 关闭按钮点击处理
    const handleCloseButtonClick = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      },
      [handleClose],
    );

    // 暴露 ref 方法
    React.useImperativeHandle(
      ref,
      () => ({
        nativeElement: triggerRef.current,
        focus: () => {
          triggerRef.current?.focus();
        },
        open: () => {
          handleOpenChange(true);
        },
        close: () => {
          handleClose();
        },
      }),
      [handleOpenChange, handleClose],
    );

    // 清理计时器
    React.useEffect(() => {
      return () => {
        if (autoCloseTimerId) {
          clearTimeout(autoCloseTimerId);
        }
      };
    }, [autoCloseTimerId]);

    // 构建内容
    const enhancedContent = React.useMemo(() => {
      if (!content) {
        return null;
      }

      if (!closable) {
        return (
          <div className={cn(TOOLTIP_CLASSES.content)}>
            <div className={cn(TOOLTIP_CLASSES.text)}>{content}</div>
          </div>
        );
      }

      return (
        <div className={cn(TOOLTIP_CLASSES.closableContent)}>
          <div className={cn(TOOLTIP_CLASSES.text, 'flex-1')}>{content}</div>
          <button
            type="button"
            onClick={handleCloseButtonClick}
            className={cn(TOOLTIP_CLASSES.closeButton)}
            aria-label={TOOLTIP_ARIA.closeButtonLabel}
          >
            <CloseIcon />
          </button>
        </div>
      );
    }, [content, closable, handleCloseButtonClick]);

    const clonedChildren = React.cloneElement(children, {
      ref: triggerRef,
    });

    return (
      <TooltipProvider delayDuration={delayDuration} skipDelayDuration={hideDelayDuration}>
        <ShadcnTooltip
          content={enhancedContent}
          side={placement}
          trigger={trigger}
          variant={variant}
          showArrow={showArrow}
          disabled={disabled || !content}
          open={open}
          onOpenChange={handleOpenChange}
          className={className}
          delayDuration={delayDuration}
          skipDelayDuration={hideDelayDuration}
        >
          {clonedChildren}
        </ShadcnTooltip>
      </TooltipProvider>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
export { Tooltip };
export type { TooltipProps, TooltipVariant, TooltipRef } from './types';
