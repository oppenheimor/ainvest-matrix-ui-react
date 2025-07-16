import { ArrowRightIcon, ArrowUpIcon } from "./IconForList";
import { cn } from "../utils/clsx";
import { IListProps } from "../types";
import React from "react";

type ActionLabel = NonNullable<IListProps<{ key: string }>["actionLabel"]>;

interface IProps {
  expanded: boolean;
  actionLabel: ActionLabel;
  handleToggle: () => void;
}

export const ActionLabel: React.FC<IProps> = ({
  expanded,
  actionLabel,
  handleToggle,
}) => {
  const isShowCollapseLabel =
    actionLabel.type === "custom" ||
    (actionLabel.type === "text" && actionLabel.collapseLabel);

  if (!isShowCollapseLabel && expanded) return null;

  if (actionLabel.type === "text") {
    return (
      <span
        onClick={handleToggle}
        className={cn(
          "cursor-pointer h-[58px] flex items-center ml-4 text-sm leading-[18px] gap-1",
          actionLabel.underline && "hover:underline underline-offset-2"
        )}
      >
        {expanded ? actionLabel.collapseLabel : actionLabel.expandLabel}
        {expanded ? <ArrowUpIcon /> : <ArrowRightIcon />}
      </span>
    );
  }

  const element = expanded
    ? actionLabel.collapseLabel
    : actionLabel.expandLabel;
  return React.cloneElement(element as React.ReactElement, {
    onClick: handleToggle,
    className: cn(
      "text-sm cursor-pointer",
      (element as React.ReactElement).props.className
    ),
  });
};
