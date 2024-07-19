const express = require("express");
const app = express();
const mongoose = require("mongoose");
const AppRouter = require("./Router/AppRouter");

const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error));

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", AppRouter);

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 8082;
app.listen(PORT, HOST);
console.log(`Server is Running on http://${HOST}:${PORT}`);
