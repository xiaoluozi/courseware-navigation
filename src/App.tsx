import React, { FC } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Index from "./route/Index";
import NotFound from "./route/404";
import { Provider } from "mobx-react";
import { layoutStore } from "./store/LayoutStore";
import navigationStore from "./store/navigationStore";

const stores = {
  layoutStore,
  navigationStore: new navigationStore()
};

const App: FC = () => (
  <Router>
    <Provider {...stores}>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route component={NotFound} />
      </Switch>
    </Provider>
  </Router>
);

export default App;
