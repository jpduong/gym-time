import { Box, Typography } from "@material-ui/core";
import gymLogo from "assets/images/gym-logo.jpg";
import React from "react";

type Props = {
  heading: string;
};

export const Header = (props: Props) => {
  const { heading } = props;

  return (
    <>
      <img src={gymLogo} alt="gym logo" />
      <Box my={2}>
        <Typography>{heading}</Typography>
      </Box>
    </>
  );
};
