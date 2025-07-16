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
    const [currentIndex, setCurrentIndex] = useState(0);
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

    // 获取子元素数组
    const childrenArray = React.Children.toArray(children);
    const totalSlides = childrenArray.length;

    // 暴露控制方法给父组件
    useImperativeHandle(ref, () => ({
      currentIndex,
      goTo: (index: number) => {
        if (index >= 0 && index < totalSlides) {
          setCurrentIndex(index);
          onChange?.(index);
        }
      },
      next: () => {
        if (loop) {
          const nextIndex = (currentIndex + 1) % totalSlides;
          setCurrentIndex(nextIndex);
          onChange?.(nextIndex);
        } else if (currentIndex < totalSlides - 1) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          onChange?.(nextIndex);
        }
      },
      prev: () => {
        if (loop) {
          const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
          setCurrentIndex(prevIndex);
          onChange?.(prevIndex);
        } else if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          setCurrentIndex(prevIndex);
          onChange?.(prevIndex);
        }
      },
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
    }));

    // 自动播放逻辑
    useEffect(() => {
      if (isPlaying && autoplay && totalSlides > 1) {
        autoplayTimerRef.current = setInterval(() => {
          setCurrentIndex((prev) => {
            // 自动播放始终循环
            const nextIndex = (prev + 1) % totalSlides;
            onChange?.(nextIndex);
            return nextIndex;
          });
        }, autoplaySpeed);
      }

      return () => {
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current);
        }
      };
    }, [isPlaying, autoplay, autoplaySpeed, totalSlides, onChange]);

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
        if (loop) {
          const nextIndex = (currentIndex + 1) % totalSlides;
          setCurrentIndex(nextIndex);
          onChange?.(nextIndex);
        } else if (currentIndex < totalSlides - 1) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          onChange?.(nextIndex);
        }
      } else if (isRightSwipe) {
        if (loop) {
          const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
          setCurrentIndex(prevIndex);
          onChange?.(prevIndex);
        } else if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          setCurrentIndex(prevIndex);
          onChange?.(prevIndex);
        }
      }

      setTouchStart(null);
      setTouchEnd(null);
    };

    // 鼠标拖拽处理
    const handleDragStart = (clientX: number) => {
      if (!draggable) return;
      onDragStart(clientX);

      // 暂停自动播放
      if (autoplay) {
        setIsPlaying(false);
      }
    };

    const handleDragMove = useCallback(
      (clientX: number) => {
        if (!isDragging || dragStartX === null) return;
        onDragMove(clientX);
      },
      [isDragging, dragStartX, onDragMove]
    );

    const handleDragEnd = useCallback(() => {
      if (!isDragging || dragStartX === null || dragCurrentX === null) return;

      const distance = dragStartX - dragCurrentX;
      const threshold = 50; // 固定阈值

      if (Math.abs(distance) > threshold) {
        if (distance > 0) {
          // 向左拖拽，显示下一张
          if (loop) {
            const nextIndex = (currentIndex + 1) % totalSlides;
            setCurrentIndex(nextIndex);
            onChange?.(nextIndex);
          } else if (currentIndex < totalSlides - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            onChange?.(nextIndex);
          }
        } else {
          // 向右拖拽，显示上一张
          if (loop) {
            const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            setCurrentIndex(prevIndex);
            onChange?.(prevIndex);
          } else if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            onChange?.(prevIndex);
          }
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
      loop,
      currentIndex,
      totalSlides,
      onChange,
    ]);

    // 鼠标事件处理
    const handleMouseEnter = () => {
      if (pauseOnHover && autoplay) {
        setIsPlaying(false);
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
      // 原有的自动播放逻辑
      if (pauseOnHover && autoplay) {
        setIsPlaying(true);
      }
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
      setCurrentIndex(index);
      onChange?.(index);
    };

    // 箭头导航处理
    const handleArrowNavigate = (direction: "prev" | "next") => {
      if (direction === "prev") {
        if (loop) {
          const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
          setCurrentIndex(prevIndex);
          onChange?.(prevIndex);
        } else if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          setCurrentIndex(prevIndex);
          onChange?.(prevIndex);
        }
      } else {
        if (loop) {
          const nextIndex = (currentIndex + 1) % totalSlides;
          setCurrentIndex(nextIndex);
          onChange?.(nextIndex);
        } else if (currentIndex < totalSlides - 1) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          onChange?.(nextIndex);
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

    if (position === "inside") {
      return (
        <div
          ref={containerRef}
          className={cn("relative w-full min-h-10", className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeaveWithDrag}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 轮播内容容器 */}
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="flex transition-transform ease-in-out"
              style={{
                transform: getTransform({
                  container: containerRef.current,
                  currentIndex,
                  totalSlides,
                }),
                width: `${100 * totalSlides}%`,
                transitionDuration: isDragging ? "0ms" : `${duration}ms`,
              }}
            >
              {childrenArray.map((child, index) => (
                <div key={index} className="w-full">
                  {child}
                </div>
              ))}
            </div>
            {/* 指示器 */}
            {showIndicators && totalSlides > 1 && (
              <Indicator
                indicatorCount={totalSlides}
                indicator={indicator}
                currentIndex={currentIndex}
                onIndicatorClick={handleIndicatorClick}
              />
            )}
          </div>
          {/* 箭头导航 */}
          {showNavigation && totalSlides > 1 && (
            <Navigation
              position={position}
              size={size}
              onNavigate={handleArrowNavigate}
              insideButtonsProps={{
                isShowLeftButton: loop || currentIndex > 0,
                isShowRightButton: loop || currentIndex < totalSlides - 1,
                xOffset,
                yOffset,
              }}
              outsideButtonsProps={{
                isStartDisable: !loop && currentIndex === 0,
                isEndDisable: !loop && currentIndex === totalSlides - 1,
                gap,
                groupClassName: groupClassName,
              }}
            />
          )}
        </div>
      );
    } else {
      return (
        <div
          className={cn(
            "flex flex-col",
            position === "bottom" && "flex-col-reverse"
          )}
        >
          {/* 箭头导航 */}
          {showNavigation && totalSlides > 1 && (
            <Navigation
              position={position}
              size={size}
              onNavigate={handleArrowNavigate}
              insideButtonsProps={{
                isShowLeftButton: loop || currentIndex > 0,
                isShowRightButton: loop || currentIndex < totalSlides - 1,
                xOffset,
                yOffset,
              }}
              outsideButtonsProps={{
                isStartDisable: !loop && currentIndex === 0,
                isEndDisable: !loop && currentIndex === totalSlides - 1,
                gap,
                groupClassName: groupClassName,
              }}
            />
          )}
          <div
            ref={containerRef}
            className={cn("relative w-full min-h-10", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeaveWithDrag}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 轮播内容容器 */}
            <div className="relative w-full h-full overflow-hidden">
              <div
                className="flex transition-transform ease-in-out"
                style={{
                  transform: getTransform({
                    container: containerRef.current,
                    currentIndex,
                    totalSlides,
                  }),
                  width: `${100 * totalSlides}%`,
                  transitionDuration: isDragging ? "0ms" : `${duration}ms`,
                }}
              >
                {childrenArray.map((child, index) => (
                  <div key={index} className="w-full">
                    {child}
                  </div>
                ))}
              </div>
              {/* 指示器 */}
              {showIndicators && totalSlides > 1 && (
                <Indicator
                  indicatorCount={totalSlides}
                  indicator={indicator}
                  currentIndex={currentIndex}
                  onIndicatorClick={handleIndicatorClick}
                />
              )}
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
