import type { Meta, StoryObj } from "@storybook/react";
import { FloorTitle } from "./index";
import { SharedIcon } from "./components/stories/SharedIcon";
import { ArrowRightIconMap } from "./components/stories/ArrowRightIcon";
import { FloorTitleProps } from "./types";

const meta: Meta<typeof FloorTitle> = {
  title: "Example/FloorTitle",
  component: FloorTitle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
FloorTitle 组件是一个用于页面结构中构建楼层标题的组件，它提供了丰富的功能和灵活的使用方式。支持一级、二级、三级标题层级，每个层级会自动应用对应的样式。组件包含标题名、标题描述和楼层操作区域，组件还可设置为可折叠状态，点击时会展开/折叠楼层的描述或内容。同时支持层级嵌套，方便构建复杂的页面结构。

## 组件类型
- 标题层级：支持 1 - 3 级标题，不同的层级会自动应用相应的样式，以区分标题的重要性和层次结构
- 标题：楼层标题，通过 title 属性设置文本内容，通过 onTitleXxxx 绑定事件，通过 titleClassName 设置额外样式
- 标题icon：可通过 titleIcon 属性设置标题icon
- 描述文本：楼层描述信息，通过 description 属性设置
- 可折叠状态：支持折叠功能，可通过 collapseMode 属性指定折叠模式（description、content和all分别代表描述、内容和全部），还可通过 defaultCollapsed 属性指定默认折叠状态
- 操作区域：可通过 actionBarElement 属性设置操作栏元素

## 使用原则
- **层级连贯性**：保持标题层级清晰，避免跳过层级使用
- **操作区域适度**：最好放置图标类型的元素
- **明确折叠内容**：明晰需要折叠和展开的内容
- **整体样式**：不同楼层的间距应自定义，组件不提供层级间的默认间距

## 组件引入
\`\`\`tsx
import { FloorTitle } from '@oversea/floor-title';

// 基础用法
<FloorTitle 
  level={2}
  title='标题'
  description='这是描述文本'
/>

// 可折叠，初始状态折叠
<FloorTitle 
  level={2}
  title='可折叠标题'
  collapseMode='content'
  defaultCollapsed
/>

// 自定义操作区域
<FloorTitle 
  level={2}
  title='自定义操作区域'
  titleIcon={<ArrowRightIcon className='mr-2' />}
  actionBarElement={<SharedIcon onClick={() => console.log('click action bar')} />}
/>

// 事件绑定
<FloorTitle 
  level={2}
  title='标题'
  description='这是描述文本'
  onClick={() => console.log('click floor')}
  onTitleClick={() => console.log('click title')}
/>

// 嵌套用法
<FloorTitle level={1} title='一级标题'>
  <FloorTitle level={2} title='二级标题'>
    <FloorTitle level={3} title='三级标题' />
  </FloorTitle>
</FloorTitle>
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
  name: "基础用法",
  parameters: {
    docs: {
      description: {
        story: "展示不同级别的基础标题用法，包含标题文本和可选描述",
      },
    },
  },
  render: () => (
    <div className="mr-auto mb-auto w-full">
      <FloorTitle
        level={1}
        title="Pagetitle"
        description="Don't miss a trick with global real-time updates dashboard."
        collapseMode="all"
      >
        <FloorTitle
          level={2}
          title="Grouptitle"
          description="Don't miss a trick with global real-time updates dashboard."
          collapseMode="content"
          actionBarElement={
            <div className="flex items-center justify-center w-8 h-8">
              <SharedIcon />
            </div>
          }
          className="mt-12"
        >
          <FloorTitle
            level={3}
            title="Floortitle"
            description="Don't miss a trick with global real-time updates dashboard."
            collapseMode="description"
            className="mt-12"
          />
        </FloorTitle>
      </FloorTitle>
      <hr className="my-10 border-t border-gray-300" />
      <FloorTitle
        level={1}
        title="可折叠描述+内容"
        description="Don't miss a trick with global real-time updates dashboard."
        collapseMode="all"
      >
        <FloorTitle
          level={2}
          title="可折叠内容"
          description="Don't miss a trick with global real-time updates dashboard."
          collapseMode="content"
          className="mt-12"
        >
          <FloorTitle
            level={3}
            title="可折叠描述"
            description="Don't miss a trick with global real-time updates dashboard."
            collapseMode="description"
            className="mt-12"
          />
        </FloorTitle>
      </FloorTitle>
    </div>
  ),
};

export const FirstLevl: Story = {
  name: "一级标题",
  parameters: {
    docs: {
      description: {
        story: "展示一级标题的用法",
      },
    },
  },
  render: () => {
    const Level = 1;
    return (
      <div className="mr-auto mb-auto w-full">
        <FloorTitle
          level={Level}
          title="Pagetitle"
          description="Don't miss a trick with global real-time updates dashboard."
          titleIcon={ArrowRightIconMap[Level]}
        />
        <FloorTitle
          level={Level}
          title="Pagetitle"
          description="Don't miss a trick with global real-time updates dashboard."
          className="mt-[53px]"
          collapseMode="description"
          defaultCollapsed
        />
        <FloorTitle
          level={Level}
          title="Pagetitle"
          actionBarElement={
            <div className="flex items-center justify-center w-8 h-8">
              <SharedIcon />
            </div>
          }
          className="mt-[53px]"
        />
        <hr className="my-10 border-t border-gray-300" />
        <FloorTitle
          level={Level}
          title="自定义标题右侧图标"
          description="Don't miss a trick with global real-time updates dashboard."
          titleIcon={ArrowRightIconMap[1]}
        />
        <FloorTitle
          level={Level}
          title="可折叠描述"
          description="Don't miss a trick with global real-time updates dashboard."
          className="mt-[53px]"
          collapseMode="description"
          defaultCollapsed
        />
        <FloorTitle
          level={Level}
          title="自定义操作栏图标"
          actionBarElement={
            <div className="flex items-center justify-center w-8 h-8">
              <SharedIcon />
            </div>
          }
          className="mt-[53px]"
        />
      </div>
    );
  },
};

export const Level2: Story = {
  name: "二级标题",
  parameters: {
    docs: {
      description: {
        story: "展示二级标题的用法",
      },
    },
  },
  render: () => {
    const Level = 2;
    return (
      <div className="mr-auto mb-auto w-full">
        <FloorTitle
          level={Level}
          title="Grouptitle"
          description="Don't miss a trick with global real-time updates dashboard."
          titleIcon={ArrowRightIconMap[Level]}
        />
        <FloorTitle
          level={Level}
          title="Grouptitle"
          description="Don't miss a trick with global real-time updates dashboard."
          className="mt-[53px]"
          collapseMode="description"
          defaultCollapsed
        />
        <FloorTitle
          level={Level}
          title="Grouptitle"
          actionBarElement={
            <div className="flex items-center justify-center w-8 h-8">
              <SharedIcon />
            </div>
          }
          className="mt-[53px]"
        />
        <hr className="my-10 border-t border-gray-300" />
        <FloorTitle
          level={Level}
          title="自定义标题右侧图标"
          description="Don't miss a trick with global real-time updates dashboard."
          titleIcon={ArrowRightIconMap[Level]}
        />
        <FloorTitle
          level={Level}
          title="可折叠描述"
          description="Don't miss a trick with global real-time updates dashboard."
          className="mt-[53px]"
          collapseMode="description"
          defaultCollapsed
        />
        <FloorTitle
          level={Level}
          title="自定义操作栏图标"
          actionBarElement={
            <div className="flex items-center justify-center w-8 h-8">
              <SharedIcon />
            </div>
          }
          className="mt-[53px]"
        />
      </div>
    );
  },
};

export const Level3: Story = {
  name: "三级标题",
  parameters: {
    docs: {
      description: {
        story: "展示三级标题的用法",
      },
    },
  },
  render: () => {
    const Level = 3;
    return (
      <div className="mr-auto mb-auto w-full">
        <FloorTitle
          level={Level}
          title="Floortitle"
          description="Don't miss a trick with global real-time updates dashboard."
          titleIcon={ArrowRightIconMap[Level]}
        />
        <FloorTitle
          level={Level}
          title="Floortitle"
          description="Don't miss a trick with global real-time updates dashboard."
          className="mt-[53px]"
          collapseMode="description"
          defaultCollapsed
        />
        <FloorTitle
          level={Level}
          title="Floortitle"
          actionBarElement={
            <div className="flex items-center justify-center w-8 h-8">
              <SharedIcon />
            </div>
          }
          className="mt-[53px]"
        />
        <hr className="my-10 border-t border-gray-300" />
        <FloorTitle
          level={Level}
          title="自定义标题右侧图标"
          description="Don't miss a trick with global real-time updates dashboard."
          titleIcon={ArrowRightIconMap[2]}
        />
        <FloorTitle
          level={Level}
          title="可折叠描述"
          description="Don't miss a trick with global real-time updates dashboard."
          className="mt-[53px]"
          collapseMode="description"
          defaultCollapsed
        />
        <FloorTitle
          level={Level}
          title="自定义操作栏图标"
          actionBarElement={
            <div className="flex items-center justify-center w-8 h-8">
              <SharedIcon />
            </div>
          }
          className="mt-[53px]"
        />
      </div>
    );
  },
};

export const Interactive: Story = {
  name: "交互式",
  parameters: {
    docs: {
      description: {
        story: "可以自由更改 FloorTitle 组件的属性，实时查看效果。",
      },
    },
  },
  args: {
    level: 1,
    title: "Floortitle",
    description: "Don't miss a trick with global real-time updates dashboard.",
    collapseMode: "description",
    defaultCollapsed: true,
  },
  argTypes: {
    level: {
      control: "radio",
      options: [1, 2, 3],
    },
    collapseMode: {
      control: "radio",
      options: ["none", "description", "content", "all"],
    },
  },
  render: (args: FloorTitleProps) => {
    return (
      <div className="mr-auto mb-auto w-full">
        <FloorTitle {...args} />
      </div>
    );
  },
};

export const API: Story = {
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
    docs: {
      description: {
        story: `
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| level | 标题级别 | 1 \\\| 2 \\\| 3 | - | 是 |
| title | 标题文本 | string | - | 是 |
| titleIcon | 标题右侧自定义图标 | ReactNode | - | 否 |
| titleClassName | 标题额外样式 | string | - | 否 |
| description | 描述文本 | string | - | 否 |
| collapseMode | 折叠模式 | "none" \\\| "content" \\\| "description" \\\| "all" | 'none' | 否 |
| defaultCollapsed | 初始折叠状态 | boolean | false | 否 |
| actionBarElement | 操作栏图标 | ReactNode | - | 否 |
| ...div标签原生属性 | 其他属性，参考div标签 | - | - | 否 |
| ...title标签原生属性 | 绑定在title上的自定义事件，如onTitleClick、onTitleDoubleClick等 | - | - | 否 |
`,
      },
    },
  },
  render: () => null,
};
