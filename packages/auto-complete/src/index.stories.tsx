/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AutoComplete } from "./index";
import { AutoCompleteOption } from "./types";

const meta: Meta<typeof AutoComplete> = {
  title: "Form/AutoComplete",
  component: AutoComplete,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
AutoComplete 自动完成组件结合了输入框和下拉列表，为用户提供智能的输入建议和自动补全功能。它能够根据用户输入动态筛选选项，提升用户输入效率和体验。

## 组件特性
### 交互模式
支持多种交互方式：
- **实时搜索**：用户输入时实时筛选匹配选项
- **远程搜索**：支持通过 onSearch 回调进行远程数据获取
- **键盘导航**：支持上下箭头键选择，Enter 确认，Esc 关闭
- **鼠标交互**：支持鼠标悬停和点击选择

### 筛选策略
- **内置筛选**：默认基于值匹配的筛选逻辑
- **自定义筛选**：支持通过 filterOption 自定义筛选算法
- **智能截断**：长文本智能截断，保留重要后缀信息（如邮箱域名）

### 状态管理
- **受控模式**：通过 value 和 onChange 完全控制组件状态
- **非受控模式**：使用 defaultValue 设置初始值，组件内部管理状态
- **状态反馈**：支持 error 和 warning 状态显示

## 使用原则
- **智能建议**：提供有价值的自动完成建议，避免无关选项
- **响应迅速**：确保筛选和显示的流畅性，避免卡顿
- **键盘友好**：支持完整的键盘导航，提升可访问性
- **视觉清晰**：选项显示清晰，当前选中项有明确的视觉反馈

## 组件安装

\`\`\`bash
npm install @oversea/auto-complete
\`\`\`

## 快速开始
\`\`\`tsx
import { AutoComplete } from '@oversea/auto-complete'

// 基本用法
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' }
]

<AutoComplete
  options={options}
  placeholder="请输入内容"
  onChange={(value) => console.log(value)}
/>

// 邮箱自动补全
<AutoComplete
  options={emailOptions}
  placeholder="请输入邮箱地址"
  filterOption={(input, option) => 
    option.value.toLowerCase().includes(input.toLowerCase())
  }
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "default", "large"],
    },
    status: {
      control: "select",
      options: [undefined, "error", "warning"],
    },
    allowClear: {
      control: "boolean",
    },
    dropdownMatchSelectWidth: {
      control: "boolean",
    },
    truncateOffset: {
      control: { type: "number", min: 1, max: 50, step: 1 },
      description: "文本截断时保留的尾部字符数（用于保留邮箱后缀等重要信息）",
      defaultValue: 8,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 邮箱自动补全
export const EmailAutoComplete: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState<AutoCompleteOption[]>([]);

    const DEFAULT_EMAIL_DOMAINS = [
      "gmail.com",
      "outlook.com",
      "hotmail.com",
      "yahoo.com",
      "icloud.com",
      "qq.com",
      "163.com",
      "126.com",
      "sina.com",
      "sohu.com",
    ];

    function generateEmailSuggestions(
      inputValue: string,
      domains: string[] = DEFAULT_EMAIL_DOMAINS,
      maxSuggestions: number = 8
    ): AutoCompleteOption[] {
      if (!inputValue || inputValue.trim() === "") {
        return [];
      }

      const trimmedInput = inputValue.trim();

      // 如果已经包含@符号，则判断是否需要补全
      if (trimmedInput.includes("@")) {
        const [localPart, domainPart] = trimmedInput.split("@");

        if (!domainPart || domainPart === "") {
          // @后面没有内容，生成所有域名建议
          return domains.slice(0, maxSuggestions).map((domain) => ({
            value: `${localPart}@${domain}`,
            key: `${localPart}@${domain}`,
          }));
        } else {
          // 检查是否已经是完整的邮箱地址
          const isCompleteEmail = domains.some(
            (domain) => domain.toLowerCase() === domainPart.toLowerCase()
          );

          if (isCompleteEmail) {
            // 已经是完整的邮箱地址，不提供建议
            return [];
          } else {
            // @后面有部分内容，筛选匹配的域名
            const matchingDomains = domains.filter((domain) =>
              domain.toLowerCase().startsWith(domainPart.toLowerCase())
            );
            return matchingDomains.slice(0, maxSuggestions).map((domain) => ({
              value: `${localPart}@${domain}`,
              key: `${localPart}@${domain}`,
            }));
          }
        }
      }

      // 没有@符号，为用户名部分生成完整邮箱建议
      return domains.slice(0, maxSuggestions).map((domain) => ({
        value: `${trimmedInput}@${domain}`,
        key: `${trimmedInput}@${domain}`,
      }));
    }

    /**
     * 邮箱自动完成的默认筛选函数
     * 只在输入包含@但域名部分不完整时进行筛选
     */
    function emailFilterOption(
      inputValue: string,
      option: AutoCompleteOption
    ): boolean {
      if (!inputValue.includes("@")) {
        return true; // 没有@时显示所有建议
      }

      const [, domainPart] = inputValue.split("@");
      if (!domainPart) {
        return true; // @后面没有内容时显示所有建议
      }

      // @后面有内容时，检查选项是否匹配
      const [, optionDomain] = option.value.split("@");
      return optionDomain.toLowerCase().includes(domainPart.toLowerCase());
    }

    const handleSearch = (searchValue: string) => {
      const suggestions = generateEmailSuggestions(searchValue);
      setOptions(suggestions);
    };

    const handleChange = (newValue: string) => {
      setValue(newValue);
      handleSearch(newValue);
    };

    const handleSelect = (selectedValue: string) => {
      setValue(selectedValue);
    };

    return (
      <div className="w-full max-w-md">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-text-primary">邮箱自动补全</h3>
          <p className="mb-4 text-sm text-text-secondary">
            输入用户名，系统会自动推荐常见邮箱后缀。例如输入 "zhangsan"，会推荐
            zhangsan@gmail.com, zhangsan@outlook.com 等。
          </p>
        </div>

        <AutoComplete
          value={value}
          options={options}
          onChange={handleChange}
          onSearch={handleSearch}
          onSelect={handleSelect}
          placeholder="请输入邮箱地址"
          allowClear
          filterOption={emailFilterOption}
        />

        <div className="p-3 mt-4 rounded bg-background-layer1">
          <p className="text-sm text-text-secondary">
            <strong>当前值:</strong> {value || "无"}
          </p>
        </div>
      </div>
    );
  },
};

// 自定义筛选
export const CustomFilter: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    const customOptions = [
      { value: "Apple", label: "🍎 Apple" },
      { value: "Banana", label: "🍌 Banana" },
      { value: "Cherry", label: "🍒 Cherry" },
      { value: "Date", label: "🥥 Date" },
      { value: "Elderberry", label: "🫧 Elderberry" },
    ];

    // 自定义筛选：不区分大小写，并且支持拼音首字母
    const customFilterOption = (
      inputValue: string,
      option: AutoCompleteOption
    ) => {
      const input = inputValue.toLowerCase();
      const optionValue = option.value.toLowerCase();
      return optionValue.includes(input) || optionValue.startsWith(input);
    };

    return (
      <div className="w-full max-w-md">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-text-primary">自定义筛选</h3>
          <p className="mb-4 text-sm text-text-secondary">
            自定义筛选逻辑，支持部分匹配和首字母匹配
          </p>
        </div>

        <AutoComplete
          {...args}
          value={value}
          onChange={setValue}
          options={customOptions}
          filterOption={customFilterOption}
          placeholder="试试输入 'a' 或 'apple'"
        />
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
## Props API

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| options | 数据源选项 | \`AutoCompleteOption[]\` | \`[]\` | 否 |
| value | 控制输入值 | \`string\` | - | 否 |
| defaultValue | 默认值 | \`string\` | - | 否 |
| onChange | 输入框变化时的回调 | \`(value: string) => void\` | - | 否 |
| onSearch | 搜索时的回调（用于远程搜索） | \`(value: string) => void\` | - | 否 |
| onSelect | 选择选项时的回调 | \`(value: string, option: AutoCompleteOption) => void\` | - | 否 |
| open | 控制下拉菜单显示 | \`boolean\` | - | 否 |
| onOpenChange | 下拉菜单显示状态改变回调 | \`(open: boolean) => void\` | - | 否 |
| status | 输入框状态 | \`'error'\` / \`'warning'\` | - | 否 |
| allowClear | 是否允许清除 | \`boolean\` | \`true\` | 否 |
| dropdownMatchSelectWidth | 下拉菜单宽度是否与输入框相同 | \`boolean\` | \`true\` | 否 |
| filterOption | 自定义筛选函数 | \`(inputValue: string, option: AutoCompleteOption) => boolean\` | - | 否 |
| maxCount | 最大显示选项数量 | \`number\` | - | 否 |
| inputClassName | 输入框的样式类名 | \`string\` | - | 否 |
| dropdownClassName | 下拉菜单的 className | \`string\` | - | 否 |
| notFoundContent | 无选项时的显示内容 | \`React.ReactNode\` | - | 否 |
| truncateOffset | 文本截断时保留的尾部字符数 | \`number\` | \`8\` | 否 |
| placeholder | 输入框占位符 | \`string\` | - | 否 |
| disabled | 是否禁用 | \`boolean\` | \`false\` | 否 |
| className | 自定义 CSS 类名 | \`string\` | - | 否 |

> **注意**: 组件继承所有标准 HTML \`input\` 元素的属性，如 \`type\`、\`name\`、\`id\` 等。

## 类型定义

### AutoCompleteOption

| 属性 | 说明 | 类型 | 必填 |
|---|---|---|---|
| value | 选项的值 | \`string\` | 是 |
| label | 选项的显示标签 | \`React.ReactNode\` | 否 |
| key | 选项的唯一标识 | \`string\` | 否 |

## 交互说明

### 键盘操作
- **↑/↓ 方向键**: 在选项列表中上下导航
- **Enter**: 选择当前高亮的选项
- **Esc**: 关闭下拉菜单
- **Tab**: 移动焦点到下一个元素

### 鼠标操作
- **点击输入框**: 如果有匹配选项，显示下拉菜单
- **悬停选项**: 高亮当前选项
- **点击选项**: 选择该选项并关闭下拉菜单
- **点击清除按钮**: 清空输入内容（需要 allowClear=true）

## 筛选逻辑

### 默认筛选
组件提供内置的筛选逻辑，基于输入值与选项值的匹配关系进行筛选。

### 自定义筛选
通过 \`filterOption\` 属性可以自定义筛选算法：

\`\`\`tsx
// 示例：不区分大小写的筛选
const customFilter = (inputValue: string, option: AutoCompleteOption) => {
  return option.value.toLowerCase().includes(inputValue.toLowerCase());
};

<AutoComplete
  options={options}
  filterOption={customFilter}
/>
\`\`\`

### 远程搜索
通过 \`onSearch\` 回调实现远程数据获取：

\`\`\`tsx
const handleSearch = async (searchValue: string) => {
  const results = await fetchSearchResults(searchValue);
  setOptions(results);
};

<AutoComplete
  options={options}
  onSearch={handleSearch}
/>
\`\`\`

## 最佳实践

1. **数据源管理**：对于大量数据，建议使用远程搜索而非一次性加载
2. **性能优化**：使用 \`maxCount\` 限制显示的选项数量，避免渲染过多 DOM 节点
3. **用户体验**：为常见场景（如邮箱输入）提供智能的自动补全建议
4. **键盘导航**：确保所有功能都可以通过键盘访问，提升可访问性
5. **文本截断**：对于长文本选项，合理设置 \`truncateOffset\` 保留重要信息
6. **状态反馈**：使用 \`status\` 属性提供视觉反馈，如验证错误时显示错误状态

## 无障碍性

- 支持完整的键盘导航
- 提供适当的 ARIA 属性和语义化标签
- 确保有足够的颜色对比度
- 支持屏幕阅读器访问

## Changelog

### 0.0.2
- 新增 \`truncateOffset\` 属性，支持文本截断时保留重要信息
- 优化自动完成建议的显示逻辑，确保重要信息不被截断
- 修复在某些情况下选项显示异常的问题

### 0.0.1
- 初始版本，支持基本的自动完成功能
- 支持自定义筛选和远程搜索
- 提供完整的键盘和鼠标交互支持
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
