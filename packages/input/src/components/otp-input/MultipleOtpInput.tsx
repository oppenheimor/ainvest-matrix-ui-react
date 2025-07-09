import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { cn } from "../../utils/clxs";
import { MultipleOtpInputProps } from "../../types";
import {
  DefaultCountdown,
  DefaultOtpLength,
  DefaultResendText,
  DefaultSendingText,
  DefaultSendText,
} from "../../constants";

const MultipleOtpInput = forwardRef<HTMLInputElement[], MultipleOtpInputProps>(
  (
    {
      className,
      length = DefaultOtpLength,
      masked = false,
      autoFocus = false,
      onComplete,
      onSendCode,
      countdown = DefaultCountdown,
      sendButtonContent = DefaultSendText,
      sendingButtonContent = DefaultSendingText,
      resendButtonContent = DefaultResendText,
      countdownContent = (countdown: number) => `Resend (${countdown}s)`,
    },
    ref
  ) => {
    const [otpValues, setOtpValues] = useState<string[]>(
      new Array(length).fill("")
    );
    const [isSending, setIsSending] = useState(false);
    const [countdownTimer, setCountdownTimer] = useState(0);
    const [canResend, setCanResend] = useState(true);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // 暴露输入框引用给外部
    useImperativeHandle(
      ref,
      () => {
        return inputRefs.current.filter(Boolean) as HTMLInputElement[];
      },
      []
    );

    // 倒计时效果
    useEffect(() => {
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

    // 自动聚焦效果
    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    const handleOtpChange = (index: number, value: string) => {
      // 只允许输入单个字符
      if (value.length > 1) {
        value = value.slice(-1);
      }

      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // 自动聚焦到下一个输入框
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // 检查是否完成
      const otpString = newOtpValues.join("");
      if (otpString.length === length) {
        onComplete?.(otpString);
      }
    };

    const handleOtpKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace" && !otpValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    const handleSendCode = async () => {
      if (!canResend || isSending) return;

      setIsSending(true);
      const result = await onSendCode?.();
      if (result) {
        setIsSending(false);
        setCountdownTimer(countdown);
        setCanResend(false);
      }
    };

    return (
      <div
        className={cn(
          "flex flex-col gap-6 items-center text-text-primary",
          className
        )}
      >
        {/* OTP输入框 */}
        <div className="flex gap-[9px]">
          {otpValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type={masked ? "password" : "text"}
              value={value}
              maxLength={1}
              className={cn(
                "w-[49.5px] h-12 text-center border text-text-primary bg-foreground-layer1 border-divider-level2 rounded-[8px] outline-none",
                "text-text-primary text-lg/[22px] font-semibold",
                "focus:border-text-primary focus:border-[1.5px]",
                "caret-[#165DFF]"
              )}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
            />
          ))}
        </div>
        {/* 发送按钮 */}
        <button
          type="button"
          onClick={handleSendCode}
          disabled={!canResend || isSending}
          className={cn(
            "text-text-link text-sm leading-[18px]",
            (!canResend || isSending) && "text-text-tertiary cursor-not-allowed"
          )}
        >
          {isSending
            ? sendingButtonContent
            : countdownTimer > 0
            ? countdownContent(countdownTimer)
            : canResend
            ? sendButtonContent
            : resendButtonContent}
        </button>
      </div>
    );
  }
);

MultipleOtpInput.displayName = "MultipleOtpInput";

export { MultipleOtpInput };
