import { forwardRef } from "react";
import { Panel } from "./components/Panel";
import { List } from "./components/List";
import type { IPanelProps, IPanelRef } from "./types";

// 定义 Collapse 组件的类型
interface CollapseComponent
  extends React.ForwardRefExoticComponent<
    IPanelProps & React.RefAttributes<IPanelRef>
  > {
  List: typeof List;
}

export const Collapse = forwardRef<IPanelRef, IPanelProps>((props, ref) => {
  return <Panel {...props} ref={ref} />;
}) as CollapseComponent;

Collapse.List = List;

Collapse.displayName = "Collapse";
