/* eslint-disable */
import React, { useState, useEffect } from "react";

import { Card } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { UserAuth, ConfirmUser } from "Client/store/Actions/ActionTypes";
import { UpdateState } from "Client/store/Utils/Update";
import Notification from "Client/views/UI/Alert/Alert";
import Loading from "Client/views/UI/Loader/Loader";
import "./LogIn.css";

const SignIn = (props) => {
  const [userdata, updateData] = useState({ username: "", password: "" });
  const [loading, update] = useState(true);
  const [confirmUser, setConfirmation] = useState(null);
  setTimeout(() => update(false), 3000);

  useEffect(() => {
    if (props.user) {
        setTimeout(() => {
          setConfirmation(props.user);
        }, 1000);
    } else if(props.AuthState) {
        props.history.push("/orders");
    }
  }, [props.user,props.AuthState]);

  const signIn = (event) => {
    event.preventDefault();
    props.onAuth(userdata.username, userdata.password);
  };

  const onConfirmAccount = (event) => {
    event.preventDefault();
    props.confirmAccount(confirmUser, userdata.password);
  };

  return (
    <div className="SignIn-Box">
      {!confirmUser ? (
        <Card className="SignIn">
          <section className="Header-Section">
            <span className="Heading">Log Into Your Account</span>
          </section>
          {props.error && (
            <Notification text={props.error} color="danger" close />
          )}
          {loading && <Loading text="Initialising Sign In Please Wait." />}
          {props.loading && (
            <Loading text="Checking credentials please wait.." />
          )}
          {!props.loading && !loading && (
            <form onSubmit={(event) => signIn(event)}>
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
                <Link to="/forgot-password" className="SignIn-Link-2">
                  Forgot Password
                </Link>
                <Link to="/change-password" className="SignIn-Link-3">
                  Change Password
                </Link>
              </div>
              <br/>
              <a href="/register" className="SignIn-Link">
                Have No Account, sign up here
              </a>
              <button className="SignIn-Btn">Sign In</button>
            </form>
          )}
        </Card>
      ) : (
        <Card className="SignIn">
          <section className="Header-Section">
            <span className="Heading">Confirm Account</span>
          </section>
          {props.error && (
            <Notification text={props.error} color="danger" close />
          )}
          {loading && <Loading text="Initialising Sign In Please Wait." />}
          {props.loading && <Loading text="Confirming Account Please Wait.." />}
          {!props.loading && !loading && (
            <form onSubmit={(event) => onConfirmAccount(event)}>
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
                <label>New Password *</label>
                <br />
              </div>
              <input
                type="password"
                className="Input-Box"
                placeholder="Enter New Password"
                value={userdata.password}
                onChange={(event) =>
                  UpdateState("password", updateData, event.target.value)
                }
              />
              <br />
              <button className="SignIn-Btn">Sign In</button>
            </form>
          )}
        </Card>
      )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
