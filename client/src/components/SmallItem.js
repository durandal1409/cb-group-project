import { Link } from "react-router-dom";
import styled from "styled-components";

const SmallItem = ({ item }) => {
  const {
    // body_location,
    // category,
    imageSrc,
    name,
    // numInStock,
    price,
    // companyId,
    _id,
  } = item;

  return (
    <StyledLink to={`/item/${_id}`}>
      <button> {price}</button>
      <img src={imageSrc} alt={name} />
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  display: grid;
  position: relative;
  grid-template-columns: repeat(4, 20%);
  place-items: center;
  border-style: solid;
  border-color: black;
  border-radius: 5px;
  width: 280px;
  height: 360px;
  transition: 0.5s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  :hover {
    transform: translateY(10px);
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
    transition: 0.5s all;
    opacity: 1;
    background: linear-gradient(
      to top,
      rgba(89, 89, 89, 0.3),
      rgba(255, 255, 255, 0.1)
    );
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: black;
  }
  button {
    width: 130px;
    transition: 1s all;
    border-style: none;
    padding: 5px;
    position: absolute;
    bottom: 5px;
    z-index: 10;
    color: var(--color-blackfont-text);
    font-family: var(--font-text);
    font-weight: bold;
    font-size: 20px;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
  }

  button:hover {
    color: rgba(0, 255, 255, 0.8);
  }
`;

export default SmallItem;
