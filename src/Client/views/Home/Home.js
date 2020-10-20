import React from 'react';

//Importing core components
import MizaplusHeader from '../UI/Header/Header';
import MizaplusFooter from '../UI/Footer/Footer';
import Showcase from './Showcase/Showcase';
import Products from './Products/Products';

const Home = () => {
    return (
        <div>
            <MizaplusHeader/>
            <Showcase/>
            <Products/>
            <MizaplusFooter/>
        </div>
    )
}

export default Home;
