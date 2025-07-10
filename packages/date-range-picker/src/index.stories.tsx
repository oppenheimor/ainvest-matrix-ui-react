import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker } from './index';
import dayjs from 'dayjs';
import { SupportedLocale, DisplayMode } from './types';

type Story = StoryObj<typeof meta>;

// Storybook元数据
const meta = {
  title: 'Form/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    startPlaceholder: {
      control: { type: 'text' },
      description: '开始日期的占位符文本',
      defaultValue: 'Start',
    },
    endPlaceholder: {
      control: { type: 'text' },
      description: '结束日期的占位符文本',
      defaultValue: 'End',
    },
    displayMode: {
      control: { type: 'select' },
      options: [DisplayMode.DEFAULT, DisplayMode.MOBILE],
      description: '显示模式：default（桌面端）或 mobile（移动端）',
      defaultValue: DisplayMode.DEFAULT,
    },
    timezone: {
      control: { type: 'select' },
      options: ['Asia/Shanghai', 'America/New_York', 'Europe/London', 'Asia/Tokyo'],
      description: '时区设置',
    },
    locale: {
      control: { type: 'select' },
      options: ['zh-hans', 'zh-hant', 'en', 'ja', 'ko'],
      description: '语言设置',
    },
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;

// 公共样式
const styles = {
  container: {
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '8px',
    width: 'auto',
  },
  title: {
    marginTop: 0,
    marginBottom: '16px',
  },
  buttonGroup: {
    marginTop: '10px',
    marginBottom: '12px',
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  button: (isActive: boolean) => ({
    padding: '5px 10px',
    background: isActive ? '#1677ff' : '#f0f0f0',
    color: isActive ? 'white' : 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }),
  smallButton: (isActive: boolean) => ({
    padding: '4px 8px',
    fontSize: '12px',
    background: isActive ? '#1677ff' : '#f0f0f0',
    color: isActive ? 'white' : 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }),
  settingsBox: {
    marginTop: '10px',
    marginBottom: '10px',
    padding: '8px',
    background: '#f9f9f9',
    borderRadius: '4px',
  },
  selectorContainer: {
    marginBottom: '15px',
  },
};

// 日期范围选择历史项类型
type DateRangeSelectionHistoryItem = {
  startDate: Date | null;
  endDate: Date | null;
  timestamp: number;
};

// 渲染日期范围选择历史
const renderDateRangeSelectionHistory = (selections: DateRangeSelectionHistoryItem[], title: string) => (
  <div style={{ marginTop: '15px' }}>
    <h4 style={{ margin: '0 0 8px 0' }}>{title}</h4>
    {selections.length > 0 ? (
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', maxHeight: '200px', overflow: 'auto' }}>
        {selections.map((item, index) => {
          const formatDateRange = () => {
            const start = dayjs(item.startDate).format('YYYY-MM-DD');
            const end = dayjs(item.endDate).format('YYYY-MM-DD');
            return `${start} 至 ${end}`;
          };
          
          // 根据日期范围的完整性计算状态
          const status = item.startDate && item.endDate ? 'complete' : 
                        item.startDate || item.endDate ? 'incomplete' : 'invalid';
          
          return (
            <li
              key={index}
              style={{
                padding: '8px 12px',
                background: '#f9f9f9',
                marginBottom: '6px',
                borderRadius: '6px',
                fontSize: '14px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ flex: 1 }}>{formatDateRange()}</span>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    marginLeft: '8px',
                    backgroundColor: status === 'complete' ? '#52c41a' : 
                                    status === 'incomplete' ? '#faad14' : '#ff4d4f',
                  }}
                  title={
                    status === 'complete'
                      ? '完整的日期范围'
                      : status === 'incomplete'
                      ? '未完成的日期范围'
                      : '无效的日期范围'
                  }
                />
              </div>
              {item.startDate && item.endDate && (
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  时长: {dayjs(item.endDate).diff(dayjs(item.startDate), 'day') + 1} 天
                </div>
              )}
            </li>
          );
        })}
      </ul>
    ) : (
      <div style={{ color: '#999', fontSize: '14px' }}>暂无选择记录</div>
    )}
  </div>
);

// 通用按钮组件
interface ButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, isActive = false, children, small = false }) => (
  <button onClick={onClick} style={small ? styles.smallButton(isActive) : styles.button(isActive)}>
    {children}
  </button>
);

// 时区选择组件
interface TimezoneSelectProps {
  value: string;
  onChange: (timezone: string) => void;
  options?: Array<{ value: string; label: string }>;
  small?: boolean;
}

const TimezoneSelect: React.FC<TimezoneSelectProps> = ({
  value,
  onChange,
  small = false,
  options = [
    { value: 'Asia/Shanghai', label: '上海' },
    { value: 'America/New_York', label: '纽约' },
    { value: 'Europe/London', label: '伦敦' },
    { value: 'Asia/Tokyo', label: '东京' },
    { value: 'Australia/Sydney', label: '悉尼' },
  ],
}) => (
  <div style={small ? styles.selectorContainer : styles.buttonGroup}>
    {small && <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>选择时区：</label>}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => {
            console.log(`切换时区到${option.label}`);
            onChange(option.value);
          }}
          isActive={value === option.value}
          small={small}
        >
          {option.label}
        </Button>
      ))}
    </div>
  </div>
);

// 语言选择组件
interface LocaleSelectProps {
  value: SupportedLocale;
  onChange: (locale: SupportedLocale) => void;
  options?: Array<{ value: SupportedLocale; label: string }>;
  small?: boolean;
}

const LocaleSelect: React.FC<LocaleSelectProps> = ({
  value,
  onChange,
  small = false,
  options = [
    { value: 'zh-hans', label: '中文简体' },
    { value: 'zh-hant', label: '中文繁体' },
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'de', label: 'Deutsch' },
    { value: 'fr', label: 'Français' },
  ],
}) => (
  <div style={small ? styles.selectorContainer : styles.buttonGroup}>
    {small && <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>选择语言：</label>}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => {
            console.log(`切换语言到${option.label}`);
            onChange(option.value);
          }}
          isActive={value === option.value}
          small={small}
        >
          {option.label}
        </Button>
      ))}
    </div>
  </div>
);

// 受控组件演示
export const ControlledDemo = () => {
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });
  const [timezone, setTimezone] = useState('America/New_York');
  const [locale, setLocale] = useState<SupportedLocale>('en');
  const [selections, setSelections] = useState<DateRangeSelectionHistoryItem[]>([]);

  const handleSelectDateRange = (newRange: { startDate: Date | null; endDate: Date | null }) => {
    setDateRange(newRange);
    console.log('选择日期范围:', newRange);
    setSelections((prev) => [
      { startDate: newRange.startDate!, endDate: newRange.endDate!, timestamp: Date.now() },
      ...prev.slice(0, 4), // 只保留最近5条记录
    ]);
  };

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: '10px' }}>
        <TimezoneSelect value={timezone} onChange={setTimezone} small />
        <LocaleSelect value={locale} onChange={setLocale} small />
      </div>

      <div style={{ width: '560px' }}>
        <DateRangePicker
          dateRange={dateRange}
          onSelectDateRange={handleSelectDateRange}
          timezone={timezone}
          locale={locale}
          startPlaceholder='Start'
          endPlaceholder='End'
        />
      </div>
      {renderDateRangeSelectionHistory(selections, '选择历史')}
    </div>
  );
};

ControlledDemo.storyName = '受控组件演示';

// 日期范围限制演示
export const DateRangeRestrictionDemo = () => {
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: new Date(),
    endDate: null,
  });
  const [timezone, setTimezone] = useState('America/New_York');
  const [locale, setLocale] = useState<SupportedLocale>('en');
  const [selections, setSelections] = useState<DateRangeSelectionHistoryItem[]>([]);

  const handleSelectDateRange = (newRange: { startDate: Date | null; endDate: Date | null }) => {
    setDateRange(newRange);
    if (newRange.startDate) {
      setSelections((prev) => [
        { startDate: newRange.startDate!, endDate: newRange.endDate!, timestamp: Date.now() },
        ...prev.slice(0, 4),
      ]);
    }
  };

  // 设置日期范围限制
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 2); // 两个月前

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2); // 两个月后

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: '10px' }}>
        <strong>日期范围限制演示</strong>
        <div>当前最小可选日期: {dayjs(minDate).format('YYYY-MM-DD')}</div>
        <div>当前最大可选日期: {dayjs(maxDate).format('YYYY-MM-DD')}</div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <TimezoneSelect value={timezone} onChange={setTimezone} small />
        <LocaleSelect value={locale} onChange={setLocale} small />
      </div>

      <div style={{ width: '560px' }}>
        <DateRangePicker
          dateRange={dateRange}
          onSelectDateRange={handleSelectDateRange}
          timezone={timezone}
          locale={locale}
          minDate={minDate}
          maxDate={maxDate}
          startPlaceholder='Start'
          endPlaceholder='End'
        />
      </div>

      {renderDateRangeSelectionHistory(selections, '选择历史 (限制范围内)')}
    </div>
  );
};

DateRangeRestrictionDemo.storyName = '日期范围限制演示';

// 移动端样式演示
export const MobileDisplayDemo = () => {
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });
  const [timezone, setTimezone] = useState('America/New_York');
  const [locale, setLocale] = useState<SupportedLocale>('en');
  const [selections, setSelections] = useState<DateRangeSelectionHistoryItem[]>([]);

  const handleSelectDateRange = (newRange: { startDate: Date | null; endDate: Date | null }) => {
    setDateRange(newRange);
    console.log('移动端选择日期范围:', newRange);
    setSelections((prev) => [
      { startDate: newRange.startDate!, endDate: newRange.endDate!, timestamp: Date.now() },
      ...prev.slice(0, 4), // 只保留最近5条记录
    ]);
  };

  // 移动端专用样式
  const mobileStyles = {
    container: {
      padding: '16px',
      maxWidth: '375px', // 模拟移动端宽度
      margin: '0 auto',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      background: '#ffffff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
      marginTop: 0,
      marginBottom: '16px',
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      color: '#333',
    },
    description: {
      fontSize: '14px',
      color: '#666',
      textAlign: 'center' as const,
      marginBottom: '20px',
      lineHeight: '1.4',
    },
    controlSection: {
      marginBottom: '16px',
      padding: '12px',
      background: '#f8f9fa',
      borderRadius: '8px',
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#333',
    },
    mobileButtonGroup: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '6px',
      justifyContent: 'center',
    },
    mobileButton: (isActive: boolean) => ({
      padding: '8px 12px',
      fontSize: '13px',
      background: isActive ? '#1677ff' : '#ffffff',
      color: isActive ? 'white' : '#333',
      border: isActive ? '1px solid #1677ff' : '1px solid #d9d9d9',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '60px',
      textAlign: 'center' as const,
    }),
    pickerContainer: {
      width: '100%',
      marginBottom: '16px',
    },
    historySection: {
      marginTop: '20px',
    },
    historyTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '12px',
      color: '#333',
    },
    historyList: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      maxHeight: '150px',
      overflow: 'auto',
    },
    historyItem: {
      padding: '10px 12px',
      background: '#f8f9fa',
      marginBottom: '8px',
      borderRadius: '8px',
      fontSize: '13px',
      border: '1px solid #e9ecef',
    },
    historyRange: {
      fontWeight: 'bold',
      color: '#1677ff',
    },
    historyDuration: {
      fontSize: '12px',
      color: '#666',
      marginTop: '4px',
    },
    emptyHistory: {
      color: '#999',
      fontSize: '13px',
      textAlign: 'center' as const,
      padding: '20px',
      fontStyle: 'italic',
    },
  };

  // 移动端时区选择组件
  const MobileTimezoneSelect = () => (
    <div style={mobileStyles.controlSection}>
      <div style={mobileStyles.sectionTitle}>时区设置</div>
      <div style={mobileStyles.mobileButtonGroup}>
        {[
          { value: 'Asia/Shanghai', label: '上海' },
          { value: 'America/New_York', label: '纽约' },
          { value: 'Europe/London', label: '伦敦' },
          { value: 'Asia/Tokyo', label: '东京' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => {
              console.log(`移动端切换时区到${option.label}`);
              setTimezone(option.value);
            }}
            style={mobileStyles.mobileButton(timezone === option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  // 移动端语言选择组件
  const MobileLocaleSelect = () => (
    <div style={mobileStyles.controlSection}>
      <div style={mobileStyles.sectionTitle}>语言设置</div>
      <div style={mobileStyles.mobileButtonGroup}>
        {[
          { value: 'zh-hans', label: '简体' },
          { value: 'en', label: 'EN' },
          { value: 'ja', label: '日本' },
          { value: 'ko', label: '한국' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => {
              console.log(`移动端切换语言到${option.label}`);
              setLocale(option.value as SupportedLocale);
            }}
            style={mobileStyles.mobileButton(locale === option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  // 移动端历史记录渲染
  const renderMobileHistory = () => (
    <div style={mobileStyles.historySection}>
      <div style={mobileStyles.historyTitle}>选择历史</div>
      {selections.length > 0 ? (
        <ul style={mobileStyles.historyList}>
          {selections.map((item, index) => {
            const formatDateRange = () => {
              const start = dayjs(item.startDate).format('MM/DD');
              const end = dayjs(item.endDate).format('MM/DD');
              return `${start} - ${end}`;
            };
            const duration = item.startDate && item.endDate 
              ? dayjs(item.endDate).diff(dayjs(item.startDate), 'day') + 1 
              : 0;
            
            return (
              <li key={index} style={mobileStyles.historyItem}>
                <div style={mobileStyles.historyRange}>
                  {formatDateRange()}
                </div>
                {duration > 0 && (
                  <div style={mobileStyles.historyDuration}>
                    时长: {duration} 天
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div style={mobileStyles.emptyHistory}>
          暂无选择记录
        </div>
      )}
    </div>
  );

  return (
    <div style={mobileStyles.container}>
      <h3 style={mobileStyles.title}>📱 移动端日期选择器</h3>
      <p style={mobileStyles.description}>
        专为移动端设计的日期范围选择器，<br/>
        优化了触摸操作和小屏幕显示
      </p>

      <MobileTimezoneSelect />
      <MobileLocaleSelect />

      <div style={mobileStyles.pickerContainer}>
        <DateRangePicker
          dateRange={dateRange}
          onSelectDateRange={handleSelectDateRange}
          timezone={timezone}
          locale={locale}
          displayMode={DisplayMode.MOBILE}
          startPlaceholder="开始日期"
          endPlaceholder="结束日期"
        />
      </div>

      {renderMobileHistory()}
    </div>
  );
};

MobileDisplayDemo.storyName = '移动端样式演示';