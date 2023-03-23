import { NavLink, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import items from "../assets/items.json";

//need route for this <Route path="`/category/:category`" element={<Filtered />} />

const Category = () => {
  const [itemsArr, setItemArr] = useState([]);
  let { category } = useParams();

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
  }, []);
  return <Div>test</Div>;
};

const Div = styled.div`
  //padding-bottom: 550px;
`;

export default Category;
