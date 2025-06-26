import { ReactNode } from 'react';
import { BreadcrumbEllipsis } from '../components/shadcn-breadcrumb'
import { DropdownMenuContent } from '../components/shadcn-dropdown-menu'
import { TooltipContent } from '../components/shadcn-tooltip'

export interface BreadcrumbProps {
  items: BreadcrumbItemType[];
  // 超过多少项自动折叠
  maxItems?: number;
  // 折叠前显示的项数
  itemsBeforeCollapse?: number;
  // 折叠后显示的项数
  itemsAfterCollapse?: number;
  // 全局分隔符，默认 '/'
  separator?: React.ReactNode;
  // 折叠 icon，默认 EllipsisIcon
  ellipsisIcon?: React.ReactNode;
  // 当前激活的key
  activeKey?: string | number;
  // 切换回调
  onChange?: (key: string | number) => void;
  // 渲染单项
  renderItem?: BreadcrumbRenderItemFn;
  // 折叠 icon 的 props
  ellipsisProps?: React.ComponentProps<typeof BreadcrumbEllipsis>;
  // 下拉菜单的 props
  dropdownMenuProps?: Partial<React.ComponentProps<typeof DropdownMenuContent>>;
  // 提示的 props
  tooltipProps?: Partial<React.ComponentProps<typeof TooltipContent>>;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
}

// 面包屑单项类型
export interface BreadcrumbItemType {
  // 唯一标识
  key: string | number;
  // 展示内容
  label: React.ReactNode;
  // 跳转链接
  href?: string;
  // 是否禁用
  disabled?: boolean;
  // 其他自定义属性
  [prop: string]: unknown;
}

// renderItem props类型
export interface BreadcrumbRenderItemProps {
  // 当前项
  item: BreadcrumbItemType;
  // 当前项索引
  index: number;
  // 是否为当前项
  isCurrent: boolean;
  // 是否为折叠项
  isEllipsis?: boolean;
  // 点击事件
  onClick?: (e: React.MouseEvent) => void;
}

// renderItem函数类型
export type BreadcrumbRenderItemFn = (props: BreadcrumbRenderItemProps) => React.ReactNode;


// DropdownMenu全局配置类型
export interface DropdownMenuProviderConfig {
  // 偏移量
  sideOffset?: number;
  // 未来可扩展更多配置
}

// Tooltip全局配置类型
export interface TooltipProviderConfig {
  // 延迟时间
  delayDuration?: number;
  // 未来可扩展更多配置
}

export interface BreadcrumbProviderProps {
  // 子组件
  children: ReactNode;
  // 下拉菜单配置
  dropdownMenuConfig?: DropdownMenuProviderConfig;
  // 提示配置
  tooltipConfig?: TooltipProviderConfig;
}

export interface BreadcrumbContextValue {
  // 下拉菜单配置
  dropdownMenuConfig?: DropdownMenuProviderConfig;
  // 提示配置
  tooltipConfig?: TooltipProviderConfig;
}


export interface UseBreadcrumbCollapseOptions {
  // 面包屑项数组
  items: BreadcrumbItemType[];
  // 超过多少项自动折叠
  maxItems?: number;
  // 折叠前显示的项数
  itemsBeforeCollapse?: number;
  // 折叠后显示的项数
  itemsAfterCollapse?: number;
  // 当前激活项 key
  activeKey?: string | number;
}

export interface UseBreadcrumbCollapseResult {
  // 折叠前的项
  before: BreadcrumbItemType[];
  // 折叠的项
  collapsed: BreadcrumbItemType[];
  // 折叠后的项
  after: BreadcrumbItemType[];
  // 是否折叠
  isCollapsed: boolean;
  // 当前激活项 key
  currentKey: string | number | undefined;
}