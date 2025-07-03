import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils/clsx";

const TextTabs = TabsPrimitive.Root;

const TextTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("flex items-center", className)}
    {...props}
  />
));

TextTabsList.displayName = TabsPrimitive.List.displayName;

const TextTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "text-sm text-text-secondary data-[state=active]:text-text-primary data-[state=active]:font-medium",
      className
    )}
    {...props}
  />
));

TextTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TextTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2", className)}
    {...props}
  />
));

TextTabsContent.displayName = TabsPrimitive.Content.displayName;

const TextTabsSeparator = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bg-divider-level1 mx-[10px] h-[12px] shrink-0 w-[1px]",
      className
    )}
    {...props}
  />
);

export {
  TextTabs,
  TextTabsList,
  TextTabsTrigger,
  TextTabsContent,
  TextTabsSeparator,
};
