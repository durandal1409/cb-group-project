# Backend

## Endpoints

This project uses all the endpoints below:

```js
.get("/api/get-items", getItems)
.get("/api/get-item/:item", getItem)
.get("/api/get-companies", getCompanies)
.get("/api/get-company/:company", getCompany)
.get("/api/get-company-items/:company", getCompanyItems)
.get("/api/get-cart/:useremail", getCart)
.get("/api/get-bought-items/:useremail", getBoughtItems)
.get("/api/get-confirmation", getConfirmation)

.post("/api/add-to-cart", addToCart)
.post("/api/add-to-bought-items", addToBoughtItems)

.patch("/api/update-cart", updateCart)

.delete("/api/delete-cart-item", deleteCartItem)
.delete("/api/delete-bought-item", deleteBoughtItem)
.delete("/api/delete-confirmation", deleteConfirmation)
```

There will be a list of all the expected bodies these endpoints should receive as well as the outpout of each of them. It is important to pay attention to the keys as some of them will change throughout the process.

## .GET
---
## Items

### /api/get-items

**_Output_**
```
{
    "status": 200,
    "data":[
        {
            "_id": 6543,
            "name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
            "price": "$49.99",
            "body_location": "Wrist",
            "category": "Fitness",
            "imageSrc": "data:image......."
            "numInStock": 9,
            "companyId": 19962
        },
        {
            "_id": 6544,
			"name": "Belkin GS5 Sport Fit Armband, Black F8M918B1C00",
			"price": "$24.99",
			"body_location": "Arms",
			"category": "Fitness",
            "imageSrc": "data:image......."
            "numInStock": 9,
			"companyId": 16384
        },
        {...},{...}, ...
    ]

}
```
### /api/get-item/:item (example :item = 6543)
**_Output_**
```
{
    "status": 200,
    "data":{
            "_id": 6543,
            "name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
            "price": "$49.99",
            "body_location": "Wrist",
            "category": "Fitness",
            "imageSrc": "data:image......."
            "numInStock": 9,
            "companyId": 19962
    }
}
```

### /api/get-company-items/:company (example :company = 13334)
**_Output_**
```
{
    "status": 200,
    "data":[
        {
            "_id": 6546,
			"name": "Casio G Shock Watch Solar Atom (gwm500a-1)",
			"price": "$67.62",
			"body_location": "Wrist",
			"category": "Lifestyle",
            "imageSrc": "data:image......."
            "numInStock": 0,
            "companyId": 13334
        },
        {
            "_id": 6547,
			"name": "Casio WS220 Solar Runner Digital Wrist Watch; Navy Blue",
			"price": "$39.99",
			"body_location": "Wrist",
			"category": "Lifestyle",
            "imageSrc": "data:image......."
            "numInStock": 6,
			"companyId": 13334
        },
        {...},{...}, ...
    ]

}
```

## Companies

### /api/get-companies
**_Output_**
```
{
	"status": 200,
	"data": [
		{
			"_id": 19962,
			"name": "Barska",
			"url": "http://www.barska.com/",
			"country": "United States"
		},
		{
			"_id": 16384,
			"name": "Belkin",
			"url": "http://www.belkin.com/",
			"country": "United States"
		},
		{
			"_id": 11385,
			"name": "Bowflex",
			"url": "http://www.bowflex.com/",
			"country": "United States"
		}, {...}, ...
    ]
}
```
### get-company/:company (Example :company = 19962)
**_Output_**
```
{
	"status": 200,
	"data": {
		"_id": 19962,
		"name": "Barska",
		"url": "http://www.barska.com/",
		"country": "United States"
	},
	"message": "Company list found!"
}
```

## Cart

### /api/get-cart/:useremail
The useremail value is hardcoded as JimmyBuyMore@realcustomer.ca for this project, simulating a single logged in user. In a more complex project, a more secure user ID would be used as a parameter

**_Output_**
```
{
	"status": 200,
	"data": [
		{
			"_id": "e70d5c3f-179c-4097-ae23-b73c43faec6c",
			"itemId": 6543,
			"name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
			"price": "$49.99",
			"numToBuy": 1,
			"numInstock": 9,
			"userEmail": "JimmyBuyMore@realcustomer.ca"
		},
		{
			"_id": "abcc87a7-0557-4c09-848f-4576a8f18d14",
			"itemId": 6544,
			"name": "Belkin GS5 Sport Fit Armband, Black F8M918B1C00",
			"price": "$24.99",
			"numToBuy": 1,
			"numInstock": 9,
			"userEmail": "JimmyBuyMore@realcustomer.ca"
		}
	],
	"message": "Cart list for user JimmyBuyMore@realcustomer.ca found!"
}
```
## Confirmation

### /api/get-confirmation

The numToBuy value is changed here for numBought, as to more accurately reflect that this value has been substracted from the appropriate numInstock value in the Items collection

**_Output_**
```
{
	"status": 200,
	"data": [
		{
			"_id": "e70d5c3f-179c-4097-ae23-b73c43faec6c",
			"itemId": 6543,
			"name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
			"price": "$49.99",
			"numInStock": 8,
			"userEmail": "JimmyBuyMore@realcustomer.ca",
			"numBought": 1
		}
	],
	"message": "Confirmation of last order for user JimmyBuyMore@realcustomer.ca found!"
}
```
## Bought Items

### /api/get-bought-items/:useremail

The numToBuy value is changed here for numBought, as to more accurately reflect that this value has been substracted from the appropriate numInstock value in the Items collection

**_Output_**
```
{
	"status": 200,
	"data": [
		{
			"_id": "e70d5c3f-179c-4097-ae23-b73c43faec6c",
			"itemId": 6543,
			"name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
			"price": "$49.99",
			"numInStock": 8,
			"userEmail": "JimmyBuyMore@realcustomer.ca",
			"numBought": 1
		}
	],
	"message": "Bought list for user JimmyBuyMore@realcustomer.ca found!"
}
```

The Confirmation and BoughtItems collections differ in that the BoughtItems collection is a database of all items purchased by a user, while the Confirmation collection simply contains the latest order.

# .POST

## Cart
### /api/add-to-cart
**_Input_**
```
{
	"_id": "6543",
	"numToBuy": "1",
	"userEmail": "JimmyBuyMore@realcustomer.ca"
}
```
**_Output_** 

the inputted **__id_** as **_itemId_** and adds a **_UUID_** for the new **__id_** value
```
{
	"status": 201,
	"data": {
		"_id": "e70d5c3f-179c-4097-ae23-b73c43faec6c",
		"itemId": 6543,
		"name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
		"price": "$49.99",
		"numToBuy": 1,
		"numInstock": 9,
		"userEmail": "JimmyBuyMore@realcustomer.ca"
	},
	"message": "Item added to Cart!"
}
```
## Bought Items / Confirmation
### /api/add-to-bought-items
This endpoint adds the cart item to both the BoughtItems collection and the Confirmation collection. Both outputs are identical. 

Once an item is bought, it is also automatically removed from the cart and the quantities are adjusted in the Items collection

**_Input_**
```
{
    "_id": "e70d5c3f-179c-4097-ae23-b73c43faec6c",
    "itemId": 6543,
    "numToBuy": 1,
    "userEmail": "JimmyBuyMore@realcustomer.ca"
}
```

**_Output_**
```
{
	"status": 201,
	"data": {
		"_id": "e70d5c3f-179c-4097-ae23-b73c43faec6c",
		"itemId": 6543,
		"name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
		"price": "$49.99",
		"numToBuy": 1,
		"numInStock": 8,
		"userEmail": "JimmyBuyMore@realcustomer.ca"
	},
	"message": "Item bought!"
}
```

# .PATCH

## Cart

### /api/update-cart
This endpoint lets us update the quantity of "numToBuy" for a certain item in the cart

**_Input_**
```
{
    "_id": "abcc87a7-0557-4c09-848f-4576a8f18d14",
    "itemId": 6544,
    "numToBuy": 3,
}
```
**_Output_**
```
{
	"status": 200,
	"data": {
		"_id": "abcc87a7-0557-4c09-848f-4576a8f18d14",
		"itemId": 6544,
		"numToBuy": 3,
		"userEmail": "JimmyBuyMore@realcustomer.ca"
	},
	"message": "Item quantity updated in Cart!"
}
```

# .DELETE

## Cart
### /api/delete-cart-item

**_Input_**
```
{
    "_id": "abcc87a7-0557-4c09-848f-4576a8f18d14",
    "itemId": 6544,
    "numToBuy": 3,
}
```
**_Output_**
```
{
	"status": 200,
	"data": "abcc87a7-0557-4c09-848f-4576a8f18d14",
	"message": "Cart item deleted successfully!"
}
```

## Bought Items
### /api/delete-bought-item
---
**_WARNING:_** the value for the amount is **_numBought_** and not **_numToBuy_** for this endpoint!

---

Once a bought item is deleted, the quantity in the **_numBought_** is restored to the Items collection under the appropriate item

**_Input_**
```
{
    "_id": "e70d5c3f-179c-4097-ae23-b73c43faec6c",
    "itemId": 6543,
    "numBought": 1,
    "userEmail": "JimmyBuyMore@realcustomer.ca"
}
```
**_Output_**
```
{
	"status": 200,
	"data": "e70d5c3f-179c-4097-ae23-b73c43faec6c",
	"message": "Bought item deleted successfully!"
}
```

## Confirmation
### /api/delete-confirmation
This endpoint deletes all the items in the Confirmation collection. It will be ran before each purchase so that the Confirmation collection only contains the latest purchase

**_Output_**
```
{
	"status": 200,
	"data": {
		"acknowledged": true,
		"deletedCount": 1
	},
	"message": "All confirmation elements deleted successfully!"
}
```

