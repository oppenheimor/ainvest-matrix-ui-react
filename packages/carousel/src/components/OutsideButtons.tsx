import { ArrowIcon } from "./icon/ArrowIcon";
import { useMouseEnter } from "../hooks/useMouseEnter";
import { cn } from "../utils/clsx";

interface IProps {
  onNavigate: (direction: "prev" | "next") => void;
  size: "medium" | "large";
  isStartDisable: boolean;
  isEndDisable: boolean;
  gap: number;
  groupClassName: string;
}

export const OutsideButtons = ({
  onNavigate,
  size,
  isStartDisable,
  isEndDisable,
  gap,
  groupClassName,
}: IProps) => {
  const {
    leftArrowHover,
    rightArrowHover,
    handleArrowMouseEnter,
    handleArrowMouseLeave,
  } = useMouseEnter();
  return (
    <div className={cn("flex items-center justify-end", groupClassName)}>
      {/* 左侧按钮 */}
      <button
        onClick={() => onNavigate("prev")}
        onMouseEnter={() => handleArrowMouseEnter("prev")}
        onMouseLeave={() => handleArrowMouseLeave("prev")}
      >
        <ArrowIcon
          type="outside"
          direction="left"
          size={size}
          isPressed={leftArrowHover}
          disabled={isStartDisable}
        />
      </button>
      {/* 右侧按钮 */}
      <button
        onClick={() => onNavigate("next")}
        onMouseEnter={() => handleArrowMouseEnter("next")}
        onMouseLeave={() => handleArrowMouseLeave("next")}
        style={{ marginLeft: -16 + gap }}
      >
        <ArrowIcon
          type="outside"
          direction="right"
          size={size}
          isPressed={rightArrowHover}
          disabled={isEndDisable}
        />
      </button>
    </div>
  );
};
