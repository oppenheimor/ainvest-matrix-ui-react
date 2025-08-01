import * as React from "react";
import { cva } from "class-variance-authority";
import { Tips } from "../Tips";
import { cn } from "../../utils/clxs";
import { DefaultCountdown, InputType } from "../../constants";
import { SingleOtpInputProps } from "../../types";

const divVariants = cva(
  "flex items-center border rounded-[10px] h-[54px] bg-foreground-layer1 relative gap-2 px-4",
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
  "flex-1 bg-foreground-layer1 outline-none placeholder:text-text-tertiary caret-[#165DFF]",
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

const SingleOtpInput = React.forwardRef<HTMLInputElement, SingleOtpInputProps>(
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
      value,
      defaultValue,
      onChange,
      onComplete,
      onSendCode,
      countdown = DefaultCountdown,
      sendButtonContent = "Send code",
      sendingButtonContent = "Sending...",
      resendButtonContent = "Resend code",
      countdownContent = "Resend({countdown}s)",
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState(
      value || defaultValue || ""
    );
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isSending, setIsSending] = React.useState(false);
    const [countdownTimer, setCountdownTimer] = React.useState(0);
    const [canResend, setCanResend] = React.useState(true);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : inputValue;
    const inputRef = React.useRef<HTMLInputElement>(null);

    // 处理countdownContent的占位符替换
    const processCountdownContent = (
      content: React.ReactNode,
      countdownValue: number
    ): React.ReactNode => {
      if (typeof content === "string") {
        return content.replace("{countdown}", countdownValue.toString());
      }
      return content;
    };

    // 处理容器点击，触发input聚焦
    const handleContainerClick = () => {
      if (!disabled && inputRef.current) {
        inputRef.current.focus();
      }
    };

    // 倒计时效果
    React.useEffect(() => {
      let timer: NodeJS.Timeout;
      if (countdownTimer > 0) {
        timer = setTimeout(() => {
          setCountdownTimer(countdownTimer - 1);
        }, 1000);
      } else {
        setCanResend(true);
      }
      return () => clearTimeout(timer);
    }, [countdownTimer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (maxLength && newValue.length > maxLength) {
        return;
      }

      if (!isControlled) {
        setInputValue(newValue);
      }

      onChange?.(newValue);

      // 检查是否完成（当输入长度达到maxLength时）
      if (maxLength && newValue.length === maxLength) {
        onComplete?.(newValue);
      }
    };

    const handleSendCode = async () => {
      if (!canResend || isSending) return;

      setIsSending(true);
      try {
        const result = await onSendCode?.();
        if (result) {
          // 成功：开始倒计时
          setCountdownTimer(countdown);
          setCanResend(false);
        }
        // 无论成功失败都重置发送状态
        setIsSending(false);
      } catch (error) {
        // 异常处理：重置发送状态
        setIsSending(false);
        console.error('Send code error:', error);
      }
    };

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
          "flex flex-col gap-2 text-base leading-snug text-text-primary",
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
        >
          {/* 输入框 */}
          <input
            ref={(node) => {
              // 处理ref转发
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                (
                  ref as React.MutableRefObject<HTMLInputElement | null>
                ).current = node;
              }
              // 设置内部ref用于聚焦
              inputRef.current = node;
            }}
            type="text"
            value={currentValue}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            className={cn(inputVariants({ disabled }))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            {...props}
          />

          {/* 右侧操作区域 */}
          <div className="flex gap-2 items-center">
            {/* 发送验证码按钮 */}
            <button
              type="button"
              onClick={handleSendCode}
              disabled={!canResend || isSending || disabled}
              className={cn(
                "text-text-link text-sm leading-[18px] transition-colors",
                (!canResend || isSending || disabled) &&
                  "text-text-tertiary cursor-not-allowed"
              )}
            >
              {isSending
                ? sendingButtonContent
                : countdownTimer > 0
                ? processCountdownContent(countdownContent, countdownTimer)
                : canResend
                ? sendButtonContent
                : resendButtonContent}
            </button>
          </div>
        </div>
        <Tips error={error} success={success} />
      </div>
    );
  }
);

SingleOtpInput.displayName = "SingleOtpInput";

export { SingleOtpInput };
