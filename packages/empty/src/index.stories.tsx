import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Empty, EmptyType } from "./index";
import { EmptyLevel } from "./types";

const meta: Meta<typeof Empty> = {
  title: "Feedback/Empty",
  component: Empty,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
空状态组件用于在页面或模块无内容、加载失败或出现异常时，提供清晰的视觉反馈和操作引导。

## 组件类型
该组件根据使用场景分为两种主要类型：

- **页面缺省图 (Page-level Empty State)**: 用于整个页面的空状态，通常尺寸较大，包含醒目的插图，用以吸引用户注意。
- **模块缺省图 (Module-level Empty State)**: 用于页面中某个模块的局部空状态，设计上更为简洁，通常不含插图，以免干扰页面其他元素。

支持的状态包括：
- **内容为空 (NoData)**: 列表、表格等数据为空。
- **搜索为空 (SearchEmpty)**: 搜索无结果。
- **网络异常 (NetworkError)**: 网络连接失败或请求异常。
- **服务器错误 (ServerError)**: 服务器返回错误。

## 使用原则
- **信息清晰**: 确保标题和描述能够清晰地告知用户当前状况。
- **场景匹配**: 根据具体场景选择合适的组件类型和状态。
- **操作引导**: 在可能的情况下，通过 \`action\` 属性提供明确的下一步操作，如"刷新"、"返回首页"等。
- **保持一致**: 在产品中保持空状态风格的统一性。

## 使用说明：
* 组件内部用到 container 容器查询，请确保父级元素有设置 \`container-type: inline-size\` 样式 或 tailwindcss 的 \`@container\` 类名；
* 组件内部已经集成好了一些 UI 规范，例如：当使用场景（\`level = EmptyLevel.Page\`）时，会默认使用 \`variant="primary"\` 的按钮，且做了响应式适配；当使用场景（\`level === EmptyLevel.Module\`）时，会默认使用 \`variant="secondary"\` 的按钮，如果需要自定义操作区域的话，使用 \`customAction\` 属性。

## 组件引入
\`\`\`tsx
import { Empty, EmptyType, EmptyLevel } from '@oversea/empty'

// 页面级-网络异常
<Empty 
  level={EmptyLevel.Page}
  iconType={EmptyType.NetworkError} 
  title="网络连接失败" 
  description="请检查网络连接或稍后重试",
  actionButtonText="刷新"
/>

// 模块级-内容为空 (无图标)
<Empty 
  level={EmptyLevel.Module}
  iconType={EmptyType.None}
  title="暂无数据" 
  description="当前没有可显示的内容"
  actionButtonText="刷新"
/>
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
  name: "页面缺省图（完整内容）",
  parameters: {
    docs: {
      description: {
        story:
          "默认页面层级带插图，且按钮使用一级按钮。至少需要保证有标题或者正文出现来总结和提示状态。按钮和插图可选择是否使用。",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-14 justify-center max-w-[1024px]">
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.NetworkError}
          title="Network error"
          description="Related content is empty. You are advised to perform the operation again"
          actionButtonText="Refresh"
        />
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.NoData}
          title="Content is empty"
          description="Related content is empty. You are advised to perform the operation again"
          actionButtonText="Refresh"
        />
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.ServerError}
          title="No data available"
          description="Related content is empty. You are advised to perform the operation again"
          actionButtonText="Refresh"
        />
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.SearchEmpty}
          title="Content is empty"
          description="Related content is empty. You are advised to perform the operation again"
          actionButtonText="Refresh"
        />
      </div>
    );
  },
};

export const Demo02: Story = {
  name: "页面缺省图（无按钮）",
  render: () => {
    return (
      <div className="flex flex-wrap gap-14 justify-center max-w-[1024px]">
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.NetworkError}
          title="Network error"
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.NoData}
          title="Content is empty"
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.ServerError}
          title="No data available"
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.SearchEmpty}
          title="Content is empty"
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
      </div>
    );
  },
};

export const Demo03: Story = {
  name: "页面缺省图（无按钮 + 无正文）",
  render: () => {
    return (
      <div className="flex flex-wrap gap-14 justify-center max-w-[1024px]">
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.NetworkError}
          title="Network error"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.NoData}
          title="Content is empty"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.ServerError}
          title="No data available"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Page}
          iconType={EmptyType.SearchEmpty}
          title="Content is empty"
          showAction={false}
        />
      </div>
    );
  },
};

export const Demo04: Story = {
  name: "模块缺省图（完整内容）",
  parameters: {
    docs: {
      description: {
        story:
          "默认模块级不带插图，且按钮使用二级按钮。至少需要保证有标题或者正文出现来总结和提示状态。按钮和插图可选择是否使用。",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-14 justify-center max-w-[1024px]">
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          title="Network error"
          description="Related content is empty. You are advised to perform the operation again"
          actionButtonText="Refresh"
        />
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          title="Content is empty"
          description="Related content is empty. You are advised to perform the operation again"
          actionButtonText="Refresh"
        />
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          title="No data available"
          description="Related content is empty. You are advised to perform the operation again"
          actionButtonText="Refresh"
        />
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          title="Content is empty"
          description="Related content is empty. You are advised to perform the operation again"
          actionButtonText="Refresh"
        />
      </div>
    );
  },
};

export const Demo05: Story = {
  name: "模块缺省图（无按钮）",
  render: () => {
    return (
      <div className="flex flex-wrap gap-14 justify-center max-w-[1024px]">
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          title="Network error"
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          title="Content is empty"
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          title="No data available"
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          title="Content is empty"
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
      </div>
    );
  },
};

export const Demo06: Story = {
  name: "模块缺省图（无标题）",
  render: () => {
    return (
      <div className="flex flex-wrap gap-14 justify-center max-w-[1024px]">
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
        <Empty
          level={EmptyLevel.Module}
          iconType={EmptyType.None}
          description="Related content is empty. You are advised to perform the operation again"
          showAction={false}
        />
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
| level | 组件类型 | EmptyLevel \\/ keyof typeof EmptyLevel | EmptyLevel.Module | 否 |
| iconType | 空状态类型，决定显示的图标 | EmptyType \\/ keyof typeof EmptyType | EmptyType.NoData | 否 |
| title | 标题文本 | string | - | 否 |
| description | 描述文本 | string | - | 否 |
| size | 图标尺寸大小 | number | 96 | 否 |
| showAction | 是否显示操作区域 | boolean | true | 否 |
| actionButtonText | 操作区域按钮文本 | string | - | 否 |
| onClickAction | 操作区域点击事件 | () => void | - | 否 |
| customAction | 用户自定义操作区域内容，通常用于放置按钮等交互元素 | React.ReactNode | - | 否 |
| className | 自定义 CSS 类名 | string | - | 否 |

### 组件使用场景枚举（EmptyLevel）

| 枚举值 | 使用场景 |
|---|---|
| EmptyLevel.Page | 页面缺省图 |
| EmptyLevel.Module | 模块缺省图 |

### 图标类型枚举（EmptyType）

| 枚举值 | 使用场景 | 建议标题 |
|---|---|---|
| EmptyType.None | 不展示图标 | - |
| EmptyType.NoData | 列表、表格、数据为空 | "暂无数据"、"列表为空" |
| EmptyType.SearchEmpty | 搜索无结果 | "未找到相关内容"、"搜索结果为空" |
| EmptyType.NetworkError | 网络错误、请求失败 | "网络连接失败"、"加载失败" |
| EmptyType.ServerError | 服务器错误 | "服务器错误" |
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
