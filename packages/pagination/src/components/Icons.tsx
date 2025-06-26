export const LeftIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M10.8502 6.00049L11.3766 6.53564L6.58362 11.2505H19.9996V12.7505H6.58362L11.3766 17.4653L10.8502 18.0005L10.3248 18.5356L4.22424 12.5356C4.08102 12.3948 4.00074 12.2014 4.00061 12.0005C4.00061 11.7995 4.08106 11.6063 4.22424 11.4653L10.3248 5.46533L10.8502 6.00049Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const RightIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6234 17.4648L13.1498 18L13.6752 18.5352L19.7758 12.5352C19.9191 12.3942 19.9994 12.2011 19.9994 12C19.9994 11.7989 19.9191 11.6058 19.7758 11.4648L13.6752 5.46484L13.1498 6L12.6234 6.53516L17.4166 11.25L4.00037 11.25L4.00037 12.75L17.4166 12.75L12.6234 17.4648Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EllipsisIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.5 12C7.5 12.8284 6.82843 13.5 6 13.5C5.17157 13.5 4.5 12.8284 4.5 12C4.5 11.1716 5.17157 10.5 6 10.5C6.82843 10.5 7.5 11.1716 7.5 12ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12ZM18 13.5C18.8284 13.5 19.5 12.8284 19.5 12C19.5 11.1716 18.8284 10.5 18 10.5C17.1716 10.5 16.5 11.1716 16.5 12C16.5 12.8284 17.1716 13.5 18 13.5Z"
        className="fill-text-primary"
      />
    </svg>
  );
};
