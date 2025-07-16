import {
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { cn } from "../utils/clsx";
import { ActionLabel } from "./ActionLabel";
import { IListProps, IListRef } from "../types";

function ListInner<T extends { key: string }>(
  {
    items,
    renderItem,
    visibleCount = 3,
    defaultExpanded = false,
    onExpandChange,
    className,
    actionLabel = {
      type: "text",
      collapseLabel: "View Less",
      expandLabel: "View All",
      underline: false,
    },
  }: IListProps<T>,
  ref: React.ForwardedRef<IListRef>
) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCount = items.length;
  const shouldShowButton = totalCount > visibleCount;
  const displayCount = expanded ? totalCount : visibleCount;

  const handleToggle = useCallback(() => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onExpandChange?.(newExpanded);
  }, [expanded, onExpandChange]);

  useImperativeHandle(
    ref,
    () => ({
      expand: () => {
        if (!expanded) {
          setExpanded(true);
          onExpandChange?.(true);
        }
      },
      collapse: () => {
        if (expanded) {
          setExpanded(false);
          onExpandChange?.(false);
        }
      },
      toggle: handleToggle,
      isExpanded: () => expanded,
    }),
    [expanded, onExpandChange, handleToggle]
  );

  if (totalCount === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-foreground-layer1 text-text-primary",
        className
      )}
    >
      <div ref={containerRef} className="flex flex-col">
        {items.slice(0, displayCount).map((item, index) => (
          <div key={item.key}>{renderItem(item, index)}</div>
        ))}
      </div>
      {shouldShowButton && (
        <ActionLabel
          actionLabel={actionLabel}
          handleToggle={handleToggle}
          expanded={expanded}
        />
      )}
    </div>
  );
}

ListInner.displayName = "List";

export const List = forwardRef(ListInner) as <T extends { key: string }>(
  props: IListProps<T> & { ref?: React.ForwardedRef<IListRef> }
) => JSX.Element;
