import { useEffect, useState } from "react";
import type { ToastProps } from "../types/types";

/**
 * 全局 Toast 事件名称，用于在 window 上分发和监听 Toast 事件
 */
export const TOAST_EVENT = "__AINVEST_TOAST_EVENT__";

/**
 * 全局 toast 函数，用于在任意位置触发 Toast 弹出
 * 本质上是分发一个包含 Toast 配置的自定义事件
 * @param options - Toast 配置项（内容、类型、持续时间等）
 */
export function toaster(options: ToastProps) {
  const event = new CustomEvent(TOAST_EVENT, { detail: options });
  window.dispatchEvent(event);
}

/**
 * useToaster Hook
 * 用于监听全局 Toast 事件，并返回当前 Toast 配置和修改函数
 * 可用于组件中统一处理 Toast 显示
 * @returns 一个元组：[当前 Toast 配置, 设置 Toast 配置的方法]
 */
export function useToaster(): [ToastProps | null, React.Dispatch<React.SetStateAction<ToastProps | null>>] {
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);

  useEffect(() => {
    /**
     * 事件处理函数：当接收到 TOAST_EVENT 时，更新 Toast 配置
     * 为每次 Toast 提供默认值，同时允许自定义覆盖
     */
    function handleToastEvent(e: Event) {
      const customEvent = e as CustomEvent<ToastProps>;
      setToastProps({
        type: "success",       // 默认类型
        content: "",           // 默认内容
        duration: 2000,        // 默认持续时间 (毫秒)
        maxWidth: 320,         // 默认最大宽度
        maxLine: 2,            // 默认最大行数
        ...customEvent.detail, // 覆盖默认值
      });
    }

    // 监听全局 TOAST_EVENT
    window.addEventListener(TOAST_EVENT, handleToastEvent);

    // 清理监听器
    return () => {
      window.removeEventListener(TOAST_EVENT, handleToastEvent);
    };
  }, []);

  return [toastProps, setToastProps];
}
