import * as React from "react";

export interface TextCollapseProps {
  /** 文本内容 */
  text: string;
  /** 折叠时显示的行数 */
  rows?: number;
  /** 默认是否展开 */
  defaultExpanded?: boolean;
  /** 展开状态变化回调 */
  onExpandChange?: (expanded: boolean) => void;
  /** 展开按钮 */
  expandLabel: React.ReactNode;
  /** 收起按钮，如果不传则无法收起 */
  collapseLabel?: React.ReactNode;
  /** 自定义样式类名 */
  className?: string;
}

export interface MeasureTextProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface MeasureTextRef {
  isExceed: () => boolean;
  getHeight: () => number;
}
