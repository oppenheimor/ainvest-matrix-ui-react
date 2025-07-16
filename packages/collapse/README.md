# Collapse 折叠组件

一个统一的折叠组件，包含 Panel（面板）和 List（列表）两种使用方式。

## 特性

- 🎯 **统一 API**: 一个组件提供两种折叠功能
- 📋 **Panel 模式**: 可折叠的内容面板，支持外部控制
- 📝 **List 模式**: 可展开的数据列表，支持自定义渲染
- 🎨 **自定义样式**: 支持文本和自定义组件两种按钮类型
- 📱 **响应式设计**: 适配不同屏幕尺寸
- ♿ **无障碍支持**: 完整的键盘导航和屏幕阅读器支持
- 🎭 **TypeScript 支持**: 完整的类型定义

## 安装

```bash
npm install @oversea/collapse
```

## 使用方法

### 默认使用 (Panel 模式)

```tsx
import { Collapse } from "@oversea/collapse";

// 基础用法 - 默认是 Panel 模式
<Collapse header="基本信息">
  <div>用户信息内容</div>
</Collapse>;
```

### Panel 模式

```tsx
import { Collapse } from "@oversea/collapse";

// 使用 Panel 子组件
<Collapse.Panel header="用户信息" defaultExpanded={true}>
  <div className="p-3 bg-grey-50 rounded">姓名：张三</div>
  <div className="p-3 bg-grey-50 rounded">年龄：25岁</div>
  <div className="p-3 bg-grey-50 rounded">邮箱：zhangsan@example.com</div>
</Collapse.Panel>;
```

### List 模式

```tsx
import { Collapse } from "@oversea/collapse";

const data = [
  { key: "1", name: "项目 A", description: "这是项目 A 的描述" },
  { key: "2", name: "项目 B", description: "这是项目 B 的描述" },
  { key: "3", name: "项目 C", description: "这是项目 C 的描述" },
  { key: "4", name: "项目 D", description: "这是项目 D 的描述" },
  { key: "5", name: "项目 E", description: "这是项目 E 的描述" },
];

const renderItem = (item, index) => (
  <div key={item.key} className="p-4 border rounded-lg">
    <h3>{item.name}</h3>
    <p>{item.description}</p>
  </div>
);

// 使用 List 子组件
<Collapse.List
  items={data}
  renderItem={renderItem}
  visibleCount={3}
  actionLabel={{
    type: "text",
    expandLabel: "查看更多",
    collapseLabel: "收起",
  }}
/>;
```

## API

### Collapse (Panel 模式)

| 属性            | 类型                        | 默认值 | 说明             |
| --------------- | --------------------------- | ------ | ---------------- |
| header          | React.ReactNode             | -      | 面板标题         |
| children        | React.ReactNode             | -      | 面板内容         |
| defaultExpanded | boolean                     | false  | 默认是否展开     |
| iconSize        | number                      | 16     | 箭头图标大小     |
| className       | string                      | -      | 自定义样式类名   |
| onExpandChange  | (expanded: boolean) => void | -      | 展开状态变化回调 |

### Collapse.List

| 属性            | 类型                                        | 默认值       | 描述                 |
| --------------- | ------------------------------------------- | ------------ | -------------------- |
| items           | T[]                                         | -            | 数据源数组           |
| renderItem      | (item: T, index: number) => React.ReactNode | -            | 渲染每个列表项的函数 |
| visibleCount    | number                                      | 3            | 初始可见项数量       |
| actionLabel     | ActionLabel                                 | 见下方默认值 | 展开/折叠按钮配置    |
| defaultExpanded | boolean                                     | false        | 是否默认展开全部     |
| onExpandChange  | (expanded: boolean) => void                 | -            | 展开状态变化时的回调 |
| className       | string                                      | -            | 列表容器类名         |

### ActionLabel 类型

#### 文本类型 (type: "text")

| 属性          | 类型    | 默认值      | 描述                      |
| ------------- | ------- | ----------- | ------------------------- |
| type          | "text"  | -           | 按钮类型                  |
| expandLabel   | string  | "View All"  | 展开按钮文本              |
| collapseLabel | string  | "View Less" | 折叠按钮文本              |
| underline     | boolean | false       | 是否在 hover 时显示下划线 |

#### 自定义类型 (type: "custom")

| 属性          | 类型            | 描述         |
| ------------- | --------------- | ------------ |
| type          | "custom"        | 按钮类型     |
| expandLabel   | React.ReactNode | 展开按钮组件 |
| collapseLabel | React.ReactNode | 折叠按钮组件 |

### 默认 actionLabel 配置

```tsx
{
  type: "text",
  collapseLabel: "View Less",
  expandLabel: "View All",
  underline: false,
}
```

## 使用场景

### Panel 模式适用场景

- 信息展示：用于展示可选或次要信息，节省页面空间
- 表单分组：将复杂的表单按功能分组，提高用户体验
- 移动端适配：在移动端使用折叠面板可以节省宝贵的屏幕空间
- 联动控制：通过外部控制实现多个面板的联动展开/收起

### List 模式适用场景

- 数据列表：展示大量数据，避免页面过长
- 可选信息：适合展示可选或次要信息
- 移动端：建议在移动端使用以节省空间
- 自定义渲染：可以通过自定义渲染实现复杂的列表项展示

## 注意事项

1. **Panel 模式**: 数据项必须包含 `key` 属性，用于 React 的 key 值
2. **List 模式**: 当数据项数量小于或等于 `visibleCount` 时，不会显示展开/折叠按钮
3. **空数据处理**: 空数据数组会返回 `null`
4. **TypeScript 支持**: 组件支持 TypeScript 泛型，可以处理任意类型的数据
5. **状态回调**: 展开/折叠状态变化会触发 `onExpandChange` 回调
6. **自定义按钮**: 使用 `type: "custom"` 时，需要同时提供 `expandLabel` 和 `collapseLabel`
7. **只能展开**: 使用 `type: "text"` 时，如果不设置 `collapseLabel`，则只能展开不能收起
