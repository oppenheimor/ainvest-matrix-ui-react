# TextCollapse 文字折叠组件

一个用于在有限空间内展示大量文本内容的 React 组件，支持折叠/展开功能。

## 功能特点

- 🎯 **智能折叠**: 自动检测文本是否超过指定行数，只在需要时显示折叠功能
- 🔍 **精确截断**: 使用二分查找算法精确计算最佳截断位置
- 📱 **响应式**: 自动监听容器尺寸变化，重新计算折叠状态
- 🎨 **自定义按钮**: 可自定义展开/收起按钮的文本和样式
- ⚡ **组件宽度**: 不预设组件宽度，需要通过 className 属性传入

## 安装

```bash
npm install @oversea/text-collapse
```

## 基础用法

```tsx
import { TextCollapse } from "@oversea/text-collapse";

function App() {
  return (
    <TextCollapse
      text="这是一段很长的文本内容，当超过3行时会自动折叠..."
      expandLabel="展开"
      collapseLabel="收起"
    />
  );
}
```

## API 参数

| 属性            | 说明                     | 类型                        | 默认值 | 必填 |
| --------------- | ------------------------ | --------------------------- | ------ | ---- |
| text            | 要显示的文本内容         | string                      | -      | 是   |
| rows            | 折叠状态下显示的最大行数 | number                      | 3      | 否   |
| expandLabel     | 展开按钮文本             | React.ReactNode             | -      | 是   |
| collapseLabel   | 收起按钮文本             | React.ReactNode             | -      | 否   |
| defaultExpanded | 是否默认展开             | boolean                     | false  | 否   |
| onExpandChange  | 展开/收起状态变化回调    | (expanded: boolean) => void | -      | 否   |

## 使用示例

### 基础用法

```tsx
<TextCollapse
  text="这是一段很长的文本内容，当超过3行时会自动折叠..."
  expandLabel="展开"
  collapseLabel="收起"
/>
```

### 默认展开

```tsx
<TextCollapse
  text="文本内容..."
  defaultExpanded
  expandLabel="展开"
  collapseLabel="收起"
/>
```

### 展开后无法收起

```tsx
<TextCollapse text="文本内容..." expandLabel="查看完整内容" />
```

### 自定义按钮样式

```tsx
<TextCollapse
  text="文本内容..."
  expandLabel={<span className="text-blue-500 font-bold">查看更多</span>}
  collapseLabel={<span className="text-gray-500">收起</span>}
/>
```

## 注意事项

- **text 属性**: 仅支持 string 类型，必须传入字符串，不支持传入组件
- **expandLabel**: 必填属性，用于显示展开按钮的文本或组件
- **collapseLabel**: 可选属性，如果不传入则展开后无法再次收起
- **rows**: 控制折叠时显示的行数，默认为 3 行
- **响应式**: 组件会自动监听容器尺寸变化，当容器宽度改变时会重新计算折叠状态
- **性能优化**: 使用二分查找算法精确计算最佳截断位置，确保文本截断的准确性
- 当文本内容不超过设定的最大行数时，不会显示展开/收起按钮
- 组件会自动检测内容高度，初次渲染时可能有短暂的测量过程
- 建议为组件容器设置固定宽度以获得更好的展示效果
