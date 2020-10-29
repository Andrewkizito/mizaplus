import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Success from "Client/components/Typography/Success";


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Review = ({AuthState,cart,address,city,zipcode,country,cardName,cardNumber}) => {
  const classes = useStyles();
  const [ totalPrice,setPrice ] = useState(0);
  const [ discount,setDiscount ] = useState(0);
  
  const addresses = [address,city,zipcode,country];
  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: cardName },
    { name: 'Card number', detail: cardNumber },
    { name: 'Expiry date', detail: '04/2024' },
  ];
  useEffect(() => {
    let total = 0;
    [...cart].forEach(cartItem => {
        total += cartItem.price * cartItem.quantity;
    });

    if(AuthState) {
      setDiscount(0.05);
    }
    setPrice(total.toFixed(2));
  },[cart,AuthState])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((cartItem) => (
          <ListItem className={classes.listItem} key={Math.random()}>
            <ListItemText primary={cartItem.name} secondary={cartItem.quantity > 1 ? cartItem.quantity + "" + "pieces" : cartItem.quantity + "" + "piece"} />
            <Success variant="body2"><small>€</small>{(cartItem.price * cartItem.quantity).toFixed(2)}</Success>
          </ListItem>
        ))}
        <>
        <hr/>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Success variant="subtitle1" className={classes.total}>
           <small>€</small>{totalPrice}
          </Success>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary={"After Discount" + `(${discount * 100}%)`} />
          <del><small>€{totalPrice}</small></del>
          <Success variant="subtitle1" className={classes.total}>
          <small>€</small>{(totalPrice - (totalPrice * discount)).toFixed(2)}
          </Success>
        </ListItem>
        </>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
    return {
        cart: state.Cart,
        AuthState: state.AuthState
    }
}

export default connect(mapStateToProps)(Review);