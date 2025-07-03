import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils/clsx";

const PillTabs = TabsPrimitive.Root;

const PillTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("inline-flex", className)}
    {...props}
  />
));

PillTabsList.displayName = TabsPrimitive.List.displayName;

const PillTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "h-9 inline-flex justify-center items-center px-4",
      "[&:not(:first-child)]:ml-3",
      "text-base font-medium rounded-full",
      "data-[state=inactive]:bg-black/5 data-[state=inactive]:dark:bg-white/20 data-[state=inactive]:text-black data-[state=inactive]:dark:text-white",
      "data-[state=active]:bg-black data-[state=active]:dark:bg-white data-[state=active]:text-white data-[state=active]:dark:text-black  hover:bg-hover-5",
      className
    )}
    {...props}
  />
));

PillTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const PillTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2", className)}
    {...props}
  />
));

PillTabsContent.displayName = TabsPrimitive.Content.displayName;

export { PillTabs, PillTabsList, PillTabsTrigger, PillTabsContent };
