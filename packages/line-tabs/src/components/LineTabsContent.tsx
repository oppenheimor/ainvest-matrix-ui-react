import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../utils/clsx';

const LineTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-2 flex-grow overflow-y-auto', className)}
    {...props}
  />
));

LineTabsContent.displayName = TabsPrimitive.Content.displayName;

export { LineTabsContent };