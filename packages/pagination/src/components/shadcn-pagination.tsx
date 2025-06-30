import * as React from "react";
import { LeftIcon, RightIcon, EllipsisIcon } from "./Icons";

import { cn } from "../lib/utils";
import { PaginationLinkProps } from "../types";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("flex justify-center mx-auto w-full", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

/**
 * 分页项的列表容器
 */
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row gap-1 items-center", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

/**
 * 包裹每个分页链接的列表项
 */
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

/**
 * 可点击的分页链接元素
 */
const PaginationLink = ({
  className,
  isActive,
  disabled,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    aria-disabled={disabled}
    className={cn(
      "flex justify-center items-center w-10 h-10 text-base leading-snug rounded-md cursor-pointer select-none",
      {
        "font-semibold bg-background-layer1 text-text-primary": isActive,
        "font-normal text-text-primary hover:bg-hover-5": !isActive,
        "text-text-quaternary/20": disabled,
      },
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

/**
 * "上一页"按钮
 */
const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("p-0 w-10 h-10 border border-divider-level2", className, {
      "hover:bg-hover-5": !disabled,
      "hover:bg-transparent": disabled,
    })}
    disabled={disabled}
    {...props}
  >
    <LeftIcon
      className={cn({
        "text-text-quaternary": disabled,
        "text-text-primary": !disabled,
      })}
    />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

/**
 * "下一页"按钮
 */
const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("p-0 w-10 h-10 border border-divider-level2", className, {
      "hover:bg-hover-5": !disabled,
      "hover:bg-transparent": disabled,
    })}
    disabled={disabled}
    {...props}
  >
    <RightIcon
      className={cn({
        "text-text-quaternary": disabled,
        "text-text-primary": !disabled,
      })}
    />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

/**
 * 分页省略号的占位符
 */
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex justify-center items-center w-10 h-10 text-text-primary",
      className
    )}
    {...props}
  >
    <EllipsisIcon />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
