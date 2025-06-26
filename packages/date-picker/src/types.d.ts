// SVG 类型声明
declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// 日期选择模式
export type DatePickerMode = 'year' | 'month' | 'week' | 'day';

// 日历显示形态
export type DatePickerDisplayMode = 'default' | 'mobile';

// 日历视图
export type DatePickerCalendarView = 'calendar' | 'selectingMonth' | 'selectingYear';

// 日期范围类型
export type DateRange = {
  from: Date;
  to: Date;
};

// 支持的语言类型
export type SupportedLocale =
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

// 基础日期选择器属性接口
export interface BaseDatePickerProps {
  /**
   * 组件的多语言设置
   */
  locale: SupportedLocale;

  /**
   * 指定dayjs时区
   * @default 'America/New_York' (美东时区)
   */
  timezone?: string;

  /**
   * 日期选择模式
   */
  viewMode: DatePickerMode;

  /**
   * 最小可选日期
   */
  minDate?: Date | string;

  /**
   * 最大可选日期
   */
  maxDate?: Date | string;

  /**
   * 选中日期回调
   */
  handleDateSelect: (date: Date) => void;
}

// 日期选择器组件属性
export interface DatePickerProps {
  /**
   * 日历显示形态
   * @default 'default' - 默认显示形态（常规桌面视图）
   * @example displayMode='mobile' - 移动端显示形态（窄屏视图）
   */
  displayMode?: DatePickerDisplayMode;

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
   * 支持 Date 对象或日期字符串（ISO格式或其他标准格式）
   * 字符串格式将根据设置的时区进行解析
   */
  minDate?: Date | string;

  /**
   * 最大可选日期
   * 支持 Date 对象或日期字符串（ISO格式或其他标准格式）
   * 字符串格式将根据设置的时区进行解析
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
   * 指定dayjs时区
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

  /**
   * 日期选择模式
   * @default ['month', 'week', 'day']
   */
  datePickerModes?: DatePickerMode[];
}

// 年月记录类型
export type YearMonthRecord = Record<number, number>;
