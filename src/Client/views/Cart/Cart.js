/*eslint-disable*/
import React,{ useEffect,useState } from "react";

// Importing Helper Functions
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux"; 
import { remove_from_cart,decrease_quantity,increase_quantity } from "Client/store/Actions/ActionTypes";

// Importing Core Components
import Tooltip from "@material-ui/core/Tooltip";
import Table from "Client/components/Table/Table.js";
import Button from "Client/components/CustomButtons/Button.js";
import Card from "Client/components/Card/Card.js";
import CardBody from "Client/components/Card/CardBody.js";
import GridItem from "Client/components/Grid/GridItem";
import GridContainer from "Client/components/Grid/GridContainer";
import { FormControl,Select,MenuItem,TextField } from "@material-ui/core";
import Muted from "Client/components/Typography/Muted";
import Paginations from "Client/components/Pagination/Pagination";
import ScrollAnimation from "react-animate-on-scroll";
import Success from "Client/components/Typography/Success";

// @material-ui/icons
import { Close,Add,Remove,KeyboardArrowRight } from "@material-ui/icons";

import shoppingCartStyle from "../../assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

import MizaplusHeader from "../UI/Header/Header.js";
import MizaplusFooter from "../UI/Footer/Footer.js";

//Importing Credit Cards
import credit1 from "Client/assets/images/credit.png";
import credit2 from "Client/assets/images/credit1.png";
import credit3 from "Client/assets/images/credit2.png";

import './Cart.css';
import { Link } from "react-router-dom";

const useStyles = makeStyles(shoppingCartStyle);

const Cart = ({MyCart,RemoveItem,QuantityIncrease,QuantityDecrease}) => {
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
      }
  },[MyCart]);

  return (
      <div>
        <MizaplusHeader/>
        <div style={{paddingTop: "90px"}} className={classNames(classes.main)}>
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
                                        <Link to="/checkout">
                                            <Button color="warning" round>
                                            Complete Purchase <KeyboardArrowRight />
                                            </Button>
                                        </Link>
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
        MyCart: state.Cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        RemoveItem: (product) => dispatch(remove_from_cart(product)),
        QuantityIncrease: (id) => dispatch(increase_quantity(id)),
        QuantityDecrease: (id) => dispatch(decrease_quantity(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);