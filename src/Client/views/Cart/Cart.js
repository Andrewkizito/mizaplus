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
import { FormControl,Select,MenuItem,TextField,ListItem } from "@material-ui/core";
import Muted from "Client/components/Typography/Muted";
import Paginations from "Client/components/Pagination/Pagination";
import ScrollAnimation from "react-animate-on-scroll";

// @material-ui/icons
import { Close,Add,Remove,KeyboardArrowRight } from "@material-ui/icons";

import shoppingCartStyle from "../../assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

import MizaplusHeader from "../UI/Header/Header.js";
import MizaplusFooter from "../UI/Footer/Footer.js";

//Importing Credit Cards
import credit1 from "Client/assets/images/credit.png";
import credit2 from "Client/assets/images/credit1.png";
import credit3 from "Client/assets/images/credit2.png";

const useStyles = makeStyles(shoppingCartStyle);

const Cart = ({MyCart,RemoveItem,QuantityIncrease,QuantityDecrease}) => {
  const [ cartItems,setCartItems ] = useState(null);
  const [ totalPrice,setPrice ] = useState(null);
  const [ navCount,setCount ] = useState(1);

  const [ cardSelect,selectCard ] = useState("PayPal");

  const classes = useStyles();

  const cards = [{name: "American Express",image: credit1},{name: "Capital One",image: credit2},{name: "PayPal",image: credit3}];

  useEffect(() => {
      if(MyCart.length > 0){
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
                { (cartItems && cartItems.length > 0) && 
                  <Paginations
                    color="info"
                    pages={[
                        { text: 'PREV',onClick: () => setCount(navCount - 1),disabled: navCount === 1 ? true : false},
                        { text: '1',onClick: () => setCount(1),active: navCount === 1 ? true: false},
                        { text: '2',onClick: () => setCount(2),active: navCount === 2 ? true: false},
                        { text: 'NEXT',onClick: () => setCount(navCount + 1),disabled: navCount === 2 ? true : false}
                    ] 
                    }
                 />}
                <h3 className={classes.cardTitle}>{navCount === 1 ? "Shopping Cart" : "CheckOut"}</h3>
                <Card plain>
                    <CardBody plain>
                    { (cartItems && cartItems.length > 0 && navCount === 1) &&
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
                                        <Button color="warning" round onClick={() => setCount(2)}>
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
                    { navCount === 2 &&
                        <GridContainer>
                            <GridItem sm={12} md={6} lg={6}>
                                <h4 className={classes.orderSummaryTitle}>Order Summary</h4>
                                <table>
                                   <thead>
                                     <td></td>
                                   </thead>
                                </table>
                            </GridItem>
                            <GridItem sm={12} md={6} lg={6}>
                                <GridContainer>
                                <GridItem sm={12} md={10} lg={10}>
                                    <FormControl className={classes.selectFormControl} fullWidth>
                                        <TextField label="Your Name" variant="outlined" margin="dense" fullWidth/>
                                        <TextField label="Phone Number" variant="outlined" margin="dense" fullWidth/>
                                        <TextField label="City" variant="outlined" margin="dense" fullWidth/>
                                        <TextField label="Email" variant="outlined" margin="dense" style={{marginRight: "0.2rem"}} fullWidth/>
                                        <Select variant="outlined" margin="dense" style={{padding: "0.4rem",fontSize: "30px"}} 
                                            MenuProps={{className: classes.selectMenu}} classes={{ select: classes.select }} 
                                            defaultValue={"PayPal"} value={cardSelect} onChange={event => selectCard(event.target.value)}
                                            inputProps={{name: "amountSelect",id: "amount-select"}}>
                                           { cards.map(card => 
                                                <MenuItem classes={{root: classes.selectMenuItem,selected: classes.selectMenuItemSelected}}value={card.name}>
                                                    <img src={card.image} alt="..." style={{height: "25px"}}/>
                                                </MenuItem>
                                            ) }
                                        </Select>
                                        <TextField label="Credit Card" variant="outlined" margin="dense" style={{marginRight: "0.2rem"}} fullWidth/>
                                        <Button color="success" fullwidth>Place Order</Button>
                                    </FormControl>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer> }
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