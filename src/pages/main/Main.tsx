import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { useTheme } from "@material-ui/core/styles";
import PropTypes, { InferProps } from "prop-types";
import Form from "./Form/Form";
import NavBar from "./NavBar/NavBar";
import Queue from "./Queue/Queue";

export default function Main(
  props: InferProps<typeof Main.propTypes>,
): JSX.Element {
  const { changeTheme } = props;
  const theme = useTheme();

  return (
    <div style={{ overflowX: "hidden", height: "100vh" }}>
      <Grid container spacing={3}>
        <Grid xs={12} item>
          <NavBar changeTheme={() => changeTheme(!theme)} />
        </Grid>
        <Grid item container xs={12} spacing={10} justify="center">
          <Grid item xs={4}>
            <Form />
          </Grid>
          <Grid xs={5} item>
            <Queue />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

Main.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};
