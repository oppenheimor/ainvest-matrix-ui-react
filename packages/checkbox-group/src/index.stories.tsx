import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { CheckboxGroup, CheckboxGroupItem } from './index';
import './styles/globals.css';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
CheckboxGroup 多选框组件，用于在多个选项中选择一个或多个。基于原生 HTML checkbox 实现，具备完整的无障碍访问支持。

## 组件变体
- **default**: 基础多选框样式
- **card**: 卡片样式，支持图标、标签和描述
- **list**: 列表样式，选项紧密排列，支持自定义插槽内容
- **button**: 按钮样式，支持插槽内容和图标位置设置，适合网格布局的选项展示

## 主题模式
- **mobile**: 移动端主题（默认），列表模式显示下边框，字体为 16px
- **pc**: PC端主题，列表模式无下边框，默认及列表模式字体为 14px

## 使用原则
- 用于多个选项的选择，可以选择其中的一个或多个
- 选项数量建议在 2-10 个之间
- 选项标签要简洁明确，避免歧义
- 支持键盘导航和无障碍访问

## 组件引入
\`\`\`tsx
import { CheckboxGroup, CheckboxGroupItem } from '@/checkbox-group'

// 基础用法
<CheckboxGroup defaultValue={["option1"]}>
  <CheckboxGroupItem value="option1" label="选项 1" />
  <CheckboxGroupItem value="option2" label="选项 2" />
</CheckboxGroup>

// 卡片样式
<CheckboxGroup defaultValue={["option1"]} variant="card">
  <CheckboxGroupItem value="option1" label="选项 1" description="描述文本" />
  <CheckboxGroupItem value="option2" label="选项 2" />
</CheckboxGroup>

// 列表样式
<CheckboxGroup defaultValue={["option1"]} variant="list">
  <CheckboxGroupItem 
    value="option1" 
    label="基础版" 
    customContent={<span className="text-green-600">$9/月</span>} 
  />
  <CheckboxGroupItem 
    value="option2" 
    label="专业版" 
    customContent={<span className="text-blue-600">$29/月</span>} 
  />
</CheckboxGroup>

// 按钮样式
<CheckboxGroup defaultValue={["star"]} variant="button">
  <CheckboxGroupItem 
    value="star" 
    label="收藏" 
    buttonSlot={
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    }
    buttonSlotPosition="start"
  />
  <CheckboxGroupItem value="basic" label="基础" />
</CheckboxGroup>

// 主题模式
<CheckboxGroup theme="pc" variant="list" defaultValue={["option1"]}>
  <CheckboxGroupItem value="option1" label="PC模式选项" />
  <CheckboxGroupItem value="option2" label="无下边框" />
</CheckboxGroup>
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
        story: "最基础的多选框组，通过 `defaultValue` 设置默认选中项。默认模式支持 `customContent` 插槽在标签右侧显示额外内容。",
      },
    },
  },
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">基础选项</h4>
          <CheckboxGroup defaultValue={["option1"]}>
            <CheckboxGroupItem value="option1" label="选项 1" />
            <CheckboxGroupItem value="option2" label="选项 2" />
            <CheckboxGroupItem value="option3" label="选项 3" disabled />
          </CheckboxGroup>
        </div>
        
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">带插槽内容</h4>
          <CheckboxGroup defaultValue={["basic"]}>
            <CheckboxGroupItem 
              value="basic" 
              label="基础版" 
              customContent={<span className="text-sm text-gray-500">免费</span>}
            />
            <CheckboxGroupItem 
              value="pro" 
              label="专业版" 
              customContent={<span className="text-sm text-blue-600">推荐</span>}
            />
            <CheckboxGroupItem 
              value="enterprise" 
              label="企业版" 
              customContent={<span className="text-sm text-green-600">热门</span>}
            />
          </CheckboxGroup>
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
    const [value, setValue] = React.useState(["option2"]);
    
    return (
      <div className="flex flex-col gap-4">
        <CheckboxGroup value={value} onValueChange={setValue}>
          <CheckboxGroupItem value="option1" label="选项 1" />
          <CheckboxGroupItem value="option2" label="选项 2" />
          <CheckboxGroupItem value="option3" label="选项 3" disabled />
        </CheckboxGroup>
        <div className="text-sm text-gray-600">
          当前选中：{value.length > 0 ? value.join(', ') : '无'}
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
      <CheckboxGroup variant="card" defaultValue={["card1"]} className="flex gap-4">
        <CheckboxGroupItem
          value="card1"
          label="Symbol"
          className="w-[165px] justify-center"
        />
        <CheckboxGroupItem
          value="card2"
          label="Symbol"
          className="w-[165px] justify-center"
        />
      </CheckboxGroup>
      <h4 className="text-sm font-medium text-gray-600">Name/Symbol</h4>
      <CheckboxGroup variant="card" defaultValue={["card1"]} className="flex gap-4">
        <CheckboxGroupItem
          value="card1"
          label="Symbol"
          description="Name"
          className="w-[165px]"
        />
        <CheckboxGroupItem
          value="card2"
          label="Symbol"
          description="Name"
          className="w-[165px]"
        />
      </CheckboxGroup>
      <h4 className="text-sm font-medium text-gray-600">Stock Logo Display</h4>
      <CheckboxGroup variant="card" defaultValue={["card1"]} className="flex gap-4">
        <CheckboxGroupItem
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
        <CheckboxGroupItem
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
      </CheckboxGroup>
    </div>
  ),
};

export const Demo04: Story = {
  name: "图标配置",
  parameters: {
    docs: {
      description: {
        story: "通过 `iconType` 和 `iconPosition` 控制图标的类型和位置。`iconType` 支持 'default'（方形）和 'checked'（对勾），`iconPosition` 支持 'start' 和 'end'",
      },
    },
  },
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default图标 - Start位置</h4>
        <CheckboxGroup defaultValue={["option1"]} iconType="default" iconPosition="start" variant="list">
          <CheckboxGroupItem value="option1" label="选项 1" />
          <CheckboxGroupItem value="option2" label="选项 2" />
          <CheckboxGroupItem value="option3" label="选项 3" />
        </CheckboxGroup>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default图标 - End位置</h4>
        <CheckboxGroup defaultValue={["option1"]} iconType="default" iconPosition="end" variant="list">
          <CheckboxGroupItem value="option1" label="选项 1" />
          <CheckboxGroupItem value="option2" label="选项 2" />
          <CheckboxGroupItem value="option3" label="选项 3" />
        </CheckboxGroup>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Checked图标 - Start位置</h4>
        <CheckboxGroup defaultValue={["option1"]} iconType="checked" iconPosition="start" variant="list">
          <CheckboxGroupItem value="option1" label="选项 1" />
          <CheckboxGroupItem value="option2" label="选项 2" />
          <CheckboxGroupItem value="option3" label="选项 3" />
        </CheckboxGroup>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Checked图标 - End位置</h4>
        <CheckboxGroup defaultValue={["option1"]} iconType="checked" iconPosition="end" variant="list">
          <CheckboxGroupItem value="option1" label="选项 1" />
          <CheckboxGroupItem value="option2" label="选项 2" />
          <CheckboxGroupItem value="option3" label="选项 3" />
        </CheckboxGroup>
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
    <CheckboxGroup defaultValue={["normal1"]}>
      <CheckboxGroupItem value="normal1" label="正常选项 1" />
      <CheckboxGroupItem value="normal2" label="正常选项 2" />
      <CheckboxGroupItem 
        value="disabled1" 
        label="禁用选项" 
        disabled 
      />
    </CheckboxGroup>
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
        <CheckboxGroup
          variant="list"
          className="w-[400px]"
          defaultValue={["2"]}
          iconType="checked"
          iconPosition="end"
        >
          <CheckboxGroupItem
            value="1"
            label="基础版"
            customContent={
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-green-600">$9/月</span>
                <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded">推荐</span>
              </div>
            }
          />
          <CheckboxGroupItem
            value="2"
            label="专业版"
            customContent={
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-blue-600">$29/月</span>
                <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded">热门</span>
              </div>
            }
          />
          <CheckboxGroupItem
            value="3"
            label="团队版"
            customContent={
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-purple-600">$49/月</span>
                <span className="text-xs text-gray-500">最多10人</span>
              </div>
            }
          />
          <CheckboxGroupItem
            value="4"
            label="企业版"
          />
        </CheckboxGroup>
        <CheckboxGroup
          variant="list"
          className="w-[400px]"
          defaultValue={["2"]}
          iconPosition="end"
          theme="pc"
        >
          <CheckboxGroupItem
            value="1"
            label="基础版"
            customContent={
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-green-600">$9/月</span>
                <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded">推荐</span>
              </div>
            }
          />
          <CheckboxGroupItem
            value="2"
            label="专业版"
            customContent={
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-blue-600">$29/月</span>
                <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded">热门</span>
              </div>
            }
          />
          <CheckboxGroupItem
            value="3"
            label="团队版"
            customContent={
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-purple-600">$49/月</span>
                <span className="text-xs text-gray-500">最多10人</span>
              </div>
            }
          />
          <CheckboxGroupItem
            value="4"
            label="企业版"
          />
        </CheckboxGroup>
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
          <CheckboxGroup variant="button" defaultValue={["growth"]} className="max-w-md">
            <CheckboxGroupItem value="featured" label="Featured" />
            <CheckboxGroupItem value="growth" label="Growth" />
            <CheckboxGroupItem value="guru" label="Guru" />
            <CheckboxGroupItem value="fund" label="Fund" />
          </CheckboxGroup>
        </div>
        
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">金融标签换行布局</h4>
          <CheckboxGroup variant="button" defaultValue={["growth", "technology"]} className="max-w-md">
            <CheckboxGroupItem value="featured" label="Featured" />
            <CheckboxGroupItem value="growth" label="Growth" />
            <CheckboxGroupItem value="guru" label="Guru" />
            <CheckboxGroupItem value="fund" label="Fund" />
            <CheckboxGroupItem value="trend" label="Trend" />
            <CheckboxGroupItem value="technology" label="Technology" />
            <CheckboxGroupItem value="energy" label="Energy" />
            <CheckboxGroupItem value="bond" label="Bond" />
            <CheckboxGroupItem value="penny" label="Highest Volume Penny Stocks" />
            <CheckboxGroupItem value="gap" label="Gap trading" />
            <CheckboxGroupItem value="losers" label="Prior Day Losers" />
            <CheckboxGroupItem value="mixed" label="Mixed Styles" />
          </CheckboxGroup>
        </div>
        
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">带图标 - 前置位置</h4>
          <CheckboxGroup variant="button" defaultValue={["star"]} className="max-w-md">
            <CheckboxGroupItem 
              value="star" 
              label="收藏" 
              buttonSlot={<StarIcon />}
              buttonSlotPosition="start"
            />
            <CheckboxGroupItem 
              value="trend" 
              label="趋势" 
              buttonSlot={<TrendIcon />}
              buttonSlotPosition="start"
            />
            <CheckboxGroupItem value="basic" label="基础" />
          </CheckboxGroup>
        </div>
        
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">带图标 - 后置位置</h4>
          <CheckboxGroup variant="button" defaultValue={["trend2"]} className="max-w-md">
            <CheckboxGroupItem 
              value="star2" 
              label="收藏" 
              buttonSlot={<StarIcon />}
              buttonSlotPosition="end"
            />
            <CheckboxGroupItem 
              value="trend2" 
              label="趋势" 
              buttonSlot={<TrendIcon />}
              buttonSlotPosition="end"
            />
            <CheckboxGroupItem value="basic2" label="基础" />
          </CheckboxGroup>
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
## CheckboxGroup Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| children | 子组件（CheckboxGroupItem） | \`React.ReactNode\` | - | 是 |
| defaultValue | 默认选中的值数组 | \`string[]\` | \`[]\` | 否 |
| value | 当前选中的值数组（受控模式） | \`string[]\` | - | 否 |
| onValueChange | 值改变时的回调函数 | \`(value: string[]) => void\` | - | 否 |
| variant | 组件变体 | \`'default' \\| 'card' \\| 'list' \\| 'button'\` | \`'default'\` | 否 |
| iconType | 图标类型 | \`'default' \\| 'checked'\` | \`'default'\` | 否 |
| iconPosition | 图标位置 | \`'start' \\| 'end'\` | \`'start'\` | 否 |
| theme | 主题模式 | \`'mobile' \\| 'pc'\` | \`'mobile'\` | 否 |
| className | 自定义类名 | \`string\` | - | 否 |

## CheckboxGroupItem Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| value | 选项的值 | \`string\` | - | 是 |
| label | 选项标签文本 | \`string\` | - | 否 |
| description | 描述文本（卡片模式可用） | \`string\` | - | 否 |
| icon | 图标元素（卡片模式可用） | \`React.ReactNode\` | - | 否 |
| customContent | 自定义插槽内容（默认和列表模式可用） | \`React.ReactNode\` | - | 否 |
| buttonSlot | 按钮模式插槽内容（按钮模式可用） | \`React.ReactNode\` | - | 否 |
| buttonSlotPosition | 按钮模式插槽位置（按钮模式可用） | \`'start' \\| 'end'\` | \`'start'\` | 否 |
| disabled | 是否禁用该选项 | \`boolean\` | \`false\` | 否 |
| className | 自定义类名 | \`string\` | - | 否 |
| children | 自定义内容（覆盖默认渲染） | \`React.ReactNode\` | - | 否 |

## 变体说明

### default
基础的多选框样式，适用于简单的选项列表。

### card  
卡片样式，每个选项显示为独立的卡片，支持图标和描述文本。

### list
列表样式，选项紧密排列形成列表，支持自定义插槽内容，适合多个方案选择场景。

### button
按钮样式，每个选项显示为按钮，支持插槽内容和图标位置设置，适合网格布局的选项展示。

## 与 RadioGroup 的区别

CheckboxGroup 允许选择多个选项，而 RadioGroup 只能选择一个选项。两者在 API 设计上保持一致，主要区别：

- **选择逻辑**: CheckboxGroup 支持多选，RadioGroup 单选
- **值类型**: CheckboxGroup 使用 \`string[]\` 数组，RadioGroup 使用 \`string\`
- **图标**: CheckboxGroup 使用方形选择框，RadioGroup 使用圆形选择器

## 继承属性

CheckboxGroup 和 CheckboxGroupItem 组件基于原生 HTML 构建，继承了标准的 HTML 属性，包括但不限于：

- **aria-*** 无障碍访问属性
- **data-*** 数据属性  
- **id** 元素标识符
- **name** 表单字段名称

更多详细信息请参考 [MDN Checkbox 文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)。
`,
      },
    },
  },
  render: () => <div></div>,
}; 