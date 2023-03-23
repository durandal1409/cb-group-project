import { useState, useEffect } from "react";
import styled from "styled-components";

const Confirmation = ({orderId}) => {
    const [order, setOrder] = useState(null);

    // useEffect(() => {
    //     // TODO:
    //     // change the endpoint?
    //     fetch(`/api/get-order/${orderId}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if(data.status !== 200) {
    //                 window.alert(data.message);
    //                 throw new Error(data.message);
    //             } else setOrder(data.data)
    //         })
    // }, [])
    return (
        <>
            {true
                ?   <Wrapper>
                        <h1>Your order is confirmed!</h1>
                        {/* TODO:
                            add order details */}
                            <ol>
                                <li>
                                    <p>"Barska GB12166 Fitness Watch with Heart Rate Monitor"</p>
                                    <div>
                                        <span>Price: $7.00</span>
                                        <span>QTY: 2</span>
                                        <span>Total: $14.00</span>
                                    </div>
                                </li>
                                <li>
                                    <p>"Barska GB12166 Fitness Watch with Heart Rate Monitor"</p>
                                    <div>
                                        <span>Price: $7.00</span>
                                        <span>QTY: 2</span>
                                        <span>Total: $14.00</span>
                                    </div>
                                </li>
                            </ol>
                            <div>
                                <p>Total:</p>
                                <p>$28.00</p>
                            </div>
                    </Wrapper>
                : <h2>Loading...</h2>}
        </>
        
    )
};

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

export default Confirmation;
