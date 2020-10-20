import React from 'react';

//Importing helper functions
import { makeStyles } from "@material-ui/core";

//Importing core components
import Slider from "react-slick";

import slide1 from "Client/assets/images/slider-1.jpg"
import slide2 from "Client/assets/images/slider-2.jpg"
import slide3 from "Client/assets/images/slider-3.jpg"
import slide4 from "Client/assets/images/1.jpg"
import slide5 from "Client/assets/images/2.jpg"

//importing styles
import styles from './styles';
import GridContainer from 'Client/components/Grid/GridContainer';
import GridItem from 'Client/components/Grid/GridItem';

const useStyles = makeStyles(styles);

const Showcase = () => {
    const classes = useStyles();
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplaySpeed: 4000,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    
    const sliderImages = [
      {url: slide1},
      {url: slide2},
      {url: slide3},
      {url: slide4},
      {url: slide5}
    ];

    const sliderItems = sliderImages.map((image) =>
        <div key={Math.random()} className={classes.SliderImage}>
          <img src={image.url} alt="slide..."/>
        </div>
    );

    return (
        <GridContainer className={classes.Showcase}>
          <GridItem sm={8} md={8}>
            <Slider {...settings}>
              { sliderItems }
            </Slider>
          </GridItem>
        </GridContainer>
    )
}

export default Showcase;
