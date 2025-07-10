# Empty 组件

## 定义
空状态组件用于在页面或模块无内容、加载失败或出现异常时，提供清晰的视觉反馈和操作引导。

## 组件类型
该组件根据使用场景分为两种主要类型：

- **页面缺省图 (Page-level Empty State)**: 用于整个页面的空状态，通常尺寸较大，包含醒目的插图，用以吸引用户注意。
- **模块缺省图 (Module-level Empty State)**: 用于页面中某个模块的局部空状态，设计上更为简洁，通常不含插图，以免干扰页面其他元素。

支持的状态包括：
- **内容为空 (NoData)**: 列表、表格等数据为空。
- **搜索为空 (SearchEmpty)**: 搜索无结果。
- **网络异常 (NetworkError)**: 网络连接失败或请求异常。
- **服务器错误 (ServerError)**: 服务器返回错误。
- **无图标 (None)**: 纯文本展示，不显示任何图标。

## 使用原则
- **信息清晰**: 确保标题和描述能够清晰地告知用户当前状况。
- **场景匹配**: 根据具体场景选择合适的组件类型和状态。
- **操作引导**: 在可能的情况下，通过 `actionButtonText` 属性提供明确的下一步操作，如"刷新"、"返回首页"等。
- **保持一致**: 在产品中保持空状态风格的统一性。

## 重要提醒
- 组件内部使用了 CSS 容器查询，**请确保父级元素设置了 `container-type: inline-size` 样式或 TailwindCSS 的 `@container` 类名**。
- 组件内部已集成 UI 规范：
  - 页面级别（`level = EmptyLevel.Page`）：使用主要按钮样式且支持响应式适配
  - 模块级别（`level = EmptyLevel.Module`）：使用次要按钮样式
  - 如需自定义操作区域，请使用 `customAction` 属性

## 组件安装

```bash
npm install @oversea/empty
```

## 快速开始
```tsx
import { Empty, EmptyType, EmptyLevel } from '@oversea/empty'

// 页面级-网络异常
<Empty 
  level={EmptyLevel.Page}
  iconType={EmptyType.NetworkError} 
  title="网络连接失败" 
  description="请检查网络连接或稍后重试"
  actionButtonText="刷新"
  onClickAction={() => window.location.reload()}
/>

// 模块级-内容为空 (无图标)
<Empty 
  level={EmptyLevel.Module}
  iconType={EmptyType.None}
  title="暂无数据" 
  description="当前没有可显示的内容"
  actionButtonText="刷新"
  onClickAction={() => fetchData()}
/>

// 自定义操作区域
<Empty 
  level={EmptyLevel.Page}
  iconType={EmptyType.NoData}
  title="暂无数据" 
  description="当前没有可显示的内容"
  customAction={
    <div className="flex gap-2">
      <Button onClick={createNew}>新建</Button>
      <Button variant="secondary" onClick={refresh}>刷新</Button>
    </div>
  }
/>
```

## Props API

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| level | 组件使用场景级别 | `EmptyLevel` / `keyof typeof EmptyLevel` | `EmptyLevel.Module` | 否 |
| iconType | 空状态图标类型 | `EmptyType` / `keyof typeof EmptyType` | `EmptyType.NoData` | 否 |
| title | 标题文本 | `string` | - | 否 |
| description | 描述文本 | `string` | - | 否 |
| size | 图标尺寸大小（像素） | `number` | `96` | 否 |
| showAction | 是否显示操作区域 | `boolean` | `true` | 否 |
| actionButtonText | 操作按钮文本 | `string` | - | 否 |
| onClickAction | 操作按钮点击事件回调 | `() => void` | - | 否 |
| customAction | 自定义操作区域内容 | `React.ReactNode` | - | 否 |
| className | 自定义 CSS 类名 | `string` | - | 否 |

> **注意**: `customAction` 优先级高于 `actionButtonText`，当同时设置时，只会渲染 `customAction` 内容。

## 枚举类型

### EmptyLevel - 使用场景枚举

| 枚举值 | 描述 | 特点 |
|---|---|---|
| `EmptyLevel.Page` | 页面级缺省图 | 大尺寸图标，主要按钮样式，支持响应式 |
| `EmptyLevel.Module` | 模块级缺省图 | 通常无图标，次要按钮样式，设计简洁 |

### EmptyType - 图标类型枚举

| 枚举值 | 使用场景 | 建议标题 | 建议描述 |
|---|---|---|---|
| `EmptyType.None` | 不展示图标 | 自定义 | 自定义 |
| `EmptyType.NoData` | 列表、表格、数据为空 | "暂无数据"、"列表为空" | "当前没有可显示的内容" |
| `EmptyType.SearchEmpty` | 搜索无结果 | "未找到相关内容"、"搜索结果为空" | "尝试调整搜索关键词或筛选条件" |
| `EmptyType.NetworkError` | 网络错误、请求失败 | "网络连接失败"、"加载失败" | "请检查网络连接或稍后重试" |
| `EmptyType.ServerError` | 服务器错误 | "服务器错误" | "服务器暂时无法响应，请稍后再试" |

## 使用示例

### 页面缺省图（完整内容）
默认页面层级带插图，且按钮使用一级按钮。至少需要保证有标题或者正文出现来总结和提示状态。按钮和插图可选择是否使用。

```tsx
<Empty
  level={EmptyLevel.Page}
  iconType={EmptyType.NetworkError}
  title="网络连接失败"
  description="请检查网络连接或稍后重试"
  actionButtonText="刷新"
/>

<Empty
  level={EmptyLevel.Page}
  iconType={EmptyType.NoData}
  title="暂无数据"
  description="当前没有可显示的内容"
  actionButtonText="刷新"
/>

<Empty
  level={EmptyLevel.Page}
  iconType={EmptyType.ServerError}
  title="服务器错误"
  description="服务器暂时无法响应，请稍后再试"
  actionButtonText="重试"
/>

<Empty
  level={EmptyLevel.Page}
  iconType={EmptyType.SearchEmpty}
  title="未找到相关内容"
  description="尝试调整搜索关键词或筛选条件"
  actionButtonText="重置搜索"
/>
```

### 页面缺省图（无按钮）
不显示操作按钮的页面级空状态。

```tsx
<Empty
  level={EmptyLevel.Page}
  iconType={EmptyType.NetworkError}
  title="网络连接失败"
  description="请检查网络连接或稍后重试"
  showAction={false}
/>

<Empty
  level={EmptyLevel.Page}
  iconType={EmptyType.NoData}
  title="暂无数据"
  description="当前没有可显示的内容"
  showAction={false}
/>
```

### 页面缺省图（无按钮 + 无正文）
仅显示标题的简化版页面级空状态。

```tsx
<Empty
  level={EmptyLevel.Page}
  iconType={EmptyType.NetworkError}
  title="网络连接失败"
  showAction={false}
/>

<Empty
  level={EmptyLevel.Page}
  iconType={EmptyType.NoData}
  title="暂无数据"
  showAction={false}
/>
```

### 模块缺省图（完整内容）
默认模块级不带插图，且按钮使用二级按钮。至少需要保证有标题或者正文出现来总结和提示状态。按钮和插图可选择是否使用。

```tsx
<Empty
  level={EmptyLevel.Module}
  iconType={EmptyType.None}
  title="暂无数据"
  description="当前模块没有可显示的内容"
  actionButtonText="刷新"
/>

<Empty
  level={EmptyLevel.Module}
  iconType={EmptyType.None}
  title="加载失败"
  description="数据加载失败，请重试"
  actionButtonText="重试"
/>
```

### 模块缺省图（无按钮）
不显示操作按钮的模块级空状态。

```tsx
<Empty
  level={EmptyLevel.Module}
  iconType={EmptyType.None}
  title="暂无数据"
  description="当前模块没有可显示的内容"
  showAction={false}
/>
```

### 模块缺省图（无标题）
仅显示描述文本的模块级空状态。

```tsx
<Empty
  level={EmptyLevel.Module}
  iconType={EmptyType.None}
  description="当前模块没有可显示的内容"
  showAction={false}
/>
```

## 最佳实践

1. **页面级 vs 模块级**：页面级用于整页空状态，模块级用于局部组件空状态
2. **图标选择**：根据实际业务场景选择合适的图标类型
3. **文案规范**：标题简洁明了，描述提供具体的操作指导
4. **操作引导**：提供明确的下一步操作，帮助用户解决问题
5. **容器查询**：确保父级元素支持容器查询以获得最佳显示效果