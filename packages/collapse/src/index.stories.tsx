import { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Collapse } from "./index";
import type { IListRef, IPanelRef } from "./types";

const meta: Meta<typeof Collapse> = {
  title: "Example/Collapse",
  component: Collapse,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
Collapse 是一个统一的折叠组件，包含 Panel（面板）和 List（列表）两种使用方式。

## 组件特点
- **统一 API**：一个 Collapse 组件同时支持 Panel 和 List 两种折叠功能
- **Panel 模式**：用于折叠/展开单个内容面板，适合展示独立的内容块
- **List 模式**：用于折叠/展开数据列表，适合展示多项数据的收纳与展开
- **自定义样式**：两种模式均支持自定义按钮（文本或自定义组件）

## 使用原则
- **Panel 模式**：
  - 适用于信息分组、内容收纳，提升页面整洁度
  - 常用于可选或次要信息、表单分组、移动端适配等场景
  - 适合需要单独折叠/展开某一块内容的场景
- **List 模式**：
  - 适用于数据列表、可选信息、移动端空间优化、自定义渲染等场景
  - 适合需要对多项数据进行统一折叠/展开的场景
  - 数据项需包含唯一 key，空数据自动处理
  - 支持自定义按钮和类型安全，展开/收起状态变化可通过回调获取

## 组件引入
\`\`\`tsx
import { Collapse } from "@oversea/collapse";
\`\`\`

## 使用方式
- 默认使用: \`<Collapse />\` (Panel 模式)
- List 模式: \`<Collapse.List />\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Panel 模式示例
export const Demo01: Story = {
  name: "Panel 模式",
  parameters: {
    docs: {
      description: {
        story: "Collapse.Panel 组件的基础用法，展示可折叠的内容面板",
      },
    },
  },
  render: () => {
    return (
      <div className="w-full h-full flex flex-col gap-10 items-center pt-20">
        <Collapse header="普通折叠面板" className="w-[375px]">
          as you enter the event, you'll start by playing an exciting slot
          machine game. This game will determine the maximum multiplier you can
          reach after successfully subscribing to one of our advanced feature
          plans. The higher the multiplier, the more your subscription length
          will be multiplied!
        </Collapse>
        <Collapse header="默认展开" className="w-[375px]" defaultExpanded>
          as you enter the event, you'll start by playing an exciting slot
          machine game. This game will determine the maximum multiplier you can
          reach after successfully subscribing to one of our advanced feature
          plans. The higher the multiplier, the more your subscription length
          will be multiplied!
        </Collapse>
      </div>
    );
  },
};

export const Demo02: Story = {
  name: "panel内部函数调用",
  parameters: {
    docs: {
      description: {
        story: "通过 ref 来调用 panel 的内部方法",
      },
    },
  },
  render: function RefControlDemo() {
    const collapseRef = useRef<IPanelRef>(null);

    const handleToggle = () => {
      collapseRef.current?.toggle();
    };

    const handleExpand = () => {
      collapseRef.current?.expand();
    };

    const handleCollapse = () => {
      collapseRef.current?.collapse();
    };

    const handleIsExpanded = () => {
      alert(`当前状态：${collapseRef.current?.isExpanded() ? "展开" : "收起"}`);
    };

    return (
      <div className="w-full h-full flex flex-col gap-10 items-center pt-20">
        <div className="flex gap-2 mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleToggle}
          >
            切换
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleExpand}
          >
            展开
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleCollapse}
          >
            收起
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={handleIsExpanded}
          >
            当前状态
          </button>
        </div>
        <Collapse
          ref={collapseRef}
          header="使用 ref 控制的折叠面板"
          className="w-[375px]"
        >
          这是一个通过 ref 控制的折叠面板示例。你可以使用上方的按钮来：
          <ul className="list-disc pl-6 mt-2">
            <li>切换面板的展开/收起状态</li>
            <li>直接展开面板</li>
            <li>直接收起面板</li>
          </ul>
        </Collapse>
      </div>
    );
  },
};

// List 模式示例
const data = [
  {
    key: "apple",
    name: "苹果",
  },
  {
    key: "banana",
    name: "香蕉",
  },
  {
    key: "orange",
    name: "橙子",
  },
  {
    key: "grape",
    name: "葡萄",
  },
  {
    key: "strawberry",
    name: "草莓",
  },
  {
    key: "blueberry",
    name: "蓝莓",
  },
  {
    key: "cherry",
    name: "樱桃",
  },
  {
    key: "peach",
    name: "桃子",
  },
];

export const Demo03: Story = {
  name: "List 模式",
  parameters: {
    docs: {
      description: {
        story: "展示 List 模式的基本用法",
      },
    },
  },
  render: () => {
    return (
      <div className="w-full h-full pt-20 flex flex-row justify-center gap-10">
        <Collapse.List
          items={data}
          renderItem={(item, index) => (
            <div className="p-3 h-[74px] border-b-[0.5px] border-gray-200 flex items-center">
              {index + 1}. {item.name}
            </div>
          )}
          className="w-[375px]"
        />
        <Collapse.List
          items={data}
          renderItem={(item, index) => (
            <div className="p-3 h-[74px] border-b-[0.5px] border-gray-200 flex items-center">
              {index + 1}. {item.name}
            </div>
          )}
          className="w-[375px]"
          actionLabel={{
            type: "text",
            underline: true,
            expandLabel: "View All",
            collapseLabel: "View Less",
          }}
        />
        <Collapse.List
          items={data}
          renderItem={(item, index) => (
            <div className="p-3 h-[74px] border-b-[0.5px] border-gray-200 flex items-center">
              {index + 1}. {item.name}
            </div>
          )}
          className="w-[375px]"
          defaultExpanded
        />
      </div>
    );
  },
};

export const Demo04: Story = {
  name: "List模式-修改可见数量",
  parameters: {
    docs: {
      description: {
        story: "设置 visibleCount 为 3，超过 3 项后，会显示展开按钮",
      },
    },
  },
  render: () => {
    return (
      <div className="w-full h-full flex flex-col items-center pt-20">
        <Collapse.List
          items={data}
          renderItem={(item, index) => (
            <div className="p-3 h-[74px] border-b-[0.5px] border-gray-200 flex items-center">
              {index + 1}. {item.name}
            </div>
          )}
          visibleCount={4}
          className="w-[375px]"
        />
      </div>
    );
  },
};

export const Demo05: Story = {
  name: "List模式-自定义按钮文本",
  parameters: {
    docs: {
      description: {
        story: "自定义按钮文本",
      },
    },
  },
  render: () => {
    return (
      <div className="w-full h-full flex flex-col items-center pt-20">
        <Collapse.List
          items={data}
          renderItem={(item, index) => (
            <div className="p-3 h-[74px] border-b-[0.5px] border-gray-200 flex items-center">
              {index + 1}. {item.name}
            </div>
          )}
          actionLabel={{
            type: "text",
            expandLabel: "展开",
            collapseLabel: "折叠",
          }}
          className="w-[375px]"
        />
      </div>
    );
  },
};

export const Demo06: Story = {
  name: "List模式-自定义按钮",
  parameters: {
    docs: {
      description: {
        story: "自定义按钮",
      },
    },
  },
  render: () => {
    return (
      <div className="w-full h-full flex flex-col items-center pt-20">
        <Collapse.List
          items={data}
          renderItem={(item, index) => (
            <div className="p-3 h-[74px] border-b-[0.5px] border-gray-200 flex items-center">
              {index + 1}. {item.name}
            </div>
          )}
          actionLabel={{
            type: "custom",
            expandLabel: <span className="m-4 text-text-link">自定义展开</span>,
            collapseLabel: (
              <span className="m-4 text-text-link">自定义折叠</span>
            ),
          }}
          className="w-[375px]"
        />
      </div>
    );
  },
};

export const Demo07: Story = {
  name: "List内部函数调用",
  parameters: {
    docs: {
      description: {
        story: "通过 ref 来调用 List 的内部方法",
      },
    },
  },
  render: function RefControlDemo() {
    const collapseRef = useRef<IListRef>(null);

    const handleToggle = () => {
      collapseRef.current?.toggle();
    };

    const handleExpand = () => {
      collapseRef.current?.expand();
    };

    const handleCollapse = () => {
      collapseRef.current?.collapse();
    };

    const handleIsExpanded = () => {
      alert(`当前状态：${collapseRef.current?.isExpanded() ? "展开" : "收起"}`);
    };

    return (
      <div className="w-full h-full flex flex-col items-center pt-20">
        <div className="flex gap-2 mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleToggle}
          >
            切换
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleExpand}
          >
            展开
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleCollapse}
          >
            收起
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={handleIsExpanded}
          >
            当前状态
          </button>
        </div>
        <div className="w-full h-full flex flex-col items-center">
          <Collapse.List
            ref={collapseRef}
            items={data}
            renderItem={(item, index) => (
              <div className="p-3 h-[74px] border-b-[0.5px] border-gray-200 flex items-center">
                {index + 1}. {item.name}
              </div>
            )}
            actionLabel={{
              type: "text",
              expandLabel: "展开",
              collapseLabel: "折叠",
            }}
            className="w-[375px]"
          />
        </div>
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
### Collapse（Panel 模式）

| 属性            | 说明                 | 类型                        | 默认值   | 必填 |
|-----------------|----------------------|-----------------------------|----------|------|
| header          | 面板标题             | React.ReactNode             | -        | 是   |
| children        | 面板内容             | React.ReactNode             | -        | 否   |
| defaultExpanded | 是否默认展开         | boolean                     | false    | 否   |
| onExpandChange  | 展开/收起状态回调    | (expanded: boolean) => void | -        | 否   |
| iconSize        | 箭头图标大小         | number                      | 16       | 否   |
| className       | 自定义样式类名       | string                      | -        | 否   |

---

### Collapse.List

| 属性            | 说明                     | 类型                                        | 默认值       | 必填 |
|-----------------|--------------------------|---------------------------------------------|--------------|------|
| items           | 数据源数组               | T[]（T需包含 key:string）                   | -            | 是   |
| renderItem      | 渲染每个列表项的函数     | (item: T, index: number) => React.ReactNode | -            | 是   |
| visibleCount    | 初始可见项数量           | number                                      | 3            | 否   |
| actionLabel     | 展开/折叠按钮配置        | ActionLabel                                 | 见下方默认值 | 否   |
| defaultExpanded | 是否默认展开全部         | boolean                                     | false        | 否   |
| onExpandChange  | 展开状态变化时的回调     | (expanded: boolean) => void                 | -            | 否   |
| className       | 列表容器类名             | string                                      | -            | 否   |

#### ActionLabel 类型

- 默认值
{ type: "text", expandLabel: "View More", collapseLabel: "View Less", underline: false }

- 文本类型（type: "text"）：  
  - expandLabel: string（展开按钮文本，必填）  
  - collapseLabel?: string（收起按钮文本，选填）  
  - underline?: boolean（hover 时显示下划线，选填）

- 自定义类型（type: "custom"）：  
  - expandLabel: React.ReactNode（展开按钮组件，必填）  
  - collapseLabel: React.ReactNode（收起按钮组件，必填）
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
