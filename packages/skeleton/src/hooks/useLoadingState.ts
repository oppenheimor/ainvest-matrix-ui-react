import { useViewportShimmer } from './useViewportShimmer';
import { useAnimationCapability } from './useAnimationCapability';

/**
 * 加载状态组件通用逻辑钩子
 * 统一处理光泽效果控制逻辑
 */
export const useLoadingState = (showShimmer: boolean) => {
  const { ref: elementRef, shouldStartShimmer } = useViewportShimmer(showShimmer);
  const allowsAnimation = useAnimationCapability();

  // 最终光泽效果控制
  const willShowShimmer = showShimmer && shouldStartShimmer && allowsAnimation;

  return {
    elementRef,
    willShowShimmer,
  };
};
