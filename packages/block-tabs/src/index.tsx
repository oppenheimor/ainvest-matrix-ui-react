import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils/clsx";

const BlockTabs = TabsPrimitive.Root;

const BlockTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("flex gap-2.5", className)}
    {...props}
  />
));

BlockTabsList.displayName = TabsPrimitive.List.displayName;

const BlockTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "px-4 py-2 text-base bg-transparent rounded-md hover:opacity-85 active:opacity-60 data-[state=active]:bg-brand-primary-black/5 data-[state=active]:font-bold hover:bg-foreground-layer1_2 text-text-primary",
      className
    )}
    {...props}
  />
));

BlockTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const BlockTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2", className)}
    {...props}
  />
));

BlockTabsContent.displayName = TabsPrimitive.Content.displayName;

export { BlockTabs, BlockTabsList, BlockTabsTrigger, BlockTabsContent };
