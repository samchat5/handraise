import React, { useState } from "react";
import {
  Grid,
  createMuiTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import Form from "./Form/Form";
import NavBar from "./NavBar/NavBar";
import Queue from "./Queue/Queue";

const dark: ThemeOptions = {
  palette: {
    primary: red,
    type: "dark",
  },
};

const light: ThemeOptions = {
  palette: {
    primary: red,
    type: "light",
  },
};

function App(): JSX.Element {
  const [theme, setTheme] = useState(true);

  const appliedTheme = createMuiTheme(theme ? light : dark);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <div style={{ overflowX: "hidden", height: "100vh" }}>
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <NavBar changeTheme={() => setTheme(!theme)} />
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
    </ThemeProvider>
  );
}

export default App;
