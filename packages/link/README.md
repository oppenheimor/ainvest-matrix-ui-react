# `@oversea/link`

## 组件简介

Link 组件用于在界面中创建可点击的链接，引导用户跳转至其他页面或触发特定操作。支持多种视觉重要程度（默认、强调、加字重），可添加左/右侧自定义或默认图标、下划线、自定义颜色等。

## 主要功能

- 支持 emphasized（强调）、strong（加字重）、underline（下划线）等多种视觉变体
- 支持 leftIcon、rightIcon（自定义图标）、showLinkIcon、showArrowIcon（默认图标）
- 支持 className 自定义样式
- 继承 a 标签所有原生属性
- 支持 Tailwind CSS 样式扩展

## 技术栈要求

- React 18+
- TypeScript 4.5+
- Tailwind CSS（样式依赖）

## 典型使用场景

- 页面内外部跳转
- 需要自定义样式或图标的链接
- 需要无障碍支持的导航

## 属性说明

| 属性名            | 类型            | 说明                                            |
| ----------------- | --------------- | ----------------------------------------------- |
| emphasized        | boolean         | 是否强调，默认 false                            |
| strong            | boolean         | 是否加字重，默认 false                          |
| underline         | boolean         | 是否显示下划线，默认 false                      |
| leftIcon          | React.ReactNode | 左侧自定义图标                                  |
| rightIcon         | React.ReactNode | 右侧自定义图标                                  |
| showLinkIcon      | boolean         | 左侧默认图标，默认 false                        |
| showArrowIcon     | boolean         | 右侧默认图标，默认 false                        |
| iconSize          | number          | 图标大小，默认值为 16px，仅在使用默认图标时生效 |
| className         | string          | 自定义类名                                      |
| children          | React.ReactNode | 子元素                                          |
| ...a 标签原生属性 | -               | 继承自 a 标签                                   |

## 使用示例

### 基础用法

```tsx
import { Link } from "@oversea/link";

<Link href="https://www.example.com">默认链接</Link>
<Link href="https://www.example.com" emphasized>强调链接</Link>
<Link href="https://www.example.com" strong>加字重链接</Link>
<Link href="https://www.example.com" emphasized strong>强调且加字重</Link>
```

### 图标用法

```tsx
import { Link } from "@oversea/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// 左侧自定义图标
<Link href="#" leftIcon={<ArrowLeft size={16} />}>返回</Link>
// 右侧自定义图标
<Link href="#" rightIcon={<img src="http://i.thsi.cn/images/icon_jubao.png" className="h-[1em]" />}>自定义右图标</Link>
// 左侧默认图标
<Link href="#" showLinkIcon>默认链接图标（左）</Link>
// 右侧默认图标
<Link href="#" showArrowIcon iconSize={22} className="text-2xl">默认箭头图标（右）</Link>
```

### 下划线与自定义颜色

```tsx
<Link href="#" underline>带下划线的链接</Link>
<Link href="#" className="text-red-500 hover:text-green-600">自定义颜色链接</Link>
```
