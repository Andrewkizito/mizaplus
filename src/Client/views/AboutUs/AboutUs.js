import React from 'react';

import "./AboutUs.css";
import { Container } from '@material-ui/core';
import GridContainer from 'Client/components/Grid/GridContainer';

import delivery from 'Client/assets/images/delivery.jpg';
import GridItem from 'Client/components/Grid/GridItem';
import MizaplusHeader from "../UI/Header/Header";
import MizaplusFooter from "../UI/Footer/Footer";
import { ContactSupportOutlined, DoneAll } from '@material-ui/icons';

const AboutUs = () => {
    return (
        <>
            <MizaplusHeader/>
            <div id="about" className="about-area area-padding">
                <Container maxWidth={"lg"}>
                    <GridContainer>
                        <GridItem sm={12} md={12}>
                            <div className="section-headline text-center">
                                <h2>About Mizaplus</h2>
                            </div>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem sm={12} md={6}>
                            <div className="well-left">
                                <div className="single-well">
                                    <a href="#">
                                        <img src={delivery} alt="" className="Image"/>
                                    </a>
                                </div>
                            </div>
                        </GridItem>
                        <GridItem sm={12} md={6}>
                            <div className="well-middle">
                                <div className="single-well">
                                    <a href="#">
                                        <h4 className="sec-head">We are glad you trust us.</h4>
                                    </a>
                                    <p>
                                    We have spent years at the fore-front of fast and affordable online shopping around the world.
                                    And we still continue to do our best to give you the value for your money. There are alot of 
                                    benefits when you get to work with us.
                                    </p>
                                    <ul>
                                        <li>
                                        <i className="fa fa-truck"></i> Fast Delivery
                                        </li>
                                        <li>
                                        <i className="fa fa-cart-plus"></i> High Quality Products
                                        </li>
                                        <li>
                                        <i className="fa fa-check"></i> Huge Discounts
                                        </li>
                                        <li>
                                        <i className="fa fa-truck"></i> Affordable Prices
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </GridItem>
                    </GridContainer>
                </Container>
            </div>
            <div id="services" className="services-area area-padding">
            <Container maxWidth={"xl"} style={{backgroundColor: "#fff",padding: "2rem auto"}}>
                <GridContainer>
                    <GridItem sm={12} md={12}>
                        <div className="section-headline services-head text-center">
                            <h2>Our Services</h2>
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem sm={12} md={4}>
                        <div className="about-move text-center">
                            <div className="services-details">
                                <div className="single-services">
                                    <a className="services-icon" href="#">
                                        <i className="fa fa-truck"></i>
                                    </a>
                                    <h4>Fast Delivery</h4>
                                    <p>All purchases are delivered safely as fast as possible. 
                                       Be sure to get your purchases in one piece since we have 
                                       a very wide team of experts to get the work done.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </GridItem>
                    <GridItem sm={12} md={4}>
                        <div className="about-move text-center">
                            <div className="services-details">
                                <div className="single-services">
                                    <a className="services-icon" href="#">
                                        <DoneAll/>
                                    </a>
                                    <h4>Refund Policy</h4>
                                    <p>We rarely encounter issues of supplying faulty equipment to our clients 
                                       but all incase that happens, we don't push you out. We try to settle the 
                                       issues with a refund.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </GridItem>
                    <GridItem sm={12} md={4}>
                        <div className="about-move text-center">
                            <div className="services-details">
                                <div className="single-services">
                                    <a className="services-icon" href="#">
                                        <ContactSupportOutlined/>
                                    </a>
                                    <h4>Technical Support</h4>
                                    <p> We offer full technical support on all our products since most of our clients 
                                        prefer to worry less about the technical side of things. Be sure to contact us 
                                        as soon as possible.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </GridItem>
                </GridContainer>
            </Container>
            </div>
            <MizaplusFooter/>
        </>
    )
}

export default AboutUs;
