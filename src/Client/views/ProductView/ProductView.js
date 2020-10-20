import React from 'react';

//Importing Helper functions
import { withRouter } from 'react-router-dom';

//Importing core components
import MizaplusHeader from '../UI/Header/Header';
import Product from './Product/Product';
import MizaplusFooter from '../UI/Footer/Footer';


const ProductView = (props) => {
    const { params } = props.match;

    console.log(params);
    return (
        <div>
           <MizaplusHeader/>
           <Product/>
           <MizaplusFooter/>
        </div>
    )
}

export default withRouter(ProductView);
