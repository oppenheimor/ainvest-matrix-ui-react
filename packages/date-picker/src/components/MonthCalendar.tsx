import React from 'react';
import dayjs from 'dayjs';
import { BaseDatePickerProps } from '../types';
import { DEFAULT_TIMEZONE, parseDateInput } from '../utils';
import { SHORT_MONTH_NAMES } from '../i18n';

interface MonthCalendarProps extends Omit<BaseDatePickerProps, 'viewMode'> {
  currentYear: number;
  selectedDate?: Date;
}

/**
 * 月份选择日历组件
 */
export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  currentYear,
  selectedDate,
  locale,
  timezone = DEFAULT_TIMEZONE,
  handleDateSelect,
  minDate,
  maxDate,
}) => {
  // 使用i18n中的月份名称，根据locale显示对应语言
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    // 使用SHORT_MONTH_NAMES中对应语言的月份名称，如果没有该语言则使用英文
    label: (SHORT_MONTH_NAMES[locale] || SHORT_MONTH_NAMES.en)[i],
  }));

  // 解析日期范围
  const parsedMinDate = parseDateInput(minDate, timezone);
  const parsedMaxDate = parseDateInput(maxDate, timezone);

  // 检查月份是否被禁用
  const isMonthDisabled = (month: number): boolean => {
    // 创建月份的第一天和最后一天
    const firstDayOfMonth = dayjs().tz(timezone).year(currentYear).month(month).startOf('month').toDate();
    const lastDayOfMonth = dayjs().tz(timezone).year(currentYear).month(month).endOf('month').toDate();

    // 如果该月份整个月都在最小日期之前或最大日期之后，则禁用
    if (parsedMinDate && lastDayOfMonth < parsedMinDate) {
      return true;
    }

    if (parsedMaxDate && firstDayOfMonth > parsedMaxDate) {
      return true;
    }

    return false;
  };

  // 月份点击处理
  const handleMonthClick = (month: number) => {
    // 检查月份是否被禁用
    if (isMonthDisabled(month)) {
      return;
    }

    // 创建新的日期对象，设置为选中月份的第一天
    let newDate = dayjs().tz(timezone).year(currentYear).month(month).date(1).toDate();

    // 如果有最小日期约束，并且选择的日期小于最小日期，就用最小日期
    if (parsedMinDate && newDate < parsedMinDate) {
      newDate = new Date(parsedMinDate);
    }

    // 如果有最大日期约束，并且选择的日期大于最大日期，就用最大日期
    if (parsedMaxDate && newDate > parsedMaxDate) {
      newDate = new Date(parsedMaxDate);
    }

    handleDateSelect(newDate);
  };

  return (
    <div className='date-picker-month-calendar'>
      <div className='date-picker-year-title'>{currentYear}</div>
      <div className='date-picker-months'>
        <div className='date-picker-months-grid'>
          {months.map((month) => {
            // 同时考虑年份和月份进行选中判断
            const isSelected =
              selectedDate &&
              dayjs(selectedDate).tz(timezone).year() === currentYear &&
              dayjs(selectedDate).tz(timezone).month() === month.value;

            const isDisabled = isMonthDisabled(month.value);

            // 确定月份应用的CSS类
            const monthClasses = ['date-picker-month', isSelected ? 'selected' : '', isDisabled ? 'disabled' : '']
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={month.value}
                className={monthClasses}
                onClick={() => handleMonthClick(month.value)}
                aria-disabled={isDisabled ? 'true' : 'false'}
              >
                <span className='date-picker-month-text'>{month.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
