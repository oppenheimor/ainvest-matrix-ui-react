import * as React from "react";

/**
 * 基础输入组件属性接口
 */
export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "prefix" | "suffix"
  > {
  /** 标签文本 */
  label?: React.ReactNode;
  /** 是否必填 */
  required?: boolean;
  /** 是否允许清空 */
  allowClear?: boolean;
  /** 是否为密码输入 */
  password?: boolean;
  /** 初始是否隐藏字符，仅在password为true时生效 */
  initialHidePassword?: boolean;
  /** 最大长度 */
  maxLength?: number;
  /** 前置内容 */
  addonBefore?: React.ReactNode;
  /** 后置内容 */
  addonAfter?: React.ReactNode;
  /** 错误信息 */
  error?: React.ReactNode;
  /** 成功信息 */
  success?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 输入值（受控模式） */
  value?: string;
  /** 默认值（非受控模式） */
  defaultValue?: string;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 值变化回调 */
  onChange?: (value: string) => void;
}

/**
 * 单输入框OTP组件属性接口
 */
export interface SingleOtpInputProps {
  /** 标签文本 */
  label?: React.ReactNode;
  /** 是否必填 */
  required?: boolean;
  /** 最大长度 */
  maxLength?: number;
  /** 错误信息 */
  error?: React.ReactNode;
  /** 成功信息 */
  success?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 输入值（受控模式） */
  value?: string;
  /** 默认值（非受控模式） */
  defaultValue?: string;
  /** 占位符 */
  placeholder?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 验证状态变化回调 */
  onValidationChange?: (isValid: boolean, message?: string) => void;
  /** OTP完成回调 */
  onComplete?: (otp: string) => void;
  /** 发送验证码回调，返回是否发送成功 */
  onSendCode?: () => Promise<boolean>;
  /** 倒计时时间（秒） */
  countdown?: number;
  /** 发送按钮内容 */
  sendButtonContent?: React.ReactNode;
  /** 发送中按钮内容 */
  sendingButtonContent?: React.ReactNode;
  /** 重发按钮内容 */
  resendButtonContent?: React.ReactNode;
  /** 倒计时内容模板，字符串中可使用{countdown}占位符 */
  countdownContent?: React.ReactNode;
}

/**
 * 多输入框OTP组件属性接口
 */
export interface MultipleOtpInputProps {
  /** 自定义类名 */
  className?: string;
  /** OTP长度 */
  length?: number;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** 是否掩码显示输入内容 */
  masked?: boolean;
  /** OTP完成回调 */
  onComplete?: (otp: string) => void;
  /** 发送验证码回调，返回是否发送成功 */
  onSendCode?: () => Promise<boolean>;
  /** 倒计时时间（秒） */
  countdown?: number;
  /** 发送按钮内容 */
  sendButtonContent?: React.ReactNode;
  /** 发送中按钮内容 */
  sendingButtonContent?: React.ReactNode;
  /** 重发按钮内容 */
  resendButtonContent?: React.ReactNode;
  /** 倒计时内容模板，可接收countdown参数 */
  countdownContent?: (countdown: number) => React.ReactNode;
}

/**
 * 文本域输入组件属性接口
 */
export interface TextareaInputProps {
  /** 标签 */
  label?: React.ReactNode;
  /** 是否必填 */
  required?: boolean;
  /** 最大长度 */
  maxLength?: number;
  /** 错误信息 */
  error?: React.ReactNode;
  /** 成功信息 */
  success?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 输入值（受控模式） */
  value?: string;
  /** 默认值（非受控模式） */
  defaultValue?: string;
  /** 占位符 */
  placeholder?: string;
  /** 行数 */
  rows?: number;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 自动调整高度 */
  autoSize?: boolean | { minRows: number; maxRows: number };
  /** 是否可调整高度，当可调整高度时，autoSize无效 */
  resizable?: boolean;
}

/**
 * 范围数字输入组件属性接口
 */
export interface RangeNumberInputProps {
  /** 标签文本 */
  label?: React.ReactNode;
  /** 是否必填 */
  required?: boolean;
  /** 错误信息 */
  errorContents?: [React.ReactNode, React.ReactNode];
  /** 成功信息 */
  successContents?: [React.ReactNode, React.ReactNode];
  /** 自定义类名 */
  className?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 范围值（受控模式） */
  values?: [number, number];
  /** 默认范围值（非受控模式） */
  defaultValues?: [number, number];
  /** 占位符 */
  placeholders?: [string, string];
  /** 前缀 */
  prefixes?: [React.ReactNode, React.ReactNode];
  /** 后缀 */
  suffixes?: [React.ReactNode, React.ReactNode];
  /** 值变化回调 */
  onChange?: (value: [number, number]) => void;
  /** 开始值最小值 */
  startMin?: number;
  /** 开始值最大值 */
  startMax?: number;
  /** 开始值精度 */
  startPrecision?: number;
  /** 结束值最小值 */
  endMin?: number;
  /** 结束值最大值 */
  endMax?: number;
  /** 结束值精度 */
  endPrecision?: number;
}

/**
 * 单数字输入组件属性接口
 */
export interface SingleNumberInputProps {
  /** 标签文本 */
  label?: React.ReactNode;
  /** 是否必填 */
  required?: boolean;
  /** 错误信息 */
  error?: React.ReactNode;
  /** 成功信息 */
  success?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 输入值（受控模式） */
  value?: number;
  /** 默认值（非受控模式） */
  defaultValue?: number;
  /** 占位符 */
  placeholder?: string;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长，默认为1 */
  step?: number;
  /** 精度 */
  precision?: number;
  /** 调整类型：button-按钮，arrow-箭头 */
  adjustType?: "button" | "arrow";
  /** 值变化回调 */
  onChange?: (value: number) => void;
}
