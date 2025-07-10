// SVG 类型声明
declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// 枚举定义
export enum RangeSelectorActiveInput {
  START = 'start',
  END = 'end'
}

export enum CalendarView {
  CALENDAR = 'calendar',
  SELECTING_MONTH = 'selectingMonth',
  SELECTING_YEAR = 'selectingYear'
}

export enum DisplayMode {
  DEFAULT = 'default',
  MOBILE = 'mobile'
}

// 日历视图类型 - 使用枚举
export type DateRangePickerCalendarView = CalendarView;

// 日期范围类型
export type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
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

// 基础日期范围选择器属性接口
export interface BaseDateRangePickerProps {
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

// 日期范围选择器组件属性
export interface DateRangePickerProps {
  /**
   * 日期范围选择回调
   */
  onSelectDateRange?: (range: DateRange) => void;
  
  /**
   * 初始日期范围
   */
  dateRange?: DateRange;
  
  /**
   * 指定dayjs时区
   * @default 'America/New_York' (美东时区)
   */
  timezone?: string;

  /**
   * 组件的多语言设置
   * @default 'en'
   */
  locale?: SupportedLocale | string;

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
   * 日历显示形态
   * @default DisplayMode.DEFAULT - 默认显示形态（常规桌面视图）
   * @example displayMode={DisplayMode.MOBILE} - 移动端显示形态（窄屏视图）
   */
  displayMode?: DisplayMode;

  /**
   * 开始日期占位符文本
   * @default 'Start'
   */
  startPlaceholder?: string;

  /**
   * 结束日期占位符文本
   * @default 'End'
   */
  endPlaceholder?: string;
}

// 年月记录类型
export type YearMonthRecord = Record<number, number>;
