import React, { useEffect } from 'react';

import { Route, Switch } from "react-router";

import "../Client/assets/scss/material-kit-pro-react.scss?v=1.9.0";

// pages for this product
import { BrowserRouter } from 'react-router-dom';
import Notifications from './views/UI/Notifications/Notifications';
import ProductView from './views/ProductView/ProductView';
import Cart from  './views/Cart/Cart';
import Checkout from './views/Checkout/Checkout';
import LogIn from './views/LogIn/LogIn';
import Home from './views/Home/Home';
import { connect } from 'react-redux';
import { AutoAuth, setCartFromLocalStorage } from './store/Actions/ActionTypes';
import Register from './views/Register/Register';
import SectionContact from './views/ContactUs/Contact';
import AboutUs from './views/AboutUs/AboutUs';
import ChangePassword from './views/ChangePassword/ChangePassword';
import ResetPassword from './views/ResetPassword/ResetPassword';
import Orders from './views/Orders/Orders';


const Root = ({autoAuth,setCartFromLocalStorage,AuthState}) => {
    useEffect(() => {
        autoAuth();
        setCartFromLocalStorage();
    }, [])
    
    return (
        <div>
            <Notifications/>
            <BrowserRouter>
                { !AuthState ?
                    <Switch>
                        <Route path="/reset-password" component={ChangePassword} />
                        <Route path="/forgot-password" component={ResetPassword} />
                        <Route path="/change-password" component={ResetPassword} />
                        <Route path="/login" component={LogIn} />
                        <Route path="/register" component={Register} />
                        <Route path="/about-us" component={AboutUs} />
                        <Route path="/support" component={SectionContact} />
                        <Route path="/product" component={ProductView} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/" component={Home}/>
                    </Switch>
                    :
                    <Switch>
                        <Route path="/about-us" component={AboutUs} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/login" component={LogIn} />
                        <Route path="/support" component={SectionContact} />
                        <Route path="/product" component={ProductView} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/" component={Home}/>
                    </Switch>
                 }
            </BrowserRouter>
        </div>
    ) 
}

const mapStateToProps = state => {
    return {
        AuthState: state.AuthState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        autoAuth: () => dispatch(AutoAuth()),
        setCartFromLocalStorage: () => dispatch(setCartFromLocalStorage())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Root);
