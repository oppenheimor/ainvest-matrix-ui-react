import * as React from 'react';
import { PopoverRoot, PopoverTrigger, PopoverContent, PopoverArrow } from './components/shadcn-popover';
import { cn } from './utils';
import { VARIANT_CONFIG, BASE_STYLES, DEFAULT_CONFIG, getVariantConfig } from './constants';
import type { PopoverProps, PopoverRef } from './types';

/**
 * Popover 组件
 * 基于 shadcn/ui 的卡片式弹框组件，支持标题和内容配置
 */
const Popover = React.forwardRef<PopoverRef, PopoverProps>(
  (
    {
      children,
      content,
      title,
      placement = DEFAULT_CONFIG.placement,
      open,
      defaultOpen = false,
      onOpenChange,
      className,
      showArrow = DEFAULT_CONFIG.showArrow,
      closeOnClickOutside = DEFAULT_CONFIG.closeOnClickOutside,
      closeOnClickInside = DEFAULT_CONFIG.closeOnClickInside,
      ...props
    },
    ref,
  ) => {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    // 处理开启状态变化
    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange],
    );

    // 关闭弹框的方法
    const close = React.useCallback(() => {
      handleOpenChange(false);
    }, [handleOpenChange]);

    // 处理内容点击
    const handleContentClick = React.useCallback(
      (e: React.MouseEvent) => {
        if (closeOnClickInside) {
          close();
        }
      },
      [closeOnClickInside, close],
    );

    // 渲染内容
    const renderContent = React.useCallback(() => {
      return content;
    }, [content]);

    // 直接使用 primary 变体配置
    const variantConfig = getVariantConfig('primary');

    // 暴露给 ref 的方法
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
        close,
      }),
      [handleOpenChange, close],
    );

    return (
      <PopoverRoot open={isOpen} onOpenChange={handleOpenChange} {...props}>
        <PopoverTrigger ref={triggerRef} asChild>
          {children}
        </PopoverTrigger>
        <PopoverContent
          side={placement}
          sideOffset={DEFAULT_CONFIG.sideOffset}
          className={cn(
            className,
            // 应用变体特定的容器阴影
            variantConfig.containerShadow,
          )}
          onInteractOutside={
            closeOnClickOutside
              ? undefined
              : e => {
                  e.preventDefault();
                }
          }
        >
          <div className={cn(BASE_STYLES, variantConfig.container)} onClick={handleContentClick}>
            {title && <div className={variantConfig.title}>{title}</div>}
            <div className={variantConfig.content}>{renderContent()}</div>
          </div>
          {showArrow && <PopoverArrow className={variantConfig.arrowColor} />}
        </PopoverContent>
      </PopoverRoot>
    );
  },
);

Popover.displayName = 'Popover';

export default Popover;
export type { PopoverProps, PopoverRef };
