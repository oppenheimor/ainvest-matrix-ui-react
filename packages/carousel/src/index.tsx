import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useCallback,
} from "react";
import { Slider } from "./components/Slider";
import { Indicator } from "./components/Indicator";
import { Navigation } from "./components/Navigation";
import { useDrag } from "./hooks/useDrag";
import { cn } from "./utils/clsx";
import { throttle } from "./utils/throttle";
import { ICarouselProps, ICarouselRef } from "./types";

const Carousel = forwardRef<ICarouselRef, ICarouselProps>(
  (
    {
      children,
      autoplay = false,
      autoplaySpeed = 3000,
      showIndicators = true,
      indicator = "dots",
      showNavigation = false,
      navigation,
      className,
      duration = 300,
      pauseOnHover = true,
      touchable = true,
      draggable = true,
      loop = false,
      onChange,
    },
    ref
  ) => {
    const { size = "medium", position = "inside" } = navigation || {};
    const gap = navigation && "gap" in navigation ? navigation.gap : 10;
    const xOffset =
      navigation && "xOffset" in navigation ? navigation.xOffset : 0;
    const yOffset =
      navigation && "yOffset" in navigation ? navigation.yOffset : 0;
    const groupClassName =
      navigation && "groupClassName" in navigation
        ? navigation.groupClassName
        : "";

    // 获取原始子元素数组
    const childrenArray = React.Children.toArray(children);
    const totalSlides = childrenArray.length;

    // 添加首尾克隆以实现无缝轮播
    const extendedChildren = useMemo(() => {
      if ((!autoplay && !loop) || totalSlides <= 1) return childrenArray;
      return [
        childrenArray[childrenArray.length - 1], // 克隆最后一张放在开头
        ...childrenArray,
        childrenArray[0], // 克隆第一张放在结尾
      ];
    }, [childrenArray, autoplay, loop, totalSlides]);

    const extendedTotalSlides = extendedChildren.length;

    // 初始索引调整（autoplay 或 loop 模式下从真实的第一张开始）
    const [currentIndex, setCurrentIndex] = useState(autoplay || loop ? 1 : 0);
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const {
      isDragging,
      dragStartX,
      dragCurrentX,
      getTransform,
      onDragStart,
      onDragMove,
      clearDragState,
    } = useDrag();

    // 引用管理
    const containerRef = useRef<HTMLDivElement>(null);
    const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
    const isTransitioningRef = useRef(false);

    // 计算真实索引（用于指示器和回调）
    const realIndex = useMemo(() => {
      if ((!autoplay && !loop) || totalSlides <= 1) return currentIndex;

      if (currentIndex === 0) {
        return totalSlides - 1;
      } else if (currentIndex === extendedTotalSlides - 1) {
        return 0;
      }
      return currentIndex - 1;
    }, [currentIndex, autoplay, loop, totalSlides, extendedTotalSlides]);

    // 提取导航逻辑为通用函数
    const navigateToNext = useCallback(() => {
      if (autoplay || loop) {
        setCurrentIndex((prev) => (prev + 1) % extendedTotalSlides);
      } else if (currentIndex < totalSlides - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
      }
    }, [autoplay, loop, currentIndex, totalSlides, extendedTotalSlides]);

    const navigateToPrev = useCallback(() => {
      if (autoplay || loop) {
        setCurrentIndex(
          (prev) => (prev - 1 + extendedTotalSlides) % extendedTotalSlides
        );
      } else if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
      }
    }, [autoplay, loop, currentIndex, extendedTotalSlides]);

    // 暴露控制方法给父组件
    useImperativeHandle(ref, () => ({
      currentIndex: autoplay || loop ? realIndex : currentIndex,
      goTo: (index: number) => {
        if (index >= 0 && index < totalSlides) {
          const newIndex = autoplay || loop ? index + 1 : index;
          setCurrentIndex(newIndex);
        }
      },
      next: navigateToNext,
      prev: navigateToPrev,
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
    }));

    // 自动播放逻辑（支持无缝轮播）
    useEffect(() => {
      if (isPlaying && autoplay && extendedTotalSlides > 1) {
        autoplayTimerRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % extendedTotalSlides);
        }, autoplaySpeed);
      }

      return () => {
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current);
        }
      };
    }, [isPlaying, autoplay, autoplaySpeed, extendedTotalSlides]);

    // 处理无缝循环跳转（当 autoplay 或 loop 为 true 时）
    useEffect(() => {
      if (!(autoplay || loop) || extendedTotalSlides <= 2) return;

      const handleTransitionEnd = () => {
        isTransitioningRef.current = false;
        if (currentIndex === 0) {
          // 跳转到真实最后一张（无动画）
          isTransitioningRef.current = true;
          setCurrentIndex(extendedTotalSlides - 2);
        } else if (currentIndex === extendedTotalSlides - 1) {
          // 跳转到真实第一张（无动画）
          isTransitioningRef.current = true;
          setCurrentIndex(1);
        }
      };

      if (currentIndex === 0 || currentIndex === extendedTotalSlides - 1) {
        isTransitioningRef.current = true;
        // 设置超时以确保跳转发生在动画之后
        const timer = setTimeout(handleTransitionEnd, duration + 50);
        return () => clearTimeout(timer);
      }

      // 触发变化回调
      onChange?.(realIndex);
    }, [
      currentIndex,
      autoplay,
      loop,
      extendedTotalSlides,
      duration,
      onChange,
      realIndex,
    ]);

    // 处理非循环模式下的 onChange 回调
    useEffect(() => {
      if (autoplay || loop || totalSlides <= 1) return;

      // 只在非循环模式下触发 onChange
      onChange?.(currentIndex);
    }, [currentIndex, autoplay, loop, totalSlides, onChange]);

    // 处理跳转完成后的状态重置
    useEffect(() => {
      if (!(autoplay || loop) || extendedTotalSlides <= 2) return;

      // 当跳转到真实的第一张或最后一张时，重置过渡状态
      if (currentIndex === 1 || currentIndex === extendedTotalSlides - 2) {
        const timer = setTimeout(() => {
          isTransitioningRef.current = false;
        }, 10);
        return () => clearTimeout(timer);
      }
    }, [currentIndex, autoplay, loop, extendedTotalSlides]);

    // 触摸事件处理
    const handleTouchStart = (e: React.TouchEvent) => {
      if (!touchable) return;
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!touchable) return;
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchable || touchStart === null || touchEnd === null) return;

      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe) {
        navigateToNext();
      } else if (isRightSwipe) {
        navigateToPrev();
      }

      setTouchStart(null);
      setTouchEnd(null);
    };

    // 鼠标拖拽处理
    const handleDragStart = (clientX: number) => {
      if (!draggable || isTransitioningRef.current) return;
      onDragStart(clientX);

      // 暂停自动播放
      if (autoplay) {
        setIsPlaying(false);
      }
    };

    const handleDragMove = useCallback(
      (clientX: number) => {
        if (!isDragging || dragStartX === null || isTransitioningRef.current)
          return;
        onDragMove(clientX);
      },
      [isDragging, dragStartX, onDragMove]
    );

    const handleDragEnd = useCallback(() => {
      if (
        !isDragging ||
        dragStartX === null ||
        dragCurrentX === null ||
        isTransitioningRef.current
      )
        return;

      const distance = dragStartX - dragCurrentX;
      const threshold = 50; // 固定阈值

      if (Math.abs(distance) > threshold) {
        if (distance > 0) {
          // 向左拖拽，显示下一张
          navigateToNext();
        } else {
          // 向右拖拽，显示上一张
          navigateToPrev();
        }
      }

      // 重置拖拽状态
      clearDragState();

      // 恢复自动播放
      if (autoplay) {
        setIsPlaying(true);
      }
    }, [
      isDragging,
      dragStartX,
      dragCurrentX,
      clearDragState,
      autoplay,
      navigateToNext,
      navigateToPrev,
    ]);

    // 鼠标事件处理
    const handleMouseEnter = () => {
      if (pauseOnHover && autoplay) {
        setIsPlaying(false);
      }
    };

    const handleMouseLeave = () => {
      if (pauseOnHover && autoplay) {
        setIsPlaying(true);
      }
    };

    // 鼠标拖拽事件处理
    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      handleDragStart(e.clientX);
    };

    const throttledMouseMove = useMemo(
      () =>
        throttle((clientX: number) => {
          handleDragMove(clientX);
        }, 16),
      [handleDragMove]
    );

    const handleMouseMove = (e: React.MouseEvent) => {
      throttledMouseMove(e.clientX);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    const handleMouseLeaveWithDrag = () => {
      if (isDragging) {
        handleDragEnd();
      }
      handleMouseLeave();
    };

    // 全局鼠标事件监听器
    useEffect(() => {
      if (isDragging) {
        const handleGlobalMouseMove = (e: MouseEvent) => {
          throttledMouseMove(e.clientX);
        };

        const handleGlobalMouseUp = () => {
          handleDragEnd();
        };

        document.addEventListener("mousemove", handleGlobalMouseMove);
        document.addEventListener("mouseup", handleGlobalMouseUp);

        return () => {
          document.removeEventListener("mousemove", handleGlobalMouseMove);
          document.removeEventListener("mouseup", handleGlobalMouseUp);
        };
      }
    }, [handleDragEnd, isDragging, throttledMouseMove]);

    // 指示器点击处理
    const handleIndicatorClick = (index: number) => {
      const targetIndex = autoplay || loop ? index + 1 : index;
      setCurrentIndex(targetIndex);
    };

    // 箭头导航处理
    const handleArrowNavigate = (direction: "prev" | "next") => {
      if (direction === "prev") {
        if (autoplay || loop) {
          setCurrentIndex(
            (prev) => (prev - 1 + extendedTotalSlides) % extendedTotalSlides
          );
        } else if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          setCurrentIndex(prevIndex);
        }
      } else {
        if (autoplay || loop) {
          setCurrentIndex((prev) => (prev + 1) % extendedTotalSlides);
        } else if (currentIndex < totalSlides - 1) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
        }
      }
    };

    // 如果只有一个或没有子元素，不渲染轮播图功能
    if (totalSlides <= 1) {
      return (
        <div
          className={cn("relative flex items-center justify-center", className)}
        >
          <div className="w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>
      );
    }

    // 当前渲染的子元素数组
    const renderChildren = autoplay || loop ? extendedChildren : childrenArray;
    const renderTotalSlides =
      autoplay || loop ? extendedTotalSlides : totalSlides;

    // 渲染内容
    const renderContent = () => (
      <div
        className="flex transition-transform ease-in-out"
        style={{
          transform: getTransform({
            container: containerRef.current,
            currentIndex,
            totalSlides: renderTotalSlides,
          }),
          width: `${100 * renderTotalSlides}%`,
          transitionDuration:
            isDragging || isTransitioningRef.current ? "0ms" : `${duration}ms`,
        }}
      >
        {renderChildren.map((child, index) => (
          <div key={`slide-${index}`} className="w-full">
            {child}
          </div>
        ))}
      </div>
    );

    // 渲染指示器
    const renderIndicators = () =>
      showIndicators &&
      totalSlides > 1 && (
        <Indicator
          indicatorCount={totalSlides}
          indicator={indicator}
          currentIndex={autoplay || loop ? realIndex : currentIndex}
          onIndicatorClick={handleIndicatorClick}
        />
      );

    // 渲染导航
    const renderNavigation = () =>
      showNavigation &&
      totalSlides > 1 && (
        <Navigation
          position={position}
          size={size}
          onNavigate={handleArrowNavigate}
          insideButtonsProps={{
            isShowLeftButton:
              loop || (autoplay || loop ? realIndex > 0 : currentIndex > 0),
            isShowRightButton:
              loop ||
              (autoplay || loop
                ? realIndex < totalSlides - 1
                : currentIndex < totalSlides - 1),
            xOffset,
            yOffset,
          }}
          outsideButtonsProps={{
            isStartDisable:
              !loop &&
              (autoplay || loop ? realIndex === 0 : currentIndex === 0),
            isEndDisable:
              !loop &&
              (autoplay || loop
                ? realIndex === totalSlides - 1
                : currentIndex === totalSlides - 1),
            gap,
            groupClassName: groupClassName,
          }}
        />
      );

    // 根据导航位置渲染不同结构
    if (position === "inside") {
      return (
        <div
          ref={containerRef}
          className={cn("relative w-full", className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeaveWithDrag}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full overflow-hidden">
            {renderContent()}
            {renderIndicators()}
          </div>
          {renderNavigation()}
        </div>
      );
    } else {
      return (
        <div
          className={cn(
            "flex flex-col gap-6",
            position === "bottom" && "flex-col-reverse"
          )}
        >
          {renderNavigation()}
          <div
            ref={containerRef}
            className={cn("relative w-full", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeaveWithDrag}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full h-full overflow-hidden">
              {renderContent()}
              {renderIndicators()}
            </div>
          </div>
        </div>
      );
    }
  }
);

const CarouselComponent = Object.assign(Carousel, {
  Slider,
});

export { CarouselComponent as Carousel };
