import React from 'react';
import dayjs from 'dayjs';
import { DatePickerMode, SupportedLocale, DatePickerCalendarView } from '../types';
import { DatePickerContent } from './DatePickerContent';
import { MonthCalendar } from './MonthCalendar';
import { YearCalendar } from './YearCalendar';

interface CalendarContentProps {
  calendarView: DatePickerCalendarView;
  displayDate: Date | undefined;
  selectedDate: Date | undefined;
  viewMode: DatePickerMode;
  locale: SupportedLocale;
  timezone: string;
  minDate?: Date | string;
  maxDate?: Date | string;
  onDateSelect: (date: Date) => void;
  setCalendarView: (view: DatePickerCalendarView) => void;
  setShowModeSelector: (show: boolean) => void;
  setDisplayDate: (date: Date) => void;
}

export const CalendarContent: React.FC<CalendarContentProps> = ({
  calendarView,
  displayDate,
  selectedDate,
  viewMode,
  locale,
  timezone,
  minDate,
  maxDate,
  onDateSelect,
  setCalendarView,
  setShowModeSelector,
  setDisplayDate,
}) => {
  if (!displayDate) return null;

  // 渲染标准日历视图(日/周/月/年)
  if (calendarView === 'calendar') {
    return (
      <DatePickerContent
        viewMode={viewMode}
        displayDate={displayDate}
        selectedDate={selectedDate}
        locale={locale}
        timezone={timezone}
        handleDateSelect={onDateSelect}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  }

  // 渲染月份选择视图
  if (calendarView === 'selectingMonth') {
    return (
      <div role='region' aria-live='polite'>
        <MonthCalendar
          currentYear={dayjs(displayDate).tz(timezone).year()}
          selectedDate={selectedDate}
          locale={locale}
          timezone={timezone}
          handleDateSelect={(date) => {
            setDisplayDate(date);
            setCalendarView('calendar');
            setShowModeSelector(true);
            // 如果当前是月视图模式，选择月份后直接触发日期选择
            if (viewMode === 'month') {
              onDateSelect(date);
            }
          }}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    );
  }

  // 渲染年份选择视图
  if (calendarView === 'selectingYear') {
    return (
      <div role='region' aria-live='polite'>
        <YearCalendar
          startYear={dayjs(displayDate).tz(timezone).year() - (dayjs(displayDate).tz(timezone).year() % 12)}
          selectedDate={selectedDate}
          locale={locale}
          timezone={timezone}
          handleDateSelect={(date) => {
            setDisplayDate(date);
            setCalendarView('selectingMonth');
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
