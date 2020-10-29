/* eslint-disable */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  progress: {
    margin: "4rem auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
  },
  loadingText: {
    margin: "0.7rem",
    color: "rgb(63, 81, 181)",
  },
}));

const Loader = ({ text }) => {
  const classes = useStyles();

  return (
    <div className={classes.progress}>
      <div className={classes.root}>
        <CircularProgress />
      </div>
      <p className={classes.loadingText}>{text}</p>
    </div>
  );
};

export default Loader;
