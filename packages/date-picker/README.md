# @oversea/date-picker 日期选择组件

## 1、需求背景

在财经日历中需要一个日期选择组件，该组件可以支持日、周、月三种日期选择模式，并支持受控和非受控两种使用方式。

## 2、UI, UE 设计

组件提供简洁直观的日期选择界面，包含以下主要元素：

1. 日期导航区域：年月显示、上下月/年切换按钮
2. 视图模式选择：日/周/月模式切换
3. 日历主体：根据不同视图模式展示对应的日期选择界面

组件支持以下交互方式：

- 点击日期直接选择
- 通过导航按钮切换月份/年份
- 切换不同的视图模式

## 3、功能设计

### 3.1 组件能力

1. 多种视图模式

   - 日视图：选择单一日期
   - 周视图：选择整周日期范围
   - 月视图：选择整月日期范围

2. 灵活的使用模式

   - 受控模式：组件状态由父组件控制
   - 非受控模式：组件内部管理自身状态

3. 时区支持

   - 可配置时区，默认使用北美时区

4. 多语言支持

   - 支持多种语言设置

5. 日期导航
   - 支持上/下一年、上/下一月导航

### 3.2 核心特性

1. 组件状态管理

   - 判断受控/非受控模式
   - 维护内部日期状态
   - 处理日期选择逻辑

2. 日期计算与转换

   - 日期范围计算
   - 时区处理
   - 周起始/结束日期计算

3. 视图切换与渲染
   - 动态渲染不同视图模式的日历
   - 处理视图模式切换逻辑

## 4、开发方案

### 4.1 组件结构

组件采用分层设计，包含以下子组件：

1. DatePickerHeader：头部导航组件

   - 显示当前年月
   - 提供年月导航按钮

2. DatePickerModeSelector：视图模式选择器

   - 提供日/周/月模式切换

3. DatePickerContent：日历主体
   - 根据不同视图模式渲染对应的日历内容
   - 处理日期选择事件

### 4.2 API 设计

```typescript
interface DatePickerProps {
  /**
   * 日历显示形态
   * @default 'default' - 默认显示形态（常规桌面视图）
   * @example displayMode='mobile' - 移动端显示形态（窄屏视图）
   */
  displayMode?: 'default' | 'mobile';

  /**
   * 默认的视图模式：'month', 'week', 'day'
   * @default 'day'
   */
  defaultViewMode?: DatePickerMode;

  /**
   * 当前视图模式（受控模式）
   * @default 'day'
   */
  viewMode?: DatePickerMode;

  /**
   * 选中的默认日期 Date
   */
  defaultDate?: Date;

  /**
   * 当前选中的日期（受控模式）Date
   */
  date?: Date;

  /**
   * 最小可选日期
   * 支持Date对象或日期字符串格式（ISO格式或其他标准格式）
   * 字符串格式会根据timezone参数进行解析
   * @example minDate={new Date(2023, 0, 1)} 或 minDate="2023-01-01"
   */
  minDate?: Date | string;

  /**
   * 最大可选日期
   * 支持Date对象或日期字符串格式（ISO格式或其他标准格式）
   * 字符串格式会根据timezone参数进行解析
   * @example maxDate={new Date(2023, 11, 31)} 或 maxDate="2023-12-31"
   */
  maxDate?: Date | string;

  /**
   * 视图模式变更回调
   */
  onViewModeChange?: (viewMode: DatePickerMode) => void;

  /**
   * 选中日期回调
   */
  onSelectDate?: (selectedDate: Date, viewMode: DatePickerMode, selectedDateRange: [Date] | [Date, Date]) => void;

  /**
   * 指定dayjs时区（受控属性，会响应外部变更）
   * @default 'America/New_York' (美东时区)
   * @example timezone='Asia/Shanghai'
   */
  timezone?: string;

  /**
   * 组件的多语言设置（受控属性，会响应外部变更）
   * @default 'en'
   * @example locale='zh-hans'
   */
  locale?: SupportedLocale | string;
}

// 支持的语言类型
type SupportedLocale =
  | 'en'
  | 'zh-hans'
  | 'zh-hant'
  | 'de'
  | 'fr'
  | 'es'
  | 'it'
  | 'ja'
  | 'ko'
  | 'pt'
  | 'ru'
  | 'sv'
  | 'th'
  | 'vi'
  | 'id'
  | 'ar'
  | 'pl'
  | 'tr'
  | 'ms'
  | 'en_in';
```

## 5、使用示例

### 5.1 非受控模式（只指定默认值，组件维护内部状态）

```jsx
<DatePicker
  defaultDate={new Date()}
  defaultViewMode="day"
  onSelectDate={(selectedDate, viewMode, selectedDateRange) => {
    console.log('选中日期:', selectedDate);
    console.log('当前模式:', viewMode);
    console.log('日期范围:', selectedDateRange);
  }}
  onViewModeChange={(viewMode) => {
    console.log('视图模式变更:', viewMode);
  }}
  timezone="Asia/Shanghai"
  locale="zh-hans"
/>
```

### 5.2 受控模式（外部组件维护状态）

```jsx
const [selectedDate, setSelectedDate] = useState(new Date());
const [currentMode, setCurrentMode] = useState('day');

// ...

<DatePicker
  date={selectedDate}
  viewMode={currentMode}
  minDate={new Date(2023, 0, 1)} // 设置最小可选日期为2023年1月1日
  maxDate={new Date(2023, 11, 31)} // 设置最大可选日期为2023年12月31日
  onSelectDate={(selectedDate, viewMode, selectedDateRange) => {
    setSelectedDate(selectedDate);
    console.log('日期范围:', selectedDateRange);
  }}
  onViewModeChange={(viewMode) => {
    setCurrentMode(viewMode);
  }}
  timezone="Asia/Shanghai"
  locale="zh-hans"
/>;
```

### 5.3 使用字符串格式的日期范围

```jsx
<DatePicker
  defaultDate={new Date()}
  defaultViewMode="day"
  // 使用字符串格式设置日期范围
  minDate="2023-01-01" // 设置最小可选日期为2023年1月1日
  maxDate="2023-12-31" // 设置最大可选日期为2023年12月31日
  onSelectDate={(selectedDate, viewMode, selectedDateRange) => {
    console.log('选中日期:', selectedDate);
    console.log('当前模式:', viewMode);
    console.log('日期范围:', selectedDateRange);
  }}
  timezone="Asia/Shanghai"
  locale="zh-hans"
/>

// 也支持ISO格式日期字符串
<DatePicker
  defaultDate={new Date()}
  minDate="2023-01-01T00:00:00.000Z" // ISO格式，表示UTC时间2023年1月1日0点0分0秒
  maxDate="2023-12-31T23:59:59.999Z" // ISO格式，表示UTC时间2023年12月31日23点59分59秒
  timezone="Asia/Shanghai" // 将会根据Shanghai时区解析日期字符串
  locale="zh-hans"
/>
```

### 5.4 指定日历显示形态

```jsx
// 常规桌面形态
<DatePicker
  displayMode="default"
  defaultDate={new Date()}
  defaultViewMode="day"
  timezone="Asia/Shanghai"
  locale="zh-hans"
/>

// 移动端形态
<DatePicker
  displayMode="mobile"
  defaultDate={new Date()}
  defaultViewMode="day"
  timezone="Asia/Shanghai"
  locale="zh-hans"
/>
```

## 6、注意事项

1. 受控与非受控模式

   - 当同时提供 `defaultDate` 和 `date` 时，组件会优先使用受控模式
   - 当同时提供 `defaultViewMode` 和 `viewMode` 时，组件会优先使用受控模式

2. 日期范围限制

   - 可以通过 `minDate` 和 `maxDate` 属性来限制可选择的日期范围
   - 支持 Date 对象或字符串格式的日期输入
   - 字符串格式的日期会根据设置的 timezone 进行解析
   - 超出范围的日期会被禁用，无法选择

3. 参数验证

   - 组件会在初始化时验证传入的参数是否有效
   - 如果参数无效，组件会打印错误信息并终止初始化

4. 组件通过 `displayMode` 属性控制日历的显示形态，完全不使用弹窗或抽屉效果
5. `displayMode="default"` 提供常规桌面视图形态
6. `displayMode="mobile"` 提供适用于移动端的日历形态
7. 组件本身不包含弹窗或抽屉逻辑，需要弹窗效果时请自行在外层包装相应组件
