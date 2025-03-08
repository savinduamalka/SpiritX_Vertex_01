import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import cors from 'cors';
import userRouter from "./routes/userRoutes.js";
import User from "./models/userModel.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } else {
    next();
  }
});

app.use('/api/users', userRouter);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log("Connected to MongoDB");

    // Remove the confirmPassword index if it exists
    try {
        await User.collection.dropIndex("confirmPassword_1");
        console.log("confirmPassword index removed");
    } catch (err) {
        if (err.code === 27) {
            console.log("confirmPassword index does not exist");
        } else {
            console.error("Error removing confirmPassword index", err);
        }
    }
})
.catch((err) => console.error("Failed to connect to MongoDB", err));

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
