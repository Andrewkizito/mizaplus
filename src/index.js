import React from "react";

import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";
import { Switch,BrowserRouter } from "react-router-dom";
import Root from "Client/Root";

//Redux Store Imports
import { compose,createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import reducer from "./Client/store/Reducer/Reducer";

import config from "./aws-exports";
import Amplify from "aws-amplify";

Amplify.configure(config);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer,composeEnhancers(applyMiddleware(Thunk)));


const hist = createBrowserHistory(); 

const app = (
  <Provider store={store}>
    <BrowserRouter history={hist}>
      <Switch>
        <Root/>
      </Switch>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app,document.getElementById("root"));
