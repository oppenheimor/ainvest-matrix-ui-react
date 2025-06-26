import { useMemo } from "react";
import { BreadcrumbItemType, UseBreadcrumbCollapseOptions, UseBreadcrumbCollapseResult } from "../types";

/**
 * useBreadcrumbCollapse 钩子用于处理面包屑的折叠逻辑
 * @param items 面包屑项数组
 * @param maxItems 超过多少项自动折叠
 * @param itemsBeforeCollapse 折叠前显示的项数
 * @param itemsAfterCollapse 折叠后显示的项数
 * @param activeKey 当前激活项 key
 * @returns 折叠前的项、折叠的项、折叠后的项、是否折叠、当前激活项 key
 */
export function useBreadcrumbCollapse({
  items,
  maxItems = 5,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 2,
  activeKey,
}: UseBreadcrumbCollapseOptions): UseBreadcrumbCollapseResult {
  return useMemo(() => {
    const total = items.length;
    let isCollapsed = false;
    let before: BreadcrumbItemType[] = [];
    let collapsed: BreadcrumbItemType[] = [];
    let after: BreadcrumbItemType[] = [];
    let currentKey: string | number | undefined = activeKey;

    // 如果未指定当前 key，默认选最后一项
    if (!currentKey && total > 0) {
      currentKey = items[total - 1].key;
    }

    // 超过最大项数时进行折叠 Collapse if total > maxItems
    if (total > maxItems) {
      isCollapsed = true;
      // 前 itemsBeforeCollapse 项
      before = items.slice(0, itemsBeforeCollapse);
      // 中间折叠项 collapsed middle items
      collapsed = items.slice(itemsBeforeCollapse, total - itemsAfterCollapse);
      // 后 itemsAfterCollapse 项
      after = items.slice(total - itemsAfterCollapse);
    } else {
      // 不折叠时全部展示
      before = items;
      collapsed = [];
      after = [];
    }

    // 返回分组结果和折叠状态
    return { before, collapsed, after, isCollapsed, currentKey };
  }, [items, maxItems, itemsBeforeCollapse, itemsAfterCollapse, activeKey]);
} 