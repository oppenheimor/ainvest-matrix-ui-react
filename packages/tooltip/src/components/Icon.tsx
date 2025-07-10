import * as React from 'react';

interface CloseIconProps {
  className?: string;
  size?: number;
}

interface ArrowIconProps {
  className?: string;
  size?: number;
}

/**
 * 关闭图标组件
 * 用于 Tooltip 可关闭模式的关闭按钮
 */
export const CloseIcon = React.memo<CloseIconProps>(({ className, size = 16 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.33333 2.15244L2.15246 3.33331L6.81913 7.99998L2.15246 12.6666L3.33333 13.8475L8 9.18085L12.6667 13.8475L13.8475 12.6666L9.18086 7.99998L13.8475 3.33331L12.6667 2.15244L8 6.81911L3.33333 2.15244Z"
        fill="currentColor"
        transform="translate(1, 0.5)"
      />
    </svg>
  );
});

CloseIcon.displayName = 'CloseIcon';

/**
 * 箭头图标组件
 * 用于 Tooltip 的指向箭头
 */
export const ArrowIcon = React.memo<ArrowIconProps>(({ className, size = 15 }) => {
  return (
    <svg
      width={size}
      height={Math.round((size * 4) / 15)} // 保持原始比例 15:4
      viewBox="0 0 15 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4609 3.9994C13.934 3.9994 13.4071 4.00202 12.8802 3.99632C12.3758 3.99078 11.8113 3.98294 11.3205 3.79784C10.7903 3.59781 10.4393 3.24808 10.0861 2.83649C9.83186 2.54046 9.33243 1.90884 9.08924 1.60388C8.89021 1.35385 8.50059 0.859642 8.28787 0.620536C8.02007 0.319731 7.68906 3.61658e-07 7.22931 3.21465e-07C6.76955 2.81272e-07 6.4387 0.319731 6.17106 0.620228C5.95833 0.859179 5.56872 1.3537 5.36953 1.60358C5.12665 1.90854 4.62721 2.54015 4.3728 2.83618C4.01903 3.24777 3.66864 3.59751 3.13859 3.79753C2.64761 3.98217 2.08295 3.99047 1.5789 3.99601C1.05177 4.00171 0.524957 3.99909 -0.00201511 3.99909"
        fill="currentColor"
      />
    </svg>
  );
});

ArrowIcon.displayName = 'ArrowIcon';
