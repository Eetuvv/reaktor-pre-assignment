const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("src"));
app.use(cors());

//app.options("*", cors());

app.listen(port);
console.log("Server started at http://localhost:" + port);
