'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../utils';
import { ShadcnTooltipProps, TooltipVariant } from '../types';
import {
  TOOLTIP_CLASSES,
  DEFAULT_DELAY_DURATION,
  DEFAULT_SKIP_DELAY_DURATION,
  DEFAULT_OFFSET,
} from '../constants';
import { ArrowIcon } from './Icon';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipPortal = TooltipPrimitive.Portal;

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow ref={ref} asChild {...props}>
    <ArrowIcon className={cn('rotate-180', className)} />
  </TooltipPrimitive.Arrow>
));
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    variant: TooltipVariant;
  }
>(({ className, sideOffset = DEFAULT_OFFSET, variant, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(TOOLTIP_CLASSES.base, TOOLTIP_CLASSES.size, TOOLTIP_CLASSES.variants[variant], className)}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

/**
 * shadcn/ui 风格的基础 Tooltip 组件
 * 使用项目 Token 系统进行样式定制
 * 注意：需要在外层包裹 TooltipProvider
 */
const ShadcnTooltip = React.forwardRef<React.ElementRef<typeof TooltipTrigger>, ShadcnTooltipProps>(
  (
    {
      content,
      children,
      side = 'top',
      trigger = 'hover',
      variant = 'primary',
      showArrow = true,
      delayDuration = DEFAULT_DELAY_DURATION,
      skipDelayDuration = DEFAULT_SKIP_DELAY_DURATION,
      disabled = false,
      open,
      onOpenChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const triggerRef = React.useRef<HTMLElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    // 在 click 模式下，使用 document 监听器处理点击外部
    React.useEffect(() => {
      if (trigger !== 'click' || !isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;

        // 检查是否点击在 trigger 或 content 内部
        if (triggerRef.current?.contains(target) || contentRef.current?.contains(target)) {
          return;
        }

        // 点击外部，关闭 tooltip
        if (!isControlled) {
          setInternalOpen(false);
        }
        onOpenChange?.(false);
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [trigger, isOpen, isControlled, onOpenChange]);

    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        // 在 click 模式下，完全不使用 Radix UI 的状态管理
        if (trigger === 'click') {
          return;
        }

        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [trigger, isControlled, onOpenChange],
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent) => {
        if (trigger === 'click') {
          e.preventDefault();
          e.stopPropagation();

          const newOpen = !isOpen;

          if (!isControlled) {
            setInternalOpen(newOpen);
          }
          onOpenChange?.(newOpen);
        }
      },
      [trigger, isOpen, isControlled, onOpenChange],
    );

    // click 模式下需要禁用默认的 hover/focus 行为
    const disableHoverableContent = trigger === 'click';
    const rootDelayDuration = trigger === 'click' ? 0 : delayDuration;

    return (
      <TooltipRoot
        open={disabled || !content ? false : isOpen}
        onOpenChange={disabled || !content ? undefined : handleOpenChange}
        delayDuration={rootDelayDuration}
        disableHoverableContent={disableHoverableContent}
        {...props}
      >
        <TooltipTrigger
          ref={
            trigger === 'click'
              ? node => {
                  if (typeof ref === 'function') ref(node);
                  else if (ref) ref.current = node;
                  triggerRef.current = node;
                }
              : ref
          }
          asChild
          onClick={trigger === 'click' ? handleClick : undefined}
          onPointerEnter={trigger === 'click' ? e => e.preventDefault() : undefined}
          onPointerLeave={trigger === 'click' ? e => e.preventDefault() : undefined}
          onFocus={trigger === 'hover' ? e => e.preventDefault() : undefined}
        >
          {children}
        </TooltipTrigger>
        {!disabled && content && (
          <TooltipPortal>
            <TooltipContent
              ref={trigger === 'click' ? contentRef : undefined}
              side={side}
              className={className}
              sideOffset={DEFAULT_OFFSET}
              variant={variant}
            >
              {content}
              {showArrow && <TooltipArrow className={cn(TOOLTIP_CLASSES.arrowColors[variant])} />}
            </TooltipContent>
          </TooltipPortal>
        )}
      </TooltipRoot>
    );
  },
);

ShadcnTooltip.displayName = 'ShadcnTooltip';

export {
  ShadcnTooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow,
};
