import mongoose from "mongoose";
import User from "../models/userModel.js";
import { error } from "console";

export const signup = async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (username.length < 8) {
        return res.status(400).json({ message: "Username must be at least 8 characters long" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one lowercase letter, one uppercase letter, and one special character" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        const newUser = new User({ username, password, confirmPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
