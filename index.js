const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();

//enable JSON data processing
app.use(express.json());

//enable CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function main() {
  app.get("/", async function (req, res) {
    res.json({
      message: "default entry message",
    });
  });
  app.get("/api/persondata", async function (req, res) {
    try {
      const data = fs.readFileSync("./data/data.json", "utf8");
      res.status(200);
      res.json(JSON.parse(data));
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/updatedata", async function (req, res) {
    try {
      const newData = req.body;
      fs.writeFileSync("./data/data.json", JSON.stringify(newData));
      res.status(200);
      res.json({
        message: "The user record has been updated successfully",
      });
    } catch (e) {
      console.log(e);
      res.status(406);
      res.json({
        message: "not acceptable, wrong sex info",
      });
    }
  });
}

main();

app.listen(5000, function () {
  console.log("Server has started");
});
