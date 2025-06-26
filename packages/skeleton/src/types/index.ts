import * as React from 'react';

// 统一的 Skeleton Props 接口
export type SkeletonProps = {
  /** 骨架屏变体类型 */
  variant?: 'text' | 'minor' | 'avatar' | 'image';
  /** 是否显示光泽动画效果 */
  showShimmer?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 内容行数 (仅 text/minor 变体有效) */
  lineCount?: number;
  /** 每行宽度 (仅 text/minor 变体有效) */
  lineWidths?: (string | number)[] | string | number;
  /** 每行高度 (仅 text/minor 变体有效) */
  lineHeights?: (string | number)[] | string | number;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
