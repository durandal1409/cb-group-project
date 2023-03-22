import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const Item = () => {

    const {itemId} = useParams();
    const [itemData, setItemData] = useState(null);
    const [companyData, setCompanyData] = useState(null);

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
        fetch(`api/add-to-cart`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({order: itemData._id})
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 201) {
                    // TODO:
                    // receive updated cart info ?
                } else {
                    window.alert(data.message)
                }
            })
            .catch((error) => {
                window.alert(error);
            })
            
    }

    return (
        <>
            {
                itemData
                ?   <div>
                        <h1>{itemData.name}</h1>
                        <h2>{itemData.price}</h2>
                        <img src={itemData.imageSrc} alt={itemData.name}/>
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

export default Item;
