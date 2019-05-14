import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./pages/Main";
import Box from "./pages/Box";
import CreateBox from "./pages/CreateBox";
import Register from "./pages/Register";
import MainBoxes from "./pages/MainBox";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/principal" exact component={CreateBox} />
      <Route path="/boxes/:id" component={Box} />
      <Route path="/register" component={Register} />
      <Route path="/main/:id" component={MainBoxes} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
