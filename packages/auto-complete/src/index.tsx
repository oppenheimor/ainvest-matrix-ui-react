import React, { forwardRef } from "react";
import { Input } from "@oversea/input";
import { cn } from "./utils/clsx";
import { AutoCompleteProps, AutoCompleteOption } from "./types";
import { useAutoComplete } from "./hooks/useAutoComplete";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { useClickOutside } from "./hooks/useClickOutside";
import { AutoCompleteOptionComponent } from "./components/AutoCompleteOption";

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      options = [],
      value,
      defaultValue,
      onChange,
      onSearch,
      onSelect,
      open,
      onOpenChange,
      status,
      allowClear = true,
      dropdownMatchSelectWidth = true,
      filterOption,
      maxCount,
      inputClassName,
      dropdownClassName,
      notFoundContent,
      onFocus: userOnFocus,
      onBlur: userOnBlur,
      ...inputProps
    },
    ref
  ) => {
    const {
      inputValue,
      inputRef,
      open: dropdownOpen,
      filteredOptions,
      handleInputChange,
      handleSelect,
      handleOpenChange,
    } = useAutoComplete({
      options,
      value,
      defaultValue,
      onChange,
      onSearch,
      onSelect,
      open,
      onOpenChange,
      filterOption,
      maxCount,
    });

    const {
      activeIndex,
      setActiveIndex,
      handleKeyDown,
      resetActiveIndex,
    } = useKeyboardNavigation({
      options: filteredOptions,
      isOpen: dropdownOpen,
      onSelect: handleSelect,
      onClose: () => handleOpenChange(false),
    });

    const containerRef = useClickOutside<HTMLDivElement>(
      () => handleOpenChange(false),
      dropdownOpen
    );

    // 通过 DOM 事件监听来实现自动完成逻辑，不干扰 Input 组件的内部状态管理
    React.useEffect(() => {
      const input = inputRef.current;
      if (!input) return;

      const handleFocus = (e: FocusEvent) => {
        // 调用用户传入的 onFocus
        userOnFocus?.(e as unknown as React.FocusEvent<HTMLInputElement>);
        
        // 处理自动完成逻辑
        if (inputValue && filteredOptions.length > 0) {
          handleOpenChange(true);
        }
      };

      const handleBlur = (e: FocusEvent) => {
        // 调用用户传入的 onBlur
        userOnBlur?.(e as unknown as React.FocusEvent<HTMLInputElement>);
      };

      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);

      return () => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      };
    }, [inputValue, filteredOptions.length, handleOpenChange, userOnFocus, userOnBlur]);

    // 处理选项鼠标悬停
    const handleOptionMouseEnter = (index: number) => {
      setActiveIndex(index);
    };

    // 处理选项点击
    const handleOptionClick = (option: AutoCompleteOption) => {
      handleSelect(option);
      resetActiveIndex();
    };

    return (
      <div ref={containerRef} className={cn("relative w-full", inputClassName)}>
        <Input
          ref={(node) => {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            inputRef.current = node;
          }}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          allowClear={allowClear}
          error={status === "error"}
          {...inputProps}
        />

        {/* 下拉选项列表 - 使用与 DropdownMenuContent 完全相同的样式 */}
        {dropdownOpen &&
          (filteredOptions.length > 0 ||
            (notFoundContent && filteredOptions.length === 0)) && (
            <div
              className={cn(
                // 复用 DropdownMenuContent 的样式
                "overflow-x-hidden overflow-y-auto rounded-2xl border border-divider-level3 py-[12px]",
                "bg-background-layer4 text-text-primary",
                "max-h-[min(var(--radix-dropdown-menu-content-available-height),400px)]",
                "[&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-background-layer4 [&::-webkit-scrollbar-thumb]:bg-grey-80 [&::-webkit-scrollbar-track]:my-[12px] [&::-webkit-scrollbar-track]:mr-[2px] [&::-webkit-scrollbar-thumb]:rounded-2xl [&::-webkit-scrollbar-thumb:hover]:bg-grey-50",
                // 定位样式
                "absolute z-50 mt-1 shadow-lg",
                dropdownMatchSelectWidth ? "w-full" : "min-w-full",
                dropdownClassName
              )}
            >
              {filteredOptions.length > 0
                ? filteredOptions.map((option, index) => (
                    <AutoCompleteOptionComponent
                      key={option.key || option.value}
                      option={option}
                      isActive={index === activeIndex}
                      onClick={() => handleOptionClick(option)}
                      onMouseEnter={() => handleOptionMouseEnter(index)}
                    />
                  ))
                : notFoundContent && (
                    <div className="px-[20px] py-[8px] text-[14px] leading-[18px] text-text-tertiary">
                      {notFoundContent}
                    </div>
                  )}
            </div>
          )}
      </div>
    );
  }
);

AutoComplete.displayName = "AutoComplete";

export type { AutoCompleteProps, AutoCompleteOption } from "./types";
export { useAutoComplete } from "./hooks/useAutoComplete";
export { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
export { useClickOutside } from "./hooks/useClickOutside";
