/**
 * @fileoverview Skeleton组件模块统一导出
 * @description 导出骨架屏的核心组件模块，包括动画容器、内容渲染器和形状渲染器。
 *              这些组件共同构成了完整的骨架屏组件体系。
 * @author xiayan@myhexin.com
 * @since v1.0.0
 * @example
 * // 导入组件
 * import { ShimmerContainer, ContentRenderer } from '@/components';
 */

// 核心动画容器
export { ShimmerContainer } from './ShimmerContainer';

// 多行内容渲染器
export { ContentRenderer } from './ContentRenderer';

// 单一形状渲染器
export { ShapeRenderer } from './ShapeRenderer';
