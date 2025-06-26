# @oversea/widget-breadcrumb 面包屑导航组件

## 1、需求背景

在现代网站和应用中，用户需要清晰了解自己的当前位置以及快速导航到上层页面。面包屑导航组件提供了一种直观的方式来展示当前页面在网站层级结构中的位置，并允许用户轻松返回上层页面。

## 2、UI, UE 设计

组件提供简洁直观的面包屑导航界面，包含以下主要元素：

1. 面包屑项：显示页面层级结构中的各个层级
2. 分隔符：用于分隔不同层级的面包屑项
3. 省略号：当面包屑项过多时，中间项会被折叠并显示省略号
4. 最后一项：当前页面，通常以不同样式展示（如颜色较浅，无法点击）

组件支持以下交互方式：

- 点击面包屑项导航到对应页面
- 点击省略号显示被折叠的面包屑项
- 鼠标悬停在超出长度的面包屑项上显示完整内容

## 3、功能设计

### 3.1 组件能力

1. 自动折叠

   - 当面包屑项超过3个时，自动折叠中间项，只显示第一项、省略号和最后两项
   - 点击省略号可展开显示被折叠的项

2. 自定义分隔符
   
   - 支持使用自定义字符、图标或SVG作为分隔符

3. 文本溢出处理
   
   - 支持为单个面包屑项设置最大宽度
   - 文本超出设定宽度时显示省略号
   - 鼠标悬停时显示完整文本

4. 暗黑模式适配
   
   - 支持在明亮和暗黑两种主题下正常显示

### 3.2 核心特性

1. 组件状态管理

   - 智能处理面包屑项的显示逻辑
   - 根据项目数量决定是否折叠显示

2. 文本溢出处理
   
   - 提供文本溢出时的优雅处理方案
   - 支持tooltip提示完整内容

3. 响应式设计
   
   - 在不同屏幕尺寸下保持良好的可用性

## 4、开发方案

### 4.1 组件结构

组件采用分层设计，包含以下子组件：

1. Breadcrumb：最外层容器组件
2. BreadcrumbList：面包屑列表
3. BreadcrumbItem：单个面包屑项
4. BreadcrumbLink：可点击的面包屑链接
5. BreadcrumbPage：当前页面（最后一项）
6. BreadcrumbSeparator：分隔符
7. BreadcrumbEllipsis：省略号

### 4.2 API 设计

```typescript
interface BreadcrumbProps {
  /**
   * 面包屑列表
   * label: 显示的文本
   * href: 链接地址
   * maxWidth: 最大宽度（像素），超出则显示省略号
   */
  breadcrumbItems: {
    label: string;
    href?: string;
    maxWidth?: number;
  }[];

  /**
   * 分隔符
   * 可以是字符串、React元素或SVG
   * @default '/'
   */
  separator?: React.ReactNode;
}
```

## 5、使用示例

### 5.1 基础用法

```jsx
import { Breadcrumb } from '@oversea/widget-breadcrumb';

<Breadcrumb
  breadcrumbItems={[
    { label: '首页', href: '/' },
    { label: '组件', href: '/components' },
    { label: '面包屑', href: '/components/breadcrumb' },
  ]}
/>
```

### 5.2 自定义分隔符

```jsx
<Breadcrumb
  breadcrumbItems={[
    { label: '首页', href: '/' },
    { label: '组件库', href: '/components' },
    { label: '面包屑', href: '/components/breadcrumb' },
  ]}
  separator=">"
/>

// 使用图标作为分隔符
<Breadcrumb
  breadcrumbItems={[
    { label: '首页', href: '/' },
    { label: '组件库', href: '/components' },
    { label: '面包屑', href: '/components/breadcrumb' },
  ]}
  separator={<span style={{ fontSize: '12px', fontWeight: 'bold' }}>&rarr;</span>}
/>

// 使用SVG作为分隔符
<Breadcrumb
  breadcrumbItems={[
    { label: '首页', href: '/' },
    { label: '组件库', href: '/components' },
    { label: '面包屑', href: '/components/breadcrumb' },
  ]}
  separator={(
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )}
/>
```

### 5.3 设置最大宽度和文本溢出处理

```jsx
<Breadcrumb
  breadcrumbItems={[
    { label: '首页', href: '/' },
    { label: '组件库', href: '/components' },
    { 
      label: '这是一个非常长的面包屑文本，需要显示省略号并在鼠标悬停时显示完整内容',
      href: '/components/breadcrumb',
      maxWidth: 120
    },
  ]}
/>
```

### 5.4 多项面包屑（自动折叠）

```jsx
<Breadcrumb
  breadcrumbItems={[
    { label: '首页', href: '/' },
    { label: '设计系统', href: '/design' },
    { label: '组件库', href: '/components' },
    { label: '导航组件', href: '/components/navigation' },
    { label: '面包屑', href: '/components/navigation/breadcrumb' },
  ]}
/>
```

## 6、注意事项

1. 当面包屑项超过3个时，组件会自动折叠中间项，只显示第一项、省略号和最后两项。
2. 设置`maxWidth`属性可以限制面包屑项的最大宽度，超出部分显示省略号。
3. 组件会自动为超出宽度的面包屑项添加tooltip，鼠标悬停时显示完整文本。
4. 组件适配暗黑模式，会根据当前主题自动调整样式。
