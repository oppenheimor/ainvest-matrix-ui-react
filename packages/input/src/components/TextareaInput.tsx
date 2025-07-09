import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { cn } from "../utils/clxs";
import { TextareaInputProps } from "../types";
import { ClearIconForTextarea } from "./icon/ClearIconForTextarea";
import { cva } from "class-variance-authority";
import { ResizeIcon } from "./icon/ResizeIcon";
import { InputType } from "../constants";

const divVariants = cva(
  "flex flex-col border rounded-[10px] bg-foreground-layer1 p-3 relative",
  {
    variants: {
      state: {
        [InputType.Base]: "border-border-level2",
        [InputType.Hover]: "border border-text-secondary",
        [InputType.Focus]: "border-[1.5px] border-text-primary",
        [InputType.Error]: "border-[1.5px] border-price-down",
        [InputType.Disabled]:
          "bg-background-layer1 border-border-level2 cursor-not-allowed",
      },
    },
    defaultVariants: {
      state: InputType.Base,
    },
  }
);

const textareaVariants = cva(
  "bg-foreground-layer1 outline-none leading-[22px] placeholder:text-text-tertiary caret-[#165DFF] flex-1 resize-none scrollbar-hide",
  {
    variants: {
      disabled: {
        true: "bg-background-layer1 placeholder:text-text-quaternary cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  (
    {
      label,
      required = false,
      maxLength,
      error,
      success,
      className,
      disabled = false,
      placeholder,
      rows = 5,
      value,
      defaultValue,
      onChange,
      autoSize = false,
      resizable = false,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || defaultValue || "");
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const dragStartY = useRef<number>(0);
    const dragStartHeight = useRef<number>(0);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : inputValue;

    // 高度调整函数
    const adjustTextareaHeight = useCallback(() => {
      if (textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        const scrollHeight = textarea.scrollHeight;
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
        // 固定高度时
        if (autoSize === false) {
          textarea.style.height = `${(rows - 0.5) * lineHeight}px`;
          return;
        }
        if (autoSize === true) {
          textarea.style.height = `${scrollHeight}px`;
          return;
        }
        const minHeight = autoSize.minRows * lineHeight;
        const maxHeight = (autoSize.maxRows - 0.5) * lineHeight;
        const newHeight = Math.min(
          Math.max(scrollHeight, minHeight),
          maxHeight
        );
        textarea.style.height = `${newHeight}px`;
      }
    }, [autoSize, rows]);

    // 处理初始状态和值变化时的高度调整
    useEffect(() => {
      if (!resizable) {
        adjustTextareaHeight();
      }
    }, [adjustTextareaHeight, currentValue, resizable]);

    // 处理容器点击，触发textarea聚焦
    const handleContainerClick = () => {
      if (!disabled && textareaRef.current) {
        textareaRef.current.focus();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (maxLength && newValue.length > maxLength) {
        return;
      }
      if (!isControlled) {
        setInputValue(newValue);
      }
      if (!resizable) {
        adjustTextareaHeight();
      }
      onChange?.(newValue);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInputValue("");
      }
      onChange?.("");
    };

    // 拖拽开始事件
    const handleDragStart = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsFocused(false);
      setIsHovered(false);
      setIsDragging(true);
      dragStartY.current = e.clientY;
      dragStartHeight.current = textareaRef.current?.offsetHeight || 0;
    };

    // 拖拽移动事件
    const handleDragMove = useCallback(
      (e: MouseEvent) => {
        setIsFocused(false);
        setIsHovered(false);
        if (!isDragging || !textareaRef.current) return;
        const deltaY = e.clientY - dragStartY.current;
        const newHeight = dragStartHeight.current + deltaY;
        textareaRef.current.style.height = `${newHeight}px`;
      },
      [isDragging]
    );

    // 拖拽结束事件
    const handleDragEnd = useCallback(() => {
      setIsDragging(false);
      setIsFocused(false);
      setIsHovered(false);
    }, []);

    // 添加和移除全局鼠标事件监听
    useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleDragMove);
        document.addEventListener("mouseup", handleDragEnd);
        return () => {
          document.removeEventListener("mousemove", handleDragMove);
          document.removeEventListener("mouseup", handleDragEnd);
        };
      }
    }, [isDragging, handleDragMove, handleDragEnd]);

    const getDivStyles = () => {
      let state = InputType.Base;
      if (disabled) {
        state = InputType.Disabled;
      } else if (error) {
        state = InputType.Error;
      } else if (isFocused) {
        state = InputType.Focus;
      } else if (isHovered) {
        state = InputType.Hover;
      }
      return divVariants({ state });
    };

    return (
      <div
        className={cn(
          "flex flex-col gap-2 text-base text-text-primary leading-snug",
          className
        )}
      >
        {/* 标签区域 */}
        {(label || required) && (
          <div className="flex items-center gap-1.5">
            {label}
            {required && <span className="text-price-down">*</span>}
          </div>
        )}
        {/* 输入框容器 */}
        <div
          className={cn(getDivStyles())}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleContainerClick}
          style={{ userSelect: isDragging ? "none" : "auto" }}
        >
          {/* textarea 和清除图标的 flex 容器 */}
          <div className="flex gap-1.5">
            <textarea
              ref={(node) => {
                // 处理ref转发
                if (typeof ref === "function") {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
                textareaRef.current = node;
              }}
              value={currentValue}
              placeholder={placeholder}
              rows={
                typeof autoSize === "object" && autoSize.minRows ? void 0 : rows
              }
              disabled={disabled}
              maxLength={maxLength}
              className={cn(textareaVariants({ disabled }))}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleChange}
              {...props}
            />
            {currentValue && <ClearIconForTextarea onClick={handleClear} />}
          </div>

          {/* 自定义拖拽手柄 */}
          {resizable && (
            <span
              className="absolute bottom-[2px] right-[2px] flex items-center justify-center text-text-tertiary select-none hover:cursor-ns-resize"
              onMouseDown={handleDragStart}
              onMouseEnter={(e) => e.stopPropagation()}
              onMouseLeave={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <ResizeIcon />
            </span>
          )}

          {/* 字数统计显示 */}
          {maxLength && (
            <span className="text-sm text-text-secondary leading-[18px] self-end">
              {currentValue.length}/{maxLength}
            </span>
          )}
        </div>
        {/* 成功/错误提示 */}
        {(error || success) && (
          <div className="flex flex-col items-start gap-1.5 text-sm">
            {error && <span className="text-price-down">{error}</span>}
            {success && <span className="text-price-up">{success}</span>}
          </div>
        )}
      </div>
    );
  }
);

TextareaInput.displayName = "TextareaInput";

export { TextareaInput };
