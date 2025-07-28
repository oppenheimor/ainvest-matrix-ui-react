import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../utils/clsx';

const LineTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn('overflow-hidden flex flex-col', className)}
    {...props}
  />
));

LineTabs.displayName = TabsPrimitive.Root.displayName;

export { LineTabs };