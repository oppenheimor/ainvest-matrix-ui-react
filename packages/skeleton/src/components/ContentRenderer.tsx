/**
 * @fileoverview 多行内容骨架渲染器
 * 处理text和minor变体的单行/多行渲染逻辑
 */

import * as React from 'react';
import { cn, placeholderAppearances, calculateLineStyles } from '../utils';
import { useLoadingState, useMergedRef } from '../hooks';
import { ShimmerContainer } from './ShimmerContainer';
import type { SkeletonProps } from '../types';

/**
 * 多行内容骨架渲染器
 * 支持text/minor变体的自定义行数、行宽、行高配置
 */
export const ContentRenderer = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { variant = 'text', showShimmer = true, lineCount = 1, lineWidths, lineHeights, className, ...props },
    ref,
  ) => {
    const { elementRef, willShowShimmer } = useLoadingState(showShimmer);
    const mergedRef = useMergedRef(ref, elementRef);

    // 单行渲染 - 直接返回一个ShimmerContainer
    if (lineCount === 1) {
      const singleLineStyles =
        lineWidths || lineHeights ? calculateLineStyles(0, lineWidths, lineHeights) : {};

      return (
        <ShimmerContainer
          ref={mergedRef}
          showShimmer={willShowShimmer}
          className={cn(placeholderAppearances({ variant }), className)}
          style={Object.keys(singleLineStyles).length > 0 ? singleLineStyles : undefined}
          role="status"
          aria-busy="true"
          aria-live="polite"
          aria-label="Loading content"
          {...props}
        />
      );
    }

    // 多行渲染 - 包装容器内渲染多个ShimmerContainer
    const lines = Array.from({ length: lineCount }, (_, index) => {
      const lineStyles = calculateLineStyles(index, lineWidths, lineHeights);

      return (
        <ShimmerContainer
          key={index}
          showShimmer={willShowShimmer}
          className={cn(placeholderAppearances({ variant }))}
          style={lineStyles}
        />
      );
    });

    return (
      <div
        ref={mergedRef}
        className={cn(`space-y-[8px]`, className)}
        role="status"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading content"
        {...props}
      >
        {lines}
      </div>
    );
  },
);

ContentRenderer.displayName = 'ContentRenderer';
