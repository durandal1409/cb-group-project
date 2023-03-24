import { useReducer, createContext } from "react";


export const CartContext = createContext();

const initialState = [];

const reducer = (state, action) => {
    switch(action.type) {
        case "receive-cart-info-from-server": {
            console.log("action in receive-cart-info-from-server: ", action)
            return [...action.data]
        }
        case "add-item": {
            console.log("state in add-item: ", state)
            return [
                ...state,
                action.item,
            ]
        } case "remove-item": {
            console.log("state in remove-item: ", state)
            return state.filter(item => item.itemId !== action.itemId)
        } case "change-quantity": {
            return state.map(item => {
                console.log("st: ", action.numToBuy, typeof action.numToBuy, typeof item.numToBuy)

                if(item.itemId === Number(action.itemId)) {
                    item.numToBuy = Number(action.numToBuy);
                }
                return item;
            });
        } default: {
            throw new Error("unrecognized action: " + action.type);
        }
    }

}
export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("state in provider: ", state);
    const receiveCartInfoFromServer = (data) => {
        dispatch({type: "receive-cart-info-from-server", data});
    }
    const addItem = (item) => {
        dispatch({type: "add-item", item})
    }
    const removeItem = (itemId) => {
        dispatch({type: "remove-item", itemId})
    }
    const changeQuantity = (numToBuy, itemId) => {
        dispatch({type: "change-quantity", numToBuy, itemId})
    }

    return (
        <CartContext.Provider value={
            {state, 
            actions: {
                receiveCartInfoFromServer,
                addItem, 
                removeItem,
                changeQuantity
            }}}>
            {children}
        </CartContext.Provider>
    )
}