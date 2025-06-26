// 定义不同大小按钮的尺寸和移动距离
export const SIZE_MAP = {
  lg: {
    width: 52,
    height: 32,
    thumbWidth: 28,
    thumbHeight: 28,
    moveX: "data-[state=checked]:translate-x-[20px]",
  },
  md: {
    width: 39,
    height: 24,
    thumbWidth: 20,
    thumbHeight: 20,
    moveX: "data-[state=checked]:translate-x-[15px]",
  },
  sm: {
    width: 26,
    height: 16,
    thumbWidth: 12,
    thumbHeight: 12,
    moveX: "data-[state=checked]:translate-x-[10px]",
  },
};