import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "./utils/clsx";
import LinkLabelIcon from "./components/LinkLabelIcon";
import ArrowRightIcon from "./components/ArrowRightIcon";
import { LinkProps } from "./types";

const linkVariants = cva(
  "inline-flex items-center align-bottom gap-1 hover:text-[#1454E5] dark:hover:text-[#2E66E5]",
  {
    variants: {
      emphasized: {
        true: "text-text-aime",
        false: "text-text-primary",
      },
      underline: {
        true: "underline underline-offset-4",
        false: "no-underline",
      },
      strong: {
        true: "font-medium",
        false: "font-normal",
      },
    },
    defaultVariants: {
      emphasized: false,
      underline: false,
      strong: false,
    },
  }
);

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      emphasized = false,
      underline = false,
      strong = false,
      showLinkIcon = false,
      leftIcon,
      showArrowIcon = false,
      rightIcon,
      children,
      iconSize = 16,
      ...props
    },
    ref
  ) => {
    const renderLeftIcon = () => {
      if (showLinkIcon) return <LinkLabelIcon iconSize={iconSize} />;
      if (leftIcon) return <span>{leftIcon}</span>;
      return null;
    };
    const renderRightIcon = () => {
      if (showArrowIcon) return <ArrowRightIcon iconSize={iconSize} />;
      if (rightIcon) return <span>{rightIcon}</span>;
      return null;
    };
    return (
      <a
        className={cn(
          linkVariants({ emphasized, underline, strong }),
          className
        )}
        ref={ref}
        {...props}
      >
        {renderLeftIcon()}
        <span>{children}</span>
        {renderRightIcon()}
      </a>
    );
  }
);
Link.displayName = "Link";
