/* eslint-disable */
import React from "react";

//Importing core components
import { Card } from "@material-ui/core";
import Button from "Client/components/CustomButtons/Button";

//Importing images
import gift from "Client/assets/images/gift-removebg-preview.png";

import "./Backdrop.css";
import GridContainer from "Client/components/Grid/GridContainer";
import GridItem from "Client/components/Grid/GridItem";

const Backdrop = (props) => {
  return (
    <>
      {props.show && (
        <div>
          <div
            className="Backdrop"
            onClick={() => props.setShow(false)}
          ></div>
          <Card className="GiftCard">
            <u><p>Order {props.order.id}</p></u>
            <GridContainer>
              <GridItem sm={12} md={6}>
                <ul>
                  <li>Total Cost: <span>€{props.order.totalCost}</span></li>
                  <li>Address: <span>{props.order.address}, {props.order.city}, {props.order.country}</span></li>
                  <li>Total Items: <span>{props.order.cart.length}</span></li>
                  <li>Time Placed: <span>{props.order.timeCreated}</span></li>
                  <li>Placed On: <span>{props.order.date}</span></li>
                  <li>Purchase Names: <span>{props.order.firstName} {props.order.lastName}</span></li>
                  <li>Credit Card Name: <span>€{props.order.cardName}</span></li>
                  <li>Credit Card Number: <span>{props.order.cardNumber}</span></li>
                </ul>
              </GridItem>
              <GridItem sm={12} md={6}>
                  <u><p style={{margin: "0"}}>Cart Items</p></u>
                  <ul>
                    { props.order.cart.map(item => {
                     return <li>{item.name}: <span>{item.quantity}-{ item.quantity > 1 ? "pieces" : "piece"} for €{item.price * item.quantity}</span></li>
                    }) }
                  </ul>
              </GridItem>
            </GridContainer>
            <Button onClick={() => props.setShow(false)} color="danger" size="sm" round>Close</Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default Backdrop;
