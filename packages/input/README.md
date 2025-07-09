# @oversea/input

一个功能丰富的 React 输入组件库，提供多种输入类型和交互方式，支持基础文本输入、数值输入、范围数值输入、多行文本输入和验证码输入等多种变体。

## 📦 安装

```bash
npm install @oversea/input
# 或
yarn add @oversea/input
# 或
pnpm add @oversea/input
```

## 🚀 快速开始

```tsx
import { Input } from '@oversea/input';

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
```

## 📋 组件类型

### Input - 基础输入框

最基础的文本输入组件，支持文本、密码、邮箱等类型，具备清除、前缀后缀、图标等功能。

**特性：**

- ✅ 支持受控和非受控模式
- ✅ 密码显示/隐藏切换
- ✅ 一键清除功能
- ✅ 前缀和后缀
- ✅ 前置和后置内容
- ✅ 字符计数
- ✅ 错误和成功状态
- ✅ 必填标识

### Input.Number - 单值数值输入框

专门用于数值输入的组件，支持数值范围限制、精度控制、步长调整。

**特性：**

- ✅ 数值验证和格式化
- ✅ 范围限制（最小值/最大值）
- ✅ 精度控制
- ✅ 步长调整
- ✅ 按钮和箭头两种调整方式
- ✅ 前缀和后缀支持

### Input.RangeNumber - 范围数值输入框

支持双数值范围输入的组件，常用于价格区间、时间范围等场景。

**特性：**

- ✅ 双数值输入
- ✅ 独立的范围和精度控制
- ✅ 独立的前缀和后缀
- ✅ 独立的错误信息

### Input.Textarea - 段落输入框

支持多行文本输入的组件，具备自适应高度和可调整大小功能。

**特性：**

- ✅ 多行文本输入
- ✅ 自适应高度
- ✅ 可调整大小
- ✅ 字符计数
- ✅ 行数控制

### Input.SingleOtp - 单框验证码输入

单输入框的验证码组件，支持发送验证码和倒计时功能。

**特性：**

- ✅ 验证码输入
- ✅ 发送验证码
- ✅ 倒计时功能
- ✅ 完成回调

### Input.MultipleOtp - 多框验证码输入

多输入框的验证码组件，支持分框输入和掩码显示。

**特性：**

- ✅ 多框验证码输入
- ✅ 自动聚焦切换
- ✅ 掩码显示
- ✅ 发送验证码
- ✅ 倒计时功能

## 📖 API 文档

### Input 基础输入框

| 属性                | 说明                 | 类型                    | 默认值 | 必填 |
| ------------------- | -------------------- | ----------------------- | ------ | ---- |
| label               | 输入框标签           | ReactNode               | -      | 否   |
| required            | 是否必填             | boolean                 | false  | 否   |
| allowClear          | 是否可清除           | boolean                 | false  | 否   |
| password            | 是否为密码输入       | boolean                 | false  | 否   |
| initialHidePassword | 初始是否隐藏密码字符 | boolean                 | true   | 否   |
| maxLength           | 最大输入长度         | number                  | -      | 否   |
| addonBefore         | 前置内容             | ReactNode               | -      | 否   |
| addonAfter          | 后置内容             | ReactNode               | -      | 否   |
| error               | 错误信息             | ReactNode               | -      | 否   |
| success             | 成功信息             | ReactNode               | -      | 否   |
| disabled            | 是否禁用             | boolean                 | false  | 否   |
| value               | 受控值               | string                  | -      | 否   |
| defaultValue        | 默认值               | string                  | -      | 否   |
| prefix              | 前缀                 | ReactNode               | -      | 否   |
| suffix              | 后缀                 | ReactNode               | -      | 否   |
| placeholder         | 占位符               | string                  | -      | 否   |
| onChange            | 值变化回调           | (value: string) => void | -      | 否   |

### Input.Number 单值数值输入框

| 属性         | 说明       | 类型                    | 默认值   | 必填 |
| ------------ | ---------- | ----------------------- | -------- | ---- |
| label        | 输入框标签 | ReactNode               | -        | 否   |
| required     | 是否必填   | boolean                 | false    | 否   |
| error        | 错误信息   | ReactNode               | -        | 否   |
| success      | 成功信息   | ReactNode               | -        | 否   |
| disabled     | 是否禁用   | boolean                 | false    | 否   |
| value        | 受控值     | number                  | -        | 否   |
| defaultValue | 默认值     | number                  | -        | 否   |
| placeholder  | 占位符     | string                  | -        | 否   |
| prefix       | 前缀       | ReactNode               | -        | 否   |
| suffix       | 后缀       | ReactNode               | -        | 否   |
| min          | 最小值     | number                  | -        | 否   |
| max          | 最大值     | number                  | -        | 否   |
| step         | 步长       | number                  | 1        | 否   |
| precision    | 精度       | number                  | -        | 否   |
| adjustType   | 调整方式   | 'button' 或 'arrow'     | 'button' | 否   |
| onChange     | 值变化回调 | (value: number) => void | -        | 否   |

### Input.RangeNumber 范围数值输入框

| 属性            | 说明         | 类型                              | 默认值 | 必填 |
| --------------- | ------------ | --------------------------------- | ------ | ---- |
| label           | 输入框标签   | ReactNode                         | -      | 否   |
| required        | 是否必填     | boolean                           | false  | 否   |
| errorContents   | 错误信息数组 | [ReactNode, ReactNode]            | -      | 否   |
| successContents | 成功信息数组 | [ReactNode, ReactNode]            | -      | 否   |
| disabled        | 是否禁用     | boolean                           | false  | 否   |
| values          | 受控范围值   | [number, number]                  | -      | 否   |
| defaultValues   | 默认范围值   | [number, number]                  | -      | 否   |
| placeholders    | 占位符数组   | [string, string]                  | -      | 否   |
| prefixes        | 前缀数组     | [ReactNode, ReactNode]            | -      | 否   |
| suffixes        | 后缀数组     | [ReactNode, ReactNode]            | -      | 否   |
| startMin        | 开始值最小值 | number                            | -      | 否   |
| startMax        | 开始值最大值 | number                            | -      | 否   |
| startPrecision  | 开始值精度   | number                            | -      | 否   |
| endMin          | 结束值最小值 | number                            | -      | 否   |
| endMax          | 结束值最大值 | number                            | -      | 否   |
| endPrecision    | 结束值精度   | number                            | -      | 否   |
| onChange        | 值变化回调   | (value: [number, number]) => void | -      | 否   |

### Input.Textarea 段落输入框

| 属性         | 说明           | 类型                                            | 默认值 | 必填 |
| ------------ | -------------- | ----------------------------------------------- | ------ | ---- |
| label        | 输入框标签     | ReactNode                                       | -      | 否   |
| required     | 是否必填       | boolean                                         | false  | 否   |
| maxLength    | 最大输入长度   | number                                          | -      | 否   |
| error        | 错误信息       | ReactNode                                       | -      | 否   |
| success      | 成功信息       | ReactNode                                       | -      | 否   |
| disabled     | 是否禁用       | boolean                                         | false  | 否   |
| value        | 受控值         | string                                          | -      | 否   |
| defaultValue | 默认值         | string                                          | -      | 否   |
| placeholder  | 占位符         | string                                          | -      | 否   |
| rows         | 行数           | number                                          | 5      | 否   |
| autoSize     | 自动调整高度   | boolean 或 { minRows: number; maxRows: number } | false  | 否   |
| resizable    | 是否可调整大小 | boolean                                         | false  | 否   |
| onChange     | 值变化回调     | (value: string) => void                         | -      | 否   |

### Input.SingleOtp 单框验证码输入

| 属性                 | 说明             | 类型                                         | 默认值       | 必填 |
| -------------------- | ---------------- | -------------------------------------------- | ------------ | ---- |
| label                | 输入框标签       | ReactNode                                    | -            | 否   |
| required             | 是否必填         | boolean                                      | false        | 否   |
| maxLength            | 最大输入长度     | number                                       | -            | 否   |
| error                | 错误信息         | ReactNode                                    | -            | 否   |
| success              | 成功信息         | ReactNode                                    | -            | 否   |
| disabled             | 是否禁用         | boolean                                      | false        | 否   |
| value                | 受控值           | string                                       | -            | 否   |
| defaultValue         | 默认值           | string                                       | -            | 否   |
| placeholder          | 占位符           | string                                       | -            | 否   |
| onChange             | 值变化回调       | (value: string) => void                      | -            | 否   |
| onValidationChange   | 验证状态变化回调 | (isValid: boolean, message?: string) => void | -            | 否   |
| onComplete           | OTP 完成回调     | (otp: string) => void                        | -            | 否   |
| onSendCode           | 发送验证码回调   | () => Promise<boolean>                       | -            | 否   |
| countdown            | 倒计时时间（秒） | number                                       | 60           | 否   |
| sendButtonContent    | 发送按钮内容     | ReactNode                                    | 'Send code'  | 否   |
| sendingButtonContent | 发送中按钮内容   | ReactNode                                    | 'Sending...' | 否   |
| resendButtonContent  | 重发按钮内容     | ReactNode                                    | 'Resend'     | 否   |
| countdownContent     | 倒计时内容模板   | ReactNode                                    | -            | 否   |

### Input.MultipleOtp 多框验证码输入

| 属性                 | 说明                 | 类型                             | 默认值       | 必填 |
| -------------------- | -------------------- | -------------------------------- | ------------ | ---- |
| className            | 自定义类名           | string                           | -            | 否   |
| length               | OTP 长度             | number                           | 6            | 否   |
| autoFocus            | 是否自动聚焦         | boolean                          | false        | 否   |
| masked               | 是否掩码显示输入内容 | boolean                          | false        | 否   |
| onComplete           | OTP 完成回调         | (otp: string) => void            | -            | 否   |
| onSendCode           | 发送验证码回调       | () => Promise<boolean>           | -            | 否   |
| countdown            | 倒计时时间（秒）     | number                           | 60           | 否   |
| sendButtonContent    | 发送按钮内容         | ReactNode                        | 'Send code'  | 否   |
| sendingButtonContent | 发送中按钮内容       | ReactNode                        | 'Sending...' | 否   |
| resendButtonContent  | 重发按钮内容         | ReactNode                        | 'Resend'     | 否   |
| countdownContent     | 倒计时内容模板       | (countdown: number) => ReactNode | -            | 否   |

## 💡 使用示例

### 基础输入框示例

```tsx
import { Input } from "@oversea/input";

function BasicInputExample() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-4">
      {/* 基础输入框 */}
      <Input
        label="用户名"
        placeholder="请输入用户名"
        value={value}
        onChange={setValue}
        allowClear
      />

      {/* 密码输入框 */}
      <Input
        label="密码"
        type="password"
        password
        placeholder="请输入密码"
        required
      />

      {/* 带前缀后缀的输入框 */}
      <Input
        label="金额"
        prefix="￥"
        suffix="元"
        placeholder="请输入金额"
        maxLength={10}
      />

      {/* 带图标的输入框 */}
      <Input
        label="邮箱"
        prefix={<EmailIcon />}
        placeholder="请输入邮箱地址"
        type="email"
      />

      {/* 错误状态的输入框 */}
      <Input
        label="用户名"
        placeholder="请输入用户名"
        error="用户名不能为空"
        value=""
      />

      {/* 成功状态的输入框 */}
      <Input
        label="邮箱"
        placeholder="请输入邮箱"
        success="邮箱格式正确"
        value="user@example.com"
      />
    </div>
  );
}
```

### 数值输入框示例

```tsx
import { Input } from "@oversea/input";

function NumberInputExample() {
  return (
    <div className="space-y-4">
      {/* 基础数值输入框 */}
      <Input.Number
        label="数量"
        placeholder="请输入数量"
        min={0}
        max={100}
        step={1}
      />

      {/* 带精度的数值输入框 */}
      <Input.Number
        label="价格"
        prefix="￥"
        placeholder="请输入价格"
        precision={2}
        min={0}
        max={999999}
      />

      {/* 使用箭头调整的数值输入框 */}
      <Input.Number
        label="评分"
        placeholder="请输入评分"
        min={0}
        max={10}
        step={0.1}
        precision={1}
        adjustType="arrow"
      />

      {/* 带后缀的数值输入框 */}
      <Input.Number
        label="百分比"
        placeholder="请输入百分比"
        suffix="%"
        min={0}
        max={100}
        precision={1}
      />
    </div>
  );
}
```

### 范围数值输入框示例

```tsx
import { Input } from "@oversea/input";

function RangeNumberInputExample() {
  return (
    <div className="space-y-4">
      {/* 基础范围输入框 */}
      <Input.RangeNumber
        label="价格区间"
        prefixes={["最低", "最高"]}
        suffixes={["元", "元"]}
        placeholders={["最低价格", "最高价格"]}
        min={0}
        max={10000}
        precision={2}
      />

      {/* 带初始值的范围输入框 */}
      <Input.RangeNumber
        label="年龄范围"
        prefixes={["最小", "最大"]}
        suffixes={["岁", "岁"]}
        defaultValues={[18, 65]}
        min={0}
        max={120}
      />

      {/* 带错误信息的范围输入框 */}
      <Input.RangeNumber
        label="时间范围"
        prefixes={["开始", "结束"]}
        suffixes={["时", "时"]}
        errorContents={[null, "结束时间不能早于开始时间"]}
        min={0}
        max={23}
      />
    </div>
  );
}
```

### 段落输入框示例

```tsx
import { Input } from "@oversea/input";

function TextareaInputExample() {
  return (
    <div className="space-y-4">
      {/* 固定高度的段落输入框 */}
      <Input.Textarea
        label="反馈"
        placeholder="请输入您的反馈"
        rows={4}
        maxLength={500}
      />

      {/* 自适应高度的段落输入框 */}
      <Input.Textarea
        label="描述"
        placeholder="请输入描述"
        autoSize
        maxLength={200}
      />

      {/* 限制最小和最大行数的段落输入框 */}
      <Input.Textarea
        label="详细说明"
        placeholder="请输入详细说明"
        autoSize={{ minRows: 3, maxRows: 10 }}
      />

      {/* 可调整大小的段落输入框 */}
      <Input.Textarea label="备注" placeholder="请输入备注" resizable />
    </div>
  );
}
```

### 验证码输入框示例

```tsx
import { Input } from "@oversea/input";

function OtpInputExample() {
  const handleSendCode = async () => {
    // 模拟发送验证码
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        console.log("验证码已发送");
        resolve(true);
      }, 1000);
    });
  };

  const handleComplete = (otp: string) => {
    console.log("验证码完成:", otp);
  };

  return (
    <div className="space-y-4">
      {/* 单框验证码输入 */}
      <Input.SingleOtp
        label="验证码"
        placeholder="请输入验证码"
        maxLength={6}
        onSendCode={handleSendCode}
        onComplete={handleComplete}
        countdown={60}
      />

      {/* 多框验证码输入 */}
      <Input.MultipleOtp
        length={6}
        autoFocus
        onSendCode={handleSendCode}
        onComplete={handleComplete}
      />

      {/* 掩码显示的多框验证码输入 */}
      <Input.MultipleOtp
        length={4}
        masked
        onSendCode={handleSendCode}
        onComplete={handleComplete}
      />
    </div>
  );
}
```

## 🎨 设计原则

### 使用原则

- **选择合适的组件类型**：根据输入内容类型选择合适的组件变体，提升用户体验
- **提供清晰的标签和占位符**：帮助用户理解输入要求
- **合理使用验证规则**：及时反馈输入状态，避免无效输入
- **考虑无障碍访问**：确保组件的可访问性和键盘导航支持
- **密码输入安全**：在密码输入场景下，提供显示/隐藏切换功能
- **数值输入精确性**：对于数值输入，合理设置范围和精度

### 状态管理

- **受控模式**：通过 `value` 和 `onChange` 实现受控组件
- **非受控模式**：通过 `defaultValue` 实现非受控组件
- **状态反馈**：通过 `error` 和 `success` 提供输入状态反馈

### 样式定制

- **主题适配**：组件基于 Tailwind CSS 设计，支持主题定制
- **响应式设计**：支持不同屏幕尺寸的响应式布局
- **无障碍支持**：内置无障碍访问支持，符合 WCAG 标准

## 🔧 开发

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 发布

```bash
pnpm pb
```

## 📄 许可证

ISC License

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如有问题，请联系：fengjiawang@myhexin.com
