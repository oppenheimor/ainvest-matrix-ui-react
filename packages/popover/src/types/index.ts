import * as React from 'react';
import type { PLACEMENTS, VARIANT_CONFIG } from '../constants';

/**
 * Popover 显示位置类型
 */
export type PopoverPlacement = (typeof PLACEMENTS)[number];

/**
 * Popover 变体类型
 */
export type PopoverVariant = keyof typeof VARIANT_CONFIG;

/**
 * Popover 组件属性
 */
export interface PopoverProps {
  /**
   * 触发元素
   */
  children: React.ReactNode;

  /**
   * 弹框内容 (必填)
   */
  content: React.ReactNode;

  /**
   * 弹框标题 (可选)
   */
  title?: React.ReactNode;

  /**
   * 显示位置
   * @default 'bottom'
   */
  placement?: PopoverPlacement;

  /**
   * 受控模式开启状态
   */
  open?: boolean;

  /**
   * 默认开启状态
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * 开启状态改变回调
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * 容器自定义类名
   */
  className?: string;

  /**
   * 显示箭头
   * @default true
   */
  showArrow?: boolean;

  /**
   * 点击外部关闭
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * 点击内部关闭
   * @default false
   */
  closeOnClickInside?: boolean;
}

/**
 * Popover 组件引用
 */
export interface PopoverRef {
  /**
   * 原生 DOM 元素
   */
  nativeElement: HTMLElement | null;

  /**
   * 聚焦触发元素
   */
  focus: () => void;

  /**
   * 打开弹框
   */
  open: () => void;

  /**
   * 关闭弹框
   */
  close: () => void;
}
