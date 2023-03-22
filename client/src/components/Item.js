import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const Item = () => {
    // TODO:
    // change useState initial value to null
    // uncomment and use useParams();
    // uncomment and use useEffects

    // const {itemId} = useParams();
    const [itemData, setItemData] = useState({
        "name": "Withings Pulse Activity Sleep/Heart Rate Monitor 70011803",
        "price": "$99.95",
        "body_location": "Chest",
        "category": "Fitness",
        "_id": 7115,
        "imageSrc": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALQAtAMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xABEEAABBAEBBQQHBQMJCQAAAAABAAIDBBEFBhIhQVETMWGhBxQiMmJxsSMzgZGyQ3LBFkJSZHN0gtHhFSUmNTZEU2OS/8QAGgEBAQADAQEAAAAAAAAAAAAAAAECAwQFBv/EADARAQACAgEDAQcDAgcAAAAAAAABAgMRBBIhMQUTIjJBUWGBM3GRFUIUI1KhwdHx/9oADAMBAAIRAxEAPwD3FAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIBAIIp7ENeMyTysjYO9z3ABBjWNr9GhOBYdL/ZsJH5oIG7b6Q48fWG+JjQX620mkWcbl2NpPKTLT5oNKOaOUZie146tOUD8/NAqAQCAQCAQCAQCAQCAQCAQCAQCDyDVNVs6rYdNZkJbn7OMH2WjkEFElA0k8kAglhsTQHMMz4z8Jwg0621GsVsBtxz2jlIA76hBq1tvbbcCzVik6luWlBr1tutPk4TwzxHqAHBBr1toNLs/dXYs9HHdPmg0Y5GSAOje17TzacoHoBAIBAIBAIBAIBAIBAIPmEa/ZoTOiwJYmng13Aj5FZKvwbVU3/fMljPy3vooNCvrOnz+zHaj3uhOD5qC8x8bhlpBHggXIQJ3oEJQISgASO7KDUFLVqf2kYlYQ1pPZvwQXdzf3vBEW4to9eondkmkOOUrc9yDSq7f2m49aqRPHVhLT/FBsVdudMlwJ2TQk9RlBr1de0q0QIb0Of6Lnbp80Gi17HjLHNcPA5QOygEAgEAgEAgEHyZqoxbk/eP1VVQKsITKCSKeWE5hkez91xCC/Br2ow91kvHSRoP+qmhoQbWTDHb12u8WOwmhoQbU0ZPvRLEfiZkeSaVo19Tp2B9lZid4b3FNC3FLuPbIwjeYQ4EjOCPJNDWG0d97S2Z4la6TfkON1z/DI7h8sKCeHX4t0NmgPtfeYDS13Hhw4eyP6OeJ7ygldNo16Z5DTHJOcOyCMHzA8SBxJwBzQJY2aY0nsbD2l3GNsjO/546c+GB4oMTUaz6Fp0Dpo3vbwduZ9k9DkIGwahbrn7CxJH+47CDVq7YaxXxmz2jekjQUGxV9IUzcCzTY4dWOwURs1NutKl+9bNCfEAhBsVdd0u1jsbsRJ5F2D5oNBr2vGWkEdQUC5QKgEHybrIxemHR5+qqs4qwhEAgEAgM8MIEPE5KCaG1YgIMM8jMdHFBow7Q6hFjeeyQfG3/JNC/DtUf+4r/jG7+BU0NCHaLT5MFz3Rn42lNDQj1GGxgx2RIR3ESZIUU/fHLzQLkIEPFAIDJHHKIa+YRNL3PDWjiSeGFQU9fssO9QkskA4DmEtb+ag26u3Ov1QN5plA5PLXFBuaZ6UYXztg1Or2LzwyMtz8ge/wDNB3tK/WvVm2KsrXxu7jnyQfLWvtxqdjwkd9VVZZSAiSgWQRTZPYIaCAygMoDKAygXKBM8coqzDftw/dWZW/4kF+HaK9HgSFko+JuPogvQ7Ts7p67x4sIKguw65Rl/bbh6PGEF2KzFKAY5GO/ddlBQ2hr2LNAiqMvY7e7MnG/4IJqerUp2MiLhWmaMGCb2HA+GeBCC2ZomsMjpY9wd7t8YHmoMfU5W6oGVqLHS4cHOs49hgHQ8yiN2pqNuOLcpzSdm04Ja7gSg5LaQAatbHSZ/6igxyqflf0TTm6pcNZ0pi9guDgM9y3YMftralxc7lTxcXXEbaEmylogup2K9hvg7BW+3Bnc6nenHT1fHuItWY2x2Ubb4e2jrSviyRvtaSMjv7lzxjtMfC9GeRiiem1o3Ku4Fpw5pB6ELXaNfFDfE1vEdBFNx8mU9xlVjGhlFGUBlAZQGUBlAIBAqBQSDkH8uCC1DqNyH3LEn4nIQXotanlG5PFDKPjYguw2o93LKtdh+GMKaDLVmabDXSHdz7o4BNDodCjHqP+I/QKDmNq241u8P/e/9RVGGVY7r2bmxn/OsdYXfwXZwo3keP61OuJr7w2dA0OxQ1d9kTwy13NcPYdxyeoXVhwXpe1t7h5nO52PNxqU6dTE/RWoWrdPZZ89LImbacPd3uGfksaZbVwzOP6tmTFhy8yK5J+TH1DXZtRrivarwb++D2jW4dw5LnvyLW7Xh6WL0+OPu+OZ1+7Z1aps5XuirYgmglewOD4iS3j+K35K4KRFbfN5/H5HPvSctbbiJlnz7Ntdrf+zqtnvg7ZrpR5cFpvxaxm6In5Ounqtq8f22Svz0hs7LarCC5kcczB/Oifn64WueLkiNtuP1fjX1HeJ+7FPAkdFz948vTjvBFFKEAgEBlAZQLhAYQCCet76DXg7ggH++Pmg63QW5oA/EfoFiOV2wG7r2oD+syfqKqsAqx5GxslNHDrLXTSNjaY3DeccDJXTw5iMvd5fq2Ob8fUfVuaDodqjq5t9tFJA8OGWO693Bd2HBbHlmd9nk8vm48uGMcV1MaYNPUdWoCQ0w/wBX7V37PebnnxwuOubJTq1Hbb1MnG4matZydraaOp23ajssbtiCJthtgNyxuCt+S0zg9rMd9uHj4PZc2MVLTqYFjUdC1iWOS56zXnaA0OHcrfPgyTHX5Zxx+XxazXHMTE7anD+WUbRxBonBPPiFvr+v+HnxuOBuf9X/AGwn6Jr9F7n1XSObxP2Mv8OC5L4eR5+T1ac3hZqxFoiPw5053jvZznjlcM733e1GtdiZUUoKAQCAQKpsA71QqAQT1vfQa8HuhAp99B2Ozw/3f/jP0CxHK7bDG0epD+syfqKqubdzSElY02o29abXdOyAOBIe/uyFsxVi9u7RycvsKdfTtrfyc1mod+lK17eToJcZ/DguqeNevw2ebHqXEzTrJGp+8Ia9zXNEaYxHIyIuL3CSLeBJ7+P+qxrfPi812zyYuFzPemf9zdS2kk1HTn1Ja0TCXB28zqPBXLzLZI1aNGH0yuDNGStvknjOy9ndOLVOThk5Lm581azxrViPm15J59Nx2tDXht1bG1sD688ckYplu+Hc+i6vaUtyI/Z598WWnDnqr334/k3QNL1Whqr3WSTVLH4xJvNye7gscGPLW0/ReZyuLkwVinxdnFWOE8o+M/VeZf4pfS4v04MysWwIFygEg/Zf0RunvvBmqEtgc0gODiMHlkrdh9n1e85ObbLFP8ry6SPRNndSkczTrL2Sj+a15PkV3zx+PftTy8Sef6hx9Tljsw9W0ObTI+07RsrGv3HkDG67l+a4s3GnG9bic6uadTDK71zvQKEE1b30GvB7oQKfvEHbbOAnThgfzz9AsRye3XDaXUv7y/8AUqrmXd6sIYcJuYncCSG1YrnNeeWI/A8hZVy3ie0teTBiyfFWP4adfanVYODpmzN6StByuivLyx83Df0njW8RpZ/lLSskDUtGrvz3vjIB+n8VsjlVt8dYc8+m8jH+nkn8/wDpNzZa53S2abz14t/irri3+HsvX6lh8xFoL/JeOwN7TdVrWPAnBH5Kf4SZnqpeD+rXr+rjmDDp20um8YTYc0f+GTeH5f6JNeTSfK15Pp+We8RE/eNMGxFPE9xsRvY4nJ32lq5LUvvvD0seXHMapMSjz07lg3FTWvK6CERMzpt6Vs9NqmnyWYJ4xI1xAiPecePJdOHje1r7s93m8r1D/DZYravb6p4dkdQfXmkmcyF7Pda4+9148lsjg36dy0W9awTeK177Zz6t3SW1bocGmT2o3sfnGOq0dFscdVXbGbFy94rQkOu25IrUdkRz+sNAJe3i3HRW3IteurMf6dSk1mvbpZoWh2x2gILFb3soNeD3QgU/eIO+2VZvaXn4z9AsRxm3n/Uuo+Mzvqqrlnd6sIYSgblFJlAmU0k9U+CZUn7mteSg+1kcD1CR0+YkmtZ8rtbV9SrfcXpmeG9kea31z5K/DLlvw8GTtajTi2v1DdDbcUFpo799gB8v8lujmX/vcl/SMP8AZM1Jb1bRrtd4k0owWCPZfC7ABUvmw3jU1TDxOVht7t9x92d2OnS/dXXxO5NniOP/AKbn6LTNcU+JdnXmrHvR/CKzUdXY13awSNJxmKQO8u9YWrFfDZjyRedTEwbSnnr2GvqyuikPDeacd6tLXrPuyZ8WO1Z6+8N2TV9oooJWz5khjcWSuMbSOHeCRy4+a645Oakd+7zI4PAm0a7T+WRqWozalZM0wDcABrAODR0XLlyZL95d/H41MEar5VcrW6tfWe4ygUILFb3h80GvB3IHftEHo+xrN7SCcftD9AsRwW3p/wCIr3DGZSVRyj3cUgRlyoaXIDeQG8ijeRBvKaAHKgygAUCqAVE1OVsFmOWSPtGsOd3PeeSyraInbXkpN69MNiXU6s8TAXyB8obHLvDgxpOXuB5kldM5ay4IwWxxPbx4/wCF7fitAxxuguSR+3DFvAtA91reOOAHErZutmiYmnfwgsUaGJJDCdwsc/tIyWtZu8OA+J3Ja7Urptpny711eOznAVyzHd6leqa7k4IqzV95Qa9c8EDhxk/FB6fsGM6K/wDtj+lqxFja7YqlrxMwJhsgcJG8/mEHmeq+jrXKjj6uI7LOrTun8lYHMXdH1OkSLNKZmOe7kKjPLscDwKBN7xQG8gXPigXeQGUC5QLlAoKBcoDKmjyAeKul8eC9OCu5RL6xL2Jh7V/ZHvZvHd/JJmdMPZ1idxHdHlSGczMlQWaveg14O5A8e/8Aig9W9Hke/oTznH25/S1Yjt5YM8kFKaA9EGfZqMcCHMaR0IV2MLUdmNLuZ9YowknmG4KbHL6h6N9Nmya75YDywcgJA5676N70WTUsskHRzcFUc/d2X1inkyUpHNHNg3ggypYpYTiWKRh+NpCBiBcoFDggUOQO3kACgUFFLvIhUCgoFygsVTxQa8B9kIJGH7T8UHrvo2AOgSf3h36WrEegujQV5IM8kFWWqDyQVJanggqSU/BBXfTKCvJUz3jPzQULOj1LAInrRv8Am1BgX9g9HtZIrmJx5sJCo5676NDx9TuEdGyDKDn7uxGtVckQMmaObHIMWxp9yqSLFWWP5tQVlQuUACgdlAuUC5QKCgtVT3INWDuCCRh+0/FB656OXY0B/Hd+3P6WrEem7oQNcwII3RDoghfADyQQvrDoggfUHRBA+n4IIH0/hQV30/BBA+n4IIH1OWOCCrPp8cgxJE13gW5QYt7ZHSbee0pxgnm1uFdjnr3o2pvyatiWI9DxCbHP3fR9qkGTA+OYfkVdjCt6FqlMkTUpgBzDchNjOLXNOHBzT0cMIBAoKC3UPcmxqwngECdpiRB6nsNLO3Q/s43OaZScj5BYj2BAIGkIELUDSxA0xoGOiQRuh8EETq2eSCF9TwQQvp55IK76eeSCB9PwQV30z0QQPqn+iqK8lMO4OYD80GZc2eoWwRPUjdnnhBgXvR3pU3tQNkgPwu4JsYF30a22ZNO0x46PGEGc3YrXYHY9UEg6scCg0aeyGtSkN9V7Pxe8BUdFpHo4BlEmq2d5o49lFwz8ypI9Fp14alaOvXiayKMYa0DuCDr1AIBAIBAmEBhA0tQIY0DTGgY6MIIzCEEbq46eSCJ9UHl5IIHUx08kED6fh5IIH0vDyQQupeHkgYafh5IE9VQPZBhBKyIg9yCdsfBB0yAQCAQCAQCAQCBMIDdQJuhAhYEDTGgYYvBAwwjmEDHQDPcgidXB5II3VR0QMNUdECerAckCiDwQL2CDZQCAQCAQCAQCAQCAQCAQCAQNIQIQEDSAgaQEDSAgQtCBpaAgXdCD/9k=",
        "numInStock": 10,
        "companyId": 17728
    });
    const [companyData, setCompanyData] = useState({
        "name": "Belkin",
        "url": "http://www.belkin.com/",
        "country": "United States",
        "_id": 16384
    });

    // useEffect(() => {
    //     fetch(`/api/get-item/${itemId}`)
    //     .then(res => res.json())
    //     .then(data => setItemData(data.data));
    // }, []);

    // useEffect(() => {
    //     fetch(`/api/get-company/${itemData.companyId}`)
    //     .then(res => res.json())
    //     .then(data => setCompanyData(data.data));
    // }, []);

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
            <h1>{itemData.name}</h1>
            <h2>{itemData.price}</h2>
            <img src={itemData.imageSrc} alt={itemData.name}/>
            <button onClick={handleClick}>Add To Cart</button>
            <h3>Seller: </h3>
            <p>{companyData.name}</p>
            <a href={companyData.url}>{companyData.url}</a>
            <p>Country: {companyData.country}</p>
        </>


    )
}

export default Item;
