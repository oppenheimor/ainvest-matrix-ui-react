# BlockTabs 块状标签页组件

## 定义

BlockTabs（块状标签页）是一个用于在多个内容区域之间切换的基础组件，基于 Radix UI Tabs 封装，支持无障碍、键盘导航、响应式和主题自定义。适用于仪表盘、表单、内容分区等多种场景。

## 组件类型

BlockTabs 采用复合组件模式，由以下部分组成：

- **BlockTabs**：根容器，管理标签页状态
- **BlockTabsList**：标签列表容器
- **BlockTabsTrigger**：单个标签页触发器
- **BlockTabsContent**：标签页内容区域

支持受控/非受控两种用法，支持横向/纵向布局。

## 使用原则

- 标签页用于同层级内容的分组切换，避免嵌套使用
- 标签数量建议控制在 2-7 个，避免过多导致可用性下降
- 标签文案应简洁明了，能准确反映内容
- 切换应即时生效，避免二次确认
- 支持键盘导航和无障碍访问

## 组件引入

```tsx
import {
  BlockTabs,
  BlockTabsList,
  BlockTabsTrigger,
  BlockTabsContent,
} from "@oversea/block-tabs";

<BlockTabs defaultValue="tab1">
  <BlockTabsList>
    <BlockTabsTrigger value="tab1">Tab 1</BlockTabsTrigger>
    <BlockTabsTrigger value="tab2">Tab 2</BlockTabsTrigger>
  </BlockTabsList>
  <BlockTabsContent value="tab1">内容1</BlockTabsContent>
  <BlockTabsContent value="tab2">内容2</BlockTabsContent>
</BlockTabs>;
```

## Demo

基本用法：

```tsx
<BlockTabs defaultValue="Indices">
  <BlockTabsList>
    <BlockTabsTrigger value="Indices">Indices</BlockTabsTrigger>
    <BlockTabsTrigger value="Stocks">Stocks</BlockTabsTrigger>
    <BlockTabsTrigger value="Crypto">Crypto</BlockTabsTrigger>
    <BlockTabsTrigger value="Futures">Futures</BlockTabsTrigger>
    <BlockTabsTrigger value="Forex">Forex</BlockTabsTrigger>
    <BlockTabsTrigger value="Bonds">Bonds</BlockTabsTrigger>
    <BlockTabsTrigger value="ETFs">ETFs</BlockTabsTrigger>
  </BlockTabsList>
  <BlockTabsContent value="Indices" className="text-text-primary">
    Indices Content
  </BlockTabsContent>
  <BlockTabsContent value="Stocks" className="text-text-primary">
    Stocks Content
  </BlockTabsContent>
  <BlockTabsContent value="Crypto" className="text-text-primary">
    Crypto Content
  </BlockTabsContent>
  <BlockTabsContent value="Futures" className="text-text-primary">
    Futures Content
  </BlockTabsContent>
  <BlockTabsContent value="Forex" className="text-text-primary">
    Forex Content
  </BlockTabsContent>
  <BlockTabsContent value="Bonds" className="text-text-primary">
    Bonds Content
  </BlockTabsContent>
  <BlockTabsContent value="ETFs" className="text-text-primary">
    ETFs Content
  </BlockTabsContent>
</BlockTabs>
```

## API

| 组件             | 说明                       |                               |
| ---------------- | -------------------------- | ----------------------------- |
| BlockTabs        | 根容器，管理所有标签页状态 | 见下方 BlockTabs Props        |
| BlockTabsList    | 标签页列表容器             | 见下方 BlockTabsList Props    |
| BlockTabsTrigger | 单个标签页按钮             | 见下方 BlockTabsTrigger Props |
| BlockTabsContent | 标签页内容区域             | 见下方 BlockTabsContent Props |

### BlockTabs Props

| 属性           | 说明                                 | 类型                    | 默认值        | 必填         |
| -------------- | ------------------------------------ | ----------------------- | ------------- | ------------ | --- |
| defaultValue   | 初始激活的标签页 value（非受控模式） | string                  | -             | 否           |
| value          | 当前激活的标签页 value（受控模式）   | string                  | -             | 否           |
| onValueChange  | 标签切换时回调                       | (value: string) => void | -             | 否           |
| orientation    | 标签排列方向                         | 'horizontal'            | 'vertical'    | 'horizontal' | 否  |
| dir            | 文字方向                             | 'ltr'                   | 'rtl' / 'ltr' | 否           |
| activationMode | 激活模式                             | 'automatic'             | 'manual'      | 'automatic'  | 否  |
| className      | 自定义类名                           | string                  | -             | 否           |

### BlockTabsList Props

| 属性      | 说明       | 类型   | 默认值 | 必填 |
| --------- | ---------- | ------ | ------ | ---- |
| className | 自定义类名 | string | -      | 否   |

### BlockTabsTrigger Props

| 属性      | 说明                          | 类型    | 默认值 | 必填 |
| --------- | ----------------------------- | ------- | ------ | ---- |
| value     | 唯一值，关联 BlockTabsContent | string  | -      | 是   |
| disabled  | 是否禁用                      | boolean | false  | 否   |
| className | 自定义类名                    | string  | -      | 否   |

### BlockTabsContent Props

| 属性       | 说明                          | 类型    | 默认值 | 必填 |
| ---------- | ----------------------------- | ------- | ------ | ---- |
| value      | 唯一值，关联 BlockTabsTrigger | string  | -      | 是   |
| forceMount | 是否强制渲染内容              | boolean | false  | 否   |
| className  | 自定义类名                    | string  | -      | 否   |

## 键盘交互

- <kbd>Tab</kbd>：聚焦到标签页
- <kbd>ArrowRight</kbd>/<kbd>ArrowDown</kbd>：切换到下一个标签
- <kbd>ArrowLeft</kbd>/<kbd>ArrowUp</kbd>：切换到上一个标签
- <kbd>Home</kbd>：跳转到第一个标签
- <kbd>End</kbd>：跳转到最后一个标签

## 无障碍

- 完全遵循 WAI-ARIA Tabs 设计模式
- 支持屏幕阅读器和键盘导航
