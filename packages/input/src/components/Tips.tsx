import { cn } from "../utils/clxs";

export const Tips = (props: {
  error?: React.ReactNode;
  success?: React.ReactNode;
  className?: string;
  alwaysShow?: boolean;
}) => {
  const { error, success, className, alwaysShow = false } = props;
  if (!error && !success && !alwaysShow) return null;
  return (
    <div className={cn("flex flex-col items-start gap-1.5 text-sm", className)}>
      {error && <span className="text-price-down">{error}</span>}
      {success && <span className="text-price-up">{success}</span>}
    </div>
  );
};
