"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

//this function deletes a specific cart item 
const deleteCartItem = async (req,res) => {
  const client = new MongoClient(MONGO_URI,options);
  const unparsedId = req.body._id;
  const _id = parseInt(unparsedId);
  const userEmail = "JimmyBuyMore@realcustomer.ca"; 

  try{
    await client.connect();
    const db = client.db("GroupProject");
    //we need to check if the item ID exists in the cart, if not, inform the front end
    if((await db.collection("Cart").countDocuments({_id: _id}, {limit:1})) !== 1){
      res.status(500).json({status:500, data: _id , message: `This item ID is not contained in the cart from user: ${userEmail}!`});
    }
    //else we delete the document with the correct item ID and useremail to attribute who needs their document deleted
    else{
      const result = await db.collection("Cart").deleteOne({_id:_id, userEmail: userEmail});
      res.status(200).json({status:200, data: _id , message: "Cart item deleted successfully!"});
    }
  }catch(err){
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {deleteCartItem};