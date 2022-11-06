import express, { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
    id?: string,
    description?: string
}

const router: Router = express.Router();
const todoList: Map<string, string> = new Map();

// Get all todos
router.get('/', (req: Request, res: Response) => {
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
router.get('/:id', (req: Request, res: Response) => {
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
router.post('/', (req: Request, res: Response) => {
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
router.patch('/:id', (req: Request, res: Response) => {
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
router.delete('/:id', (req: Request, res: Response) => {
    const id: string = req.params.id;
    if (!todoList.has(id)) {
        res.status(400).json({error: `Todo with ID ${id} not found.`});
        return;
    }
    todoList.delete(id);
    res.sendStatus(204);
});

export default router;