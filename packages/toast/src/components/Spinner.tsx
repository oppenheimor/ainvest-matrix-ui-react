import clsx from "clsx";

/**
 * Spinner 加载动画组件
 * 主要功能：渲染 Toast 及其他场景下的加载中动画
 * 导出内容：Spinner 组件
 * 适用场景：Toast、按钮等需要 loading 态的场合
 * 
 * Spinner component: universal loading animation for Toast, buttons, etc.
 */
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ size = 'md', className }) => {
  // 尺寸映射表，支持三种尺寸
  // Size mapping: supports three sizes
  const sizeMap = { sm: 16, md: 24, lg: 32 };
  const s = sizeMap[size] || 24;
  // 圆心半径
  // Spinner radius
  const r = (s / 2) - 2;
  const center = s / 2;
  // 分段数，决定动画线条数量
  // Number of segments (lines) in the spinner
  const segments = 8;

  // 生成每一根动画线条，角度和透明度递增
  // Generate each animated line, with increasing angle and opacity
  const lines = Array.from({ length: segments }).map((_, i) => {
    const angle = (360 / segments) * i;
    const opacity = 0.2 + (i / segments) * 0.8; // 从 0.2 到 1 渐变
    return (
      <line
        key={i}
        x1={center}
        y1={center - r}
        x2={center}
        y2={center - r + 4}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={opacity}
        transform={`rotate(${angle} ${center} ${center})`}
      />
    );
  });

  return (
    <svg
      // Tailwind animate-spin 实现旋转动画
      // Tailwind animate-spin for rotation animation
      className={clsx("animate-spin", className)}
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Loading" // 可访问性：为辅助技术标记 loading
    >
      {lines}
    </svg>
  );
};
