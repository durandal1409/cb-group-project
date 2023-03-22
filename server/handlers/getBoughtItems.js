"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

// get the list of all items in the cart of the specific user, in this case the hardcoded JimmyBuyMore@realcustomer.ca
const getBoughtItems = async (req,res) => {
  const client = new MongoClient(MONGO_URI,options);
  const {useremail} = req.params;
  const query = useremail;

  try{
    await client.connect();
    const db = client.db("GroupProject");
    const result = await db.collection("BoughtItems").find({userEmail: query}).toArray()

    // if the request turns an empty array, it is presumed that the user in the params does not have a cart
    if(result.length === 0){
      res.status(500).json({ status: 500, data: query, message: "This user does not currently have bought items" });
    }
    //else all their items are returned
    else{
      res.status(200).json({ status: 200, data: result, message: `Bought list for user ${query} found!` });
    }

  }catch(err){
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {getBoughtItems};