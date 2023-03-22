import {Link} from "react-router-dom";
import styled from "styled-components";

const SmallItem = ({item}) => {
    const { 
            // body_location,
            // category,
            imageSrc,
            name,
            // numInStock,
            price,
            // companyId,
            _id
        } = item;

    return (
        <StyledLink to={`/item/${_id}`}>
            <h2>{name}</h2>
            <h2>{price}</h2>
            <img src={imageSrc} alt={name}/>
        </StyledLink>
    )
}

const StyledLink = styled(Link)``

export default SmallItem;