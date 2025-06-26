/**
 * @fileoverview 骨架屏外观样式配置
 * 使用class-variance-authority实现类型安全的变体样式
 */

import { cva } from 'class-variance-authority';
import { SKELETON_VARIANTS } from '../constants';

/**
 * 骨架屏占位符外观样式
 * 统一的灰色背景 + 响应式主题切换 + 四种预设变体
 */
export const placeholderAppearances = cva('bg-grey-95 dark:bg-grey-90', {
  variants: {
    variant: SKELETON_VARIANTS,
  },
  defaultVariants: {
    variant: 'text',
  },
});
