/**
 * @fileoverview Skeleton组件工具函数统一导出
 * @description 提供骨架屏组件所需的核心工具函数，包括样式处理、动画同步、
 *              类名合并等功能。所有工具都经过性能优化和类型安全处理。
 * @author xiayan@myhexin.com
 * @since v1.0.0
 * @example
 * // 导入所需工具
 * import { cn, placeholderAppearances, calculateLineStyles } from '@/utils';
 */

// 样式工具
export { cn } from './clsx';

// 外观配置
export { placeholderAppearances } from './appearances';

// 布局计算
export { calculateLineStyles } from './lineStyles';

// 动画同步
export { shimmerSync, ShimmerSynchronizer } from './shimmerSync';
