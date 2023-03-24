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

    console.log("state: ", state);
   

    const handleBtnClick = () => {

    }
    // TODO:
    // useEffect(() => {
    //     fetch(`/api/get-cart/${userId}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data.status !== 200) {
    //             window.alert(data.message);
    //             throw new Error(data.message);
    //         }
    //         setCart(data.data)
    //     });
    // }, []);
    // console.log("cart: ", cart);

    return (
        <>
            {state
                ?   <Wrapper>
                        <h1>Cart: </h1>
                        {/* TODO:
                            add order details */}
                            <ol>
                                {state.map(item => {
                                    {/* console.log("item: ", item); */}
                                    return (
                                        <li key={item._id}>
                                            <p>{item.name}</p>
                                            <QuantityWrapper>
                                                <span>QTY: {item.numToBuy}</span>
                                                <QuantityBtns 
                                                    handleMinusClick={() => subtractQuantity(item._id)} 
                                                    handleInputChange={changeQuantity} 
                                                    handlePlusClick={addQuantity} 
                                                    itemQuantity={item.numToBuy}
                                                />
                                            </QuantityWrapper>
                                            <PriceWrapper>
                                                <span>Price: {item.price}</span>
                                                <span>Total: ${Number(item.price.slice(1)) * item.numToBuy}</span>
                                            </PriceWrapper>
                                            <RemoveBtn onClick={handleBtnClick}>Remove</RemoveBtn>
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