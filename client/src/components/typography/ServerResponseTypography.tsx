import { Box, Typography } from "@material-ui/core";
import React from "react";
import { ServerResponse } from "types/custom";

type Props = {
  serverResponse: ServerResponse;
};

export const ServerResponseTypography = (props: Props) => {
  const {
    serverResponse: { message, isError },
  } = props;

  return (
    <Box mt={1}>
      <Typography style={{ color: isError ? "red" : "green" }}>
        {message}
      </Typography>
    </Box>
  );
};
