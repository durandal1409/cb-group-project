const { MongoClient, ObjectId } = require("mongodb");
const data = require("./data/items.json");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport2 = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("GroupProject");
    const collection = db.collection("BodyLocation");
    // This part gets the body key from the data.json and sends it to the bodylocation collection //
    const bodyLocations = data.map(({ body_location }) => ({
      _id: new ObjectId(),
      name: body_location,
    }));

    const result1 = await collection.insertMany(bodyLocations);

    console.log(
      `${result1.insertedCount} documents were inserted into the collection`
    );
    // This part gets the category key from the data.json and sends it to the Categories collection //
    const categoryCollection = db.collection("Categories");
    const categories = data.map(({ category }) => ({
      name: category,
    }));
    const result2 = await categoryCollection.insertMany(categories);
    console.log(
      `${result2.insertedCount} documents were inserted into the collection`
    );
    // This part gets the price key from the data.json and sends it to the Prices collection //
    const PriceCollection = db.collection("Prices");
    const prices = data.map(({ price }) => ({
      cost: price,
    }));
    const result3 = await PriceCollection.insertMany(prices);
    console.log(
      `${result3.insertedCount} documents were inserted into the collection`
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

batchImport2();
