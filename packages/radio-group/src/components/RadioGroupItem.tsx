import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { RadioGroupItemProps } from "../types";
import { RadioGroupContext } from "./RadioGroup";
import { Label } from "@radix-ui/react-label";
import { checked as CheckedIcon, checkedCircle as CheckedCircleIcon, uncheckedCircle as UncheckedCircleIcon } from "./icons";

/**
 * RadioGroupItem 组件
 * 
 * 简单的单选框选项组件。
 * 
 * @example
 * ```tsx
 * <RadioGroupItem value="option1" label="选项 1" />
 * ```
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({
  className,
  value,
  label,
  description,
  icon,
  customContent,
  buttonSlot,
  buttonSlotPosition = 'start',
  disabled = false,
  children,
  ...props
}, ref) => {
  // 获取上下文配置
  const { variant, iconType = 'default', iconPosition = 'start', theme = 'mobile' } = React.useContext(RadioGroupContext);
  
  // 生成唯一 ID
  const itemId = React.useId();
  const descriptionId = description ? `${itemId}-description` : undefined;

  // 列表样式渲染
  if (variant === 'list') {
    const listBorderClass = theme === 'pc' ? '' : 'border-[var(--color-divider-level2)] border-b';
    
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        value={value}
        disabled={disabled}
        id={itemId}
        className={`w-full ${listBorderClass} relative flex py-4 mx-4 outline-none first:rounded-t-md last:rounded-b-md cursor-pointer data-[state=checked]:z-10 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className || ''}`}
        {...props}
      >
        {/* 选中状态图标 - start位置 */}
        {iconPosition === 'start' && (
          <RadioGroupPrimitive.Indicator className="absolute  top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center">
            {iconType === 'checked' ? <CheckedIcon /> : <CheckedCircleIcon />}
          </RadioGroupPrimitive.Indicator>
        )}
        
        {/* 选中状态图标 - end位置 */}
        {iconPosition === 'end' && (
          <RadioGroupPrimitive.Indicator className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center">
            {iconType === 'checked' ? <CheckedIcon /> : <CheckedCircleIcon />}
          </RadioGroupPrimitive.Indicator>
        )}
        
        {/* 未选中状态图标 - start位置 */}
        {iconPosition === 'start' && iconType !== 'checked' && (
          <div className="absolute  top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center data-[state=checked]:hidden">
            <UncheckedCircleIcon />
          </div>
        )}
        
        {/* 未选中状态图标 - end位置 */}
        {iconPosition === 'end' && iconType !== 'checked' && (
          <div className="absolute  right-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center data-[state=checked]:hidden">
            <UncheckedCircleIcon />
          </div>
        )}
        
        <div className="flex items-center justify-between w-full">
          <div className={`flex items-center gap-1.5 ${iconPosition === 'start' ? 'pl-10' : ''}`}>
            <div className={`inline-flex items-start text-text-primary ${theme === 'pc' ? 'text-sm' : 'text-base'} font-normal`} >
              {label}
            </div>
          </div>
          <div className={`flex items-center gap-1.5 ${iconPosition === 'end' ? 'pr-10' : ''}`}>
            {customContent && (
              <div className="flex items-center">
                {customContent}
              </div>
            )}
          </div>
        </div>
      </RadioGroupPrimitive.Item>
    );
  }

  // 按钮样式渲染
  if (variant === 'button') {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        value={value}
        disabled={disabled}
        id={itemId}
        className={`
          relative flex cursor-pointer ${buttonSlot ? 'flex-row items-center' : 'flex-col items-center'} 
          gap-2 rounded-[20px] py-[9px] px-4 text-center 
          outline-none 
          border border-button-border
          text-text-primary
          min-w-[66px]
          hover:bg-[var(--atom-color-button-grey-default)]
          data-[state=checked]:border-[var(--atom-color-button-hover)]
          data-[state=checked]:border-[1.5px]
          data-[state=checked]:bg-[var(--atom-color-text-primary)]
          data-[state=checked]:text-[var(--color-foreground-layer1)]
          data-[disabled]:cursor-not-allowed 
          data-[disabled]:opacity-50
          data-[disabled]:hover:bg-transparent
          ${className || ''}`} 
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="sr-only" />
        
        {/* 插槽内容 - start位置 */}
        {buttonSlot && buttonSlotPosition === 'start' && (
          <div className="flex items-center justify-center">
            {buttonSlot}
          </div>
        )}
        
        <p className={`
          text-sm leading-none font-medium
          transition-colors duration-200
          ${disabled ? 'text-text-disabled' : 'text-current'}
        `}>
          {label}
        </p>
        
        {/* 插槽内容 - end位置 */}
        {buttonSlot && buttonSlotPosition === 'end' && (
          <div className="flex items-center justify-center">
            {buttonSlot}
          </div>
        )}
      </RadioGroupPrimitive.Item>
    );
  }

  // 卡片样式渲染
  if (variant === 'card') {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        value={value}
        disabled={disabled}
        id={itemId}
        aria-describedby={descriptionId}
        className={`border border-border-bt flex items-center gap-2 rounded-[10px] py-3 px-4 outline-none cursor-pointer data-[state=checked]:border-text-primary data-[state=checked]:border-[1.5px]  ${
          disabled 
            ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' 
            : 'hover:border-text-primary hover:border-[1.5px]'
        } ${className || ''}`}
        {...props}
      > 
        <RadioGroupPrimitive.Indicator className="sr-only" />
        
        <div className="flex grow-0 items-center gap-1.5">
          {icon && (
            <div className="shrink-0 w-7 h-7">
              {icon}
            </div>
          )}
          <div className={`${(!icon && !description) ? 'flex items-center' : 'grid gap-1'} grow`}>
            <p className="text-primary text-left text-base font-semibold leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70">
              {label}
            </p>
            {description && (
              <p
                id={descriptionId}
                className="text-text-secondary text-left text-sm font-normal"
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </RadioGroupPrimitive.Item>
    );
  }

  // 默认样式渲染
  return (
    <div className={`flex items-center gap-2 ${disabled ? 'opacity-50' : ''} ${className || ''}`}>
      <RadioGroupPrimitive.Item
        ref={ref}
        value={value}
        disabled={disabled}
        id={itemId}
        className="relative w-6 h-6 flex items-center justify-center"
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="absolute inset-0 flex items-center justify-center">
          {iconType === 'checked' ? <CheckedIcon /> : <CheckedCircleIcon />}
        </RadioGroupPrimitive.Indicator>
        
        {/* 未选中状态图标 - 选中时隐藏 */}
        <div className="absolute inset-0 flex items-center justify-center data-[state=checked]:hidden">
          <UncheckedCircleIcon />
        </div>
      </RadioGroupPrimitive.Item>

      {children ? (
        children
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {label && (
              <Label
                htmlFor={itemId}
                className={`text-primary font-medium leading-none cursor-pointer ${theme === 'pc' ? 'text-sm' : 'text-base'} ${disabled ? 'text-gray-400' : 'text-gray-900'}`}
              >
                {label}
              </Label>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroupItem }; 