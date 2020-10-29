/* eslint-disable */
import React from "react";

import SnackbarContent from "../../../components/Snackbar/SnackbarContent.js";
import { Done, Warning } from "@material-ui/icons";
import ScrollAnimation from "react-animate-on-scroll";

import "animate.css";

const Alert = ({ color, text }) => {
  return (
    <ScrollAnimation animateIn="animate__zoomIn" duration={1}>
        <div>
            {color === "success" && (
                <SnackbarContent
                message={<span>{text}</span>}
                close
                color="success"
                icon={Done}
                />
            )}
            {color === "danger" && (
                <SnackbarContent
                message={<span>{text}</span>}
                close
                color="danger"
                icon={Warning}
                />
            )}
            {color === "notification" && (
                <SnackbarContent message={<span>{text}</span>} close />
            )}
        </div>
    </ScrollAnimation>
  );
};

export default Alert;
