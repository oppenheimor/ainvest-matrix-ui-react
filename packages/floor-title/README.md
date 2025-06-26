# `@oversea/floor-title`

## 组件简介

FloorTitle 组件是一个用于页面结构中构建楼层标题的组件，它提供了丰富的功能和灵活的使用方式。支持一级、二级、三级标题层级，每个层级会自动应用对应的样式。组件包含标题名、标题描述和楼层操作区域，组件还可设置为可折叠状态，点击时会展开/折叠楼层的描述或内容。同时支持层级嵌套，方便构建复杂的页面结构。

## 主要功能

- 支持一级、二级、三级标题层级，自动应用对应样式
- 包含标题名、描述文本、操作区域以及楼层内容等部分组成
- 可设置为可折叠状态，支持四种折叠模式（不折叠、折叠描述、折叠内容、全部折叠）
- 支持自定义标题图标及操作区域图标
- 支持层级嵌套，构建复杂页面结构
- 支持 Tailwind CSS 样式扩展

## 技术栈要求

- React 18+
- TypeScript 4.5+
- Tailwind CSS（样式依赖）

## 典型使用场景

- 需要展开/折叠功能的内容区块标题
- 包含操作按钮的标题栏

## 属性说明

| 属性名                | 说明                                                                | 类型                                                |
| --------------------- | ------------------------------------------------------------------- | --------------------------------------------------- |
| level                 | 标题级别                                                            | 1 \\\| 2 \\\| 3                                     |
| title                 | 标题文本                                                            | string                                              |
| titleIcon             | 标题右侧自定义图标                                                  |
| titleClassName        | 标题额外样式                                                        |
| description           | 描述文本                                                            | string                                              |
| collapseMode          | 折叠模式                                                            | "none" \\\| "content" \\\| "description" \\\| "all" |
| defaultCollapsed      | 初始折叠状态                                                        | boolean                                             |
| actionBarElement      | 操作栏图标                                                          | React.ReactNode                                     |
| ...div 标签原生属性   | 其他属性，参考 div 标签                                             |
| ...title 标签原生属性 | 绑定在 title 上的自定义事件，如 onTitleClick、onTitleDoubleClick 等 | -                                                   |

## 使用示例

### 基础用法

展示不同层级标题的基础用法。

```tsx
import { FloorTitle } from "@oversea/floor-title";

// 直接使用基础组件
<FloorTitle level={1} title="一级标题" />;
```

### 折叠功能

展示可折叠标题的使用示例。

```tsx
import { FloorTitle } from "@oversea/floor-title";

<FloorTitle
  level={2}
  title="可折叠标题"
  collapseMode="description"
  defaultCollapsed
/>;
```

### 自定义操作区域

展示自定义操作区域的使用示例。

```tsx
import { FloorTitle } from "@oversea/floor-title";
import { ArrowRight, Share } from "lucide-react";

<FloorTitle
  level={2}
  title="自定义操作区域"
  titleIcon={<ArrowRight />}
  actionBarElement={<Share />}
/>;
```

### 事件绑定

展示事件绑定的使用示例。

```tsx
import { FloorTitle } from "@oversea/floor-title";

<FloorTitle
  level={2}
  title="自定义操作区域"
  titleIcon={<ArrowRight />}
  {/* 给title绑定事件 */}
  onTitleClick={() => console.log("click title")}
/>;
```
