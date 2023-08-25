import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";



//configurations
const app = express();
const PORT = process.env.PORT || 8080;
const jsonParser = bodyParser.json();
dotenv.config();
app.use(cors());
app.use(express.json());


//routes
app.use("/auth", jsonParser, authRoutes);

// Connection to DB & PORT
try {
  mongoose.connect(process.env.MONGO_URL).then(
    app.listen(PORT, () => {
      console.log("Mongoose connection successful");
      console.log(`Listening on port ${PORT}`);
    })
  );
} catch (error) {
  console.log(error);
}
