import React, { useState } from "react";
import {
  createMuiTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";

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
    secondary: {
      main: "#ffffff",
    },
  },
};

function App(): JSX.Element {
  const [theme, setTheme] = useState(true);

  const appliedTheme = createMuiTheme(theme ? light : dark);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Main changeTheme={() => setTheme(!theme)} />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
