/* eslint-disable */
import React, { useState, useEffect } from "react";

import { Card } from "@material-ui/core";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { UserAuth, ConfirmUser } from "Client/store/Actions/ActionTypes";
import { UpdateState } from "Client/store/Utils/Update";
import Notification from "Client/views/UI/Alert/Alert";
import Loading from "Client/views/UI/Loader/Loader";
import "./Register.css";
import { Auth } from "aws-amplify";

const Register = (props) => {
  const [userdata, updateData] = useState({
    username: "",
    email: "",
    password: "",
    code: ""
  });
  const [ ui,setUi ] = useState({loading: false,alert: null,error: null});
  const [loading, update] = useState(true);
  const [confirmSignUp, setConfirmation] = useState(null);
  setTimeout(() => update(false), 3000);

  const register = (event) => {
    event.preventDefault();
    setUi({loading: true,alert: null,error: null});
    Auth.signUp({username: userdata.username,password: userdata.password,attributes: {email: userdata.email}})
    .then(res => {
        setUi({loading: false,alert: "Code Sent To Email For Verification",error: null});
        setConfirmation(true);
    })
    .catch(err => {
        setUi({loading: false,alert: null,error: err.message});
        console.log(err);
    })
  }; 

  const confirmRegister = (event) => {
    event.preventDefault();
    setUi({loading: true,alert: null,error: null});
    Auth.confirmSignUp(userdata.username,userdata.code)
    .then(res => {
        setUi({loading: false,alert: "Successfully Registered, Thank You...",error: null});
        props.history.push('/login')
    }).catch(err => {
        setUi({loading: false,alert: null,error: err.message});
        console.log(err);
    })
  }

  return (
    <div className="SignIn-Box">
      <Card className="SignIn">
        <section className="Header-Section">
          <span className="Heading">Regsiter Now</span>
        </section>
        {ui.error && (
          <Notification text={ui.error} color="danger" close />
        )}
        {ui.alert && (
            <Notification text={ui.alert} color="success" close />
          )}
        {loading && <Loading text="Initialising, Please Wait." />}
        {ui.loading && <Loading text="Registering please wait.." />}
        {(!ui.loading && !loading && confirmSignUp) &&  (
          <form onSubmit={(event) => confirmRegister(event)}>
            <div className="Input-Label">
              <label>Verification Code *</label>
              <br />
            </div>
            <input
              type="text"
              className="Input-Box"
              placeholder="Enter verification code"
              value={userdata.code}
              onChange={(event) =>
                UpdateState("code", updateData, event.target.value)
              }
            />
            <br />
            <button className="SignIn-Btn">Confirm</button>
          </form>
        )}
        { (!ui.loading && !loading && !confirmSignUp)  && 
            <form onSubmit={(event) => register(event)}>
            <div className="Input-Label">
              <label>User-name *</label>
              <br />
            </div>
            <input
              type="text"
              className="Input-Box"
              placeholder="Enter your user-name"
              value={userdata.username}
              onChange={(event) =>
                UpdateState("username", updateData, event.target.value)
              }
            />
            <br />
            <div className="Input-Label">
              <label>Email *</label>
              <br />
            </div>
            <input
              type="text"
              className="Input-Box"
              placeholder="Enter your user-name"
              value={userdata.email}
              onChange={(event) =>
                UpdateState("email", updateData, event.target.value)
              }
            />
            <br />
            <div className="Input-Label">
              <label>Password *</label>
              <br />
            </div>
            <input
              type="password"
              className="Input-Box"
              placeholder="Enter your password"
              value={userdata.password}
              onChange={(event) =>
                UpdateState("password", updateData, event.target.value)
              }
            />
            <br />
            <div className="Hint">
              <Link to="/admin/forgot-password" className="SignIn-Link-2">
                Forgot Password
              </Link>
              <Link to="/admin/change-password" className="SignIn-Link-3">
                Change Password
              </Link>
            </div>
            <button className="SignIn-Btn">Register</button>
          </form> }
      </Card>
      )
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthState: state.AuthState,
    loading: state.loading,
    error: state.error,
    user: state.confirmUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => dispatch(UserAuth(username, password)),
    confirmAccount: (user, password) => dispatch(ConfirmUser(user, password)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
); 
 