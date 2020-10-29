/* eslint-disable */
import React, { useState } from "react";

import { Card } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import Loading from "Client/views/UI/Loader/Loader";

import { UpdateState } from "Client/store/Utils/Update";
import { Auth } from "aws-amplify";
import Notification from "Client/views/UI/Alert/Alert";
import Button from "Client/components/CustomButtons/Button";

import "../LogIn/LogIn.css";

const ChangePassword = (props) => {
  const [userdata, updateData] = useState({
    username: "",
    code: "",
    password: "",
    confirmPassword: ""
  });
  const [ui, update] = useState({ loading: false, success: null, error: null });

  const ChangePassword = () => {
    update({ loading: true, success: null, error: null });
    if(userdata.confirmPassword === userdata.password){
      Auth.forgotPasswordSubmit(
        userdata.username,
        userdata.code,
        userdata.password
      )
        .then(() => {
          update({ loading: false, success: `Password Changed Successfully` })
          setTimeout(() => props.history.push("/login"), 4000);
        })
        .catch((err) => update({ loading: false, error: err.message }));
    } else {
       update({ loading: false, error: "Passwords Not Matching",success: false })
    }
  };

  return (
    <div className="SignIn-Box">
      <Card className="SignIn">
        <h4>Forgot Password</h4>
        {ui.success && <Notification text={ui.success} color="success" />}
        {ui.error && <Notification text={ui.error} color="danger" />}
        {ui.loading && <Loading text="Initialising Reset Please Wait." />}
        {!ui.loading && (
          <div>
            <div className="Input-Label">
              <label>User-name *</label>
              <br />
            </div>
            <input
              type="text"
              className="Input-Box"
              placeholder="administrator username"
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
              placeholder="New password"
              value={userdata.password}
              onChange={(event) =>
                UpdateState("password", updateData, event.target.value)
              }
            />
            <br />
            <div className="Input-Label">
              <label>Confirm Password *</label>
              <br />
            </div>
            <input
              type="password"
              className="Input-Box"
              placeholder="Confirm new password"
              value={userdata.confirmPassword}
              onChange={(event) =>
                UpdateState("confirmPassword", updateData, event.target.value)
              }
            />
            <br />
            <div className="Input-Label">
              <label>Code *</label>
              <br />
            </div>
            <input
              type="text"
              className="Input-Box"
              placeholder="code"
              value={userdata.code}
              onChange={(event) =>
                UpdateState("code", updateData, event.target.value)
              }
            />
            <br />
            <Link to="/login" className="SignIn-Link-4">
              Cancel
            </Link>
            <Button
              color="facebook"
              size="sm"
              disabled={
                userdata.username === "" ||
                userdata.password === "" ||
                userdata.code === ""
              }
              onClick={ChangePassword}
            >
              Change Password
            </Button>
            <br />
          </div>
        )}
      </Card>
    </div>
  );
};

export default withRouter(ChangePassword);
