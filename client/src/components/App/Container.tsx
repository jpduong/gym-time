import { Box, Container, Grid } from "@material-ui/core";
import React from "react";

type Props = {
  children: JSX.Element;
};

export const AppContainer = (props: Props) => {
  const { children } = props;

  return (
    <Container maxWidth="xs">
      <Box pt={10}>
        <Grid container justify="center" alignItems="center" direction="column">
          {children}
        </Grid>
      </Box>
    </Container>
  );
};
