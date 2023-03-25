import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import QuantityBtns from "./QuantityBtns";
import { CartContext } from "./CartContext";

const Item = ({ userId }) => {
  const { itemId } = useParams();
  const [itemData, setItemData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  // enable/disable button AddToCart
  const [isFetching, setIsFetching] = useState(false);
  const {
    state,
    actions: { addItem, changeQuantity },
  } = useContext(CartContext);

  // we need to receive item
  // and then fetch company with the companyId from item object
  const fetchItemAndCompany = async () => {
    const item = await fetch(`/api/get-item/${itemId}`).then((res) =>
      res.json()
    );
    if (item.status !== 200) {
      window.alert(item.message);
      throw new Error(item.message);
    }
    setItemData(item.data);
    const company = await fetch(`/api/get-company/${item.data.companyId}`).then(
      (res) => res.json()
    );
    if (company.status !== 200) {
      window.alert(company.message);
      throw new Error(company.message);
    }
    setCompanyData(company.data);
  };

  useEffect(() => {
    fetchItemAndCompany();
  }, []);

  const handleAddToCart = (e) => {
    // check if the stock has the required quantity
    if (itemQuantity > itemData.numInStock) {
      window.alert(`The seller only has ${itemData.numInStock} items.`);
      setItemQuantity(1);
      return;
    }
    setIsFetching(true);
    fetch("/api/add-to-cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: itemData._id,
        numToBuy: itemQuantity,
        userEmail: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFetching(false);
        if (data.status === 201) {
          // reducer functions that change the context
          // console.log("f: ", state.find(item => {
          //     console.log("item: ", item, itemData)
          //     return Number(item.itemId) === Number(itemData._id)
          // }))
          if (
            state.find((item) => Number(item.itemId) === Number(itemData._id))
          ) {
            console.log("change");
            changeQuantity(data.data.numToBuy, itemId);
          } else {
            console.log("add", data.data);
            addItem(data.data);
          }
          setItemQuantity(1);
        } else {
          // console.log("ddd: ", data);
          window.alert(data.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  // buttons and input handlers, change only local state
  const handleInputChange = (e) => {
    if (e.target.value > 0) {
      setItemQuantity(Number(e.target.value));
    } else {
      setItemQuantity(1);
    }
  };
  const handleMinusClick = (e) => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };
  const handlePlusClick = (e) => {
    setItemQuantity(itemQuantity + 1);
  };

  return (
    <Wrapper>
      {itemData ? (
        <>
          {itemData.numInStock > 0 ? (
            <ToCart>
              <QuantityBtns
                handleInputChange={handleInputChange}
                handleMinusClick={handleMinusClick}
                handlePlusClick={handlePlusClick}
                itemQuantity={itemQuantity}
              />
              <ButtonCart onClick={handleAddToCart} disabled={isFetching}>
                Add To Cart
              </ButtonCart>
            </ToCart>
          ) : (
            <p>Out of stock.</p>
          )}{" "}
          <DiscoverItem>
            <h1>{itemData.name}</h1>
            <img src={itemData.imageSrc} alt={itemData.name} />{" "}
            <h2>{itemData.price}</h2>{" "}
          </DiscoverItem>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
      {companyData ? (
        <Location>
          <h3>Seller: </h3>
          <p>{companyData.name}</p>
          <a href={companyData.url}>{companyData.url}</a>
          <p>Country: {companyData.country}</p>
        </Location>
      ) : (
        <h2>Loading...</h2>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row-reverse;
  padding-left: 150px;
  padding-right: 150px;
  padding-top: 30px;
  padding-bottom: 50px;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  row-gap: 10px;
  column-gap: 0px;
  min-height: 400px;
  p {
    font-family: var(--Font-heading-title);
    font-weight: bold;
    font-size: 30px;
  }
`;
const ToCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: var(--Font-heading-title);
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  width: 250px;
  height: 100px; ;
`;

const ButtonCart = styled.button`
  height: 5vh;
  width: 27vh;
  border-radius: 5px;
  border-style: none;
  font-family: var(--Font-heading-title);
  font-size: 20px;
  font-weight: bold;
  transition: 0.5s ease-in-out;
  background-color: var(--color-background);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  :hover {
    transform: translateY(1px);
  }
  :after {
    content: "";
    border-radius: 5px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 1s all;
    opacity: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 204, 255, 0.1),
      rgba(191, 128, 64, 0.3)
    );
  }
  :hover:after {
    opacity: 1;
  }
`;
const Location = styled.div`
  display: grid;
  align-self: flex-start;
  place-items: center;
  border-style: solid;
  border-color: black;
  font-family: var(--Font-heading-title);
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  width: 250px;
  height: 360px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  h3 {
    font-size: 25px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
  a:hover {
    color: rgba(0, 153, 255);
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
  p {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
  a {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
`;
const DiscoverItem = styled.div`
  display: grid;
  position: relative;
  place-items: center;
  font-family: var(--Font-heading-title);
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  width: 600px;
  height: 360px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  h2 {
    text-align: center;
    font-size: 25px;
  }
  h1 {
    text-align: center;
    font-size: 25px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
  :after {
    content: "";
    border-radius: 5px;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 204, 255, 0.1),
      rgba(191, 128, 64, 0.3)
    );
  }
`;
export default Item;
