import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from './utils/clsx';

const LineTabs = TabsPrimitive.Root;

const LineTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn('flex', className)} {...props} />
));

LineTabsList.displayName = TabsPrimitive.List.displayName;

const LineTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const updateIndicatorWidth = () => {
      if (triggerRef.current) {
        // calculate text width
        const textNode = triggerRef.current.firstChild as HTMLElement;
        if (textNode) {
          const textWidth = textNode.offsetWidth;
          triggerRef.current.style.setProperty(
            '--content-width',
            `${textWidth}px`,
          );
          console.log(`textWidth, ${textWidth}`);
        }
      }
    };

    updateIndicatorWidth();
    window.addEventListener('resize', updateIndicatorWidth);
    return () => window.removeEventListener('resize', updateIndicatorWidth);
  }, []);

  // 使用 React.useImperativeHandle 处理 ref 合并
  React.useImperativeHandle(ref, () => triggerRef.current as any);

  return (
    <TabsPrimitive.Trigger
      ref={triggerRef}
      className={cn(
        'relative px-6 pt-2 pb-[10px] text-text-primary',
        'after:absolute after:content-[""] after:h-[3px]',
        'after:left-[50%] after:translate-x-[-50%] after:bottom-[-2px]',
        'data-[state=active]:after:bg-primary data-[state=active]:after:w-[var(--content-width)]',
        className,
      )}
      {...props}
    >
      <span className="inline-block">{children}</span>
    </TabsPrimitive.Trigger>
  );
});

LineTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const LineTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-2', className)}
    {...props}
  />
));

LineTabsContent.displayName = TabsPrimitive.Content.displayName;

export { LineTabs, LineTabsList, LineTabsTrigger, LineTabsContent };
