async function GetID(client, DBname, collectionName, username) {
    var userID = false;
    await client.connect();
    const db = client.db(DBname);
    const collection = await db.collection(collectionName).aggregate().toArray();

    // get _id from database
    collection.find((e) => {
        if (e.userName === username) {
            userID = e._id;
        }
    });
    return userID;
}
async function GetData(client, DBname, collectionName, userID) {
    await client.connect();
    const db = client.db(DBname);
    const collection = await db.collection(collectionName).aggregate().toArray();

    var data = false;

    // get _id from database
    collection.find((e) => {
        if (e._id.toString() === userID.toString()) {
            data = e.prescription;
        }
    });
    return data;
}
async function Getkey(client, DBname, collectionName, userID) {
    await client.connect();
    const db = client.db(DBname);
    const collection = await db.collection(collectionName).aggregate().toArray();

    var data = false;

    // get _id from database
    collection.find((e) => {
        if (e._id.toString() === userID.toString()) {
            data = e.key;
        }
    });
    return data;
}
module.exports = { GetID , GetData,Getkey };