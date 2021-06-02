import { Box, Typography } from "@material-ui/core";
import gymLogo from "assets/images/gym-logo.jpg";
import React from "react";

export const SignUpHeader = () => {
  return (
    <>
      <img src={gymLogo} alt="gym logo" />
      <Box my={2}>
        <Typography>It's free. Only a minute to complete</Typography>
      </Box>
    </>
  );
};
