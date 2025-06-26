/**
 * @fileoverview 设备动画性能检测Hook
 * 根据设备性能和用户偏好决定是否启用动画效果
 */

import { useState, useEffect } from 'react';
import { DESIGN_TOKENS } from '../constants';

/**
 * 检测设备是否支持高性能动画
 * 考虑因素：CPU核心数、内存大小、用户动画偏好设置
 *
 * @returns 是否允许播放动画
 */
export const useAnimationCapability = (): boolean => {
  const [allowsAnimation, setAllowsAnimation] = useState(true);

  useEffect(() => {
    // 检查用户是否偏好减少动画
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAllowsAnimation(false);
      return;
    }

    // 检测设备性能指标
    const checkPerformance = () => {
      // CPU核心数检测
      const cpuCores = navigator.hardwareConcurrency || DESIGN_TOKENS.PERFORMANCE.MIN_CPU_CORES;

      // 内存大小检测(GB)
      // @ts-ignore - deviceMemory可能不被所有浏览器支持
      const deviceMemory = navigator.deviceMemory || DESIGN_TOKENS.PERFORMANCE.MIN_MEMORY_GB;

      // 低性能设备：少于最小要求的核心数或内存
      const isLowPerformance =
        cpuCores < DESIGN_TOKENS.PERFORMANCE.MIN_CPU_CORES ||
        deviceMemory < DESIGN_TOKENS.PERFORMANCE.MIN_MEMORY_GB;

      setAllowsAnimation(!isLowPerformance);
    };

    checkPerformance();
  }, []);

  return allowsAnimation;
};
