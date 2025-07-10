import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
Spinner 加载指示器用于展示异步或加载中的状态，常用于数据请求、页面切换、按钮加载等场景。通过动画效果向用户传达系统正在处理的信息。

## 组件特性
### 变体类型
支持 3 种不同的视觉风格，适应不同的设计需求：
- **default（叶片型）**：经典的辐射状叶片设计，适用于大多数场景
- **circle（线圈型）**：简洁的环形线条设计，更为精细
- **circle-filled（填充线圈型）**：带背景的环形设计，增强可见性

### 尺寸规格
提供 3 种尺寸选择，适应不同的界面需求：
- **sm**：20px × 20px，适用于小型组件内部或紧凑空间
- **md**：28px × 28px，标准尺寸，最常用
- **lg**：32px × 32px，适用于页面级加载或重要提示

## 使用原则
- **场景合适**：用于异步加载、数据请求、页面切换等需要等待的场景
- **避免滥用**：不要同时显示多个 Spinner，避免干扰用户体验
- **灵活嵌入**：可嵌入按钮、卡片、表格等各种组件中
- **加载时机**：在操作开始时立即显示，完成后及时隐藏
- **视觉一致**：在同一产品中保持 Spinner 风格的一致性

## 组件安装

\`\`\`bash
npm install @oversea/spinner
\`\`\`

## 快速开始
\`\`\`tsx
import { Spinner } from '@oversea/spinner'

// 基本用法
<Spinner />

// 不同变体
<Spinner variant="default" />      // 叶片型（默认）
<Spinner variant="circle" />       // 线圈型
<Spinner variant="circle-filled" /> // 填充线圈型

// 不同尺寸
<Spinner size="sm" />  // 小尺寸
<Spinner size="md" />  // 中尺寸（默认）
<Spinner size="lg" />  // 大尺寸

// 在按钮中使用
<Button disabled>
  <Spinner size="sm" className="mr-2" />
  加载中...
</Button>
\`\`\`
        `,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo01: Story = {
  name: "基础用法",
  parameters: {
    docs: {
      description: {
        story: "默认 variant（叶片型），默认尺寸 md。",
      },
    },
  },
  render: () => {
    return <Spinner />;
  },
};

export const Demo02: Story = {
  name: "尺寸变化",
  parameters: {
    docs: {
      description: {
        story: "通过 size 属性切换尺寸，支持 sm、md、lg。",
      },
    },
  },
  render: () => {
    return (
      <div className="flex gap-8 items-center">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    );
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
## Props API

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| variant | 加载指示器变体类型 | \`'default'\` \| \`'circle'\` \| \`'circle-filled'\` | \`'default'\` | 否 |
| size | 加载指示器尺寸 | \`'sm'\` \| \`'md'\` \| \`'lg'\` | \`'md'\` | 否 |
| className | 自定义 CSS 类名 | \`string\` | - | 否 |

> **注意**: 组件继承所有标准 HTML \`span\` 元素的属性。

## 变体说明

### 加载指示器变体 (variant)

| 变体 | 描述 | 视觉特征 | 适用场景 |
|---|---|---|---|
| \`default\` | 叶片型 | 8 个辐射叶片，渐隐动画 | 常规加载场景，兼容性好 |
| \`circle\` | 线圈型 | 简洁环形线条 | 精细设计，小尺寸场景 |
| \`circle-filled\` | 填充线圈型 | 环形线条 + 背景填充 | 需要更好可见性的场景 |

### 尺寸规格 (size)

| 尺寸 | 尺寸值 | 使用场景 | 示例 |
|---|---|---|---|
| \`sm\` | 20px × 20px | 按钮内、表格单元格、小型组件 | 表单提交按钮、表格加载 |
| \`md\` | 28px × 28px | 卡片内容、一般加载状态 | 列表加载、卡片刷新 |
| \`lg\` | 32px × 32px | 页面级加载、重要提示 | 页面初始化、数据导入 |

## 最佳实践

1. **变体选择**：根据设计风格和使用场景选择合适的变体
2. **尺寸适配**：根据容器大小和重要性选择合适的尺寸
3. **加载反馈**：在数据加载期间始终显示，完成后及时隐藏
4. **体验一致**：在同一产品中保持 Spinner 的一致性
5. **无障碍性**：为 Spinner 提供适当的 aria-label 或其他辅助信息
6. **性能考虑**：避免同时显示过多 Spinner，影响页面性能

## 可访问性

- **视觉反馈**：提供明确的加载状态视觉提示
- **屏幕阅读器**：为动画元素提供适当的 aria-label
- **减少动画**：尊重用户的 prefers-reduced-motion 设置
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
