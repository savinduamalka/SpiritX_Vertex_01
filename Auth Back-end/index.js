import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB", err));

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
