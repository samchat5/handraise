import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { AppBar, Toolbar, Button, Typography, Grid } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";

function NavBar(props: InferProps<typeof NavBar.propTypes>): JSX.Element {
  const { changeTheme } = props;

  return (
    <AppBar position="relative">
      <Toolbar>
        <Grid container style={{ justifyContent: "flex-end" }}>
          <Grid item>
            <Typography
              style={{
                fontWeight: "bold",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                flexGrow: 1,
              }}
              variant={"h4" as Variant}
            >
              <span>Hand</span>
              <span style={{ color: "black" }}>Raise 🙋🗳️🙋‍♂️</span>
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={changeTheme}>Switch theme</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};

export default NavBar;
