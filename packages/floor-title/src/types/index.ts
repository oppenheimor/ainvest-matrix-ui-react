import React from "react";
import { CollapseModeMap, FloorLevelMap } from "../constants";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type EventKeys = keyof {
  [K in keyof DivProps as K extends `on${string}` ? K : never]: DivProps[K];
};
export type CustomEventProps = {
  [K in EventKeys as `onTitle${Capitalize<
    string & K extends `on${infer R}` ? R : never
  >}`]?: DivProps[K];
};

export type CollapseMode =
  (typeof CollapseModeMap)[keyof typeof CollapseModeMap];
export type FloorLevel = (typeof FloorLevelMap)[keyof typeof FloorLevelMap];

export interface FloorTitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CustomEventProps {
  /** 标题级别：1-3级 */
  level: FloorLevel;
  /** 标题文本 */
  title: string;
  /** 标题文本样式 */
  titleClassName?: string;
  /** 标题描述 */
  description?: string;
  /** 自定义标题右侧元素，仅在collapsible为false时生效 */
  titleIcon?: React.ReactNode;
  /** 自定义操作栏元素 */
  actionBarElement?: React.ReactNode;
  /** 折叠配置，none不可折叠，content仅折叠目录，description仅折叠描述，all全部折叠 */
  collapseMode?: CollapseMode;
  /** 初始状态是否折叠，默认不折叠，仅在collapseMode不为none时生效 */
  defaultCollapsed?: boolean;
}
