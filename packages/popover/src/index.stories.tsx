import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Popover from './index';
import { Button } from '../../button';

const meta: Meta<typeof Popover> = {
  title: 'Interaction/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 定义

基于 Radix UI 的卡片式弹出框组件，用于显示复杂的悬浮内容和交互操作。相比 Tooltip，Popover 支持更丰富的内容和用户交互。

## 组件类型

- **内容丰富性**: 支持文本、图片、按钮、表单等复杂内容展示
- **交互能力**: 用户可以与弹框内容进行完整的交互操作
- **智能定位**: 自动计算最佳显示位置，支持 top、bottom、left、right 四个方向
- **灵活控制**: 支持受控和非受控模式，可配置多种关闭行为

## 使用原则

- **内容复杂度**: 适用于需要展示复杂内容（按钮、表单、图片等）的场景
- **交互需求**: 当用户需要与弹出内容进行交互时使用
- **替代关系**: 简单文本提示优先使用 Tooltip，复杂交互内容使用 Popover
- **内容设计**: 保持内容简洁明了，避免信息过载影响用户体验

## 组件引入
\`\`\`tsx
import { Popover } from '@oversea/popover'

<Popover title="标题" content="提示内容">
  <Button>触发元素</Button>
</Popover>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo01: Story = {
  name: '带标题的弹框',
  parameters: {
    docs: {
      description: {
        story: '可以添加可选的 title 属性显示标题',
      },
    },
  },
  render: () => {
    return (
      <Popover title="弹框标题" content="这里是弹框的内容区域，可以放置任意的文本或组件内容。">
        <Button>带标题的弹框</Button>
      </Popover>
    );
  },
};

export const Demo02: Story = {
  name: '默认打开（非受控）',
  parameters: {
    docs: {
      description: {
        story: '使用 defaultOpen 属性设置默认打开状态，组件内部管理状态（非受控模式）',
      },
    },
  },
  render: () => {
    return (
      <div className="flex gap-4">
        <Popover content="我默认是关闭的">
          <Button>默认关闭</Button>
        </Popover>
        <Popover defaultOpen content="我默认是打开的，点击外部或按ESC关闭">
          <Button>默认打开</Button>
        </Popover>
      </div>
    );
  },
};

export const Demo03: Story = {
  name: '不同位置',
  parameters: {
    docs: {
      description: {
        story: '支持 top、bottom、left、right 四个方向的显示',
      },
    },
  },
  render: () => {
    return (
      <div className="grid grid-cols-3 gap-6 place-items-center">
        <div></div>
        <Popover content="顶部弹框" placement="top">
          <Button>顶部</Button>
        </Popover>
        <div></div>

        <Popover content="左侧弹框" placement="left">
          <Button>左侧</Button>
        </Popover>
        <div></div>
        <Popover content="右侧弹框" placement="right">
          <Button>右侧</Button>
        </Popover>

        <div></div>
        <Popover content="底部弹框" placement="bottom">
          <Button>底部</Button>
        </Popover>
        <div></div>
      </div>
    );
  },
};

export const Demo04: Story = {
  name: '复杂内容',
  parameters: {
    docs: {
      description: {
        story: '支持复杂的 React 内容，如按钮、图片、表单等',
      },
    },
  },
  render: () => {
    return (
      <Popover
        content={
          <div className="space-y-3">
            <div className="w-full bg-white/10 h-[140px] rounded-lg flex items-center justify-center text-text-inverse">
              图片预览区域
            </div>
            <p className="text-[16px] leading-[22px]">产品说明</p>
            <p className="text-sm leading-[18px]">这是一个优秀的产品，具有出色的功能和用户体验。</p>
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="secondary" className="text-text-inverse bg-white/20">
                确认
              </Button>
              <Button size="sm" className="bg-white text-text-primary hover:bg-white/90">
                取消
              </Button>
            </div>
          </div>
        }
      >
        <Button>复杂内容</Button>
      </Popover>
    );
  },
};

export const Demo05: Story = {
  name: '关闭配置',
  parameters: {
    docs: {
      description: {
        story: '可以配置点击外部或内部时的关闭行为',
      },
    },
  },
  render: () => {
    return (
      <div className="flex gap-4">
        <Popover content="点击外部不会关闭" closeOnClickOutside={false}>
          <Button>禁用外部关闭</Button>
        </Popover>
        <Popover content="点击内部会关闭" closeOnClickInside={true}>
          <Button>启用内部关闭</Button>
        </Popover>
      </div>
    );
  },
};

export const Demo06: Story = {
  name: '高级受控模式 - 多步骤流程',
  parameters: {
    docs: {
      description: {
        story: '演示受控模式在复杂多步骤流程中的应用：引导用户完成一系列操作',
      },
    },
  },
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

    const steps = [
      {
        target: 'step1',
        title: '第1步：基础设置',
        content: '首先配置基本参数。这是开始使用产品的第一步。',
        action: '开始配置',
      },
      {
        target: 'step2',
        title: '第2步：数据导入',
        content: '导入您的数据文件。支持 CSV, JSON 等多种格式。',
        action: '导入数据',
      },
      {
        target: 'step3',
        title: '第3步：确认设置',
        content: '检查配置是否正确，确认后即可开始使用。',
        action: '确认完成',
      },
    ];

    const handleStartTour = () => {
      setCurrentStep(0);
      setPopoverOpen(true);
      setCompletedSteps([]);
    };

    const handleNext = () => {
      const newCompleted = [...completedSteps, currentStep];
      setCompletedSteps(newCompleted);

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setPopoverOpen(false);
        alert('恭喜！您已完成所有步骤设置');
      }
    };

    const handleSkip = () => {
      setPopoverOpen(false);
    };

    const currentStepData = steps[currentStep];

    return (
      <div className="space-y-6">
        <div className="flex gap-2 items-center">
          <Button onClick={handleStartTour}>开始引导流程</Button>
          <span className="text-sm text-text-secondary">
            已完成: {completedSteps.length}/{steps.length} 步
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-background-layer2 border-divider-level1">
            <h3 className="mb-2 font-medium text-text-primary">基础设置</h3>
            <p className="mb-3 text-sm text-text-secondary">配置基本参数和选项</p>
            <Popover
              open={popoverOpen && currentStep === 0}
              onOpenChange={open => {
                if (!open) setPopoverOpen(false);
              }}
              title={currentStepData?.title}
              content={
                <div className="space-y-3">
                  <p className="text-sm leading-[18px]">{currentStepData?.content}</p>
                  <div className="flex gap-2 justify-between">
                    <Button
                      size="sm"
                      variant="text"
                      className="text-text-inverse bg-white/20"
                      onClick={handleSkip}
                    >
                      跳过引导
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-white text-text-primary"
                      onClick={handleNext}
                    >
                      {currentStepData?.action}
                    </Button>
                  </div>
                </div>
              }
            >
              <Button
                variant={completedSteps.includes(0) ? 'primary' : 'secondary'}
                className={completedSteps.includes(0) ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {completedSteps.includes(0) ? '✓ 已完成' : '开始设置'}
              </Button>
            </Popover>
          </div>

          <div className="p-4 rounded-lg border bg-background-layer2 border-divider-level1">
            <h3 className="mb-2 font-medium text-text-primary">数据导入</h3>
            <p className="mb-3 text-sm text-text-secondary">上传和处理数据文件</p>
            <Popover
              open={popoverOpen && currentStep === 1}
              onOpenChange={open => {
                if (!open) setPopoverOpen(false);
              }}
              title={currentStepData?.title}
              content={
                <div className="space-y-3">
                  <p className="text-sm leading-[18px]">{currentStepData?.content}</p>
                  <div className="flex gap-2 justify-between">
                    <Button
                      size="sm"
                      variant="text"
                      className="text-text-inverse bg-white/20"
                      onClick={handleSkip}
                    >
                      跳过引导
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-white text-text-primary"
                      onClick={handleNext}
                    >
                      {currentStepData?.action}
                    </Button>
                  </div>
                </div>
              }
            >
              <Button
                variant={completedSteps.includes(1) ? 'primary' : 'secondary'}
                className={completedSteps.includes(1) ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {completedSteps.includes(1) ? '✓ 已完成' : '导入数据'}
              </Button>
            </Popover>
          </div>

          <div className="p-4 rounded-lg border bg-background-layer2 border-divider-level1">
            <h3 className="mb-2 font-medium text-text-primary">确认设置</h3>
            <p className="mb-3 text-sm text-text-secondary">检查并确认所有配置</p>
            <Popover
              open={popoverOpen && currentStep === 2}
              onOpenChange={open => {
                if (!open) setPopoverOpen(false);
              }}
              title={currentStepData?.title}
              content={
                <div className="space-y-3">
                  <p className="text-sm leading-[18px]">{currentStepData?.content}</p>
                  <div className="flex gap-2 justify-between">
                    <Button
                      size="sm"
                      variant="text"
                      className="text-text-inverse bg-white/20"
                      onClick={handleSkip}
                    >
                      跳过引导
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-white text-text-primary"
                      onClick={handleNext}
                    >
                      {currentStepData?.action}
                    </Button>
                  </div>
                </div>
              }
            >
              <Button
                variant={completedSteps.includes(2) ? 'primary' : 'secondary'}
                className={completedSteps.includes(2) ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {completedSteps.includes(2) ? '✓ 已完成' : '确认完成'}
              </Button>
            </Popover>
          </div>
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
    viewMode: 'docs',
    docs: {
      description: {
        story: `
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| children | 触发元素 | React.ReactNode | - | 是 |
| content | 弹框内容 | React.ReactNode | - | 是 |
| title | 弹框标题 | React.ReactNode | - | 否 |
| placement | 显示位置 | 'top' \\| 'bottom' \\| 'left' \\| 'right' | 'bottom' | 否 |
| open | 受控模式开启状态 | boolean | - | 否 |
| defaultOpen | 默认开启状态 | boolean | false | 否 |
| onOpenChange | 开启状态改变回调 | (open: boolean) => void | - | 否 |
| className | 容器自定义类名 | string | - | 否 |
| showArrow | 显示箭头 | boolean | true | 否 |
| closeOnClickOutside | 点击外部关闭 | boolean | true | 否 |
| closeOnClickInside | 点击内部关闭 | boolean | false | 否 |
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
