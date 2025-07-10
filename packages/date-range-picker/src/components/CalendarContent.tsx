import React from 'react';
import dayjs from 'dayjs';
import { SupportedLocale, DateRangePickerCalendarView, DateRange, RangeSelectorActiveInput, CalendarView } from '../types';
import { DateRangePickerContent } from './DateRangePickerContent';
import { MonthCalendar } from './MonthCalendar';
import { YearCalendar } from './YearCalendar';

interface CalendarContentProps {
  calendarView: DateRangePickerCalendarView;
  displayDate: Date | undefined;
  selectedRange?: DateRange;
  rangeSelectorActiveInput?: RangeSelectorActiveInput | null;
  locale: SupportedLocale;
  timezone: string;
  minDate?: Date | string;
  maxDate?: Date | string;
  onDateSelect: (date: Date) => void;
  setCalendarView: (view: DateRangePickerCalendarView) => void;
  setDisplayDate: (date: Date) => void;
}

export const CalendarContent: React.FC<CalendarContentProps> = ({
  calendarView,
  displayDate,
  selectedRange,
  rangeSelectorActiveInput,
  locale,
  timezone,
  minDate,
  maxDate,
  onDateSelect,
  setCalendarView,
  setDisplayDate,
}) => {
  if (!displayDate) return null;

  // 根据selectedRange和rangeSelectorActiveInput确定当前应该高亮的日期
  const getSelectedDate = (): Date | undefined => {
    if (!selectedRange) return undefined;

    // 如果有活跃的输入，优先显示对应的日期
    if (rangeSelectorActiveInput === RangeSelectorActiveInput.START && selectedRange.startDate) {
      return selectedRange.startDate;
    }
    if (rangeSelectorActiveInput === RangeSelectorActiveInput.END && selectedRange.endDate) {
      return selectedRange.endDate;
    }

    // 否则优先显示开始日期，再显示结束日期
    return selectedRange.startDate || selectedRange.endDate;
  };

  const selectedDate = getSelectedDate();
  // 渲染标准日历视图
  if (calendarView === CalendarView.CALENDAR) {
    return (
      <DateRangePickerContent
        displayDate={displayDate}
        selectedRange={selectedRange}
        locale={locale}
        timezone={timezone}
        handleDateSelect={onDateSelect}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  }

  // 渲染月份选择视图
  if (calendarView === CalendarView.SELECTING_MONTH) {
    return (
      <div role='region' aria-live='polite'>
        <MonthCalendar
          currentYear={dayjs(displayDate).tz(timezone).year()}
          selectedDate={selectedDate}
          locale={locale}
          timezone={timezone}
          handleDateSelect={(date) => {
            setDisplayDate(date);
            setCalendarView(CalendarView.CALENDAR);
          }}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    );
  }

  // 渲染年份选择视图
  if (calendarView === CalendarView.SELECTING_YEAR) {
    return (
      <div role='region' aria-live='polite'>
        <YearCalendar
          startYear={dayjs(displayDate).tz(timezone).year() - (dayjs(displayDate).tz(timezone).year() % 12)}
          selectedDate={selectedDate}
          locale={locale}
          timezone={timezone}
          handleDateSelect={(date) => {
            setDisplayDate(date);
            setCalendarView(CalendarView.SELECTING_MONTH);
          }}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    );
  }

  // 默认返回null
  return null;
};
