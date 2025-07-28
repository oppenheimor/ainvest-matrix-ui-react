import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./";
import { ExplainIcon } from "./components/stories/ExplainIcon";
import {
  ExpressionDarkIcon,
  ExpressionLightIcon,
} from "./components/stories/ExpressionIcon";
import { RightIcon, ErrorIcon, SuccessIcon } from "./components/stories";

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
Input 输入框组件是表单中最基础的数据录入组件，支持多种输入类型和交互方式。组件采用复合组件模式，提供基础文本输入、数值输入、范围数值输入、多行文本输入和验证码输入等多种变体。

## 组件类型
- **Input**: 基础输入框，支持文本、密码、邮箱等类型，具备清除、前缀后缀、图标等功能
- **Input.Number**: 单值数值输入框，支持数值范围限制、精度控制、步长调整
- **Input.RangeNumber**: 范围数值输入框，支持双数值范围输入，常用于价格区间、时间范围等场景
- **Input.Textarea**: 段落输入框，支持多行文本输入，具备自适应高度和可调整大小功能
- **Input.SingleOtp**: 单框验证码输入，支持发送验证码和倒计时功能
- **Input.MultipleOtp**: 多框验证码输入，支持分框输入和掩码显示

## 使用原则
- 根据输入内容类型选择合适的组件变体，提升用户体验
- 提供清晰的标签和占位符文本，帮助用户理解输入要求
- 合理使用验证规则和错误提示，及时反馈输入状态
- 考虑无障碍访问和键盘导航，确保组件的可访问性
- 在密码输入场景下，提供显示/隐藏切换功能
- 对于数值输入，合理设置范围和精度，避免无效输入

## 组件引入
\`\`\`tsx
import { Input } from '@oversea/input'

// 基础输入框
<Input label="用户名" placeholder="请输入用户名" allowClear />

// 数值输入框
<Input.Number label="金额" prefix="￥" min={0} max={10000} precision={2} />

// 范围数值输入框
<Input.RangeNumber 
  label="价格区间" 
  prefixes={["最低", "最高"]} 
  suffixes={["元", "元"]} 
/>

// 多行文本输入
<Input.Textarea label="反馈" maxLength={140} autoSize />

// 验证码输入
<Input.MultipleOtp length={6} onSendCode={...} onComplete={...} />
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicInput: Story = {
  name: "普通输入框",
  parameters: {
    docs: {
      description: {
        story: "最基础的文本输入框，支持受控和非受控模式",
      },
    },
  },
  render: () => {
    const BasicInputComponent = () => {
      const [isDark, setIsDark] = useState(true);
      const [error, setError] = useState("Input Invalid Character");
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        if (/\d/.test(inputRef.current?.value || "")) {
          setError("Input Invalid Character");
        }
      }, []);

      const handleChange = (value: string) => {
        if (/\d/.test(value)) {
          setError("Input Invalid Character");
        } else {
          setError("");
        }
      };

      return (
        <div className="flex flex-wrap gap-4 w-3/4">
          <Input
            // label="普通输入框"
            placeholder="Enter text"
            className="w-[271px]"
          />
          <Input
            label="允许一键清除"
            placeholder="Enter text"
            className="w-[271px]"
            allowClear
          />
          <Input
            label="禁用状态"
            placeholder="Enter text"
            disabled
            className="w-[271px]"
          />
          <Input
            label="错误状态"
            placeholder="Enter text"
            defaultValue="Enter text"
            error={
              <div className="flex items-center gap-[7px]">
                <span className="flex justify-center items-center w-3 h-3">
                  <ErrorIcon />
                </span>
                <span>Input Invalid Character</span>
              </div>
            }
            className="w-[271px]"
          />
          <Input
            label="成功状态"
            placeholder="Enter text"
            defaultValue="Enter text"
            success={
              <div className="flex items-center gap-[7px]">
                <SuccessIcon />
                <span>Include cap charactors</span>
              </div>
            }
            className="w-[271px]"
          />
          <Input
            label="必填"
            placeholder="Enter text"
            className="w-[271px]"
            required
          />
          <Input
            label={
              <div className="flex items-center gap-1.5">
                <span>自定义图标</span>
                <ExplainIcon />
              </div>
            }
            placeholder="Enter text"
            className="w-[271px]"
          />
          <Input
            label="限制最大输入字数"
            placeholder="Enter text"
            className="w-[271px]"
            maxLength={20}
          />
          <Input
            label="带前置标签"
            placeholder="Enter text"
            className="w-[271px]"
            addonBefore={
              <span onClick={() => setIsDark(!isDark)}>
                {isDark ? <ExpressionDarkIcon /> : <ExpressionLightIcon />}
              </span>
            }
          />
          <Input
            label="带后置标签"
            placeholder="Enter text"
            className="w-[271px]"
            addonAfter={<RightIcon />}
          />
          <Input
            label="带前缀和后缀"
            placeholder="Enter text"
            className="w-[271px]"
            prefix="From"
            suffix="%"
          />
          <Input
            label="可隐藏字符且初始状态为隐藏"
            placeholder="Enter text"
            className="w-[271px]"
            password
          />
          <Input
            label="自定义校验规则-不能包含数字"
            ref={inputRef}
            defaultValue="hahaha1"
            placeholder="Enter text"
            className="w-[271px]"
            error={error}
            onChange={handleChange}
          />
        </div>
      );
    };
    return <BasicInputComponent />;
  },
};

export const BasicNumberInput: Story = {
  name: "范围数值输入框",
  parameters: {
    docs: {
      description: {
        story: "数值输入框，支持前缀、后缀和数值调整",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-4 w-3/4">
        <Input.RangeNumber
          label="普通范围数值输入框"
          prefixes={["From", "To"]}
          suffixes={["%", "%"]}
          placeholders={["Enter text", "Enter text"]}
          className="w-[380px]"
          onChange={(value) => {
            console.log(value);
          }}
        />
        <Input.RangeNumber
          label="带初始值"
          prefixes={["From", "To"]}
          suffixes={["%", "%"]}
          placeholders={["Enter text", "Enter text"]}
          errorContents={[null, "Input Invalid Character"]}
          className="w-[380px]"
          defaultValues={[10, 20]}
        />
        <Input.RangeNumber
          label="限制输入范围为0-100且精度为2"
          prefixes={["From", "To"]}
          suffixes={["%", "%"]}
          placeholders={["Enter text", "Enter text"]}
          className="w-[380px]"
          startMin={0}
          startMax={100}
          endMin={0}
          endMax={100}
          startPrecision={2}
          endPrecision={2}
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>
    );
  },
};

export const SingleNumberInput: Story = {
  name: "单值数值输入框",
  parameters: {
    docs: {
      description: {
        story: "数值输入框，支持前缀、后缀和数值调整",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-4 w-3/4">
        <Input.Number
          label="普通单值数值输入框"
          placeholder="Enter text"
          className="w-[244px]"
          onChange={(value) => {
            console.log(value);
          }}
        />
        <Input.Number
          label="步长为0.2"
          placeholder="Enter text"
          className="w-[244px]"
          step={0.2}
          onChange={(value) => {
            console.log(value);
          }}
        />
        <Input.Number
          label="精度为2"
          placeholder="Enter text"
          className="w-[244px]"
          precision={2}
          onChange={(value) => {
            console.log(value);
          }}
        />
        <Input.Number
          label="限制输入范围为10-100"
          placeholder="Enter text"
          suffix="%"
          className="w-[244px]"
          min={10}
          max={100}
          onChange={(value) => {
            console.log(value);
          }}
        />
        <Input.Number
          label="使用箭头进行调整"
          placeholder="Enter text"
          className="w-[244px]"
          adjustType="arrow"
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>
    );
  },
};

export const TextareaInput: Story = {
  name: "段落输入框",
  parameters: {
    docs: {
      description: {
        story: "段落输入框，支持多行文本输入",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-4 w-3/4">
        <Input.Textarea
          label="固定高度"
          placeholder="Enter words"
          className="w-[432px]"
        />
        <Input.Textarea
          label="自适应高度"
          placeholder="Enter words"
          className="w-[432px]"
          autoSize
        />
        <Input.Textarea
          label="自适应高度，且最小行数为3，最大行数为10"
          placeholder="Enter words"
          className="w-[432px]"
          autoSize={{ minRows: 3, maxRows: 10 }}
        />
        <Input.Textarea
          label="固定高度，有最大字数限制"
          placeholder="Enter words"
          className="w-[432px]"
          autoSize
          maxLength={100}
        />
        <Input.Textarea
          label="可调整高度"
          placeholder="Enter words"
          className="w-[432px]"
          resizable
        />
      </div>
    );
  },
};

export const OtpInput: Story = {
  name: "验证码输入框",
  parameters: {
    docs: {
      description: {
        story: "验证码输入框，支持单框和多框模式",
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-4 w-3/4">
        <Input.SingleOtp
          label="First name"
          placeholder="Enter text"
          className="w-[435px]"
          onSendCode={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(true);
              }, 1000);
            });
          }}
        />
        <Input.MultipleOtp
          className="w-[435px]"
          length={4}
          onSendCode={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(true);
              }, 1000);
            });
          }}
          onComplete={(opt) => {
            setTimeout(() => {
              alert("验证码错误：" + opt);
            }, 200);
          }}
          autoFocus
        />
        <Input.MultipleOtp
          className="w-[435px]"
          length={6}
          masked
          onSendCode={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(true);
              }, 1000);
            });
          }}
          onComplete={(opt) => {
            setTimeout(() => {
              alert("验证码错误：" + opt);
            }, 200);
          }}
        />
      </div>
    );
  },
};

export const EmojiAndCJKMaxLength: Story = {
  name: "emoji/中日韩文输入 maxLength 精确计数",
  parameters: {
    docs: {
      description: {
        story:
          "演示 Input 组件在 emoji、中文、日文、韩文等多字节字符输入下，maxLength 能精确计数和截断，且支持输入法组合输入。",
      },
    },
  },
  render: () => {
    function Demo() {
      const [value, setValue] = useState("");
      return (
        <div className="flex flex-col gap-4 w-[320px]">
          <Input
            label="emoji/中日韩文 maxLength=5"
            placeholder="可输入 emoji、中文、日文、韩文等"
            maxLength={5}
            value={value}
            onChange={setValue}
            allowClear
          />
          <div className="text-xs text-text-tertiary">当前值：{value}</div>
          <div className="text-xs text-text-tertiary">
            示例：
            <br />
            - emoji: 😀😃😄😁😆
            <br />
            - 中文: 你好世界啊
            <br />
            - 日文: こんにちは
            <br />- 韩文: 안녕하세요
          </div>
        </div>
      );
    }
    return <Demo />;
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
## Input 基础输入框

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| label | 输入框标签 | ReactNode | - | 否 |
| required | 是否必填 | boolean | false | 否 |
| allowClear | 是否可清除 | boolean | false | 否 |
| password | 是否为密码输入 | boolean | false | 否 |
| initialHidePassword | 初始是否隐藏密码字符 | boolean | true | 否 |
| maxLength | 最大输入长度 | number | - | 否 |
| addonBefore | 前置内容 | ReactNode | - | 否 |
| addonAfter | 后置内容 | ReactNode | - | 否 |
| error | 错误信息 | ReactNode | - | 否 |
| success | 成功信息 | ReactNode | - | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| value | 受控值 | string | - | 否 |
| defaultValue | 默认值 | string | - | 否 |
| prefix | 前缀 | ReactNode | - | 否 |
| suffix | 后缀 | ReactNode | - | 否 |
| placeholder | 占位符 | string | - | 否 |
| onChange | 值变化回调 | (value: string) => void | - | 否 |

## Input.Number 单值数值输入框

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| label | 输入框标签 | ReactNode | - | 否 |
| required | 是否必填 | boolean | false | 否 |
| error | 错误信息 | ReactNode | - | 否 |
| success | 成功信息 | ReactNode | - | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| value | 受控值 | number | - | 否 |
| defaultValue | 默认值 | number | - | 否 |
| placeholder | 占位符 | string | - | 否 |
| prefix | 前缀 | ReactNode | - | 否 |
| suffix | 后缀 | ReactNode | - | 否 |
| min | 最小值 | number | - | 否 |
| max | 最大值 | number | - | 否 |
| step | 步长 | number | 1 | 否 |
| precision | 精度 | number | - | 否 |
| adjustType | 调整方式 | 'button' 或 'arrow' | 'button' | 否 |
| onChange | 值变化回调 | (value: number) => void | - | 否 |

## Input.RangeNumber 范围数值输入框

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| label | 输入框标签 | ReactNode | - | 否 |
| required | 是否必填 | boolean | false | 否 |
| errorContents | 错误信息数组 | [ReactNode, ReactNode] | - | 否 |
| successContents | 成功信息数组 | [ReactNode, ReactNode] | - | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| values | 受控范围值 | [number, number] | - | 否 |
| defaultValues | 默认范围值 | [number, number] | - | 否 |
| placeholders | 占位符数组 | [string, string] | - | 否 |
| prefixes | 前缀数组 | [ReactNode, ReactNode] | - | 否 |
| suffixes | 后缀数组 | [ReactNode, ReactNode] | - | 否 |
| startMin | 开始值最小值 | number | - | 否 |
| startMax | 开始值最大值 | number | - | 否 |
| startPrecision | 开始值精度 | number | - | 否 |
| endMin | 结束值最小值 | number | - | 否 |
| endMax | 结束值最大值 | number | - | 否 |
| endPrecision | 结束值精度 | number | - | 否 |
| onChange | 值变化回调 | (value: [number, number]) => void | - | 否 |

## Input.Textarea 段落输入框

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| label | 输入框标签 | ReactNode | - | 否 |
| required | 是否必填 | boolean | false | 否 |
| maxLength | 最大输入长度 | number | - | 否 |
| error | 错误信息 | ReactNode | - | 否 |
| success | 成功信息 | ReactNode | - | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| value | 受控值 | string | - | 否 |
| defaultValue | 默认值 | string | - | 否 |
| placeholder | 占位符 | string | - | 否 |
| rows | 行数 | number | 3 | 否 |
| autoSize | 自动调整高度 | boolean 或 { minRows: number; maxRows: number } | false | 否 |
| resizable | 是否可调整大小 | boolean | false | 否 |
| onChange | 值变化回调 | (value: string) => void | - | 否 |

## Input.SingleOtp 单框验证码输入

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| label | 输入框标签 | ReactNode | - | 否 |
| required | 是否必填 | boolean | false | 否 |
| maxLength | 最大输入长度 | number | - | 否 |
| error | 错误信息 | ReactNode | - | 否 |
| success | 成功信息 | ReactNode | - | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| value | 受控值 | string | - | 否 |
| defaultValue | 默认值 | string | - | 否 |
| placeholder | 占位符 | string | - | 否 |
| onChange | 值变化回调 | (value: string) => void | - | 否 |
| onValidationChange | 验证状态变化回调 | (isValid: boolean, message?: string) => void | - | 否 |
| onComplete | OTP完成回调 | (otp: string) => void | - | 否 |
| onSendCode | 发送验证码回调 | () => Promise<boolean> | - | 否 |
| countdown | 倒计时时间（秒） | number | 60 | 否 |
| sendButtonContent | 发送按钮内容 | ReactNode | 'Send code' | 否 |
| sendingButtonContent | 发送中按钮内容 | ReactNode | 'Sending...' | 否 |
| resendButtonContent | 重发按钮内容 | ReactNode | 'Resend' | 否 |
| countdownContent | 倒计时内容模板 | ReactNode | - | 否 |

## Input.MultipleOtp 多框验证码输入

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| className | 自定义类名 | string | - | 否 |
| length | OTP长度 | number | 6 | 否 |
| autoFocus | 是否自动聚焦 | boolean | false | 否 |
| masked | 是否掩码显示输入内容 | boolean | false | 否 |
| onComplete | OTP完成回调 | (otp: string) => void | - | 否 |
| onSendCode | 发送验证码回调 | () => Promise<boolean> | - | 否 |
| countdown | 倒计时时间（秒） | number | 60 | 否 |
| sendButtonContent | 发送按钮内容 | ReactNode | 'Send code' | 否 |
| sendingButtonContent | 发送中按钮内容 | ReactNode | 'Sending...' | 否 |
| resendButtonContent | 重发按钮内容 | ReactNode | 'Resend' | 否 |
| countdownContent | 倒计时内容模板 | (countdown: number) => ReactNode | - | 否 |

## Changelog

### 0.0.2
✨ 新增功能
新增 EmojiAndCJKMaxLength 示例：演示 Input 组件在 emoji、中文、日文、韩文等多字节字符输入下，maxLength 能精确计数和截断，且支持输入法组合输入，极大提升国际化和多语言场景下的输入体验。

### 0.0.1
✨ 初始版本
        `,
      },
    },
  },
  render: () => {
    return null;
  },
};
