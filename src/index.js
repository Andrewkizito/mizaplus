import React from "react";

import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";
import { Switch,Route,BrowserRouter } from "react-router-dom";

import Root from "Client/Root";

const hist = createBrowserHistory(); 

const app = (
    <BrowserRouter history={hist}>
      <Switch>
        <Route to="/" component={Root}/>
      </Switch>
    </BrowserRouter>
)

ReactDOM.render(app,document.getElementById("root"));
