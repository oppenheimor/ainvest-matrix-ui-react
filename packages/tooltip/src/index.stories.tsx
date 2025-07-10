import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './index';
import Button from '../../button';

const meta: Meta<typeof Tooltip> = {
  title: 'Interaction/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 定义
Tooltip 提示框为用户交互的辅助组件，用于在触发元素附近显示简短的说明信息或操作提示。

## 组件类型
有基础提示、可关闭提示、自动关闭提示、受控提示四种类型。

## 使用原则
- 提示内容应简洁明了，最多显示2行文本
- 对重要操作提供功能说明，提升用户体验
- 重要提示使用可关闭模式，避免误操作
- 不应遮挡核心操作区域

## 组件引入
\`\`\`tsx
import { Tooltip } from '@oversea/tooltip'

<Tooltip content="提示内容">
  <Button>触发元素</Button>
</Tooltip>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo01: Story = {
  name: '基本用法',
  parameters: {
    docs: {
      description: {
        story: '最基本的提示框用法，悬停显示提示信息',
      },
    },
  },
  render: () => {
    return (
      <Tooltip content="这是提示信息" variant="primary">
        <Button>悬停显示</Button>
      </Tooltip>
    );
  },
};

export const Demo02: Story = {
  name: '背景变体',
  parameters: {
    docs: {
      description: {
        story: '支持 primary（品牌色）和 neutral（中性色）两种背景变体',
      },
    },
  },
  render: () => {
    return (
      <div className="flex gap-4">
        <Tooltip content="品牌色背景" variant="primary">
          <Button>Primary</Button>
        </Tooltip>
        <Tooltip content="中性色背景" variant="neutral">
          <Button>Neutral</Button>
        </Tooltip>
      </div>
    );
  },
};

export const Demo03: Story = {
  name: '显示位置',
  parameters: {
    docs: {
      description: {
        story: '通过 placement 属性控制提示框显示位置',
      },
    },
  },
  render: () => {
    return (
      <div className="grid grid-cols-3 gap-6 place-items-center">
        <div></div>
        <Tooltip content="上方提示" placement="top" variant="primary">
          <Button>Top</Button>
        </Tooltip>
        <div></div>

        <Tooltip content="左侧提示" placement="left" variant="primary">
          <Button>Left</Button>
        </Tooltip>
        <div></div>
        <Tooltip content="右侧提示" placement="right" variant="primary">
          <Button>Right</Button>
        </Tooltip>

        <div></div>
        <Tooltip content="下方提示" placement="bottom" variant="primary">
          <Button>Bottom</Button>
        </Tooltip>
        <div></div>
      </div>
    );
  },
};

export const Demo04: Story = {
  name: '可关闭提示',
  parameters: {
    docs: {
      description: {
        story: '通过 closable 属性添加关闭按钮，适用于重要提示',
      },
    },
  },
  render: () => {
    return (
      <Tooltip content="点击右侧按钮关闭提示" closable variant="primary">
        <Button>可关闭提示</Button>
      </Tooltip>
    );
  },
};

export const Demo05: Story = {
  name: '触发方式',
  parameters: {
    docs: {
      description: {
        story: '支持 hover、focus、click 三种触发方式',
      },
    },
  },
  render: () => {
    return (
      <div className="flex gap-4">
        <Tooltip content="悬停触发" trigger="hover" variant="primary">
          <Button>Hover</Button>
        </Tooltip>
        <Tooltip content="聚焦触发" trigger="focus" variant="primary">
          <Button>Focus</Button>
        </Tooltip>
        <Tooltip content="点击触发" trigger="click" variant="primary">
          <Button>Click</Button>
        </Tooltip>
      </div>
    );
  },
};

export const Demo06: Story = {
  name: '自动关闭',
  parameters: {
    docs: {
      description: {
        story: '通过 autoCloseDelayDuration 设置自动关闭时间',
      },
    },
  },
  render: () => {
    return (
      <div className="flex gap-4">
        <Tooltip content="2秒后自动关闭" autoCloseDelayDuration={2000} closable variant="primary">
          <Button>2秒关闭</Button>
        </Tooltip>
        <Tooltip content="5秒后自动关闭" autoCloseDelayDuration={5000} closable variant="primary">
          <Button>5秒关闭</Button>
        </Tooltip>
      </div>
    );
  },
};

export const Demo07: Story = {
  name: '受控模式',
  parameters: {
    docs: {
      description: {
        story: '通过 open 属性实现受控模式，完全由外部状态控制',
      },
    },
  },
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col gap-4 items-center">
        <Tooltip content="受控模式提示" open={open} closable onClose={() => setOpen(false)} variant="primary">
          <Button>受控提示</Button>
        </Tooltip>
        <Button onClick={() => setOpen(!open)}>{open ? '关闭' : '打开'}提示</Button>
        <span className="text-sm text-text-secondary">状态: {open ? 'open' : 'closed'}</span>
      </div>
    );
  },
};

export const Demo08: Story = {
  name: '禁用状态',
  parameters: {
    docs: {
      description: {
        story: '通过 disabled 属性禁用提示功能',
      },
    },
  },
  render: () => {
    const [disabled, setDisabled] = React.useState(true);

    return (
      <div className="flex flex-col gap-4 items-center">
        <Tooltip content="此提示被禁用" disabled={disabled} variant="primary">
          <Button>{disabled ? '禁用状态' : '启用状态'}</Button>
        </Tooltip>
        <Button onClick={() => setDisabled(!disabled)}>{disabled ? '启用' : '禁用'}提示</Button>
      </div>
    );
  },
};

export const Demo09: Story = {
  name: '箭头控制',
  parameters: {
    docs: {
      description: {
        story: '通过 showArrow 属性控制是否显示指向箭头',
      },
    },
  },
  render: () => {
    return (
      <div className="flex gap-4">
        <Tooltip content="带箭头提示" showArrow={true} variant="primary">
          <Button>带箭头</Button>
        </Tooltip>
        <Tooltip content="无箭头提示" showArrow={false} variant="primary">
          <Button>无箭头</Button>
        </Tooltip>
      </div>
    );
  },
};

export const Demo10: Story = {
  name: '长内容处理',
  parameters: {
    docs: {
      description: {
        story: '长内容会自动截断为2行，超出部分显示省略号',
      },
    },
  },
  render: () => {
    return (
      <Tooltip
        content="这是一段很长的提示信息，用来演示组件的文本截断功能。当内容超过两行时会自动显示省略号，确保界面整洁美观。"
        closable
        variant="primary"
        trigger="click"
      >
        <Button>长内容提示</Button>
      </Tooltip>
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
    viewMode: 'docs',
    docs: {
      description: {
        story: `
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|---|---|
| content | 提示内容 | ReactNode | - | 是 |
| children | 触发元素，必须是单个 React 元素 | ReactElement | - | 是 |
| placement | 显示位置 | 'top' / 'bottom' / 'left' / 'right' | 'top' | 否 |
| trigger | 触发方式 | 'hover' / 'focus' / 'click' | 'hover' | 否 |
| variant | 背景变体 | 'primary' / 'neutral' | 'neutral' | 否 |
| closable | 是否可关闭 | boolean | false | 否 |
| showArrow | 是否显示箭头 | boolean | true | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| delayDuration | 显示延迟时间 (ms) | number | 200 | 否 |
| hideDelayDuration | 隐藏延迟时间 (ms) | number | 200 | 否 |
| autoCloseDelayDuration | 自动关闭时间 (ms) | number | 0 | 否 |
| open | 手动控制显示状态 | boolean | - | 否 |
| onOpenChange | 显示状态变化回调 | (open: boolean) => void | - | 否 |
| onClose | 关闭回调 | () => void | - | 否 |
| className | 自定义类名 | string | - | 否 |

### Ref 方法

| 方法 | 说明 | 类型 |
|---|---|---|
| focus | 聚焦到触发元素 | () => void |
| open | 手动打开 Tooltip | () => void |
| close | 手动关闭 Tooltip | () => void |
| nativeElement | 原生 DOM 元素引用 | HTMLElement / null |
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
