import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import { Navigation } from "./Navigation";
import { cn } from "../utils/clsx";
import { ISliderProps, ISliderRef } from "../types";
import "../styles/index.css";

// 边界元素类型定义
interface BoundaryElements {
  firstVisible: number | null; // 第一个可见元素
  lastVisible: number | null; // 最后一个可见元素
  firstFullyVisible: number | null; // 第一个完全可见元素
  lastFullyVisible: number | null; // 最后一个完全可见元素
}

export const Slider = forwardRef<ISliderRef, ISliderProps>(
  ({ children, navigation, className, disableSlide = false }, ref) => {
    const { size = "medium" } = navigation || {};
    const position =
      navigation && "position" in navigation ? navigation.position : "inside";
    const gap = navigation && "gap" in navigation ? navigation.gap : 10;
    const xOffset =
      navigation && "xOffset" in navigation ? navigation.xOffset : 0;
    const yOffset =
      navigation && "yOffset" in navigation ? navigation.yOffset : 0;
    const groupClassName =
      navigation && "groupClassName" in navigation
        ? navigation.groupClassName
        : "";
    const containerRef = useRef<HTMLDivElement>(null);

    // 按钮状态 - 基于实际滚动位置
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    // 获取子元素数组
    const childrenArray = React.Children.toArray(children);
    const totalItems = childrenArray.length;

    // 精确检测边界元素
    const findBoundaryElements = useCallback(
      (container: HTMLElement): BoundaryElements => {
        const children = Array.from(container.children) as HTMLElement[];
        const containerRect = container.getBoundingClientRect();

        const result: BoundaryElements = {
          firstVisible: null,
          lastVisible: null,
          firstFullyVisible: null,
          lastFullyVisible: null,
        };

        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (!child) continue;

          const childRect = child.getBoundingClientRect();
          const relativeLeft = childRect.left - containerRect.left;
          const relativeRight = relativeLeft + child.offsetWidth;

          // 可见：元素与容器有任何交集
          const isVisible =
            relativeLeft < container.clientWidth && relativeRight > 0;

          // 完全可见：元素完全在容器边界内
          const isFullyVisible =
            relativeLeft >= 0 && relativeRight <= container.clientWidth;

          // 记录第一个和最后一个可见元素
          if (isVisible) {
            if (result.firstVisible === null) {
              result.firstVisible = i;
            }
            result.lastVisible = i;
          }

          if (isFullyVisible) {
            if (result.firstFullyVisible === null) {
              result.firstFullyVisible = i;
            }
            result.lastFullyVisible = i;
          }
        }

        return result;
      },
      []
    );

    // 计算滚动目标索引
    const findScrollTarget = useCallback(
      (direction: "prev" | "next", container: HTMLElement): number | null => {
        const boundaryElements = findBoundaryElements(container);

        if (direction === "next") {
          // 下一页：最后一个完全可见元素的下一个
          return boundaryElements.lastFullyVisible !== null
            ? boundaryElements.lastFullyVisible + 1
            : null;
        } else {
          // 上一页：基于第一个可见元素判断
          const firstVisible = boundaryElements.firstVisible;
          if (firstVisible !== null) {
            // 检查第一个可见元素是否完全可见
            const isFirstVisibleFullyVisible =
              firstVisible === boundaryElements.firstFullyVisible;

            if (isFirstVisibleFullyVisible) {
              // 第一个可见元素完全展示，取它的上一个元素
              return firstVisible - 1;
            } else {
              // 第一个可见元素未完全展示，该元素成为目标
              return firstVisible;
            }
          }
          return null;
        }
      },
      [findBoundaryElements]
    );

    // 更新按钮状态
    const updateButtonStates = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(scrollLeft >= scrollWidth - clientWidth);
    }, []);

    // 智能滚动到下一个可见位置
    const scrollToNextVisible = useCallback(
      (direction: "prev" | "next") => {
        const container = containerRef.current;
        if (!container) return;

        const targetIndex = findScrollTarget(direction, container);
        if (targetIndex === null) return;

        const children = Array.from(container.children) as HTMLElement[];
        if (targetIndex < 0 || targetIndex >= children.length) {
          // 滚动到最左侧或最右侧
          container.scrollTo(
            direction === "prev"
              ? {
                  left: 0,
                  behavior: "smooth",
                }
              : {
                  left: container.scrollWidth,
                  behavior: "smooth",
                }
          );
          return;
        }

        const targetElement = children[targetIndex];

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: direction === "next" ? "start" : "end",
        });
      },
      [findScrollTarget]
    );

    // 处理导航事件
    const handleNavigate = useCallback(
      (direction: "prev" | "next") => {
        scrollToNextVisible(direction);
      },
      [scrollToNextVisible]
    );

    // 暴露控制方法
    useImperativeHandle(ref, () => ({
      goTo: (index: number) => {
        // 滚动到指定元素位置
        if (index >= 0 && index < totalItems) {
          const container = containerRef.current;
          if (container) {
            const children = Array.from(container.children) as HTMLElement[];
            if (index < children.length) {
              const targetElement = children[index];
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "start",
                });
              }
            }
          }
        }
      },
      next: () => scrollToNextVisible("next"),
      prev: () => scrollToNextVisible("prev"),
    }));

    // 监听滚动事件，更新按钮状态
    useEffect(() => {
      const handleScroll = () => {
        updateButtonStates();
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
      }
    }, [updateButtonStates]);

    // 初始化按钮状态
    useEffect(() => {
      const timer = setTimeout(() => {
        updateButtonStates();
      }, 0);

      return () => clearTimeout(timer);
    }, [updateButtonStates]);

    const navigationProps = {
      position,
      size,
      onNavigate: handleNavigate,
      insideButtonsProps: {
        isShowLeftButton: !isAtStart,
        isShowRightButton: !isAtEnd,
        xOffset,
        yOffset,
      },
      outsideButtonsProps: {
        isStartDisable: isAtStart,
        isEndDisable: isAtEnd,
        gap,
        groupClassName: groupClassName,
      },
    };

    // 容器组件
    const containerElement = (
      <div
        ref={containerRef}
        className={cn(
          "flex items-center flex-nowrap overflow-x-auto",
          disableSlide ? "overflow-x-hidden" : "overflow-x-auto scrollbar-hide",
          className
        )}
      >
        {children}
      </div>
    );

    if (position === "inside") {
      return (
        <div className="relative w-fit">
          {containerElement}
          <Navigation {...navigationProps} />
        </div>
      );
    }

    return (
      <div
        className={cn(
          "flex flex-col w-fit",
          position === "bottom" && "flex-col-reverse"
        )}
      >
        <Navigation {...navigationProps} />
        {containerElement}
      </div>
    );
  }
);
