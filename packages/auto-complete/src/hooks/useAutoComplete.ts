import { useState, useCallback, useMemo, useRef } from "react";
import { AutoCompleteOption } from "../types";

interface UseAutoCompleteOptions {
  options?: AutoCompleteOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  filterOption?: (inputValue: string, option: AutoCompleteOption) => boolean;
  maxCount?: number;
}

export function useAutoComplete({
  options = [],
  value,
  defaultValue = "",
  onChange,
  onSearch,
  onSelect,
  open: controlledOpen,
  onOpenChange,
  filterOption,
  maxCount,
}: UseAutoCompleteOptions) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalOpen, setInternalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 判断是否为受控模式
  const isControlled = value !== undefined;
  const isOpenControlled = controlledOpen !== undefined;
  
  // 实际的值和开启状态
  const actualValue = isControlled ? value : internalValue;
  const actualOpen = isOpenControlled ? controlledOpen : internalOpen;

  // 默认筛选函数
  const defaultFilterOption = useCallback(
    (inputValue: string, option: AutoCompleteOption) => {
      return option.value.toLowerCase().includes(inputValue.toLowerCase());
    },
    []
  );

  // 过滤后的选项
  const filteredOptions = useMemo(() => {
    if (!actualValue || actualValue.length === 0) {
      return options.slice(0, maxCount);
    }

    const filterFn = filterOption || defaultFilterOption;
    const filtered = options.filter(option => filterFn(actualValue, option));

    return maxCount ? filtered.slice(0, maxCount) : filtered;
  }, [options, actualValue, filterOption, defaultFilterOption, maxCount]);

  // 处理输入值改变
  const handleInputChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      
      onChange?.(newValue);
      onSearch?.(newValue);
      
      // 输入时自动打开下拉菜单
      if (!isOpenControlled && newValue.length > 0) {
        setInternalOpen(true);
        onOpenChange?.(true);
      }
    },
    [isControlled, onChange, onSearch, isOpenControlled, onOpenChange]
  );

  // 处理选项选择
  const handleSelect = useCallback(
    (option: AutoCompleteOption) => {
      const newValue = option.value;
      
      if (!isControlled) {
        setInternalValue(newValue);
      }
      
      // 选择后关闭下拉菜单
      if (!isOpenControlled) {
        setInternalOpen(false);
        onOpenChange?.(false);
      }
      
      // 调用回调
      onChange?.(newValue);
      onSelect?.(newValue, option);
      
      // 聚焦输入框
      inputRef.current?.focus();
    },
    [isControlled, onChange, onSelect, isOpenControlled, onOpenChange]
  );

  // 处理下拉菜单开启状态
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!isOpenControlled) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    },
    [isOpenControlled, onOpenChange]
  );

  return {
    inputValue: actualValue,
    inputRef,
    open: actualOpen,
    filteredOptions,
    handleInputChange,
    handleSelect,
    handleOpenChange,
  };
}