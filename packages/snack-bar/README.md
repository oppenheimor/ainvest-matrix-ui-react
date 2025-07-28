# `@oversea/snack-bar`

## 组件简介

一个基于 Sonner 库构建的现代化 React 通知组件，提供多种消息类型和灵活的配置选项。

**主要特性：**
- 支持 success、error、warning、info、loading 五种消息类型
- 支持点击关闭和操作按钮
- 可配置显示位置和时长
- 完整的 TypeScript 支持

## 安装和快速开始

### 1. 导入组件

```tsx
import { Snackbar, snackbar } from '@oversea/snack-bar';
```

### 2. 渲染容器并调用

```tsx
function App() {
  return (
    <div>
      <button onClick={() => snackbar.success('操作成功！')}>
        显示通知
      </button>
      
      <Snackbar />
    </div>
  );
}
```

## 基本用法

### 消息类型

```tsx
// 成功消息
snackbar.success('操作成功！');

// 错误消息  
snackbar.error('操作失败，请重试');

// 警告消息
snackbar.warning('请注意数据变化');

// 信息消息
snackbar.info('这是一条提示信息');

// 加载消息
snackbar.loading('正在加载...');
```

### 显示位置

```tsx
// 顶部显示
<Snackbar position="top-center" />

// 底部显示
<Snackbar position="bottom-center" />
```

### 点击关闭

```tsx
// 允许点击关闭
snackbar.info('点击我可以关闭', { 
  clickToClose: true 
});
```

### 操作按钮

```tsx
// 对象格式
snackbar.success('文件删除成功', {
  action: {
    label: '撤销',
    onClick: () => console.log('撤销操作')
  }
});

// React 节点格式
snackbar.info('自定义JSX格式操作按钮', {
  action: (
    <button 
      onClick={() => alert('JSX格式按钮被点击!')}
      className="bg-gray-600 text-white px-9 py-1 rounded text-sm"
    >
      自定义按钮
    </button>
  )
});
```

### 显示时长

```tsx
// 自定义显示时长
snackbar.info('8秒后关闭', { duration: 8000 });

// 永不自动关闭
snackbar.info('手动关闭', { 
  duration: Infinity, 
  clickToClose: true 
});
```

## API 文档

### Snackbar Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| position | 显示位置 | `'top-center'` \| `'bottom-center'` | `'bottom-center'` |
| duration | 显示时长（毫秒） | `number` | `4000` |
| clickToClose | 是否可点击关闭 | `boolean` | `false` |
| action | 操作按钮 | `{ label: string; onClick: () => void }` 或 `React.ReactNode` | - |
| className | 自定义样式类名 | `string` | - |
