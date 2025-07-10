'use client';

import * as React from 'react';
import { Toaster as SonnerToaster, toast } from 'sonner';
import type { ToasterProps } from '../types';
import { cn } from '../utils';
import { NOTIFICATION_DEFAULTS } from '../constants';
import { SuccessIcon, ErrorIcon, WarningIcon, InfoIcon, CloseIcon } from './NotificationIcons';

/**
 * 通知组件容器
 * 基于 Sonner 库封装，支持多种通知状态和自定义样式
 */
export const Toaster = React.forwardRef<HTMLDivElement, ToasterProps>(({ ...props }, ref) => {
  return (
    <SonnerToaster
      ref={ref}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: cn(
            'group pointer-events-auto relative overflow-hidden rounded-[10px] p-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)] flex w-full gap-[8px] items-start flex-wrap',
            'bg-foreground-layer1 outline outline-1 outline-divider-level3',
          ),
          title: cn('text-[16px] font-medium text-text-primary leading-[22px]'),
          description: cn(
            'text-[14px] font-normal text-text-primary leading-[18px] mt-[8px]',
            'line-clamp-3 overflow-hidden text-ellipsis',
            'w-full',
          ),
          closeButton: cn(
            'absolute right-[20px] top-[20px] flex items-center justify-center size-[15px]',
            'text-text-secondary hover:text-text-primary cursor-pointer',
          ),
          icon: cn('shrink-0 size-[24px] [&>div]:[--size:20px] relative'),
          content: cn('flex-1'),
        },
        duration: NOTIFICATION_DEFAULTS.DURATION,
        closeButton: true,
      }}
      icons={{
        success: <SuccessIcon className="text-status-success" />,
        error: <ErrorIcon className="text-status-error" />,
        warning: <WarningIcon className="text-status-warning" />,
        info: <InfoIcon className="text-status-info" />,
        close: <CloseIcon className="text-text-secondary" />,
      }}
      {...props}
    />
  );
});

Toaster.displayName = 'Toaster';

export { toast };
