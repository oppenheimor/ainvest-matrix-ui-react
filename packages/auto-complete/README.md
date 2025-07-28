# AutoComplete 自动完成组件

AutoComplete 是一个支持自动完成功能的输入框组件，特别适用于邮箱地址输入等场景。

## 功能特性

- 🎯 支持邮箱地址自动完成建议
- ⌨️ 完整的键盘导航支持（上下箭头、回车、ESC）
- 🎮 支持受控和非受控模式
- 🔍 自定义筛选函数
- 📱 多种尺寸支持
- 🎨 状态指示（错误、警告）
- 🧹 支持清空功能
- ♿ 无障碍访问支持

## 基础用法

```tsx
import { AutoComplete } from "@oversea/auto-complete";

const options = [
  { value: "option1", label: "选项1" },
  { value: "option2", label: "选项2" },
  { value: "option3", label: "选项3" },
];

function BasicExample() {
  return (
    <AutoComplete
      options={options}
      placeholder="请输入内容"
      style={{ width: 300 }}
    />
  );
}
```

## 邮箱自动完成

```tsx
import { AutoComplete, generateEmailSuggestions, emailFilterOption } from "@oversea/auto-complete";

function EmailExample() {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const handleSearch = (searchValue: string) => {
    const suggestions = generateEmailSuggestions(searchValue);
    setOptions(suggestions);
  };

  return (
    <AutoComplete
      value={value}
      options={options}
      onChange={setValue}
      onSearch={handleSearch}
      placeholder="请输入邮箱地址"
      filterOption={emailFilterOption}
      allowClear
    />
  );
}
```

## API

### AutoComplete Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| options | `AutoCompleteOption[]` | `[]` | 数据源选项 |
| value | `string` | - | 控制输入值（受控模式） |
| defaultValue | `string` | `""` | 默认值（非受控模式） |
| onChange | `(value: string) => void` | - | 输入框变化时的回调 |
| onSearch | `(value: string) => void` | - | 搜索时的回调 |
| onSelect | `(value: string, option: AutoCompleteOption) => void` | - | 选择选项时的回调 |
| open | `boolean` | - | 控制下拉菜单显示 |
| onOpenChange | `(open: boolean) => void` | - | 下拉菜单显示状态改变回调 |
| size | `'small' \\| 'default' \\| 'large'` | `'default'` | 组件大小 |
| status | `'error' \\| 'warning'` | - | 输入框状态 |
| allowClear | `boolean` | `true` | 是否允许清除 |
| dropdownMatchSelectWidth | `boolean` | `true` | 下拉菜单宽度是否与输入框相同 |
| filterOption | `(inputValue: string, option: AutoCompleteOption) => boolean` | - | 自定义筛选函数 |
| showArrow | `boolean` | `false` | 是否显示箭头图标 |
| maxCount | `number` | - | 最大显示选项数量 |
| className | `string` | - | 自定义样式类名 |
| dropdownClassName | `string` | - | 下拉菜单的 className |
| notFoundContent | `ReactNode` | `"No data"` | 无选项时的显示内容 |

### AutoCompleteOption

```tsx
interface AutoCompleteOption {
  value: string;
  label?: ReactNode;
  key?: string;
}
```

### 工具函数

#### generateEmailSuggestions

生成邮箱建议的工具函数。

```tsx
function generateEmailSuggestions(
  inputValue: string,
  domains?: string[],
  maxSuggestions?: number
): AutoCompleteOption[]
```

参数：
- `inputValue`: 用户输入的值
- `domains`: 邮箱域名列表，默认包含常见域名
- `maxSuggestions`: 最大建议数量，默认为 8

#### emailFilterOption

邮箱自动完成的筛选函数。

```tsx
function emailFilterOption(inputValue: string, option: AutoCompleteOption): boolean
```

## 键盘交互

- `ArrowDown`: 选择下一个选项
- `ArrowUp`: 选择上一个选项
- `Enter`: 确认选择当前高亮的选项
- `Escape`: 关闭下拉菜单

## 使用场景

### 1. 邮箱地址输入
最常见的使用场景，用户输入用户名部分时自动推荐常见邮箱后缀。

### 2. 搜索建议
为搜索框提供历史搜索记录或热门搜索建议。

### 3. 标签输入
输入标签时提供已有标签的建议。

### 4. 用户名提示
注册时提供用户名建议。

## 注意事项

1. 对于大量数据，建议结合 `maxCount` 属性限制显示数量以提升性能
2. 邮箱自动完成功能已内置常见域名，也可以通过参数自定义域名列表
3. 组件支持完整的键盘导航，确保良好的用户体验
4. 建议在 `onSearch` 回调中实现防抖逻辑，避免频繁的 API 请求