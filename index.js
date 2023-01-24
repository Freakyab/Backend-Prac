const express = require("express");
const cors = require("cors");
const Psignup = require("./Patient/signup");
const Plogin = require("./Patient/login");
const PatientData = require("./Patient/patientData");
const returnData = require("./Patient/returnData");

const Dsignup = require("./Doctor/signup");
const Dlogin = require("./Doctor/login");
const GetData = require("./Doctor/getData");
const Edit = require("./Doctor/Edit");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  return res.status(200).send("Working");
});

app.use("/patient/signup", Psignup);
app.use("/patient/login", Plogin);
app.use("/patient/patientData", PatientData);
app.use("/patient/returnData", returnData);

app.use("/doctor/signup", Dsignup);
app.use("/doctor/login", Dlogin);
app.use("/doctor/getData", GetData);
app.use("/doctor/Edit", Edit);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
