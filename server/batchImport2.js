const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const batchImport2 = async () =>{
    const client = new MongoClient(MONGO_URI, options);


  }




  batchImport2()