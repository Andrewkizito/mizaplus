import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./sections/AddressForm";
import PaymentForm from "./sections/PaymentForm";
import Review from "./sections/Review";
import MizaplusFooter from "../UI/Footer/Footer";
import MizaplusHeader from "../UI/Header/Header";
import { UpdateState } from "Client/store/Utils/Update";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../UI/Loader/Loader";
import Axios from "axios";
import Notification from "Client/views/UI/Alert/Alert";
import { clearCart } from "Client/store/Actions/ActionTypes";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

const Checkout = ({cart,history,AuthState,clearCart,Owner}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [ ui,setUi ] = useState({loading: false,alert: null,error: null});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipcode: "",
    country: "",
    cardName: "",
    cardNumber: "",
    cvv: "",
  });

  useEffect(() => {
    if(activeStep === 3 && form.firstName !== "" && form.lastName !== "" && form.city !== "" && form.address !== "" &&
      form.country !== "" && form.zipcode !== "" && form.cardName !== "" && form.cardNumber !== "" && form.cvv !== "" && cart.length !== 0 ){
      setUi({loading: true,alert: null,error: null});
      let discount = 0;
      AuthState ? discount = 0.05 : discount = 0;
      Axios.post("https://z7uebszilc.execute-api.us-east-2.amazonaws.com/prod/orders",{...form,discount,Owner,cart})
      .then(res => {
        if(res.data.statusCode){
          setUi({loading: false,alert: res.data.data,error: null});
          clearCart();
          setTimeout(() => history.push("/orders"), 2000);
        } else {
          setUi({loading: false,alert: null,error: res.data.error});
        }
      }).catch(err => setUi({loading: false,alert: null,error: err.message}));
    }
  },[activeStep]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            firstName={form.firstName}
            lastName={form.lastName}
            address={form.address}
            city={form.city}
            zipcode={form.zipcode}
            country={form.country}
            changeText={(field, value) => UpdateState(field, setForm, value)}
          />
        );
      case 1:
        return (
          <PaymentForm
            cardName={form.cardName}
            cardNumber={form.cardNumber}
            cvv={form.cvv}
            changeText={(field, value) => UpdateState(field, setForm, value)}
          />
        );
      case 2:
        return (
          <Review
            country={form.country}
            address={form.address}
            city={form.city}
            zipcode={form.zipcode}
            cvv={form.cvv}
            cardName={form.cardName}
            cardNumber={form.cardNumber}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <MizaplusHeader />
      <div style={{ height: "100px" }}></div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? 
              (form.firstName !== "" && form.lastName !== "" && form.city !== "" && form.address !== "" &&
               form.country !== "" && form.zipcode !== "" && form.cardName !== "" && form.cardNumber !== "" && form.cvv !== "" ) ? 
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                { ui.loading && <Loader text="Placing Your Order, please wait..."/>}
                { ui.alert && 
                  <div style={{display: "flex",flexFlow: "row",alignItems: "center",justifyContent: "center",height: "130px"}}>
                    <Notification text={ui.alert} color="success"/>
                  </div> }
                { ui.error && 
                  <div style={{display: "flex",flexFlow: "row",alignItems: "center",justifyContent: "center",height: "130px"}}>
                    <Notification text={ui.error} color="success"/>
                  </div> }
              </React.Fragment> :
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Some Fields Are Missing ,Go Back
                </Typography>
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              </React.Fragment> : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
      <MizaplusFooter />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
    return {
        cart: state.Cart,
        AuthState: state.AuthState,
        Owner: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearCart: () => dispatch(clearCart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Checkout));
