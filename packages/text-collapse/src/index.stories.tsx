import type { Meta, StoryObj } from "@storybook/react";
import { TextCollapse } from "./index";

const meta: Meta<typeof TextCollapse> = {
  title: "Example/TextCollapse",
  component: TextCollapse,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
TextCollapse 文字折叠组件用于在有限的空间内展示大量文本内容，用户可以通过点击"展开"/"收起"按钮来查看完整内容或收起内容。

## 组件特点
- **智能折叠**: 自动检测文本是否超过指定行数，只在需要时显示折叠功能
- **精确截断**: 使用二分查找算法精确计算最佳截断位置
- **响应式**: 自动监听容器尺寸变化，重新计算折叠状态
- **自定义按钮**: 可自定义展开/收起按钮的文本和样式
- **组件宽度**: 不预设组件宽度，需要通过className属性传入

## 使用原则
- 适用于文章内容、商品描述、评论等较长文本的展示
- 默认折叠状态应该能够展示足够的信息让用户判断是否需要查看完整内容
- 展开/收起操作应该有平滑的过渡效果
- 按钮文案要简洁明确

## 组件引入
\`\`\`tsx
import { TextCollapse } from '@oversea/text-collapse'

<TextCollapse 
  text="这里是要展示的文本内容..."
  rows={3}
  expandLabel="展开"
  collapseLabel="收起"
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
  name: "基础用法",
  parameters: {
    docs: {
      description: {
        story: "TextCollapse 组件的基础用法，当文本超过3行时自动显示折叠功能",
      },
    },
  },
  render: () => {
    return (
      <div className="mr-auto mb-auto w-full flex flex-col gap-5 text-sm">
        <TextCollapse
          expandLabel={<span className="leading-[18px]">See more</span>}
          text="This legislation would provide pathways for cannabis-related businesses to access banking services and financing, this legislation would provide pathways for cannabis-related businesses to access banking services and financing"
          collapseLabel={<span className="leading-[18px]">See less</span>}
          className="w-[343px] text-text-primary leading-[20px]"
        />
      </div>
    );
  },
};

export const Demo02: Story = {
  name: "展开后无法折叠",
  parameters: {
    docs: {
      description: {
        story: "当不传入 collapseLabel 时，展开后无法再次收起",
      },
    },
  },
  render: () => {
    return (
      <div className="mr-auto mb-auto w-full flex flex-col gap-5 text-sm">
        <TextCollapse
          expandLabel={<span className="leading-[18px]">See more</span>}
          text="This legislation would provide pathways for cannabis-related businesses to access banking services and financing, this legislation would provide pathways for cannabis-related businesses to access banking services and financing"
          className="w-[343px] text-text-primary leading-[20px]"
        />
      </div>
    );
  },
};

export const Demo03: Story = {
  name: "改变折叠状态时触发函数",
  parameters: {
    docs: {
      description: {
        story: "通过 onExpandChange 回调触发函数",
      },
    },
  },
  render: () => {
    return (
      <div className="mr-auto mb-auto w-full flex flex-col gap-5 text-sm">
        <TextCollapse
          expandLabel="展开"
          text="This legislation would provide pathways for cannabis-related businesses to access banking services and financing, this legislation would provide pathways for cannabis-related businesses to access banking services and financing"
          collapseLabel="收起"
          onExpandChange={(expanded) => {
            setTimeout(() => {
              alert(`当前状态: ${expanded ? "展开" : "收起"}`);
            }, 200);
          }}
          className="w-[343px] text-text-primary leading-[20px]"
        />
      </div>
    );
  },
};

export const Demo04: Story = {
  name: "初始状态为展开",
  parameters: {
    docs: {
      description: {
        story: "通过 defaultExpanded 属性设置默认展开状态",
      },
    },
  },
  render: () => {
    return (
      <div className="mr-auto mb-auto w-full flex flex-col gap-5 text-sm">
        <TextCollapse
          defaultExpanded={true}
          expandLabel="展开"
          text="This legislation would provide pathways for cannabis-related businesses to access banking services and financing, this legislation would provide pathways for cannabis-related businesses to access banking services and financing"
          collapseLabel="收起"
          className="w-[343px] text-text-primary leading-[20px]"
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
| text | 要显示的文本内容 | string | - | 是 |
| rows | 折叠状态下显示的最大行数 | number | 3 | 否 |
| expandLabel | 展开按钮文本 | React.ReactNode | - | 是 |
| collapseLabel | 收起按钮文本 | React.ReactNode | - | 否 |
| defaultExpanded | 是否默认展开 | boolean | false | 否 |
| onExpandChange | 展开/收起状态变化回调 | (expanded: boolean) => void | - | 否 |
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
