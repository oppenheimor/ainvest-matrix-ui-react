import React from "react";
import { cn } from "../utils/clsx";
import { AutoCompleteOption } from "../types";

interface AutoCompleteOptionProps {
  option: AutoCompleteOption;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

export const AutoCompleteOptionComponent: React.FC<AutoCompleteOptionProps> = ({
  option,
  isActive,
  onClick,
  onMouseEnter,
}) => {
  return (
    <div
      className={cn(
        "cursor-pointer outline-none select-none px-[20px] py-[8px] text-[14px] leading-[18px] focus:outline-none focus-visible:outline-none",
        "hover:bg-hover-5",
        isActive && "bg-hover-5"
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {option.label || option.value}
    </div>
  );
};