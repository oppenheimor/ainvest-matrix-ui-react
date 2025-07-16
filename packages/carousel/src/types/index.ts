interface ICarouselBaseProps {
  /** 子元素 */
  children: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

export interface ICarouselProps extends ICarouselBaseProps {
  /** 是否显示指示器 */
  showIndicators?: boolean;
  /** 指示器类型：dots（圆点）或 line（线条）或自定义，绝对定位居中靠下显示 */
  indicator?: "dots" | "line" | ((currentIndex: number) => React.ReactNode);
  /** 是否显示导航箭头 */
  showNavigation?: boolean;
  navigation?: {
    size?: "medium" | "large";
  } & (
    | {
        position?: "inside";
        xOffset?: number;
        yOffset?: number;
      }
    | { position: "top" | "bottom"; groupClassName?: string; gap?: number }
  );
  /** 是否自动播放 */
  autoplay?: boolean;
  /** 自动播放间隔时间（毫秒） */
  autoplaySpeed?: number;
  /** 鼠标悬停时是否暂停自动播放 */
  pauseOnHover?: boolean;
  /** 是否可循环，只作用于拖拽、触摸、点击按钮等其他主动事件，不会作用于自动播放 */
  loop?: boolean;
  /** 是否支持触摸滑动 */
  touchable?: boolean;
  /** 是否支持鼠标拖拽 */
  draggable?: boolean;
  /** 切换动画时长（毫秒） */
  duration?: number;
  /** 切换时的回调函数 */
  onChange?: (currentIndex: number) => void;
}

export interface ICarouselRef {
  /** 当前索引 */
  currentIndex: number;
  /** 跳转到指定索引 */
  goTo: (index: number) => void;
  /** 下一张 */
  next: () => void;
  /** 上一张 */
  prev: () => void;
  /** 开始自动播放 */
  play: () => void;
  /** 暂停自动播放 */
  pause: () => void;
}

export interface ISliderProps extends ICarouselBaseProps {
  /** 导航配置 */
  navigation?:
    | {
        size: "auto";
      }
    | ({
        size?: "medium" | "large";
      } & (
        | {
            position?: "inside";
            xOffset?: number;
            yOffset?: number;
          }
        | { position: "top" | "bottom"; groupClassName?: string; gap?: number }
      ));
  /** 是否禁用滚轮滑动 */
  disableSlide?: boolean;
}

export interface ISliderRef {
  /** 跳转到指定索引 */
  goTo: (index: number) => void;
  /** 下一张 */
  next: () => void;
  /** 上一张 */
  prev: () => void;
}
