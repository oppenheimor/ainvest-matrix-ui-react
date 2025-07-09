import { forwardRef, useState, useRef } from "react";
import { cva } from "class-variance-authority";
import { RangeNumberInput } from "./components/number-input/RangeNumberInput";
import { SingleNumberInput } from "./components/number-input/SingleNumberInput";
import { TextareaInput } from "./components/TextareaInput";
import { SingleOtpInput } from "./components/otp-input/SingleOtpInput";
import { MultipleOtpInput } from "./components/otp-input/MultipleOtpInput";
import { ClearIcon, EyeHideIcon, EyeShowIcon } from "./components/icon";
import { Tips } from "./components/Tips";
import { cn } from "./utils/clxs";
import { InputType } from "./constants";
import { InputProps } from "./types";

import "./styles/index.css";

const divVariants = cva(
  "flex items-center border rounded-[10px] bg-foreground-layer1 h-[54px]",
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

const inputVariants = cva(
  "flex-1 px-4 min-w-0 bg-foreground-layer1 outline-none placeholder:text-text-tertiary caret-[#165DFF]",
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

// 基础Input组件
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required = false,
      allowClear = false,
      password = false,
      initialHidePassword = true,
      maxLength,
      addonBefore,
      addonAfter,
      error,
      success,
      className,
      disabled = false,
      value,
      defaultValue,
      prefix,
      suffix,
      onChange,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || defaultValue || "");
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(
      !initialHidePassword
    );

    // 添加input引用用于聚焦
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : inputValue;

    // 处理容器点击，触发input聚焦
    const handleContainerClick = () => {
      if (!disabled && inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (maxLength && newValue.length > maxLength) {
        return;
      }
      if (!isControlled) {
        setInputValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInputValue("");
      }
      onChange?.("");
    };

    // 处理密码显示/隐藏切换
    const handlePasswordToggle = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsPasswordVisible(!isPasswordVisible);
    };

    const getDivStyles = () => {
      let state: InputType = InputType.Base;

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

    const characterCount = maxLength
      ? `${currentValue.length}/${maxLength}`
      : currentValue.length.toString();

    return (
      <div
        className={cn(
          "flex flex-col gap-2 text-base text-text-primary leading-snug",
          className
        )}
      >
        <div className="flex items-center">
          {/* 标签区域 */}
          <div className="flex items-center gap-1.5">
            {label}
            {required && <span className="text-price-down">*</span>}
          </div>
          {/* 字符计数 */}
          {!!maxLength && (
            <span className="text-text-tertiary ml-auto">{characterCount}</span>
          )}
        </div>
        {/* 输入框容器 */}
        <div
          className={cn(getDivStyles())}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleContainerClick}
        >
          {/* 左侧图标 */}
          {addonBefore && (
            <span
              className="border-r rounded-l-[10px] h-full p-3 flex items-center justify-center hover:bg-background-layer1"
              onClick={(e) => e.stopPropagation()}
            >
              {addonBefore}
            </span>
          )}
          {/* 前缀 */}
          {prefix && (
            <span
              className={cn("text-text-secondary ml-4", {
                "text-text-primary": isFocused,
              })}
            >
              {prefix}
            </span>
          )}
          {/* 输入框 */}
          <input
            ref={(node) => {
              // 处理ref转发
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              // 设置内部ref用于聚焦
              inputRef.current = node;
            }}
            value={currentValue}
            disabled={disabled}
            maxLength={maxLength}
            className={cn(inputVariants({ disabled }))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            type={password && !isPasswordVisible ? "password" : "text"}
            {...props}
          />
          {/* 后缀 */}
          {suffix && <span className="text-text-secondary mr-4">{suffix}</span>}
          {/* 清除按钮 */}
          {allowClear && currentValue && (
            <ClearIcon onClick={handleClear} className="mr-4" />
          )}
          {/* 密码显示/隐藏按钮 */}
          {password && (
            <div
              className="mr-4 w-7 h-7 flex justify-center items-center hover:bg-background-layer1 rounded-[6px]"
              onClick={handlePasswordToggle}
            >
              {isPasswordVisible ? <EyeShowIcon /> : <EyeHideIcon />}
            </div>
          )}
          {/* 右侧图标 */}
          {addonAfter && (
            <span className="border-l rounded-r-[10px] p-3 h-full flex items-center justify-center hover:bg-background-layer1">
              {addonAfter}
            </span>
          )}
        </div>
        <Tips error={error} success={success} />
      </div>
    );
  }
);

Input.displayName = "Input";

const InputComponent = Object.assign(Input, {
  Number: SingleNumberInput,
  RangeNumber: RangeNumberInput,
  Textarea: TextareaInput,
  SingleOtp: SingleOtpInput,
  MultipleOtp: MultipleOtpInput,
});

export { InputComponent as Input };
