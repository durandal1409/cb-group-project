"use strict";

const { MongoClient} = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

//this function adds an item to the cart collection with the user's email address 
const addToCart = async (req,res) => {
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
    const stockParsed = stockAmount[0].numInStock;

    //these variables find if there is already a same _id value in the cart
    const idExists = await db.collection("Cart").find({_id: _id}).project({"numToBuy":0, "userEmail":0}).toArray();
    const idExistsParsed = idExists[0]._id;

    //these variables find the number to buy value from items in the cart
    const cartNumToBuy = await db.collection("Cart").find({_id: _id}).project({"_id":0, "userEmail":0}).toArray();
    const cartNumParsed = cartNumToBuy[0].numToBuy;

    //before adding the items to the cart collection, we need to check if we have enough inventory to supply the request
    if(isNaN(numToBuy) === true){
      res.status(500).json({ status: 500, data: {unparsedId, unparsedNumToBuy}, message: "Make sure the requested amount is a number" });
    }

    else if(numToBuy > stockParsed || (stockParsed - numToBuy) < 0 ){
      res.status(500).json({ status: 500, data: {Buying : numToBuy, Stock: stockParsed}, message: "The stock is too low to accomodate this request" });
    }
    //we also check if the item exists already in the cart. if it does, we simply update the quantity while checking it does not exceed the total stock
    else if(idExistsParsed === _id){
      if((stockParsed-numToBuy-cartNumParsed) < 0){
        res.status(500).json({ status: 500, data: {InCart: cartNumParsed, Buying : numToBuy, Stock: stockParsed}, message: "The stock is too low to accomodate this request" });
      }
      else{
        const updateResult = await db.collection("Cart").updateOne({_id: _id},{$set:{"_id":_id, "userEmail":userEmail},$inc:{"numToBuy":numToBuy}});
        res.status(201).json({ status: 201, data: newSet.$set, message: "Item quantity updated in Cart!" });
      }
    }
    //if all checks pass the cart has a new document
    else{
      const result = await db.collection("Cart").insertOne(newSet.$set);
      res.status(201).json({ status: 201, data: newSet.$set, message: "Item added to Cart!" });
    }


  }catch(err){
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

};

module.exports = {addToCart};