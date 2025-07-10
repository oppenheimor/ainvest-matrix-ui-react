# Notification 通知

[![npm version](https://img.shields.io/npm/v/@ainvest-matrix-ui-react/notification.svg)](https://www.npmjs.com/package/@ainvest-matrix-ui-react/notification)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)

一个功能强大、高度可定制的 React 通知组件，基于 Sonner 构建，支持多种通知类型、操作按钮、Promise 状态处理和完全的 TypeScript 支持。

## 🚀 特性

- 🎯 **多种通知类型** - 支持 success、error、warning、info、loading 等状态
- ⚡ **操作按钮** - 内置 action/cancel 按钮支持，无需额外组件
- 🔄 **Promise 集成** - 完美处理异步操作的加载、成功、失败状态
- 🎨 **自定义内容** - 支持完全自定义的通知内容和样式
- 🌙 **主题支持** - 基于 atom-token 颜色系统，完美支持暗色模式
- 📱 **响应式设计** - 适配不同屏幕尺寸和设备
- 🎪 **位置配置** - 支持多种显示位置（顶部、底部、左右角等）
- ⏱️ **时间控制** - 灵活的显示时长配置，支持永久显示
- 🔒 **TypeScript** - 完整的类型定义和智能提示
- ♿ **可访问性** - 遵循 WCAG 无障碍访问标准

## 📦 安装

```bash
# 使用 pnpm（推荐）
pnpm add @ainvest-matrix-ui-react/notification

# 使用 npm
npm install @ainvest-matrix-ui-react/notification

# 使用 yarn
yarn add @ainvest-matrix-ui-react/notification
```

## 🔨 快速开始

### 基础设置

首先在你的应用根组件中添加 `Toaster` 组件：

```tsx
import { Toaster } from '@ainvest-matrix-ui-react/notification';

function App() {
  return (
    <div>
      {/* 你的应用内容 */}
      <Toaster />
    </div>
  );
}
```

### 显示通知

```tsx
import { toast } from '@ainvest-matrix-ui-react/notification';

function MyComponent() {
  const showNotification = () => {
    toast('Hello World!', {
      description: '这是一条基础通知消息',
    });
  };

  return <button onClick={showNotification}>显示通知</button>;
}
```

## 📚 使用指南

### 通知类型

```tsx
import { toast } from '@ainvest-matrix-ui-react/notification';

// 成功通知
toast.success('操作成功', {
  description: '数据已保存',
});

// 错误通知
toast.error('操作失败', {
  description: '请检查网络连接',
});

// 警告通知
toast.warning('注意', {
  description: '即将超时，请及时保存',
});

// 信息通知
toast.info('提示', {
  description: '新功能已上线',
});

// 加载通知
const loadingToast = toast.loading('加载中...', {
  description: '正在处理请求',
});

// 手动关闭
setTimeout(() => {
  toast.dismiss(loadingToast);
}, 3000);
```

### 操作按钮

```tsx
import { toast } from '@ainvest-matrix-ui-react/notification';

const showActionNotification = () => {
  const toastId = toast.info('确认删除', {
    description: '此操作不可撤销，确定要删除吗？',
    action: {
      label: '确认',
      onClick: () => {
        // 执行删除操作
        console.log('已删除');
        toast.dismiss(toastId);
      },
    },
    cancel: {
      label: '取消',
      onClick: () => {
        toast.dismiss(toastId);
      },
    },
  });
};
```

### Promise 状态处理

```tsx
import { toast } from '@ainvest-matrix-ui-react/notification';

const handleAsyncOperation = async () => {
  const asyncOperation = fetch('/api/data').then(res => res.json());

  toast.promise(asyncOperation, {
    loading: '正在加载数据...',
    success: data => `加载成功！获取到 ${data.length} 条记录`,
    error: err => `加载失败：${err.message}`,
  });
};
```

### 自定义内容

```tsx
import { toast } from '@ainvest-matrix-ui-react/notification';

const showCustomNotification = () => {
  toast.custom(id => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-lg">
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xl">🎉</span>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-900">恭喜！</h3>
        <p className="text-gray-600">您已获得新成就</p>
      </div>
      <button onClick={() => toast.dismiss(id)} className="text-gray-400 hover:text-gray-600">
        ✕
      </button>
    </div>
  ));
};
```

## 🎨 通知类型

| 类型    | 方法              | 描述         | 图标颜色 |
| ------- | ----------------- | ------------ | -------- |
| 基础    | `toast()`         | 默认通知     | 无       |
| 成功    | `toast.success()` | 操作成功提示 | 绿色 ✅  |
| 错误    | `toast.error()`   | 错误提示     | 红色 ❌  |
| 警告    | `toast.warning()` | 警告提示     | 橙色 ⚠️  |
| 信息    | `toast.info()`    | 信息提示     | 蓝色 ℹ️  |
| 加载    | `toast.loading()` | 加载状态     | 旋转图标 |
| Promise | `toast.promise()` | 异步状态     | 动态切换 |
| 自定义  | `toast.custom()`  | 完全自定义   | 自定义   |

## ⚙️ API 参考

### Toaster 组件

| 属性         | 说明                 | 类型                                                                                              | 默认值           |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------- | ---------------- |
| position     | 通知显示位置         | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` |
| expand       | 是否展开显示多条通知 | `boolean`                                                                                         | `false`          |
| richColors   | 是否使用丰富的颜色   | `boolean`                                                                                         | `false`          |
| closeButton  | 是否显示关闭按钮     | `boolean`                                                                                         | `true`           |
| toastOptions | 通知选项配置         | `ToastOptions`                                                                                    | -                |

### toast 方法选项

| 属性        | 说明             | 类型                                                   | 默认值     |
| ----------- | ---------------- | ------------------------------------------------------ | ---------- |
| description | 通知描述内容     | `string \| React.ReactNode \| (() => React.ReactNode)` | -          |
| duration    | 显示时长（毫秒） | `number`                                               | `Infinity` |
| position    | 单独设置位置     | `ToastPosition`                                        | -          |
| action      | 操作按钮配置     | `{ label: string; onClick: () => void }`               | -          |
| cancel      | 取消按钮配置     | `{ label: string; onClick: () => void }`               | -          |
| onDismiss   | 关闭时回调       | `() => void`                                           | -          |
| onAutoClose | 自动关闭时回调   | `() => void`                                           | -          |
| className   | 自定义样式类     | `string`                                               | -          |
| style       | 自定义内联样式   | `React.CSSProperties`                                  | -          |

### Promise 选项

| 属性    | 说明         | 类型                                                    | 必填 |
| ------- | ------------ | ------------------------------------------------------- | ---- |
| loading | 加载状态文案 | `string \| React.ReactNode`                             | ✅   |
| success | 成功状态文案 | `string \| ((data: T) => string \| React.ReactNode)`    | ✅   |
| error   | 错误状态文案 | `string \| ((error: any) => string \| React.ReactNode)` | ✅   |
| finally | 完成时回调   | `() => void`                                            | ❌   |

## 🏗️ 使用场景

### 表单提交反馈

```tsx
const handleSubmit = async (formData: FormData) => {
  const submitPromise = submitForm(formData);

  toast.promise(submitPromise, {
    loading: '正在提交表单...',
    success: '提交成功！',
    error: err => `提交失败：${err.message}`,
  });
};
```

### 文件上传进度

```tsx
const handleFileUpload = (file: File) => {
  const uploadPromise = uploadFile(file);

  toast.promise(uploadPromise, {
    loading: `正在上传 ${file.name}...`,
    success: response => `${file.name} 上传成功！`,
    error: `${file.name} 上传失败`,
  });
};
```

### 用户操作确认

```tsx
const handleDelete = (itemId: string) => {
  toast.warning('确认删除', {
    description: '删除后无法恢复，确定要继续吗？',
    action: {
      label: '确认删除',
      onClick: () => {
        deleteItem(itemId);
        toast.success('删除成功');
      },
    },
    cancel: {
      label: '取消',
      onClick: () => toast.dismiss(),
    },
  });
};
```

### 系统状态通知

```tsx
// 网络状态变化
window.addEventListener('online', () => {
  toast.success('网络已连接');
});

window.addEventListener('offline', () => {
  toast.error('网络连接断开', {
    description: '请检查网络设置',
  });
});

// 数据同步状态
const syncData = async () => {
  const toastId = toast.loading('正在同步数据...');

  try {
    await synchronizeData();
    toast.success('数据同步成功', { id: toastId });
  } catch (error) {
    toast.error('数据同步失败', { id: toastId });
  }
};
```

## 💡 最佳实践

### 1. 合理使用通知类型

```tsx
// ✅ 好的做法
toast.success('保存成功'); // 明确的成功反馈
toast.error('网络请求失败'); // 明确的错误信息
toast.warning('即将超时'); // 适当的警告
toast.info('有新消息'); // 信息提醒

// ❌ 避免的做法
toast('可能成功了'); // 模糊不清的信息
toast.error('好的'); // 错误类型使用不当
```

### 2. 控制通知数量

```tsx
// ✅ 避免重复通知
let saveToastId: string | number;

const handleSave = () => {
  // 如果已有保存通知，先关闭
  if (saveToastId) {
    toast.dismiss(saveToastId);
  }

  saveToastId = toast.loading('正在保存...');
};
```

### 3. 适当的显示时长

```tsx
// ✅ 根据重要性设置时长
toast.success('保存成功', { duration: 3000 }); // 短暂显示
toast.error('严重错误', { duration: 8000 }); // 较长显示
toast.warning('重要提醒', { duration: Infinity }); // 手动关闭
```

### 4. 提供清晰的操作按钮

```tsx
// ✅ 清晰的按钮文案
toast.info('检测到新版本', {
  description: 'v2.1.0 已发布，包含重要安全更新',
  action: {
    label: '立即更新',
    onClick: () => window.location.reload(),
  },
  cancel: {
    label: '稍后提醒',
    onClick: () => scheduleReminder(),
  },
});
```

## 🔧 故障排除

### 常见问题

**Q: 通知没有显示**
A: 确保在应用根组件中添加了 `<Toaster />` 组件

**Q: 样式显示异常**  
A: 确保项目中正确配置了 Tailwind CSS 和 atom-token 颜色系统

**Q: TypeScript 类型错误**
A: 确保安装了 `@types/react` 并使用兼容的 React 版本

**Q: 通知位置不正确**
A: 检查 CSS 层级和定位样式，确保 Toaster 容器没有被其他元素遮挡

**Q: 自定义主题不生效**
A: 确保 atom-token CSS 变量已正确加载，检查主题切换逻辑

### 调试技巧

```tsx
// 启用调试模式
toast('Debug info', {
  description: `Toast ID: ${toastId}`,
  duration: Infinity, // 便于检查
});

// 检查通知数量
console.log('Active toasts:', document.querySelectorAll('[data-sonner-toast]').length);
```

## 📖 更多资源

- [Storybook 文档](https://storybook.js.org) - 查看完整的组件示例
- [Sonner 官方文档](https://sonner.emilkowal.ski/) - 了解底层实现
- [Tailwind CSS](https://tailwindcss.com) - 样式系统文档
- [React 官方文档](https://react.dev) - React 开发指南

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个组件。

## 📄 许可证

MIT © Ainvest Team
