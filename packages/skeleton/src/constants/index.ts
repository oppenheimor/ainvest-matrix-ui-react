/**
 * @fileoverview 骨架屏组件核心常量配置
 * @author xiayan@myhexin.com
 * @since v1.0.0
 */

/**
 * 设计令牌 - 统一管理所有魔法数字
 * 提供类型安全的常量访问，消除硬编码值
 */
export const DESIGN_TOKENS = {
  /** 动画配置 */
  ANIMATION: {
    /** 统一动画时长(ms) */
    DURATION: 1500,
    /** 动画缓动函数 */
    EASING: 'ease-in-out' as const,
  },

  /** 性能阈值配置 */
  PERFORMANCE: {
    /** 最小CPU核心数 */
    MIN_CPU_CORES: 4,
    /** 最小内存(GB) */
    MIN_MEMORY_GB: 2,
    /** 最大并发动画数 */
    MAX_CONCURRENT_ANIMATIONS: 10,
    /** 视口交叉检测阈值 */
    INTERSECTION_THRESHOLD: 0.1,
  },
} as const;

/**
 * 设计令牌类型定义
 * 提供完整的TypeScript类型支持
 */
export type DesignTokens = typeof DESIGN_TOKENS;
export type AnimationConfig = DesignTokens['ANIMATION'];
export type PerformanceConfig = DesignTokens['PERFORMANCE'];

/**
 * 骨架屏变体预设配置
 * 基于UX最佳实践设定的四种核心变体样式
 */
export const SKELETON_VARIANTS = {
  /** 文本内容样式 - 使用统一的文本高度 */
  text: `h-[44px] w-full rounded-[4px]`,
  /** 次要信息样式 - 使用统一的次要高度 */
  minor: `h-[32px] w-full rounded-[4px]`,
  /** 头像样式 - 使用统一的头像尺寸 */
  avatar: `w-[32px] h-[32px] rounded-full`,
  /** 图片样式 - 使用统一的图片高度 */
  image: `w-full h-[270px] rounded-[10px]`,
} as const;

/**
 * 动画效果配置参数
 * 平衡性能和视觉体验的关键参数
 */
export const ANIMATION_SETTINGS = {
  /** 最大并发动画数 - 防止低端设备卡顿 */
  maxConcurrentAnimations: DESIGN_TOKENS.PERFORMANCE.MAX_CONCURRENT_ANIMATIONS,
  /** 视口交叉检测阈值 - 元素10%可见时触发 */
  intersectionThreshold: DESIGN_TOKENS.PERFORMANCE.INTERSECTION_THRESHOLD,
  /** 动画持续时间(ms) - shimmer完整周期 */
  animationDuration: DESIGN_TOKENS.ANIMATION.DURATION,
} as const;

/**
 * 默认行宽配置
 * 模拟真实文本布局的自然效果
 */
export const DEFAULT_ROW_WIDTHS = {
  /** 最后一行70%宽度模拟自然换行 */
  lastRowWidth: '70%',
  /** 其他行100%宽度确保稳定布局 */
  defaultWidth: '100%',
} as const;
