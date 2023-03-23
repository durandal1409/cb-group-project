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
  const unparsedId = req.body._id;
  const _id = parseInt(unparsedId);
  let unparsedNumToBuy = req.body.numToBuy;
  let numToBuy = parseInt(unparsedNumToBuy);
  const userEmail = "JimmyBuyMore@realcustomer.ca"; 

  let newSet = {$set:{_id, numToBuy, userEmail}};

  try{
    await client.connect();
    const db = client.db("GroupProject");

    //these variables find the stock value of the item according to its ID
    const stockAmount = await db.collection("Items").find({_id: _id}).project({"_id":0, "name":0, "price":0, "body_location":0, "category":0, "imageSrc":0,"companyId":0}).toArray();

    //these variables find if there is already a same _id value in the bought items 
    const idExists = await db.collection("BoughtItems").find({_id: _id}).project({"numToBuy":0, "userEmail":0}).toArray();


  
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
      const idExistsParsed = idExists[0]._id;

      if((stockParsed-numToBuy) < 0){
        res.status(500).json({ status: 500, data: {InCart: numToBuy, Stock: stockParsed}, message: "The stock is too low to accomodate this request" });
      }
      else{
        const updateResult = await db.collection("BoughtItems").updateOne({_id: _id},{$set:{"_id":_id, "userEmail":userEmail},$inc:{"numBought":numToBuy}});
        const itemQuant = await db.collection("Items").updateOne({_id: _id},{$set:{"numInStock": (stockParsed - numToBuy) }})
        res.status(201).json({ status: 201, data: newSet.$set, message: "Item quantity updated in the Bought Category!" });
      }
    }
    //if all checks pass the boughtItems has a new document and the quantity of the item in the Items collection is reduced by the appropriate amount
    else{

      const stockParsed = stockAmount[0].numInStock;

      const result = await db.collection("BoughtItems").insertOne(newSet.$set);
      const confirmationResult = await db.collection("Confirmation").insertOne(newSet.$set);
      const renamedResult = await db.collection("BoughtItems").updateOne({_id:_id},{$rename:{"numToBuy":"numBought"}})
      const itemQuant = await db.collection("Items").updateOne({_id: _id},{$set:{"numInStock": (stockParsed - numToBuy) }})
      res.status(201).json({ status: 201, data: newSet.$set, message: "Item bought!" });
    }


  }catch(err){
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {addToBoughtItems};