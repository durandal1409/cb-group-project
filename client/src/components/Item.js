import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import QuantityBtns from './QuantityBtns';
import { CartContext } from "./CartContext";

const Item = ({userId}) => {

    const {itemId} = useParams();
    const [itemData, setItemData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [itemQuantity, setItemQuantity] = useState(1);
    // enable/disable button AddToCart
    const [isFetching, setIsFetching] = useState(false);
    const {state, actions: { addItem, changeQuantity }
    } = useContext(CartContext);

    // we need to receive item
    // and then fetch company with the companyId from item object
    const fetchItemAndCompany = async () => {
        const item = await fetch(`/api/get-item/${itemId}`)
                        .then(res => res.json())
        if (item.status !== 200) {
            window.alert(item.message);
            throw new Error(item.message);
        }
        setItemData(item.data);
        const company = await fetch(`/api/get-company/${item.data.companyId}`)
                        .then(res => res.json())
        if (company.status !== 200) {
            window.alert(company.message);
            throw new Error(company.message);
        }
        setCompanyData(company.data);
    }

    useEffect(() => {
        fetchItemAndCompany();
    }, []);

    const handleAddToCart = (e) => {
        // check if the stock has the required quantity 
        if (itemQuantity > itemData.numInStock) {
            window.alert(`The seller only has ${itemData.numInStock} items.`);
            setItemQuantity(1);
            return
        }
        setIsFetching(true);
        fetch("/api/add-to-cart", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": itemData._id,
                "numToBuy": itemQuantity,
                "userEmail": userId
            })
        })
            .then(res => res.json())
            .then(data => {
                setIsFetching(false);
                if (data.status === 201) {
                    // reducer functions that change the context
                    state.find(item => {
                        console.log("s: ", state, item, item.itemId, Number(itemData._id))
                        return Number(item.itemId) === Number(itemData._id)
                    })
                    if (state.find(item => Number(item.itemId) === Number(itemData._id))) {
                        console.log("change");
                        changeQuantity(data.data.numToBuy, itemId)
                    } else {
                        console.log("add");
                        addItem(data.data.cart[0])
                    }
                    setItemQuantity(1)
                } else {
                    window.alert(data.message)
                }
            })
            .catch((error) => {
                window.alert(error);
            })
            
    }

    // buttons and input handlers, change only local state
    const handleInputChange = (e) => {
        if (e.target.value > 0) {
            setItemQuantity(Number(e.target.value));
        } else {
            setItemQuantity(1)
        }
    }
    const handleMinusClick = (e) => {
        if (itemQuantity > 1) {
            setItemQuantity(itemQuantity - 1);
        }
    }
    const handlePlusClick = (e) => {
        setItemQuantity(itemQuantity + 1);
    }
    

    return (
        <>
            {
                itemData
                ?   <div>
                        <h1>{itemData.name}</h1>
                        <h2>{itemData.price}</h2>
                        <img src={itemData.imageSrc} alt={itemData.name}/>
                        {itemData.numInStock > 0
                            ?   <QuantityBtns 
                                    handleInputChange={handleInputChange}
                                    handleMinusClick={handleMinusClick}
                                    handlePlusClick={handlePlusClick}
                                    itemQuantity={itemQuantity}
                                />
                            : <p>Out of stock.</p>
                        }
                        
                        <button onClick={handleAddToCart} disabled={isFetching}>Add To Cart</button>
                    </div>
                :   <h2>Loading...</h2>
            }
            {
                companyData
                ?   <div>
                        <h3>Seller: </h3>
                        <p>{companyData.name}</p>
                        <a href={companyData.url}>{companyData.url}</a>
                        <p>Country: {companyData.country}</p>
                    </div>
                : <h2>Loading...</h2>
            }
            
            
        </>


    )
}
export default Item;
