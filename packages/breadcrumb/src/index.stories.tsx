import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./index";
import { Button } from "../../button/index";

const meta: Meta<typeof Breadcrumb> = {
  title: "Example/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
Breadcrumb 面包屑用于展示页面层级路径，支持省略折叠、分隔符自定义、超长截断Tooltip、受控/非受控、renderItem自定义等。

## 组件类型
- 基础
- 可折叠
- 分隔符自定义
- Tooltip超长截断
- renderItem自定义
- 受控/非受控

## 使用原则
- 路径清晰，当前项不可点击
- 支持自定义分隔符、折叠、Tooltip
- 交互友好，支持键盘与a11y

## 组件引入
\`\`\`tsx
import { Breadcrumb } from '@oversea/breadcrumb';

<Breadcrumb items=[
  {key: "home", label: "首页", href: "#"},
  { key: "cat", label: "分类页", href: "#" },
  { key: "subcat", label: "子分类", href: "#" },
  { key: "page", label: "当前页面" },
] />
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
  render: () => {
    const items = [
      { key: "home", label: "Home", href: "#" },
      { key: "cat", label: "Category", href: "#" },
      { key: "subcat", label: "Subcategory", href: "#" },
      { key: "page", label: "Current Page" },
    ];
    return <Breadcrumb items={items} />;
  },
  parameters: {
    docs: { description: { story: "最基础的面包屑用法，最后一项不可点击。" } },
  },
};

export const Demo02: Story = {
  name: "分隔符自定义",
  render: () => {
    const items = [
      { key: "home", label: "Home", href: "#" },
      { key: "cat", label: "Category", href: "#" },
      { key: "subcat", label: "Subcategory", href: "#" },
      { key: "page", label: "Current Page" },
    ];
    return <Breadcrumb items={items} separator={<span>{">"}</span>} />;
  },
  parameters: {
    docs: { description: { story: "分隔符可自定义为任意ReactNode。" } },
  },
};

export const Demo03: Story = {
  name: "折叠省略",
  render: () => {
    const items = [
      { key: 1, label: "Home", href: "#" },
      { key: 2, label: "Second Level", href: "#" },
      { key: 3, label: "Third Level", href: "#" },
      { key: 4, label: "Fourth Level", href: "#" },
      { key: 5, label: "Fifth Level", href: "#" },
      { key: 6, label: "Sixth Level", href: "#" },
      { key: 7, label: "Current Page" },
    ];
    return (
      <Breadcrumb
        items={items}
        maxItems={4}
        itemsBeforeCollapse={1}
        itemsAfterCollapse={2}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "超出maxItems时自动折叠为...，点击弹出DropdownMenu。",
      },
    },
  },
};

export const Demo04: Story = {
  name: "超长截断Tooltip",
  render: () => {
    const items = [
      { key: 1, label: "Home", href: "#" },
      { key: 2, label: "This is a very long category name", href: "#" },
      { key: 3, label: "Current Page" },
    ];
    return <Breadcrumb items={items} />;
  },
  parameters: {
    docs: {
      description: { story: "超长label自动启用Tooltip，hover时展示完整内容。目前是以字符数来判断的，大于 16 个字符会省略" },
    },
  },
};

export const Demo05: Story = {
  name: "受控模式",
  render: function ControlledBreadcrumb() {
    const items = [
      { key: "home", label: "Home", href: "#" },
      { key: "cat", label: "Category", href: "#" },
      { key: "subcat", label: "Subcategory", href: "#" },
      { key: "page", label: "Current Page" },
    ];
    const [active, setActive] = React.useState<string | number>("cat");
    return (
      <div className="flex flex-col gap-4 items-start">
        <Breadcrumb items={items} activeKey={active} onChange={setActive} />
        <div className="mt-4 text-xs text-text-quaternary">
          当前 activeKey: <span className="font-mono">{String(active)}</span>
        </div>
        <div className="flex gap-2">
          {items.map((item) => (
            <Button
              key={item.key}
              variant="secondary"
              size="sm"
              onClick={() => setActive(item.key)}
            >
              {item.key}
            </Button>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "通过上方控制器按钮切换 activeKey，演示受控模式。activeKey 由外部父组件控制，Breadcrumb 跟随变化。",
      },
    },
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
### Breadcrumb Props

| 属性                | 说明                                 | 类型                                                        | 默认值 | 必填 |
|---------------------|--------------------------------------|-------------------------------------------------------------|--------|------|
| items               | 面包屑数据源                         | \`BreadcrumbItemType[]\`                                      | -      | 是   |
| maxItems            | 超过多少项自动折叠                   | \`number\`                                                    | -      | 否   |
| itemsBeforeCollapse | 折叠前显示的项数                     | \`number\`                                                    | -      | 否   |
| itemsAfterCollapse  | 折叠后显示的项数                     | \`number\`                                                    | -      | 否   |
| separator           | 全局分隔符，默认'/'                  | \`React.ReactNode\`                                           | \`/\`    | 否   |
| ellipsisIcon        | 折叠 icon，默认 EllipsisIcon         | \`React.ReactNode\`                                           | -      | 否   |
| activeKey           | 当前激活的 key                       | \`string | number\`                                          | -      | 否   |
| onChange            | 切换回调                             | \`(key: string | number) => void\`                           | -      | 否   |
| renderItem          | 自定义渲染单项                       | \`(props: BreadcrumbRenderItemProps) => React.ReactNode\`     | -      | 否   |
| ellipsisProps       | 折叠 icon 的 props                   | \`React.ComponentProps<typeof BreadcrumbEllipsis>\`           | -      | 否   |
| dropdownMenuProps   | 下拉菜单的 props                     | \`Partial<React.ComponentProps<typeof DropdownMenuContent>>\` | -      | 否   |
| tooltipProps        | 提示的 props                         | \`Partial<React.ComponentProps<typeof TooltipContent>\`      | -      | 否   |
| className           | 自定义类名                           | \`string\`                                                    | -      | 否   |
| style               | 自定义样式                           | \`React.CSSProperties\`                                       | -      | 否   |

### BreadcrumbItemType

| 属性    | 说明           | 类型                | 默认值 | 必填 |
|---------|----------------|---------------------|--------|------|
| key     | 唯一标识       | \`string | number\`  | -      | 是   |
| label   | 展示内容       | \`React.ReactNode\`   | -      | 是   |
| href    | 跳转链接       | \`string\`            | -      | 否   |
| disabled| 是否禁用       | \`boolean\`           | -      | 否   |

### BreadcrumbRenderItemProps

| 属性       | 说明             | 类型                        | 默认值 | 必填 |
|------------|------------------|-----------------------------|--------|------|
| item       | 当前项           | \`BreadcrumbItemType\`        | -      | 是   |
| index      | 当前项索引       | \`number\`                    | -      | 是   |
| isCurrent  | 是否为当前项     | \`boolean\`                   | -      | 是   |
| isEllipsis | 是否为折叠项     | \`boolean\`                   | -      | 否   |
| onClick    | 点击事件         | \`(e: React.MouseEvent) => void\` | -  | 否   |
        `,
      },
    },
  },
  render: () => null,
};
