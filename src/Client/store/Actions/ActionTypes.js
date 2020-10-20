import * as actions from './Actions';

class Notification {
    constructor(id,type,title,message){
        this.id = id;
        this.type = type;
        this.title = title;
        this.message = message;
    }
}

const add_Notification = (notification) => {
    return {
        type: actions.NOTIFICATION_ADDED,
        notification: notification
    }
}

const add_to_cart = (product) => {
    return {
        type: actions.ADD_TO_CART,
        product: product
    }
}

export const increase_quantity = (id) => {
    return {
        type: actions.INCREASE_QUANTITY,
        id: id
    }
}

export const decrease_quantity = (id) => {
    return {
        type: actions.DECREASE_QUANTITY,
        id: id
    }
}

export const remove_from_cart = (product) => {
    return {
        type: actions.REMOVE_FROM_CART,
        product: product
    }
}

export const existenceCheck = (product) => {
    return dispatch => {
        const cartItem = product;
        dispatch(add_to_cart(cartItem));
        dispatch(add_Notification(new Notification(Math.random() + "","success","ADDED TO CART",`Product Added: ${product.name} ,Quantity Added: ${product.quantity}`)))
    }
}