import { useReducer, createContext } from "react";


export const CartContext = createContext();

const initialState = null;

const reducer = (state, action) => {
    switch(action.type) {
        case "receive-cart-info-from-server": {
            console.log("in reducer: ", action)
            return [...action.data]
        }
        case "add-item": {
            return [
                ...state,
                action.item,
            ]
        } case "remove-item": {
            return state = state.filter(item => item !== action.item)
        } case "change-quantity": {
            console.log("state in change-quantity: ", state)
            return state.map((item, ind) => {
                if(item._id === action.itemId) {
                    state[ind].numToBuy = Number(action.event.target.value);
                }
                return item;
            });
        } case "add-quantity": {
            console.log("state in add-quantity: ", state)
            return state.map((item, ind) => {
                if(item._id === action.itemId && state[ind].numToBuy > 1) {
                    state[ind].numToBuy ++;
                }
                return item;
            });
        } case "subtract-quantity": {
            console.log("state in subtract-quantity: ", state)
            return state.map((item, ind) => {
                if(item._id === action.itemId && state[ind].numToBuy > 1) {
                    state[ind].numToBuy --;
                }
                return state
            });
        } default: {
            throw new Error("unrecognized action: " + action.type);
        }
    }

}
export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const receiveCartInfoFromServer = (data) => {
        
        dispatch({type: "receive-cart-info-from-server", data});
    }
    const addItem = (data) => {
        dispatch({type: "add-item", ...data})
    }
    const removeItem = (data) => {
        dispatch({type: "remove-item"})
    }
    const changeQuantity = (event, itemId) => {
        dispatch({type: "change-quantity", event, itemId})
    }
    const addQuantity = (itemId) => {
        dispatch({type: "add-quantity", itemId})
    }
    const subtractQuantity = (itemId) => {
        dispatch({type: "subtract-quantity", itemId})
    }

    return (
        <CartContext.Provider value={
            {state, 
            actions: {
                receiveCartInfoFromServer,
                addItem, 
                removeItem,
                changeQuantity,
                addQuantity,
                subtractQuantity
            }}}>
            {children}
        </CartContext.Provider>
    )
}