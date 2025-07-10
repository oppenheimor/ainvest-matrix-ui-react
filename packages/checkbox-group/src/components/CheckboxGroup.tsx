import * as React from "react";
import type { CheckboxGroupProps } from "../types";

/**
 * CheckboxGroup 样式配置上下文
 */
export interface CheckboxGroupContextValue {
  variant?: 'default' | 'card' | 'list' | 'button';
  iconType?: 'default' | 'checked';
  iconPosition?: 'start' | 'end';
  theme?: 'mobile' | 'pc';
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

export const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue>({
  variant: 'default',
  iconType: 'default',
  iconPosition: 'start',
  theme: 'mobile',
  value: [],
  onValueChange: () => {}
});

/**
 * CheckboxGroup 组件
 *
 * 简单的多选框组件。
 *
 * @example
 * ```tsx
 * <CheckboxGroup defaultValue={["option1"]} variant="card" iconType="checked" iconPosition="end" theme="pc">
 *   <CheckboxGroupItem value="option1" label="选项 1" />
 *   <CheckboxGroupItem value="option2" label="选项 2" />
 * </CheckboxGroup>
 * ```
 */
const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupProps
>(({ 
  className, 
  children, 
  variant = 'default', 
  iconType = 'default', 
  iconPosition = 'start',
  theme = 'mobile',
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  ...props 
}, ref) => {
  // 受控/非受控状态管理
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = React.useCallback((newValue: string[]) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  }, [isControlled, onValueChange]);

  const contextValue = React.useMemo(() => ({
    variant,
    iconType,
    iconPosition,
    theme,
    value,
    onValueChange: handleValueChange
  }), [variant, iconType, iconPosition, theme, value, handleValueChange]);

  // 根据变体应用不同的样式
  const getVariantClassName = () => {
    switch (variant) {
      case 'card':
        return 'gap-2';
      case 'list':
        return '-space-y-px rounded-md shadow-xs';
      case 'button':
        return 'flex flex-wrap gap-2';
      default:
        return '';
    }
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={`text-text-primary ${getVariantClassName()} ${className || ''}`}
        role="group"
        {...props}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
});

CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup }; 