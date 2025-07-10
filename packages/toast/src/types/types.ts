import type { ReactNode } from "react";

/**
 * Toast 组件类型定义文件
 * 主要功能：定义 Toast 相关的 props、实例、配置项类型
 * 导出内容：ToastProps、ToastOptions、ToastInstance 等类型
 * 适用场景：Toast 组件及相关逻辑的类型约束
 */

export interface ToastOptions {
  /** 提示内容（纯文本） */
  message: string;
  /** 自定义图标（可选） */
  icon?: ReactNode;
  /** 显示时长（毫秒，默认值由实现决定） */
  duration?: number;
}

/**
 * ToastInstance
 * 表示一个实际存在于页面上的 Toast 实例
 */
export interface ToastInstance extends ToastOptions {
  /** Toast 的唯一标识 ID */
  id: number;
}

/**
 * ToastProps
 * 用于描述 Toast 组件的 props 类型
 */
export interface ToastProps {
  /** 提示类型：决定样式和默认图标 */
  type: "success" | "error" | "info" | "warning" | "none" | "loading";
  /** 提示内容（纯文本） */
  content: string;
  /** 显示时长（毫秒，默认值由实现决定） */
  duration?: number;
  /** 最大宽度（像素，默认值由实现决定） */
  maxWidth?: number;
  /** 最大行数（超出时截断显示） */
  maxLine?: number;
  /** 自定义类名，用于拓展样式 */
  className?: string;
}
