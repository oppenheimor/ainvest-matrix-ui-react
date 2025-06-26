export type PaginationLinkProps = {
  /** 是否为当前活动页 */
  isActive?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
} & React.ComponentProps<"a">;

export interface UsePaginationProps {
  /** 总页数 */
  totalPage: number;
  /** 当前页 */
  page: number;
  /** 当前页码每一侧显示的页码数量。默认为 3。 */
  siblings?: number;
  /** 列表开头和结尾显示的页码数量。默认为 1。 */
  boundaries?: number;
}