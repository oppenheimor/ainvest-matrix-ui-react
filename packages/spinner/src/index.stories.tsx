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
Spinner 加载指示器用于展示异步或加载中的状态，常用于数据请求、页面切换、按钮加载等场景。

## 组件类型
- variant: default（叶片型）、circle（线圈型）、circle-filled（填充线圈型）
- size: sm、md、lg

## 使用原则
- 用于异步加载、数据请求、页面切换等需要等待的场景
- 不要滥用，避免页面出现多个 loading 干扰用户
- 可嵌入按钮、卡片、表格等组件中

## 组件引入
\`\`\`tsx
import { Spinner } from '@oversea/spinner';

<Spinner />
<Spinner variant="circle" size="sm" />
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
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|---|---|
| size | 尺寸 | \`'sm' | 'md' | 'lg'\` | \`'md'\` | 否 |
| className | 自定义类名 | string | - | 否 |
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
