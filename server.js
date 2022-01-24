require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./database.config");
const cors = require("cors");
const port = "5000";
const app = express();
app.use(bodyParser.json());

mongoose
  .connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use(express.json());
app.use(cors());

app.use("/api/calendar", require("./Controllers/CalendarController"));
app.use("/api/users", require("./routes/userRouter"));

app.listen(process.env.PORT || port, () =>
  console.log("server running on", port)
);
