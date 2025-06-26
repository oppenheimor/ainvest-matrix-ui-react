const ArrowRightIcon = (props: { iconSize: number }) => {
  const { iconSize } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={iconSize}
      viewBox="0 0 16 16"
      fill="none"
    >
      <mask
        id="mask0_6376_549"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="white" />
      </mask>
      <g mask="url(#mask0_6376_549)">
        <path
          d="M5.3125 2.6875L10.6252 8.00023L5.3125 13.313"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ArrowRightIcon;
