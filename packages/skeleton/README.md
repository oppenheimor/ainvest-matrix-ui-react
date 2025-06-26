# @oversea/base-skeleton

> 高性能 React 骨架屏组件，提升用户感知性能

## ✨ 特性

- 🎨 **四种预设变体** - text、minor、avatar、image，覆盖常见使用场景
- ⚡ **高性能动画** - GPU 加速的 shimmer 效果，流畅丝滑
- 🔧 **智能优化** - 可视区域检测 + 设备性能自适应
- 🌙 **主题自适应** - 自动支持明暗主题切换
- 🎯 **类型安全** - 完整的 TypeScript 类型定义
- ♿ **无障碍友好** - 内置 ARIA 标签和屏幕阅读器支持
- 📱 **响应式设计** - 移动端优化，自动降级动画
- 🎨 **可定制性强** - 支持 Tailwind 类名覆盖

## 📦 安装

```bash
# npm
npm install @oversea/base-skeleton

# yarn
yarn add @oversea/base-skeleton

# pnpm
pnpm add @oversea/base-skeleton
```

## 🚀 快速开始

```tsx
import { Skeleton } from '@oversea/base-skeleton';

function Loading() {
  return (
    <div className="space-y-4">
      {/* 文本骨架 */}
      <Skeleton variant="text" />

      {/* 头像骨架 */}
      <Skeleton variant="avatar" />

      {/* 图片骨架 */}
      <Skeleton variant="image" className="h-48" />
    </div>
  );
}
```

## 📖 使用指南

### 基础用法

```tsx
// 四种基础变体
<Skeleton variant="text" />     // 主文本内容
<Skeleton variant="minor" />    // 次要信息
<Skeleton variant="avatar" />   // 头像/圆形
<Skeleton variant="image" />    // 图片/矩形
```

### 多行文本

```tsx
// 基础多行
<Skeleton variant="text" lineCount={3} />

// 自定义每行宽度
<Skeleton
  variant="text"
  lineCount={3}
  lineWidths={['100%', '80%', '60%']}
/>

// 渐变宽度效果
<Skeleton
  variant="minor"
  lineCount={2}
  lineWidths="70%"
/>
```

### 自定义样式

```tsx
// 自定义尺寸
<Skeleton variant="avatar" className="w-16 h-16" />

// 自定义形状
<Skeleton variant="avatar" className="rounded-lg" />

// 响应式设计
<Skeleton variant="image" className="h-32 md:h-48 lg:h-64" />
```

### 光泽效果控制

```tsx
// 禁用光泽效果
<Skeleton variant="text" showShimmer={false} />

// 条件光泽效果
<Skeleton
  variant="text"
  showShimmer={!isLowPerformanceDevice}
/>
```

## 🎨 变体说明

| 变体     | 默认样式        | 用途           | 支持多行 |
| -------- | --------------- | -------------- | -------- |
| `text`   | 高度 44px，深色 | 标题、段落文本 | ✅       |
| `minor`  | 高度 32px，浅色 | 次要信息、标签 | ✅       |
| `avatar` | 32×32px 圆形    | 头像、Logo     | ❌       |
| `image`  | 全宽 × 270px    | 封面图、缩略图 | ❌       |

## 📋 API 参考

### SkeletonProps

| 属性          | 类型                                       | 默认值   | 说明                           |
| ------------- | ------------------------------------------ | -------- | ------------------------------ |
| `variant`     | `'text' \| 'minor' \| 'avatar' \| 'image'` | `'text'` | 骨架屏变体类型                 |
| `showShimmer` | `boolean`                                  | `true`   | 是否显示光泽动画效果           |
| `lineCount`   | `number`                                   | `1`      | 内容行数（仅 text/minor 有效） |
| `lineWidths`  | `(string \| number)[] \| string \| number` | -        | 行宽配置（仅 text/minor 有效） |
| `lineHeights` | `(string \| number)[] \| string \| number` | -        | 行高配置（仅 text/minor 有效） |
| `className`   | `string`                                   | -        | 自定义 Tailwind 类名           |
| `...props`    | `HTMLDivElement`                           | -        | 其他 HTML div 属性             |

### 行宽配置详解

```tsx
// 数组模式：精确控制每行
lineWidths={['100%', '90%', '60%']}

// 字符串模式：所有行相同宽度
lineWidths="80%"

// 数字模式：固定像素宽度
lineWidths={240}

// 混合模式：前几行 100%，最后一行指定宽度
lineWidths="70%"  // 等同于 ['100%', '100%', '70%']
```

## 🎯 使用场景

### 卡片加载

```tsx
function ProductCard({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <div className="p-4 border rounded-lg space-y-3">
        <Skeleton variant="image" className="h-48" />
        <Skeleton variant="text" lineCount={2} lineWidths={['100%', '70%']} />
        <Skeleton variant="minor" lineWidths="40%" />
      </div>
    );
  }

  return <div>{/* 真实内容 */}</div>;
}
```

### 列表加载

```tsx
function UserList({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <Skeleton variant="avatar" className="w-10 h-10" />
            <div className="flex-1">
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="minor" className="w-1/2 mt-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <div>{/* 真实列表 */}</div>;
}
```

### 表格加载

```tsx
function DataTable({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton variant="minor" className="w-16" />
            <Skeleton variant="text" className="flex-1" />
            <Skeleton variant="minor" className="w-20" />
            <Skeleton variant="minor" className="w-24" />
          </div>
        ))}
      </div>
    );
  }

  return <div>{/* 真实表格 */}</div>;
}
```

## ⚡ 性能优化

### 智能动画控制

组件内置多重性能优化策略：

```tsx
// 1. 可视区域检测
// 只有进入视口的骨架屏才启用动画

// 2. 设备性能检测
// CPU 核心数 < 4 或内存 < 2GB 时自动禁用动画

// 3. 用户偏好检测
// 自动遵循 prefers-reduced-motion 设置

// 4. GPU 加速
// 使用 transform 而非 left/top，避免重绘重排
```

### 最佳实践

```tsx
// ✅ 推荐：大量骨架屏时禁用光泽效果
<Skeleton
  variant="text"
  showShimmer={itemCount < 10}
/>

// ✅ 推荐：响应式尺寸
<Skeleton
  variant="image"
  className="h-32 sm:h-40 md:h-48"
/>

// ❌ 避免：过度嵌套
<div className="space-y-2">
  {Array.from({ length: 100 }).map(() =>
    <Skeleton variant="text" showShimmer={true} />
  )}
</div>
```

## 🌙 主题支持

组件自动适配明暗主题

## ♿ 无障碍支持

内置完整的可访问性标签：

```tsx
// 自动添加的 ARIA 属性
<div role="status" aria-busy="true" aria-live="polite" aria-label="Loading content">
  {/* 骨架内容 */}
</div>
```

## 🔧 故障排除

### 光泽效果不显示？

- ✅ 检查 `showShimmer` 是否为 `true`
- ✅ 确认用户未设置 `prefers-reduced-motion: reduce`
- ✅ 验证设备性能是否触发自动降级

### 样式异常？

- ✅ 确保正确导入了组件样式
- ✅ 检查 Tailwind CSS 配置是否正确
- ✅ 验证自定义 `className` 优先级

### TypeScript 错误？

- ✅ 确保安装了 `@types/react`
- ✅ 检查 TypeScript 版本 >= 4.5
- ✅ 验证组件导入路径

## 📊 浏览器兼容性

| 浏览器         | 版本支持 |
| -------------- | -------- |
| Chrome         | >= 60    |
| Firefox        | >= 55    |
| Safari         | >= 12    |
| Edge           | >= 79    |
| iOS Safari     | >= 12    |
| Android Chrome | >= 60    |
