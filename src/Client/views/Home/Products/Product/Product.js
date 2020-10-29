import React from 'react';

//Importing helper functions
import classNames from "classnames";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

//Importing core components
import Button from 'Client/components/CustomButtons/Button';
import Card from 'Client/components/Card/Card';
import CardBody from 'Client/components/Card/CardBody';
import CardFooter from 'Client/components/Card/CardFooter';
import GridItem from 'Client/components/Grid/GridItem';
import Typography from 'Client/components/Typography/Info';
import ReactStars from 'react-rating-stars-component';

//importing styles
import styles from 'Client/assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(styles);

const Product = ({id,name,vendor,price,rating,image,pdtClass}) => {
    const classes = useStyles();
    return (
        <GridItem sm={12} md={6} lg={4}>
          <Card product plain>
            <img src={image} className={pdtClass} alt="..." />
            <CardBody plain className={classes.Body}>
              <h4 className={classNames(classes.cardTitle,classes.textCenter)}>{name}</h4>
              <Typography variant="h6">{vendor}</Typography>
              <ReactStars count={5} value={rating} edit={false} size={20}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}/>
            </CardBody>
            <CardFooter plain>
              <div className={classes.priceContainer}>
                <span className={classNames(classes.price, classes.priceNew)}>
                  {" "}
                  <small>€</small>{price}
                </span>
              </div>
              <div className={classNames(classes.stats, classes.mlAuto)}>
                <Link to={{
                  pathname: `product/${id}`,
                  state: {
                    id: id
                  }
                }}>
                  <Button color="warning" size="sm" onClick={() => window.scrollTo({top: 0})} round>View Details</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>                               
    )
}

Product.propTypes = {
  name: PropTypes.string,
  vendor: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  pdtClass: PropTypes.string
}

export default Product;