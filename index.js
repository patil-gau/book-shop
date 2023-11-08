//npm module
const express = require("express");
require("dotenv").config();

//app modules
const connectToDB = require("./database/connection");

const port = process.env.PORT || 3000;

//create a express app
const app = express();

//make db Connection
connectToDB();

app.get("/", (req, res) => res.send("Welcome to Book Shop"));

app.listen(port, () => console.log(`Book Shop App Running on PORT ${port}!`));
