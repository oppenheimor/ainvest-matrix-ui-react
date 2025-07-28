import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../utils/clsx';
import { debounce } from '../utils/debounce';

const LineTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // 获取文字节点的宽度
  const getTextWidth = React.useCallback((): number => {
    if (!triggerRef.current) return 0;

    const textNode = triggerRef.current.firstChild as HTMLElement;
    return textNode ? textNode.offsetWidth : 0;
  }, []);

  // 获取左侧padding值
  const getPaddingLeft = React.useCallback((): number => {
    if (!triggerRef.current) return 0;

    const computedStyle = window.getComputedStyle(triggerRef.current);
    return parseFloat(computedStyle.paddingLeft) || 0;
  }, []);

  // 设置指示器宽度的CSS变量
  const setIndicatorWidth = React.useCallback((width: number) => {
    if (!triggerRef.current) return;

    triggerRef.current.style.setProperty('--content-width', `${width}px`);
  }, []);

  // 设置指示器位置的CSS变量
  const setIndicatorPosition = React.useCallback((position: number) => {
    if (!triggerRef.current) return;

    triggerRef.current.style.setProperty('--indicator-left', `${position}px`);
  }, []);

  // 更新指示器的宽度和位置
  const updateIndicatorWidthAndPosition = React.useCallback(() => {
    const textWidth = getTextWidth();
    if (textWidth > 0) {
      // 设置指示器宽度
      setIndicatorWidth(textWidth);

      // 计算并设置指示器位置
      const paddingLeft = getPaddingLeft();
      const leftPosition = paddingLeft + (textWidth / 2);
      setIndicatorPosition(leftPosition);
    }
  }, [getTextWidth, getPaddingLeft, setIndicatorPosition, setIndicatorWidth]);

  // 创建防抖版本的更新函数
  const debouncedUpdate = React.useMemo(
    () => debounce(updateIndicatorWidthAndPosition, 100),
    [updateIndicatorWidthAndPosition]
  );

  React.useEffect(() => {
    // 组件挂载时和窗口大小变化时更新指示器
    updateIndicatorWidthAndPosition();
    window.addEventListener('resize', debouncedUpdate);
    return () => window.removeEventListener('resize', debouncedUpdate);
  }, [updateIndicatorWidthAndPosition, debouncedUpdate]);

  // 使用 React.useImperativeHandle 处理 ref 合并
  React.useImperativeHandle(ref, () => triggerRef.current);

  return (
    <TabsPrimitive.Trigger
      ref={triggerRef}
      className={cn(
        'relative px-6 pt-2 pb-[13px] text-text-primary whitespace-nowrap overflow-hidden',
        // 指示器样式：绝对定位的元素，高度3px
        'after:absolute after:content-[""] after:h-[3px]',
        // 指示器水平居中定位：使用CSS变量控制位置
        'after:left-[var(--indicator-left)] after:translate-x-[-50%] after:bottom-0',
        // 激活状态下的指示器样式：背景色和宽度
        'data-[state=active]:after:bg-text-primary data-[state=active]:after:w-[var(--content-width)]',
        // 控制第一个tab的左边距为0
        '[&:first-child]:pl-0',
        // 移动端优化：增加触摸目标大小
        'md:touch-pan-x',
        className
      )}
      {...props}
    >
      <span className="inline-block">{children}</span>
    </TabsPrimitive.Trigger>
  );
});

LineTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export { LineTabsTrigger };