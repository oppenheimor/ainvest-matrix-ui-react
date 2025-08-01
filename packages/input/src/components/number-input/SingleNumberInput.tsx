import * as React from "react";
import Big from "big.js";
import { cva } from "class-variance-authority";
import { Tips } from "../Tips";
import { DecreaseIcon } from "../icon/DecreaseIcon";
import { IncreaseIcon } from "../icon/IncreaseIcon";
import { ArrowDownIcon, ArrowUpIcon } from "../icon/ArrowIcon";
import { cn } from "../../utils/clxs";
import { SingleNumberInputProps } from "../../types";
import { InputType } from "../../constants";

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

// input元素样式变体
const inputVariants = cva(
  "flex-1 px-4 min-w-0 bg-foreground-layer1 outline-none text-text-primary text-base/snug placeholder:text-text-tertiary caret-[#165DFF]",
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

const SingleNumberInput = React.forwardRef<
  HTMLInputElement,
  SingleNumberInputProps
>((props, ref) => {
  const {
    label,
    required = false,
    error,
    success,
    className,
    disabled = false,
    prefix,
    suffix,
    min,
    max,
    value,
    defaultValue,
    step = 1,
    precision,
    adjustType = "button",
    onChange,
    ...restProps
  } = props;

  // 单值输入状态
  const [singleValue, setSingleValue] = React.useState<string>(() => {
    return value?.toString() || defaultValue?.toString() || "";
  });

  // 交互状态
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isHoveredArrow, setIsHoveredArrow] = React.useState(false);

  // 调整类型为箭头时，箭头是否可见
  const isArrowVisibleWhenArrowType = React.useMemo(() => {
    if (isHoveredArrow) return true;
    return isHovered && !isFocused;
  }, [isHoveredArrow, isHovered, isFocused]);

  // 输入框引用
  const inputRef = React.useRef<HTMLInputElement>(null);

  // 受控组件检测
  const isControlled = props.value !== undefined;

  // 当前值
  const currentValue = isControlled ? String(value) : singleValue;

  // 处理容器点击
  const handleContainerClick = () => {
    if (disabled) return;
    inputRef.current?.focus();
  };

  // 单值输入处理
  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // 验证数字格式
    if (newValue && !/^-?\d*\.?\d*$/.test(newValue)) return;
    if (!isControlled) {
      setSingleValue(newValue);
    }
    onChange?.(Number(newValue));
  };

  // 失焦时进行验证和调整
  const handleBlur = () => {
    setIsFocused(false);
    const newValue = currentValue;
    // 应用精度和范围限制
    if (newValue && !isNaN(Number(newValue))) {
      const numValue = parseFloat(newValue);
      if (!isNaN(numValue)) {
        // 使用 Big.js 进行精确的精度处理
        const valueBig = new Big(numValue);
        const adjustedValue =
          precision !== undefined
            ? valueBig.toFixed(precision)
            : valueBig.toString();
        const finalValue =
          min !== undefined && Number(adjustedValue) < min
            ? String(min)
            : max !== undefined && Number(adjustedValue) > max
            ? String(max)
            : adjustedValue;
        const stringValue = finalValue.toString();
        if (!isControlled) {
          setSingleValue(stringValue);
        }
        onChange?.(Number(stringValue));
      }
    } else {
      if (!isControlled) {
        setSingleValue("");
      }
      onChange?.(void 0);
    }
  };

  // 数值调整
  const handleAdjust = (direction: "increase" | "decrease") => {
    const currentNum = parseFloat(currentValue) || 0;

    // 使用 Big.js 进行精确计算
    const currentBig = new Big(currentNum);
    const stepBig = new Big(step);
    const newValueBig =
      direction === "increase"
        ? currentBig.plus(stepBig)
        : currentBig.minus(stepBig);

    // 应用精度限制
    const adjustedValue =
      precision !== undefined
        ? newValueBig.toFixed(precision)
        : newValueBig.toString();

    // 应用范围限制
    let finalValue = adjustedValue;
    if (min !== undefined || max !== undefined) {
      const numValue = parseFloat(adjustedValue);
      if (!isNaN(numValue)) {
        const finalNumValue =
          min !== undefined && numValue < min
            ? min
            : max !== undefined && numValue > max
            ? max
            : numValue;
        finalValue = finalNumValue.toString();
      }
    }
    if (!isControlled) {
      setSingleValue(finalValue);
    }
    onChange?.(Number(finalValue));
  };

  // 样式获取
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
      <div className="flex items-center">
        {/* 标签区域 */}
        {(label || required) && (
          <div className="flex items-center gap-1.5">
            {label}
            {required && <span className="text-price-down">*</span>}
          </div>
        )}
      </div>

      {/* 输入框容器 */}
      <div
        className={cn(getDivStyles())}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onClick={handleContainerClick}
      >
        {/* 左侧图标 */}
        {adjustType === "arrow" ? null : (
          <span
            className="w-[42px] border-r border-divider-level2 rounded-l-[10px] h-full p-3 flex items-center justify-center hover:bg-background-layer1"
            onClick={(e) => {
              e.stopPropagation();
              handleAdjust("decrease");
            }}
          >
            <DecreaseIcon />
          </span>
        )}
        {/* 前缀 */}
        {prefix && (
          <span
            className={cn("ml-4 text-text-secondary", {
              "text-text-primary": isFocused,
            })}
          >
            {prefix}
          </span>
        )}
        {/* 输入框 */}
        <input
          ref={(node) => {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            inputRef.current = node;
          }}
          value={currentValue}
          disabled={disabled}
          className={cn(inputVariants({ disabled }))}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={handleSingleChange}
          {...restProps}
        />
        {/* 后缀 */}
        {suffix && <span className="mr-4 text-text-secondary">{suffix}</span>}
        {/* 右侧图标 */}
        {adjustType === "arrow" ? (
          <span
            className="w-[29px] h-full flex flex-col items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onMouseEnter={() => {
              setIsHoveredArrow(true);
            }}
            onMouseLeave={() => {
              setIsHoveredArrow(false);
            }}
          >
            {isArrowVisibleWhenArrowType ? (
              <>
                <span
                  className="h-1/2 border-l rounded-tr-[10px] w-full flex items-center justify-center hover:bg-background-layer1"
                  onClick={() => {
                    handleAdjust("increase");
                  }}
                >
                  <ArrowUpIcon />
                </span>
                <span
                  className="h-1/2 border-l rounded-br-[10px] w-full flex items-center justify-center hover:bg-background-layer1"
                  onClick={() => {
                    handleAdjust("decrease");
                  }}
                >
                  <ArrowDownIcon />
                </span>
              </>
            ) : null}
          </span>
        ) : (
          <span
            className="w-[42px] border-l border-divider-level2 rounded-r-[10px] p-3 h-full flex items-center justify-center hover:bg-background-layer1"
            onClick={(e) => {
              e.stopPropagation();
              handleAdjust("increase");
            }}
          >
            <IncreaseIcon />
          </span>
        )}
      </div>
      <Tips error={error} success={success} />
    </div>
  );
});

export { SingleNumberInput };
