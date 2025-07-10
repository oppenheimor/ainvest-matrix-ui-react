import React from 'react';
import dayjs from 'dayjs';
import { BaseDateRangePickerProps } from '../types';
import { DEFAULT_TIMEZONE, parseDateInput } from '../utils';

interface YearCalendarProps extends BaseDateRangePickerProps {
  startYear: number;
  selectedDate?: Date;
}

/**
 * 年份选择日历组件
 */
export const YearCalendar: React.FC<YearCalendarProps> = ({
  startYear,
  selectedDate,
  timezone = DEFAULT_TIMEZONE,
  handleDateSelect,
  minDate,
  maxDate,
}) => {
  // 创建一个12年的数组，从startYear开始
  const years = Array.from({ length: 12 }, (_, i) => ({
    value: startYear + i,
    label: `${startYear + i}`,
  }));

  // 解析日期范围
  const parsedMinDate = parseDateInput(minDate, timezone);
  const parsedMaxDate = parseDateInput(maxDate, timezone);

  // 检查年份是否被禁用
  const isYearDisabled = (year: number): boolean => {
    // 创建年份的第一天和最后一天
    const firstDayOfYear = dayjs().tz(timezone).year(year).startOf('year').toDate();
    const lastDayOfYear = dayjs().tz(timezone).year(year).endOf('year').toDate();

    // 如果该年份整年都在最小日期之前或最大日期之后，则禁用
    if (parsedMinDate && lastDayOfYear < parsedMinDate) {
      return true;
    }

    if (parsedMaxDate && firstDayOfYear > parsedMaxDate) {
      return true;
    }

    return false;
  };

  // 年份点击处理
  const handleYearClick = (year: number) => {
    // 检查年份是否被禁用
    if (isYearDisabled(year)) {
      return;
    }

    // 如果没有当前选中日期，则使用当前日期的月和日
    let newDate;
    // 如果没有选中日期，使用当前日期的月和日
    const now = dayjs().tz(timezone);
    newDate = now.year(year).month(now.month()).date(now.date()).toDate();

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
    <div className='widget-date-range-picker-year-calendar'>
      <div className='widget-date-range-picker-years'>
        <div className='widget-date-range-picker-years-grid'>
          {years.map((year) => {
            // 判断当前年份是否被选中
            const isSelected = selectedDate && dayjs(selectedDate).tz(timezone).year() === year.value;

            const isDisabled = isYearDisabled(year.value);

            // 确定年份应用的CSS类
            const yearClasses = [
              'widget-date-range-picker-year',
              isSelected ? 'selected' : '',
              isDisabled ? 'disabled' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={year.value}
                className={yearClasses}
                onClick={() => handleYearClick(year.value)}
                aria-disabled={isDisabled ? 'true' : 'false'}
              >
                <span className='widget-date-range-picker-year-text'>{year.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
