import { NavLink, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import items from "../assets/items.json";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [itemsArr, setItemArr] = useState([]);
  const [locationArr, setLocationArr] = useState([]);
  let { category } = useParams();
  let [bodyLocation, setBodyLocation] = useState("");
  const navigate = useNavigate();
  console.log(category);

  useEffect(() => {
    /*fetch("")
      .then((res) => res.json())
      .then((data) => {
        setItemArr(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });*/

    let locations = [];
    items.forEach((item) => {
      if (!locations.includes(item.body_location)) {
        locations.push(item.body_location);
      }
    });
    locations.sort();
    setLocationArr(locations);

    const categoryArray = items
      .filter((item) => {
        return item.category == category;
      })
      .filter((item) => {
        if (bodyLocation.length) {
          return item.body_location == bodyLocation;
        }
        return true;
      });
    setItemArr(categoryArray);
  }, [category, bodyLocation]);

  return (
    <Wrapper>
      <Location>
        {locationArr &&
          locationArr.map((location) => {
            return (
              <BLocation
                onClick={() => {
                  console.log(location);
                  setBodyLocation(location);
                }}
                key={location}
              >
                {location}
              </BLocation>
            );
          })}
      </Location>
      {itemsArr && itemsArr.length ? (
        itemsArr.map((categoryItem) => {
          return (
            <DiscoverItem
              to={`/item/${categoryItem._id}`}
              key={categoryItem._id}
            >
              <img src={categoryItem.imageSrc} />

              <ButtonPrice
                onClick={() => navigate(`/item/${categoryItem._id}`)}
              >
                {categoryItem.price}
              </ButtonPrice>
            </DiscoverItem>
          );
        })
      ) : (
        <Nothing> Nothing available yet.</Nothing>
      )}
    </Wrapper>
  );
};

const Nothing = styled.div`
  font-family: var(--Font-heading-title);
  font-weight: bold;
  font-size: 30px;
`;

const BLocation = styled.button`
  border: none;
  background: none;
  font-family: var(--Font-heading-title);
  font-weight: bold;
  font-size: 20px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  :hover {
    color: rgba(0, 255, 255, 0.8);
    transition: 0.5s all;
    transform: translateY(3px);
  }
`;

const Location = styled.div`
  display: grid;
  position: absolute;
  align-self: flex-start;
  place-items: center;
  border-style: solid;
  border-radius: 5px;
  width: 140px;
  height: 360px;
  top: 30px;
  left: 20px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-left: 150px;
  padding-top: 30px;
  padding-bottom: 50px;
  width: 100%;
  row-gap: 10px;
  column-gap: 0px;
  min-height: 400px;
`;

const DiscoverItem = styled(Link)`
  display: grid;
  position: relative;
  place-items: center;
  border-style: solid;
  border-color: black;
  border-radius: 5px;
  width: 300px;
  height: 360px;
  transition: 1s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  :hover {
    transform: translateY(10px);
  }
  :after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 5px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.5s all;
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
  :hover button {
    opacity: 1;
    color: white;
  }

  button:hover {
    color: rgba(0, 255, 255, 0.8);
  }
`;

const ButtonPrice = styled.button`
  width: 130px;
  transition: 1s all;
  border-style: none;
  padding: 5px;
  position: absolute;
  border-radius: 5px;
  bottom: 5px;
  z-index: 10;
  color: var(--color-blackfont-text);
  font-family: var(--font-text);
  font-weight: bold;
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;

export default Category;
