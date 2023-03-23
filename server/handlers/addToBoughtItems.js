"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

const addToBoughtItems = async (req,res) => {
  const client = new MongoClient(MONGO_URI,options);

  //since the database uses ints and we might use strings elsewhere, the numbers are all parsed before being used
  const _id = req.body._id;
  const unparsedId = req.body.itemId;
  const itemId = parseInt(unparsedId);
  let unparsedNumToBuy = req.body.numToBuy;
  let numToBuy = parseInt(unparsedNumToBuy);
  const userEmail = "JimmyBuyMore@realcustomer.ca"; 


  try{
    await client.connect();
    const db = client.db("GroupProject");

    //these variables find the stock, name and price value of the item according to its ID
    const stockAmount = await db.collection("Items").find({_id: itemId}).project({"_id":0, "name":0, "price":0, "body_location":0, "category":0, "imageSrc":0,"companyId":0}).toArray();
    const nameValue = await db.collection("Items").find({_id: itemId}).project({"_id":0, "numInStock":0, "price":0, "body_location":0, "category":0, "imageSrc":0,"companyId":0}).toArray();
    const priceValue = await db.collection("Items").find({_id: itemId}).project({"_id":0, "name":0, "numInStock":0, "body_location":0, "category":0, "imageSrc":0,"companyId":0}).toArray();

    //these variables find if there is already a same itemId value in the bought items 
    const idExists = await db.collection("BoughtItems").find({itemId: itemId}).project({"numToBuy":0, "userEmail":0}).toArray();

    //these variables find if there is already a same itemId value in the confirmation 
    const idExistsConf = await db.collection("Confirmation").find({itemId: itemId}).project({"numToBuy":0, "userEmail":0}).toArray();



    //before adding the items to the bought items collection, we need to check if we have enough inventory to supply the request
    if(isNaN(numToBuy) === true){
      res.status(500).json({ status: 500, data: {unparsedId, unparsedNumToBuy}, message: "Make sure the requested amount is a number" });
    }
    //checking if the item ID returns an item or not
    else if (stockAmount.length === 0) {
      res.status(500).json({ status: 500, data: {itemId: unparsedId}, message: "Make sure the item ID is correct!" });
    }
    //checking if the stock is lower than the asked amount
    else if(numToBuy > stockAmount[0].numInStock || (stockAmount[0].numInStock - numToBuy) < 0 ){
      res.status(500).json({ status: 500, data: {Buying : numToBuy, Stock: stockAmount[0].numInStock}, message: "The stock is too low to accomodate this request" });
    }
    //we also check if the item exists already in bought items. if it does, we simply update the quantity while checking it does not exceed the total stock
    else if(idExists.length > 0 ){

      const stockParsed = stockAmount[0].numInStock;
      const nameParsed = nameValue[0].name;
      const priceParsed = priceValue[0].price;
      const idExistsParsed = idExists[0].itemId;

      
      let newSet = {$set:{itemId, name:nameParsed, price: priceParsed, numToBuy, numInStock: (stockParsed - numToBuy), userEmail}};

      if(idExistsConf.length > 0){
        const updateResult = await db.collection("BoughtItems").updateOne({itemId: itemId},{$set:{"itemId":itemId, "userEmail":userEmail},$inc:{"numBought":numToBuy}});
      const confirmationResult = await db.collection("Confirmation").updateOne({itemId: itemId},{$set:{"numBought":numToBuy, "userEmail":userEmail}});
      const renamedResultBought = await db.collection("BoughtItems").updateOne({itemId:itemId},{$rename:{"numToBuy":"numBought"}});
      const renamedResultConfirmation = await db.collection("Confirmation").updateOne({itemId:itemId},{$rename:{"numToBuy":"numBought"}});
      const itemQuant = await db.collection("Items").updateOne({_id: itemId},{$set:{"numInStock": (stockParsed - numToBuy) }});
      const deleteFromCart = await db.collection("Cart").deleteOne({itemId: itemId, userEmail:userEmail});
        res.status(201).json({ status: 201, data: newSet.$set, message: "Item quantity updated in the Bought Category!" });
      }
      else{
        const updateResult = await db.collection("BoughtItems").updateOne({itemId: itemId},{$set:{"itemId":itemId, "userEmail":userEmail},$inc:{"numBought":numToBuy}});
        const confirmationResult = await db.collection("Confirmation").insertOne(newSet.$set);
        const renamedResultBought = await db.collection("BoughtItems").updateOne({itemId:itemId},{$rename:{"numToBuy":"numBought"}});
        const renamedResultConfirmation = await db.collection("Confirmation").updateOne({itemId:itemId},{$rename:{"numToBuy":"numBought"}});
        const itemQuant = await db.collection("Items").updateOne({_id: itemId},{$set:{"numInStock": (stockParsed - numToBuy) }});
        const deleteFromCart = await db.collection("Cart").deleteOne({itemId: itemId, userEmail:userEmail});
        res.status(201).json({ status: 201, data: newSet.$set, message: "Item quantity updated in the Bought Category!" });
      }
    }
    //if all checks pass the boughtItems has a new document and the quantity of the item in the Items collection is reduced by the appropriate amount
    else{

      const stockParsed = stockAmount[0].numInStock;
      const nameParsed = nameValue[0].name;
      const priceParsed = priceValue[0].price;

      let newSet = {$set:{_id, itemId, name:nameParsed, price: priceParsed, numToBuy, numInStock: (stockParsed - numToBuy), userEmail}};

      const result = await db.collection("BoughtItems").insertOne(newSet.$set);
      const confirmationResult = await db.collection("Confirmation").insertOne(newSet.$set);
      const renamedResultBought = await db.collection("BoughtItems").updateOne({itemId:itemId},{$rename:{"numToBuy":"numBought"}});
      const renamedResultConfirmation = await db.collection("Confirmation").updateOne({itemId:itemId},{$rename:{"numToBuy":"numBought"}});
      const itemQuant = await db.collection("Items").updateOne({_id: itemId},{$set:{"numInStock": (stockParsed - numToBuy) }});
      const deleteFromCart = await db.collection("Cart").deleteOne({itemId: itemId, userEmail:userEmail});
      res.status(201).json({ status: 201, data: newSet.$set, message: "Item bought!" });
    }


  }catch(err){
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {addToBoughtItems};