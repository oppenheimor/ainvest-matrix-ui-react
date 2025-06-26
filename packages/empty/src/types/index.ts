import React from "react";

export interface IconProps {
  size?: number;
}

/**
 * Empty 组件支持的图标类型枚举
 */
export enum EmptyType {
  // 不显示任何图标，纯文本展示
  None = "None",
  // 默认空数据状态，适用于列表、表格等数据为空的场景
  NoData = "NoData",
  // 搜索无结果状态，适用于搜索功能返回空结果
  SearchEmpty = "SearchEmpty",
  // 网络错误状态，适用于网络连接失败或请求异常
  NetworkError = "NetworkError",
  // 服务器错误状态，适用于服务器返回错误
  ServerError = "ServerError",
}

/**
 * Empty 组件使用场景
 */
export enum EmptyLevel {
  // 页面缺省图
  Page = "page",
  // 模块缺省图
  Module = "module"
}

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  // 使用场景
  level?: EmptyLevel | keyof typeof EmptyLevel;
  // 图标类型
  iconType?: EmptyType | keyof typeof EmptyType;
  // 标题文本
  title?: string;
  // 描述文本
  description?: string;
  // 图标尺寸大小
  size?: number;
  // 是否显示操作区域
  showAction?: boolean;
  // 操作区域按钮文本
  actionButtonText?: string;
  // 操作区域点击事件
  onClickAction?: () => void;
  // 用户自定义操作区域内容，通常用于放置按钮等交互元素
  customAction?: React.ReactNode;
}