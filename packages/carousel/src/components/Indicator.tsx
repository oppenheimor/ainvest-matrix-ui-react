import { ActiveDotIcon, InactiveDotIcon } from "./icon/DotsIcon";
import { LineIcon } from "./icon/LineIcon";

export const Indicator = (props: {
  indicatorCount: number;
  indicator: "dots" | "line" | ((currentIndex: number) => React.ReactNode);
  currentIndex: number;
  onIndicatorClick: (index: number) => void;
}) => {
  const { indicatorCount, indicator, currentIndex, onIndicatorClick } = props;
  if (indicator !== "dots" && indicator !== "line") {
    return (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 flex justify-center">
        {indicator(currentIndex)}
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center">
      {indicator === "dots" ? (
        <div className="flex items-center gap-2">
          {Array.from({ length: indicatorCount }).map((_, index) => (
            <button key={index} onClick={() => onIndicatorClick(index)}>
              {index === currentIndex ? <ActiveDotIcon /> : <InactiveDotIcon />}
            </button>
          ))}
        </div>
      ) : (
        <LineIcon total={indicatorCount} current={currentIndex} />
      )}
    </div>
  );
};
