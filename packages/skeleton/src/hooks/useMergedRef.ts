/**
 * @fileoverview React引用合并工具Hook
 * 合并forwardRef和内部ref，确保两者都能正确工作
 */

import React from 'react';

/**
 * 合并多个React引用
 * 常用于需要同时支持forwardRef和内部ref的场景
 *
 * @param refs 要合并的引用数组
 * @returns 合并后的引用函数
 */
export const useMergedRef = (
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
  internalRef: React.RefObject<HTMLDivElement>,
) => {
  return React.useCallback(
    (node: HTMLDivElement) => {
      // 处理转发的ref
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }

      // 处理内部ref
      if (internalRef.current !== node) {
        (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [forwardedRef, internalRef],
  );
};
