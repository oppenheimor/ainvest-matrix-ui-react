import { ArrowLeft } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./index";

const meta: Meta<typeof Link> = {
  title: "Navigation/Link",
  component: Link,
  parameters: {
    layout: "centered",
    // 启用代码面板
    controls: { expanded: true },
    // 默认显示代码
    viewMode: "story",
    docs: {
      description: {
        component: `
## 定义
Link 组件用于创建可点击的超链接，支持多种视觉变体（强调、加字重、下划线）、自定义左右图标、继承 a 标签所有属性，并支持 Tailwind CSS 样式扩展。

## 组件类型
- 视觉变体：默认、强调（emphasized）、加字重（strong，可与默认态或强调态叠加）
- 图标：左侧/右侧自定义图标、默认图标
- 下划线：可选
- 支持自定义颜色/样式

## 使用原则
- 链接应清晰表达跳转目的，避免误导用户
- 重要操作建议使用强调或加字重样式
- 图标仅用于增强语义，不应替代文字

## 组件安装

\`\`\`shell
npm install @oversea/link
\`\`\`

## 组件引入
\`\`\`tsx
import { Link } from '@oversea/link';

<Link href="#">默认文本</Link>
<Link href="#" emphasized>强调文本</Link>
<Link href="#" strong>加字重文本</Link>
<Link href="#" emphasized strong>强调且加字重文本</Link>
<Link href="#" underline>下划线文本</Link>
\`\`\`
        `,
      },
      source: {
        type: "auto",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    emphasized: {
      control: "boolean",
      description: "是否强调显示",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    strong: {
      control: "boolean",
      description: "是否加粗显示",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    underline: {
      control: "boolean",
      description: "是否显示下划线",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showLinkIcon: {
      control: "boolean",
      description: "是否显示左侧链接图标",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showArrowIcon: {
      control: "boolean",
      description: "是否显示右侧箭头图标",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    iconSize: {
      control: { type: "number", min: 12, max: 32, step: 2 },
      description: "图标大小（仅对默认图标生效）",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "16" },
      },
    },
    href: {
      control: "text",
      description: "链接地址",
      table: {
        type: { summary: "string" },
      },
    },
    target: {
      control: {
        type: "select",
        options: ["_self", "_blank", "_parent", "_top"],
      },
      description: "链接打开方式",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "自定义样式类名",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: "基础用法",
  parameters: {
    // 启用 Canvas 视图的代码展示
    showPanel: true,
    docs: {
      description: {
        story: "最常见的文本链接用法，支持强调、加字重、下划线。",
      },
      source: {
        state: "open",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center text-[14px]">
      <Link href="#">默认文本</Link>
      <Link href="#" emphasized>
        强调文本
      </Link>
      <Link href="#" strong>
        加字重文本
      </Link>
      <Link href="#" emphasized strong>
        强调且加字重文本
      </Link>
      <Link href="#" underline>
        下划线文本
      </Link>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  name: "带左侧图标",
  parameters: {
    showPanel: true,
    docs: {
      description: {
        story: "展示带左侧图标的Link用法。",
      },
      source: {
        state: "open",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center text-[14px]">
      <Link href="#" showLinkIcon>
        默认左图标
      </Link>
      <Link href="#" showLinkIcon emphasized>
        强调左图标
      </Link>
      <Link href="#" showLinkIcon strong>
        加字重左图标
      </Link>
      <Link href="#" showLinkIcon emphasized strong>
        强调且加字重左图标
      </Link>
      <Link href="#" leftIcon={<ArrowLeft size={16} />}>
        自定义左图标
      </Link>
      <Link href="#" showLinkIcon className="text-base" iconSize={20}>
        放大版左侧图标
      </Link>
    </div>
  ),
};

export const WithRightIcon: Story = {
  name: "带右侧图标",
  parameters: {
    showPanel: true,
    docs: {
      description: {
        story: "展示带右侧图标的Link用法。",
      },
      source: {
        state: "open",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center text-[14px]">
      <Link href="#" showArrowIcon>
        默认右图标
      </Link>
      <Link href="#" showArrowIcon emphasized>
        强调右图标
      </Link>
      <Link href="#" showArrowIcon strong>
        加字重右图标
      </Link>
      <Link href="#" showArrowIcon emphasized strong>
        强调且加字重右图标
      </Link>
      <Link
        href="#"
        rightIcon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.7241 4.25586L14.7251 4.25684C14.8211 4.82164 15.1729 5.34313 15.7339 5.65625L15.7466 5.66309L15.0161 6.97363L15.0024 6.96582C14.0862 6.4544 13.4709 5.5967 13.27 4.63086L12.9185 3.5H11.0269L10.6606 4.69727C10.452 5.56028 9.91144 6.32784 9.12061 6.82617L8.95264 6.92578L8.93896 6.93359C8.13575 7.38178 7.23928 7.48252 6.42432 7.32422C6.40904 7.32125 6.39359 7.31789 6.37842 7.31445L4.81299 6.95898L3.90381 8.48047L4.94092 9.56543H4.93994C5.53852 10.1801 5.92139 11.0216 5.92139 11.959V11.9785C5.92127 12.9355 5.52311 13.7805 4.92529 14.3975L4.92432 14.3994L3.87842 15.4746L4.78564 16.9932L6.24268 16.6709C7.0889 16.4519 8.02906 16.5324 8.86475 16.9775L8.93994 17.0195L9.12061 17.127C9.9599 17.6608 10.5141 18.4984 10.686 19.4287L11.02 20.5H12.9263L13.2847 19.3682C13.478 18.3887 14.0977 17.5165 15.0249 16.999L15.0386 16.9922L15.1997 16.9072C15.998 16.5129 16.8834 16.4429 17.687 16.6406H17.688L19.2173 16.9883L20.1187 15.4795L19.2622 14.6084C18.5309 13.982 18.0444 13.0521 18.0444 11.9941V11.9746C18.0446 10.999 18.4581 10.1417 19.0728 9.52148L20.0913 8.47266L19.1909 6.96387L17.772 7.29395C16.9623 7.52133 16.0614 7.47254 15.2446 7.08984L15.0776 7.00684C15.0572 6.99592 15.0364 6.98498 15.0161 6.97363L15.7476 5.66406C15.7593 5.67059 15.7709 5.67729 15.7827 5.68359C16.2329 5.9234 16.7388 5.98355 17.2075 5.88965L17.4058 5.83984V5.83887L19.9175 5.25586L21.9702 8.69336L20.1489 10.5664H20.1479V10.5674H20.1489C19.7759 10.9388 19.5446 11.4311 19.5444 11.9746V11.9941C19.5444 12.6009 19.8322 13.1447 20.2856 13.5098L20.2837 13.5127L20.2866 13.5107L22.0005 15.2559L19.9478 18.6924V18.6934L17.355 18.1035L17.3638 18.0684L17.354 18.1025C16.8365 17.9686 16.2658 18.0245 15.769 18.3018L15.7554 18.3096C15.185 18.628 14.8305 19.1616 14.7417 19.7373L14.0229 22H9.91748V21.999L9.22705 19.7871C9.14616 19.1998 8.78895 18.6531 8.2085 18.3291C8.18317 18.315 8.17154 18.3081 8.15967 18.3018C7.65543 18.0331 7.08154 17.9893 6.56787 18.1357L6.56494 18.1279L6.56592 18.1357L4.05322 18.6934V18.6924H4.05225L2.00049 15.2559L3.84814 13.3535C4.20285 12.9874 4.42128 12.5072 4.42139 11.9785V11.959C4.42139 11.4351 4.20733 10.9579 3.85693 10.6025L2.03076 8.69336L4.0835 5.25586L6.71045 5.85156C7.21043 5.94866 7.74215 5.88334 8.2085 5.62305L8.22217 5.61523C8.6909 5.35349 9.01328 4.94656 9.1626 4.49023L9.21631 4.29199V4.29102L9.91748 2H14.0229L14.7241 4.25586ZM12.1548 9.00391C13.7397 9.08446 15.0005 10.3951 15.0005 12L14.9966 12.1543C14.9163 13.7393 13.6054 14.9997 12.0005 15L11.8462 14.9961C10.3122 14.9184 9.08213 13.6883 9.00439 12.1543L9.00049 12C9.00049 10.3431 10.3436 9 12.0005 9L12.1548 9.00391ZM12.0005 10.5C11.1721 10.5 10.5005 11.1716 10.5005 12C10.5005 12.8284 11.1721 13.5 12.0005 13.5C12.8287 13.4997 13.5005 12.8283 13.5005 12C13.5005 11.1717 12.8287 10.5003 12.0005 10.5Z"
              fill="currentColor"
            />
          </svg>
        }
      >
        自定义右图标
      </Link>
      <Link href="#" showArrowIcon className="text-base" iconSize={20}>
        放大版右侧图标
      </Link>
    </div>
  ),
};

export const Underline: Story = {
  name: "带下划线",
  parameters: {
    showPanel: true,
    docs: {
      description: {
        story: "通过 underline 属性显示下划线，支持与强调、加字重组合。",
      },
      source: {
        state: "open",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center text-[14px]">
      <Link href="#" underline>
        下划线链接
      </Link>
      <Link href="#" underline emphasized>
        强调下划线链接
      </Link>
      <Link href="#" underline strong>
        加字重下划线链接
      </Link>
      <Link href="#" underline emphasized strong>
        强调且加字重下划线链接
      </Link>
    </div>
  ),
};

export const Custom: Story = {
  name: "自定义样式",
  parameters: {
    showPanel: true,
    docs: {
      description: {
        story:
          "展示如何通过 className 属性自定义链接样式，包括颜色、渐变效果、hover 状态等。支持 Tailwind CSS 和自定义 CSS 类。",
      },
      source: {
        state: "open",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center text-[14px]">
      <Link href="#" className="text-red-500 hover:text-blue-500">
        自定义颜色和hover效果
      </Link>
      <Link
        href="https://www.baidu.com"
        target="_blank"
        className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
      >
        渐变色渐变色渐变色渐变色
      </Link>
      <Link
        href="#"
        className="text-base text-blue-500 hover:text-red-500"
        showArrowIcon
        iconSize={20}
      >
        自定义颜色和hover效果
      </Link>
    </div>
  ),
};

export const Interactive: Story = {
  name: "交互式配置",
  parameters: {
    showPanel: true,
    docs: {
      description: {
        story:
          "可以通过右侧控制面板自由更改 Link 组件的属性，实时查看效果。这是测试和预览不同配置组合的最佳方式。",
      },
      source: {
        state: "open",
      },
    },
  },
  args: {
    emphasized: false,
    strong: false,
    underline: false,
    showLinkIcon: false,
    showArrowIcon: false,
    iconSize: 16,
    href: "#",
    target: "_self",
    className: "text-[14px]",
  },
  render: (args) => {
    return (
      <Link {...args} href="#">
        交互式链接文本
      </Link>
    );
  },
};

export const API: Story = {
  name: "API 文档",
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
## 属性列表

### 基础属性

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| **emphasized** | 是否强调显示（使用主题色） | \`boolean\` | \`false\` | 否 |
| **strong** | 是否加粗显示 | \`boolean\` | \`false\` | 否 |
| **underline** | 是否显示下划线 | \`boolean\` | \`false\` | 否 |

### 图标相关

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| **showLinkIcon** | 是否显示左侧默认链接图标 | \`boolean\` | \`false\` | 否 |
| **leftIcon** | 左侧自定义图标 | \`React.ReactNode\` | \`-\` | 否 |
| **showArrowIcon** | 是否显示右侧默认箭头图标 | \`boolean\` | \`false\` | 否 |
| **rightIcon** | 右侧自定义图标 | \`React.ReactNode\` | \`-\` | 否 |
| **iconSize** | 图标大小（仅对默认图标生效） | \`number\` | \`16\` | 否 |

### 原生属性

继承所有 HTML \`<a>\` 标签的原生属性，常用的包括：

| 属性 | 说明 | 类型 | 示例 |
|------|------|------|------|
| **href** | 链接地址 | \`string\` | \`"#"\` / \`"https://example.com"\` |
| **target** | 打开方式 | \`string\` | \`"_blank"\` / \`"_self"\` |
| **rel** | 链接关系 | \`string\` | \`"noopener noreferrer"\` |
| **className** | 自定义样式类 | \`string\` | \`"text-red-500"\` |
| **onClick** | 点击事件 | \`(e: MouseEvent) => void\` | - |

## 使用说明

### 图标优先级
- 当 \`showLinkIcon\` 为 \`true\` 时，\`leftIcon\` 属性无效
- 当 \`showArrowIcon\` 为 \`true\` 时，\`rightIcon\` 属性无效

### 样式组合
- \`emphasized\` 和 \`strong\` 可以同时使用
- \`underline\` 可以与任意其他样式属性组合

### 可访问性
- 外部链接建议添加 \`target="_blank"\` 和 \`rel="noopener noreferrer"\`
- 复杂链接建议添加 \`aria-label\` 属性
- 邮件和电话链接使用对应的 \`mailto:\` 和 \`tel:\` 协议
`,
      },
    },
  },
  render: () => null,
};
