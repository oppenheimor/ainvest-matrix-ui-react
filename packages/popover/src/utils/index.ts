import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

/**
 * 类名合并工具函数
 * 支持条件类名和 Tailwind 冲突处理
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
