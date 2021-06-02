import { Typography } from "@material-ui/core";
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
    <Typography style={{ color: isError ? "red" : "green" }}>
      {message}
    </Typography>
  );
};
