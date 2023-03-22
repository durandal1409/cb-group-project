import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import styled from "styled-components";

const Home = () => {
  const [itemsArr, setItemArr] = useState([]);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        setItemArr(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Banner />
      <Quote>
        Everyone looks at your watch and it represents who you are, your values
        and your personal style. - Kobe Bryant
      </Quote>
      <Explore>Discover</Explore>
    </div>
  );
};
const Banner = styled.div`
  width: 100%;
  height: 650px;
  background: url("assets/watchBanner.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 10px 0px 50px 5px rgb(47, 48, 50);
`;

const Quote = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-family: var(--font-text);
  font-style: italic;
  font-weight: bold;
  font-size: 25px;
  padding: 25px;
  color: var(--color-blackfont-titles);
  box-shadow: rgba(245, 245, 245, 10) 0px 5px, rgba(1, 2, 3, 0.2) 0px 10px;
`;
const Explore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 60px;
  color: var(--color-blackfont-titles);
  font-size: 40px;
  font-family: var(--Font-heading-title);
`;
export default Home;
