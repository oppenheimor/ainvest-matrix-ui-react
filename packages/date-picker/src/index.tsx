import React, { useState, useEffect, useRef } from 'react';
import { DatePickerHeader } from './components/DatePickerHeader';
import { DatePickerModeSelector } from './components/DatePickerModeSelector';
import {
  DEFAULT_TIMEZONE,
  DEFAULT_LOCALE,
  getDateRange,
  validateViewMode,
  validateDateInput,
  updateDateByOperation,
  getEffectiveViewMode,
  getEffectiveDate,
} from './utils';
import './index.css';
import { DatePickerMode, DatePickerProps, SupportedLocale, DatePickerCalendarView } from './types';
import { CalendarContent } from './components/CalendarContent';

/**
 * DatePicker 组件, 支持月、周、日三种模式选择日期
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  defaultDate,
  defaultViewMode = 'day',
  date,
  viewMode,
  onSelectDate,
  onViewModeChange,
  timezone = DEFAULT_TIMEZONE,
  locale = DEFAULT_LOCALE,
  minDate,
  maxDate,
  displayMode = 'default',
  datePickerModes = ['month', 'week', 'day'],
}) => {
  // ======== 状态管理 ========
  const isInitialized = useRef(false);

  // 判断是否为受控组件
  const isViewModeControlled = viewMode !== undefined;
  const isDateControlled = date !== undefined;

  // 组件内部状态 - 仅在非受控模式下使用
  const [viewModeState, setViewModeState] = useState<DatePickerMode>(defaultViewMode);
  const [displayDate, setDisplayDate] = useState<Date>();
  const [selectedDate, setSelectedDate] = useState<Date>();

  // 添加日期选择模式状态（day/week/month/year）和标题点击选择状态
  const [calendarView, setCalendarView] = useState<DatePickerCalendarView>('calendar');
  const [showModeSelector, setShowModeSelector] = useState(true);

  // ======== 工具函数 ========

  // 获取当前日期
  const getCurrentDate = () => {
    return getEffectiveDate(isDateControlled, date, selectedDate);
  };

  // 获取当前视图模式
  const getCurrentViewMode = () => {
    return getEffectiveViewMode(isViewModeControlled, viewMode, viewModeState);
  };

  // 日期导航控制函数
  const updateDisplayDate = (operation: 'prevYear' | 'prevMonth' | 'nextMonth' | 'nextYear') => {
    const currentViewMode = getCurrentViewMode();
    setDisplayDate((prev) => updateDateByOperation(prev, operation, timezone, currentViewMode, calendarView));
  };

  // ======== 事件处理函数 ========

  // 切换日期选择模式
  const handleModeChange = (mode: DatePickerMode) => {
    // 非受控模式下更新内部状态
    if (!isViewModeControlled) {
      setViewModeState(mode);
    }
    // 回调通知日期选中
    const currentDate = getCurrentDate();
    if (currentDate) {
      onSelectDate?.(currentDate, mode, getDateRange(currentDate, mode, timezone));
    }
    // 回调通知模式切换
    onViewModeChange?.(mode);
  };

  // 标题点击处理函数
  const handleTitleClick = () => {
    if (calendarView === 'calendar') {
      if (getCurrentViewMode() === 'day' || getCurrentViewMode() === 'week') {
        // 切换到月份选择视图
        setCalendarView('selectingMonth');
        setShowModeSelector(false);
      } else if (getCurrentViewMode() === 'month') {
        // 切换到年份选择视图
        setCalendarView('selectingYear');
        setShowModeSelector(false);
      } else if (getCurrentViewMode() === 'year') {
        // 年视图模式下不执行任何操作
        return;
      }
    } else if (calendarView === 'selectingMonth') {
      // 当前是月份选择，点击后切换到年份选择视图
      setCalendarView('selectingYear');
      setShowModeSelector(false);
    } else {
      // 当前是年份选择，点击后返回到日历视图
      setCalendarView('calendar');
      setShowModeSelector(true);
    }
  };

  // 处理日期选择时恢复到日历视图
  const handleDateSelect = (selectedDay: Date) => {
    // 非受控模式下更新内部状态
    if (!isDateControlled) {
      setSelectedDate(selectedDay);
      setDisplayDate(selectedDay);
    }

    // 回调通知日期选中
    const currentViewMode = getCurrentViewMode();
    onSelectDate?.(selectedDay, currentViewMode, getDateRange(selectedDay, currentViewMode, timezone));
  };

  // 导航快捷函数
  const handlePrevYear = () => updateDisplayDate('prevYear');
  const handlePrevMonth = () => updateDisplayDate('prevMonth');
  const handleNextMonth = () => updateDisplayDate('nextMonth');
  const handleNextYear = () => updateDisplayDate('nextYear');

  // ======== 副作用管理 ========

  // 初始化组件 - 只执行一次
  useEffect(() => {
    if (!isInitialized.current) {
      // 验证参数
      const dateValidation = validateDateInput(defaultDate, date, isDateControlled);
      if (!dateValidation.valid) return;

      const isViewModeValid = validateViewMode(viewMode, defaultViewMode, isViewModeControlled);
      if (!isViewModeValid) return;

      // 设置初始视图模式
      if (!isViewModeControlled) {
        setViewModeState(defaultViewMode);
      }

      const initialDate = dateValidation.initialDate;

      // 设置显示日期（无论是否受控）
      setDisplayDate(initialDate || new Date());

      // 处理日期选择和回调
      if (!isDateControlled) {
        setSelectedDate(initialDate);
      }

      isInitialized.current = true;
    }
  }, [isDateControlled, defaultDate, defaultViewMode, isViewModeControlled, viewMode, onSelectDate, date]);

  // 当受控模式下date变化时，更新displayDate
  useEffect(() => {
    if (isDateControlled && date) {
      setDisplayDate(new Date(date));
    }
  }, [isDateControlled, date]);

  // ======== 渲染UI ========
  // 根据displayMode决定日历形态，添加相应的CSS类
  const datePickerClassName = `date-picker date-picker-${displayMode} date-picker-mode-${getCurrentViewMode()}`;

  return (
    <div className={datePickerClassName} aria-label='Date Picker' role='application'>
      {/* 头部导航 */}
      <div className='date-picker-header'>
        <DatePickerHeader
          displayDate={displayDate}
          viewMode={getCurrentViewMode()}
          locale={locale as SupportedLocale}
          timezone={timezone}
          onPrevYear={handlePrevYear}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onNextYear={handleNextYear}
          onTitleClick={handleTitleClick}
          calendarView={calendarView}
        />

        {/* 视图模式选择 - 仅在非日期选择模式下显示 */}
        {showModeSelector && (
          <DatePickerModeSelector
            viewMode={getCurrentViewMode()}
            locale={locale as SupportedLocale}
            onModeChange={handleModeChange}
            datePickerModes={datePickerModes}
          />
        )}
      </div>

      {/* 日历主体 */}
      <CalendarContent
        calendarView={calendarView}
        displayDate={displayDate}
        selectedDate={getCurrentDate()}
        viewMode={getCurrentViewMode()}
        locale={locale as SupportedLocale}
        timezone={timezone}
        minDate={minDate}
        maxDate={maxDate}
        onDateSelect={handleDateSelect}
        setCalendarView={setCalendarView}
        setShowModeSelector={setShowModeSelector}
        setDisplayDate={setDisplayDate}
      />
    </div>
  );
};
