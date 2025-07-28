import { useState, useRef, useCallback } from "react";
import GraphemeSplitter from "grapheme-splitter";

interface UseInputValueProps {
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  onChange?: (val: string) => void;
}

/**
 * useInputValue Hook
 * 负责受控/非受控 value 状态、maxLength 校验（支持 emoji/多字节）、输入法 composition 事件管理
 * 返回 value、onChange、onCompositionStart、onCompositionEnd、setValue
 */
export function useInputValue({ value, defaultValue, maxLength, onChange }: UseInputValueProps) {
  const splitterRef = useRef<GraphemeSplitter>();
  if (!splitterRef.current) splitterRef.current = new GraphemeSplitter();
  const splitter = splitterRef.current;

  const isControlled = value !== undefined;
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [isComposing, setIsComposing] = useState(false);

  // 统一获取当前 value
  const currentValue = isControlled ? value! : inputValue;

  // 限制输入内容长度，超出 maxLength 时截断
  const limitValueByMaxLength = useCallback((val: string): string => {
    if (!maxLength) return val;
    const graphemes = splitter.splitGraphemes(val);
    if (graphemes.length > maxLength) {
      return graphemes.slice(0, maxLength).join("");
    }
    return val;
  }, [maxLength, splitter]);

  // 处理输入变化
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (isComposing) {
      if (!isControlled) setInputValue(newValue);
      onChange?.(newValue);
      return;
    }
    const finalValue = limitValueByMaxLength(newValue);
    if (!isControlled) setInputValue(finalValue);
    onChange?.(finalValue);
    
    // 如果是受控组件，确保更新内部状态以反映外部传入的值
    if (isControlled && value !== undefined) {
      setInputValue(value);
    }
  }, [isComposing, isControlled, onChange, limitValueByMaxLength, value]);

  // 处理输入法组合事件
  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);
  const handleCompositionEnd = useCallback((e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    const newValue = e.currentTarget.value;
    const finalValue = limitValueByMaxLength(newValue);
    if (!isControlled) setInputValue(finalValue);
    onChange?.(finalValue);
  }, [isControlled, onChange, limitValueByMaxLength]);

  // 允许外部直接设置 value
  const setValue = useCallback((val: string) => {
    if (!isControlled) setInputValue(val);
    onChange?.(val);
  }, [isControlled, onChange]);

  return {
    value: currentValue,
    onChange: handleChange,
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    setValue,
    isComposing,
    splitter,
  };
} 