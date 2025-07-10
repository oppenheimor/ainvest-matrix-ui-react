import { ReactElement, ReactNode } from 'react';

/**
 * Tooltip 触发方式
 */
export type TooltipTrigger = 'hover' | 'focus' | 'click';

/**
 * Tooltip 背景色变体
 */
export type TooltipVariant = 'primary' | 'neutral';

/**
 * Tooltip 显示位置
 */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Tooltip 组件 Ref 接口
 *
 * @example
 * ```tsx
 * const tooltipRef = useRef<TooltipRef>(null);
 * tooltipRef.current?.focus(); // 聚焦到触发元素
 * ```
 */
export interface TooltipRef {
  /** 原生 DOM 元素引用 */
  nativeElement: HTMLElement | null;
  /** 聚焦到触发元素 */
  focus: VoidFunction;
  /** 手动打开 Tooltip */
  open: VoidFunction;
  /** 手动关闭 Tooltip */
  close: VoidFunction;
}

/**
 * Tooltip 组件属性接口
 */
export interface TooltipProps {
  /**
   * Tooltip 内容
   */
  content: React.ReactNode;

  /**
   * 触发元素，必须是单个 React 元素
   */
  children: React.ReactElement;

  /**
   * 显示位置
   * @default 'top'
   */
  placement?: TooltipPlacement;

  /** 触发方式 */
  trigger?: TooltipTrigger;

  /** 背景色变体 */
  variant?: TooltipVariant;

  /** 是否可关闭（显示关闭按钮） */
  closable?: boolean;

  /** 是否显示箭头 */
  showArrow?: boolean;

  /** 是否禁用 */
  disabled?: boolean;

  /** 显示延迟时间 (ms) */
  delayDuration?: number;

  /** 隐藏延迟时间 (ms) */
  hideDelayDuration?: number;

  /** 自动关闭时间 (ms)，设为 0 则不自动关闭 */
  autoCloseDelayDuration?: number;

  /** 手动控制显示状态 */
  open?: boolean;

  /** 显示状态变化回调 */
  onOpenChange?: (open: boolean) => void;

  /** 关闭回调 */
  onClose?: () => void;

  /** 自定义类名 */
  className?: string;
}

/**
 * ShadcnTooltip 组件属性接口
 * 内部组件使用，不对外暴露
 */
export interface ShadcnTooltipProps {
  /** Tooltip 内容 */
  content: ReactNode;

  /** 触发元素 */
  children: ReactElement;

  /** 显示位置 */
  side?: TooltipPlacement;

  /** 触发方式 */
  trigger?: TooltipTrigger;

  /** 背景色变体 */
  variant?: TooltipVariant;

  /** 是否显示箭头 */
  showArrow?: boolean;

  /** 显示延迟时间 (ms) */
  delayDuration?: number;

  /** 跳过延迟时间 (ms) */
  skipDelayDuration?: number;

  /** 是否禁用 */
  disabled?: boolean;

  /** 手动控制显示状态 */
  open?: boolean;

  /** 显示状态变化回调 */
  onOpenChange?: (open: boolean) => void;

  /** 自定义类名 */
  className?: string;
}
