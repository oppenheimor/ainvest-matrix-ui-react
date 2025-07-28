import { Snackbar } from "./src/index";
import { snackbar, useSnackbar } from "./src/hooks/useSnackbar";

export default Snackbar;

export { Snackbar, snackbar, useSnackbar };

export type { 
  SnackbarOptions, 
  SnackbarAction, 
  SnackbarPosition,
  SnackbarFunction
} from "./src/types";
