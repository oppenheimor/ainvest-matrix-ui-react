import React, { useState, useEffect } from 'react';
import { DateRangePickerHeader } from './components/DateRangePickerHeader';
import { DateRangeSelector} from './components/DateRangeSelector';
import { DEFAULT_TIMEZONE, DEFAULT_LOCALE, updateDateByOperation, ensureValidRange } from './utils';
import './index.css';
import { 
  SupportedLocale, 
  DateRangePickerCalendarView, 
  DateRangePickerProps, 
  DateRange,
  RangeSelectorActiveInput,
  CalendarView,
  DisplayMode
} from './types';
import { CalendarContent } from './components/CalendarContent';

/**
 * DateRangePicker 组件, 专注于日期范围选择
 */
export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onSelectDateRange,
  dateRange,
  timezone = DEFAULT_TIMEZONE,
  locale = DEFAULT_LOCALE,
  minDate,
  maxDate,
  displayMode = DisplayMode.DEFAULT,
  startPlaceholder = 'Start',
  endPlaceholder = 'End',
}) => {
  // 状态管理
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>(dateRange || { startDate: null, endDate: null });
  const [rangeSelectorActiveInput, setRangeSelectorActiveInput] = useState<RangeSelectorActiveInput | null>(RangeSelectorActiveInput.START);

  // 日期选择视图状态
  const [calendarView, setCalendarView] = useState<DateRangePickerCalendarView>(CalendarView.CALENDAR);

  // 日期导航控制函数
  const updateDisplayDate = (operation: 'prevYear' | 'prevMonth' | 'nextMonth' | 'nextYear') => {
    setDisplayDate((prev) => updateDateByOperation(prev, operation, timezone, calendarView));
  };

  // 标题点击处理函数
  const handleTitleClick = () => {
    if (calendarView === CalendarView.CALENDAR) {
      // 切换到月份选择视图
      setCalendarView(CalendarView.SELECTING_MONTH);
    } else if (calendarView === CalendarView.SELECTING_MONTH) {
      // 当前是月份选择，点击后切换到年份选择视图
      setCalendarView(CalendarView.SELECTING_YEAR);
    } else {
      // 当前是年份选择，点击后返回到日历视图
      setCalendarView(CalendarView.CALENDAR);
    }
  };

  // 日历日期选择回调
  const handleDateSelect = (selectedDay: Date) => {

    // 辅助函数：更新范围并设置状态
    const updateRange = (newRange: DateRange, nextActiveInput: RangeSelectorActiveInput | null) => {
      setSelectedRange(newRange);
      setRangeSelectorActiveInput(nextActiveInput);
      onSelectDateRange?.(newRange);
    };

    if (rangeSelectorActiveInput === RangeSelectorActiveInput.START) {
      // 选择开始日期
      const validRange = ensureValidRange(selectedDay, selectedRange.endDate);
      const nextActive = validRange.startDate && validRange.endDate ? null : RangeSelectorActiveInput.END;
      updateRange(validRange, nextActive);
    } else if (rangeSelectorActiveInput === RangeSelectorActiveInput.END) {
      // 选择结束日期
      const validRange = ensureValidRange(selectedRange.startDate, selectedDay);
      updateRange(validRange, null);
    } else {
      // 没有激活的输入，默认设置为开始日期
      const newRange = { startDate: selectedDay, endDate: null };
      updateRange(newRange, RangeSelectorActiveInput.END);
    }
  };

  // 导航快捷函数
  const handlePrevYear = () => updateDisplayDate('prevYear');
  const handlePrevMonth = () => updateDisplayDate('prevMonth');
  const handleNextMonth = () => updateDisplayDate('nextMonth');
  const handleNextYear = () => updateDisplayDate('nextYear');

  // 当日期范围变化时，更新状态
  useEffect(() => {
    if (dateRange) {
      setSelectedRange(dateRange);
    }
  }, [dateRange]);

  // 日期范围选择器样式
  const datePickerClassName = `widget-date-range-picker widget-date-range-picker-${displayMode} widget-date-range-picker-mode-range`;

  return (
    <div
      className={datePickerClassName}
      aria-label='Date Range Picker'
      role='application'
      id='widget-date-range-picker'
    >
      {/* 日期范围选择器 - 显示在头部导航上方 */}
      <div className='widget-date-range-picker-range-selector'>
        <DateRangeSelector
          rangeSelectorActiveInput={rangeSelectorActiveInput}
          setRangeSelectorActiveInput={setRangeSelectorActiveInput}
          dateRange={selectedRange}
          timezone={timezone}
          startPlaceholder={startPlaceholder}
          endPlaceholder={endPlaceholder}
        />
      </div>

      {/* 头部导航 */}
      <div className='widget-date-range-picker-header'>
        <DateRangePickerHeader
          displayDate={displayDate}
          locale={locale as SupportedLocale}
          timezone={timezone}
          onPrevYear={handlePrevYear}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onNextYear={handleNextYear}
          onTitleClick={handleTitleClick}
          calendarView={calendarView}
        />
      </div>

      {/* 日历主体 */}
      <CalendarContent
        calendarView={calendarView}
        displayDate={displayDate}
        selectedRange={selectedRange}
        rangeSelectorActiveInput={rangeSelectorActiveInput}
        locale={locale as SupportedLocale}
        timezone={timezone}
        minDate={minDate}
        maxDate={maxDate}
        onDateSelect={handleDateSelect}
        setCalendarView={setCalendarView}
        setDisplayDate={setDisplayDate}
      />
    </div>
  );
};

// 导出类型
export type { DateRange, DateRangePickerProps };
