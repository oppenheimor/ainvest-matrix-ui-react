import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import weekday from 'dayjs/plugin/weekday';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';
import { DateRange, DateRangePickerCalendarView, SupportedLocale } from './types';
import { M_DATE_PICKER_WEEKDAYS_SHORT, M_DATE_PICKER_MONTH_TITLE_FORMAT } from './i18n';

// 初始化插件
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);

// 默认美东时区
export const DEFAULT_TIMEZONE = 'America/New_York';
// 默认语言
export const DEFAULT_LOCALE = 'en';

// 获取星期几的本地化短名称
export const getLocalizedWeekdaysShort = (locale: SupportedLocale): string[] => {
  // 从i18n文件获取当前语言的星期几简称
  return M_DATE_PICKER_WEEKDAYS_SHORT[locale] || M_DATE_PICKER_WEEKDAYS_SHORT.en;
};

/**
 * 日期处理工具函数
 */

/**
 * 获取指定月份的天数
 */
export const getDaysInMonth = (year: number, month: number, tz: string = DEFAULT_TIMEZONE): number => {
  return dayjs().tz(tz).year(year).month(month).daysInMonth();
};

/**
 * 获取指定月份第一天是星期几 (0-6, 0 代表星期日)
 */
export const getFirstDayOfMonth = (year: number, month: number, tz: string = DEFAULT_TIMEZONE): number => {
  return dayjs().tz(tz).year(year).month(month).startOf('month').day();
};

/**
 * 获取日历网格数据
 */
export const getCalendarGrid = (year: number, month: number, tz: string = DEFAULT_TIMEZONE) => {
  const daysInMonth = getDaysInMonth(year, month, tz);
  const firstDay = getFirstDayOfMonth(year, month, tz);

  // 获取上个月的部分日期
  const prevMonthDays = [];
  if (firstDay > 0) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth, tz);

    for (let i = 0; i < firstDay; i++) {
      prevMonthDays.unshift({
        date: dayjs()
          .tz(tz)
          .year(prevMonthYear)
          .month(prevMonth)
          .date(daysInPrevMonth - i)
          .toDate(),
        type: 'prev-month',
      });
    }
  }

  // 获取当前月的日期
  const currentMonthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push({
      date: dayjs().tz(tz).year(year).month(month).date(i).toDate(),
      type: 'current-month',
    });
  }

  // 计算需要显示的行数 (5行或6行)
  // 计算公式: 上个月剩余天数 + 当前月天数 需要几行 (每行7天)
  const totalDays = prevMonthDays.length + daysInMonth;
  const rowsNeeded = Math.ceil(totalDays / 7);
  const totalShown = rowsNeeded * 7;

  // 获取下个月的部分日期
  const nextMonthDays = [];
  const remaining = totalShown - (prevMonthDays.length + currentMonthDays.length);

  if (remaining > 0) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;

    for (let i = 1; i <= remaining; i++) {
      nextMonthDays.push({
        date: dayjs().tz(tz).year(nextMonthYear).month(nextMonth).date(i).toDate(),
        type: 'next-month',
      });
    }
  }

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};

/**
 * 判断两个日期是否是同一天
 */
export const isSameDay = (date1: Date, date2: Date, tz: string = DEFAULT_TIMEZONE): boolean => {
  return dayjs(date1).tz(tz).isSame(dayjs(date2).tz(tz), 'day');
};

/**
 * 格式化月份显示: 根据当前语言显示月份和年份
 */
export const formatMonthTitle = (date: Date, locale: SupportedLocale, tz: string = DEFAULT_TIMEZONE): string => {
  const format = M_DATE_PICKER_MONTH_TITLE_FORMAT[locale] || M_DATE_PICKER_MONTH_TITLE_FORMAT.en;
  return dayjs(date).tz(tz).format(format);
};

/**
 * 获取今天的日期
 */
export const getToday = (tz: string = DEFAULT_TIMEZONE): Date => {
  return dayjs().tz(tz).startOf('day').toDate();
};

/**
 * 判断日期是否有效
 * @param dateInput 需要验证的日期
 * @returns 布尔值，表示输入是否为有效日期
 */
export const isValidDate = (dateInput: any): boolean => {
  if (!dateInput) return false;
  const d = new Date(dateInput);
  return !isNaN(d.getTime());
};

/**
 * 根据操作类型更新日期
 * @param date 当前日期
 * @param operation 操作类型
 * @param tz 时区
 * @param calendarView 日历视图，用于决定年份视图下的切换单位
 * @returns 更新后的日期
 */
export const updateDateByOperation = (
  date: Date | undefined,
  operation: 'prevYear' | 'prevMonth' | 'nextMonth' | 'nextYear',
  tz: string = DEFAULT_TIMEZONE,
  calendarView?: DateRangePickerCalendarView
): Date => {
  if (!date) {
    date = new Date();
  }

  const djs = dayjs(date).tz(tz);

  // 年模式下，年份切换时一次移动12年
  const yearOffset = calendarView === 'selectingYear' ? 12 : 1;

  switch (operation) {
    case 'prevYear':
      return djs.subtract(yearOffset, 'year').toDate();
    case 'prevMonth':
      return djs.subtract(1, 'month').toDate();
    case 'nextMonth':
      return djs.add(1, 'month').toDate();
    case 'nextYear':
      return djs.add(yearOffset, 'year').toDate();
    default:
      return date;
  }
};

/**
 * 解析日期输入，支持Date对象或字符串
 * @param dateInput 日期输入（Date对象或字符串）
 * @param tz 时区
 * @returns 解析后的Date对象，如果输入无效则返回undefined
 */
export const parseDateInput = (
  dateInput: Date | string | undefined,
  tz: string = DEFAULT_TIMEZONE
): Date | undefined => {
  if (!dateInput) return undefined;

  // 如果已经是Date对象，直接返回
  if (dateInput instanceof Date) {
    return isValidDate(dateInput) ? dateInput : undefined;
  }

  // 尝试解析字符串格式的日期，使用指定的时区
  try {
    const parsed = dayjs.tz(dateInput, tz);
    return parsed.isValid() ? parsed.toDate() : undefined;
  } catch (error) {
    console.error('date parse error:', error);
    return undefined;
  }
};

/**
 * 判断日期是否被禁用（超出可选范围）
 * @param date 要检查的日期
 * @param minDate 最小可选日期（Date对象或字符串）
 * @param maxDate 最大可选日期（Date对象或字符串）
 * @param tz 时区
 * @returns 是否被禁用
 */
export const isDateDisabled = (
  date: Date,
  minDate?: Date | string,
  maxDate?: Date | string,
  tz: string = DEFAULT_TIMEZONE
): boolean => {
  if (!date) return false;

  const currentDate = dayjs(date).tz(tz).startOf('day');

  // 解析并检查最小日期限制
  if (minDate) {
    const parsedMinDate = parseDateInput(minDate, tz);
    if (parsedMinDate) {
      const min = dayjs(parsedMinDate).tz(tz).startOf('day');
      if (currentDate.isBefore(min)) {
        return true;
      }
    }
  }

  // 解析并检查最大日期限制
  if (maxDate) {
    const parsedMaxDate = parseDateInput(maxDate, tz);
    if (parsedMaxDate) {
      const max = dayjs(parsedMaxDate).tz(tz).startOf('day');
      if (currentDate.isAfter(max)) {
        return true;
      }
    }
  }

  return false;
};

// 辅助函数：确保日期范围正确（开始日期 <= 结束日期）
export const ensureValidRange = (startDate: Date | null, endDate: Date | null): DateRange => {
  if (startDate && endDate && startDate > endDate) {
    return { startDate: endDate, endDate: startDate };
  }
  return { startDate, endDate };
};
