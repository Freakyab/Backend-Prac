// For qrCode
// Require modules
const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
const fetchData = require("../fetchData");
require ("dotenv").config();

//connect to mongodb database
const client = new MongoClient(process.env.DB_URL, {
    useUnifiedTopology: true,
});

//get request
router.get("/", async (req, res) => {
    try {
        username = req.query.username;
        const id = await fetchData.GetID(client,"Hackthon","AccountData",username);
        res.json({id: id });
    }
    catch (error) {
        console.error(error);

    }
});

module.exports = router;
