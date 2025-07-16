import { useCallback, useState } from "react";

export const useDrag = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragCurrentX, setDragCurrentX] = useState<number | null>(null);

  /** 开始拖拽 */
  const onDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragCurrentX(clientX);
  };

  /** 拖拽中 */
  const onDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging || dragStartX === null) return;
      setDragCurrentX(clientX);
    },
    [isDragging, dragStartX]
  );

  /** 清除拖拽状态 */
  const clearDragState = () => {
    setIsDragging(false);
    setDragStartX(null);
    setDragCurrentX(null);
  };

  /** 获取拖拽时的偏移量 */
  const getTransform = ({
    container,
    currentIndex,
    totalSlides,
  }: {
    container: HTMLDivElement;
    currentIndex: number;
    totalSlides: number;
  }) => {
    // 鼠标拖拽时的实时变换
    if (isDragging && dragStartX !== null && dragCurrentX !== null) {
      const distance = dragStartX - dragCurrentX;
      const containerWidth = container.offsetWidth;
      const dragPercentage = (distance / containerWidth) * 100;
      const baseTransform = (100 * currentIndex) / totalSlides;
      return `translateX(-${baseTransform + dragPercentage}%)`;
    }

    // 正常状态的变换
    return `translateX(-${(100 * currentIndex) / totalSlides}%)`;
  };

  return {
    isDragging,
    dragStartX,
    dragCurrentX,
    getTransform,
    onDragStart,
    onDragMove,
    clearDragState,
  };
};
