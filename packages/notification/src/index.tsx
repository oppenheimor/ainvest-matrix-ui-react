'use client';

import { Toaster, toast as sonnerToast } from './components/shadcn-notification';
import { cn } from './utils';
import type { ExternalToast } from './types';

type ToastMethod = (message: string, options?: ExternalToast) => string | number;
type PromiseData<Data = any> = {
  loading: string;
  success: string | ((data: Data) => string);
  error: string | ((error: any) => string);
  finally?: () => void;
} & ExternalToast;

/**
 * 渲染通知操作按钮组件
 * 支持取消和确认按钮，使用 atom-token 颜色系统
 *
 * @param action - 确认按钮配置
 * @param cancel - 取消按钮配置
 * @returns JSX 元素或 null
 */
const renderNotificationActionButtons = (
  action?: ExternalToast['action'],
  cancel?: ExternalToast['cancel'],
) => (
  <div className="flex gap-[8px] justify-end mt-[16px]">
    {cancel && typeof cancel === 'object' && 'onClick' in cancel && (
      <button
        onClick={cancel.onClick}
        className={cn(
          'flex justify-center items-center gap-[10px] rounded-[40px] text-[12px]',
          'px-[12px] py-[6px] text-text-primary',
          'bg-button-grey-default',
        )}
      >
        {cancel.label}
      </button>
    )}
    {action && typeof action === 'object' && 'onClick' in action && (
      <button
        onClick={action.onClick}
        className={cn(
          'flex justify-center items-center gap-[10px] rounded-[40px] text-[12px]',
          'text-white px-[12px] py-[6px]',
          'bg-black',
        )}
      >
        {action.label}
      </button>
    )}
  </div>
);

/**
 * 组合描述内容与操作按钮
 * 将通知描述和操作按钮整合为统一的内容区域
 *
 * @param description - 通知描述内容
 * @param action - 确认按钮配置
 * @param cancel - 取消按钮配置
 * @returns 组合后的 JSX 元素
 */
const combineDescriptionWithButtons = (
  description: ExternalToast['description'],
  action?: ExternalToast['action'],
  cancel?: ExternalToast['cancel'],
) => (
  <div className="w-full">
    {typeof description === 'function' ? description() : description}
    {renderNotificationActionButtons(action, cancel)}
  </div>
);

/**
 * 处理通知操作按钮的通用逻辑
 * 检查是否存在 action 或 cancel 配置，如果存在则处理按钮渲染
 *
 * @param message - 通知消息内容
 * @param toastMethod - Toast 显示方法
 * @param options - 扩展配置选项
 * @returns Toast ID 或 null
 */
const processNotificationActions = (message: string, toastMethod: ToastMethod, options?: ExternalToast) => {
  if (!options?.action && !options?.cancel) return null;

  const { action, cancel, description, ...rest } = options;
  return toastMethod(message, {
    ...rest,
    description: combineDescriptionWithButtons(description, action, cancel),
  });
};

/**
 * 创建支持操作按钮的 Toast 方法增强器
 * 为标准 Toast 方法添加 action/cancel 按钮支持
 *
 * @param toastMethod - 原始 Toast 方法
 * @returns 增强后的 Toast 方法
 */
const createToastWithActions = (toastMethod: ToastMethod) => {
  return (message: string, options?: ExternalToast) => {
    const result = processNotificationActions(message, toastMethod, options);
    if (result) return result;
    return toastMethod(message, options);
  };
};

/**
 * 处理 Promise 类型通知的操作按钮
 * 为异步操作通知添加 action/cancel 按钮支持
 *
 * @param promise - 要处理的 Promise 对象
 * @param options - Promise 通知配置选项
 * @returns Promise Toast ID
 */
const promiseWithActions = <Data = any,>(promise: Promise<Data>, options: PromiseData<Data>) => {
  const { action, cancel, loading, success, error, ...rest } = options;
  if (!action && !cancel) {
    return sonnerToast.promise(promise, options);
  }

  return sonnerToast.promise(promise, {
    ...rest,
    loading: combineDescriptionWithButtons(loading, action, cancel),
    success: data =>
      combineDescriptionWithButtons(typeof success === 'function' ? success(data) : success, action, cancel),
    error: error =>
      combineDescriptionWithButtons(
        typeof options.error === 'function' ? options.error(error) : options.error,
        action,
        cancel,
      ),
  });
};

/**
 * 处理自定义渲染通知的操作按钮
 * 为自定义组件通知添加 action/cancel 按钮支持
 *
 * @param render - 自定义渲染函数
 * @param options - 自定义通知配置选项
 * @returns Custom Toast ID
 */
const customWithActions = (render: (id: string | number) => React.ReactElement, options?: ExternalToast) => {
  if (!options?.action && !options?.cancel) {
    return sonnerToast.custom(render, options);
  }

  const { action, cancel, description, ...rest } = options;
  return sonnerToast.custom(render, {
    ...rest,
    description: description
      ? combineDescriptionWithButtons(description, action, cancel)
      : renderNotificationActionButtons(action, cancel),
  });
};

/**
 * 增强版 Toast API
 * 基于 Sonner 扩展，支持操作按钮和完整的通知功能
 */
const toast = Object.assign(createToastWithActions(sonnerToast), {
  success: createToastWithActions(sonnerToast.success),
  error: createToastWithActions(sonnerToast.error),
  warning: createToastWithActions(sonnerToast.warning),
  info: createToastWithActions(sonnerToast.info),
  loading: createToastWithActions(sonnerToast.loading),
  promise: promiseWithActions,
  custom: customWithActions,
  dismiss: sonnerToast.dismiss,
}) as typeof sonnerToast;

export { Toaster, toast };
