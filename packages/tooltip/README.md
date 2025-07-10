# Tooltip 提示框组件

一个基于 Radix UI 的高质量 Tooltip 提示框组件，提供完整的无障碍性支持和丰富的交互功能。

## 特性

- 🎯 **多种触发方式** - 支持 hover、focus、click 三种触发方式
- 🎨 **灵活定制** - 支持多种位置、背景色变体和自定义样式
- ♿ **无障碍支持** - 完整的 ARIA 属性和键盘导航支持
- 📱 **响应式设计** - 自适应不同屏幕尺寸
- 🎛️ **受控模式** - 支持受控和非受控两种使用方式
- ⚡ **性能优化** - 使用 React.memo 和 useMemo 优化渲染性能
- 🌙 **暗色模式** - 原生支持暗色模式
- 🎭 **TypeScript** - 完整的 TypeScript 类型定义

## 安装

```bash
npm install @oversea/tooltip
# 或
pnpm add @oversea/tooltip
```

## 使用示例

```tsx
import { Tooltip } from '@oversea/tooltip';

<Tooltip content="提示内容">
  <Button>悬停显示</Button>
</Tooltip>

<Tooltip content="底部提示" placement="bottom" closable showArrow>
  <Button>底部可关闭</Button>
</Tooltip>
```

## 组件示例

### 不同位置

```tsx
<Tooltip content="上方提示" placement="top">
  <Button>上方</Button>
</Tooltip>

<Tooltip content="下方提示" placement="bottom">
  <Button>下方</Button>
</Tooltip>

<Tooltip content="左侧提示" placement="left">
  <Button>左侧</Button>
</Tooltip>

<Tooltip content="右侧提示" placement="right">
  <Button>右侧</Button>
</Tooltip>
```

### 不同触发方式

```tsx
<Tooltip content="悬停触发" trigger="hover">
  <Button>Hover</Button>
</Tooltip>

<Tooltip content="聚焦触发" trigger="focus">
  <Button>Focus</Button>
</Tooltip>

<Tooltip content="点击触发" trigger="click" closable>
  <Button>Click</Button>
</Tooltip>
```

## 高级用法

### 自动关闭

```tsx
<Tooltip content="3秒后自动关闭" autoCloseDelayDuration={3000} closable>
  <Button>自动关闭</Button>
</Tooltip>
```

### 受控模式

```tsx
const [open, setOpen] = useState(false);

<Tooltip content="受控提示" open={open}>
  <Button>受控提示</Button>
</Tooltip>

// 受控模式 + 可关闭
<Tooltip
  content="受控可关闭提示"
  open={open}
  closable
  onClose={() => setOpen(false)}
>
  <Button>受控可关闭</Button>
</Tooltip>
```

### 使用 ref

```tsx
const tooltipRef = useRef<TooltipRef>(null);

<Tooltip ref={tooltipRef} content="可编程控制">
  <Button>编程控制</Button>
</Tooltip>;
```

## API

### Tooltip Props

| 属性                   | 说明                                   | 类型                                     | 默认值      |
| ---------------------- | -------------------------------------- | ---------------------------------------- | ----------- |
| content                | Tooltip 内容                           | `ReactNode`                              | -           |
| children               | 触发元素，必须是单个 React 元素        | `ReactElement`                           | -           |
| placement              | 显示位置                               | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`     |
| trigger                | 触发方式                               | `'hover' \| 'focus' \| 'click'`          | `'hover'`   |
| variant                | 背景色变体                             | `'primary' \| 'neutral'`                 | `'primary'` |
| closable               | 是否可关闭（显示关闭按钮）             | `boolean`                                | `false`     |
| showArrow              | 是否显示箭头                           | `boolean`                                | `true`      |
| disabled               | 是否禁用                               | `boolean`                                | `false`     |
| delayDuration          | 显示延迟时间 (ms)                      | `number`                                 | `200`       |
| hideDelayDuration      | 隐藏延迟时间 (ms)                      | `number`                                 | `200`       |
| autoCloseDelayDuration | 自动关闭时间 (ms)，设为 0 则不自动关闭 | `number`                                 | `0`         |
| open                   | 手动控制显示状态                       | `boolean`                                | -           |
| onOpenChange           | 显示状态变化回调                       | `(open: boolean) => void`                | -           |
| onClose                | 关闭回调                               | `() => void`                             | -           |
| className              | 自定义类名                             | `string`                                 | -           |

### Tooltip Ref

通过 ref 可以调用以下方法：

| 方法          | 说明              | 类型                  |
| ------------- | ----------------- | --------------------- |
| focus         | 聚焦到触发元素    | `() => void`          |
| open          | 手动打开 Tooltip  | `() => void`          |
| close         | 手动关闭 Tooltip  | `() => void`          |
| nativeElement | 原生 DOM 元素引用 | `HTMLElement \| null` |

### 类型定义

```tsx
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'focus' | 'click';
export type TooltipVariant = 'primary' | 'neutral';

export interface TooltipRef {
  nativeElement: HTMLElement | null;
  focus: () => void;
  open: () => void;
  close: () => void;
}
```

## 设计规范

- **最小宽度**: 120px
- **最大宽度**: 200px
- **最大行数**: 2 行，超出显示省略号
- **圆角**: 8px (lg)
- **内边距**: 12px (py-3 px-4)
- **背景色**:
  - Primary: `bg-brand-primary`
  - Neutral: `bg-foreground-layer1`
- **文字颜色**: `text-text-inverse`
- **动画**: 200ms 渐入渐出

## 无障碍性

- ✅ 支持键盘导航
- ✅ 提供适当的 ARIA 属性
- ✅ 符合 WCAG 2.1 AA 标准
- ✅ 支持屏幕阅读器
- ✅ 关闭按钮包含 aria-label
- ✅ 图标添加 aria-hidden 属性

## 兼容性

- React 18+
- TypeScript 4.5+
- 现代浏览器（Chrome 80+, Firefox 90+, Safari 14+）

## 开发

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 发布
npm run pb
```

## 更新日志

### 1.0.0

- 初始版本发布
- 基础 Tooltip 功能
- 支持关闭按钮和自动关闭
