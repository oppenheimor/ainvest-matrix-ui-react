/**
 * @fileoverview 单一形状骨架渲染器
 * 处理avatar和image变体的简单形状渲染
 */

import * as React from 'react';
import { cn, placeholderAppearances } from '../utils';
import { useLoadingState, useMergedRef } from '../hooks';
import { ShimmerContainer } from './ShimmerContainer';
import type { SkeletonProps } from '../types';

/**
 * 单一形状骨架渲染器
 * 适用于avatar(圆形)和image(矩形)等不需要多行处理的变体
 */
export const ShapeRenderer = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'avatar', showShimmer = true, className, ...props }, ref) => {
    const { elementRef, willShowShimmer } = useLoadingState(showShimmer);
    const mergedRef = useMergedRef(ref, elementRef);

    // 根据变体类型设置不同的aria-label
    const ariaLabel = variant === 'avatar' ? 'Loading avatar' : 'Loading image';

    return (
      <ShimmerContainer
        ref={mergedRef}
        showShimmer={willShowShimmer}
        className={cn(placeholderAppearances({ variant }), className)}
        role="img"
        aria-busy="true"
        aria-live="polite"
        aria-label={variant === 'avatar' ? 'Loading avatar' : 'Loading image'}
        {...props}
      />
    );
  },
);

ShapeRenderer.displayName = 'ShapeRenderer';
