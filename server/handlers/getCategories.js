"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const getCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject")
    const result = await db.collection("Categories").find().toArray();
    res.status(200).json({Categories: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Categories not found"})
  }
  client.close();
};

module.exports = { getCategories };
