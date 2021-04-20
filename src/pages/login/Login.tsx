import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Typography,
  CssBaseline,
  TextField,
  Avatar,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
}));

export default function Login(): JSX.Element {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box bgcolor={theme.palette.primary.main}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          overflowX: "hidden",
          overflowY: "hidden",
          height: "100vh",
          color: "white",
        }}
      >
        <Grid container direction="column" alignItems="center" justify="center">
          <Avatar>
            <Lock />
          </Avatar>
          <Typography
            style={{ fontWeight: "bold" }}
            component="h1"
            variant="h3"
          >
            Login
          </Typography>
          <form className={classes.form}>
            <TextField
              color="secondary"
              margin="normal"
              fullWidth
              variant="filled"
              label="Email address"
            />
            <TextField
              color="secondary"
              margin="normal"
              fullWidth
              variant="filled"
              label="Password"
            />
            <Box mt={2}>
              <ButtonGroup fullWidth color="secondary" size="large">
                <Button>Sign Up</Button>
                <Button>Sign In</Button>
              </ButtonGroup>
            </Box>
          </form>
        </Grid>
      </div>
    </Box>
  );
}
