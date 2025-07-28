import { toast } from "sonner";
import { SuccessIcon, ErrorIcon, WarningIcon, InfoIcon, LoadingIcon } from "../components/Icons";
import { DEFAULT_DURATION, TOAST_SWIPE_DISMISSIBLE } from "../constants";
import type { SnackbarOptions, SnackbarFunction } from "../types";

// 模块级状态变量跟踪当前toast是否可点击关闭
let currentToastClickable = false;

// 导出检查函数
export const isCurrentToastClickable = () => currentToastClickable;

// 通用的toast创建函数
const createToast = (
  message: string, 
  icon: React.ReactNode, 
  duration: number, 
  options?: SnackbarOptions
) => {
  // 更新当前状态
  currentToastClickable = options?.clickToClose ?? false;
  
  return toast(message, {
    duration: options?.duration || duration,
    icon,
    dismissible: TOAST_SWIPE_DISMISSIBLE,
    className: options?.className,
    action: options?.action,
    onDismiss: () => {
      // 重置状态，避免状态污染
      currentToastClickable = false;
    },
  });
};

const success = (message: string, options?: SnackbarOptions) => {
  return createToast(message, SuccessIcon(), DEFAULT_DURATION, options);
};

const error = (message: string, options?: SnackbarOptions) => {
  return createToast(message, ErrorIcon(), DEFAULT_DURATION, options);
};

const warning = (message: string, options?: SnackbarOptions) => {
  return createToast(message, WarningIcon(), DEFAULT_DURATION, options);
};

const info = (message: string, options?: SnackbarOptions) => {
  return createToast(message, InfoIcon(), DEFAULT_DURATION, options);
};

const loading = (message: string, options?: SnackbarOptions) => {
  return createToast(message, LoadingIcon(), DEFAULT_DURATION, options);
};

/** 核心 snackbar 函数对象，支持直接调用和方法调用 */
export const snackbar = Object.assign(toast, {
  success,
  error,
  warning,
  info,
  loading,
}) as SnackbarFunction;

export const useSnackbar = () => snackbar; 