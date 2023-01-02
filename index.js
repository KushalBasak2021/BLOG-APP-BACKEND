import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import path from "path";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to mongodb server"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res, next) => {
  res.status(200).json("File has been uploaded");
});

// MIDDLEWARES
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoryRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000, () => console.log("Server listening on port 5000"));
