import * as React from "react";

// Panel 组件的类型定义
export interface IPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  header: React.ReactNode;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
  iconSize?: number;
  className?: string;
}

export interface IPanelRef {
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
  isExpanded: () => boolean;
}

// List 组件的类型定义
type ActionLabel =
  | {
      type: "text";
      expandLabel: string;
      collapseLabel?: string;
      underline?: boolean;
    }
  | {
      type: "custom";
      collapseLabel: React.ReactNode;
      expandLabel: React.ReactNode;
    };

export interface IListProps<T extends { key: string }> {
  /** 数据源 */
  items: T[];
  /** 渲染每个列表项的函数 */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** 初始可见项数量 */
  visibleCount?: number;
  /** 展开按钮和折叠按钮的文本 */
  actionLabel?: ActionLabel;
  /** 是否默认展开全部 */
  defaultExpanded?: boolean;
  /** 展开状态变化时的回调 */
  onExpandChange?: (expanded: boolean) => void;
  /** 列表容器类名 */
  className?: string;
}

export interface IListRef {
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
  isExpanded: () => boolean;
}
