interface LineIconProps {
  total: number;
  current: number;
  width?: number;
  height?: number;
}

export const LineIcon = ({
  total,
  current,
  width = 36,
  height = 6,
}: LineIconProps) => {
  // 计算激活部分的宽度
  const activeWidth = width / total;
  const activeX = current * activeWidth;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      {/* 背景部分 - 整个圆角矩形显示为半透明 */}
      <path
        d={`M0 3C0 1.34315 1.34315 0 3 0H${width - 3}C${
          width - 1.34315
        } 0 ${width} 1.34315 ${width} 3C${width} 4.65685 ${width - 1.34315} 6 ${
          width - 3
        } 6H3C1.34315 6 0 4.65685 0 3Z`}
        fill="var(--atom-color-divider-level2)"
      />

      {/* 激活部分 - 当前索引对应的部分显示为实心 */}
      <path
        d={`M${activeX} 3C${activeX} 1.34315 ${activeX + 1.34315} 0 ${
          activeX + 3
        } 0H${activeX + activeWidth - 3}C${activeX + activeWidth - 1.34315} 0 ${
          activeX + activeWidth
        } 1.34315 ${activeX + activeWidth} 3C${activeX + activeWidth} 4.65685 ${
          activeX + activeWidth - 1.34315
        } 6 ${activeX + activeWidth - 3} 6H${activeX + 3}C${
          activeX + 1.34315
        } 6 ${activeX} 4.65685 ${activeX} 3Z`}
        fill="var(--atom-color-text-primary)"
      />
    </svg>
  );
};
