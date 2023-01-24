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

async function createData(client, DBname, collectionName,prescription ,pres,id) {
    await client.connect();
    const db = client.db(DBname);
    const collection = await db.collection(collectionName);
    // const ADDcollection = await db.collection(collectionName).aggregate().toArray();
    data = prescription.toString().concat("\n"+pres.toString());
    collection.updateOne({ _id: ObjectId(id) }, { $set: { prescription: data } });
    return data;
}

//get request
router.get("/", async (req, res) => {
    try {
        const pres = req.query.pres;
        const id = req.query.userID;
        const patientID = req.query.patientID;

        flag = 0;
        const data = await fetchData.Getkey(client, "Hackthon", "DocData", id);
        data.map((e)=>{
            if(e.toString() === patientID){
                flag = 1;
            }
        })
        if (flag === 1) {
            prescription = await fetchData.GetData(client, "Hackthon", "PatientData", patientID);
            display = createData(client, "Hackthon", "PatientData", prescription,pres, patientID);
        }
        res.status(200).json(display);
    }
    catch (error) {
        console.error(error);

    }
});

module.exports = router;
