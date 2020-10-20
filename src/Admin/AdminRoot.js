import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "./layouts/Admin.js";

import "./assets/scss/material-dashboard-pro-react.scss?v=1.9.0";
import { connect } from "react-redux";
import { AutoAuth } from "./store/Actions/ActionTypes.js";

import ResetPassword from './layouts/ResetPassword/ResetPassword';
import ChangePassword from './layouts/ChangePassword/ChangePassword';
import SignIn from './layouts/SignIn/SignIn';

const AdminRoot = ({AuthState,autoAuth}) => {
  useEffect(() => {
    autoAuth()
  },[autoAuth]);
  return (
    <div>
    { AuthState ? 
      <Switch>
          <Route path="/admin" component={AdminLayout} />
      </Switch>: 
      <Switch>
        <Route path="/admin/sign-in" component={SignIn}/>
        <Route path="/admin/forgot-password" component={ResetPassword}/>
        <Route path="/admin/change-password" component={ResetPassword}/>
        <Route path="/admin/reset-password" component={ChangePassword}/>
        <Redirect from="/admin"  to="/admin/sign-in"/>
      </Switch>}
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
      autoAuth: () => dispatch(AutoAuth())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminRoot);

