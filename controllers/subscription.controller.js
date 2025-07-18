import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user:  req.user._id,
        });

        await session.commitTransaction();
        await session.endSession();

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflow/subscription/reminders`,
            body: {
                subscriptionId: subscription.id
            },
            headers: {
                'content-type': 'application/json'
            },
            retries: 0
        });

        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: {
                subscription,
                workflowRunId
            }
        })
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
}

export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();

        res.status(200).json({
            success: true,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
}

export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if(!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id) {
            const error = new Error("You are not the owner of this subscription");
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });
        if(subscriptions.length === 0) {
            const error = new Error("You have not subscribed");
            error.status = 401;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subscriptions
        })
    } catch (error) {
        next(error);
    }
}