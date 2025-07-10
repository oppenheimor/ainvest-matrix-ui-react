import * as React from "react";
import type { CheckboxGroupItemProps } from "../types";
import { CheckboxGroupContext } from "./CheckboxGroup";
import {  uncheckedSquare as UncheckedSquareIcon, checkedSquare as CheckedSquareIcon } from "./icons";

/**
 * CheckboxGroupItem 组件
 *
 * 简单的多选框选项组件。
 *
 * @example
 * ```tsx
 * <CheckboxGroupItem value="option1" label="选项 1" />
 * ```
 */
const CheckboxGroupItem = React.forwardRef<
  HTMLInputElement,
  CheckboxGroupItemProps
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
  const { variant, iconType = 'default', iconPosition = 'start', theme = 'mobile', value: groupValue = [], onValueChange } = React.useContext(CheckboxGroupContext);
  
  // 生成唯一 ID
  const itemId = React.useId();
  const descriptionId = description ? `${itemId}-description` : undefined;

  // 检查是否选中
  const isChecked = groupValue.includes(value);

  // 处理选项切换
  const handleToggle = React.useCallback(() => {
    if (disabled) return;
    
    const newValue = isChecked 
      ? groupValue.filter(v => v !== value)  // 取消选择
      : [...groupValue, value];              // 添加选择
    
    onValueChange?.(newValue);
  }, [disabled, isChecked, groupValue, value, onValueChange]);

  // 列表样式渲染
  if (variant === 'list') {
    const listBorderClass = theme === 'pc' ? '' : 'border-[var(--color-divider-level2)] border-b';
    
    return (
      <label
        htmlFor={itemId}
        className={`w-full ${listBorderClass} relative flex py-4 mx-4 outline-none first:rounded-t-md last:rounded-b-md cursor-pointer ${
          isChecked ? 'z-10' : ''
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`}
      >
        <input
          ref={ref}
          type="checkbox"
          id={itemId}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={handleToggle}
          className="sr-only"
          {...props}
        />

        {/* 选中状态图标 - start位置 */}
        {iconPosition === 'start' && iconType === 'checked' && isChecked && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center">
            <CheckedSquareIcon />
          </div>
        )}

        {/* 选中状态图标 - end位置 */}
        {iconPosition === 'end' && iconType === 'checked' && isChecked && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center">
            <CheckedSquareIcon />
          </div>
        )}

        {/* 未选中状态图标 - start位置 */}
        {iconPosition === 'start' && iconType !== 'checked' && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center">
            {isChecked ? <CheckedSquareIcon /> : <UncheckedSquareIcon />}
          </div>
        )}

        {/* 未选中状态图标 - end位置 */}
        {iconPosition === 'end' && iconType !== 'checked' && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center">
            {isChecked ? <CheckedSquareIcon /> : <UncheckedSquareIcon />}
          </div>
        )}

        <div className="flex items-center justify-between w-full">
          <div className={`flex items-center gap-1.5 ${iconPosition === 'start' ? 'pl-10' : ''}`}>
            <div className={`inline-flex items-start text-text-primary ${theme === 'pc' ? 'text-sm' : 'text-base'} font-normal`}>
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
      </label>
    );
  }

  // 按钮样式渲染
  if (variant === 'button') {
    return (
      <label
        htmlFor={itemId}
        className={`
          relative flex cursor-pointer ${buttonSlot ? 'flex-row items-center' : 'flex-col items-center'}
          gap-2 rounded-[20px] py-[9px] px-4 text-center
          outline-none
          border border-button-border
          text-text-primary
          min-w-[66px]
          hover:bg-[var(--atom-color-button-grey-default)]
          ${isChecked 
            ? 'border-[var(--atom-color-button-hover)] border-[1.5px] !bg-[var(--atom-color-text-primary)] text-[var(--color-foreground-layer1)]' 
            : ''
          }
          ${disabled ? 
              'opacity-50 cursor-not-allowed hover:bg-transparent' 
             : ''
         } ${className || ''}`}
      >
        <input
          ref={ref}
          type="checkbox"
          id={itemId}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={handleToggle}
          className="sr-only"
          {...props}
        />

        {/* 插槽内容 - start位置 */}
        {buttonSlot && buttonSlotPosition === 'start' && (
          <div className={`flex items-center justify-center
            ${isChecked 
              ? 'text-[var(--color-foreground-layer1)]' 
              : ''
            }
            ${disabled ? 'text-text-disabled' : ''}
              `}
            >
            {buttonSlot}
          </div>
        )}

        <p className={`
          text-sm leading-none font-medium
           ${isChecked 
            ? 'text-[var(--color-foreground-layer1)]' 
            : ''
          }
          ${disabled ? 'text-text-disabled' : ''}
        `}>
          {label}
        </p>

        {/* 插槽内容 - end位置 */}
        {buttonSlot && buttonSlotPosition === 'end' && (
          <div className={`flex items-center justify-center
          ${isChecked 
            ? 'text-[var(--color-foreground-layer1)]' 
            : ''
          }
          ${disabled ? 'text-text-disabled' : ''}
            `}
          >
            {buttonSlot}
          </div>
        )}
      </label>
    );
  }

  // 卡片样式渲染
  if (variant === 'card') {
    return (
      <label
        htmlFor={itemId}
        className={`flex items-center gap-2 rounded-[10px] py-3 px-4 outline-none cursor-pointer ${
          isChecked 
            ? '!border-text-primary !border-[1.5px]' 
            : 'border border-border-bt hover:!border-text-primary hover:!border-[1.5px]'
        } ${
          disabled 
            ? 'opacity-50 cursor-not-allowed !border-gray-200 bg-gray-50' 
            : ''
        } ${className || ''}`}
      >
        <input
          ref={ref}
          type="checkbox"
          id={itemId}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={handleToggle}
          className="sr-only"
          aria-describedby={descriptionId}
          {...props}
        />

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
      </label>
    );
  }

  // 默认样式渲染
  return (
    <label 
      htmlFor={itemId}
      className={`w-full flex items-center gap-2 text-primary cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`}
    >
      <div className="relative flex items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          id={itemId}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={handleToggle}
          className="sr-only"
          {...props}
        />
        {isChecked ? <CheckedSquareIcon /> : <UncheckedSquareIcon />}
      </div>

      {children ? (
        children
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {label && (
              <span
                className={`text-primary font-medium leading-none ${theme === 'pc' ? 'text-sm' : 'text-base'} ${disabled ? 'text-gray-400' : 'text-gray-900'}`}
              >
                {label}
              </span>
            )}
          </div>
          {customContent && (
            <div className="flex items-center">
              {customContent}
            </div>
          )}
        </div>
      )}
    </label>
  );
});

CheckboxGroupItem.displayName = "CheckboxGroupItem";

export { CheckboxGroupItem }; 