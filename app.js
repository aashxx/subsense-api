import express from 'express';
import { PORT } from './config/env.js';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
// import arcjetMiddleware from "./controllers/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(arcjetMiddleware);
app.use(errorMiddleware);

app.use('/api/v1/auth',  authRouter);
app.use('/api/v1/user',  userRouter);
app.use('/api/v1/subscription',  subscriptionRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT,  async () => {
    console.log(`API Listening on http://localhost:${PORT}`);
    await connectDatabase();
});