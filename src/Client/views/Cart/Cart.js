/*eslint-disable*/
import React,{ useEffect,useState } from "react";

// Importing Helper Functions
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux"; 
import { remove_from_cart,decrease_quantity,increase_quantity } from "Client/store/Actions/ActionTypes";
import { Link, withRouter } from "react-router-dom";

// Importing Core Components
import Tooltip from "@material-ui/core/Tooltip";
import Table from "Client/components/Table/Table.js";
import Button from "Client/components/CustomButtons/Button.js";
import Card from "Client/components/Card/Card.js";
import CardBody from "Client/components/Card/CardBody.js";
import Muted from "Client/components/Typography/Muted";
import ScrollAnimation from "react-animate-on-scroll";

// @material-ui/icons
import { Close,Add,Remove,KeyboardArrowRight } from "@material-ui/icons";

import shoppingCartStyle from "../../assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

import MizaplusHeader from "../UI/Header/Header.js";
import MizaplusFooter from "../UI/Footer/Footer.js";

import './Cart.css';

const useStyles = makeStyles(shoppingCartStyle);

const Cart = ({MyCart,RemoveItem,QuantityIncrease,QuantityDecrease,history,AuthState}) => {
  const [ cartItems,setCartItems ] = useState(null);
  const [ totalPrice,setPrice ] = useState(null);

  const classes = useStyles();

  useEffect(() => {
      if(MyCart && MyCart.length > 0){
        const cartMarkUp = [...MyCart].map(cartItem => {
            return [
               <div className={classes.imgContainer} key={1}>
                   <img src={cartItem.image} alt="..." className={classes.img} />
               </div>,
               <span key={1}>
                   <a href="#jacket" className={classes.tdNameAnchor}>
                       {cartItem.name}
                   </a>
                   <br />
                   <small className={classes.tdNameSmall}>
                       by {cartItem.vendor}
                   </small>
               </span>,
               <span key={1}>
                   <small className={classes.tdNumberSmall}>€</small> {cartItem.price.toFixed(2)}
               </span>,
               <span key={1}>
                   {cartItem.quantity}
                   <div className={classes.buttonGroup}>
                        <Button color="info" size="sm" round className={classes.firstButton}
                          onClick={() => QuantityDecrease(cartItem.id)}>
                          <Remove />
                        </Button>
                        <Button color="info" size="sm" round className={classes.lastButton}
                          onClick={() => QuantityIncrease(cartItem.id)}>
                          <Add />
                        </Button>
                      </div>
               </span>,
               <span key={1}>
                   <small className={classes.tdNumberSmall}>€</small> {(cartItem.price * cartItem.quantity).toFixed(2)} 
               </span>,
               <Tooltip
                      key={1}
                      id="close3"
                      title="Remove item"
                      placement="left"
                      classes={{ tooltip: classes.tooltip }}>
                      <Button link className={classes.actionButton} onClick={() => RemoveItem(cartItem)}>
                        <Close />
                      </Button>
                </Tooltip>
                ]
          });
        let total = 0;
        [...MyCart].forEach(cartItem => {
            total += cartItem.price * cartItem.quantity;
        });
        setPrice(total.toFixed(2));
        setCartItems(cartMarkUp);
      } else if(MyCart && MyCart.length === 0) {
          setTimeout(() => history.push("/"), 1000);
      }
  },[MyCart]);

  return (
      <div>
        <MizaplusHeader/>
        <div style={{paddingTop: "90px",minHeight: "600px"}} className={classNames(classes.main)}>
            <div className={classes.container}>
                <h3 className={classes.cardTitle}>Shopping Cart</h3>
                <Card plain>
                    <CardBody plain>
                    { (cartItems && cartItems.length > 0) &&
                        <ScrollAnimation animateIn="animate__fadeIn" duration={3}>
                            <Table
                                tableHead={[
                                "",
                                "PRODUCT",
                                "PRICE",
                                "QUANTITY",
                                "AMOUNT",
                                ""
                                ]}
                                tableData={[
                                ...cartItems,
                                {
                                    purchase: true,
                                    colspan: "3",
                                    amount: (
                                    <span>
                                        <small>€</small>{totalPrice}
                                    </span>
                                    ),
                                    col: {
                                    colspan: 3,
                                    text: (
                                        
                                            <Button color="warning" href="/checkout" round disabled={AuthState ? false : true}>
                                            Complete Purchase <KeyboardArrowRight />
                                            </Button>
                                    )
                                    }
                                }
                                ]}
                                tableShopping
                                customHeadCellClasses={[
                                classes.textCenter,
                                classes.description,
                                classes.description,
                                classes.textRight,
                                classes.textRight,
                                classes.textRight
                                ]}
                                customHeadClassesForCells={[0, 2, 3, 4, 5]}
                                customCellClasses={[
                                classes.tdName,
                                classes.customFont,
                                classes.customFont,
                                classes.tdNumber,
                                classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                                classes.tdNumber + " " + classes.textCenter
                                ]}
                                customClassesForCells={[1, 2, 3, 4, 5]}
                            />
                        </ScrollAnimation>}
                    { (!cartItems || cartItems.length === 0) &&
                    <div className={classes.EmptyCart}>
                        <Muted variant="h3">No Products Available In Cart.</Muted>
                    </div> }
                    </CardBody>
                </Card>
            </div>
        </div>
        <MizaplusFooter/>
      </div>
  );
}

const mapStateToProps = state => {
    return {
        MyCart: state.Cart,
        AuthState: state.AuthState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        RemoveItem: (product) => dispatch(remove_from_cart(product)),
        QuantityIncrease: (id) => dispatch(increase_quantity(id)),
        QuantityDecrease: (id) => dispatch(decrease_quantity(id))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Cart));