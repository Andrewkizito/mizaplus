import * as actions from './Actions';
import { Auth } from "aws-amplify";

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

export const setCartItems = (cart) => {
    return {
        type: actions.SET_CART_ITEMS,
        cart: cart
    }
}

export const existenceCheck = (product) => {
    return dispatch => {
        const cartItem = product;
        dispatch(add_to_cart(cartItem));
        dispatch(add_Notification(new Notification(Math.random() + "","success","ADDED TO CART",`Product Added: ${product.name} ,Quantity Added: ${product.quantity}`)))
    }
}

export const setCartFromLocalStorage = () => {
    return dispatch => {
        const savedCart = JSON.parse(localStorage.getItem("cart-Items"));
        if(savedCart){
          dispatch(setCartItems(savedCart));
        } else {
          dispatch(setCartItems([]));
        }
    }
}

export const clearCart = () => {
    localStorage.removeItem("cart-Items");
    return {
      type: actions.CLEAR_CART
    }
}
//Authentication
const setUser = (user) => {
    return {
      type: actions.SET_USER,
      user,
    };
  };
  
  const MoveToConfirmation = (user) => {
    return {
      type: actions.MOVE_TO_CONFIRMATION,
      user
    };
  };
  
  const AuthStart = () => {
    return {
      type: actions.AUTH_START,
    };
  };
  
  const AuthSuccess = (user) => {
    return {
      type: actions.AUTH_SUCCESS,
      user,
    };
  };
  
  const AuthFailure = (error) => {
    return {
      type: actions.AUTH_FAILURE,
      error,
    };
  };
  
  const AuthSignOut = () => {
    return {
      type: actions.AUTH_SIGNOUT,
    };
  };
  
  export const ConfirmUser = (user, new_password) => {
    return (dispatch) => {
      AuthStart();
      Auth.completeNewPassword(user, new_password)
        .then((res) => {
          dispatch(AuthSuccess(user.username));
          setUser(null);
        })
        .catch((err) => dispatch(AuthFailure(err.message)));
    };
  };
  
  export const UserAuth = (username, password) => {
    return (dispatch) => {
      dispatch(AuthStart());
      Auth.signIn({ username: username, password: password })
        .then((user) => {
          console.log(user);
          if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            dispatch(MoveToConfirmation(user));
          } else {
            dispatch(AuthSuccess(user.username));
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(AuthFailure(err.message));
        });
    };
  };
  
  export const AutoAuth = () => {
    return (dispatch) => {
      Auth.currentAuthenticatedUser()
        .then(user => {
          dispatch(AuthSuccess(user.username));
        })
        .catch((err) => dispatch(AuthFailure(null)));
    };
  };
  
  export const SignOut = () => {
    return (dispatch) => {
      Auth.signOut().then(() => {
        dispatch(AuthSignOut());
      });
    };
  };