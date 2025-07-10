import React from 'react';
import { BaseDateRangePickerProps, DateRange } from '../types';
import { Calendar } from './Calendar';
import { DEFAULT_TIMEZONE } from '../utils';

interface DateRangePickerContentProps extends BaseDateRangePickerProps {
  displayDate: Date;
  selectedDate?: Date;
  selectedRange?: DateRange;
}

/**
 * 日期选择器内容组件
 */
export const DateRangePickerContent: React.FC<DateRangePickerContentProps> = ({
  displayDate,
  selectedRange,
  locale,
  timezone = DEFAULT_TIMEZONE,
  handleDateSelect,
  minDate,
  maxDate,
}) => {
  return (
    <div role='region' aria-live='polite'>
      <Calendar
        currentDate={displayDate}
        selectedRange={selectedRange}
        locale={locale}
        timezone={timezone}
        handleDateSelect={handleDateSelect}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};
