/**
 * @fileoverview 视口内shimmer动画检测Hook
 * 只有元素进入视口时才启动动画，优化页面性能
 */

import { useRef, useState, useEffect } from 'react';
import { ANIMATION_SETTINGS } from '../constants';

/**
 * 视口内shimmer动画控制Hook
 * 使用IntersectionObserver检测元素可见性，延迟启动动画
 *
 * @param showShimmer 是否显示shimmer效果
 * @returns 元素引用和动画启动状态
 */
export const useViewportShimmer = (showShimmer: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldStartShimmer, setShouldStartShimmer] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !showShimmer) return;

    // 创建交叉观察器
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 元素进入视口时启动动画
        if (entry.isIntersecting) {
          setShouldStartShimmer(true);
          observer.disconnect();
        }
      },
      {
        threshold: ANIMATION_SETTINGS.intersectionThreshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [showShimmer]);

  return {
    ref,
    shouldStartShimmer,
  };
};
