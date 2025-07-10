import React from 'react';
import dayjs from 'dayjs';
import { BaseDateRangePickerProps, DateRangePickerCalendarView, CalendarView } from '../types';
import { formatMonthTitle, DEFAULT_TIMEZONE } from '../utils';
import { ArrowLeft, ArrowRight, DoubleArrowLeft, DoubleArrowRight } from './Icons';
import { M_DATE_PICKER_NAV_LABELS } from '../i18n';

interface DateRangePickerHeaderProps extends Pick<BaseDateRangePickerProps, 'locale' | 'timezone'> {
  displayDate: Date;
  onPrevYear: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onNextYear: () => void;
  onTitleClick?: () => void;
  calendarView: DateRangePickerCalendarView;
}

/**
 * 日期选择器导航头部组件
 */
export const DateRangePickerHeader: React.FC<DateRangePickerHeaderProps> = ({
  displayDate,
  locale,
  timezone = DEFAULT_TIMEZONE,
  onPrevYear,
  onPrevMonth,
  onNextMonth,
  onNextYear,
  onTitleClick,
  calendarView
}) => {
  // 获取本地化的导航按钮标签
  const getLocalizedLabel = (key: keyof typeof M_DATE_PICKER_NAV_LABELS) => {
    return M_DATE_PICKER_NAV_LABELS[key][locale] || M_DATE_PICKER_NAV_LABELS[key].en;
  };

  // 判断是否为月份视图模式或年份视图模式
  const isMonthViewMode =  calendarView === CalendarView.SELECTING_MONTH;
  const isYearViewMode =  calendarView === CalendarView.SELECTING_YEAR;
  const isDayViewMode = !isMonthViewMode && !isYearViewMode && calendarView === CalendarView.CALENDAR;

  // 对于年视图，我们需要计算年份范围
  const getYearRangeTitle = () => {
    const currentYear = dayjs(displayDate).tz(timezone).year();
    const startYear = currentYear - (currentYear % 12);
    return `${startYear}-${startYear + 11}`;
  };

  // 根据视图模式获取标题
  const getTitleContent = () => {
    if (isYearViewMode) {
      return getYearRangeTitle();
    }
    if (isMonthViewMode) {
      return dayjs(displayDate).tz(timezone).year();
    }
    return formatMonthTitle(displayDate, locale, timezone);
  };
  
  return (
    <div className='widget-date-range-picker-nav' role='heading' aria-level={2}>
      <div className='widget-date-range-picker-nav-btn-group'>
        <button className='widget-date-range-picker-nav-btn' onClick={onPrevYear} aria-label={getLocalizedLabel('prevYear')}>
          <DoubleArrowLeft />
        </button>
        {isDayViewMode && (
          <button className='widget-date-range-picker-nav-btn' onClick={onPrevMonth} aria-label={getLocalizedLabel('prevMonth')}>
            <ArrowLeft />
          </button>
        )}
      </div>

      <time 
        className='widget-date-range-picker-title' 
        onClick={onTitleClick}
      >
        {getTitleContent()}
      </time>

      <div className='widget-date-range-picker-nav-btn-group'>
        {isDayViewMode && (
          <button className='widget-date-range-picker-nav-btn' onClick={onNextMonth} aria-label={getLocalizedLabel('nextMonth')}>
            <ArrowRight />
          </button>
        )}
        <button className='widget-date-range-picker-nav-btn' onClick={onNextYear} aria-label={getLocalizedLabel('nextYear')}>
          <DoubleArrowRight />
        </button>
      </div>
    </div>
  );
};
