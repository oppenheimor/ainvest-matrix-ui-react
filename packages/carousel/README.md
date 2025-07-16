# Carousel 轮播图组件

一个功能丰富的 React 轮播图组件，支持多种交互方式和展示模式。

## 功能特性

- 🎯 **双模式支持**：Banner 模式和 Slider 模式
- 🎮 **多种交互**：触摸滑动、鼠标拖拽、滚轮滑动
- 🔄 **自动播放**：支持自动轮播，可设置播放间隔
- 🎨 **灵活指示器**：圆点、线条或自定义指示器
- 🧭 **导航控制**：内置箭头导航，支持内外位置
- 📱 **响应式设计**：完美适配移动端和桌面端
- ♻️ **循环模式**：支持无限循环播放
- 🎛️ **精确控制**：提供完整的 API 控制方法

## 安装

```bash
npm install @oversea/carousel
# 或
yarn add @oversea/carousel
# 或
pnpm add @oversea/carousel
```

## 基础用法

### Banner 模式（全屏轮播）

```tsx
import { Carousel } from "@oversea/carousel";

function App() {
  return (
    <Carousel autoplay loop>
      <div className="h-64 bg-blue-500 flex items-center justify-center text-white">
        第一张图片
      </div>
      <div className="h-64 bg-green-500 flex items-center justify-center text-white">
        第二张图片
      </div>
      <div className="h-64 bg-red-500 flex items-center justify-center text-white">
        第三张图片
      </div>
    </Carousel>
  );
}
```

### Slider 模式（滑动窗口）

```tsx
import { Carousel } from "@oversea/carousel";

function App() {
  const items = ["项目1", "项目2", "项目3", "项目4", "项目5"];

  return (
    <Carousel.Slider navigation={{ position: "inside" }}>
      {items.map((item, index) => (
        <div key={index} className="px-4 py-2 bg-gray-200 rounded">
          {item}
        </div>
      ))}
    </Carousel.Slider>
  );
}
```

## 组件模式

### Banner 模式

适用于全屏展示的轮播图，每次显示一个完整的内容项。

**特点：**

- 全屏展示，适合图片轮播
- 支持自动播放和循环
- 提供多种指示器样式
- 支持触摸和拖拽交互

### Slider 模式

适用于滑动窗口展示，可同时显示多个项目，支持渐进式滑动。

**特点：**

- 滑动窗口展示多个项目
- 智能滚动定位
- 支持外部控制方法
- 适合标签页、卡片列表等场景

## 使用原则

1. **选择合适的模式**：图片轮播使用 Banner 模式，列表展示使用 Slider 模式
2. **合理设置自动播放**：重要内容建议关闭自动播放，避免用户错过信息
3. **提供清晰的导航**：当内容较多时，确保用户能够方便地浏览所有内容
4. **考虑移动端体验**：确保触摸交互流畅，指示器易于点击
5. **性能优化**：大量内容时考虑使用虚拟滚动或分页加载

## API 参考

### Carousel Props

| 属性           | 说明                       | 类型                                                    | 默认值 |
| -------------- | -------------------------- | ------------------------------------------------------- | ------ |
| children       | 轮播内容                   | ReactNode                                               | -      |
| autoplay       | 是否自动播放               | boolean                                                 | false  |
| autoplaySpeed  | 自动播放间隔（毫秒）       | number                                                  | 3000   |
| showIndicators | 是否显示指示器             | boolean                                                 | true   |
| indicator      | 指示器类型                 | 'dots' \| 'line' \| (currentIndex: number) => ReactNode | 'dots' |
| showNavigation | 是否显示导航箭头           | boolean                                                 | false  |
| navigation     | 导航配置                   | NavigationConfig                                        | -      |
| pauseOnHover   | 鼠标悬停时是否暂停自动播放 | boolean                                                 | true   |
| loop           | 是否循环播放               | boolean                                                 | false  |
| touchable      | 是否支持触摸滑动           | boolean                                                 | true   |
| draggable      | 是否支持鼠标拖拽           | boolean                                                 | true   |
| duration       | 切换动画时长（毫秒）       | number                                                  | 300    |
| onChange       | 切换时的回调函数           | (currentIndex: number) => void                          | -      |
| className      | 自定义类名                 | string                                                  | -      |

### Navigation 配置

```tsx
interface NavigationConfig {
  size?: "medium" | "large";
  position?: "inside" | "top" | "bottom";
  xOffset?: number; // 水平偏移量（仅 inside 模式）
  yOffset?: number; // 垂直偏移量（仅 inside 模式）
  gap?: number; // 按钮间距（仅外部模式）
  groupClassName?: string; // 按钮组类名（仅外部模式）
}
```

### Carousel.Slider Props

| 属性         | 说明             | 类型                   | 默认值 |
| ------------ | ---------------- | ---------------------- | ------ |
| children     | 滑动内容         | ReactNode              | -      |
| navigation   | 导航配置         | SliderNavigationConfig | -      |
| disableSlide | 是否禁用滚轮滑动 | boolean                | false  |
| className    | 自定义类名       | string                 | -      |

### 组件方法

通过 ref 可以调用以下方法：

```tsx
interface CarouselRef {
  currentIndex: number; // 当前索引
  goTo: (index: number) => void; // 跳转到指定索引
  next: () => void; // 下一张
  prev: () => void; // 上一张
  play: () => void; // 开始自动播放
  pause: () => void; // 暂停自动播放
}
```
