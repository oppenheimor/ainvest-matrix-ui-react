import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar } from "./index";
import { snackbar } from "./hooks/useSnackbar";

const meta: Meta<typeof Snackbar> = {
  title: "Example/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
Snackbar 轻量级通知组件，用于向用户显示简短的反馈消息。它们出现在屏幕底部或顶部，会自动消失，也可以手动关闭。

## 组件类型
支持 5 种状态类型：成功、错误、警告、信息、加载状态；支持顶部中央和底部中央两种位置；支持带操作按钮的交互式通知。

## 使用原则
- 用于显示简短的反馈消息，不要用于重要的错误信息
- 消息应该简洁明了，避免过长的文本
- 同时只显示一个 snackbar，避免堆叠
- 重要操作建议提供撤销或重试按钮
- 点击 snackbar 可以手动关闭

## 组件引入
\`\`\`tsx
import { Snackbar, snackbar } from '@ainvest/snackbar'

// 在应用根组件中添加 Snackbar 组件
<Snackbar />

// 调用方法显示通知
snackbar.success('Operation successful')
snackbar.error('Operation failed')
snackbar.warning('Warning message')
snackbar.info('Information message')
snackbar.loading('Loading...')
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: "基本使用",
  parameters: {
    docs: {
      disable: true, 
      description: {
        story: "展示 5 种不同状态的 snackbar 通知，每种都有对应的彩色图标。点击按钮触发不同类型的通知。也支持直接调用方式，享受 Sonner 的原生功能。",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <Snackbar position="bottom-center" />
        
        <div className="space-y-2">
          <div className="flex gap-3">
            <button
              onClick={() => snackbar.success('操作成功！',{className:"!w-[200px]"})} 
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              成功通知
            </button>
            <button
              onClick={() => snackbar.error('操作失败，请重试',{className:"!w-[200px]"})} 
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              错误通知
            </button>
            <button
              onClick={() => snackbar.warning('请注意数据变化',{className:"!w-[200px]"})} 
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              警告通知
            </button>
            <button
              onClick={() => snackbar.info('这是一条提示信息',{className:"!w-[200px]"})} 
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              信息通知
            </button>
            <button
              onClick={() => snackbar.loading('正在加载...',{className:"!w-[200px]"})} 
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              加载通知
            </button>
          </div>
          <button
              onClick={() => snackbar("简单消息",{className:"!w-[90px]"})} 
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              简单消息
          </button>
        </div>    
      </div>
    );
  },
};

export const WithAction: Story = {
  name: "带操作按钮",
  parameters: {
    docs: {
      disable: true, 
      description: {
        story: "展示带有操作按钮的 snackbar，用户可以点击操作按钮执行相关动作，如撤销、重试等。",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <Snackbar position="bottom-center" />
        <div className="flex gap-3">
          <button
            onClick={() => snackbar.success('文件删除成功', {
              action: {
                label: '撤销',
                onClick: () => alert('撤销删除操作')
              }
            })}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            删除文件（带撤销）
          </button>
          <button
            onClick={() => snackbar.error('保存失败', {
              action: {
                label: '重试',
                onClick: () => console.log('重试保存操作')
              }
            })}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            保存文件（带重试）
          </button>
        </div>
      </div>
    );
  },
};

export const JSXAction: Story = {
  name: "JSX 操作按钮",
  parameters: {
    docs: {
      disable: true, 
      description: {
        story: "展示 action 选项的两种用法：传统的对象格式和新的 JSX 格式。JSX 格式允许传入任意的 React 组件作为操作按钮。",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <Snackbar position="bottom-center" />
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => snackbar.success('传统对象格式操作按钮', {
              action: {
                label: '撤销',
                onClick: () => alert('传统格式按钮被点击!')
              }
            })}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            对象格式操作按钮
          </button>
          
          <button
            onClick={() => snackbar.info('JSX格式操作按钮', {
              action: (
                <button 
                  onClick={() => alert('JSX格式按钮被点击!')}
                  className="rounded-[40px] bg-[#3371FF] text-white py-[5px] px-[8px] text-sm ml-auto"
                >
                  Button
                </button>
              )
            })}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            JSX格式操作按钮
          </button>
        
        </div>
      </div>
    );
  },
};

export const Position: Story = {
  name: "位置演示",
  parameters: {
    docs: {
      disable: true, 
      description: {
        story: "展示 snackbar 在顶部中央和底部中央两种不同位置的显示效果。容器高度足够大以便观察位置差异。",
      },
    },
  },
  render: () => {
    const [position, setPosition] = React.useState<'top-center' | 'bottom-center'>('bottom-center');
    
    return (
      <div className="flex flex-col gap-8" style={{ minHeight: '300px' }}>
        <Snackbar position={position} />
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setPosition('top-center');
              snackbar.info('顶部中央位置显示',{className:"!w-[200px]"});
            }}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            顶部中央位置
          </button>
          <button
            onClick={() => {
              setPosition('bottom-center');
              snackbar.info('底部中央位置显示',{className:"!w-[200px]", position:"bottom-center"});
            }}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            底部中央位置
          </button>
        </div>
      </div>
    );
  },
};

export const ClickToClose: Story = {
  name: "点击关闭",
  parameters: {
    docs: {
      disable: true, 
      description: {
        story: "展示设置 clickToClose: true 后，用户可以点击 snackbar 手动关闭的交互功能。需要明确设置该参数才能启用点击关闭。",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <Snackbar position="bottom-center" />
        <div className="flex flex-col gap-3 items-center">
          <button
            onClick={() => snackbar.info('点击我可以关闭这条消息',{clickToClose: true})}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            显示可关闭消息
          </button>
        </div>
      </div>
    );
  },
};

export const Duration: Story = {
  name: "显示时长",
  parameters: {
    docs: {
      disable: true, 
      description: {
        story: "展示通过 duration 参数控制 snackbar 显示时长的功能。可以设置不同的毫秒数来控制自动关闭时间。",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <Snackbar position="bottom-center" />
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => snackbar.info('1秒后自动关闭', {
              duration: 1000
            })}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            1秒显示
          </button>
          
          <button
            onClick={() => snackbar.info('3秒后自动关闭', {
              duration: 3000
            })}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            3秒显示
          </button>
          
          <button
            onClick={() => snackbar.info('8秒后自动关闭', {
              duration: 8000
            })}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            8秒显示
          </button>
          
          <button
            onClick={() => snackbar.info('永不自动关闭，需手动关闭', {
              duration: Infinity,
              clickToClose: true
            })}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            永不关闭
          </button>
        </div>
      </div>
    );
  },
};

export const API: Story = {
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: "docs",
    docs: {
      description: {
        story: `
| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|------|------|------|--------|--------|
| position | 显示位置 | \`bottom-center | top-center\` | \`'bottom-center'\` | \`'top-center'\`<br/>\`'bottom-center'\` |
| action | 操作按钮配置 | \`{ label: string; onClick: () => void }\` 或 \`React.ReactNode\` | - | - |
| duration | 显示时长(毫秒) | \`number\` | \`4000\` | - |
| clickToClose | 是否可点击关闭 | \`boolean\` | \`false\` | \`true\`<br/>\`false\` |
| className | 自定义样式类名 | \`string\` | - | - |
`,
      },
    },
  },
  render: () => {
    return null;
  },
}; 