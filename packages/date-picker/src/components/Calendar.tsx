import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { BaseDatePickerProps } from '../types';
import {
  getCalendarGrid,
  isSameDay,
  isDateInRange,
  getToday,
  getLocalizedWeekdaysShort,
  getWeekDates,
  DEFAULT_TIMEZONE,
  isDateDisabled,
} from '../utils';

interface CalendarProps extends BaseDatePickerProps {
  currentDate: Date;
  selectedDate?: Date;
}

/**
 * 日历视图组件
 */
export const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  selectedDate,
  locale,
  timezone = DEFAULT_TIMEZONE,
  handleDateSelect,
  viewMode,
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

  // 计算日期范围（周模式下使用）
  const selectedDateRange = useMemo(() => {
    if (viewMode === 'week' && selectedDate) {
      return getWeekDates(selectedDate, timezone);
    }
    return undefined;
  }, [selectedDate, viewMode, timezone]);

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

  // 判断是否是选中日期
  const isSelectedDay = (date: Date): boolean => {
    if (viewMode === 'day' && selectedDate instanceof Date) {
      return isSameDay(date, selectedDate, timezone);
    }
    return false;
  };

  // 判断日期是否在选中周内
  const isInSelectedWeek = (date: Date): boolean => {
    if (viewMode === 'week' && selectedDateRange) {
      return isDateInRange(date, selectedDateRange.from, selectedDateRange.to, timezone);
    }
    return false;
  };

  // 判断是否是周的开始或结束日期
  const isWeekStartOrEnd = (date: Date): { isStart: boolean; isEnd: boolean } => {
    if (viewMode === 'week' && selectedDateRange) {
      return {
        isStart: isSameDay(date, selectedDateRange.from, timezone),
        isEnd: isSameDay(date, selectedDateRange.to, timezone),
      };
    }
    return { isStart: false, isEnd: false };
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
      <div className='date-picker-days'>
        {calendarWeeks.map((week, weekIndex) => {
          // 判断该周是否有被选中的日期
          const hasSelectedDateInWeek = viewMode === 'week' && week.some((day) => isInSelectedWeek(day.date));
          
          // 判断该周是否包含禁用日期
          const hasDisabledDateInWeek = week.some((day) => isDateDisabled(day.date, minDate, maxDate, timezone));

          // 确定周应用的CSS类
          const weekClasses = [
            'date-picker-week', 
            hasSelectedDateInWeek ? 'selected-week' : '',
            hasDisabledDateInWeek ? 'has-disabled-date' : ''
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={`week-${weekIndex}`} className={weekClasses} role='row'>
              {week.map((day, dayIndex) => {
                const isSelected = isSelectedDay(day.date);
                const inSelectedWeek = isInSelectedWeek(day.date);
                const { isStart, isEnd } = isWeekStartOrEnd(day.date);
                const isToday = isSameDay(day.date, today, timezone);
                const isDisabled = isDateDisabled(day.date, minDate, maxDate, timezone);

                // 确定日期应用的CSS类
                const dayClasses = [
                  'date-picker-day',
                  day.type,
                  isSelected ? 'selected' : '',
                  inSelectedWeek ? 'in-range' : '',
                  isStart ? 'range-start' : '',
                  isEnd ? 'range-end' : '',
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
                    aria-selected={isSelected || inSelectedWeek ? 'true' : 'false'}
                    aria-disabled={isDisabled ? 'true' : 'false'}
                  >
                    <button
                      className='date-picker-day-text'
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
    <div className='date-picker-calendar' role='grid'>
      {/* 星期标题 - 使用本地化的星期名称 */}
      <div className='date-picker-weekdays' role='row'>
        {weekdaysShort.map((day, index) => (
          <div key={index} className='date-picker-weekday' role='columnheader'>
            {day}
          </div>
        ))}
      </div>

      {/* 日期网格 - 使用提取的渲染函数 */}
      {renderCalendarGrid()}
    </div>
  );
};
