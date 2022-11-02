import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const todoList: Map<string, string> = new Map();

interface Todo {
    id?: string,
    description?: string
}

// Greetings
app.get('/', (req: Request, res: Response) => {
    res.send(`Welcome to Simple Todo List.`);
});

// Get all todos
app.get('/todo', (req: Request, res: Response) => {
    const todos: Array<Todo> = [];
    todoList.forEach((value, key) => {
        todos.push({
            id: key,
            description: value
        });
    });
    res.status(200).json(todos);
});

// Get a todo by id
app.get('/todo/:id', (req: Request, res: Response) => {
    const id: string = req.params.id;
    if (!todoList.has(id)) {
        res.status(400).json({error: `Todo with ID ${id} not found.`});
        return;
    }
    const todo: Todo = {
        id: id,
        description: todoList.get(id)
    };
    res.status(200).json(todo);
});

// Create a new todo
app.post('/todo', (req: Request, res: Response) => {
    const { description } = req.body;
    if (typeof description !== "string") {
        res.status(400).json({error: `You have to provide the description of the Todo.`});
        return;
    }
    const id: string = uuidv4();
    todoList.set(id, description);
    const todo: Todo = {
        id: id,
        description: description
    };
    res.status(201).json(todo);
});

// Update an existing todo
app.patch('/todo/:id', (req: Request, res: Response) => {
    const id: string = req.params.id;
    if (!todoList.has(id)) {
        res.status(400).json({error: `Todo with ID ${id} not found.`});
        return;
    }
    const { description } = req.body;
    if (typeof description !== "string") {
        res.status(400).json({error: `You have to provide the description of the Todo.`});
        return;
    }
    todoList.set(id, description);
    res.sendStatus(204);
});

// Delete a todo
app.delete('/todo/:id', (req: Request, res: Response) => {
    const id: string = req.params.id;
    if (!todoList.has(id)) {
        res.status(400).json({error: `Todo with ID ${id} not found.`});
        return;
    }
    todoList.delete(id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
