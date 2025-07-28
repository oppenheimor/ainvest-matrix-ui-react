import React from "react";

export interface AutoCompleteOption {
  value: string;
  label?: React.ReactNode;
  key?: string;
}

export interface AutoCompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSelect' | 'value' | 'defaultValue'> {
  /**
   * 数据源选项
   */
  options?: AutoCompleteOption[];
  /**
   * 控制输入值
   */
  value?: string;
  /**
   * 默认值
   */
  defaultValue?: string;
  /**
   * 输入框变化时的回调
   */
  onChange?: (value: string) => void;
  /**
   * 搜索时的回调（用于远程搜索）
   */
  onSearch?: (value: string) => void;
  /**
   * 选择选项时的回调
   */
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  /**
   * 控制下拉菜单显示
   */
  open?: boolean;
  /**
   * 下拉菜单显示状态改变回调
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * 输入框状态
   */
  status?: 'error' | 'warning';
  /**
   * 是否允许清除
   */
  allowClear?: boolean;
  /**
   * 下拉菜单宽度是否与输入框相同
   */
  dropdownMatchSelectWidth?: boolean;
  /**
   * 自定义筛选函数
   */
  filterOption?: (inputValue: string, option: AutoCompleteOption) => boolean;
  /**
   * 最大显示选项数量
   */
  maxCount?: number;
  /**
   * 输入框的样式类名
   */
  inputClassName?: string;
  /**
   * 下拉菜单的 className
   */
  dropdownClassName?: string;
  /**
   * 无选项时的显示内容
   */
  notFoundContent?: React.ReactNode;
}