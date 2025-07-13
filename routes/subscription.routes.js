import { Router } from 'express';
import { createSubscription, getSubscription, getSubscriptions, getUserSubscriptions } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.get('/', getSubscriptions);
subscriptionRouter.get('/:id', getSubscription);
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id',  async (req, res) => {});

subscriptionRouter.delete('/:id',  async (req, res) => {});

subscriptionRouter.put('/cancel/:id',  async (req, res) => {});

subscriptionRouter.get('/upcoming-renewals',  async (req, res) => {});

export default subscriptionRouter;