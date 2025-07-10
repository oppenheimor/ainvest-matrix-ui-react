import * as React from "react";

/**
 * CheckboxGroup 根组件属性
 */
export interface CheckboxGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * 当前选中的值数组
   */
  value?: string[];
  
  /**
   * 默认选中的值数组
   */
  defaultValue?: string[];
  
  /**
   * 值变化回调函数
   */
  onValueChange?: (value: string[]) => void;
  
  /**
   * 自定义 CSS 类名
   */
  className?: string;
  
  /**
   * 组件变体
   */
  variant?: 'default' | 'card' | 'list' | 'button';

  /**
   * 图标类型
   */
  iconType?: 'default' | 'checked';

  /**
   * 图标位置
   */
  iconPosition?: 'start' | 'end';

  /**
   * 主题模式
   */
  theme?: 'mobile' | 'pc';

  /**
   * 子组件
   */
  children: React.ReactNode;
}

/**
 * CheckboxGroupItem 组件属性
 */
export interface CheckboxGroupItemProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'value' | 'onChange'> {
  /**
   * 选项的值
   */
  value: string;

  /**
   * 选项标签文本
   */
  label?: string;

  /**
   * 描述文本（卡片模式可用）
   */
  description?: string;

  /**
   * 图标元素（卡片模式可用）
   */
  icon?: React.ReactNode;

  /**
   * 自定义插槽内容（默认和列表模式可用）
   */
  customContent?: React.ReactNode;

  /**
   * 按钮模式插槽内容（按钮模式可用）
   */
  buttonSlot?: React.ReactNode;

  /**
   * 按钮模式插槽位置（按钮模式可用）
   */
  buttonSlotPosition?: 'start' | 'end';

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 自定义 CSS 类名
   */
  className?: string;

  /**
   * 子组件（如果提供，将覆盖默认的标签渲染）
   */
  children?: React.ReactNode;
}

/**
 * CheckboxGroupIndicator 组件属性
 */
export interface CheckboxGroupIndicatorProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * 自定义 CSS 类名
   */
  className?: string;
} 