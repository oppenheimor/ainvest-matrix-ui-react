# 日期范围选择器 (Date Range Picker)

一个强大且用户友好的React日期范围选择组件，专为日期范围选择而设计。

## ✨ 特性

- 🎯 **专注日期范围选择** - 专门为选择日期范围而优化
- 🎨 **美观的UI设计** - 基于Figma设计，具有现代化的视觉效果
- 🔄 **智能交互** - 自动焦点管理和状态切换
- 🌍 **多语言支持** - 支持20+种语言
- ⏰ **时区支持** - 内置时区处理
- ♿ **无障碍访问** - 完整的ARIA支持和键盘导航
- 📱 **响应式设计** - 支持桌面端和移动端专用显示模式
- 👆 **触摸优化** - 移动端触摸友好的大按钮设计
- 🎯 **类型安全** - 完整的TypeScript类型定义

## 📖 基本使用

```tsx
import React, { useState } from 'react';
import { DateRangePicker, DateRange } from '@oversea/date-range-picker';

function App() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  });

  const handleDateRangeChange = (range: DateRange) => {
    console.log('选择的日期范围:', range);
    setDateRange(range);
  };

  return (
    <div>
      <DateRangePicker
        onSelectDateRange={handleDateRangeChange}
        dateRange={dateRange}
        locale="en"
        timezone="America/New_York"
      />
    </div>
  );
}
```

## 📱 移动端使用

```tsx
import React, { useState } from 'react';
import { DateRangePicker, DateRange } from '@oversea/date-range-picker';

function MobileApp() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  });

  return (
    <div>
      <DateRangePicker
        onSelectDateRange={setDateRange}
        dateRange={dateRange}
        displayMode="mobile"
        locale="en"
        timezone="America/New_York"
        startPlaceholder="Start Date"
        endPlaceholder="End Date"
      />
    </div>
  );
}
```

## 🎨 自定义占位符

```tsx
import React, { useState } from 'react';
import { DateRangePicker, DateRange } from '@oversea/date-range-picker';

function CustomPlaceholderExample() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  });

  return (
    <div>
      <DateRangePicker
        onSelectDateRange={setDateRange}
        dateRange={dateRange}
        locale="zh-hans"
        timezone="Asia/Shanghai"
        startPlaceholder="选择开始时间"
        endPlaceholder="选择结束时间"
      />
    </div>
  );
}
```

## 🔄 显示模式对比

### 桌面端模式 (`displayMode="default"`)
- 🖥️ **宽屏优化布局** - 适合大屏幕显示
- 🖱️ **鼠标悬停效果** - 丰富的交互反馈
- 📊 **密集信息显示** - 更多信息在同一视图中

### 移动端模式 (`displayMode="mobile"`)
- 📱 **紧凑小屏布局** - 适合手机屏幕
- 👆 **触摸友好按钮** - 大尺寸按钮易于点击
- ⚡ **优化手势操作** - 流畅的触摸体验

## 🎮 交互流程

1. **初始状态**: 开始日期输入框处于激活状态（高亮显示）
2. **选择开始日期**: 点击日历中的日期，自动切换到结束日期选择
3. **选择结束日期**: 选择结束日期后完成范围选择
4. **重新选择**: 点击开始日期输入框可重新开始选择流程

## 📋 API 参考

### DateRangePicker Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|---------|------|
| `onSelectDateRange` | `(range: DateRange) => void` | - | 日期范围选择回调函数 |
| `dateRange` | `DateRange` | `{ startDate: null, endDate: null }` | 受控的日期范围值 |
| `displayMode` | `'default' \| 'mobile'` | `'default'` | 显示模式：桌面端或移动端 |
| `locale` | `SupportedLocale` | `'en'` | 语言设置 |
| `timezone` | `string` | `'America/New_York'` | 时区设置 |
| `minDate` | `Date \| string` | - | 最小可选日期 |
| `maxDate` | `Date \| string` | - | 最大可选日期 |
| `startPlaceholder` | `string` | `'Start'` | 开始日期的占位符文本 |
| `endPlaceholder` | `string` | `'End'` | 结束日期的占位符文本 |

### DateRange 类型

```typescript
interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}
```

### 支持的语言

- `en` - English
- `zh-hans` - 简体中文
- `zh-hant` - 繁体中文
- `ja` - 日本语
- `ko` - 한국어
- `fr` - Français
- `de` - Deutsch
- `es` - Español
- `it` - Italiano
- `pt` - Português
- `ru` - Русский
- `ar` - العربية
- 更多...

## 🔧 高级使用

### 带有限制的日期范围选择

```tsx
<DateRangePicker
  onSelectDateRange={handleDateRangeChange}
  minDate={new Date('2024-01-01')}
  maxDate={new Date('2024-12-31')}
  timezone="Asia/Shanghai"
  locale="zh-hans"
  displayMode="default"
/>
```

### 响应式设计示例

```tsx
import React, { useState, useEffect } from 'react';
import { DateRangePicker, DateRange } from '@oversea/date-range-picker';

function ResponsiveDatePicker() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  });
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <DateRangePicker
      onSelectDateRange={setDateRange}
      dateRange={dateRange}
      displayMode={isMobile ? 'mobile' : 'default'}
      locale="en"
      timezone="America/New_York"
    />
  );
}
```

## 🎯 最佳实践

1. **状态管理**: 使用受控组件模式管理日期范围状态
2. **验证**: 在提交前验证日期范围的有效性
3. **用户反馈**: 提供清晰的视觉反馈表示当前选择状态
4. **错误处理**: 处理无效日期选择的情况
5. **性能优化**: 对频繁的日期选择操作进行防抖处理
6. **响应式设计**: 根据屏幕尺寸选择合适的显示模式
7. **移动端优化**: 在移动设备上使用 `displayMode="mobile"` 获得更好的用户体验

## 🚀 Storybook 演示

项目提供了丰富的 Storybook 演示：

- **受控组件演示** - 展示基本用法和状态管理
- **日期范围限制演示** - 展示如何设置日期范围限制
- **移动端样式演示** - 专门展示移动端优化的界面和交互

运行 Storybook：
```bash
npm run storybook
```

## 📝 更新日志

### v1.2.0
- ✨ 新增 `displayMode` 属性，支持桌面端和移动端显示模式
- 📱 移动端模式优化：触摸友好的大按钮、紧凑布局
- 🎨 移动端样式的 Storybook 演示
- 📚 完善文档和使用示例
- 🔧 改进响应式设计支持

### v1.1.0
- ✨ 新增 `startPlaceholder` 和 `endPlaceholder` 配置选项
- 🎨 支持自定义开始和结束日期的占位符文本
- 📚 更新文档和Storybook演示
- 🔧 改进类型定义和接口设计

### v1.0.0
- ✨ 初始发布
- 🎯 专注日期范围选择功能
- 🎨 基于Figma设计的UI
- 🌍 多语言和时区支持
- ♿ 完整的无障碍访问支持
