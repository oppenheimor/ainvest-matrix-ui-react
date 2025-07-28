# `@oversea/dropdown-menu`

## 组件简介

DropdownMenu 下拉菜单是一个浮层组件，用于展示一系列可选操作或信息。它由触发器和菜单内容组成，支持点击或悬浮触发，提供丰富的交互功能。

## 主要功能

- 支持 click 和 hover 两种触发方式
- 支持基础菜单项、分组菜单项
- 支持单选和多选功能
- 支持多级嵌套子菜单
- 支持键盘导航
- 支持自动定位，避免超出视窗

## 技术栈要求

- React 18+
- TypeScript 4.5+
- Tailwind CSS(样式依赖)
- @radix-ui/react-dropdown-menu(核心依赖)
- lucide-react(图标依赖)

## 典型使用场景

- 用户个人中心菜单
- 操作选项菜单
- 语言/主题切换器
- 分组单选场景(如国家选择器)

## 属性说明

### DropdownMenu

根容器组件，管理整个下拉菜单的状态。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| open | 控制菜单是否打开 | `boolean` | - | 否 |
| onOpenChange | 菜单开关状态变化回调 | `(open: boolean) => void` | - | 否 |
| defaultOpen | 默认是否打开 | `boolean` | `false` | 否 |
| modal | 是否为模态模式 | `boolean` | `true` | 否 |
| trigger | 触发方式 | `hover` | `hover` / `click` | 否 |

### DropdownMenuTrigger

触发器组件，用于打开/关闭菜单。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| asChild | 作为子组件渲染 | `boolean` | `false` | 否 |

### DropdownMenuContent

菜单内容容器，包含所有菜单项。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| align | 对齐方式 | `'start'` \| `'center'` \| `'end'` | `'center'` | 否 |
| side | 弹出方向 | `'top'` \| `'right'` \| `'bottom'` \| `'left'` | `'bottom'` | 否 |
| sideOffset | 距离触发器的偏移量 | `number` | `8` | 否 |
| alignOffset | 对齐偏移量 | `number` | `0` | 否 |
| avoidCollisions | 是否避免碰撞 | `boolean` | `true` | 否 |
| className | 自定义 CSS 类名 | `string` | - | 否 |

### DropdownMenuItem

基础菜单项组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| onSelect | 选择时的回调函数 | `(event: Event) => void` | - | 否 |
| textValue | 用于搜索的文本值 | `string` | - | 否 |
| variant | 菜单项变体 | `'default'` \| `'destructive'` | `'default'` | 否 |
| inset | 是否内缩 | `boolean` | `false` | 否 |
| className | 自定义 CSS 类名 | `string` | - | 否 |

### DropdownMenuSeparator

分割线组件，用于分组菜单项。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| className | 自定义 CSS 类名 | `string` | - | 否 |

### DropdownMenuLabel

标签组件，用于菜单项分组标题。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| className | 自定义 CSS 类名 | `string` | - | 否 |

### DropdownMenuCheckboxItem

多选菜单项组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| checked | 是否选中 | `boolean \| 'indeterminate'` | `false` | 否 |
| onCheckedChange | 选中状态变化回调 | `(checked: boolean) => void` | - | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| className | 自定义 CSS 类名 | `string` | - | 否 |

### DropdownMenuRadioGroup

单选组容器组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| value | 当前选中的值 | `string` | - | 否 |
| onValueChange | 值变化回调 | `(value: string) => void` | - | 否 |

### DropdownMenuRadioItem

单选菜单项组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| value | 选项值 | `string` | - | 是 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| className | 自定义 CSS 类名 | `string` | - | 否 |

### DropdownMenuSub

子菜单容器组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| open | 控制子菜单是否打开 | `boolean` | - | 否 |
| onOpenChange | 子菜单开关状态变化回调 | `(open: boolean) => void` | - | 否 |
| defaultOpen | 默认是否打开 | `boolean` | `false` | 否 |

### DropdownMenuSubTrigger

子菜单触发器组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| className | 自定义 CSS 类名 | `string` | - | 否 |

### DropdownMenuSubContent

子菜单内容容器组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| className | 自定义 CSS 类名 | `string` | - | 否 |
| sideOffset | 距离父菜单的偏移量 | `number` | `8` | 否 |

## 使用示例

### 基础用法

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@oversea/dropdown-menu'
import { Button } from '@oversea/button'

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
```

### 分组单选用法（国家选择器场景）

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@oversea/dropdown-menu'
import { Button } from '@oversea/button'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

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

// 创建映射以便快速查找国家标签
const countryMap = countries.reduce((map, country) => {
  map[country.value] = country.label;
  return map;
}, {} as Record<string, string>);

export function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState("australia");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {countryMap[selectedCountry] || "Select Country"}
          <ChevronDownIcon
            className="opacity-60 -me-1"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        {/* 使用一个统一的 RadioGroup 包裹所有分组 */}
        <DropdownMenuRadioGroup value={selectedCountry} onValueChange={setSelectedCountry}>
          {Object.entries(groupedCountries).map(([group, countries]) => (
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
              <DropdownMenuSeparator />
            </div>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### 悬浮触发模式

```tsx
<DropdownMenu trigger="hover">
  <DropdownMenuTrigger>
    <Button variant="outline">悬浮打开</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>操作 1</DropdownMenuItem>
    <DropdownMenuItem>操作 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```