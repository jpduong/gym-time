import { createMuiTheme } from "@material-ui/core";

export const muiTheme = createMuiTheme({
  props: {
    MuiTextField: {
      size: "small",
      variant: "outlined",
      fullWidth: true,
      autoComplete: "on",
    },
    MuiButton: {
      variant: "outlined",
      fullWidth: true,
      size: "large",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "capitalize",
      },
    },
  },
});
