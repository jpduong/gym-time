import { Box, Typography } from "@material-ui/core";
import gymLogo from "assets/images/gym-logo.jpg";
import React from "react";

type Props = {
  heading: string;
  color?: "green";
};

export const Header = (props: Props) => {
  const { heading, color } = props;

  return (
    <>
      <img src={gymLogo} alt="gym logo" />
      <Box my={2}>
        <Typography style={{ color }}>{heading}</Typography>
      </Box>
    </>
  );
};
