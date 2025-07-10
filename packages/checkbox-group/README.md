# CheckboxGroup 多选框组件

基于原生 HTML checkbox 的可访问性多选框组件，支持多种样式变体和主题模式。

## 功能特性

- ✅ 支持多选
- 🎨 四种样式变体（default、card、list、button）
- 🔧 可配置的图标类型和位置
- 🎯 主题模式支持（mobile/pc）
- 🧩 灵活的插槽系统
- ♿ 完全可访问性支持
- 🎯 TypeScript 支持
- 🎪 受控和非受控模式

## 安装

```bash
npm install @oversea/checkbox-group
# 或
yarn add @oversea/checkbox-group
# 或
pnpm add @oversea/checkbox-group
```

## 基础用法

```tsx
import { CheckboxGroup, CheckboxGroupItem } from '@oversea/checkbox-group'

function App() {
  const [selectedValues, setSelectedValues] = useState<string[]>(['option1'])

  return (
    <CheckboxGroup value={selectedValues} onValueChange={setSelectedValues}>
      <CheckboxGroupItem value="option1" label="选项 1" />
      <CheckboxGroupItem value="option2" label="选项 2" />
      <CheckboxGroupItem value="option3" label="选项 3" />
    </CheckboxGroup>
  )
}
```

## 样式变体

### 默认样式

```tsx
<CheckboxGroup variant="default" defaultValue={['option1']}>
  <CheckboxGroupItem value="option1" label="选项 1" />
  <CheckboxGroupItem
    value="option2"
    label="选项 2"
    customContent={<span className="text-blue-600">推荐</span>}
  />
</CheckboxGroup>
```

### 卡片样式

```tsx
<CheckboxGroup variant="card" defaultValue={['basic']}>
  <CheckboxGroupItem
    value="basic"
    label="基础版"
    description="适合个人使用的基础功能"
    icon={<IconComponent />}
  />
  <CheckboxGroupItem
    value="premium"
    label="高级版"
    description="适合团队协作的高级功能"
    icon={<IconComponent />}
  />
</CheckboxGroup>
```

### 列表样式

```tsx
<CheckboxGroup variant="list" defaultValue={['monthly']}>
  <CheckboxGroupItem
    value="monthly"
    label="月付套餐"
    customContent={<span className="text-green-600">¥99/月</span>}
  />
  <CheckboxGroupItem
    value="yearly"
    label="年付套餐"
    customContent={<span className="text-blue-600">¥999/年</span>}
  />
</CheckboxGroup>
```

### 按钮样式

```tsx
<CheckboxGroup variant="button" defaultValue={['medium']}>
  <CheckboxGroupItem value="small" label="S" />
  <CheckboxGroupItem
    value="star"
    label="收藏"
    buttonSlot={<StarIcon />}
    buttonSlotPosition="start"
  />
  <CheckboxGroupItem value="large" label="L" />
</CheckboxGroup>
```

## 主题模式

```tsx
// 移动端主题（默认）
<CheckboxGroup theme="mobile" variant="list">
  <CheckboxGroupItem value="option1" label="移动端选项" />
</CheckboxGroup>

// PC端主题 - 无下边框，14px字体
<CheckboxGroup theme="pc" variant="list">
  <CheckboxGroupItem value="option1" label="PC端选项" />
</CheckboxGroup>
```

## API 参考

### CheckboxGroup

| 属性            | 类型                                        | 默认值      | 描述                           |
| --------------- | ------------------------------------------- | ----------- | ------------------------------ |
| `value`         | `string[]`                                  | -           | 当前选中的值数组（受控模式）   |
| `defaultValue`  | `string[]`                                  | `[]`        | 默认选中的值数组（非受控模式） |
| `onValueChange` | `(value: string[]) => void`                 | -           | 值变化回调函数                 |
| `variant`       | `'default' \| 'card' \| 'list' \| 'button'` | `'default'` | 组件样式变体                   |
| `iconType`      | `'default' \| 'checked'`                    | `'default'` | 图标类型                       |
| `iconPosition`  | `'start' \| 'end'`                          | `'start'`   | 图标位置                       |
| `theme`         | `'mobile' \| 'pc'`                          | `'mobile'`  | 主题模式                       |
| `className`     | `string`                                    | -           | 自定义 CSS 类名                |
| `children`      | `ReactNode`                                 | -           | 子组件                         |

### CheckboxGroupItem

| 属性                 | 类型               | 默认值    | 描述                             |
| -------------------- | ------------------ | --------- | -------------------------------- |
| `value`              | `string`           | -         | 选项的值（必需）                 |
| `label`              | `string`           | -         | 选项标签文本                     |
| `description`        | `string`           | -         | 描述文本（卡片模式可用）         |
| `icon`               | `ReactNode`        | -         | 图标元素（卡片模式可用）         |
| `customContent`      | `ReactNode`        | -         | 自定义插槽内容（默认和列表模式） |
| `buttonSlot`         | `ReactNode`        | -         | 按钮模式插槽内容                 |
| `buttonSlotPosition` | `'start' \| 'end'` | `'start'` | 按钮模式插槽位置                 |
| `disabled`           | `boolean`          | `false`   | 是否禁用                         |
| `className`          | `string`           | -         | 自定义 CSS 类名                  |
| `children`           | `ReactNode`        | -         | 子组件                           |

## 插槽系统

### customContent 插槽

在默认模式和列表模式中，可以在标签右侧显示自定义内容：

```tsx
<CheckboxGroup>
  <CheckboxGroupItem
    value="pro"
    label="专业版"
    customContent={
      <div className="flex items-center gap-2">
        <span className="text-blue-600">$29/月</span>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
          热门
        </span>
      </div>
    }
  />
</CheckboxGroup>
```

### buttonSlot 插槽

在按钮模式中，可以添加图标或其他内容：

```tsx
<CheckboxGroup variant="button">
  <CheckboxGroupItem
    value="star"
    label="收藏"
    buttonSlot={<StarIcon />}
    buttonSlotPosition="start"
  />
</CheckboxGroup>
```

## 多选示例

```tsx
function MultiSelectExample() {
  const [selected, setSelected] = useState<string[]>(['feature1', 'feature3'])

  return (
    <div>
      <CheckboxGroup
        value={selected}
        onValueChange={setSelected}
        variant="card"
      >
        <CheckboxGroupItem
          value="feature1"
          label="功能 A"
          description="基础数据分析功能"
        />
        <CheckboxGroupItem
          value="feature2"
          label="功能 B"
          description="高级报表生成功能"
        />
        <CheckboxGroupItem
          value="feature3"
          label="功能 C"
          description="自动化工作流功能"
        />
      </CheckboxGroup>

      <div className="mt-4">
        已选择：{selected.length > 0 ? selected.join(', ') : '无'}
      </div>

      <button
        onClick={() => setSelected([])}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        清空选择
      </button>
    </div>
  )
}
```

## 与 RadioGroup 的区别

CheckboxGroup 允许选择多个选项，而 RadioGroup 只能选择一个选项。两者在 API 设计上保持一致：

- **选择逻辑**: CheckboxGroup 支持多选，RadioGroup 单选
- **值类型**: CheckboxGroup 使用 `string[]` 数组，RadioGroup 使用 `string`
- **图标**: CheckboxGroup 使用方形选择框，RadioGroup 使用圆形选择器
- **API**: 两者的属性和插槽系统完全一致

## 可访问性

- 支持键盘导航
- 支持屏幕阅读器
- 遵循 WAI-ARIA 标准
- 支持 `aria-describedby` 属性
- 基于原生 HTML checkbox 元素

## 开发

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 发布
npm run build
```

## 许可证

ISC
