import { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import QuantityBtns from './QuantityBtns';
import { CartContext } from "./CartContext";

const Cart = ({userId}) => {
    // enable/disable btns and input
    const [isFetching, setIsFetching] = useState(false);
    const {
        state, 
        actions: { 
            removeItem,
            changeQuantity
        }
    } = useContext(CartContext);

    // calculating the numToBuy to send it to the BE
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
    const handleQuantityChange = (e, itemId, action) => {
        setIsFetching(true);
        const numToBuy = newNumToBuy(e, itemId, action);
        console.log("num: ", numToBuy)
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
                                                handleMinusClick={(e) => handleQuantityChange(e, item.itemId, "minus")} 
                                                handleInputChange={(e) => handleQuantityChange(e, item.itemId, "input")} 
                                                handlePlusClick={(e) => handleQuantityChange(e, item.itemId, "plus")} 
                                                itemQuantity={state[ind].numToBuy}
                                                disabled={isFetching}
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