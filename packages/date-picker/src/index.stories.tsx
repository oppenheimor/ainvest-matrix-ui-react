import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './index';
import dayjs from 'dayjs';
import { DatePickerMode, SupportedLocale, DatePickerDisplayMode } from './types';
import { getDateRange } from './utils';

type Story = StoryObj<typeof meta>;

// Storybook元数据
const meta = {
  title: 'Example/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultViewMode: {
      control: { type: 'select' },
      options: ['day', 'week', 'month'],
    },
    viewMode: {
      control: { type: 'select' },
      options: ['day', 'week', 'month'],
    },
    displayMode: {
      control: { type: 'select' },
      options: ['default', 'mobile'],
      description: '日历显示形态，default为桌面形态，mobile为移动端形态',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

// 公共样式
const styles = {
  container: {
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '8px',
    width: '560px',
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

// 格式化日期显示
const formatDateRange = (dateRange: [Date] | [Date, Date]) => {
  if (dateRange.length === 1) {
    return dayjs(dateRange[0]).format('YYYY-MM-DD');
  } else {
    return `${dayjs(dateRange[0]).format('YYYY-MM-DD')} ~ ${dayjs(dateRange[1]).format('YYYY-MM-DD')}`;
  }
};

// 包含视图模式的选择历史项类型
type SelectionHistoryItem = {
  dateRange: [Date] | [Date, Date];
  viewMode: DatePickerMode;
};

// 渲染选择历史 - 包含视图模式
const renderSelectionHistory = (selections: SelectionHistoryItem[], title: string) => (
  <div style={{ marginTop: '15px' }}>
    <h4 style={{ margin: '0 0 8px 0' }}>{title}</h4>
    {selections.length > 0 ? (
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {selections.map((item, index) => (
          <li
            key={index}
            style={{
              padding: '4px 8px',
              background: '#f9f9f9',
              marginBottom: '4px',
              borderRadius: '4px',
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{formatDateRange(item.dateRange)}</span>
            <span
              style={{
                padding: '0 6px',
                borderRadius: '3px',
                fontSize: '12px',
                marginLeft: '8px',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {item.viewMode}
            </span>
          </li>
        ))}
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

// 当前设置显示组件
interface CurrentSettingsProps {
  locale: SupportedLocale;
  timezone: string;
}

const CurrentSettings: React.FC<CurrentSettingsProps> = ({ locale, timezone }) => (
  <div style={styles.settingsBox}>
    <div>
      <strong>当前语言:</strong> {locale}
    </div>
    <div>
      <strong>当前时区:</strong> {timezone}
    </div>
  </div>
);

// 受控模式的完整演示
export const ControlledDemo = () => {
  // 受控模式状态
  const [date, setDate] = useState<Date>(new Date('2022-01-01'));
  const [viewMode, setViewMode] = useState<DatePickerMode>('day');
  const [historyDates, setHistoryDates] = useState<SelectionHistoryItem[]>([]);
  const [timezone, setTimezone] = useState<string>('Asia/Shanghai');
  const [locale, setLocale] = useState<SupportedLocale>('zh-hans');

  // 处理受控模式日期选择
  const handleSelectDate = (newDate: Date, viewMode: DatePickerMode, selectedDateRange: [Date] | [Date, Date]) => {
    console.log('受控模式选中日期:', newDate);
    console.log('受控模式选中日期:', viewMode);
    setDate(newDate);
    // 记录日期和当前的视图模式
    setHistoryDates((prev) => [...prev.slice(-4), { dateRange: selectedDateRange, viewMode }]);
  };

  // 处理视图模式变更
  const handleViewModeChange = (viewMode: DatePickerMode) => {
    console.log('视图模式变更:', viewMode);
    setViewMode(viewMode);
  };

  // 日期导航处理函数
  const handleDateNavigation = (
    type: 'prevYear' | 'nextYear' | 'prevMonth' | 'nextMonth' | 'prevWeek' | 'nextWeek' | 'today'
  ) => {
    const currentDate = date;
    let newDate: Date;

    switch (type) {
      case 'prevYear':
        newDate = dayjs(currentDate).subtract(1, 'year').toDate();
        break;
      case 'nextYear':
        newDate = dayjs(currentDate).add(1, 'year').toDate();
        break;
      case 'prevMonth':
        newDate = dayjs(currentDate).subtract(1, 'month').toDate();
        break;
      case 'nextMonth':
        newDate = dayjs(currentDate).add(1, 'month').toDate();
        break;
      case 'prevWeek':
        newDate = dayjs(currentDate).subtract(1, 'week').toDate();
        break;
      case 'nextWeek':
        newDate = dayjs(currentDate).add(1, 'week').toDate();
        break;
      case 'today':
      default:
        newDate = new Date();
        break;
    }

    setDate(newDate);
  };

  // 日期导航按钮
  const DateNavigationButtons = () => (
    <div style={styles.buttonGroup}>
      <Button onClick={() => handleDateNavigation('prevYear')}>上一年</Button>
      <Button onClick={() => handleDateNavigation('nextYear')}>下一年</Button>
      <Button onClick={() => handleDateNavigation('prevMonth')}>上一月</Button>
      <Button onClick={() => handleDateNavigation('nextMonth')}>下一月</Button>
      <Button onClick={() => handleDateNavigation('prevWeek')}>上一周</Button>
      <Button onClick={() => handleDateNavigation('nextWeek')}>下一周</Button>
      <Button onClick={() => handleDateNavigation('today')} isActive={true}>
        今天
      </Button>
    </div>
  );

  // 视图模式切换按钮
  const ViewModeButtons = () => (
    <div style={styles.buttonGroup}>
      <Button onClick={() => setViewMode('day')} isActive={viewMode === 'day'}>
        日视图
      </Button>
      <Button onClick={() => setViewMode('week')} isActive={viewMode === 'week'}>
        周视图
      </Button>
      <Button onClick={() => setViewMode('month')} isActive={viewMode === 'month'}>
        月视图
      </Button>
    </div>
  );

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>受控模式</h3>
      <div style={{ marginBottom: '12px' }}>
        <strong>当前视图模式:</strong> {viewMode}
      </div>
      <div style={{ marginBottom: '12px' }}>
        <strong>当前选中日期:</strong> {formatDateRange(getDateRange(date, viewMode, timezone))}
      </div>
      <CurrentSettings locale={locale} timezone={timezone} />
      <ViewModeButtons />
      <DateNavigationButtons />
      <LocaleSelect value={locale} onChange={setLocale} />
      <TimezoneSelect value={timezone} onChange={setTimezone} />
      <DatePicker
        date={date}
        viewMode={viewMode}
        onSelectDate={handleSelectDate}
        onViewModeChange={handleViewModeChange}
        timezone={timezone}
        locale={locale}
      />
      {renderSelectionHistory(historyDates, '选择历史')}
    </div>
  );
};

ControlledDemo.storyName = '受控模式日期选择器';
ControlledDemo.parameters = {
  docs: {
    description: {
      story: '完全受控的日期选择器，组件的状态由外部控制，包括日期和视图模式。',
    },
  },
};

// 非受控模式的完整演示
export const UncontrolledDemo = () => {
  // 非受控模式选择记录
  const [uncontrolledSelections, setUncontrolledSelections] = useState<SelectionHistoryItem[]>([]);
  const [timezone, setTimezone] = useState<string>('Asia/Shanghai');
  const [locale, setLocale] = useState<SupportedLocale>('zh-hans');

  // 处理非受控模式日期选择
  const handleUncontrolledSelect = (
    selectedDate: Date,
    viewMode: DatePickerMode,
    selectedDateRange: [Date] | [Date, Date]
  ) => {
    console.log('非受控模式选中日期:', selectedDate);
    setUncontrolledSelections((prev) => [...prev.slice(-4), { dateRange: selectedDateRange, viewMode }]);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>非受控模式</h3>
      <p style={{ marginBottom: '12px', fontSize: '14px' }}>组件内部管理自己的状态，只需设置默认值</p>

      <CurrentSettings locale={locale} timezone={timezone} />
      <LocaleSelect
        value={locale}
        onChange={setLocale}
        options={[
          { value: 'zh-hans', label: '中文简体' },
          { value: 'en', label: 'English' },
          { value: 'ja', label: '日本語' },
        ]}
      />
      <TimezoneSelect
        value={timezone}
        onChange={setTimezone}
        options={[
          { value: 'Asia/Shanghai', label: '上海' },
          { value: 'America/New_York', label: '纽约' },
          { value: 'Asia/Tokyo', label: '东京' },
        ]}
      />

      <DatePicker
        defaultDate={new Date('2022-01-01')}
        defaultViewMode='month'
        onSelectDate={handleUncontrolledSelect}
        timezone={timezone}
        locale={locale}
      />

      {renderSelectionHistory(uncontrolledSelections, '选择历史')}
    </div>
  );
};

UncontrolledDemo.storyName = '非受控模式日期选择器';
UncontrolledDemo.parameters = {
  docs: {
    description: {
      story: '非受控模式下的日期选择器，组件内部管理状态，只需设置初始值即可。',
    },
  },
};

// 日期范围限制示例
export const DateRangeRestrictionDemo = () => {
  // 状态管理
  const [date, setDate] = useState<Date>(new Date());
  const [historyDates, setHistoryDates] = useState<SelectionHistoryItem[]>([]);
  const [timezone, setTimezone] = useState<string>('Asia/Shanghai');
  const [locale, setLocale] = useState<SupportedLocale>('zh-hans');

  // 最小和最大日期设置
  const [minDate, setMinDate] = useState<Date>(new Date(date.getFullYear(), date.getMonth() - 1, 1)); // 当前日期往前1个月的1号
  const [maxDate, setMaxDate] = useState<Date>(new Date(date.getFullYear(), date.getMonth(), 1)); // 当前日期往后1个月的1号

  // 日期选择回调
  const handleSelectDate = (newDate: Date, viewMode: DatePickerMode, selectedDateRange: [Date] | [Date, Date]) => {
    console.log('选中日期:', dayjs(newDate).format('YYYY-MM-DD'), '视图模式:', viewMode);
    setDate(newDate);
    setHistoryDates((prev) => [...prev.slice(-4), { dateRange: selectedDateRange, viewMode }]);
  };

  // 重置日期范围
  const resetToCurrentMonth = () => {
    const today = new Date();
    setMinDate(new Date(today.getFullYear(), today.getMonth() - 1, 15));
    setMaxDate(new Date(today.getFullYear(), today.getMonth() + 1, 15));
    setDate(today);
  };

  // 设为上个月
  const setLastMonth = () => {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    setMinDate(new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1));
    setMaxDate(new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0)); // 当月最后一天
    setDate(lastMonth);
  };

  // 设为下个月
  const setNextMonth = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    setMinDate(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1));
    setMaxDate(new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0)); // 当月最后一天
    setDate(nextMonth);
  };

  // 设为今年全部时间
  const setYearRange = () => {
    const today = new Date();
    setMinDate(new Date(today.getFullYear(), 0, 1)); // 1月1日
    setMaxDate(new Date(today.getFullYear(), 11, 31)); // 12月31日
    setDate(today);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>日期范围限制示例</h3>

      <div style={{ marginBottom: '12px' }}>
        <strong>当前选择：</strong> {dayjs(date).format('YYYY-MM-DD')}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <strong>可选范围：</strong> {dayjs(minDate).format('YYYY-MM-DD')} 至 {dayjs(maxDate).format('YYYY-MM-DD')}
      </div>

      <CurrentSettings locale={locale} timezone={timezone} />

      <div style={styles.buttonGroup}>
        <Button onClick={resetToCurrentMonth}>前后各1个月</Button>
        <Button onClick={setLastMonth}>上个月</Button>
        <Button onClick={setNextMonth}>下个月</Button>
        <Button onClick={setYearRange}>今年全年</Button>
      </div>

      <LocaleSelect value={locale} onChange={setLocale} />
      <TimezoneSelect value={timezone} onChange={setTimezone} />

      <DatePicker
        date={date}
        minDate={minDate}
        maxDate={maxDate}
        onSelectDate={handleSelectDate}
        timezone={timezone}
        locale={locale}
      />

      {renderSelectionHistory(historyDates, '选择历史')}
    </div>
  );
};

DateRangeRestrictionDemo.storyName = '日期范围限制';
DateRangeRestrictionDemo.parameters = {
  docs: {
    description: {
      story: '演示如何使用minDate和maxDate属性限制可选日期范围',
    },
  },
};

// 字符串日期输入示例
export const StringDateInputDemo = () => {
  // 状态管理
  const [date, setDate] = useState<Date>(new Date());
  const [historyDates, setHistoryDates] = useState<SelectionHistoryItem[]>([]);
  const [timezone, setTimezone] = useState<string>('Asia/Shanghai');
  const [locale, setLocale] = useState<SupportedLocale>('zh-hans');

  // 使用字符串格式定义日期范围
  const [minDateStr, setMinDateStr] = useState<string>('2023-01-01');
  const [maxDateStr, setMaxDateStr] = useState<string>('2023-12-31');

  // 日期选择回调
  const handleSelectDate = (newDate: Date, viewMode: DatePickerMode, selectedDateRange: [Date] | [Date, Date]) => {
    console.log('选中日期:', dayjs(newDate).format('YYYY-MM-DD'), '视图模式:', viewMode);
    setDate(newDate);
    setHistoryDates((prev) => [...prev.slice(-4), { dateRange: selectedDateRange, viewMode }]);
  };

  // 设置不同格式的日期字符串
  const setISODateFormat = () => {
    setMinDateStr('2023-01-01T00:00:00.000Z');
    setMaxDateStr('2023-12-31T23:59:59.999Z');
  };

  const setSimpleDateFormat = () => {
    setMinDateStr('2023-01-01');
    setMaxDateStr('2023-12-31');
  };

  const setYMDFormat = () => {
    setMinDateStr('2023/01/01');
    setMaxDateStr('2023/12/31');
  };

  const setCurrentYearRange = () => {
    const currentYear = new Date().getFullYear();
    setMinDateStr(`${currentYear}-01-01`);
    setMaxDateStr(`${currentYear}-12-31`);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>字符串日期输入示例</h3>

      <div style={{ marginBottom: '12px' }}>
        <strong>当前选择：</strong> {dayjs(date).format('YYYY-MM-DD')}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <strong>最小日期字符串：</strong> {minDateStr}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <strong>最大日期字符串：</strong> {maxDateStr}
      </div>

      <CurrentSettings locale={locale} timezone={timezone} />

      <div style={styles.buttonGroup}>
        <Button onClick={setISODateFormat}>ISO格式</Button>
        <Button onClick={setSimpleDateFormat}>简单日期格式</Button>
        <Button onClick={setYMDFormat}>年/月/日格式</Button>
        <Button onClick={setCurrentYearRange}>当前年份</Button>
      </div>

      <LocaleSelect value={locale} onChange={setLocale} />
      <TimezoneSelect value={timezone} onChange={setTimezone} />

      <DatePicker
        date={date}
        minDate={minDateStr}
        maxDate={maxDateStr}
        onSelectDate={handleSelectDate}
        timezone={timezone}
        locale={locale}
      />

      {renderSelectionHistory(historyDates, '选择历史')}
    </div>
  );
};

StringDateInputDemo.storyName = '字符串日期输入';
StringDateInputDemo.parameters = {
  docs: {
    description: {
      story: '演示如何使用字符串格式的日期输入来设置minDate和maxDate，组件内部会根据设置的时区进行解析',
    },
  },
};

// 新增 DisplayModeDemo 示例
export const DisplayModeDemo = () => {
  // 状态管理
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<DatePickerMode>('day');
  const [displayMode, setDisplayMode] = useState<DatePickerDisplayMode>('default');
  const [selectedDateRange, setSelectedDateRange] = useState<[Date] | [Date, Date]>([new Date()]);
  const [locale, setLocale] = useState<SupportedLocale>('zh-hans');
  const [timezone, setTimezone] = useState<string>('Asia/Shanghai');
  const [selectionHistory, setSelectionHistory] = useState<SelectionHistoryItem[]>([]);

  // 日期选择处理函数
  const handleSelectDate = (newDate: Date, viewMode: DatePickerMode, selectedDateRange: [Date] | [Date, Date]) => {
    setSelectedDate(newDate);
    setSelectedDateRange(selectedDateRange);

    // 添加到选择历史
    setSelectionHistory((prev) => [
      { dateRange: selectedDateRange, viewMode },
      ...prev.slice(0, 4), // 只保留最近5条记录
    ]);
  };

  // 视图模式切换处理函数
  const handleViewModeChange = (viewMode: DatePickerMode) => {
    setViewMode(viewMode);
    // 更新日期范围
    setSelectedDateRange(getDateRange(selectedDate, viewMode, timezone) as [Date] | [Date, Date]);
  };

  // 显示模式切换按钮组
  const DisplayModeButtons = () => (
    <div>
      <h4 style={{ margin: '0 0 8px 0' }}>显示形态</h4>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button onClick={() => setDisplayMode('default')} isActive={displayMode === 'default'}>
          桌面形态
        </Button>
        <Button onClick={() => setDisplayMode('mobile')} isActive={displayMode === 'mobile'}>
          移动端形态
        </Button>
      </div>
    </div>
  );

  // 视图模式切换按钮组
  const ViewModeButtons = () => (
    <div>
      <h4 style={{ margin: '0 0 8px 0' }}>选择模式</h4>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button onClick={() => handleViewModeChange('day')} isActive={viewMode === 'day'}>
          日
        </Button>
        <Button onClick={() => handleViewModeChange('week')} isActive={viewMode === 'week'}>
          周
        </Button>
        <Button onClick={() => handleViewModeChange('month')} isActive={viewMode === 'month'}>
          月
        </Button>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>显示形态切换演示</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
        <DisplayModeButtons />
        <ViewModeButtons />

        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>语言与时区</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <LocaleSelect value={locale} onChange={setLocale} small />
            <TimezoneSelect value={timezone} onChange={setTimezone} small />
          </div>
        </div>
      </div>

      <div
        style={{
          border: '1px dashed #ccc',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#f8f8f8',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <DatePicker
          displayMode={displayMode}
          date={selectedDate}
          viewMode={viewMode}
          onSelectDate={handleSelectDate}
          onViewModeChange={handleViewModeChange}
          timezone={timezone}
          locale={locale}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>当前设置</h4>
          <div style={styles.settingsBox}>
            <div>
              <strong>显示形态:</strong> {displayMode === 'default' ? '桌面形态' : '移动端形态'}
            </div>
            <div>
              <strong>当前日期:</strong> {dayjs(selectedDate).format('YYYY-MM-DD')}
            </div>
            <div>
              <strong>当前模式:</strong> {viewMode === 'day' ? '日' : viewMode === 'week' ? '周' : '月'}
            </div>
            <div>
              <strong>选择范围:</strong> {formatDateRange(selectedDateRange)}
            </div>
            <div>
              <strong>当前语言:</strong> {locale}
            </div>
            <div>
              <strong>当前时区:</strong> {timezone}
            </div>
          </div>
        </div>

        {renderSelectionHistory(selectionHistory, '选择历史')}
      </div>
    </div>
  );
};

// 加注释
DisplayModeDemo.storyName = '显示形态切换演示';
DisplayModeDemo.parameters = {
  docs: {
    description: {
      story: '显示形态切换演示',
    },
  },
};

// 添加支持 Year 和 Month 模式的示例
export const YearMonthModeDemo = () => {
  const [locale, setLocale] = useState<SupportedLocale>('zh-hans');
  const [timezone, setTimezone] = useState<string>('Asia/Shanghai');
  const [date, setDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<DatePickerMode>('year');
  const [dateFormat, setDateFormat] = useState<string>('YYYY-MM-DD');
  const [selections, setSelections] = useState<SelectionHistoryItem[]>([]);
  
  // 只支持 year 和 month 两种模式
  const supportedModes: DatePickerMode[] = ['year', 'month'];
  
  // 处理日期选择
  const handleSelectDate = (newDate: Date, mode: DatePickerMode, selectedDateRange: [Date] | [Date, Date]) => {
    setDate(newDate);
    
    // 记录选择历史
    setSelections((prev) => [
      { dateRange: selectedDateRange, viewMode: mode },
      ...prev.slice(0, 9),
    ]);
    
    console.log(`选择了日期: ${dayjs(newDate).format(dateFormat)}, 模式: ${mode}`);
    console.log(`日期范围: ${formatDateRange(selectedDateRange)}`);
  };
  
  // 处理视图模式变化
  const handleViewModeChange = (mode: DatePickerMode) => {
    setViewMode(mode);
    console.log(`视图模式变更为: ${mode}`);
  };
  
  // 视图模式按钮
  const ViewModeButtons = () => (
    <div>
      <h4 style={{ margin: '0 0 8px 0' }}>切换视图模式:</h4>
      <div style={{ display: 'flex', gap: '8px' }}>
        {supportedModes.map((mode) => (
          <Button
            key={mode}
            onClick={() => setViewMode(mode)}
            isActive={viewMode === mode}
          >
            {mode === 'year' ? '年' : '月'}
          </Button>
        ))}
      </div>
    </div>
  );
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>年/月 选择模式示例</h2>
      <p>该示例仅支持年和月两种选择模式</p>
      
      <CurrentSettings locale={locale} timezone={timezone} />
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
        <div>
          <ViewModeButtons />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>当前已选日期:</h4>
          <div style={{ padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
            {dayjs(date).format(dateFormat)}
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <TimezoneSelect value={timezone} onChange={setTimezone} small />
        <LocaleSelect value={locale} onChange={setLocale} small />
      </div>
      
      <DatePicker
        date={date}
        viewMode={viewMode}
        timezone={timezone}
        locale={locale}
        onSelectDate={handleSelectDate}
        onViewModeChange={handleViewModeChange}
        datePickerModes={supportedModes}
      />
      
      {renderSelectionHistory(selections, '选择历史记录')}
    </div>
  );
};

YearMonthModeDemo.storyName = '年月选择模式';
