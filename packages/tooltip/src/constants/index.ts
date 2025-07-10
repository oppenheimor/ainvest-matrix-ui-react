/** Tooltip 显示延迟时间 (ms) */
export const DEFAULT_DELAY_DURATION = 200;

/** Tooltip 跳过延迟时间 (ms) */
export const DEFAULT_SKIP_DELAY_DURATION = 300;

/** Tooltip 默认偏移距离 (px) */
export const DEFAULT_OFFSET = 8;

/** Tooltip 样式类名常量 */
export const TOOLTIP_CLASSES = {
  /** 基础容器样式 */
  base: [
    'z-50',
    'rounded-[10px]',
    'py-[12px]',
    'text-[14px] leading-[18px]',
    'animate-in fade-in-0 zoom-in-95 duration-200',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-[8px]',
    'data-[side=left]:slide-in-from-right-[8px]',
    'data-[side=right]:slide-in-from-left-[8px]',
    'data-[side=top]:slide-in-from-bottom-[8px]',
  ].join(' '),

  /** 背景色变体样式 */
  variants: {
    primary: 'bg-brand-primary text-text-inverse',
    neutral: 'bg-text-primary text-background-layer1',
  },

  /** 箭头颜色样式 */
  arrowColors: {
    primary: 'text-brand-primary',
    neutral: 'text-text-primary',
  },

  /** 尺寸约束样式 - 响应式设计 */
  size: 'max-w-[200px]',

  /** 文本内容样式 */
  text: ['break-words', 'line-clamp-2'].join(' '),

  /** 关闭按钮样式 */
  closeButton: [
    'inline-flex',
    'h-[16px] w-[16px]',
    'items-center justify-center',
    'shrink-0',
    'text-text-inverse',
    'transition-colors duration-150',
  ].join(' '),

  /** 带关闭按钮的内容容器样式 */
  closableContent: ['flex', 'items-center justify-between', 'gap-[8px]', 'pl-[16px] pr-[12px]'].join(' '),

  /** 普通内容容器样式 */
  content: ['px-[16px]'].join(' '),
} as const;

/** Tooltip 可访问性属性 */
export const TOOLTIP_ARIA = {
  /** 关闭按钮的 aria-label */
  closeButtonLabel: '关闭提示',

  /** Tooltip 角色 */
  role: 'tooltip',

  /** 触发元素的 aria-describedby */
  describedBy: 'tooltip-content',
} as const;
