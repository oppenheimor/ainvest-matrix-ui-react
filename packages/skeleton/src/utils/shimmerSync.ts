/**
 * @fileoverview 全局光泽同步器
 * 确保所有Skeleton组件的光泽效果保持同步，无论它们何时开始
 */

import { DESIGN_TOKENS } from '../constants';

/**
 * 全局Shimmer动画同步器
 * 使用单例模式管理所有动画实例，提供统一的控制接口
 */
class ShimmerSynchronizer {
  private startTime: number;
  private readonly shimmerDuration: number;

  constructor(shimmerDuration: number = DESIGN_TOKENS.ANIMATION.DURATION) {
    this.startTime = Date.now();
    this.shimmerDuration = shimmerDuration;
  }

  /**
   * 获取光泽延迟，让新启动的光泽效果立即同步到全局时间线
   * @returns 负数延迟值，单位毫秒
   */
  getShimmerDelay(): number {
    const elapsed = Date.now() - this.startTime;
    return -(elapsed % this.shimmerDuration);
  }

  /**
   * 重置全局时间基准（通常用于测试或特殊场景）
   */
  reset(): void {
    this.startTime = Date.now();
  }
}

/** 全局单例实例 */
export const shimmerSync = new ShimmerSynchronizer();

// 导出类型，方便测试时创建独立实例
export { ShimmerSynchronizer };
