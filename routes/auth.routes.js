import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up',  async (req, res) => res.send("Sign up"));

authRouter.post('/sign-in',  async (req, res) => res.send("Sign in"));

authRouter.post('/sign-out',  async (req, res) => res.send("Sign out"));

export default authRouter;