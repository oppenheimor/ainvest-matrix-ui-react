import React from 'react';
import dayjs from 'dayjs';
import { BaseDatePickerProps } from '../types';
import { Calendar } from './Calendar';
import { MonthCalendar } from './MonthCalendar';
import { YearCalendar } from './YearCalendar';
import { DEFAULT_TIMEZONE } from '../utils';

interface DatePickerContentProps extends BaseDatePickerProps {
  displayDate: Date;
  selectedDate: Date;
}

/**
 * 日期选择器内容组件
 */
export const DatePickerContent: React.FC<DatePickerContentProps> = ({
  viewMode,
  displayDate,
  selectedDate,
  locale,
  timezone = DEFAULT_TIMEZONE,
  handleDateSelect,
  minDate,
  maxDate,
}) => {
  if (viewMode === 'year') {
    // 计算12年区间的起始年份（向下取整到12的倍数）
    const currentYear = dayjs(displayDate).tz(timezone).year();
    const startYear = currentYear - (currentYear % 12);
    
    return (
      <div role='region' aria-live='polite'>
        <YearCalendar
          startYear={startYear}
          selectedDate={selectedDate}
          locale={locale}
          timezone={timezone}
          handleDateSelect={handleDateSelect}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    );
  }
  
  if (viewMode === 'month') {
    return (
      <div role='region' aria-live='polite'>
        <MonthCalendar
          currentYear={dayjs(displayDate).tz(timezone).year()}
          selectedDate={selectedDate}
          locale={locale}
          timezone={timezone}
          handleDateSelect={handleDateSelect}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    );
  }

  return (
    <div role='region' aria-live='polite'>
      <Calendar
        currentDate={displayDate}
        selectedDate={selectedDate}
        locale={locale}
        timezone={timezone}
        handleDateSelect={handleDateSelect}
        viewMode={viewMode}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};
