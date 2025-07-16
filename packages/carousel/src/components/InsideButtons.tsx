import { useMouseEnter } from "../hooks/useMouseEnter";
import { ArrowIcon } from "./icon/ArrowIcon";

interface IProps {
  isShowLeftButton: boolean;
  isShowRightButton: boolean;
  onNavigate: (direction: "prev" | "next") => void;
  size: "medium" | "large" | "auto";
  xOffset: number;
  yOffset: number;
}

export const InsideButtons = (props: IProps) => {
  const {
    isShowLeftButton,
    isShowRightButton,
    onNavigate,
    size,
    xOffset,
    yOffset,
  } = props;
  const {
    leftArrowHover,
    rightArrowHover,
    handleArrowMouseEnter,
    handleArrowMouseLeave,
  } = useMouseEnter();

  if (size === "auto") {
    return (
      <>
        {isShowLeftButton && (
          <button
            onClick={() => onNavigate("prev")}
            onMouseEnter={() => handleArrowMouseEnter("prev")}
            onMouseLeave={() => handleArrowMouseLeave("prev")}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 h-full"
          >
            <ArrowIcon
              direction="left"
              size={size}
              isPressed={leftArrowHover}
            />
          </button>
        )}
        {isShowRightButton && (
          <button
            onClick={() => onNavigate("next")}
            onMouseEnter={() => handleArrowMouseEnter("next")}
            onMouseLeave={() => handleArrowMouseLeave("next")}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 h-full"
          >
            <ArrowIcon
              direction="right"
              size={size}
              isPressed={rightArrowHover}
            />
          </button>
        )}
      </>
    );
  }

  return (
    <>
      {isShowLeftButton && (
        <button
          onClick={() => onNavigate("prev")}
          onMouseEnter={() => handleArrowMouseEnter("prev")}
          onMouseLeave={() => handleArrowMouseLeave("prev")}
          className="absolute transform -translate-y-1/2 z-10"
          style={{
            left: size === "large" ? -32 - xOffset : -24 - xOffset,
            top: `calc(50% - ${yOffset}px)`,
          }}
        >
          <ArrowIcon direction="left" size={size} isPressed={leftArrowHover} />
        </button>
      )}
      {isShowRightButton && (
        <button
          onClick={() => onNavigate("next")}
          onMouseEnter={() => handleArrowMouseEnter("next")}
          onMouseLeave={() => handleArrowMouseLeave("next")}
          className="absolute transform -translate-y-1/2 z-10"
          style={{
            right: size === "large" ? -32 - xOffset : -24 - xOffset,
            top: `calc(50% - ${yOffset}px)`,
          }}
        >
          <ArrowIcon
            direction="right"
            size={size}
            isPressed={rightArrowHover}
          />
        </button>
      )}
    </>
  );
};
