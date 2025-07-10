import React from "react";
import Toast from "../index";
import { useToaster } from "../hooks/useToaster";

/**
 * Toaster 组件容器文件
 * 主要功能：全局挂载 Toast 渲染容器，监听全局事件并展示 Toast
 * 导出内容：Toaster 组件
 * 适用场景：应用根节点挂载全局 Toast
 */
export const Toaster: React.FC = () => {
  const [toastProps] = useToaster();
  if (!toastProps) return null;
  return (
    <Toast
      {...toastProps}
      key={JSON.stringify(toastProps)}
    />
  );
}; 