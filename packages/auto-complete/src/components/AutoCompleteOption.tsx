import React from "react";
import MiddleTruncate from "react-truncate-inside";
import { cn } from "../utils/clsx";
import { AutoCompleteOption } from "../types";

interface AutoCompleteOptionProps {
  option: AutoCompleteOption;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  truncateOffset?: number;
}

/**
 * 中间截断文本组件
 * 使用 react-truncate-inside 库，支持中间省略号截断，动态适应容器宽度
 */
const MiddleTruncatedText: React.FC<{ text: string; offset: number }> = ({ text, offset }) => {
  return (
    <MiddleTruncate text={text} offset={offset} />
  );
};

export const AutoCompleteOptionComponent: React.FC<AutoCompleteOptionProps> = ({
  option,
  isActive,
  onClick,
  onMouseEnter,
  truncateOffset = 8,
}) => {
  const displayText = (option.label || option.value) as string;

  return (
    <div
      className={cn(
        "cursor-pointer outline-none select-none px-[20px] py-[8px] text-[14px] leading-[18px] focus:outline-none focus-visible:outline-none",
        "hover:bg-hover-5",
        "w-full", // 确保使用父容器的完整宽度
        isActive && "bg-hover-5"
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <MiddleTruncatedText text={displayText} offset={truncateOffset} />
    </div>
  );
};