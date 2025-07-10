import { forwardRef, useRef, useImperativeHandle } from "react";
import { MeasureTextProps, MeasureTextRef } from "../types";

export const MeasureText = forwardRef<MeasureTextRef, MeasureTextProps>(
  ({ style, children }, ref) => {
    const spanRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => ({
      isExceed: () => {
        const span = spanRef.current;
        if (!span) return false;
        return span.scrollHeight > span.clientHeight;
      },
      getHeight: () => spanRef.current?.clientHeight || 0,
    }));

    return (
      <span
        ref={spanRef}
        className="fixed pointer-events-none opacity-0"
        style={{
          left: -9999,
          top: -9999,
          ...style,
        }}
      >
        {children}
      </span>
    );
  }
);
