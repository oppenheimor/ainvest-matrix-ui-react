export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 是否显示左侧链接图标 */
  showLinkIcon?: boolean;
  /** 左侧自定义图标 */
  leftIcon?: React.ReactNode;
  /** 是否显示右侧箭头图标 */
  showArrowIcon?: boolean;
  /** 右侧自定义图标 */
  rightIcon?: React.ReactNode;
  /** 图标大小，不传默认为16px，仅在使用默认图标时生效 */
  iconSize?: number;
  /** 是否显示下划线 */
  underline?: boolean;
  /** 是否加粗 */
  strong?: boolean;
  /** 是否强调 */
  emphasized?: boolean;
}
