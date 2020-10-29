/* eslint-disable */
import React, { useState } from "react";

import { Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import Loading from "Client/views/UI/Loader/Loader";

import { UpdateState } from "Client/store/Utils/Update";
import { Auth } from "aws-amplify";
import Notification from "Client/views/UI/Alert/Alert";
import Button from "Client/components/CustomButtons/Button";

import "../LogIn/LogIn.css";

const ResetPassword = (props) => {
  const [userdata, updateData] = useState({ username: "" });
  const [ui, update] = useState({ loading: false, success: null, error: null });

  const getCode = () => {
    update({ loading: true, alert: null, error: null });
    Auth.forgotPassword(userdata.username)
      .then(() => {
        update({ loading: false, success: `Reset Code Sent To email` });
        setTimeout(() => {
          props.history.push("/reset-password");
        }, 4000);
      })
      .catch((err) => update({ loading: false, error: err.message }));
  };
  return (
    <div className="SignIn-Box">
      <Card className="SignIn">
        <h4>Reset Your Password</h4>
        {ui.success && <Notification text={ui.success} color="success" />}
        {ui.error && <Notification text={ui.error} color="danger" />}
        {ui.loading && <Loading text="Initialising Reset Please Wait." />}
        {!ui.loading && (
          <div>
            <div className="Input-Label">
              <label>User-name *</label>
            </div>
            <input
              type="text"
              className="Input-Box"
              placeholder="Enter Your Username"
              value={userdata.username}
              onChange={(event) =>
                UpdateState("username", updateData, event.target.value)
              }
            />
            <br />
            <Link to="/login" className="SignIn-Link-4">
              Cancel
            </Link>
            <Button
              color="success"
              size="sm"
              disabled={userdata.username === ""}
              onClick={getCode}
            >
              Get Code
            </Button>
            <br />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;
