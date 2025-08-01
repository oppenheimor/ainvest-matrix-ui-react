/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useMemo } from "react";
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
  DropdownMenuLabel,
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
  ChevronDownIcon,
} from "lucide-react";
import { Input } from "../../input";

const meta: Meta<typeof DropdownMenu> = {
  title: "Interaction/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
DropdownMenu 下拉菜单是一个浮层组件，用于展示一系列可选操作或信息。它由触发器和菜单内容组成，支持点击或悬浮触发，提供丰富的交互功能。

## 组件特性
### 触发方式
- **click**（默认）：点击触发器打开/关闭菜单
- **hover**：鼠标悬浮触发器打开菜单，离开区域关闭菜单

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

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>悬浮打开菜单</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>操作 1</DropdownMenuItem>
    <DropdownMenuItem>操作 2</DropdownMenuItem>
    <DropdownMenuItem>操作 3</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    trigger: {
      control: { type: "select" },
      options: ["click", "hover"],
      description: "菜单触发方式",
      table: {
        type: { summary: '"click" | "hover"' },
        defaultValue: { summary: '"click"' },
      },
    },
    open: {
      control: "boolean",
      description: "控制菜单的打开状态（仅在 click 模式下有效）",
      table: { type: { summary: "boolean" } },
    },
    defaultOpen: {
      control: "boolean",
      description: "菜单的默认打开状态",
      table: { type: { summary: "boolean" } },
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "菜单状态变化时的回调函数（仅在 click 模式下有效）",
      table: { type: { summary: "(open: boolean) => void" } },
    },
    modal: {
      control: "boolean",
      description: "是否为模态框模式（hover 模式下自动设为 false）",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    dir: {
      control: { type: "select" },
      options: ["ltr", "rtl"],
      description: "文本方向",
      table: {
        type: { summary: '"ltr" | "rtl"' },
        defaultValue: { summary: '"ltr"' },
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HoverTrigger: Story = {
  name: "Hover 触发",
  render: () => {
    return (
      <div className="flex gap-4">
        <DropdownMenu trigger="hover">
          <DropdownMenuTrigger>
            <Button variant="outline">Hover Me</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex gap-1 justify-start items-center">
              <User2Icon className="w-4 h-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-1 justify-start items-center">
              <BoltIcon className="w-4 h-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-1 justify-start items-center">
              <LogOutIcon className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu trigger="click">
          <DropdownMenuTrigger>
            <Button variant="outline">Click Me</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex gap-1 justify-start items-center">
              <User2Icon className="w-4 h-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-1 justify-start items-center">
              <BoltIcon className="w-4 h-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-1 justify-start items-center">
              <LogOutIcon className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "展示 hover 触发和 click 触发两种模式的对比。hover 模式下鼠标悬浮即可打开菜单，鼠标离开整个区域时关闭。",
      },
    },
  },
};

export const GroupedSingleSelection: Story = {
  name: "分组单选（国家选择器）",
  render: () => {
    // 国家数据按首字母分组
    const countries = [
      { value: "australia", label: "Australia", group: "A" },
      { value: "argentina", label: "Argentina", group: "A" },
      { value: "algeria", label: "Algeria", group: "A" },
      { value: "austria", label: "Austria", group: "A" },
      { value: "brazil", label: "Brazil", group: "B" },
      { value: "belgium", label: "Belgium", group: "B" },
      { value: "bulgaria", label: "Bulgaria", group: "B" },
      { value: "belarus", label: "Belarus", group: "B" },
      { value: "canada", label: "Canada", group: "C" },
      { value: "china", label: "China", group: "C" },
      { value: "chile", label: "Chile", group: "C" },
    ];

    // 按首字母分组
    const groupedCountries = countries.reduce((acc, country) => {
      if (!acc[country.group]) {
        acc[country.group] = [];
      }
      acc[country.group].push(country);
      return acc;
    }, {} as Record<string, typeof countries>);

    const [selectedCountry, setSelectedCountry] = useState("australia");

    // 语义化函数：根据选中值获取国家标签
    const getSelectedCountryLabel = (selectedValue: string) => {
      return (
        countries.find((country) => country.value === selectedValue)?.label ||
        ""
      );
    };

    // 使用 useMemo 缓存当前选中的国家标签，避免重复计算
    const selectedCountryLabel = useMemo(() => {
      return getSelectedCountryLabel(selectedCountry);
    }, [selectedCountry]);

    return (
      <DropdownMenu trigger="click">
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {/* 展示 label 而不是 value */}
            {selectedCountryLabel}
            <ChevronDownIcon
              className="opacity-60 -me-1"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[250px]">
          {/* 使用 sticky 定位固定搜索框，调整 top 值以抵消容器的内边距 */}
          <div className="sticky -top-[12px] z-10 p-1 bg-background-layer4">
            <Input
              onKeyDown={(e) => {
                // 阻止键盘事件冒泡到 DropdownMenuRadioGroup，防止输入框失焦
                e.stopPropagation();
              }}
            />
          </div>
          
          {/* 菜单内容，保持原有的滚动行为 */}
          <DropdownMenuRadioGroup
            value={selectedCountry}
            onValueChange={setSelectedCountry}
          >
            {Object.entries(groupedCountries).map(
              ([group, countries], index, entries) => (
                <div key={group}>
                  <DropdownMenuLabel>{group}</DropdownMenuLabel>
                  {countries.map((country) => (
                    <DropdownMenuRadioItem
                      key={country.value}
                      value={country.value}
                      className="text-base"
                    >
                      {country.label}
                    </DropdownMenuRadioItem>
                  ))}
                  {/* 最后一个分组不显示分割线 */}
                  {index < entries.length - 1 && <DropdownMenuSeparator />}
                </div>
              )
            )}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "这是一个分组单选示例，模拟国家选择器场景。选项按首字母分组，但保持单选的整体性。",
      },
    },
  },
};

export const PersonalCenter: Story = {
  name: "个人中心",
  parameters: {
    docs: {
      description: {
        story:
          "个人中心下拉菜单示例，展示了完整的菜单结构，包括自定义内容、基础菜单项、多级菜单、单选组和分割线的综合使用。",
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
      <DropdownMenu trigger="hover">
        <DropdownMenuTrigger>
          <Button>Sign In</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
                <span className="text-sm text-text-secondary">
                  {languages.find((lang) => lang.value === language)?.label ||
                    ""}
                </span>
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
| trigger | 触发方式 | \`hover\` | \`hover\` / \`click\` | 否 |

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

## Changelog

### 0.0.5

- 修改 DropdownMenu 的样式，添加阴影效果

### 0.0.4
- 修复 hover 模式下 onOpenChange 属性不生效的问题

### 0.0.3

- 修复 hover 模式下点击触发器会关闭菜单的问题
- 移除悬浮在菜单项上出现的蓝色 outline 边框样式

### 0.0.2
- \`DropdownMenu\` 新增 \`trigger\` 属性，支持 \`hover\` 和 \`click\` 两种触发方式，默认为 \`hover\`

### 0.0.1
- 初始版本
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
