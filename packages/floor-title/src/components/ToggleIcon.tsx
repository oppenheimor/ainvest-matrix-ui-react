/**
 * 折叠/展开的icon
 */

import { cva } from "class-variance-authority";
import { cn } from "../utils/clsx";
import { FloorLevelMap } from "../constants";

const ToggleIconLarge = (props: { className: string }) => {
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
        id="mask0_6495_4051"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect
          x="24"
          width="24"
          height="24"
          transform="rotate(90 24 0)"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_6495_4051)">
        <path
          d="M19.9707 9.96899L12.0016 17.9381L4.03252 9.96899"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

const ToggleIconMedium = (props: { className: string }) => {
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
        id="mask0_6495_3113"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect
          x="20"
          width="20"
          height="20"
          transform="rotate(90 20 0)"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_6495_3113)">
        <path
          d="M16.6422 8.30737L10.0013 14.9483L3.36039 8.30737"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

const ToggleIconSmall = (props: { className: string }) => {
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
        id="mask0_6495_6116"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect
          x="16"
          width="16"
          height="16"
          transform="rotate(90 16 0)"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_6495_6116)">
        <path
          d="M13.3138 6.646L8.00111 11.9587L2.68838 6.646"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

const baseIconStyles = cva("text-text-primary", {
  variants: {
    level: {
      [FloorLevelMap.Level1]: "ml-2",
      [FloorLevelMap.Level2]: "ml-2",
      [FloorLevelMap.Level3]: "ml-1 @sm:ml-2",
    },
    visibility: {
      smBlock: "hidden @sm:block",
      smHidden: "block @sm:hidden",
    },
    rotated: {
      true: "transform rotate-180",
      false: "",
    },
  },
});

export const ArrowDownIconMap = {
  [FloorLevelMap.Level1]: (
    <>
      <ToggleIconLarge
        className={cn(
          baseIconStyles({
            level: FloorLevelMap.Level1,
            visibility: "smBlock",
            rotated: false,
          })
        )}
      />
      <ToggleIconMedium
        className={cn(
          baseIconStyles({
            level: FloorLevelMap.Level1,
            visibility: "smHidden",
            rotated: false,
          })
        )}
      />
    </>
  ),
  [FloorLevelMap.Level2]: (
    <>
      <ToggleIconMedium
        className={cn(
          baseIconStyles({
            level: FloorLevelMap.Level2,
            visibility: "smBlock",
            rotated: false,
          })
        )}
      />
      <ToggleIconSmall
        className={cn(
          baseIconStyles({
            level: FloorLevelMap.Level2,
            visibility: "smHidden",
            rotated: false,
          })
        )}
      />
    </>
  ),
  [FloorLevelMap.Level3]: (
    <ToggleIconSmall
      className={cn(
        baseIconStyles({ level: FloorLevelMap.Level3, rotated: false })
      )}
    />
  ),
};

export const ArrowUpIconMap = {
  [FloorLevelMap.Level1]: (
    <>
      <ToggleIconLarge
        className={cn(
          baseIconStyles({
            level: FloorLevelMap.Level1,
            visibility: "smBlock",
            rotated: true,
          })
        )}
      />
      <ToggleIconMedium
        className={cn(
          baseIconStyles({
            level: FloorLevelMap.Level1,
            visibility: "smHidden",
            rotated: true,
          })
        )}
      />
    </>
  ),
  [FloorLevelMap.Level2]: (
    <>
      <ToggleIconMedium
        className={cn(
          baseIconStyles({
            level: FloorLevelMap.Level2,
            visibility: "smBlock",
            rotated: true,
          })
        )}
      />
      <ToggleIconSmall
        className={cn(
          baseIconStyles({
            level: FloorLevelMap.Level2,
            visibility: "smHidden",
            rotated: true,
          })
        )}
      />
    </>
  ),
  [FloorLevelMap.Level3]: (
    <ToggleIconSmall
      className={cn(
        baseIconStyles({ level: FloorLevelMap.Level3, rotated: true })
      )}
    />
  ),
};
