import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import items from "../assets/items.json";

const Header = ({setBodyLocation}) => {
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

    let categories = [];
    items.forEach((item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });
    categories.sort();
    setItemsCategory(categories);
  }, []);

  return (
    <div>
      <Wrapper>
        <UList>
          <List>
            <AnchorTitle to={"/"}>AllStar</AnchorTitle>
          </List>
        </UList>

        <UlCategories>
          {itemsCategory &&
            itemsCategory.map((category) => {
              return (
                <List key={category}>
                  <Anchor 
                    to={`/category/${category}`}
                    // need to lift the state to make Category refresh items when header has been clicked
                    onClick={() => setBodyLocation(null)}
                  >
                    {category}
                  </Anchor>
                </List>
              );
            })}
        </UlCategories>

        <UserList>
          <List>
            <Anchor to={"/"}>
              <AiOutlineSearch />
            </Anchor>
          </List>
          <List>
            <Anchor to={"/"}>UserName</Anchor>
          </List>
          <List>
            <Anchor to={"/"}>
              <AiOutlineUser />
            </Anchor>
          </List>
          <List>
            <Anchor to={"/cart"}>
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
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
`;
const UList = styled.ul`
  width: 100%;
  padding: 25px;
  font-family: var(--font-text);
  font-weight: bold;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: var(--color-background);
`;
const UlCategories = styled(UList)`
  word-wrap: break-word;
  flex-direction: row;
  justify-content: center;
  & li a {
    width: max-content;
  }
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
const Anchor = styled(Link)`
  display: flex;
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
const AnchorTitle = styled(Link)`
  text-decoration: none;
  font-size: 35px;
  font-family: var(--Font-heading-title);
  font-style: italic;
  color: white;
  color: var(--color-blackfont-text);
  letter-spacing: 0.5rem;
`;

export default Header;
