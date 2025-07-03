'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from './utils/clsx';

const SegmentTabs = TabsPrimitive.Root;

const SegmentTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex justify-center items-center p-1 h-9 rounded-full bg-[#F2F2F2] dark:bg-[#292929]',
      className,
    )}
    {...props}
  />
));
SegmentTabsList.displayName = TabsPrimitive.List.displayName;

const SegmentTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [width, setWidth] = React.useState<number>(0);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useLayoutEffect(() => {
    const parent = triggerRef.current?.parentElement;
    if (!parent) return;

    // 使用 requestAnimationFrame 确保在下一帧渲染前计算宽度
    requestAnimationFrame(() => {
      const triggers = Array.from(parent.children) as HTMLElement[];
      const maxWidth = Math.max(
        ...triggers.map((trigger) => trigger.getBoundingClientRect().width),
      );
      setWidth(maxWidth);
      setIsVisible(true);
    });
  }, []);

  // 使用 React.useImperativeHandle 处理 ref 合并
  React.useImperativeHandle(ref, () => triggerRef.current as any);

  return (
    <TabsPrimitive.Trigger
      ref={triggerRef}
      style={{ 
        width: width || 'auto',
        visibility: isVisible ? 'visible' : 'hidden',
        // 保持占位，避免布局跳变
        minWidth: '1px'
      }}
      className={cn(
        'relative h-7 px-3 py-[6px] inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm text-text-primary font-medium',
        'transition-all duration-300 ease-in-out',
        'data-[state=active]:bg-white data-[state=active]:dark:bg-white/20',
        className,
      )}
      {...props}
    />
  );
});
SegmentTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const SegmentTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-2', className)}
    {...props}
  />
));
SegmentTabsContent.displayName = TabsPrimitive.Content.displayName;

export { SegmentTabs, SegmentTabsList, SegmentTabsTrigger, SegmentTabsContent };
