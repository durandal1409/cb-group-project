import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Item = ({userId}) => {

    const {itemId} = useParams();
    const [itemData, setItemData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [itemQuantity, setItemQuantity] = useState(1);

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

    const handleClick = (e) => {
        // check if the stock has the required quantity 
        if (itemQuantity > itemData.numInStock) {
            window.alert(`The seller only has ${itemData.numInStock} items.`);
            setItemQuantity(0);
            return
        }
        fetch("/api/add-to-cart", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: itemData._id, 
                numToBuy: itemQuantity,
                userEmail: userId
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 201) {
                } else {
                    window.alert(data.message)
                }
            })
            .catch((error) => {
                window.alert(error);
            })
            
    }
    const handleInputChange = (e) => {
        if (e.target.value >= 0) {
            setItemQuantity(e.target.value);
        }
    }
    const handleMinusClick = (e) => {
        if (itemQuantity > 0) {
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
                            ?   <Wrapper>
                                    <ButtonDiv>
                                        <Button onClick={handleMinusClick}>-</Button>
                                        <Number type="number" value={itemQuantity} onChange={handleInputChange} />
                                        <Button onClick={handlePlusClick}>+</Button>
                                    </ButtonDiv>
                                </Wrapper>
                            : <p>Out of stock.</p>
                        }
                        
                        <button onClick={handleClick}>Add To Cart</button>
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 27vh;
  border-radius: 15px;
  background-color: var(--color-background);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
const Number = styled.input`
  /* display: flex;
  align-items: center; */
  font-size: 20px;
  border-left: 2px solid #f5f5f5;
  border-right: 2px solid #f5f5f5;
  border-color: grey;
  padding: 0px 8px;
  width: 7vh;
  text-align: center;
`;
const ButtonDiv = styled.div`
  display: flex;
  align-content: center;
  min-height: 10px;
  gap: 5px;
  justify-content: center;
  background-color: var(--color-background);
`;
const Button = styled.button`
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  border-style: none;
  background-color: transparent;
  padding: 0px 15px;
  :hover {
    background-color: #bfbfbf;
    border-radius: 15px;
  }
`;

export default Item;
