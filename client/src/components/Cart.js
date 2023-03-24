import { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import QuantityBtns from './QuantityBtns';
import { CartContext } from "./CartContext";

const Cart = ({userId}) => {
    const [isFetching, setIsFetching] = useState(false);
    const {
        state, 
        actions: { 
            removeItem,
            changeQuantity,
            addQuantity,
            subtractQuantity
        }
    } = useContext(CartContext);

    const handleChange = (e, itemId, action) => {
        // setIsFetching(true);
        action(itemId);
        // fetch("/api/update-cart", {
        //     method: "PATCH",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         "_id": "abcc87a7-0557-4c09-848f-4576a8f18d14",
        //         "itemId": 6544,
        //         "numToBuy": state.find(item => item._id === itemId).numToBuy,
        //     })
        // })
        //     .then(res => res.json())
        //     .then((data) => {
        //         setIsFetching(false);
        //         if (data.status === 200) {
        //             // update state again?
        //         } else {
                    
        //             window.alert(data.message);
        //         }
        //     })
        //     .catch((error) => {
        //         window.alert(error);
        //     })
    
    }

    const handleBtnClick = (itemId) => {
        // setIsFetching(true);
        removeItem(itemId);
        // fetch("/api/delete-cart-item", {
        //     method: "DELETE",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
                //     "_id": "abcc87a7-0557-4c09-848f-4576a8f18d14",
                //     "itemId": 6544,
                //     "numToBuy": 3,
                // })
        // })
        //     .then(res => res.json())
        //     .then((data) => {
        //         setIsFetching(false);
        //         if (data.status === 200) {
        //             // update state again?
        //         } else {
                    
        //             window.alert(data.message);
        //         }
        //     })
        //     .catch((error) => {
        //         window.alert(error);
        //     })
    }


    return (
        <>
            {state && !isFetching
                ?   <Wrapper>
                        <h1>Cart: </h1>
                            <ol>
                                {state.map((item, ind) => {
                                    return (
                                        <li key={item._id}>
                                            <p>{item.name}</p>
                                            <QuantityWrapper>
                                                <span>QTY: {item.numToBuy}</span>
                                                <QuantityBtns 
                                                    handleMinusClick={(e) => handleChange(e, item._id, subtractQuantity)} 
                                                    handleInputChange={(e) => handleChange(e, item._id, changeQuantity)} 
                                                    handlePlusClick={(e) => handleChange(e, item._id, addQuantity)} 
                                                    itemQuantity={state[ind].numToBuy}
                                                />
                                            </QuantityWrapper>
                                            <PriceWrapper>
                                                <span>Price: {item.price}</span>
                                                <span>Total: ${Number(item.price.slice(1)) * state[ind].numToBuy}</span>
                                            </PriceWrapper>
                                            <RemoveBtn onClick={() => handleBtnClick(item._id)}>Remove</RemoveBtn>
                                        </li>
                                    )
                                })}
                            </ol>
                            <div>
                                <p>Total:</p>
                                <p>${state.reduce((acc,item) => acc + Number(item.price.slice(1)) * item.numToBuy, 0)}</p>
                            </div>
                    </Wrapper>
                : <h2>Loading...</h2>}
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