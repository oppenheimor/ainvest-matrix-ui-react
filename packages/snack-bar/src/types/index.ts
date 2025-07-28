import React from "react";
import { toast } from "sonner";

/** Snackbar 显示位置的字符串字面量类型 */
export type SnackbarPosition = "top-center" | "bottom-center";

/** Snackbar 操作按钮的联合类型，支持两种格式 */
export type SnackbarAction = 
  /** 传统对象格式：包含标签文本和点击回调函数 */
  | { label: string; onClick: () => void }
  /** React 节点格式：支持传入任意 React 节点 */
  | React.ReactNode;

/** Snackbar 选项配置接口，用于自定义通知行为 */
export interface SnackbarOptions {
  /** 通知的显示位置 */
  position?: SnackbarPosition;
  /** 操作按钮配置，可以是对象格式或 React 节点格式 */
  action?: SnackbarAction;
  /** 通知的显示时长，单位为毫秒 */
  duration?: number;
  /** 控制是否可以点击关闭 */
  clickToClose?: boolean;
  /** 自定义样式类名，用于覆盖默认样式 */
  className?: string;
}

/** Snackbar 主函数类型，支持直接调用和方法调用 */
export interface SnackbarFunction {
  /** 继承 Sonner toast 的所有功能，支持直接调用 */
  (...args: Parameters<typeof toast>): ReturnType<typeof toast>;
  /** 成功类型的通知方法 */
  success: (message: string, options?: SnackbarOptions) => ReturnType<typeof toast>;
  /** 错误类型的通知方法 */
  error: (message: string, options?: SnackbarOptions) => ReturnType<typeof toast>;
  /** 警告类型的通知方法 */
  warning: (message: string, options?: SnackbarOptions) => ReturnType<typeof toast>;
  /** 信息类型的通知方法 */
  info: (message: string, options?: SnackbarOptions) => ReturnType<typeof toast>;
  /** 加载类型的通知方法 */
  loading: (message: string, options?: SnackbarOptions) => ReturnType<typeof toast>;
}