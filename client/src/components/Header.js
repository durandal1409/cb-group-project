import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import items from "../assets/items.json";

const Header = () => {
  const [itemsCategory, setItemsCategory] = useState([]);

  useEffect(() => {
    /* fetch("")
      .then((res) => res.json())
      .then((data) => {
        setItemsCategory(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    */

    const categories = new Set();
    items.forEach((item) => {
      categories.add(item.category);
    });
    console.log(categories);
    setItemsCategory(categories);

    // categories.forEach((test) => {
    //console.log(test);
    //});
  }, []);

  return (
    <div>
      <Wrapper>
        <UList>
          <List>
            <AnchorTitle href="#">AllStar</AnchorTitle>
          </List>
          <List>
            <Anchor href="#">Categories</Anchor>
          </List>
        </UList>

        <UserList>
          <List>
            <Anchor href="#">
              <AiOutlineSearch />
            </Anchor>
          </List>
          <List>
            <Anchor href="#">UserName</Anchor>
          </List>
          <List>
            <Anchor href="#">
              <AiOutlineUser />
            </Anchor>
          </List>
          <List>
            <Anchor href="#">
              <AiOutlineShoppingCart />
            </Anchor>
          </List>
        </UserList>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const UList = styled.ul`
  width: 100%;
  padding: 25px;
  font-family: var(--font-text);
  font-weight: bold;
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  background-color: var(--color-background);
`;
const UserList = styled.ul`
  display: flex;
  width: 100%;
  padding: 25px;
  font-family: var(--font-text);
  font-weight: bold;
  font-size: 17px;
  align-items: center;
  justify-content: flex-end;

  background-color: var(--color-background);
`;
const List = styled.li`
  display: flex;
  line-height: 35px;
  align-items: center;
  padding: 10px 15px;
  list-style-type: none;
`;
const Anchor = styled.a`
  text-decoration: none;
  color: white;
  color: var(--color-blackfont-text);
  :hover {
    box-shadow: rgba(245, 245, 245, 10) 0px 5px,
      rgba(245, 245, 245, 10) 0px 10px, rgba(245, 245, 245, 10) 0px 15px,
      rgba(245, 245, 245, 10) 0px 20px, rgba(245, 245, 245, 10) 0px 25px,
      rgba(1, 2, 3, 0.4) 0px 30px;
  }
`;
const AnchorTitle = styled.a`
  text-decoration: none;
  font-size: 25px;
  font-family: var(--Font-heading-title);
  //  font-family: var(--font-text);
  font-style: italic;
  color: white;
  color: var(--color-blackfont-text);
`;

/*const Banner = styled.div`
      width: 100%;
      height: 650px;
      background: url("assets/watchBanner.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    `;*/
export default Header;
