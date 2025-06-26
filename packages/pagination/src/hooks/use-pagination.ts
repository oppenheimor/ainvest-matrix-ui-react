import { useMemo } from 'react';
import { UsePaginationProps } from '../types';

export const DOTS = '...';

/**
 * 创建一个指定范围内的数字数组
 * @param start - 范围的起始值
 * @param end - 范围的结束值
 * @returns 一个数字数组
 */
const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalPage,
  page,
  siblings = 3,
  boundaries = 1,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    // 计算要显示的总页码项数
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;

    /**
     * 情况1：总页数小于我们想要显示的页码数。
     * 在这种情况下，我们显示所有页码，不带任何省略号。
     */
    if (totalPageNumbers >= totalPage) {
      return range(1, totalPage);
    }

    // 计算左右相邻页码的索引，并确保它们在页码边界内。
    const leftSiblingIndex = Math.max(page - siblings, boundaries);
    const rightSiblingIndex = Math.min(page + siblings, totalPage - boundaries);

    // 根据相邻页码的索引，决定是否在左侧或右侧显示省略号。
    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < totalPage - (boundaries + 1);

    /**
     * 情况2：左侧不显示省略号，但右侧需要显示。
     * 这发生在当前页码靠近页面列表的开头时。
     */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, ...range(totalPage - boundaries + 1, totalPage)];
    }

    /**
     * 情况3：右侧不显示省略号，但左侧需要显示。
     * 这发生在当前页码靠近页面列表的结尾时。
     */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      const rightRange = range(totalPage - rightItemCount + 1, totalPage);
      return [...range(1, boundaries), DOTS, ...rightRange];
    }

    /**
     * 情况4：左右两侧都需要显示省略号。
     * 这发生在当前页码位于中间，远离两端时。
     */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [...range(1, boundaries), DOTS, ...middleRange, DOTS, ...range(totalPage - boundaries + 1, totalPage)];
    }

    // 备用情况：如果以上条件都不满足，则返回完整的页码范围。
    return range(1, totalPage);
  }, [totalPage, siblings, page, boundaries]);

  return paginationRange;
}; 