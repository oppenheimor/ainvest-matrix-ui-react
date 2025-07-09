import React from "react";

export const ClearIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11.667"
      height="11.667"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M2.1665 2.16669L13.8332 13.8334"
        stroke="black"
        stroke-width="1.67"
        stroke-linecap="square"
      />
      <path
        d="M2.1665 13.8334L13.8332 2.16669"
        stroke="black"
        stroke-width="1.67"
        stroke-linecap="square"
      />
    </svg>
  );
};
