/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
} from "./index";
import { Button } from "../../button";
import {
  BoltIcon,
  CopyPlusIcon,
  FilesIcon,
  TrashIcon,
  User2Icon,
  ChevronRightIcon,
  LogOutIcon,
} from "lucide-react";

const meta: Meta<typeof DropdownMenu> = {
  title: "Interaction/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
DropdownMenu 下拉菜单是一个浮层组件，用于展示一系列可选操作或信息。它由触发器和菜单内容组成，点击触发器后弹出菜单，提供丰富的交互功能。

## 组件特性
### 组件结构
DropdownMenu 是一个复合组件，由多个子组件组成：
- **DropdownMenu**：根容器，管理菜单的开关状态
- **DropdownMenuTrigger**：触发器，用于打开/关闭菜单
- **DropdownMenuContent**：菜单内容容器，包含所有菜单项
- **DropdownMenuItem**：基础菜单项，用于执行操作
- **DropdownMenuSeparator**：分割线，用于分组菜单项
- **DropdownMenuLabel**：标签，用于菜单项分组标题
- **DropdownMenuSub**：子菜单容器，支持多级菜单
- **DropdownMenuSubTrigger**：子菜单触发器
- **DropdownMenuSubContent**：子菜单内容容器

### 交互功能
- **单选功能**：通过 RadioGroup 和 RadioItem 实现单选列表
- **多选功能**：通过 CheckboxItem 实现多选列表  
- **多级菜单**：支持无限层级的嵌套子菜单
- **键盘导航**：支持方向键、Enter、Esc 等键盘操作
- **自动定位**：智能判断弹出方向，避免超出视窗

## 使用原则
- **操作分组**：使用分割线将相关操作分组，提升可读性
- **层级清晰**：多级菜单层级不宜过深，建议不超过 3 层
- **操作明确**：每个菜单项的功能要明确，避免模糊表达
- **状态反馈**：重要操作应提供视觉反馈或确认机制
- **移动适配**：在移动端考虑触摸友好的交互方式

## 组件安装

\`\`\`bash
npm install @oversea/dropdown-menu
\`\`\`

## 快速开始
\`\`\`tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@oversea/dropdown-menu'

// 基础用法
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>打开菜单</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>操作 1</DropdownMenuItem>
    <DropdownMenuItem>操作 2</DropdownMenuItem>
    <DropdownMenuItem>操作 3</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// 带分割线和子菜单
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>更多操作</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>编辑</DropdownMenuItem>
    <DropdownMenuItem>复制</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>更多</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>导出</DropdownMenuItem>
        <DropdownMenuItem>分享</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem>删除</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
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
  name: "个人中心",
  parameters: {
    docs: {
      description: {
        story: "个人中心下拉菜单示例，展示了完整的菜单结构，包括自定义内容、基础菜单项、多级菜单、单选组和分割线的综合使用。",
      },
    },
  },
  render: () => {
    const languages = [
      { value: "chinese", label: "Chinese(Simplified)" },
      { value: "english", label: "English" },
      { value: "finance", label: "Finance" },
      { value: "grantland", label: "Grantland" },
      { value: "finvesta", label: "Finvesta" },
      { value: "capitallink", label: "CapitalLink" },
      { value: "marketbridge", label: "MarketBridge" },
      { value: "datasync", label: "DataSync" },
      { value: "InnovativeTech", label: "InnovativeTech" },
      { value: "japanese", label: "Japanese" },
      { value: "korean", label: "Korean" },
      { value: "german", label: "German" },
      { value: "spanish", label: "Spanish" },
      { value: "portuguese", label: "Portuguese" },
      { value: "russian", label: "Russian" },
    ];

    const [language, setLanguage] = useState("english");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Sign In</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* 自定义内容（登录区域） */}
          <div className="flex flex-col gap-3 items-center px-4 py-[9px] mb-3">
            <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-full">
              <User2Icon className="w-5 h-5" />
            </div>
            <Button className="w-[246px]" size="lg">
              Sign In
            </Button>
          </div>
          <DropdownMenuItem className="flex items-center gap-[10px]">
            <BoltIcon className="w-5 h-5" />
            <span className="text-base">Subscriptions</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-[10px]">
            <CopyPlusIcon className="w-5 h-5" />
            <span className="text-base">Help Center</span>
          </DropdownMenuItem>
          {/* 多级菜单 */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex justify-between items-center">
              <div className="flex items-center gap-[10px]">
                <FilesIcon className="w-5 h-5" />
                <span className="text-base">Language</span>
              </div>
              <div className="flex gap-1 justify-start items-center">
                <span className="text-sm text-text-secondary">{languages.find(lang => lang.value === language)?.label || ""}</span>
                <ChevronRightIcon className="w-3 h-3" />
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-[278px] overflow-y-auto">
                <DropdownMenuRadioGroup
                  value={language}
                  onValueChange={setLanguage}
                >
                  {languages.map((lang) => (
                    <DropdownMenuRadioItem
                      key={lang.value}
                      value={lang.value}
                      className="text-base"
                    >
                      {lang.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="flex items-center gap-[10px]">
            <TrashIcon className="w-5 h-5" />
            <span className="text-base">API Docs</span>
          </DropdownMenuItem>
          {/* 分割线 */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-[10px]">
            <LogOutIcon className="w-5 h-5" />
            <span className="text-base">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
## 组件 API

### DropdownMenu

根容器组件，管理整个下拉菜单的状态。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| open | 控制菜单是否打开 | \`boolean\` | - | 否 |
| onOpenChange | 菜单开关状态变化回调 | \`(open: boolean) => void\` | - | 否 |
| defaultOpen | 默认是否打开 | \`boolean\` | \`false\` | 否 |
| modal | 是否为模态模式 | \`boolean\` | \`true\` | 否 |

### DropdownMenuTrigger

触发器组件，用于打开/关闭菜单。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| asChild | 作为子组件渲染 | \`boolean\` | \`false\` | 否 |
| children | 触发器内容 | \`React.ReactNode\` | - | 是 |

### DropdownMenuContent

菜单内容容器，包含所有菜单项。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| align | 对齐方式 | \`'start'\` \\| \`'center'\` \\| \`'end'\` | \`'center'\` | 否 |
| side | 弹出方向 | \`'top'\` \\| \`'right'\` \\| \`'bottom'\` \\| \`'left'\` | \`'bottom'\` | 否 |
| sideOffset | 距离触发器的偏移量 | \`number\` | \`8\` | 否 |
| alignOffset | 对齐偏移量 | \`number\` | \`0\` | 否 |
| avoidCollisions | 是否避免碰撞 | \`boolean\` | \`true\` | 否 |
| className | 自定义 CSS 类名 | \`string\` | - | 否 |

### DropdownMenuItem

基础菜单项组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| disabled | 是否禁用 | \`boolean\` | \`false\` | 否 |
| onSelect | 选择时的回调函数 | \`(event: Event) => void\` | - | 否 |
| textValue | 用于搜索的文本值 | \`string\` | - | 否 |
| variant | 菜单项变体 | \`'default'\` \\| \`'destructive'\` | \`'default'\` | 否 |
| inset | 是否内缩 | \`boolean\` | \`false\` | 否 |
| className | 自定义 CSS 类名 | \`string\` | - | 否 |

### DropdownMenuSeparator

分割线组件，用于分组菜单项。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| className | 自定义 CSS 类名 | \`string\` | - | 否 |

### DropdownMenuLabel

标签组件，用于菜单项分组标题。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| className | 自定义 CSS 类名 | \`string\` | - | 否 |
| children | 标签内容 | \`React.ReactNode\` | - | 是 |

### DropdownMenuCheckboxItem

多选菜单项组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| checked | 是否选中 | \`boolean \\| 'indeterminate'\` | \`false\` | 否 |
| onCheckedChange | 选中状态变化回调 | \`(checked: boolean) => void\` | - | 否 |
| disabled | 是否禁用 | \`boolean\` | \`false\` | 否 |
| className | 自定义 CSS 类名 | \`string\` | - | 否 |

### DropdownMenuRadioGroup

单选组容器组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| value | 当前选中的值 | \`string\` | - | 否 |
| onValueChange | 值变化回调 | \`(value: string) => void\` | - | 否 |

### DropdownMenuRadioItem

单选菜单项组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| value | 选项值 | \`string\` | - | 是 |
| disabled | 是否禁用 | \`boolean\` | \`false\` | 否 |
| className | 自定义 CSS 类名 | \`string\` | - | 否 |

### DropdownMenuSub

子菜单容器组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| open | 控制子菜单是否打开 | \`boolean\` | - | 否 |
| onOpenChange | 子菜单开关状态变化回调 | \`(open: boolean) => void\` | - | 否 |
| defaultOpen | 默认是否打开 | \`boolean\` | \`false\` | 否 |

### DropdownMenuSubTrigger

子菜单触发器组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| disabled | 是否禁用 | \`boolean\` | \`false\` | 否 |
| className | 自定义 CSS 类名 | \`string\` | - | 否 |

### DropdownMenuSubContent

子菜单内容容器组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| className | 自定义 CSS 类名 | \`string\` | - | 否 |
| sideOffset | 距离父菜单的偏移量 | \`number\` | \`8\` | 否 |

### DropdownMenuShortcut

快捷键显示组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| className | 自定义 CSS 类名 | \`string\` | - | 否 |
| children | 快捷键内容 | \`React.ReactNode\` | - | 是 |

### DropdownMenuPortal

传送门组件，用于将内容渲染到指定容器。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| container | 目标容器 | \`HTMLElement\` | \`document.body\` | 否 |

## 最佳实践

1. **组件组合**：合理使用各种子组件来构建复杂的菜单结构
2. **状态管理**：对于复杂场景，建议使用受控模式管理菜单状态
3. **键盘导航**：确保菜单支持完整的键盘导航功能
4. **无障碍性**：为菜单项提供适当的 aria 标签和角色定义
5. **性能优化**：对于大量菜单项，考虑使用虚拟滚动或分页
6. **移动端适配**：在移动设备上考虑触摸友好的交互方式

## 键盘导航

- **Tab**: 在菜单外时聚焦到触发器
- **Enter/Space**: 打开菜单或选择菜单项
- **ArrowDown**: 向下导航到下一个菜单项
- **ArrowUp**: 向上导航到上一个菜单项
- **ArrowRight**: 进入子菜单
- **ArrowLeft**: 退出子菜单
- **Esc**: 关闭菜单
- **Home**: 导航到第一个菜单项
- **End**: 导航到最后一个菜单项
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
