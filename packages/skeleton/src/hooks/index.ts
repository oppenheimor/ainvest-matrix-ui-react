/**
 * @fileoverview Skeleton组件Hook函数统一导出
 * @description 提供骨架屏组件所需的React Hook函数，包括视口检测、性能检测、
 *              状态管理和引用合并等功能。所有Hook都遵循React最佳实践。
 * @author xiayan@myhexin.com
 * @since v1.0.0
 * @example
 * // 导入Hook
 * import { useLoadingState, useViewportShimmer } from '@/hooks';
 */

// 视口动画检测
export { useViewportShimmer } from './useViewportShimmer';

// 设备性能检测
export { useAnimationCapability } from './useAnimationCapability';

// 加载状态管理
export { useLoadingState } from './useLoadingState';

// 引用合并工具
export { useMergedRef } from './useMergedRef';
