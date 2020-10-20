import React from 'react';

import { Route, Switch } from "react-router";

import "../Client/assets/scss/material-kit-pro-react.scss?v=1.9.0";

// pages for this product
import { BrowserRouter } from 'react-router-dom';
import Notifications from './views/UI/Notifications/Notifications';
import ProductView from './views/ProductView/ProductView';
import Admin from 'Admin/Index';
import Cart from  './views/Cart/Cart';
import Home from './views/Home/Home';

//Redux Store Imports
import { compose,createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import reducer from "./store/Reducer/Reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer,composeEnhancers(applyMiddleware(Thunk)));

const Root = () => {
    return (
        <Provider store={store}>
            <div>
                <Notifications/>
                <BrowserRouter>
                    <Switch>
                        <Route path="/admin" component={Admin}/>
                        <Route path="/product/:id" component={ProductView} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/" component={Home}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </Provider>
    )
}

export default Root;
