import { useState, useEffect } from 'react';
import styled from "styled-components";
import QuantityBtns from './QuantityBtns';

const Cart = ({userId}) => {
    // TODO:
    // change the initial state to null
    const [cart, setCart] = useState([
        {_id: 6543, price: "$5.00", numInStock: 9, numToBuy: 4, name: "Barska GB12166 Fitness Watch with Heart Rate Monitor"},
        {_id: 6544, price: "$5.00", numInStock: 9, numToBuy: 4, name: "Barska GB12166 Fitness Watch with Heart Rate Monitor"}
    ]);
   
    const changeState = () => {
        setCart();
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
            {cart
                ?   <Wrapper>
                        <h1>Cart: </h1>
                        {/* TODO:
                            add order details */}
                            <ol>
                                {cart.map(item => {
                                    console.log("item: ", item);
                                    return (
                                        <li key={item._id}>
                                            <p>{item.name}</p>
                                            <div>
                                                <span>QTY: {item.numToBuy}</span>
                                                <QuantityBtns itemQuantity={item.numToBuy} setItemQuantity={changeState}/>
                                            </div>
                                            <div>
                                                <span>Price: {item.price}</span>
                                                <span>Total: ${Number(item.price.slice(1)) * item.numToBuy}</span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ol>
                            <div>
                                <p>Total:</p>
                                <p>${cart.reduce((acc,item) => acc + Number(item.price.slice(1)) * item.numToBuy, 0)}</p>
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
    width: 400px;
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
            width: 60%;
        }
        div {
            width: 30%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
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


export default Cart;