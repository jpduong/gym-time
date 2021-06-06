import { Box, Container, ContainerProps, Grid } from "@material-ui/core";
import React from "react";

interface Props extends ContainerProps {
  children: JSX.Element | JSX.Element[];
}

export const PageContainer = (props: Props) => {
  const { children, ...otherProps } = props;

  return (
    <Container maxWidth="xs" title="component-page-container" {...otherProps}>
      <Box pt={10}>
        <Grid container justify="center" alignItems="center" direction="column">
          {children}
        </Grid>
      </Box>
    </Container>
  );
};
