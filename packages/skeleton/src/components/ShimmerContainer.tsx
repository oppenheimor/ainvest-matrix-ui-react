/**
 * @fileoverview 核心Shimmer动画容器
 * 提供GPU加速的光泽动画效果，所有骨架组件的基础容器
 */

import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { cn } from '../utils/clsx';
import { shimmerSync } from '../utils/shimmerSync';
import { DESIGN_TOKENS } from '../constants';

/**
 * Shimmer光泽动画关键帧
 * 使用transform而非background-position优化GPU性能
 */
const shimmerAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

/**
 * 样式化的Shimmer容器组件
 * 最小化的styled-component，只负责animation，免去解决暗色模式
 */
const ShimmerWrapper = styled.div<{ $showShimmer: boolean; $shimmerDelay?: number }>`
  ${props =>
    props.$showShimmer &&
    css`
      &::before {
        animation: ${shimmerAnimation} ${DESIGN_TOKENS.ANIMATION.DURATION}ms ${DESIGN_TOKENS.ANIMATION.EASING}
          infinite;
        animation-delay: ${props.$shimmerDelay || 0}ms;
        will-change: transform;
      }
    `}
`;

/** Shimmer容器组件属性接口 */
interface ShimmerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否显示shimmer动画 */
  showShimmer?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * Shimmer动画容器组件
 * 所有骨架屏组件的基础容器，提供统一的光泽动画效果
 */
export const ShimmerContainer = React.forwardRef<HTMLDivElement, ShimmerContainerProps>(
  ({ showShimmer = true, children, className, ...props }, ref) => {
    const [shimmerDelay, setShimmerDelay] = React.useState<number>(0);

    // 当动画状态改变时，同步到全局时间线
    React.useEffect(() => {
      if (showShimmer) {
        // 获取全局同步的延迟，让动画立即同步到正确位置
        const delay = shimmerSync.getShimmerDelay();
        setShimmerDelay(delay);
      }
    }, [showShimmer]);

    return (
      <ShimmerWrapper
        ref={ref}
        $showShimmer={showShimmer}
        $shimmerDelay={shimmerDelay}
        className={cn(
          'relative overflow-hidden',
          showShimmer && [
            'before:content-[""] before:absolute before:inset-0',
            'before:w-full before:h-full',
            // from-* \via-* \to-* 不能使用transparent，会不生效
            `before:bg-gradient-to-r before:from-white/0 before:via-white/60 before:via-50% before:to-white/0`,
            // 暗色硬编码原因：没有语义化变量，不能修改tailwind.config（会需要使用方也修改）
            `dark:before:via-[#171717]/40 dark:before:via-50%`,
          ],
          className,
        )}
        {...props}
      >
        {children}
      </ShimmerWrapper>
    );
  },
);

ShimmerContainer.displayName = 'ShimmerContainer';
