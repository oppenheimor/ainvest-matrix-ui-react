import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";
import { Loader2 } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
Button 按钮是用户界面中最基础的交互元素之一，用于触发操作或导航。按钮通过不同的样式变体来传达不同的重要性和功能意图。

## 组件类型
支持 5 种变体类型：Primary（主要）、Default（默认）、Secondary（次要）、Text（文本）、Link（链接）；
支持 4 种尺寸：xs、sm、base、lg；
支持禁用、加载等状态。

## 使用原则
- Primary 按钮用于页面中最重要的操作，每个区域建议只有一个
- Default 按钮用于常规操作
- Secondary 按钮用于次要操作
- Text 按钮用于不太重要的操作
- Link 按钮用于导航或跳转操作
- 按钮文案要简洁明确，能够清楚表达操作意图

## 组件引入
\`\`\`tsx
import { Button } from '@oversea/button'

<Button variant="primary">按钮</Button>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo01: Story = {
  name: "按钮变体",
  parameters: {
    docs: {
      description: {
        story: "Button 组件支持 5 种不同的变体 `primary`、`default`、`secondary`、`text`、`link`，分别适用于不同的使用场景",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-3 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="text">Text Button</Button>
        <Button variant="link" className="gap-1">
          Link Button
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24"
            fill="none"
            aria-label="Link Icon"
          >
            <path 
              d="M7.96909 4.03L15.9382 11.9991L7.96909 19.9682" 
              fillOpacity="0"
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="square" 
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    );
  },
};

export const Demo02: Story = {
  name: "按钮尺寸",
  parameters: {
    docs: {
      description: {
        story: "Button 组件支持 4 种不同的尺寸：`xs`、`sm`、`base`、`lg`，默认为 `base`",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-3 items-center">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="base">Base</Button>
        <Button size="lg">Large</Button>
      </div>
    );
  },
};

export const Demo03: Story = {
  name: "禁用状态",
  parameters: {
    docs: {
      description: {
        story: "通过 `disabled` 属性设置按钮的禁用状态，禁用后按钮不可点击",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-3 items-center">
        <Button variant="primary" disabled>Primary Disabled</Button>
        <Button variant="default" disabled>Default Disabled</Button>
        <Button variant="secondary" disabled>Secondary Disabled</Button>
        <Button variant="text" disabled>Text Disabled</Button>
        <Button variant="link" disabled>Link Disabled</Button>
      </div>
    );
  },
};

export const Demo04: Story = {
  name: "加载状态",
  parameters: {
    docs: {
      description: {
        story: "在按钮中添加加载图标来表示正在处理的状态，通常在异步操作时使用",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-3 items-center">
        <Button disabled>
          <Loader2 className="animate-spin" />
          Loading...
        </Button>
        <Button variant="secondary" disabled>
          <Loader2 className="animate-spin" />
          Please wait
        </Button>
      </div>
    );
  },
};

export const Demo05: Story = {
  name: "自定义内容",
  parameters: {
    docs: {
      description: {
        story: "Button 组件支持自定义内容，可以包含图标、文本等元素",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-3 items-center">
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
        <Button variant="link" size="sm">
          Learn more
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7"/>
            <path d="M7 7h10v10"/>
          </svg>
        </Button>
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
|---|---|---|-----|---|
| variant | 按钮变体 | 'primary' \/ 'default' \/ 'secondary' \/ 'text' \/ 'link' | 'default' | 否 |
| size | 按钮尺寸 | 'xs' \/ 'sm' \/ 'base' \/ 'lg' | 'base' | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| children | 按钮内容 | React.ReactNode | - | 是 |
| onClick | 点击事件处理函数 | (event: React.MouseEvent) => void | - | 否 |

继承所有标准 HTML button 元素的属性。
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
