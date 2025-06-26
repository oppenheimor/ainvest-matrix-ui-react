import { FloorLevelMap } from "../../constants";

const ArrowRightIconLarge = (props: { className: string }) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <mask
        id="mask0_6674_587"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="white" />
      </mask>
      <g mask="url(#mask0_6674_587)">
        <path
          d="M7.96875 4.03027L15.9378 11.9994L7.96875 19.9685"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

const ArrowRightIconMedium = (props: { className: string }) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <mask
        id="mask0_6674_1181"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="white" />
      </mask>
      <g mask="url(#mask0_6674_1181)">
        <path
          d="M6.64062 3.35864L13.2815 9.99955L6.64062 16.6405"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

const ArrowRightIconSmall = (props: { className: string }) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <mask
        id="mask0_6674_5410"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="white" />
      </mask>
      <g mask="url(#mask0_6674_5410)">
        <path
          d="M5.3125 2.68677L10.6252 7.9995L5.3125 13.3122"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export const ArrowRightIconMap = {
  [FloorLevelMap.Level1]: (
    <>
      <ArrowRightIconLarge className="ml-2 hidden @sm:block" />
      <ArrowRightIconMedium className="ml-2 block @sm:hidden" />
    </>
  ),
  [FloorLevelMap.Level2]: (
    <>
      <ArrowRightIconMedium className="ml-2 hidden @sm:block" />
      <ArrowRightIconSmall className="ml-2 block @sm:hidden" />
    </>
  ),
  [FloorLevelMap.Level3]: <ArrowRightIconSmall className="ml-1 @sm:ml-2" />,
};
