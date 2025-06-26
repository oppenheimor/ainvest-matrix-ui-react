/**
 * @fileoverview 类名合并工具函数
 * @description 结合clsx和tailwind-merge提供智能的CSS类名合并功能，
 *              能够处理条件类名和Tailwind冲突解决。
 * @author xiayan@myhexin.com
 * @since v1.0.0
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 智能CSS类名合并函数
 *
 * @description 结合clsx的条件类名处理和tailwind-merge的冲突解决能力，
 *              提供完整的类名合并方案。特别适用于组件库中的样式组合。
 *
 * @param {...ClassValue} inputs - 任意数量的类名输入，支持字符串、对象、数组等格式
 * @returns {string} 合并后的类名字符串
 *
 * @example
 * // 基础合并
 * cn('px-4', 'py-2') // 'px-4 py-2'
 *
 * // 条件类名
 * cn('base-class', { 'active': isActive, 'disabled': isDisabled })
 *
 * // Tailwind冲突解决
 * cn('px-4', 'px-6') // 'px-6' (后者覆盖前者)
 *
 * // 复杂组合
 * cn(
 *   'bg-white rounded',
 *   isActive && 'bg-blue-500 text-white',
 *   className // 外部传入的类名
 * )
 *
 * @since v1.0.0
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
