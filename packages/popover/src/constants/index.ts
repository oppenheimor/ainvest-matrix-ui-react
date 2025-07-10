/**
 * 基础容器样式
 */
export const BASE_STYLES = [
  'w-[320px]', // 宽度320px
  'p-[20px]', // 内边距20px
].join(' ');

/**
 * 变体配置 - 统一管理所有变体的样式和行为
 */
export const VARIANT_CONFIG = {
  /**
   * Primary 变体 (蓝色背景白色文字)
   */
  primary: {
    container: [
      'bg-text-link', // 蓝色背景
      'text-text-inverse', // 白色文字
      'rounded-[16px]', // 圆角16px
      'shadow-lg', // 内置阴影
    ].join(' '),
    title: [
      'text-text-inverse', // 白色文字
      'text-[16px]', // 16px
      'leading-[22px]',
      'mb-[8px]', // 与内容间距8px
    ].join(' '),
    content: [
      'text-text-inverse', // 白色文字
      'text-[14px]', // 14px
      'leading-[18px]', // 行高18px
    ].join(' '),
    arrowColor: 'text-text-link',
    containerShadow: '', // 使用内置的 shadow-lg
  },
} as const;

/**
 * 支持的位置列表
 */
export const PLACEMENTS = ['top', 'bottom', 'left', 'right'] as const;

/**
 * 获取变体配置
 */
export const getVariantConfig = (variant: keyof typeof VARIANT_CONFIG) => {
  return VARIANT_CONFIG[variant] || VARIANT_CONFIG.primary;
};

/**
 * 默认配置
 */
export const DEFAULT_CONFIG = {
  placement: 'bottom',
  showArrow: true,
  closeOnClickOutside: true,
  closeOnClickInside: false,
  sideOffset: 8,
} as const;
