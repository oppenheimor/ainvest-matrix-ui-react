export const ArrowRightIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8684 7.44374L6.86841 2.44374L5.75705 3.5551L10.2014 7.99942L5.75705 12.4437L6.86841 13.5551L11.8684 8.5551C12.1753 8.24821 12.1753 7.75063 11.8684 7.44374Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ArrowUpIcon = () => {
  return (
    <span className="rotate-[270deg]">
      <ArrowRightIcon />
    </span>
  );
};
