// For qrCode
// Require modules
const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
const fetchData = require("../fetchData");
require("dotenv").config();

//connect to mongodb database
const client = new MongoClient(process.env.DB_URL, {
    useUnifiedTopology: true,
});

async function createData(client, DBname, collectionName, userID, addID) {
    await client.connect();
    const db = client.db(DBname);
    const collection = await db.collection(collectionName);
    key = [ObjectId(addID)]
    collection.updateOne({ _id: ObjectId(userID) }, { $set: { key: key } });

}

//get request
router.get("/", async (req, res) => {
    try {
        id = req.query.userID,
        addID = req.query.addID;
        const data = await fetchData.Getkey(client, "Hackthon", "DocData", id);
        if (data.length === 0) {
            createData(client, "Hackthon", "DocData", id, addID);
        } else {
            data.push(addID);
            await client.connect();
            const db = client.db("Hackthon");
            const collection = await db.collection("DocData");
            collection.updateOne({ _id: ObjectId(id) }, { $set: { key: data } });
        }
        console.log(data);
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);

    }
});

module.exports = router;
