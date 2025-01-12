import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

import userRouter from "./routes/user.js";
import sellerRouter from "./routes/seller.js";
import subsRoutes from "./routes/subs.js";
import subssellerRoutes from "./routes/subsSeller.js";
import articlesRoutes from "./routes/articles.js";
import artworkRoutes from './routes/artworks.js';
import addWebhook from "./utils/Webhook.js";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/seller", sellerRouter);
app.use("/subs", subsRoutes);
app.use("/subsseller", subssellerRoutes);
app.use("/articles", articlesRoutes);
app.use('/artworks', artworkRoutes);

// add webhook
addWebhook(app);

const PORT = process.env.PORT || 5000;
// const CONNECTION_URL = 'mongodb+srv://cs691project:cs691project123@cluster0.pkauzdf.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
