const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.set('view engine', 'ejs');
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;
const url = `mongodb+srv://${process.env.Mongo_USER}:${process.env.MONGO_PASSWORD}@cluster0.6jqtncq.mongodb.net/studentdream?retryWrites=true&w=majority`;
mongoose.connect(url);
const conn = mongoose.connection;


conn.once("open", () => {
  console.log("Database connected successfully");
});
conn.on("error", (error) => {
  console.error("Error connecting to database:", error);
  process.exit();
});

const userRoute = require('./Routes/userRoute');
app.use(userRoute);
const requestRoute = require('./Routes/requestRoute');
app.use(requestRoute);
const donorrouter = require("./Routes/donor_route");
app.use(donorrouter);

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
