import { useReducer, createContext } from "react";


export const CartContext = createContext();

const initialState = null;

const reducer = (state, action) => {
    // console.log("CartAction: ", action);
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
            state.forEach((item, ind) => {
                if(item._id === action.item._id) {
                    state[ind].numToBuy = action.item.numToBuy;
                }
            });
            return state
        } case "add-quantity": {
            state.forEach((item, ind) => {
                if(item._id === action.item._id) {
                    state[ind].numToBuy = action.item.numToBuy;
                }
            });
            return state
        } case "subtract-quantity": {
            console.log("state1: ", state);
            state.forEach((item, ind) => {
                if(item._id === action.itemId && state[ind].numToBuy > 1) {
                    state[ind].numToBuy --;
                }
            });
            console.log("state2: ", state);
            return state
        }default: {
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
    const changeQuantity = (data) => {
        dispatch({type: "change-quantity", data})
    }
    const addQuantity = (data) => {
        dispatch({type: "add-quantity", data})
    }
    const subtractQuantity = (itemId) => {
        console.log("in dispatch: ", itemId, typeof itemId);
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