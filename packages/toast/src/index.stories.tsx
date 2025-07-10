import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./index";
import { Toaster } from "./components/Toaster";
import { toaster } from "./hooks/useToaster";
import { Button } from "../../button/src/index";

const meta: Meta<typeof Toast> = {
  title: "Interaction/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
Toast 组件用于展示全局操作反馈信息，常用于操作成功、失败、警告、加载等场景，支持自动消失和多种类型图标。

## 组件类型
- 成功（success）
- 失败（error）
- 信息（info）
- 警告（warning/warn）
- 加载（loading）
- 无图标（none）

## 使用原则
- 用于页面级、全局级的轻量反馈提示
- 不要用于需要用户交互的复杂场景
- 保持提示内容简洁明了

## 组件引入
\`\`\`tsx
import { Toast, toaster } from '@oversea/toast';

<Toast type="success" content="操作成功" />
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ToastDemo: Story = {
  name: "按钮触发 Toast 示例",
  render: () => {

    return (
      <div className="flex flex-col gap-4 items-center p-4">
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <Button onClick={() => toaster({ type: "success", content: "操作成功" })}>Success</Button>
          <Button onClick={() => toaster({ type: "error", content: "操作失败" })}>Error</Button>
          <Button onClick={() => toaster({ type: "info", content: "信息提示" })}>Info</Button>
          <Button onClick={() => toaster({ type: "warning", content: "警告提示" })}>Warning</Button>
          <Button onClick={() => toaster({ type: "loading", content: "加载中..." })}>Loading</Button>
          <Button onClick={() => toaster({ type: "none", content: "无图标提示" })}>None</Button>
        </div>

        <Button
          onClick={() =>
            toaster({
              type: "info",
              content:
                "这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的提示信息，超出最大宽度会被省略。",
              maxWidth: 200
            })
          }
        >
          触发最大宽度 Toast
        </Button>

        <Button
          onClick={() =>
            toaster({
              type: "info",
              content: `第一行内容\n第二行内容\n第三行内容\n第四行内容\n第五行内容\n第六行内容`,
              maxLine: 2,
              maxWidth: 120
            })
          }
        >
          触发最大行数 Toast
        </Button>


        <Toaster />
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
| 属性      | 说明         | 类型         | 默认值 | 必填 |
|-----------|--------------|--------------|--------|------|
| type      | 提示类型，决定 Toast 图标类型 | \`success\`<br>\`error\`<br>\`info\`<br>\`warning\`<br>\`warn\`<br>\`none\`<br>\`loading\` | 'success' | 否   |
| content   | 展示内容     | \`string\`       | ""      | 否   |
| duration  | 自动关闭时间（ms），0 表示常驻 | \`number\` | 3000   | 否   |
| maxWidth  | 最大宽度     | \`number\`       | 320    | 否   |
| maxLine   | 最大显示行数，超出省略 | \`number\` | 1      | 否   |
| className | 自定义类名   | \`string\`       | -      | 否   |
        `,
      },
    },
  },
  render: () => null,
};
