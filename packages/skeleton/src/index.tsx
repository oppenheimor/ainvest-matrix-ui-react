/**
 * @fileoverview Skeleton骨架屏组件主入口
 * 根据变体类型自动选择合适的渲染器组件
 */

'use client';

import * as React from 'react';
import { ContentRenderer } from './components/ContentRenderer';
import { ShapeRenderer } from './components/ShapeRenderer';
import type { SkeletonProps } from './types';

/**
 * 骨架屏组件
 * 自动根据variant选择ContentRenderer(text/minor)或ShapeRenderer(avatar/image)
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', ...props }, ref) => {
    // text和minor变体使用ContentRenderer处理多行布局
    if (variant === 'text' || variant === 'minor') {
      return <ContentRenderer ref={ref} variant={variant} {...props} />;
    }

    // avatar和image变体使用ShapeRenderer处理简单形状
    return <ShapeRenderer ref={ref} variant={variant} {...props} />;
  },
);

Skeleton.displayName = 'Skeleton';

// 导出类型定义
export type { SkeletonProps } from './types';
