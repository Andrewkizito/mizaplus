import React from 'react';

//Importing Helper functions
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';

//Importing core components
import { Typography,Container } from '@material-ui/core';
import GridContainer from 'Client/components/Grid/GridContainer';

//Importing styles
import styles from './styles';
import Product from './Product/Product';


const useStyles = makeStyles(styles);

const Products = ({Products}) => {
    const classes = useStyles();

    return (
        <div className={classes.Products}>
          <Typography variant={"h5"}>Explore Our Items</Typography>
          <Container maxWidth="lg">
            <GridContainer>
                { Products && Products.map(product => 
                <Product id={product.id} key={product.id} name={product.name} price={product.price} vendor={product.vendor}
                description={product.description} image={product.image} pdtClass={classes.Product} rating={product.rating}/>) }
            </GridContainer>
          </Container>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        Products: state.Products
    }
}

export default connect(mapStateToProps)(Products);
