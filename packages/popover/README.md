# Popover 弹出框

一个基于 Radix UI 的高质量 Popover 弹出框组件，提供完整的无障碍性支持和丰富的交互功能。

## 特性

- 📍 **智能定位**：支持上下左右四个方向，自动显示指向箭头
- 🎯 **灵活触发**：支持受控和非受控模式，可配置多种关闭行为
- ♿ **无障碍性**：基于 Radix UI，完整支持键盘导航和屏幕阅读器
- 📱 **响应式**：适配不同设备和屏幕尺寸
- 🌗 **暗色模式**：通过 Token 系统自动支持暗色模式

## 安装

```bash
npm install @oversea/popover
# 或
pnpm add @oversea/popover
```

## 使用方法

### 基本用法

```tsx
import { Popover } from '@oversea/popover';
import { Button } from '@oversea/button';

function App() {
  return (
    <Popover content="这是弹框内容">
      <Button>触发弹框</Button>
    </Popover>
  );
}
```

### 带标题的弹框

```tsx
<Popover title="弹框标题" content="这里是弹框的详细内容">
  <Button>带标题弹框</Button>
</Popover>
```

### 受控模式

```tsx
function ControlledPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} content="受控模式弹框">
      <Button>受控弹框</Button>
    </Popover>
  );
}
```

### 复杂内容

```tsx
<Popover
  title="产品详情"
  content={
    <div className="space-y-3">
      <img src="/product.jpg" className="w-full rounded" />
      <p>产品描述信息...</p>
      <div className="flex gap-2">
        <Button size="sm">购买</Button>
        <Button size="sm" variant="secondary">
          收藏
        </Button>
      </div>
    </div>
  }
>
  <Button>查看详情</Button>
</Popover>
```

## API 参考

| 属性                | 说明             | 类型                                           | 默认值     | 必填 |
| ------------------- | ---------------- | ---------------------------------------------- | ---------- | ---- |
| children            | 触发元素         | ReactNode                                      | -          | 是   |
| content             | 弹框内容         | ReactNode                                      | -          | 是   |
| title               | 弹框标题         | ReactNode                                      | -          | 否   |
| placement           | 显示位置         | `'top'` \| `'bottom'` \| `'left'` \| `'right'` | `'bottom'` | 否   |
| open                | 受控模式开启状态 | boolean                                        | -          | 否   |
| defaultOpen         | 默认开启状态     | boolean                                        | false      | 否   |
| onOpenChange        | 开启状态改变回调 | (open: boolean) => void                        | -          | 否   |
| showArrow           | 显示箭头         | boolean                                        | true       | 否   |
| closeOnClickOutside | 点击外部关闭     | boolean                                        | true       | 否   |
| closeOnClickInside  | 点击内部关闭     | boolean                                        | false      | 否   |
| className           | 容器自定义类名   | string                                         | -          | 否   |

## Ref 方法

通过 ref 可以访问以下方法：

```tsx
interface PopoverRef {
  nativeElement: HTMLElement | null; // 原生 DOM 元素
  focus: () => void; // 聚焦触发元素
  open: () => void; // 打开弹框
  close: () => void; // 关闭弹框
}
```

### 使用示例

```tsx
function RefExample() {
  const popoverRef = useRef<PopoverRef>(null);

  const handleOpen = () => {
    popoverRef.current?.open();
  };

  return (
    <div>
      <Button onClick={handleOpen}>通过 Ref 打开</Button>
      <Popover ref={popoverRef} content="通过 ref 控制的弹框">
        <Button>目标按钮</Button>
      </Popover>
    </div>
  );
}
```

## 使用场景

### 适用场景

- 显示补充信息或详细说明
- 展示操作菜单或选项列表
- 确认对话框或表单输入
- 产品详情预览
- 用户引导和帮助提示

### 不适用场景

- 简单的文本提示（建议使用 Tooltip）
- 大量内容展示（建议使用 Modal）
- 移动端的全屏操作（建议使用 Drawer）

## 注意事项

1. **内容长度**：建议内容不要过长，以免影响用户体验
2. **触发元素**：确保触发元素具有适当的交互提示
3. **无障碍性**：为复杂内容提供适当的 ARIA 标签
4. **性能考虑**：避免在 content 中放置过于复杂的组件

## 浏览器兼容性

- Chrome 80+
- Firefox 78+
- Safari 14+
- Edge 80+

## 许可证

MIT
