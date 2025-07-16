interface IArrowIconProps {
  iconSize: number;
}

export const ArrowDownIcon = ({ iconSize }: IArrowIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3121 4.13186L7.9994 9.44459L2.68667 4.13186L1.5058 5.31273L7.40896 11.2159C7.73505 11.542 8.26374 11.542 8.58983 11.2159L14.493 5.31273L13.3121 4.13186Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ArrowUpIcon = ({ iconSize }: IArrowIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3121 11.8681L7.9994 6.55541L2.68667 11.8681L1.5058 10.6873L7.40896 4.78411C7.73505 4.45802 8.26374 4.45802 8.58983 4.78411L14.493 10.6873L13.3121 11.8681Z"
        fill="currentColor"
      />
    </svg>
  );
};
