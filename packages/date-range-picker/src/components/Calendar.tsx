import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { BaseDateRangePickerProps } from '../types';
import { DateRange } from '../types';
import {
  getCalendarGrid,
  isSameDay,
  getToday,
  getLocalizedWeekdaysShort,
  DEFAULT_TIMEZONE,
  isDateDisabled,
} from '../utils';

interface CalendarProps extends BaseDateRangePickerProps {
  currentDate: Date;
  selectedRange?: DateRange;
}

/**
 * 日历视图组件
 */
export const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  selectedRange,
  locale,
  timezone = DEFAULT_TIMEZONE,
  handleDateSelect,
  minDate,
  maxDate,
}) => {
  // 获取当前日期
  const today = getToday(timezone);

  // 获取本地化的星期几名称
  const weekdaysShort = useMemo(() => {
    // 使用传入的locale获取星期几简称
    return getLocalizedWeekdaysShort(locale);
  }, [locale]);

  // 生成日历网格数据
  const calendarDays = useMemo(() => {
    return getCalendarGrid(dayjs(currentDate).tz(timezone).year(), dayjs(currentDate).tz(timezone).month(), timezone);
  }, [currentDate, timezone]);

  // 将日历网格按周分组
  const calendarWeeks = useMemo(() => {
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    return weeks;
  }, [calendarDays]);

  // 判断是否是范围选择的开始日期
  const isRangeStart = (date: Date): boolean => {
    if (selectedRange?.startDate) {
      return isSameDay(date, selectedRange.startDate, timezone);
    }
    return false;
  };

  // 判断是否是范围选择的结束日期
  const isRangeEnd = (date: Date): boolean => {
    if (selectedRange?.endDate) {
      return isSameDay(date, selectedRange.endDate, timezone);
    }
    return false;
  };

  // 判断是否在选择范围内
  const isInRange = (date: Date): boolean => {
    if (selectedRange?.startDate && selectedRange?.endDate) {
      const startDate = dayjs(selectedRange.startDate).tz(timezone);
      const endDate = dayjs(selectedRange.endDate).tz(timezone);
      const currentDate = dayjs(date).tz(timezone);
      return currentDate.isAfter(startDate) && currentDate.isBefore(endDate);
    }
    return false;
  };

  // 日期点击处理
  const handleDateClick = (date: Date) => {
    // 如果日期被禁用，则不触发选择
    if (isDateDisabled(date, minDate, maxDate, timezone)) {
      return;
    }
    handleDateSelect(date);
  };

  // 渲染日历网格
  const renderCalendarGrid = () => {
    return (
      <div className='widget-date-range-picker-days'>
        {calendarWeeks.map((week, weekIndex) => {
          
          // 判断该周是否包含禁用日期
          const hasDisabledDateInWeek = week.some((day) => isDateDisabled(day.date, minDate, maxDate, timezone));

          // 确定周应用的CSS类
          const weekClasses = [
            'widget-date-range-picker-week', 
            hasDisabledDateInWeek ? 'has-disabled-date' : ''
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={`week-${weekIndex}`} className={weekClasses} role='row'>
              {week.map((day, dayIndex) => {
                const isRangeStartDate = isRangeStart(day.date);
                const isRangeEndDate = isRangeEnd(day.date);
                const isInRangeDate = isInRange(day.date);
                const isToday = isSameDay(day.date, today, timezone);
                const isDisabled = isDateDisabled(day.date, minDate, maxDate, timezone);

                // 确定日期应用的CSS类
                const dayClasses = [
                  'widget-date-range-picker-day',
                  day.type,
                  isRangeStartDate ? 'range-start' : '',
                  isRangeEndDate ? 'range-end' : '',
                  isInRangeDate ? 'in-range' : '',
                  isToday ? 'today' : '',
                  isDisabled ? 'disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <div
                    key={`day-${weekIndex}-${dayIndex}`}
                    className={dayClasses}
                    role='gridcell'
                    aria-selected={isRangeStartDate || isRangeEndDate ? 'true' : 'false'}
                    aria-disabled={isDisabled ? 'true' : 'false'}
                  >
                    <button
                      className='widget-date-range-picker-day-text'
                      onClick={() => handleDateClick(day.date)}
                      type='button'
                      aria-current={isToday ? 'date' : undefined}
                      disabled={isDisabled}
                    >
                      {dayjs(day.date).tz(timezone).date()}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='widget-date-range-picker-calendar' role='grid'>
      {/* 星期标题 - 使用本地化的星期名称 */}
      <div className='widget-date-range-picker-weekdays' role='row'>
        {weekdaysShort.map((day, index) => (
          <div key={index} className='widget-date-range-picker-weekday' role='columnheader'>
            {day}
          </div>
        ))}
      </div>

      {/* 日期网格 - 使用提取的渲染函数 */}
      {renderCalendarGrid()}
    </div>
  );
};
