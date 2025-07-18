import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {JWT_EXPIRY, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.status = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

        await session.commitTransaction();
        await session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers[0]
            }
        });
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if(!isPasswordValid) {
            const error = new Error("Invalid password");
            error.status = 401;
            throw error;
        }

        const token = jwt.sign({  userId: user?.id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

        res.status(200).json({
            success: true,
            message: 'User authenticated successfully',
            data: {
                token,
                user
            }
        })

    } catch (error) {
        next(error);
    }
}

export const signOut = (req, res, next) => {

}