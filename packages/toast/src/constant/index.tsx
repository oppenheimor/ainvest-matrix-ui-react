// Toast 组件常量与资源映射
import React from "react";
// 导入所有 Toast 相关的 icon 组件
// Import all Toast-related icon components
import { SuccessIcon, ErrorIcon, InfoIcon, WarnIcon, WarningIcon } from "../components/Icons";
import { Spinner } from "../components/Spinner";

// 默认类型，通常为 "success"
export const DEFAULT_TYPE = "success";
// 默认内容
export const DEFAULT_CONTENT = "";
// 默认自动关闭时长（毫秒）
export const DEFAULT_DURATION = 3000;
// 默认最大宽度
export const DEFAULT_MAX_WIDTH = 400;
// 默认最大显示行数
export const DEFAULT_MAX_LINE = 1;

/**
 * iconSvgMap
 * Toast 类型与图标组件的映射表
 * 用于根据 type 字段动态渲染对应的 icon 组件
 * @type {Record<string, React.ReactNode>}
 * @example iconSvgMap['success'] // <SuccessIcon />
 *
 * 设计说明：
 * - 统一管理所有 Toast 支持的类型与其对应的 icon 组件，便于维护和扩展
 * - 支持 "warn"/"warning" 兼容写法，"loading" 类型对应 Spinner
 * - 业务代码只需传 type 字符串即可自动获得合适的 icon
 */
export const iconSvgMap: Record<string, React.ReactNode> = {
  // 成功类型，对应绿色对勾图标
  success: <SuccessIcon />,

  // 错误类型，对应红色错误图标
  error: <ErrorIcon />,

  // 信息类型，对应蓝色信息图标
  info: <InfoIcon />,

  // 警告类型，对应黄色警告图标（兼容 warn/warning）
  warn: <WarnIcon />,
  warning: <WarningIcon />,

  // 加载类型，对应 loading 动画
  loading: <Spinner />,
}; 