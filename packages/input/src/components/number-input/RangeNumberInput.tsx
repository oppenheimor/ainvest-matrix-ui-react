import {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/clxs";
import { InputType } from "../../constants";
import { RangeNumberInputProps } from "../../types";
import { Tips } from "../Tips";

const divVariants = cva(
  "flex items-center border rounded-[10px] bg-foreground-layer1 relative w-1/2 h-[54px]",
  {
    variants: {
      start: {
        true: "rounded-r-none border-r-[0.5px]",
        false: "rounded-l-none border-l-[0.5px]",
      },
      state: {
        [InputType.Base]: "border-border-level2",
        [InputType.Hover]: "border border-text-secondary",
        [InputType.Focus]: "border-[1.5px] border-text-primary",
        [InputType.Error]: "border-[1.5px] border-price-down",
        [InputType.Disabled]:
          "bg-background-layer1 border-border-level2 cursor-not-allowed",
      },
    },
    compoundVariants: [
      {
        state: InputType.Error,
        start: true,
        class:
          "border-[1.5px] border-price-down border-r-0 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[0.75px] after:bg-price-down",
      },
      {
        state: InputType.Error,
        start: false,
        class:
          "border-[1.5px] border-price-down border-l-0 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[0.75px] before:bg-price-down",
      },
    ],
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

export const RangeNumberInput = forwardRef<
  [HTMLInputElement | null, HTMLInputElement | null],
  RangeNumberInputProps
>((props, ref) => {
  const {
    label,
    values,
    defaultValues,
    required = false,
    placeholders,
    prefixes,
    suffixes,
    errorContents = [null, null],
    successContents = [null, null],
    className,
    disabled = false,
    onChange,
    startMin,
    startMax,
    startPrecision,
    endMin,
    endMax,
    endPrecision,
  } = props;

  // 格式化数字精度
  const formatNumberByPrecision = (
    value: number,
    precision?: number
  ): string => {
    if (precision === undefined || precision < 0) return value.toString();
    return value.toFixed(precision);
  };

  // 验证和格式化值
  const validateAndFormatValue = (
    value: string,
    min?: number,
    max?: number,
    precision?: number
  ): string => {
    if (!value) return value;

    const numValue = Number(value);
    if (isNaN(numValue)) return value;

    // 范围验证
    if (min !== undefined && numValue < min)
      return formatNumberByPrecision(min, precision);
    if (max !== undefined && numValue > max)
      return formatNumberByPrecision(max, precision);

    // 精度格式化
    return formatNumberByPrecision(numValue, precision);
  };

  // 计算有效的约束条件
  const effectiveConstraints = useMemo(() => {
    return {
      startMin,
      startMax,
      endMin,
      endMax,
    };
  }, [startMin, startMax, endMin, endMax]);

  // 范围输入状态
  const [rangeValue, setRangeValue] = useState<[string, string]>(
    (values?.map((value) => value.toString()) as [string, string]) ||
      (defaultValues?.map((value) => value.toString()) as [string, string]) || [
        "",
        "",
      ]
  );

  // 交互状态
  const [isFocused, setIsFocused] = useState({
    start: false,
    end: false,
  });
  const [isHovered, setIsHovered] = useState({
    start: false,
    end: false,
  });

  // 输入框引用
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () =>
      [startInputRef.current, endInputRef.current] as [
        HTMLInputElement | null,
        HTMLInputElement | null
      ],
    []
  );

  // 受控组件检测
  const isControlled = values !== undefined;

  // 当前值
  const currentRangeValue = isControlled
    ? (values.map((value) => value.toString()) as [string, string])
    : rangeValue;

  // 范围输入处理
  const handleRangeChange = (changeIndex: 0 | 1, newValue: string) => {
    // 验证数字格式
    if (newValue && !/^-?\d*\.?\d*$/.test(newValue)) return;
    const newRangeValue: [string, string] = [...currentRangeValue];
    newRangeValue[changeIndex] = newValue;
    if (!isControlled) {
      setRangeValue(newRangeValue);
    }
    const newRangeValueNumber = newRangeValue.map((value) =>
      value === "" || value == null ? void 0 : Number(value)
    ) as [number, number];
    onChange?.(newRangeValueNumber);
  };

  // 失焦时的验证和格式化处理
  const handleBlur = (changeIndex: 0 | 1) => {
    const currentValue = currentRangeValue[changeIndex];
    if (!currentValue) return;

    // 检查是否为有效数字
    const numValue = Number(currentValue);
    if (isNaN(numValue)) {
      // 如果转换为数字后是 NaN，设置为 undefined
      const newRangeValue: [string, string] = [...currentRangeValue];
      newRangeValue[changeIndex] = void 0;
      if (!isControlled) {
        setRangeValue(["", ""]);
      }
      const newRangeValueNumber = newRangeValue.map((value) =>
        value === "" || value == null ? void 0 : Number(value)
      ) as [number, number];
      onChange?.(newRangeValueNumber);
      return;
    }

    let validatedValue: string;
    if (changeIndex === 0) {
      // 开始值失焦处理
      validatedValue = validateAndFormatValue(
        currentValue,
        effectiveConstraints.startMin,
        effectiveConstraints.startMax,
        startPrecision
      );
    } else {
      // 结束值失焦处理
      validatedValue = validateAndFormatValue(
        currentValue,
        effectiveConstraints.endMin,
        effectiveConstraints.endMax,
        endPrecision
      );
    }

    // 如果值发生了变化，更新状态
    if (
      validatedValue !== currentValue &&
      Number(validatedValue) !== Number(currentValue)
    ) {
      const newRangeValue: [string, string] = [...currentRangeValue];
      newRangeValue[changeIndex] = validatedValue;

      if (!isControlled) {
        setRangeValue(newRangeValue);
      }

      const newRangeValueNumber = newRangeValue.map((value) =>
        value === "" || value == null ? void 0 : Number(value)
      ) as [number, number];

      onChange?.(newRangeValueNumber);
    }
  };

  const getDivStyles = ({ start }: { start: boolean }) => {
    let state = InputType.Base;
    if (disabled) {
      state = InputType.Disabled;
    } else if (errorContents[start ? 0 : 1]) {
      state = InputType.Error;
    } else if (start ? isFocused.start : isFocused.end) {
      state = InputType.Focus;
    } else if (start ? isHovered.start : isHovered.end) {
      state = InputType.Hover;
    }

    return divVariants({ state, start });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 text-base leading-snug text-text-primary",
        className
      )}
    >
      {/* label容器 */}
      <div className="flex items-center">
        <div className="flex items-center gap-1.5">
          {label}
          {required && <span className="text-price-down">*</span>}
        </div>
      </div>

      {/* 范围输入框容器 */}
      <div className="flex items-center">
        {/* 开始值输入框区域 */}
        <div
          className={cn(getDivStyles({ start: true }))}
          onMouseEnter={() =>
            setIsHovered((prev) => ({ ...prev, start: true }))
          }
          onMouseLeave={() => {
            setIsHovered((prev) => ({ ...prev, start: false }));
          }}
        >
          {/* 前缀 */}
          {prefixes?.[0] && (
            <span
              className={cn("text-text-secondary ml-4", {
                "text-text-primary": isFocused.start,
              })}
            >
              {prefixes?.[0]}
            </span>
          )}
          {/* 输入框 */}
          <input
            ref={startInputRef}
            type="text"
            placeholder={placeholders?.[0]}
            value={currentRangeValue[0]}
            disabled={disabled}
            className={cn(inputVariants({ disabled }))}
            onFocus={() =>
              setIsFocused((prev) => ({
                ...prev,
                start: true,
              }))
            }
            onBlur={() => {
              setIsFocused((prev) => ({
                ...prev,
                start: false,
              }));
              handleBlur(0);
            }}
            onChange={(e) => handleRangeChange(0, e.target.value)}
          />
          {/* 后缀 */}
          {suffixes?.[0] && (
            <span className="mr-4 text-text-secondary">{suffixes?.[0]}</span>
          )}
        </div>
        {/* 结束值输入框区域 */}
        <div
          className={cn(getDivStyles({ start: false }))}
          onMouseEnter={() => setIsHovered((prev) => ({ ...prev, end: true }))}
          onMouseLeave={() => setIsHovered((prev) => ({ ...prev, end: false }))}
        >
          {/* 前缀 */}
          {prefixes?.[1] && (
            <span
              className={cn("text-text-secondary ml-4", {
                "text-text-primary": isFocused.end,
              })}
            >
              {prefixes?.[1]}
            </span>
          )}
          {/* 输入框 */}
          <input
            ref={endInputRef}
            type="text"
            placeholder={placeholders?.[1]}
            value={currentRangeValue[1]}
            disabled={disabled}
            className={cn(inputVariants({ disabled }))}
            onFocus={() =>
              setIsFocused((prev) => ({
                ...prev,
                end: true,
              }))
            }
            onBlur={() => {
              setIsFocused((prev) => ({
                ...prev,
                end: false,
              }));
              handleBlur(1);
            }}
            onChange={(e) => handleRangeChange(1, e.target.value)}
          />
          {/* 后缀 */}
          {suffixes?.[1] && (
            <span className="mr-4 text-text-secondary">{suffixes?.[1]}</span>
          )}
        </div>
      </div>
      {/* 错误/成功提示容器 */}
      {(errorContents[0] ||
        successContents[0] ||
        errorContents[1] ||
        successContents[1]) && (
        <div className="flex">
          <Tips
            error={errorContents[0]}
            success={successContents[0]}
            className="w-1/2"
            alwaysShow={true}
          />
          <Tips
            error={errorContents[1]}
            success={successContents[1]}
            className="w-1/2"
            alwaysShow={true}
          />
        </div>
      )}
    </div>
  );
});
