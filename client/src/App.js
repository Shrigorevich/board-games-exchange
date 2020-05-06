import React from 'react';
import Main from "./pages/main"
import Personal_account from "./pages/personal-acc"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Main />
        </Route>
        <Route path="/personal-account">
          <Personal_account />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
