# Button 组件

## 定义
Button 按钮是用户界面中最基础的交互元素之一，用于触发操作或导航。按钮通过不同的样式变体来传达不同的重要性和功能意图。

## 组件特性
### 变体类型
支持 5 种变体类型，每种都有其特定的使用场景：
- **Primary（主要）**：用于页面中最重要的操作，具有最高的视觉权重
- **Default（默认）**：用于常规操作，平衡的视觉表现
- **Secondary（次要）**：用于次要操作，较为低调的样式
- **Text（文本）**：用于不太重要的操作，最小化的视觉干扰
- **Link（链接）**：用于导航或跳转操作，类似链接样式

### 尺寸规格
提供 4 种尺寸选择，适应不同的界面需求：
- **xs**：高度 24px，适用于紧凑空间
- **sm**：高度 28px，适用于较小的操作区域
- **base**：高度 36px，标准尺寸，最常用
- **lg**：高度 44px，适用于重要操作或大屏幕

### 状态支持
- **正常状态**：默认的可交互状态
- **悬停状态**：鼠标悬停时的视觉反馈
- **活跃状态**：点击时的视觉反馈
- **禁用状态**：不可交互的状态
- **加载状态**：异步操作进行中的状态

## 使用原则
- **视觉层次**：Primary 按钮用于页面中最重要的操作，每个区域建议只有一个
- **功能明确**：按钮文案要简洁明确，能够清楚表达操作意图
- **状态一致**：保持不同状态下的视觉反馈一致性
- **尺寸适配**：根据界面重要性和空间约束选择合适的尺寸
- **无障碍性**：确保按钮有足够的对比度和可访问性

## 组件安装

```bash
npm install @oversea/button
```

## 快速开始
```tsx
import { Button } from '@oversea/button'

// 基本用法
<Button variant="primary">主要按钮</Button>
<Button variant="default">默认按钮</Button>
<Button variant="secondary">次要按钮</Button>

// 带图标的按钮
<Button variant="primary">
  <Icon name="plus" />
  新建
</Button>

// 加载状态
<Button disabled>
  <Loader className="animate-spin" />
  加载中...
</Button>
```

## Props API

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| variant | 按钮变体样式 | `'primary'` \| `'default'` \| `'secondary'` \| `'text'` \| `'link'` | `'default'` | 否 |
| size | 按钮尺寸大小 | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` | `'base'` | 否 |
| disabled | 是否禁用按钮 | `boolean` | `false` | 否 |
| asChild | 是否作为子组件渲染 | `boolean` | `false` | 否 |
| className | 自定义 CSS 类名 | `string` | - | 否 |
| children | 按钮内容 | `React.ReactNode` | - | 是 |
| onClick | 点击事件处理函数 | `(event: React.MouseEvent) => void` | - | 否 |

> **注意**: 组件继承所有标准 HTML `button` 元素的属性，如 `type`、`form`、`disabled` 等。

## 变体说明

### 按钮变体 (variant)

| 变体 | 使用场景 | 视觉特征 | 示例用途 |
|---|---|---|---|
| `primary` | 主要操作 | 品牌色背景，白色文字 | 提交表单、确认操作、主要 CTA |
| `default` | 常规操作 | 灰色背景，白色文字 | 取消、关闭、一般操作 |
| `secondary` | 次要操作 | 浅灰色背景，深色文字 | 辅助功能、备选操作 |
| `text` | 文本操作 | 无背景，文字样式 | 链接式操作、不重要的操作 |
| `link` | 链接操作 | 品牌色文字，无背景 | 跳转、导航、了解更多 |

### 尺寸规格 (size)

| 尺寸 | 高度 | 最小宽度 | 内边距 | 字体大小 | 使用场景 |
|---|---|---|---|---|---|
| `xs` | 24px | 50px | 8px | 11px | 表格操作、标签内按钮 |
| `sm` | 28px | 62px | 12px | 12px | 表单内小按钮、工具栏 |
| `base` | 36px | 76px | 16px | 14px | 标准按钮，最常用 |
| `lg` | 44px | 90px | 20px | 16px | 重要操作、大屏幕界面 |

## 使用示例

### 按钮变体
Button 组件支持 5 种不同的变体，各变体适用于不同的使用场景和视觉层次。

```tsx
<Button variant="primary">主要按钮</Button>
<Button variant="default">默认按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="text">文本按钮</Button>
<Button variant="link">链接按钮</Button>
```

### 按钮尺寸
Button 组件支持 4 种不同的尺寸，适应不同的界面需求和使用场景。

```tsx
<Button size="xs" variant="primary">超小按钮</Button>
<Button size="sm" variant="primary">小按钮</Button>
<Button size="base" variant="primary">标准按钮</Button>
<Button size="lg" variant="primary">大按钮</Button>
```

### 禁用状态
通过 `disabled` 属性设置按钮的禁用状态，禁用后按钮不可点击且透明度降低。

```tsx
<Button variant="primary" disabled>主要按钮（禁用）</Button>
<Button variant="default" disabled>默认按钮（禁用）</Button>
<Button variant="secondary" disabled>次要按钮（禁用）</Button>
<Button variant="text" disabled>文本按钮（禁用）</Button>
<Button variant="link" disabled>链接按钮（禁用）</Button>
```

### 加载状态
在按钮中添加加载图标来表示正在处理的状态，通常在异步操作时使用，防止重复点击。

```tsx
import { Loader2 } from "lucide-react";

<Button disabled>
  <Loader2 className="animate-spin" />
  Loading...
</Button>
<Button variant="secondary" disabled>
  <Loader2 className="animate-spin" />
  Please wait
</Button>
```

### 自定义内容
Button 组件支持自定义内容，可以包含图标、文本等元素。

```tsx
<Button variant="default">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
  Next
</Button>

<Button variant="secondary">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c0-1 1-2 2-2v2"/>
  </svg>
  Delete
</Button>
```

## 最佳实践

1. **视觉层次**：每个页面区域最多使用一个 Primary 按钮
2. **文案规范**：按钮文案使用动词，简洁明确（如"保存"、"删除"）
3. **状态反馈**：异步操作时使用加载状态，避免重复点击
4. **尺寸选择**：根据界面重要性和空间约束选择合适尺寸
5. **无障碍性**：确保按钮有足够的对比度和可访问性
6. **图标使用**：图标应该增强而非替代文字说明

## 键盘导航

- **Tab**: 聚焦到按钮
- **Enter/Space**: 触发按钮点击
- **Esc**: 取消焦点（在某些情况下）