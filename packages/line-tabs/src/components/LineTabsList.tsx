import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../utils/clsx';

const LineTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex overflow-x-auto scrollbar-hide flex-shrink-0',
      // Hide scrollbar for Chrome, Safari and Opera
      '[&::-webkit-scrollbar]:hidden',
      // Hide scrollbar for IE, Edge and Firefox
      '[-ms-overflow-style:none]',
      '[scrollbar-width:none]',
      className
    )}
    {...props}
  />
));

LineTabsList.displayName = TabsPrimitive.List.displayName;

export { LineTabsList };