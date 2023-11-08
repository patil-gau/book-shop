//npm module
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

//app modules
const connectToDB = require("./database/connection");
const routes = require("./routes");
const limiter = require("./services/rate-limiter");

const port = process.env.PORT || 3000;

//create a express app
const app = express();

//set a rate time to stop bruteforce attacks
app.use(limiter);
app.use(express.json());

//make db Connection
connectToDB();

app.get("/", (req, res) => res.send("Welcome to Book Shop"));
app.use("/api/v1", routes);

app.listen(port, () => console.log(`Book Shop App Running on PORT ${port}!`));
