import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MongoDBURL, PORT } from "./config.js";
import router from "./routes/bookingRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

//connecting mongodb
mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

  app.use("/book", router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
