# RadioGroup 单选框组件

基于 Radix UI 的单选框组件，支持多种变体和数据显示功能。

## 特性

- 🎯 **多种变体**: 支持默认、卡片、紧凑三种视觉样式
- 📊 **数据展示**: 支持百分比、货币、数字等数据格式显示
- 🎨 **灵活尺寸**: 提供 sm、md、lg 三种尺寸选择
- 🔄 **布局选项**: 支持水平和垂直两种布局方向
- ♿ **无障碍访问**: 完整的 ARIA 属性和键盘导航支持
- ⌨️ **键盘导航**: 支持方向键、空格键、Tab 键等完整键盘操作
- 🎭 **状态管理**: 支持 hover、focus、disabled 等交互状态
- 🎨 **主题定制**: 基于 Tailwind CSS，易于定制样式
- 📦 **TypeScript**: 完整的类型定义支持
- 🧩 **组合灵活**: 支持受控和非受控两种使用模式

## 安装

```bash
npm install @oversea/radio-group
```

## 基础用法

```tsx
import { RadioGroup, RadioGroupItem } from '@oversea/radio-group'

function BasicExample() {
  return (
    <RadioGroup defaultValue="option1">
      <RadioGroupItem value="option1" label="选项 1" />
      <RadioGroupItem value="option2" label="选项 2" />
      <RadioGroupItem value="option3" label="选项 3" />
    </RadioGroup>
  )
}
```

## 数据显示

支持在标签后显示数据值，特别适用于展示百分比、价格等信息：

```tsx
import { RadioGroup, RadioGroupItem } from '@oversea/radio-group'

function DataExample() {
  return (
    <RadioGroup defaultValue="growth">
      <RadioGroupItem
        value="growth"
        label="增长股票"
        dataValue={4.35}
        dataType="percentage"
        dataStatus="positive"
      />
      <RadioGroupItem
        value="stable"
        label="稳定股票"
        dataValue={1.25}
        dataType="percentage"
        dataStatus="positive"
      />
      <RadioGroupItem
        value="decline"
        label="下跌股票"
        dataValue={-2.15}
        dataType="percentage"
        dataStatus="negative"
      />
    </RadioGroup>
  )
}
```

## 变体样式

### 卡片变体

```tsx
<RadioGroup variant="card" defaultValue="basic">
  <RadioGroupItem
    value="basic"
    label="基础套餐"
    description="适合个人用户使用"
  />
  <RadioGroupItem
    value="premium"
    label="高级套餐"
    description="适合团队协作使用"
  />
</RadioGroup>
```

### 水平布局

```tsx
<RadioGroup orientation="horizontal" defaultValue="medium">
  <RadioGroupItem value="small" label="小" />
  <RadioGroupItem value="medium" label="中" />
  <RadioGroupItem value="large" label="大" />
</RadioGroup>
```

### 不同尺寸

```tsx
{
  /* 小尺寸 */
}
;<RadioGroup size="sm">
  <RadioGroupItem value="small" label="小尺寸选项" />
</RadioGroup>

{
  /* 中尺寸（默认） */
}
;<RadioGroup size="md">
  <RadioGroupItem value="medium" label="中尺寸选项" />
</RadioGroup>

{
  /* 大尺寸 */
}
;<RadioGroup size="lg">
  <RadioGroupItem value="large" label="大尺寸选项" />
</RadioGroup>
```

## 受控模式

```tsx
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@oversea/radio-group'

function ControlledExample() {
  const [value, setValue] = useState('option1')

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <RadioGroupItem value="option1" label="选项 1" />
      <RadioGroupItem value="option2" label="选项 2" />
      <RadioGroupItem value="option3" label="选项 3" />
    </RadioGroup>
  )
}
```

## API 参考

### RadioGroup

| 属性          | 类型                               | 默认值       | 描述                     |
| ------------- | ---------------------------------- | ------------ | ------------------------ |
| variant       | `'default' \| 'card' \| 'compact'` | `'default'`  | 组件变体样式             |
| size          | `'sm' \| 'md' \| 'lg'`             | `'md'`       | 组件尺寸                 |
| orientation   | `'horizontal' \| 'vertical'`       | `'vertical'` | 布局方向                 |
| value         | `string`                           | -            | 受控模式下的选中值       |
| defaultValue  | `string`                           | -            | 非受控模式下的默认选中值 |
| onValueChange | `(value: string) => void`          | -            | 值改变时的回调函数       |
| disabled      | `boolean`                          | `false`      | 是否禁用整个组件         |
| required      | `boolean`                          | `false`      | 是否为必填项             |
| name          | `string`                           | -            | 表单字段名称             |
| className     | `string`                           | -            | 自定义 CSS 类名          |

### RadioGroupItem

| 属性        | 类型                                               | 默认值      | 描述                         |
| ----------- | -------------------------------------------------- | ----------- | ---------------------------- |
| value       | `string`                                           | -           | 选项的值（必填）             |
| label       | `string`                                           | -           | 选项标签文本                 |
| description | `string`                                           | -           | 选项描述文本                 |
| dataValue   | `string \| number`                                 | -           | 要显示的数据值               |
| dataType    | `'percentage' \| 'currency' \| 'number' \| 'text'` | `'text'`    | 数据类型                     |
| dataStatus  | `'positive' \| 'negative' \| 'neutral'`            | `'neutral'` | 数据状态（影响颜色）         |
| disabled    | `boolean`                                          | `false`     | 是否禁用此选项               |
| className   | `string`                                           | -           | 自定义 CSS 类名              |
| children    | `React.ReactNode`                                  | -           | 自定义子组件（覆盖默认渲染） |

## 数据格式化

组件提供了强大的数据格式化功能：

### 百分比格式

```tsx
<RadioGroupItem
  value="growth"
  label="增长率"
  dataValue={4.35}
  dataType="percentage" // 显示为 "+4.35%"
/>
```

### 货币格式

```tsx
<RadioGroupItem
  value="price"
  label="价格"
  dataValue={199}
  dataType="currency" // 显示为 "¥199.00"
/>
```

### 自动状态判断

当提供数据值时，组件会自动根据数值正负判断状态：

- 正数：绿色（positive）
- 负数：红色（negative）
- 零或非数字：灰色（neutral）

## 无障碍访问

本组件完全遵循 WAI-ARIA 规范：

- ✅ 支持屏幕阅读器
- ✅ 完整的键盘导航
- ✅ 正确的焦点管理
- ✅ 语义化的 HTML 结构

### 键盘快捷键

| 按键          | 功能                   |
| ------------- | ---------------------- |
| `Tab`         | 移动到下一个可聚焦元素 |
| `Shift + Tab` | 移动到上一个可聚焦元素 |
| `↑` `↓`       | 在垂直布局中切换选项   |
| `←` `→`       | 在水平布局中切换选项   |
| `Space`       | 选中当前聚焦的选项     |

## 样式定制

组件基于 Tailwind CSS 构建，支持通过 CSS 变量和类名进行定制：

```css
/* 自定义主色调 */
.custom-radio-group {
  --color-primary: #your-color;
}

/* 自定义边框样式 */
.custom-radio-group [data-state='checked'] {
  @apply border-custom-color bg-custom-color;
}
```

## 类型定义

```typescript
// 导出的主要类型
export type DataType = 'percentage' | 'currency' | 'number' | 'text'
export type DataStatus = 'positive' | 'negative' | 'neutral'
export type Size = 'sm' | 'md' | 'lg'
export type Variant = 'default' | 'card' | 'compact'
export type Orientation = 'horizontal' | 'vertical'
```

## 更新日志

### v0.0.0 (2025-06-20)

- 🎉 首次发布
- ✨ 支持基础单选框功能
- ✨ 支持数据值显示
- ✨ 支持多种变体和尺寸
- ✨ 完整的无障碍访问支持
- ✨ TypeScript 类型定义
- 📚 完整的文档和示例

## 许可证

ISC

## 贡献

欢迎提交 Issue 和 Pull Request！

## 相关链接

- [Radix UI Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group)
- [Tailwind CSS](https://tailwindcss.com/)
- [class-variance-authority](https://github.com/joe-bell/cva)
