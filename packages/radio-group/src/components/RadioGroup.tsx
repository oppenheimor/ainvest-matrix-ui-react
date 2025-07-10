import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { RadioGroupProps } from "../types";

/**
 * RadioGroup 样式配置上下文
 */
export interface RadioGroupContextValue {
  variant?: 'default' | 'card' | 'list' | 'button';
  iconType?: 'default' | 'checked';
  iconPosition?: 'start' | 'end';
  theme?: 'mobile' | 'pc';
}

export const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  variant: 'default',
  iconType: 'default',
  iconPosition: 'start',
  theme: 'mobile'
});

/**
 * RadioGroup 组件
 * 
 * 基于 Radix UI 的简单单选框组件。
 * 
 * @example
 * ```tsx
 * <RadioGroup defaultValue="option1" variant="card" iconType="checked" iconPosition="end">
 *   <RadioGroupItem value="option1" label="选项 1" />
 *   <RadioGroupItem value="option2" label="选项 2" />
 * </RadioGroup>
 * ```
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, children, variant = 'default', iconType = 'default', iconPosition = 'start', theme = 'mobile', ...props }, ref) => {
  const contextValue = React.useMemo(() => ({
    variant,
    iconType,
    iconPosition,
    theme
  }), [variant, iconType, iconPosition, theme]);

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
    <RadioGroupContext.Provider value={contextValue}>
      <RadioGroupPrimitive.Root
        ref={ref}
        className={`text-text-primary ${getVariantClassName()} ${className || ''}`}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = "RadioGroup";

export { RadioGroup }; 