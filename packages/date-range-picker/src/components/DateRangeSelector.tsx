import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { DEFAULT_TIMEZONE } from '../utils';
import { DateRange, RangeSelectorActiveInput } from '../types';
import './DateRangeSelector.css';

interface DateRangeSelectorProps {
  /**
   * 当前选中的日期范围
   */
  dateRange?: DateRange;

  /**
   * 日期范围选择回调
   */
  onChange?: (range: DateRange) => void;

  /**
   * 时区设置
   */
  timezone?: string;

  /**
   * 占位符文本
   */
  startPlaceholder?: string;
  endPlaceholder?: string;

  /**
   * 当前聚焦的输入框
   */
  rangeSelectorActiveInput?: RangeSelectorActiveInput | null;

  /**
   * 设置当前聚焦的输入框
   */
  setRangeSelectorActiveInput: (input: RangeSelectorActiveInput | null) => void;
}

/**
 * 日期范围选择器组件
 * 支持开始和结束日期的选择，带有交互状态管理
 */
export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  dateRange,
  rangeSelectorActiveInput,
  setRangeSelectorActiveInput,
  timezone = DEFAULT_TIMEZONE,
  startPlaceholder,
  endPlaceholder,
}) => {

  // 引用用于焦点管理
  const startInputRef = useRef<HTMLButtonElement>(null);
  const endInputRef = useRef<HTMLButtonElement>(null);

  // 格式化日期显示
  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return dayjs(date).tz(timezone).format('MMM DD, YYYY');
  };

  // 处理开始日期点击
  const handleStartClick = () => {
    setRangeSelectorActiveInput(RangeSelectorActiveInput.START);
  };

  // 处理结束日期点击
  const handleEndClick = () => {
    setRangeSelectorActiveInput(RangeSelectorActiveInput.END);
  };

  // 同步外部值变化
  useEffect(() => {
    if (dateRange) {
      // 如果外部传入的范围是完整的, 则不进行聚焦
      if (dateRange.startDate && dateRange.endDate) {
        setRangeSelectorActiveInput(null);
      }
      // 如果只有开始日期，保持聚焦在开始日期
      else if (dateRange.startDate && !dateRange.endDate) {
        setRangeSelectorActiveInput(RangeSelectorActiveInput.END);
      }
      // 如果只有结束日期，保持聚焦在结束日期
      else if (dateRange.endDate && !dateRange.startDate) {
        setRangeSelectorActiveInput(RangeSelectorActiveInput.START);
      }
      // 如果都没有，聚焦到开始日期
      else {
        setRangeSelectorActiveInput(RangeSelectorActiveInput.START);
      }
    }
  }, [dateRange]);

  // 获取按钮的样式类名
  const getButtonClassName = (type: RangeSelectorActiveInput) => {
    const baseClass = 'widget-date-range-selector-btn';
    const isActive = rangeSelectorActiveInput === type;

    return `${baseClass} ${isActive ? `${baseClass}-active` : ''}`;
  };

  return (
    <div className='widget-date-range-selector'>
      <div className='widget-date-range-selector-container'>
        {/* 开始日期按钮 */}
        <button ref={startInputRef} className={getButtonClassName(RangeSelectorActiveInput.START)} onClick={handleStartClick} type='button'>
          <span className='widget-date-range-selector-btn-text'>
            {formatDate(dateRange?.startDate) || startPlaceholder}
          </span>
        </button>

        {/* 连接符 */}
        <div className='widget-date-range-selector-separator'>
          <svg width='12' height='2' viewBox='0 0 12 2' fill='none'>
            <line x1='0' y1='1' x2='12' y2='1' stroke='currentColor' strokeWidth='1.5' />
          </svg>
        </div>

        {/* 结束日期按钮 */}
        <button ref={endInputRef} className={getButtonClassName(RangeSelectorActiveInput.END)} onClick={handleEndClick} type='button'>
          <span className='widget-date-range-selector-btn-text'>
            {formatDate(dateRange?.endDate) || endPlaceholder}
          </span>
        </button>
      </div>
    </div>
  );
};

// 导出用于外部使用的工具函数
export const useDateRangeSelector = (initialRange?: DateRange) => {
  const [range, setRange] = useState<DateRange>(initialRange || { startDate: null, endDate: null });

  const isRangeComplete = range.startDate && range.endDate;
  const isRangeValid = isRangeComplete && range.startDate <= range.endDate;

  return {
    range,
    setRange,
    isRangeComplete,
    isRangeValid,
    reset: () => setRange({ startDate: null, endDate: null }),
  };
};
