import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import todoRouter from './todoRouter';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use('/todo', todoRouter);

// Greetings
app.all('/', (req: Request, res: Response) => {
    res.status(200).send(`Welcome to Simple Todo List.`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
