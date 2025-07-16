/** 按钮位置在内部和外部的颜色不同 */
const CircleColorSeries = {
  inside: "var(--atom-color-foreground-layer1)",
  outside: "var(--atom-color-foreground-layer1_2)",
};

const LargeArrowIcon = (type: "inside" | "outside") => ({
  left: {
    normal: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
      >
        <g filter="url(#filter0_d_9008_4839)">
          <circle cx="32" cy="32" r="24" fill={CircleColorSeries[type]} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            x="20"
            y="20"
          >
            <mask
              id="mask0_9038_4840"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="white" />
            </mask>
            <g mask="url(#mask0_9038_4840)">
              <path
                d="M14.5312 4.5L7.03125 12L14.5312 19.5"
                stroke="var(--atom-color-text-primary)"
                strokeWidth="2.35755"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9008_4839"
            x="0"
            y="0"
            width="64"
            height="64"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9008_4839"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9008_4839"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
    pressed: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
      >
        <g filter="url(#filter0_d_9008_3784)">
          <circle cx="32" cy="30" r="24" fill={CircleColorSeries[type]} />
          {type === "outside" && (
            <circle
              cx="32"
              cy="30"
              r="24"
              fill="var(--atom-color-text-primary)"
              fillOpacity="0.05"
            />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            x="20"
            y="18"
          >
            <mask
              id="mask0_9038_3785"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="white" />
            </mask>
            <g mask="url(#mask0_9038_3785)">
              <path
                d="M14.5312 4.5L7.03125 12L14.5312 19.5"
                stroke="var(--atom-color-text-primary)"
                strokeWidth="2.35755"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9008_3784"
            x="0"
            y="0"
            width="64"
            height="64"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9008_3784"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9008_3784"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
    disabled: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        className="cursor-not-allowed"
      >
        <g filter="url(#filter0_d_9008_4839)">
          <circle cx="32" cy="32" r="24" fill={CircleColorSeries[type]} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            x="20"
            y="20"
          >
            <mask
              id="mask0_9038_4840_disabled"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="white" />
            </mask>
            <g mask="url(#mask0_9038_4840_disabled)">
              <path
                d="M14.5312 4.5L7.03125 12L14.5312 19.5"
                stroke="var(--atom-color-text-tertiary)"
                strokeWidth="2.35755"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9008_4839"
            x="0"
            y="0"
            width="64"
            height="64"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9008_4839"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9008_4839"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
  },
  right: {
    normal: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
      >
        <g filter="url(#filter0_d_9008_3417)">
          <circle cx="32" cy="32" r="24" fill={CircleColorSeries[type]} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            x="20"
            y="20"
          >
            <mask
              id="mask0_9038_3418"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="white" />
            </mask>
            <g mask="url(#mask0_9038_3418)">
              <path
                d="M9.46875 4.5L16.9687 12L9.46875 19.5"
                stroke="var(--atom-color-text-primary)"
                strokeWidth="2.36"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9008_3417"
            x="0"
            y="0"
            width="64"
            height="64"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9008_3417"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9008_3417"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
    pressed: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
      >
        <g filter="url(#filter0_d_9008_2903)">
          <circle cx="32" cy="30" r="24" fill={CircleColorSeries[type]} />
          {type === "outside" && (
            <circle
              cx="32"
              cy="30"
              r="24"
              fill="var(--atom-color-text-primary)"
              fillOpacity="0.05"
            />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            x="20"
            y="18"
          >
            <mask
              id="mask0_9038_2904"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="white" />
            </mask>
            <g mask="url(#mask0_9038_2904)">
              <path
                d="M9.46875 4.5L16.9687 12L9.46875 19.5"
                stroke="var(--atom-color-text-primary)"
                strokeWidth="2.36"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9008_2903"
            x="0"
            y="0"
            width="64"
            height="64"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9008_2903"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9008_2903"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
    disabled: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        className="cursor-not-allowed"
      >
        <g filter="url(#filter0_d_9008_3417)">
          <circle cx="32" cy="32" r="24" fill={CircleColorSeries[type]} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            x="20"
            y="20"
          >
            <mask
              id="mask0_9038_3418_disabled"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="white" />
            </mask>
            <g mask="url(#mask0_9038_3418_disabled)">
              <path
                d="M9.46875 4.5L16.9687 12L9.46875 19.5"
                stroke="var(--atom-color-text-tertiary)"
                strokeWidth="2.36"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9008_3417"
            x="0"
            y="0"
            width="64"
            height="64"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9008_3417"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9008_3417"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
  },
});

const MediumArrowIcon = (type: "inside" | "outside") => ({
  left: {
    normal: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
      >
        <g filter="url(#filter0_d_9081_6819)">
          <circle cx="26" cy="26" r="18" fill={CircleColorSeries[type]} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            x="16"
            y="16"
          >
            <mask
              id="mask0_9081_6820"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="white" />
            </mask>
            <g mask="url(#mask0_9081_6820)">
              <path
                d="M12.1094 3.75L5.85938 10L12.1094 16.25"
                stroke="var(--atom-color-text-primary)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9081_6819"
            x="0"
            y="0"
            width="52"
            height="52"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9081_6819"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9081_6819"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
    pressed: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
      >
        <g filter="url(#filter0_d_9081_6880)">
          <circle cx="26" cy="24" r="18" fill={CircleColorSeries[type]} />
          {type === "outside" && (
            <circle
              cx="26"
              cy="24"
              r="18"
              fill="var(--atom-color-text-primary)"
              fillOpacity="0.05"
            />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            x="16"
            y="14"
          >
            <mask
              id="mask0_9081_6881"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="white" />
            </mask>
            <g mask="url(#mask0_9081_6881)">
              <path
                d="M12.1094 3.75L5.85938 10L12.1094 16.25"
                stroke="var(--atom-color-text-primary)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9081_6880"
            x="0"
            y="0"
            width="52"
            height="52"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9081_6880"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9081_6880"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
    disabled: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
      >
        <g filter="url(#filter0_d_9081_6819)">
          <circle cx="26" cy="26" r="18" fill={CircleColorSeries[type]} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            x="16"
            y="16"
          >
            <mask
              id="mask0_9081_6820_disabled"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="white" />
            </mask>
            <g mask="url(#mask0_9081_6820_disabled)">
              <path
                d="M12.1094 3.75L5.85938 10L12.1094 16.25"
                stroke="var(--atom-color-text-tertiary)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9081_6819"
            x="0"
            y="0"
            width="52"
            height="52"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9081_6819"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9081_6819"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
  },
  right: {
    normal: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
      >
        <g filter="url(#filter0_d_9081_3832)">
          <circle cx="26" cy="26" r="18" fill={CircleColorSeries[type]} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            x="16"
            y="16"
          >
            <mask
              id="mask0_9081_3833"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="white" />
            </mask>
            <g mask="url(#mask0_9081_3833)">
              <path
                d="M7.89062 3.75L14.1406 10L7.89062 16.25"
                stroke="var(--atom-color-text-primary)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9081_3832"
            x="0"
            y="0"
            width="52"
            height="52"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9081_3832"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9081_3832"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
    pressed: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
      >
        <g filter="url(#filter0_d_9081_6902)">
          <circle cx="26" cy="24" r="18" fill={CircleColorSeries[type]} />
          {type === "outside" && (
            <circle
              cx="26"
              cy="24"
              r="18"
              fill="var(--atom-color-text-primary)"
              fillOpacity="0.05"
            />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            x="16"
            y="14"
          >
            <mask
              id="mask0_9081_6903"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="white" />
            </mask>
            <g mask="url(#mask0_9081_6903)">
              <path
                d="M7.89062 3.75L14.1406 10L7.89062 16.25"
                stroke="var(--atom-color-text-primary)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9081_6902"
            x="0"
            y="0"
            width="52"
            height="52"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9081_6902"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9081_6902"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
    disabled: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
      >
        <g filter="url(#filter0_d_9081_3832)">
          <circle cx="26" cy="26" r="18" fill={CircleColorSeries[type]} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            x="16"
            y="16"
          >
            <mask
              id="mask0_9081_3833_disabled"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="white" />
            </mask>
            <g mask="url(#mask0_9081_3833_disabled)">
              <path
                d="M7.89062 3.75L14.1406 10L7.89062 16.25"
                stroke="var(--atom-color-text-tertiary)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </g>
        <defs>
          <filter
            id="filter0_d_9081_3832"
            x="0"
            y="0"
            width="52"
            height="52"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9081_3832"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9081_3832"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
  },
});

const AutoHeightArrowIcon = () => {
  const leftIcon = (
    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-l from-white dark:from-[#171717] via-white/100 dark:via-[#171717] via-[68.23%]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <mask
          id="mask0_9292_2562"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <rect
            x="20"
            y="20"
            width="20"
            height="20"
            transform="rotate(-180 20 20)"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_9292_2562)">
          <path
            d="M12.1094 16.25L5.85938 10L12.1094 3.75"
            stroke="var(--atom-color-text-primary)"
            strokeWidth="1.96462"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
  const rightIcon = (
    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-l from-white dark:from-[#171717] via-white/100 dark:via-[#171717] via-[68.23%]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <mask
          id="mask0_9292_3277"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <rect width="20" height="20" fill="white" />
        </mask>
        <g mask="url(#mask0_9292_3277)">
          <path
            d="M7.89062 3.75L14.1406 10L7.89062 16.25"
            stroke="var(--atom-color-text-primary)"
            strokeWidth="1.96462"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
  return {
    left: {
      normal: leftIcon,
      pressed: leftIcon,
      disabled: leftIcon,
    },
    right: {
      normal: rightIcon,
      pressed: rightIcon,
      disabled: rightIcon,
    },
  };
};

interface IArrowIconProps {
  /** 箭头方向 */
  direction: "left" | "right";
  /** 是否处于按下状态（hover/click） */
  isPressed?: boolean;
  /** 图标等级 */
  size: "medium" | "large" | "auto";
  /** 是否禁用 */
  disabled?: boolean;
  /** 按钮在内部和外部的颜色不同 */
  type?: "inside" | "outside";
}

export const ArrowIcon = ({
  direction,
  isPressed = false,
  size,
  disabled = false,
  type = "inside",
}: IArrowIconProps) => {
  const iconSet =
    size === "large"
      ? LargeArrowIcon(type)
      : size === "medium"
      ? MediumArrowIcon(type)
      : AutoHeightArrowIcon();
  const directionIcons = iconSet[direction];
  if (disabled) {
    return directionIcons.disabled;
  }
  if (isPressed) {
    return directionIcons.pressed;
  }
  return directionIcons.normal;
};
