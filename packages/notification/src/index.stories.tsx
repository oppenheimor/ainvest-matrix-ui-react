'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, toast } from './index';
import { Button } from '../../button';

const meta: Meta<typeof Toaster> = {
  title: 'Interaction/Notification',
  component: Toaster,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 定义
Notification 通知是一种重要的用户界面组件，用于向用户传达系统状态、操作结果或重要信息。它通常显示在屏幕的固定位置（如右上角），具有较强的视觉突出性，能够及时引起用户注意。

## 组件类型
- **基础通知**：包含标题和描述的基本通知形式
- **状态通知**：success、error、warning、info、loading 五种状态类型
- **操作通知**：带有 action/cancel 按钮的交互式通知
- **Promise 通知**：处理异步操作状态的智能通知
- **自定义通知**：支持完全自定义内容和样式的通知

## 使用原则
- 用于重要的系统级通知，需要用户关注但不阻断操作流程
- 通知内容应简洁明了，避免冗长的文字描述
- 合理使用不同状态类型，准确传达信息的重要程度和性质
- 适当设置显示时长，平衡用户体验和信息传达效果
- 避免同时显示过多通知，防止信息过载

  ## 组件引入
  \`\`\`tsx
  import { Toaster, toast } from '@oversea/notification';

  // 在布局中添加 Toaster
  <Toaster />

  // 使用 toast 显示通知
  toast('消息内容', {
    description: '详细描述信息'
  });

  // 状态通知
  toast.success('操作成功');
  toast.error('操作失败');
  toast.warning('警告信息');
  toast.info('提示信息');
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo01: Story = {
  name: '基础用法',
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story: '最基本的通知用法，包含标题和描述信息。通知会显示在屏幕右下角，默认为永久显示直到手动关闭。',
      },
    },
  },
  render: () => (
    <div className="h-[400px]">
      <Button
        onClick={() =>
          toast('基础通知', {
            description: '这是一条基础通知消息，展示了最简单的使用方式',
          })
        }
      >
        显示基础通知
      </Button>
      <Toaster />
    </div>
  ),
};

export const Demo02: Story = {
  name: '通知状态类型',
  parameters: {
    docs: {
      description: {
        story: '支持多种状态类型的通知，每种状态都有对应的图标和颜色，帮助用户快速理解信息的性质和重要程度。',
      },
    },
  },
  render: () => (
    <div className="h-[300px] flex items-center justify-center gap-4">
      <Button onClick={() => toast.success('成功通知', { description: '操作已成功完成' })} variant="default">
        Success
      </Button>
      <Button onClick={() => toast.error('错误通知', { description: '操作执行失败，请重试' })}>Error</Button>
      <Button onClick={() => toast.warning('警告通知', { description: '请注意相关风险提示' })}>
        Warning
      </Button>
      <Button onClick={() => toast.info('信息通知', { description: '这是一条重要的提示信息' })}>Info</Button>
      <Button
        onClick={() => {
          const toastId = toast.loading('加载中...', { description: '正在处理请求，请稍候' });
          setTimeout(() => toast.dismiss(toastId), 3000);
        }}
      >
        Loading
      </Button>
      <Toaster />
    </div>
  ),
};

export const Demo03: Story = {
  name: '带操作按钮',
  parameters: {
    docs: {
      description: {
        story: '通知可以包含操作按钮，支持用户直接在通知中进行确认、取消等操作，提升交互体验和操作效率。',
      },
    },
  },
  render: () => (
    <div>
      <Button
        onClick={() => {
          const toastId = toast.info('确认删除操作', {
            description: '此操作不可撤销，删除后数据将无法恢复，请谨慎操作',
            action: {
              label: '确认删除',
              onClick: () => {
                toast.dismiss(toastId);
                toast.success('删除成功', { description: '数据已永久删除' });
              },
            },
            cancel: {
              label: '取消',
              onClick: () => {
                toast.dismiss(toastId);
              },
            },
          });
        }}
      >
        显示操作通知
      </Button>
      <Toaster />
    </div>
  ),
};

export const Demo04: Story = {
  name: 'Promise 异步处理',
  parameters: {
    docs: {
      description: {
        story: 'Promise 通知能够自动处理异步操作的不同状态，从加载中到成功或失败，为用户提供完整的操作反馈。',
      },
    },
  },
  render: () => {
    const mockAsyncOperation = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5
            ? resolve({ count: Math.floor(Math.random() * 100) })
            : reject(new Error('网络连接超时'));
        }, 2000);
      });

    return (
      <div className="h-[300px] flex items-center justify-center">
        <Button
          onClick={() => {
            toast.promise(mockAsyncOperation(), {
              loading: '正在处理请求...',
              success: (data: any) => `请求成功！获取到 ${data.count} 条记录`,
              error: (err: Error) => `请求失败：${err.message}`,
            });
          }}
        >
          触发异步操作
        </Button>
        <Toaster />
      </div>
    );
  },
};

export const Demo05: Story = {
  name: '自定义内容',
  parameters: {
    docs: {
      description: {
        story: '支持完全自定义的通知内容，您可以传入任何 React 组件作为通知内容，实现复杂的布局和交互。',
      },
    },
  },
  render: () => (
    <div>
      <Button
        onClick={() =>
          toast.custom(id => (
            <div className="flex gap-4 items-centerbg-foreground-layer1">
              <div className="flex justify-center items-center w-12 h-12 text-xl text-white rounded-full bg-brand-primary">
                🎉
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">恭喜您！</h3>
                <p className="mt-1 text-sm text-text-secondary">成功解锁新成就：「通知大师」</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 text-xs rounded bg-transparent-blue text-blue">+100 积分</span>
                  <span className="px-2 py-1 text-xs rounded bg-transparent-gold text-gold">稀有徽章</span>
                </div>
              </div>
              <button
                onClick={() => toast.dismiss(id)}
                className="transition-colors text-text-tertiary hover:text-text-primary"
              >
                ✕
              </button>
            </div>
          ))
        }
      >
        显示自定义通知
      </Button>
      <Toaster />
    </div>
  ),
};

export const Demo06: Story = {
  name: '显示位置配置',
  parameters: {
    docs: {
      description: {
        story: '通知支持多种显示位置，可以根据应用布局和用户习惯选择最合适的位置显示通知。',
      },
    },
  },
  render: () => (
    <div className="flex gap-4">
      <Toaster />
      {[
        { position: 'top-left', label: '左上角' },
        { position: 'top-center', label: '顶部居中' },
        { position: 'top-right', label: '右上角' },
        { position: 'bottom-left', label: '左下角' },
        { position: 'bottom-center', label: '底部居中' },
        { position: 'bottom-right', label: '右下角' },
      ].map(({ position, label }) => (
        <Button
          key={position}
          size="sm"
          onClick={() =>
            toast(`${label}通知`, {
              description: `这是显示在${label}的通知消息`,
              position: position as any,
              duration: 3000,
            })
          }
        >
          {label}
        </Button>
      ))}
    </div>
  ),
};

export const Demo07: Story = {
  name: '持续时间控制',
  parameters: {
    docs: {
      description: {
        story: '可以灵活控制通知的显示时长，根据信息的重要程度和用户需求设置合适的持续时间。',
      },
    },
  },
  render: () => (
    <div className="flex gap-4 justify-center items-center">
      <Button
        onClick={() =>
          toast.info('短暂提示', {
            description: '此消息将在 2 秒后自动消失',
            duration: 2000,
          })
        }
        size="sm"
      >
        2秒自动关闭
      </Button>
      <Button
        onClick={() =>
          toast.warning('重要提醒', {
            description: '此消息将在 5 秒后自动消失',
            duration: 5000,
          })
        }
        size="sm"
      >
        5秒自动关闭
      </Button>
      <Button
        onClick={() =>
          toast.error('严重错误', {
            description: '此消息需要手动关闭，请注意处理',
            duration: Infinity,
          })
        }
        size="sm"
      >
        手动关闭
      </Button>
      <Toaster />
    </div>
  ),
};

export const API: Story = {
  tags: ['autodocs', '!dev'],
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
    docs: {
      description: {
        story: `
## Toaster 组件属性

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| position | 通知显示位置 | \`'top-left'\` \\| \`'top-center'\` \\| \`'top-right'\` \\| \`'bottom-left'\` \\| \`'bottom-center'\` \\| \`'bottom-right'\` | \`'bottom-right'\` | 否 |
| expand | 是否展开显示多条通知 | \`boolean\` | \`false\` | 否 |
| richColors | 是否使用丰富的颜色主题 | \`boolean\` | \`false\` | 否 |
| closeButton | 是否显示关闭按钮 | \`boolean\` | \`true\` | 否 |
| toastOptions | 全局通知选项配置 | \`ToastOptions\` | \`-\` | 否 |

## toast 方法选项

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| description | 通知描述内容 | \`string\` \\| \`React.ReactNode\` | \`-\` | 否 |
| duration | 显示时长（毫秒） | \`number\` | \`Infinity\` | 否 |
| position | 单独设置此通知的位置 | \`ToastPosition\` | \`-\` | 否 |
| action | 操作按钮配置 | \`{ label: string; onClick: () => void }\` | \`-\` | 否 |
| cancel | 取消按钮配置 | \`{ label: string; onClick: () => void }\` | \`-\` | 否 |
| onDismiss | 通知关闭时的回调函数 | \`() => void\` | \`-\` | 否 |
| onAutoClose | 通知自动关闭时的回调函数 | \`() => void\` | \`-\` | 否 |
| className | 自定义 CSS 类名 | \`string\` | \`-\` | 否 |
| style | 自定义内联样式 | \`React.CSSProperties\` | \`-\` | 否 |

## ToastOptions 完整属性

\`ToastOptions\` 类型包含 toast 方法的所有可配置选项：

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| description | 通知描述内容 | \`string\` \\| \`React.ReactNode\` | \`-\` | 否 |
| duration | 显示时长（毫秒） | \`number\` | \`4000\` | 否 |
| position | 单独设置此通知的位置 | \`ToastPosition\` | \`-\` | 否 |
| action | 操作按钮配置 | \`{ label: string; onClick: () => void }\` | \`-\` | 否 |
| cancel | 取消按钮配置 | \`{ label: string; onClick: () => void }\` | \`-\` | 否 |
| onDismiss | 通知关闭时的回调函数 | \`(id: string \\| number) => void\` | \`-\` | 否 |
| onAutoClose | 通知自动关闭时的回调函数 | \`(id: string \\| number) => void\` | \`-\` | 否 |
| className | 自定义 CSS 类名 | \`string\` | \`-\` | 否 |
| style | 自定义内联样式 | \`React.CSSProperties\` | \`-\` | 否 |
| icon | 自定义图标 | \`React.ReactNode\` | \`-\` | 否 |
| id | 自定义通知 ID | \`string\` \\| \`number\` | \`-\` | 否 |
| dismissible | 是否允许用户关闭 | \`boolean\` | \`true\` | 否 |
| closeButton | 是否显示关闭按钮 | \`boolean\` | \`false\` | 否 |
| invert | 反转颜色主题 | \`boolean\` | \`false\` | 否 |
| important | 标记为重要（无障碍支持） | \`boolean\` | \`false\` | 否 |
| unstyled | 移除默认样式（便于自定义） | \`boolean\` | \`false\` | 否 |

## ToastPosition 类型

\`ToastPosition\` 定义通知可显示的位置：

\`\`\`typescript
type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
\`\`\`

**位置说明**：
- \`top-left\`: 屏幕左上角
- \`top-center\`: 屏幕顶部中央
- \`top-right\`: 屏幕右上角
- \`bottom-left\`: 屏幕左下角
- \`bottom-center\`: 屏幕底部中央
- \`bottom-right\`: 屏幕右下角（默认）

## Promise 通知选项

| 属性 | 说明 | 类型 | 必填 |
|------|------|------|------|
| loading | 加载状态时显示的文案 | \`string\` \\| \`React.ReactNode\` | ✅ |
| success | 成功状态时显示的文案 | \`string\` \\| \`((data: T) => string \| React.ReactNode)\` | ✅ |
| error | 错误状态时显示的文案 | \`string\` \\| \`((error: any) => string \| React.ReactNode)\` | ✅ |
| finally | Promise 完成时的回调函数 | \`() => void\` | ❌ |

## 通知方法

| 方法 | 说明 | 返回值 |
|------|------|--------|
| \`toast(message, options?)\` | 显示基础通知 | \`string \| number\` |
| \`toast.success(message, options?)\` | 显示成功通知 | \`string \| number\` |
| \`toast.error(message, options?)\` | 显示错误通知 | \`string \| number\` |
| \`toast.warning(message, options?)\` | 显示警告通知 | \`string \| number\` |
| \`toast.info(message, options?)\` | 显示信息通知 | \`string \| number\` |
| \`toast.loading(message, options?)\` | 显示加载通知 | \`string \| number\` |
| \`toast.promise(promise, options)\` | 处理 Promise 状态通知 | \`string \| number\` |
| \`toast.custom(render, options?)\` | 显示自定义内容通知 | \`string \| number\` |
| \`toast.dismiss(id?)\` | 关闭指定或全部通知 | \`void\` |

## 类型使用示例

### ToastOptions 使用示例

\`\`\`typescript
import { toast, ToastOptions } from '@oversea/notification';

// 定义完整的 ToastOptions 配置
const options: ToastOptions = {
  description: '这是一条详细的描述信息',
  duration: 5000,
  position: 'top-center',
  closeButton: true,
  icon: <CustomIcon />,
  onDismiss: (id) => console.log(\`Toast \${id} dismissed\`),
  onAutoClose: (id) => console.log(\`Toast \${id} auto closed\`),
  action: {
    label: '查看详情',
    onClick: () => console.log('查看详情被点击'),
  },
  cancel: {
    label: '取消',
    onClick: () => console.log('取消被点击'),
  },
  className: 'custom-toast',
  style: { backgroundColor: '#f0f0f0' },
};

// 使用配置显示通知
toast('通知标题', options);
\`\`\`

### ToastPosition 使用示例

\`\`\`typescript
import { ToastPosition } from '@oversea/notification';

// 定义所有可用位置
const positions: ToastPosition[] = [
  'top-left',
  'top-center', 
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

// 遍历显示不同位置的通知
positions.forEach((position, index) => {
  toast(\`位置 \${index + 1}\`, {
    description: \`显示在\${position}的通知\`,
    position,
    duration: 3000,
  });
});

// 全局设置位置
<Toaster position="top-center" />
\`\`\`

### 实际应用示例

\`\`\`typescript
// 表单提交处理
const handleSubmit = async (formData: FormData) => {
  const options: ToastOptions = {
    position: 'top-center',
    duration: 4000,
    closeButton: true,
  };

  const submitPromise = submitForm(formData);
  
  toast.promise(submitPromise, {
    loading: '正在提交表单...',
    success: '提交成功！',
    error: (err) => \`提交失败：\${err.message}\`,
  });
};

// 状态通知配置
const notificationConfig: ToastOptions = {
  position: 'bottom-right',
  duration: Infinity,
  closeButton: true,
  important: true,
};

toast.error('网络连接失败', {
  ...notificationConfig,
  description: '请检查网络设置后重试',
  action: {
    label: '重试',
    onClick: () => window.location.reload(),
  },
});
\`\`\`
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
