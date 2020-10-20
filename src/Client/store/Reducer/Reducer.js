//Importing Actions
import * as actions from '../Actions/Actions';

//Importing images
import product1 from 'Client/assets/images/product1.png';
import product2 from 'Client/assets/images/product2.png';
import product3 from 'Client/assets/images/product3.png';
import product4 from 'Client/assets/images/product4.jpg';
import product5 from 'Client/assets/images/product5.jpg';
import product6 from 'Client/assets/images/product6.jpg';
import product7 from 'Client/assets/images/product7.jpg';
import product8 from 'Client/assets/images/product8.jpg';
import product9 from 'Client/assets/images/product9.jpg';

class Product {
    constructor(id,name,vendor,price,image,inStock,rating){
        this.id = id;
        this.name = name;
        this.vendor = vendor;
        this.price = price;
        this.image = image;
        this.inStock = inStock;
        this.rating = rating;
        this.description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero necessitatibus consectetur suscipit quis sunt, repellendus illo, voluptatum, nesciunt id quos a dolores esse soluta laboriosam quia non blanditiis doloremque dolor corrupti commodi sed deleniti. Corrupti quam beatae odio non aut.'
    }
}

export const initialState = {
    Products: [
        new Product(`product-42567834`,"HikVision DTS356S","HikVision",120.85,product1,8,4.5),
        new Product(`product-09984847`,"Bosch TSD776","Bosch",122.22,product2,7,4.5),
        new Product(`product-37276474`,"HikVision TS56793","HikVision",125.65,product3,8,4.5),
        new Product(`product-84636454`,"Echo Spot","Amazon",180.66,product4,10,5),
        new Product(`product-93746735`,"Echo Show 5","Amazon",160.99,product5,7,5),
        new Product(`product-02635464`,"Smart Speaker","Amazon",166.33,product6,8,5),
        new Product(`product-32536637`,"Echo Show","Amazon",179.23,product7,8,5),
        new Product(`product-94765764`,"Echo Connect","Amazon",196.35,product8,8,5),
        new Product(`product-83874647`,"Echo connect v2","Amazon",186.75,product9,8,5)
    ],
    Cart: [],
    Notifications: null
}

const addToCart = (Cart,Product) => {
    const product = Product;
    const cart =  [...Cart];
    console.log('Filtering')
    const filtered = cart.filter(pdt => pdt.id === product.id);
    if(filtered[0]){
        cart.forEach((pdt,index) => {
            if(pdt.id === product.id){
                cart[index] = {...product,quantity: pdt.quantity + product.quantity};
            }
        })
        return cart;
    } else {
        console.log("Adding new product");
        return [...cart,product]
    }
}

const reduceStock = (Products,Product) => {
    const products = [...Products];
    const product = Product;
    products.forEach((pdt,index) => {
        if(pdt.id === product.id){
            products[index] = {...pdt,inStock: pdt.inStock - product.quantity}
        }
    });
    return products;
}

const increaseStock = (Products,Product) => {
    const products = [...Products];
    const product = Product;
    products.forEach((pdt,index) => {
        if(pdt.id === product.id){
            products[index] = {...pdt,inStock: pdt.inStock + product.quantity}
        }
    });
    return products;
}

const removeItem = (Cart,Product) => {
    const cart = [...Cart];
    const product = Product;
    const newCart = cart.filter(cartItem => cartItem.id !== product.id)
    return newCart;
}

const increaseQuantity = (Cart,Products,Id) => {
    const cart = [...Cart];
    const products = [...Products];
    const id = Id;
    cart.forEach((cartItem,i) => {
        if(cartItem.id === id){
            products.forEach((pdt,index) => {
                if(pdt.id === id){
                    if(pdt.inStock !== 0){
                        cart[i] = {...cartItem,quantity: cartItem.quantity + 1}
                        products[index] = {...pdt,inStock: pdt.inStock - 1}
                    }
                }
            })
        }
    });
    return {cart: cart,products: products};
}

const decreaseQuantity = (Cart,Products,Id) => {
    const cart = [...Cart];
    const products = [...Products];
    const id = Id;
    cart.forEach((cartItem,i) => {
        if(cartItem.id === id){
            products.forEach((pdt,index) => {
                if(pdt.id === id){
                    if(cartItem.quantity > 1){
                        cart[i] = {...cartItem,quantity: cartItem.quantity - 1}
                        products[index] = {...pdt,inStock: pdt.inStock + 1}
                    }
                }
            })
        }
    });
    return {cart: cart,products: products};
}


const reducer = (state = initialState,action) => {
    switch (action.type) {
        case actions.NOTIFICATION_ADDED:
            return {
                ...state,
                Notifications: state.notifications ? [action.notification] : [action.notification]
            }
        case actions.ADD_TO_CART:
            return {
                ...state,
                Products: reduceStock(state.Products,action.product),
                Cart: state.Cart.length > 0 ? addToCart(state.Cart,action.product) : [action.product]
            }
        case actions.REMOVE_FROM_CART:
            return {
                ...state,
                Products: increaseStock(state.Products,action.product),
                Cart: removeItem(state.Cart,action.product)
            }
        case actions.INCREASE_QUANTITY:
            const increase = increaseQuantity(state.Cart,state.Products,action.id);
            return {
                ...state,
                Products: increase.products,
                Cart: increase.cart
            }
        case actions.DECREASE_QUANTITY:
            const decrease = decreaseQuantity(state.Cart,state.Products,action.id);
            console.log(decrease);
            return {
                ...state,
                Products: decrease.products,
                Cart: decrease.cart
            }
        default:
           return state;
    }
}

export default reducer;