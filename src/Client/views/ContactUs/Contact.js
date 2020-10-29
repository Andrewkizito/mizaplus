/* eslint-disable */
import React, { useState } from "react";

//Importing helper functions
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "Client/components/Grid/GridContainer";
import GridItem from "Client/components/Grid/GridItem";
import Button from "Client/components/CustomButtons/Button";

import Axios from "axios";
import "animate.css/animate.min.css";

//Importing styles
import "./Contact.css";
import MizaplusHeader from "../UI/Header/Header";
import MizaplusFooter from "../UI/Footer/Footer";
import { Container } from "@material-ui/core";

const SectionContact = () => {
  const [feedback, update] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [ui, updateUi] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const send = () => {
    updateUi({ loading: true, error: null, success: null });
    Axios.post(
      "https://d7xq2u9le6.execute-api.us-east-2.amazonaws.com/Dev/send-email",
      { ...feedback }
    )
      .then((res) => {
        updateUi({ loading: false, success: res.data });
        update({ name: "", email: "", phone: "", message: "" });
      })
      .catch((err) => {
        updateUi({ loading: false, success: null, error: err.message });
      });
  };

  return (
    <>
      <MizaplusHeader />
      <div id="contact" className="contact-area">
        <Container maxWidth="lg">
          <div class="contact-inner area-padding">
            <div class="contact-overly"></div>
            <GridContainer>
              <GridItem sm={12} md={12}>
                <div class="section-headline text-center">
                  <h2>Contact us</h2>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem sm={12} md={12} lg={4}>
                <div className="contact-icon text-center">
                  <div className="single-icon">
                    <i className="fa fa-mobile"></i>
                    <p>
                      <a href="tel:+256772636767" style={{ color: "inherit" }}>
                        Mobile: +256772636767
                      </a>
                      <br />
                      <small>Monday-Friday (8am - 5pm)</small>
                      <br />
                      <small>Saturday 8am - 2pm</small>
                    </p>
                  </div>
                </div>
              </GridItem>
              <GridItem sm={12} md={12} lg={4}>
                <div className="contact-icon text-center">
                  <div className="single-icon">
                    <i className="fa fa-envelope"></i>
                    <p>
                      Email: sgt@sgttecnical.com
                      <br />
                    </p>
                  </div>
                </div>
              </GridItem>
              <GridItem sm={12} md={12} lg={4}>
                <div className="contact-icon text-center">
                  <div className="single-icon">
                    <i className="fa fa-map-marker"></i>
                    <p>
                      Maria House, <br />
                      14 Kataza Cl plot 13
                      <br />
                      <span>Bugoloobi</span>
                    </p>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem sm={12} md={6}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101408.21722940248!2d-122.15130702796334!3d37.41331444145766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d44a466baf9b!2sMountain%20View%2C%20CA%2C%20USA!5e0!3m2!1sen!2sug!4v1603892697705!5m2!1sen!2sug"
                  style={{
                    width: "100%",
                    height: "400px",
                    frameborder: "0",
                    border: "0",
                  }}
                  allowFullScreen=""
                  title="Area Map"
                ></iframe>
              </GridItem>
              <GridItem sm={12} md={6}>
                <div className="form contact-form">
                  <div id="sendmessage">
                    Your message has been sent. Thank you!
                  </div>
                  <div id="errormessage"></div>
                  <form
                    action=""
                    method="post"
                    role="form"
                    className="contactForm"
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        data-rule="minlen:4"
                        data-msg="Please enter at least 4 chars"
                      />
                      <div className="validation"></div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        data-rule="email"
                        data-msg="Please enter a valid email"
                      />
                      <div className="validation"></div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                        data-rule="minlen:4"
                        data-msg="Please enter at least 8 chars of subject"
                      />
                      <div className="validation"></div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        rows="5"
                        data-rule="required"
                        data-msg="Please write something for us"
                        placeholder="Message"
                      ></textarea>
                      <div className="validation"></div>
                    </div>
                    <div className="text-center">
                      <Button round color="facebook">
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Container>
      </div>
      <MizaplusFooter />
    </>
  );
};

export default SectionContact;
