import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./index";
// @ts-ignore
import { Button } from "@/button/index";

const meta: Meta<typeof Switch> = {
  title: "Example/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
Switch 开关为基本组件之一；有两个互斥的选项（例如开/关、是/否、启动/禁用），它是用来打开或关闭选项的控件。选择其中一个选项会导致立即执行操作。

## 组件类型
有打开、关闭、不可选中、加载四种状态；

## 使用原则
- Switch 开关控件本身就能表现当前的开/关状态，因此相关文案只需表示所控制内容，千万不要在 list 或表单中加入一些逻辑词语，比如打开/关闭等
- 开关操作后立马执行
- 危险操作二次确认；由于按下 Switch 后立即执行操作，如果操作比较危险，请在点击开关后加入二次确认流程，避免造成严重损失

## 组件引入
\`\`\`tsx
import { Switch } from '@oversea/switch'

<Switch defaultChecked={true} />
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
  name: "基本",
  parameters: {
    docs: {
      description: {
        story: "非受控模式，通过 `defaultChecked` 属性设置初始状态",
      },
    },
  },
  render: () => {
    return <Switch defaultChecked={true} />;
  },
};

export const Demo02: Story = {
  name: "受控模式（常用）",
  parameters: {
    docs: {
      description: {
        story:
          "受控模式，通过 `checked` 属性设置当前状态，通过 `onCheckedChange` 属性监听状态变化",
      },
    },
  },
  render: () => {
    const [checked, setChecked] = React.useState(true);
    const handleChange = (checked: boolean) => {
      setChecked(checked);
    };

    return (
      <div className="flex flex-col gap-2 items-center">
        <Switch checked={checked} onCheckedChange={handleChange} />
        <span className="text-text-primary">
          checked: {checked ? "true" : "false"}
        </span>
      </div>
    );
  },
};

export const Demo03: Story = {
  name: "开关尺寸",
  parameters: {
    docs: {
      description: {
        story: "开关尺寸可选值：`sm`、`md`、`lg`，默认为 `lg`",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4 text-text-primary">
        <div className="flex gap-2 items-center">
          <Switch size="sm" defaultChecked={true} />
        </div>
        <div className="flex gap-2 items-center">
          <Switch size="md" defaultChecked={true} />
        </div>
        <div className="flex gap-2 items-center">
          <Switch size="lg" defaultChecked={true} />
        </div>
      </div>
    );
  },
};

export const Demo04: Story = {
  name: "加载状态",
  parameters: {
    docs: {
      description: {
        story: "通过 `loading` 属性设置加载状态，常在异步操作时使用",
      },
    },
  },
  render: () => {
    const [checked, setChecked] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const switchLoading = () => {
      setLoading(true);
      // 模拟异步加载
      setTimeout(() => {
        setChecked(!checked);
        setLoading(false);
      }, 500);
    };

    return (
      <Switch
        checked={checked}
        loading={loading}
        onClick={switchLoading}
      />
    );
  },
};

export const Demo05: Story = {
  name: "禁用状态",
  parameters: {
    docs: {
      description: {
        story: "通过 `disabled` 属性设置禁用状态",
      },
    },
  },
  render: () => {
    const [disabled, setDisabled] = React.useState(true);
    const toggle = () => {
      setDisabled(!disabled);
    };

    return (
      <div className="flex flex-col gap-4 items-center">
        <Switch disabled={disabled} defaultChecked />
        <Button onClick={toggle} size="sm">
          Toggle disabled
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
|------|------|------|--------|------|
| defaultChecked | 初始是否选中 | boolean | false | 否 |
| checked | 指定当前是否选中 | boolean | - | 否 |
| onCheckedChange | 变化时回调函数 | (checked: boolean) => void | - | 否 |
| size | 开关尺寸，可选值为 sm, md, lg | \'sm\' \/ \'md\' \/ \'lg\' | 'md' | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| loading | 加载状态 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| onClick | 点击事件 | () => void | - | 否 |
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
