export const Ellipsis = "...";

export enum MeasureStatus {
  /** 初始状态 */
  None,
  /** 准备测量 */
  Prepare,
  /** 开始测量 */
  Start,
  /** 需要省略号 */
  NeedEllipsis,
  /** 不需要省略号 */
  NoNeedEllipsis,
}
