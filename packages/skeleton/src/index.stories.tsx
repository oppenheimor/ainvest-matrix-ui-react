import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './index';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 定义
Skeleton 骨架屏为基础组件之一；在内容加载完成前，用动画效果预显示页面结构，降低用户等待焦虑，提升感知性能。支持四种预设样式和智能性能优化。

## 组件类型
支持四种变体：文本骨架（text）、次要信息骨架（minor）、头像骨架（avatar）、图片骨架（image）；支持多行文本、动画控制、自定义尺寸等配置。

## 使用原则
- 在数据加载期间显示，内容加载完成后立即替换为真实内容
- 骨架结构应尽可能接近真实内容的布局
- 避免过度使用动画，考虑性能和用户体验
- 在低性能设备上自动禁用动画效果

## 组件引入
\`\`\`tsx
import { Skeleton } from '@oversea/skeleton'

<Skeleton variant="text" />
<Skeleton variant="avatar" />
<Skeleton variant="image" className="h-32" />
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
  name: '基础变体',
  parameters: {
    docs: {
      description: {
        story: '展示四种基础变体：文本骨架、次要信息骨架、头像骨架、图片骨架',
      },
    },
  },
  render: () => {
    return (
      <div className="p-4 space-y-6 w-[400px]">
        <div>
          <h3 className="mb-3 text-base font-medium text-text-primary">文本骨架</h3>
          <Skeleton variant="text" />
        </div>
        <div>
          <h3 className="mb-3 text-base font-medium text-text-primary">次要信息骨架</h3>
          <Skeleton variant="minor" />
        </div>
        <div>
          <h3 className="mb-3 text-base font-medium text-text-primary">头像骨架</h3>
          <Skeleton variant="avatar" />
        </div>
        <div>
          <h3 className="mb-3 text-base font-medium text-text-primary">图片骨架</h3>
          <Skeleton variant="image" />
        </div>
      </div>
    );
  },
};

export const Demo02: Story = {
  name: '多行文本',
  parameters: {
    docs: {
      description: {
        story: '通过 `lineCount` 属性设置多行文本，通过 `lineWidths` 控制每行宽度',
      },
    },
  },
  render: () => (
    <div className="space-y-[20px] p-4">
      <div className="w-[410px] space-y-[12px]">
        <h3 className="mb-3 text-base font-medium text-text-primary">多行文本示例</h3>
        <Skeleton variant="text" lineCount={2} lineWidths="100%" />
        <Skeleton variant="minor" lineCount={1} lineWidths={264} />
        <div className="flex justify-between">
          <Skeleton variant="minor" lineCount={1} lineWidths={145} />
          <Skeleton variant="avatar" className="rounded-[4px]" />
        </div>
      </div>
    </div>
  ),
};

export const Demo03: Story = {
  name: '不同宽度配置',
  parameters: {
    docs: {
      description: {
        story: '展示 `lineWidths` 的不同配置方式：数组、字符串、数字',
      },
    },
  },
  render: () => (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="mb-3 text-base font-medium text-text-primary">数组配置（渐变宽度）</h3>
        <Skeleton variant="text" lineCount={3} lineWidths={['100%', '80%', '60%']} />
      </div>
      <div>
        <h3 className="mb-3 text-base font-medium text-text-primary">固定像素宽度</h3>
        <Skeleton variant="text" lineCount={2} lineWidths={300} />
      </div>
      <div>
        <h3 className="mb-3 text-base font-medium text-text-primary">百分比宽度</h3>
        <Skeleton variant="minor" lineCount={1} lineWidths="75%" />
      </div>
    </div>
  ),
};

export const Demo04: Story = {
  name: '卡片布局',
  parameters: {
    docs: {
      description: {
        story: '常见的卡片布局骨架，包含图片、标题和描述信息',
      },
    },
  },
  render: () => (
    <div className="w-[460px] space-y-[12px] p-4">
      <h3 className="text-base font-medium text-text-primary">卡片骨架</h3>
      <Skeleton variant="image" className="h-[258px]" />
      <Skeleton variant="text" lineCount={2} lineWidths={['100%', '70%']} />
      <Skeleton variant="minor" lineCount={1} lineWidths="40%" />
    </div>
  ),
};

export const Demo05: Story = {
  name: '列表布局',
  parameters: {
    docs: {
      description: {
        story: '常见的列表项骨架，包含头像、标题和副标题',
      },
    },
  },
  render: () => (
    <div className="p-4 space-y-4">
      <h3 className="mb-3 text-base font-medium text-text-primary">列表骨架</h3>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-[12px]">
          <Skeleton variant="text" className="w-[136px] h-[18px]" />
          <div className="flex items-center">
            <Skeleton variant="avatar" className="w-[20px] h-[20px]" />
            <Skeleton
              variant="avatar"
              className="w-[20px] h-[20px] ml-[-4px] outline outline-white outline-solid outline-offset-0 dark:outline-[#171717]"
            />
          </div>
          <div className="flex gap-[16px] items-center ml-[60px]">
            <Skeleton variant="text" className="w-[64px] h-[20px]" />
            <Skeleton variant="minor" className="w-[300px] h-[18px]" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Demo07: Story = {
  name: '动画控制',
  parameters: {
    docs: {
      description: {
        story: '通过 `showShimmer` 属性控制光泽效果的开启和关闭',
      },
    },
  },
  render: () => (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="mb-3 text-base font-medium text-text-primary">启用光泽效果</h3>
        <Skeleton variant="text" showShimmer={true} />
      </div>
      <div>
        <h3 className="mb-3 text-base font-medium text-text-primary">禁用光泽效果</h3>
        <Skeleton variant="text" showShimmer={false} />
      </div>
    </div>
  ),
};

export const Demo08: Story = {
  name: '自定义尺寸',
  parameters: {
    docs: {
      description: {
        story: '通过 `className` 自定义不同的尺寸和样式',
      },
    },
  },
  render: () => (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="mb-3 text-base font-medium text-text-primary">不同尺寸头像</h3>
        <div className="flex items-center space-x-3">
          <Skeleton variant="avatar" className="w-6 h-6" />
          <Skeleton variant="avatar" className="w-8 h-8" />
          <Skeleton variant="avatar" className="w-12 h-12" />
          <Skeleton variant="avatar" className="w-16 h-16" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-base font-medium text-text-primary">不同高度图片</h3>
        <div className="space-y-3">
          <Skeleton variant="image" className="w-full h-20" />
          <Skeleton variant="image" className="w-full h-32" />
          <Skeleton variant="image" className="w-full h-48" />
        </div>
      </div>
    </div>
  ),
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
| variant | 骨架屏变体类型 | 'text' \/ 'minor' \/ 'avatar' \/ 'image' | 'text' | 否 |
| showShimmer | 是否显示光泽动画效果 | boolean | true | 否 |
| className | 自定义类名 | string | - | 否 |
| lineCount | 内容行数（仅 text/minor 变体有效） | number | 1 | 否 |
| lineWidths | 每行宽度（仅 text/minor 变体有效） | (string \/ number)[] \/ string \/ number | - | 否 |
| lineHeights | 每行高度（仅 text/minor 变体有效） | (string \/ number)[] \/ string \/ number | - | 否 |
`,
      },
    },
  },
};
