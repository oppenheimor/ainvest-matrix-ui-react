import React from 'react';

interface ArrowIconProps {
  className?: string;
}

/**
 * 箭头图标组件
 * 从 Tooltip 组件移植，用于 Popover 的指向箭头
 */

export const ArrowIcon = React.memo<ArrowIconProps>(({ className }) => {
  return (
    <svg
      width="15"
      height="5"
      viewBox="0 0 15 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-0.002 0.0006C0.525 0.0006 1.052 0.0009 1.579 0.0009C2.083 0.0009 2.648 0.0011 3.139 0.1861C3.669 0.3861 4.019 0.7358 4.373 1.1474C4.627 1.4434 5.127 2.075 5.370 2.380C5.569 2.6301 5.958 3.1243 6.171 3.3634C6.439 3.6642 6.770 3.9839 7.229 3.9839C7.689 3.9839 8.020 3.6642 8.288 3.3634C8.501 3.1245 8.890 2.6300 9.089 2.3801C9.332 2.0751 9.832 1.4435 10.086 1.1475C10.439 0.7359 10.790 0.3861 11.321 0.1861C11.811 0.0011 12.376 -0.0067 12.880 -0.0010C13.407 -0.0057 13.934 -0.0031 14.461 -0.0031"
        fill="currentColor"
      />
    </svg>
  );
});

ArrowIcon.displayName = 'ArrowIcon';
