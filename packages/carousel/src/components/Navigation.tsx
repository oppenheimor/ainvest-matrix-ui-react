import React from "react";
import { OutsideButtons } from "./OutsideButtons";
import { InsideButtons } from "./InsideButtons";

interface IProps {
  position?: "inside" | "top" | "bottom";
  /** 导航箭头尺寸 */
  size: "medium" | "large" | "auto";
  /** 导航回调函数 */
  onNavigate: (direction: "prev" | "next") => void;
  /** 内部按钮属性 */
  insideButtonsProps: {
    isShowLeftButton: boolean;
    isShowRightButton: boolean;
    xOffset: number;
    yOffset: number;
  };
  /** 外部按钮属性 */
  outsideButtonsProps: {
    isStartDisable: boolean;
    isEndDisable: boolean;
    gap: number;
    groupClassName: string;
  };
}

export const Navigation: React.FC<IProps> = ({
  position,
  size,
  onNavigate,
  insideButtonsProps,
  outsideButtonsProps,
}) => {
  return position === "inside" ? (
    <InsideButtons
      isShowLeftButton={insideButtonsProps.isShowLeftButton}
      isShowRightButton={insideButtonsProps.isShowRightButton}
      onNavigate={onNavigate}
      size={size}
      xOffset={insideButtonsProps.xOffset}
      yOffset={insideButtonsProps.yOffset}
    />
  ) : (
    <OutsideButtons
      onNavigate={onNavigate}
      size={size as "medium" | "large"}
      isStartDisable={outsideButtonsProps.isStartDisable}
      isEndDisable={outsideButtonsProps.isEndDisable}
      gap={outsideButtonsProps.gap}
      groupClassName={outsideButtonsProps.groupClassName}
    />
  );
};
