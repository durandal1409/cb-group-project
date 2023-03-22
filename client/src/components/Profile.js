import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import SmallItem from './SmallItem';

const Profile = () => {

    const {companyId} = useParams();
    const [companyData, setCompanyData] = useState(null);
    const [items, setItems] = useState(null);

    useEffect(() => {
        fetch(`/api/get-company/${companyId}`)
        .then(res => res.json())
        .then(data => {
            if (data.status !== 200) {
                window.alert(data.message);
                throw new Error(data.message);
            }
            setCompanyData(data.data)
        });
    }, []);

    useEffect(() => {
        fetch(`/api/get-company-items/${companyId}`)
        .then(res => res.json())
        .then(data => {
            if (data.status !== 200) {
                window.alert(data.message);
                throw new Error(data.message);
            }
            setItems(data.data)
        });
    }, []);

    // console.log("company: ", companyData);
    // console.log("items: ", items);

    return (
        <>
            {
                companyData
                ?   <div>
                        <h3>Company: </h3>
                        <p>{companyData.name}</p>
                        <a href={companyData.url}>{companyData.url}</a>
                        <p>Country: {companyData.country}</p>
                    </div>
                :   <h2>Loading...</h2>
            }
            {
                items
                ?   <div>
                        {items.map(item => <SmallItem item={item} key={item._id}/>)}
                    </div>
                :   <h2>Loading...</h2>
            }
        </>
    )
}

export default Profile;