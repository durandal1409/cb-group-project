import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import QuantityBtns from './QuantityBtns';
import { CartContext } from "./CartContext";

const Cart = ({userId, setOrderId}) => {
    // disable btns and input while fetching
    const [isFetching, setIsFetching] = useState(false);
    const {
        state, 
        actions: { 
            removeItem,
            changeQuantity,
            emptyCart
        }
    } = useContext(CartContext);
    const navigate = useNavigate();

    // calculating the quantity of one item to send it to the BE
    const newNumToBuy = (e, itemId, action) => {
        let currNumToBuy = state.find(item => item.itemId === itemId).numToBuy;
        if (action === "plus") {
            currNumToBuy++
            return currNumToBuy
        } else if (action === "minus") {
            if (currNumToBuy > 1) {
                currNumToBuy--
            }
            return currNumToBuy
        } else if (action === "input"){
            if (currNumToBuy > 0) {
                return Number(e.target.value)
            } else {
                return 1
            }
        }
    }

    // sending new quantity data to BE
    // and changing cart data in context after receiving response
    const handleQuantityChange = (e, action, itemId) => {
        setIsFetching(true);
        const numToBuy = newNumToBuy(e, itemId, action);
        fetch("/api/update-cart", {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": userId,
                "itemId": itemId,
                "numToBuy": numToBuy,
            })
        })
        .then(res => res.json())
        .then((data) => {
                setIsFetching(false);
                if (data.status === 200) {
                    changeQuantity(data.data);
                } else {
                    window.alert(data.message);
                }
            })
        .catch((error) => {
            window.alert(error);
        })
    
    }

    // sending info about removed item to the BE
    // and changing cart data in context after receiving response 
    const handleRemove = (itemId) => {
        setIsFetching(true);
        
        fetch("/api/delete-cart-item", {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    "_id": userId,
                    "itemId": itemId
                })
        })
            .then(res => res.json())
            .then((data) => {
                setIsFetching(false);
                if (data.status === 200) {
                    removeItem(itemId);
                } else {
                    window.alert(data.message);
                }
            })
            .catch((error) => {
                window.alert(error);
            })
    }

    // sending purchase info to the BE
    // emptying cart after responce
    // and navigating to confirmation page
    const handleBuy = () => {
        setIsFetching(true);
        fetch("/api/add-to-bought-items", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": userId
            })
        })
        .then(res => res.json())
        .then((data) => {
            setIsFetching(false);
            if (data.status === 201) {
                setOrderId(data.data._id);
                emptyCart();
                navigate(`/confirmation`);
            } else {
                window.alert(data.message);
            }
            })
            .catch((error) => {
                window.alert(error);
            })
    }

    return (
        <>
            <Wrapper>
                {state.length === 0
                ?   <h1>Cart is empty.</h1>
                :   <>
                        <h1>Cart: </h1>
                        <ol>
                            {state.map((item, ind) => {
                                return (
                                    <li key={item.itemId}>
                                        <p>{item.name}</p>
                                        <QuantityWrapper>
                                            <span>QTY:</span>
                                            <QuantityBtns 
                                                handleQuantityChange={handleQuantityChange} 
                                                itemQuantity={state[ind].numToBuy}
                                                disabled={isFetching}
                                                itemId={item.itemId}
                                            />
                                        </QuantityWrapper>
                                        <PriceWrapper>
                                            <span>Price: {item.price}</span>
                                            <span>Total: ${(Number(item.price.slice(1)) * state[ind].numToBuy).toFixed(2)}</span>
                                        </PriceWrapper>
                                        <RemoveBtn onClick={() => handleRemove(item.itemId)}>Remove</RemoveBtn>
                                    </li>
                                )
                            })}
                        </ol>
                        <div>
                            <p>Total:</p>
                            <p>${(state.reduce((acc,item) => acc + Number(item.price.slice(1)) * item.numToBuy, 0)).toFixed(2)}</p>
                        </div>
                        <button onClick={handleBuy} disabled={isFetching}>Buy</button>
                    </>}
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 50px auto;
    width: 700px;
    height: 500px;
    color: var(--color-blackfont-text);
    font-family: var(--font-text);
    font-size: 1.3rem;
    h1 {
        font-size: 2rem;
        margin-bottom: 20px;
        border-bottom: 1px solid;
        color: var(--color-blackfont-titles);
        font-family: var(--Font-heading-title);
    }
    li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        p {
            width: 40%;
        }
    }
    & > div {
        display: flex;
        justify-content: space-between;
        padding-top: 50px;
        border-top: 2px solid;
        font-size: 1.5rem;
    }
`
const QuantityWrapper = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const PriceWrapper = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`
const RemoveBtn = styled.button`
    width: 10%;
    cursor: pointer;
`

export default Cart;