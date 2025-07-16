import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./index";
import { cn } from "./utils/clsx";
import { useRef } from "react";
import { ISliderRef } from "./types";

const meta: Meta<typeof Carousel> = {
  title: "Example/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
Carousel 轮播图组件是一个功能丰富的 React 组件，支持 Banner 模式和 Slider 模式两种展示方式，提供多种交互方式和完整的控制 API。

## 组件类型
- **Banner 模式**：全屏轮播，每次显示一个完整内容项，适合图片轮播
- **Slider 模式**：滑动窗口，可同时显示多个项目，支持渐进式滑动
- **指示器类型**：圆点（dots）、线条（line）、自定义指示器
- **导航位置**：内部（inside）、顶部（top）、底部（bottom）

## 使用原则
- 选择合适的模式：图片轮播使用 Banner 模式，列表展示使用 Slider 模式
- 合理设置自动播放：重要内容建议关闭自动播放，避免用户错过信息
- 提供清晰的导航：当内容较多时，确保用户能够方便地浏览所有内容
- 考虑移动端体验：确保触摸交互流畅，指示器易于点击
- 性能优化：大量内容时考虑使用虚拟滚动或分页加载

## 组件引入
\`\`\`tsx
import { Carousel } from '@oversea/carousel';

// Banner 模式
<Carousel autoplay loop>
  <div>第一张图片</div>
  <div>第二张图片</div>
  <div>第三张图片</div>
</Carousel>

// Slider 模式
<Carousel.Slider navigation={{ position: 'inside' }}>
  <div>项目1</div>
  <div>项目2</div>
  <div>项目3</div>
</Carousel.Slider>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BannerBase: Story = {
  name: "banner模式-自动播放用法",
  parameters: {
    docs: {
      description: {
        story: "基础用法",
      },
    },
  },
  render: () => {
    const contentClass =
      "text-text-primary h-[160px] flex items-center justify-center";
    return (
      <div className="flex flex-col gap-10 w-[900px] h-full pl-4 pr-4">
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">
            自动播放
          </h3>
          <Carousel
            className="bg-foreground-layer1_2 rounded-[10px]"
            autoplay
            loop={false}
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">
            自动播放+禁用拖拽和滑动
          </h3>
          <Carousel
            autoplay
            draggable={false}
            touchable={false}
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">
            自动播放+设置播放速度
          </h3>
          <Carousel
            autoplay
            autoplaySpeed={1000}
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
      </div>
    );
  },
};

export const BannerIndicator: Story = {
  name: "banner模式-指示器",
  parameters: {
    docs: {
      description: {
        story: "指示器相关用法",
      },
    },
  },
  render: () => {
    const contentClass =
      "text-text-primary h-[160px] flex items-center justify-center";
    return (
      <div className="flex flex-col gap-10 w-[900px] h-full pl-4 pr-4">
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">
            默认圆点指示器
          </h3>
          <Carousel className="bg-foreground-layer1_2 rounded-[10px]">
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">
            线性指示器
          </h3>
          <Carousel
            indicator="line"
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">
            自定义指示器
          </h3>
          <Carousel
            indicator={(currentIndex) => {
              return (
                <div className="flex items-center gap-3 mb-2">
                  {[1, 2, 3, 4].map((item, index) => {
                    return (
                      <span
                        key={index}
                        className={cn(
                          currentIndex === index
                            ? "text-red-500"
                            : "text-text-primary"
                        )}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              );
            }}
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
      </div>
    );
  },
};

export const BannerInsideButton: Story = {
  name: "banner模式-内部按钮",
  parameters: {
    docs: {
      description: {
        story: "按钮相关用法",
      },
    },
  },
  render: () => {
    const contentClass =
      "text-text-primary h-[160px] flex items-center justify-center";
    return (
      <div className="flex flex-col gap-10 w-[900px] h-full pl-4 pr-4">
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">large</h3>
          <Carousel
            showNavigation
            navigation={{
              size: "large",
            }}
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">medium</h3>
          <Carousel
            showNavigation
            navigation={{
              size: "medium",
            }}
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">
            设置箭头水平/垂直偏移量
          </h3>
          <Carousel
            showNavigation
            navigation={{
              size: "medium",
              xOffset: -20,
              yOffset: 20,
            }}
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
      </div>
    );
  },
};

export const BannerOutsideButton: Story = {
  name: "banner模式-外部按钮",
  parameters: {
    docs: {
      description: {
        story: "按钮相关用法",
      },
    },
  },
  render: () => {
    const contentClass =
      "text-text-primary h-[160px] flex items-center justify-center";
    return (
      <div className="flex flex-col gap-10 w-[900px] h-full pl-4 pr-4">
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">large</h3>
          <Carousel
            showNavigation
            navigation={{
              size: "large",
              position: "top",
            }}
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">medium</h3>
          <Carousel
            showNavigation
            navigation={{
              position: "bottom",
            }}
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">
            修改按钮组样式或按钮间距
          </h3>
          <Carousel
            showNavigation
            navigation={{
              position: "bottom",
              gap: 50,
              groupClassName: "mt-5 mr-20",
            }}
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
      </div>
    );
  },
};

export const BannerLoop: Story = {
  name: "banner模式-循环模式",
  parameters: {
    docs: {
      description: {
        story: "循环模式相关用法",
      },
    },
  },
  render: () => {
    const contentClass =
      "text-text-primary h-[160px] flex items-center justify-center";
    return (
      <div className="flex flex-col gap-10 w-[900px] h-full pl-4 pr-4">
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">
            循环+内部导航箭头
          </h3>
          <Carousel
            showNavigation
            navigation={{
              size: "large",
              position: "inside",
            }}
            loop
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-2">
            循环+外部导航箭头
          </h3>
          <Carousel
            showNavigation
            navigation={{
              position: "top",
            }}
            loop
            className="bg-foreground-layer1_2 rounded-[10px]"
          >
            <div className={contentClass}>1</div>
            <div className={contentClass}>2</div>
            <div className={contentClass}>3</div>
            <div className={contentClass}>4</div>
          </Carousel>
        </div>
      </div>
    );
  },
};

export const SliderMode: Story = {
  name: "slider模式-基础滑动窗口",
  parameters: {
    docs: {
      description: {
        story:
          "滑动窗口模式，每页显示多个子元素，每次滑动只移动一个元素，产生渐进式滑动效果",
      },
    },
  },
  render: () => {
    const contentArr = [
      {
        key: "Overview1",
        content: "Overview1",
      },
      {
        key: "Stocks1",
        content: "Stocks1",
      },
      {
        key: "ETFs1",
        content: "ETFs1",
      },
      {
        key: "Crypto1",
        content: "Crypto1",
      },
      {
        key: "Forex1",
        content: "Forex1",
      },
      {
        key: "Commodities1",
        content: "Commodities1",
      },
      {
        key: "Overview2",
        content: "Overview2",
      },
      {
        key: "Stocks2",
        content: "Stocks2",
      },
      {
        key: "ETFs2",
        content: "ETFs2",
      },
      {
        key: "Crypto2",
        content: "Crypto2",
      },
      {
        key: "Forex2",
        content: "Forex2",
      },
      {
        key: "Commodities2",
        content: "Commodities2",
      },
    ];
    const Slider = () => {
      const sliderRef = useRef<ISliderRef>(null);
      return (
        <div className="flex flex-col items-center gap-10 bg-foreground-layer1_2 h-full w-[900px] pt-4 text-text-primary">
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">
              slider模式-外部medium按钮
            </h3>
            <Carousel.Slider
              className="h-[76px] w-[375px] bg-foreground-layer1"
              navigation={{ position: "top" }}
            >
              {contentArr.map((item) => (
                <div key={item.key}>
                  <div className="mx-2 h-9 px-4 py-[9px] bg-foreground-layer1 border border-divider-level2 rounded-[40px] flex items-center justify-center">
                    {item.content}
                  </div>
                </div>
              ))}
            </Carousel.Slider>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">
              slider模式-内部medium按钮
            </h3>
            <Carousel.Slider
              className="h-[76px] w-[375px] bg-foreground-layer1"
              navigation={{ position: "inside" }}
            >
              {contentArr.map((item) => (
                <div key={item.key}>
                  <div className="mx-2 h-9 px-4 py-[9px] bg-foreground-layer1 border border-divider-level2 rounded-[40px] flex items-center justify-center">
                    {item.content}
                  </div>
                </div>
              ))}
            </Carousel.Slider>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">
              slider模式-auto按钮（按钮高度自适应）
            </h3>
            <Carousel.Slider
              className="h-12 w-[375px] bg-[rgba(0,0,0,0.1)]"
              navigation={{ size: "auto" }}
            >
              {contentArr.map((item) => (
                <div key={item.key}>
                  <div className="mx-2 h-9 px-4 py-[9px] bg-foreground-layer1 border border-divider-level2 rounded-[40px] flex items-center justify-center">
                    {item.content}
                  </div>
                </div>
              ))}
            </Carousel.Slider>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">
              slider模式-禁用滚轮滑动
            </h3>
            <Carousel.Slider
              className="h-12 w-[375px] bg-[rgba(0,0,0,0.1)]"
              disableSlide
            >
              {contentArr.map((item) => (
                <div key={item.key}>
                  <div className="mx-2 h-9 px-4 py-[9px] bg-foreground-layer1 border border-divider-level2 rounded-[40px] flex items-center justify-center">
                    {item.content}
                  </div>
                </div>
              ))}
            </Carousel.Slider>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">
              slider模式-调用组件方法
            </h3>
            <div className="flex gap-2 mb-2">
              <button
                className="px-4 py-2 bg-foreground-layer1 border border-divider-level2 rounded-[40px]"
                onClick={() => sliderRef.current?.prev()}
              >
                prev
              </button>
              <button
                className="px-4 py-2 bg-foreground-layer1 border border-divider-level2 rounded-[40px]"
                onClick={() => sliderRef.current?.next()}
              >
                next
              </button>
              <button
                className="px-4 py-2 bg-foreground-layer1 border border-divider-level2 rounded-[40px]"
                onClick={() => sliderRef.current?.goTo(4)}
              >
                滑动到第五项
              </button>
            </div>
            <Carousel.Slider
              className="h-[76px] w-[375px] bg-foreground-layer1"
              navigation={{ position: "inside" }}
              ref={sliderRef}
            >
              {contentArr.map((item) => (
                <div key={item.key}>
                  <div className="mx-2 h-9 px-4 py-[9px] bg-foreground-layer1 border border-divider-level2 rounded-[40px] flex items-center justify-center">
                    {item.content}
                  </div>
                </div>
              ))}
            </Carousel.Slider>
          </div>
        </div>
      );
    };
    return <Slider />;
  },
};

export const API: Story = {
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: "docs",
    docs: {
      description: {
        story: `
## Carousel Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| children | 轮播内容 | ReactNode | - | 是 |
| autoplay | 是否自动播放 | boolean | false | 否 |
| autoplaySpeed | 自动播放间隔（毫秒） | number | 3000 | 否 |
| showIndicators | 是否显示指示器 | boolean | true | 否 |
| indicator | 指示器类型 | 'dots' \\| 'line' \\| (currentIndex: number) => ReactNode | 'dots' | 否 |
| showNavigation | 是否显示导航箭头 | boolean | false | 否 |
| navigation | 导航配置 | NavigationConfig | - | 否 |
| pauseOnHover | 鼠标悬停时是否暂停自动播放 | boolean | true | 否 |
| loop | 是否循环播放 | boolean | false | 否 |
| touchable | 是否支持触摸滑动 | boolean | true | 否 |
| draggable | 是否支持鼠标拖拽 | boolean | true | 否 |
| duration | 切换动画时长（毫秒） | number | 300 | 否 |
| onChange | 切换时的回调函数 | (currentIndex: number) => void | - | 否 |
| className | 自定义类名 | string | - | 否 |

## Navigation 配置

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|-----|
| size | 按钮尺寸 | 'medium' \\| 'large' | 'medium' |
| position | 按钮位置 | 'inside' \\| 'top' \\| 'bottom' | 'inside' |
| xOffset | 水平偏移量（仅 inside 模式） | number | 0 |
| yOffset | 垂直偏移量（仅 inside 模式） | number | 0 |
| gap | 按钮间距（仅外部模式） | number | 10 |
| groupClassName | 按钮组类名（仅外部模式） | string | - |

## Carousel.Slider Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| children | 滑动内容 | ReactNode | - | 是 |
| navigation | 导航配置 | SliderNavigationConfig | - | 否 |
| disableSlide | 是否禁用滚轮滑动 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
