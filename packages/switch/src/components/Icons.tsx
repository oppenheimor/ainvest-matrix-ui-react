import { cn } from "../utils";

/**
 * 开关选中状态图标
 * @param width 宽度
 * @param height 高度
 */
export const CHECK_ICON = (width: number, height: number) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15 * (width / 52)}
    height={12 * (height / 32)}
    viewBox="0 0 15 12"
    fill="none"
    // 当未选中时隐藏图标
    className={cn("group-data-[state=unchecked]:invisible")}
  >
    <path
      d="M14.0225 1.50598L5.00694 10.5216L1 6.51465"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

/**
 * 开关加载状态图标
 * @param width 宽度
 * @param height 高度
 */
export const LOADING_ICON = (width: number, height: number) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16 * (width / 52)}
    height={16 * (height / 32)}
    viewBox="0 0 16 16"
    fill="none"
    // 添加旋转动画
    className="animate-spin"
  >
    <path
      d="M7.99922 15.8002C3.69922 15.8002 0.199219 12.3002 0.199219 8.0002C0.199219 3.7002 3.69922 0.200195 7.99922 0.200195C11.4492 0.200195 14.4492 2.4002 15.4492 5.7002C15.5492 6.0502 15.3492 6.4502 14.9992 6.5502C14.6492 6.6502 14.2492 6.4502 14.1492 6.1002C13.2992 3.4002 10.8492 1.6002 7.99922 1.6002C4.44922 1.5502 1.54922 4.4502 1.54922 8.0002C1.54922 11.5502 4.44922 14.4502 7.99922 14.4502C10.8492 14.4502 13.2992 12.6502 14.1492 9.9502C14.2492 9.60019 14.6492 9.4002 14.9992 9.5002C15.3492 9.6002 15.5492 10.0002 15.4492 10.3502C14.4492 13.6002 11.4492 15.8002 7.99922 15.8002Z"
      fill="currentColor"
    />
  </svg>
);
