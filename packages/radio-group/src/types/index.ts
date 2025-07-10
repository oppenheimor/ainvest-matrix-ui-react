import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

/**
 * RadioGroup 根组件属性
 */
export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
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
 * RadioGroupItem 组件属性
 */
export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
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
   * 自定义插槽内容（列表模式可用）
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
 * RadioGroupIndicator 组件属性
 */
export interface RadioGroupIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator> {
  /**
   * 自定义 CSS 类名
   */
  className?: string;
}

 