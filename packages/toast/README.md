# Toast 组件

## 组件简介

Toast 组件用于展示全局或页面级的轻量操作反馈信息，常用于操作成功、失败、警告、加载等场景，支持自动消失和多种类型图标。

## 主要特性
- 支持多种类型：`success`、`error`、`info`、`warning`、`loading`、`none`
- 支持自动消失与常驻显示
- 支持最大宽度、最大行数限制，超出自动省略
- 支持自定义 className
- 响应式设计，适配暗色模式

## 安装与引入

```tsx
import { Toast } from '@oversea/toast';
```

## API 说明

| 属性      | 说明         | 类型         | 默认值 | 必填 |
|-----------|--------------|--------------|--------|------|
| type      | 提示类型，决定 Toast 图标类型 | `success`<br>`error`<br>`info`<br>`warning`<br>`warn`<br>`none`<br>`loading` | 'success' | 否   |
| content   | 展示内容     | `string`       | ""      | 否   |
| duration  | 自动关闭时间（ms），0 表示常驻 | `number` | 3000   | 否   |
| maxWidth  | 最大宽度     | `number`       | 320    | 否   |
| maxLine   | 最大显示行数，超出省略 | `number` | 1      | 否   |
| className | 自定义类名   | `string`       | -      | 否   |

## 使用示例

### 基础用法

```tsx
<Toast type="success" content="操作成功" duration={0} />
<Toast type="error" content="操作失败" duration={0} />
<Toast type="info" content="信息提示" duration={0} />
<Toast type="warning" content="警告提示" duration={0} />
<Toast type="loading" content="加载中..." duration={0} />
<Toast type="none" content="无图标提示" duration={0} />
```

### 自动消失

```tsx
<Toast type="success" content="本提示将在 60 秒后自动关闭" duration={60000} />
```

### 最大宽度演示

```tsx
<Toast
  type="info"
  content="这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的提示信息，超出最大宽度会被省略。"
  maxWidth={200}
  duration={0}
/>
```

### 最大行数演示

```tsx
<Toast
  type="info"
  content={`第一行内容\n第二行内容\n第三行内容\n第四行内容\n第五行内容\n第六行内容`}
  maxLine={2}
  maxWidth={120}
  duration={0}
/>
```

## 设计与使用原则
- 适用于页面级、全局级的轻量反馈提示
- 不建议用于需要用户交互的复杂场景
- 保持提示内容简洁明了
- 内容过长时建议设置 `maxWidth` 或 `maxLine` 以优化展示

## 其他说明
- 支持响应式和暗色模式，无需额外配置
- 依赖 tailwindcss@3 进行样式渲染
- 组件无国际化内容，`content` 由调用方自行传入
