"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "lucide-react";
import clsx from "clsx";

interface DropdownMenuProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Root> {
  trigger?: "click" | "hover";
}

// Context for sharing hover state between trigger and content
interface DropdownMenuContextValue {
  trigger: "click" | "hover";
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const createDefaultRoot = () => {
  let layer = document.getElementById("dropdown-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "dropdown-layer";
    Object.assign(layer.style, {
      position: "fixed",
      zIndex: "100",
      top: "0",
      left: "0",
      width: "100%",
      height: "0", // 不影响布局
      // pointerEvents: "none", // 不抢事件
    });
    document.body.appendChild(layer);
  }
};

const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null);

function DropdownMenu({ trigger = "hover", ...props }: DropdownMenuProps) {
  // 创建一个root
  createDefaultRoot();
  const [isOpen, setIsOpen] = React.useState(false);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout>();

  // 统一的状态管理函数，确保 hover 模式下也能触发外部 onOpenChange
  const handleInternalStateChange = React.useCallback(
    (newOpen: boolean) => {
      setIsOpen(newOpen);
      // 在 hover 模式下，确保外部 onOpenChange 也能被调用
      if (trigger === "hover" && props.onOpenChange) {
        props.onOpenChange(newOpen);
      }
    },
    [trigger, props.onOpenChange]
  );

  // hover 模式下的控制逻辑
  const open = trigger === "hover" ? isOpen : props.open;
  const onOpenChange =
    trigger === "hover" ? handleInternalStateChange : props.onOpenChange;

  const handleMouseEnter = React.useCallback(() => {
    if (trigger === "hover") {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      handleInternalStateChange(true);
    }
  }, [trigger, handleInternalStateChange]);

  const handleMouseLeave = React.useCallback(() => {
    if (trigger === "hover") {
      // 延迟关闭，给用户时间移动到 content
      hoverTimeoutRef.current = setTimeout(() => {
        handleInternalStateChange(false);
      }, 100);
    }
  }, [trigger, handleInternalStateChange]);

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <DropdownMenuContext.Provider
      value={{ trigger, isOpen, setIsOpen: handleInternalStateChange }}
    >
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <DropdownMenuPrimitive.Root
          data-slot="dropdown-menu"
          {...props}
          open={open}
          onOpenChange={onOpenChange}
          modal={trigger === "hover" ? false : props.modal}
        />
      </div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  onClick,
  onPointerDown,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  const context = React.useContext(DropdownMenuContext);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // 调用原始的 onClick 处理函数
      onClick?.(event);
    },
    [onClick]
  );

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      // 当 trigger 为 hover 且菜单已打开时，阻止点击关闭
      if (context && context.trigger === "hover" && context.isOpen) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // 调用原始的 onPointerDown 处理函数
      onPointerDown?.(event);
    },
    [context, onPointerDown]
  );

  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  const root = document.getElementById("dropdown-layer");
  const context = React.useContext(DropdownMenuContext);

  const handleMouseEnter = React.useCallback(() => {
    if (context && context.trigger === "hover") {
      context.setIsOpen(true);
    }
  }, [context]);

  const handleMouseLeave = React.useCallback(() => {
    if (context && context.trigger === "hover") {
      context.setIsOpen(false);
    }
  }, [context]);

  return (
    <DropdownMenuPrimitive.Portal container={root}>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        className={clsx(
          "overflow-x-hidden overflow-y-auto rounded-2xl border border-divider-level3 py-[12px]",
          "bg-background-layer4 text-text-primary",
          "shadow-[0_2px_8px_0_rgba(0,0,0,0.15)]",
          "max-h-[min(var(--radix-dropdown-menu-content-available-height),400px)] origin-(--radix-dropdown-menu-content-transform-origin)",
          "[&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-background-layer4 [&::-webkit-scrollbar-thumb]:bg-grey-80 [&::-webkit-scrollbar-track]:my-[12px] [&::-webkit-scrollbar-track]:mr-[2px] [&::-webkit-scrollbar-thumb]:rounded-2xl [&::-webkit-scrollbar-thumb:hover]:bg-grey-50",
          className
        )}
        sideOffset={sideOffset}
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          props.onCloseAutoFocus?.(e);
        }}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={clsx(
        "cursor-pointer outline-none select-none px-[20px] py-[8px] text-[14px] leading-[18px] focus:outline-none focus-visible:outline-none",
        "hover:bg-hover-5",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={clsx(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none focus:outline-none focus-visible:outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  type?: "checkTick" | "circle";
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={clsx(
        "flex justify-between items-center cursor-pointer outline-none select-none px-[20px] py-[8px] text-[14px] leading-[18px] focus:outline-none focus-visible:outline-none hover:bg-hover-5",
        className
      )}
      {...props}
    >
      {children}
      <span className="flex justify-center items-center pointer-events-none">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="w-5 h-5 text-text-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={clsx(
        "px-[20px] py-[8px] text-[12px] leading-[16px] text-text-secondary",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={clsx("bg-divider-level3 h-[1px] my-[8px]", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={clsx(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      className={clsx(
        "cursor-default px-[20px] py-[8px] text-[14px] leading-[18px] outline-none focus:outline-none focus-visible:outline-none",
        "data-[state=open]:bg-hover-5 data-[state=open]:text-text-primary select-none cursor-pointer",
        "hover:bg-hover-5",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={clsx(
        "border py-[12px] bg-background-layer4 text-text-primary rounded-2xl border-divider-level3",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50",
        "min-w-[120px] max-w-[300px] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden",
        "shadow-[0_2px_8px_0_rgba(0,0,0,0.15)]",
        "max-h-[min(var(--radix-dropdown-menu-content-available-height),400px)] origin-(--radix-dropdown-menu-content-transform-origin)",
        "[&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-background-layer4 [&::-webkit-scrollbar-thumb]:bg-grey-80 [&::-webkit-scrollbar-track]:my-[12px] [&::-webkit-scrollbar-track]:mr-[2px] [&::-webkit-scrollbar-thumb]:rounded-2xl [&::-webkit-scrollbar-thumb:hover]:bg-grey-50",
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
