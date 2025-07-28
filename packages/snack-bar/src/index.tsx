import { Toaster } from "./components/shadcn-snackbar";
import { isCurrentToastClickable } from "./hooks/useSnackbar";
import { toast } from "sonner";
import type { SnackbarOptions } from "./types";

export const Snackbar = (props: SnackbarOptions) => {
  const handleClick = () => {
    if (isCurrentToastClickable()) {
      toast.dismiss();
    }
  };

  return (
    <div onClick={handleClick}>
      <Toaster {...props} />
    </div>
  );
};
