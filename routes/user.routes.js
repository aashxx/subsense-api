import { Router } from 'express';
import {getUser, getUsers} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', async (req, res) => {});

userRouter.put('/:id', async (req, res) => {});

userRouter.delete('/:id', async (req, res) => {});

export default userRouter;