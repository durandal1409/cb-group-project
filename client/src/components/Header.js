import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { IoWatchSharp } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Styled from "styled-components";

const Header = () => {
  const [itemsCategory, setItemsCategory] = useState([]);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        setItemsCategory(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <wraper>
      <ul>
        <li>
          <a href="#">
            All
            <AiFillStar />
            <IoWatchSharp />
          </a>
        </li>
        <li>
          <a href="#">Categories</a>
        </li>
        <li>
          <div>SearchBar goes here</div>
        </li>
        <li>
          <a href="#">Username</a>
        </li>
        <li>
          <a href="#">Login</a>°<a href="#">SignIn</a>
        </li>
        <li>
          <a href="#">Cart</a>
        </li>
      </ul>
    </wraper>
  );
};

export default Header;
