import React from 'react';
import clsx from 'clsx';
import { DatePickerMode, SupportedLocale } from '../types';
import { M_DATE_PICKER_MODE_LABELS } from '../i18n';

interface DatePickerModeSelectorProps {
  viewMode: DatePickerMode;
  locale: SupportedLocale;
  onModeChange: (mode: DatePickerMode) => void;
  datePickerModes?: DatePickerMode[];
}

/**
 * 日期选择模式组件
 */
export const DatePickerModeSelector: React.FC<DatePickerModeSelectorProps> = ({
  viewMode,
  locale,
  onModeChange,
  datePickerModes,
}) => {
  // 根据当前语言获取模式标签
  const getLocalizedTitle = (mode: DatePickerMode) => {
    return M_DATE_PICKER_MODE_LABELS[mode][locale] || M_DATE_PICKER_MODE_LABELS[mode].en;
  };

  return (
    <div className='date-picker-view-options' role='radiogroup' aria-label='Date Selection Mode'>
      {datePickerModes.map((mode) => (
        <button
          key={mode}
          className={clsx('date-picker-view-btn', {
            active: viewMode === mode,
          })}
          onClick={() => onModeChange(mode)}
          type='button'
          role='radio'
          aria-checked={viewMode === mode}
        >
          {getLocalizedTitle(mode)}
        </button>
      ))}
    </div>
  );
};
