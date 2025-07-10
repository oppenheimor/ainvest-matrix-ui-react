import * as React from 'react';

/**
 * 成功状态图标组件
 * 使用 currentColor 支持外部颜色控制，配合 text-status-success 使用
 */
export const SuccessIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.2284 14.1317L7.93033 11.8336L6.86967 12.8943L10.2284 16.2531L17.1227 9.35876L16.0621 8.2981L10.2284 14.1317Z"
      fill="currentColor"
    />
  </svg>
));
SuccessIcon.displayName = 'SuccessIcon';

/**
 * 错误状态图标组件
 * 使用 currentColor 支持外部颜色控制，配合 text-status-error 使用
 */
export const ErrorIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 10.9395L8.53027 7.46973L7.46973 8.53027L10.9395 12L7.46973 15.4697L8.53027 16.5303L12 13.0605L15.4697 16.5303L16.5303 15.4697L13.0605 12L16.5303 8.53027L15.4697 7.46973L12 10.9395Z"
      fill="currentColor"
    />
  </svg>
));
ErrorIcon.displayName = 'ErrorIcon';

/**
 * 警告状态图标组件
 * 使用 currentColor 支持外部颜色控制，配合 text-status-warning 使用
 */
export const WarningIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15ZM11.25 7V14H12.75V7H11.25Z"
      fill="currentColor"
    />
  </svg>
));
WarningIcon.displayName = 'WarningIcon';

/**
 * 信息状态图标组件
 * 使用 currentColor 支持外部颜色控制，配合 text-status-info 使用
 */
export const InfoIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11.25 17H12.75V10H11.25V17ZM12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7Z"
      fill="currentColor"
    />
  </svg>
));
InfoIcon.displayName = 'InfoIcon';

/**
 * 关闭按钮图标组件
 * 使用 currentColor 支持外部颜色控制，通常配合 text-text-secondary 使用
 */
export const CloseIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M3.66797 3.33594L13.0013 12.6693"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M3.66797 12.6693L13.0013 3.33594"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
});

CloseIcon.displayName = 'CloseIcon';
