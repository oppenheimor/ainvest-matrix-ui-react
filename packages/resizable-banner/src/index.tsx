import React, { useRef, useEffect, useState, useMemo } from "react";
import { cn } from "./utils/clsx";

// 区间断点类型，支持 scale 和 height
interface BannerBreakpoint {
  // 最小宽度
  min: number;
  // 最大宽度
  max: number;
  // 高度
  height: number | string;
  // 图片缩放比例（越小裁切越多，1 为 cover 效果）
  scale?: number;
}

interface ResizableBannerProps {
  // 图片地址
  src: string;
  // 区间断点数组
  bannerBreakpoints?: BannerBreakpoint[];
  // 子元素
  children?: React.ReactNode;
  // 自定义 class
  className?: string;
  // 内联样式
  style?: React.CSSProperties;
  // 无障碍文本
  alt?: string;
}

const DEFAULT_BANNER_BREAKPOINT = [
  { min: 0, max: 500, scale: 1.4, height: 113 },
  { min: 501, max: 990, scale: 1.25, height: 141 },
  { min: 991, max: Infinity, scale: 1, height: 188 },
]

/**
 * 根据当前容器宽度和断点数组，返回当前区间的 height 和 scale
 */
function getBreakpointConfig(
  width: number,
  breakpoints?: BannerBreakpoint[]
): { height: number | string; scale: number } {
  if (breakpoints && breakpoints.length > 0) {
    for (const bp of breakpoints) {
      if (width >= bp.min && width <= bp.max) {
        return { height: bp.height, scale: bp.scale ?? 1 };
      }
    }
  }
  return { height: "100%", scale: 1 };
}

/**
 * ResizableBanner 组件
 * - 宽度自适应父容器，图片内容按区间 scale 裁切
 * - 高度按区间固定
 * - 支持 tailwind 背景色与图片叠加
 */
export const ResizableBanner: React.FC<ResizableBannerProps> = ({
  src,
  alt = "banner",
  className,
  style,
  bannerBreakpoints = DEFAULT_BANNER_BREAKPOINT,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!bannerBreakpoints || bannerBreakpoints.length === 0) {
      setContainerWidth(containerRef.current.offsetWidth);
      return;
    }
    const observer = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    setContainerWidth(containerRef.current.offsetWidth);
    return () => {
      observer.disconnect();
    };
  }, [bannerBreakpoints]);

  // 计算当前断点的 height 和 scale
  const { height, scale } = useMemo(() => {
    return getBreakpointConfig(containerWidth, bannerBreakpoints);
  }, [containerWidth, bannerBreakpoints]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden relative w-full", className)}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
    >
      {/* 内层 div 用于渲染图片，cover+transform scale 放大 */}
      <div
        className="absolute inset-0 z-0 w-full h-full bg-no-repeat pointer-events-none select-none"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          transition: "transform 0.3s cubic-bezier(.4,0,.2,1), background-size 0.3s cubic-bezier(.4,0,.2,1)",
          transform: scale > 1 ? `scale(${scale})` : undefined,
          transformOrigin: "center",
        }}
        aria-label={alt}
        role="img"
      />
      {children && <div>{children}</div>}
    </div>
  );
};
