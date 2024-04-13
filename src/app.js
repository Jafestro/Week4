import express from 'express';
import cors from 'cors';
import catRouter from './api/routes/cat-router.js';
import userRouter from './api/routes/user-router.js';
import authRouter from './api/routes/auth-router.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/cats', catRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/auth', authRouter);

export default app;
