import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { RadioGroup, RadioGroupItem } from './index';

const meta: Meta<typeof RadioGroup> = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
RadioGroup 单选框组件，用于在多个互斥选项中选择一个。基于 Radix UI 构建，具备完整的无障碍访问支持。

## 组件变体
- **default**: 基单选框样式
- **card**: 卡片样式，支持图标、标签和描述
- **list**: 列表样式，选项紧密排列，支持自定义插槽内容
- **button**: 按钮样式，支持插槽内容和图标位置设置，适合网格布局的选项展示

## 主题模式
- **mobile**: 移动端主题（默认），列表模式显示下边框，字体为 16px
- **pc**: PC端主题，列表模式无下边框，默认及列表模式字体为 14px

## 使用原则
- 用于多个互斥选项的选择，只能选择其中一个
- 选项数量建议在 2-7 个之间
- 选项标签要简洁明确，避免歧义
- 支持键盘导航和无障碍访问

## 组件引入
\`\`\`tsx
import { RadioGroup, RadioGroupItem } from '@/radio-group'

// 基础用法
<RadioGroup defaultValue="option1">
  <RadioGroupItem value="option1" label="选项 1" />
  <RadioGroupItem value="option2" label="选项 2" />
</RadioGroup>

// 卡片样式
<RadioGroup defaultValue="option1" variant="card">
  <RadioGroupItem value="option1" label="选项 1" description="描述文本" />
  <RadioGroupItem value="option2" label="选项 2" />
</RadioGroup>

// 列表样式
<RadioGroup defaultValue="option1" variant="list">
  <RadioGroupItem 
    value="option1" 
    label="基础版" 
    customContent={<span className="text-green-600">$9/月</span>} 
  />
  <RadioGroupItem 
    value="option2" 
    label="专业版" 
    customContent={<span className="text-blue-600">$29/月</span>} 
  />
</RadioGroup>

// 按钮样式
<RadioGroup defaultValue="star" variant="button">
  <RadioGroupItem 
    value="star" 
    label="收藏" 
    buttonSlot={
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    }
    buttonSlotPosition="start"
  />
  <RadioGroupItem value="basic" label="基础" />
</RadioGroup>

// 主题模式
<RadioGroup theme="pc" variant="list" defaultValue="option1">
  <RadioGroupItem value="option1" label="PC模式选项" />
  <RadioGroupItem value="option2" label="无下边框" />
</RadioGroup>
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
  name: "基本用法",
  parameters: {
    docs: {
      description: {
        story: "最基础的单选框组，通过 `defaultValue` 设置默认选中项。默认模式支持 `customContent` 插槽在标签右侧显示额外内容。",
      },
    },
  },
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">基础选项</h4>
          <RadioGroup defaultValue="option1">
            <RadioGroupItem value="option1" label="选项 1" />
            <RadioGroupItem value="option2" label="选项 2" />
            <RadioGroupItem value="option3" label="选项 3" disabled />
          </RadioGroup>
        </div>
        
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">带插槽内容</h4>
          <RadioGroup defaultValue="basic">
            <RadioGroupItem 
              value="basic" 
              label="基础版" 
              customContent={<span className="text-sm text-gray-500">免费</span>}
            />
            <RadioGroupItem 
              value="pro" 
              label="专业版" 
              customContent={<span className="text-sm text-blue-600">推荐</span>}
            />
            <RadioGroupItem 
              value="enterprise" 
              label="企业版" 
              customContent={<span className="text-sm text-green-600">热门</span>}
            />
          </RadioGroup>
        </div>
      </div>
    );
  },
};

export const Demo02: Story = {
  name: "受控模式",
  parameters: {
    docs: {
      description: {
        story: "受控模式，通过 `value` 属性控制选中状态，通过 `onValueChange` 监听变化",
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState("option2");
    
    return (
      <div className="flex flex-col gap-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroupItem value="option1" label="选项 1" />
          <RadioGroupItem value="option2" label="选项 2" />
          <RadioGroupItem value="option3" label="选项 3" disabled />
        </RadioGroup>
        <div className="text-sm text-gray-600">
          当前选中：{value}
        </div>
      </div>
    );
  },
};

export const Demo03: Story = {
  name: "卡片样式",
  parameters: {
    docs: {
      description: {
        story: "通过设置 `variant=\"card\"` 启用卡片样式，支持图标、标签和描述文本",
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-600">Code Sort</h4>
      <RadioGroup variant="card" defaultValue="card1" className="flex gap-4">
        <RadioGroupItem
          value="card1"
          label="Symbol"
          className="w-[165px] justify-center"
        />
        <RadioGroupItem
          value="card2"
          label="Symbol"
          className="w-[165px] justify-center"
        />
      </RadioGroup>
      <h4 className="text-sm font-medium text-gray-600">Name/Symbol</h4>
      <RadioGroup variant="card" defaultValue="card1" className="flex gap-4">
        <RadioGroupItem
          value="card1"
          label="Symbol"
          description="Name"
          className="w-[165px]"
        />
        <RadioGroupItem
          value="card2"
          label="Symbol"
          description="Name"
          className="w-[165px]"
        />
      </RadioGroup>
      <h4 className="text-sm font-medium text-gray-600">Stock Logo Display</h4>
      <RadioGroup variant="card" defaultValue="card1" className="flex gap-4">
        <RadioGroupItem
          value="card1"
          label="Symbol"
          description="Name"
          icon={
            <div className="flex justify-center items-center w-7 h-7 bg-blue-600 rounded-full">
              <span className="text-xs font-bold text-white">S</span>
            </div>
          }
          className="w-[165px]"
        />
        <RadioGroupItem
          value="card2"
          label="Symbol"
          description="Name"
          icon={
            <div className="flex justify-center items-center w-7 h-7 bg-gray-300 rounded-full">
              <span className="text-xs font-bold text-white">S</span>
            </div>
          }
          className="w-[165px]"
        />
      </RadioGroup>
    </div>
  ),
};

export const Demo04: Story = {
  name: "图标配置",
  parameters: {
    docs: {
      description: {
        story: "通过 `iconType` 和 `iconPosition` 控制图标的类型和位置。`iconType` 支持 'default'（圆形）和 'checked'（对勾），`iconPosition` 支持 'start' 和 'end'",
      },
    },
  },
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default图标 - Start位置</h4>
        <RadioGroup defaultValue="option1" iconType="default" iconPosition="start" variant="list">
          <RadioGroupItem value="option1" label="选项 1" />
          <RadioGroupItem value="option2" label="选项 2" />
          <RadioGroupItem value="option3" label="选项 3" />
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default图标 - End位置</h4>
        <RadioGroup defaultValue="option1" iconType="default" iconPosition="end" variant="list">
          <RadioGroupItem value="option1" label="选项 1" />
          <RadioGroupItem value="option2" label="选项 2" />
          <RadioGroupItem value="option3" label="选项 3" />
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Checked图标 - Start位置</h4>
        <RadioGroup defaultValue="option1" iconType="checked" iconPosition="start" variant="list">
          <RadioGroupItem value="option1" label="选项 1" />
          <RadioGroupItem value="option2" label="选项 2" />
          <RadioGroupItem value="option3" label="选项 3" />
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Checked图标 - End位置</h4>
        <RadioGroup defaultValue="option1" iconType="checked" iconPosition="end" variant="list">
          <RadioGroupItem value="option1" label="选项 1" />
          <RadioGroupItem value="option2" label="选项 2" />
          <RadioGroupItem value="option3" label="选项 3" />
        </RadioGroup>
      </div>
    </div>
  ),
};

export const Demo05: Story = {
  name: "禁用状态",
  parameters: {
    docs: {
      description: {
        story: "通过 `disabled` 属性可以禁用特定选项，禁用的选项无法选择且显示为灰色",
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="normal1">
      <RadioGroupItem value="normal1" label="正常选项 1" />
      <RadioGroupItem value="normal2" label="正常选项 2" />
      <RadioGroupItem 
        value="disabled1" 
        label="禁用选项" 
        disabled 
      />
    </RadioGroup>
  ),
};

export const Demo06: Story = {
  name: "列表样式",
  parameters: {
    docs: {
      description: {
        story: "通过设置 `variant=\"list\"` 启用列表样式，支持自定义插槽内容，适合方案选择场景",
      },
    },
  },
  render: () => {
    return (
      <div className="space-y-4">

      <RadioGroup
        variant="list"
        className="w-[400px]"
        defaultValue="2"
        iconType="checked"
        iconPosition="end"
      >
        <RadioGroupItem
          value="1"
          label="基础版"
          customContent={
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium text-green-600">$9/月</span>
              <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded">推荐</span>
            </div>
          }
        />
        <RadioGroupItem
          value="2"
          label="专业版"
          customContent={
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium text-blue-600">$29/月</span>
              <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded">热门</span>
            </div>
          }
        />
        <RadioGroupItem
          value="3"
          label="团队版"
          customContent={
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-purple-600">$49/月</span>
              <span className="text-xs text-gray-500">最多10人</span>
            </div>
          }
        />
        <RadioGroupItem
          value="4"
          label="企业版"
        />
      </RadioGroup>
      <RadioGroup
        variant="list"
        className="w-[400px]"
        defaultValue="2"
        iconPosition="end"
        theme="pc"
      >
        <RadioGroupItem
          value="1"
          label="基础版"
          customContent={
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium text-green-600">$9/月</span>
              <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded">推荐</span>
            </div>
          }
        />
        <RadioGroupItem
          value="2"
          label="专业版"
          customContent={
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium text-blue-600">$29/月</span>
              <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded">热门</span>
            </div>
          }
        />
        <RadioGroupItem
          value="3"
          label="团队版"
          customContent={
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-purple-600">$49/月</span>
              <span className="text-xs text-gray-500">最多10人</span>
            </div>
          }
        />
        <RadioGroupItem
          value="4"
          label="企业版"
        />
      </RadioGroup>
      </div>

    );
  },
};

export const Demo07: Story = {
  name: "按钮样式",
  parameters: {
    docs: {
      description: {
        story: "通过设置 `variant=\"button\"` 启用按钮样式，支持插槽内容和图标位置设置，支持多行自动换行布局。",
      },
    },
  },
  render: () => {
    const StarIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    );
    
    const TrendIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
      </svg>
    );

    return (
      <div className="space-y-6">
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">基础标签</h4>
          <RadioGroup variant="button" defaultValue="growth" className="max-w-md">
            <RadioGroupItem value="featured" label="Featured" />
            <RadioGroupItem value="growth" label="Growth" />
            <RadioGroupItem value="guru" label="Guru" />
            <RadioGroupItem value="fund" label="Fund" />
          </RadioGroup>
        </div>
        
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">金融标签换行布局</h4>
          <RadioGroup variant="button" defaultValue="growth" className="max-w-md">
            <RadioGroupItem value="featured" label="Featured" />
            <RadioGroupItem value="growth" label="Growth" />
            <RadioGroupItem value="guru" label="Guru" />
            <RadioGroupItem value="fund" label="Fund" />
            <RadioGroupItem value="trend" label="Trend" />
            <RadioGroupItem value="technology" label="Technology" />
            <RadioGroupItem value="energy" label="Energy" />
            <RadioGroupItem value="bond" label="Bond" />
            <RadioGroupItem value="penny" label="Highest Volume Penny Stocks" />
            <RadioGroupItem value="gap" label="Gap trading" />
            <RadioGroupItem value="losers" label="Prior Day Losers" />
            <RadioGroupItem value="mixed" label="Mixed Styles" />
          </RadioGroup>
        </div>
        
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">带图标 - 前置位置</h4>
          <RadioGroup variant="button" defaultValue="star" className="max-w-md">
            <RadioGroupItem 
              value="star" 
              label="收藏" 
              buttonSlot={<StarIcon />}
              buttonSlotPosition="start"
            />
            <RadioGroupItem 
              value="trend" 
              label="趋势" 
              buttonSlot={<TrendIcon />}
              buttonSlotPosition="start"
            />
            <RadioGroupItem value="basic" label="基础" />
          </RadioGroup>
        </div>
        
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">带图标 - 后置位置</h4>
          <RadioGroup variant="button" defaultValue="trend2" className="max-w-md">
            <RadioGroupItem 
              value="star2" 
              label="收藏" 
              buttonSlot={<StarIcon />}
              buttonSlotPosition="end"
            />
            <RadioGroupItem 
              value="trend2" 
              label="趋势" 
              buttonSlot={<TrendIcon />}
              buttonSlotPosition="end"
            />
            <RadioGroupItem value="basic2" label="基础" />
          </RadioGroup>
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
## RadioGroup Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| children | 子组件（RadioGroupItem） | \`React.ReactNode\` | - | 是 |
| defaultValue | 默认选中的值 | \`string\` | - | 否 |
| value | 当前选中的值（受控模式） | \`string\` | - | 否 |
| onValueChange | 值改变时的回调函数 | \`(value: string) => void\` | - | 否 |
| variant | 组件变体 | \`'default' \| 'card' \| 'list' \| 'button'\` | \`'default'\` | 否 |
| iconType | 图标类型 | \`'default' \| 'checked'\` | \`'default'\` | 否 |
| iconPosition | 图标位置 | \`'start' \| 'end'\` | \`'start'\` | 否 |
| theme | 主题模式 | \`'mobile' \| 'pc'\` | \`'mobile'\` | 否 |
| disabled | 是否禁用整个组件 | \`boolean\` | \`false\` | 否 |
| className | 自定义类名 | \`string\` | - | 否 |

## RadioGroupItem Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| value | 选项的值 | \`string\` | - | 是 |
| label | 选项标签文本 | \`string\` | - | 否 |
| description | 描述文本（卡片模式可用） | \`string\` | - | 否 |
| icon | 图标元素（卡片模式可用） | \`React.ReactNode\` | - | 否 |
| customContent | 自定义插槽内容（默认和列表模式可用） | \`React.ReactNode\` | - | 否 |
| buttonSlot | 按钮模式插槽内容（按钮模式可用） | \`React.ReactNode\` | - | 否 |
| buttonSlotPosition | 按钮模式插槽位置（按钮模式可用） | \`'start' \| 'end'\` | \`'start'\` | 否 |
| disabled | 是否禁用该选项 | \`boolean\` | \`false\` | 否 |
| className | 自定义类名 | \`string\` | - | 否 |
| children | 自定义内容（覆盖默认渲染） | \`React.ReactNode\` | - | 否 |

## 变体说明

### default
基础的单选框样式，适用于简单的选项列表。

### card  
卡片样式，每个选项显示为独立的卡片，支持图标和描述文本。

### list
列表样式，选项紧密排列形成列表，支持自定义插槽内容，适合多个方案选择场景。

### button
按钮样式，每个选项显示为按钮，支持插槽内容和图标位置设置，适合网格布局的选项展示。

## 继承属性

RadioGroup 和 RadioGroupItem 组件基于 Radix UI 构建，继承了 Radix UI RadioGroup 的所有标准属性，包括但不限于：

- **aria-*** 无障碍访问属性
- **data-*** 数据属性  
- **id** 元素标识符
- **name** 表单字段名称（RadioGroup）
- **required** 是否必填（RadioGroup）

更多详细信息请参考 [Radix UI RadioGroup 文档](https://www.radix-ui.com/primitives/docs/components/radio-group)。
`,
      },
    },
  },
  render: () => <div></div>,
}; 