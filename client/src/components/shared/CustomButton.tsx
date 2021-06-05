import {
  Button,
  ButtonProps,
  CircularProgress,
  useTheme,
} from "@material-ui/core";
import React from "react";

interface Props extends ButtonProps {
  isLoading: boolean;
  text: string;
}

export const CustomButton = (props: Props) => {
  const { isLoading, text, ...otherProps } = props;
  const theme = useTheme();

  return (
    <Button
      disabled={isLoading}
      {...otherProps}
      title="component-custom-button"
    >
      {isLoading && (
        <CircularProgress
          title="component-custom-button-loader"
          size={20}
          color="inherit"
          style={{ marginRight: theme.spacing(1) }}
        />
      )}{" "}
      {text}
    </Button>
  );
};
