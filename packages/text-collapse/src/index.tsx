import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  forwardRef,
  useCallback,
} from "react";
import { MeasureText } from "./components/MeasureText";
import { getNodesLen, sliceNodes, toArray } from "./utils/tools";
import { MeasureStatus } from "./constants";
import { MeasureTextRef, TextCollapseProps } from "./types";

export const TextCollapse = forwardRef<HTMLDivElement, TextCollapseProps>(
  (
    {
      text,
      rows = 3,
      expandLabel,
      defaultExpanded = false,
      collapseLabel,
      className,
      onExpandChange,
    },
    ref
  ) => {
    // 当前是否为展开状态
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const [containerWidth, setContainerWidth] = useState(0);
    const [needEllipsis, setNeedEllipsis] = useState(MeasureStatus.None);
    const [canEllipsis, setCanEllipsis] = useState(false);
    const [ellipsisCutIndex, setEllipsisCutIndex] = useState<
      [number, number] | null
    >(null);
    const [ellipsisHeight, setEllipsisHeight] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const needEllipsisRef = useRef<MeasureTextRef>(null);
    const cutMidRef = useRef<MeasureTextRef>(null);

    const mergeRefs = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const nodeList = useMemo(() => toArray(text), [text]);
    const nodeLen = useMemo(() => getNodesLen(nodeList), [nodeList]);

    // 监听容器尺寸变化
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });

      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }, []);

    // 启动测量流程
    useLayoutEffect(() => {
      if (containerWidth && nodeLen) {
        setNeedEllipsis(MeasureStatus.Prepare);
      } else {
        setNeedEllipsis(MeasureStatus.None);
        setCanEllipsis(false);
      }
    }, [containerWidth, text, rows, nodeList, nodeLen]);

    // 执行测量
    useLayoutEffect(() => {
      if (needEllipsis === MeasureStatus.Prepare) {
        setNeedEllipsis(MeasureStatus.Start);
      } else if (needEllipsis === MeasureStatus.Start) {
        const isOverflow = needEllipsisRef.current?.isExceed() || false;

        setNeedEllipsis(
          isOverflow ? MeasureStatus.NeedEllipsis : MeasureStatus.NoNeedEllipsis
        );
        setEllipsisCutIndex(isOverflow ? [0, nodeLen] : null);
        setCanEllipsis(isOverflow);

        // 设置省略高度基准
        const baseHeight = needEllipsisRef.current?.getHeight() || 0;
        setEllipsisHeight(baseHeight);
      }
    }, [needEllipsis, nodeLen]);

    // 二分查找最佳截断位置
    const cutMidIndex = ellipsisCutIndex
      ? Math.ceil((ellipsisCutIndex[0] + ellipsisCutIndex[1]) / 2)
      : 0;

    useLayoutEffect(() => {
      const cutIndex = ellipsisCutIndex;
      if (!cutIndex) return;

      const [minIndex, maxIndex] = cutIndex;
      if (minIndex !== maxIndex) {
        const midHeight = cutMidRef.current?.getHeight() || 0;
        const isOverflow = midHeight > ellipsisHeight;

        let targetMidIndex = cutMidIndex;
        if (maxIndex - minIndex === 1) {
          targetMidIndex = isOverflow ? minIndex : maxIndex;
        }

        setEllipsisCutIndex(
          isOverflow ? [minIndex, targetMidIndex] : [targetMidIndex, maxIndex]
        );
      }
    }, [ellipsisCutIndex, cutMidIndex, ellipsisHeight]);

    // 处理展开/收起
    const handleExpandChange = () => {
      const newExpanded = !internalExpanded;
      if (!newExpanded && !collapseLabel) return;
      setInternalExpanded(newExpanded);
      onExpandChange?.(newExpanded);
    };

    // 渲染展开/收起按钮
    const renderButton = () => {
      if (internalExpanded && !collapseLabel) return null;
      return (
        <span
          onClick={handleExpandChange}
          className="ml-4 text-text-link cursor-pointer"
        >
          {internalExpanded ? collapseLabel : expandLabel}
        </span>
      );
    };

    const renderContent = () => {
      if (!canEllipsis) {
        return <>{nodeList}</>;
      }
      if (internalExpanded) {
        return (
          <>
            {nodeList}
            {renderButton()}
          </>
        );
      }

      // 如果正在测量或还没有截断位置，显示限制行数的内容
      if (
        needEllipsis !== MeasureStatus.NeedEllipsis ||
        !ellipsisCutIndex ||
        ellipsisCutIndex[0] !== ellipsisCutIndex[1]
      ) {
        return (
          <div
            className="overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: rows,
              WebkitBoxOrient: "vertical",
            }}
          >
            {nodeList}
          </div>
        );
      }

      // 显示截断后的内容 + 省略号 + 展开按钮
      const cutContent = sliceNodes(nodeList, ellipsisCutIndex[0]);
      return (
        <>
          {cutContent}
          <span className="inline">...</span>
          {renderButton()}
        </>
      );
    };

    // 测量样式
    const measureStyle: React.CSSProperties = {
      width: containerWidth,
      margin: 0,
      padding: 0,
      lineHeight: "inherit",
      fontSize: "inherit",
      fontFamily: "inherit",
    };

    const lineClampStyle: React.CSSProperties = {
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
    };

    return (
      <div ref={mergeRefs} className={className}>
        {renderContent()}
        {/* 测量是否需要省略 */}
        {needEllipsis === MeasureStatus.Start && (
          <MeasureText
            style={{
              ...measureStyle,
              ...lineClampStyle,
              WebkitLineClamp: rows,
            }}
            ref={needEllipsisRef}
          >
            {nodeList}
          </MeasureText>
        )}

        {/* 二分查找测量 */}
        {needEllipsis === MeasureStatus.NeedEllipsis &&
          ellipsisCutIndex &&
          ellipsisCutIndex[0] !== ellipsisCutIndex[1] && (
            <MeasureText style={measureStyle} ref={cutMidRef}>
              <>
                {sliceNodes(nodeList, cutMidIndex)}
                <span>...</span>
                {renderButton()}
              </>
            </MeasureText>
          )}
      </div>
    );
  }
);

TextCollapse.displayName = "TextCollapse";

export default TextCollapse;
