import express, { Request, Response } from 'express';
import { TodoList } from '../todoList';

const router = express.Router();
const todoList = new TodoList();

router.route('/')
    // Get all todos
    .get((req: Request, res: Response) => {
        const list = todoList.list();
        res.status(200).json(list);
    })

    // Create a new todo
    .post((req: Request, res: Response) => {
        const { description } = req.body;
        try {
            const todo = todoList.add(description as string);
            res.status(201).json(todo);
        } catch (e: any) {
            res.status(400).json({ error: e });
        }
    });
    
router.route('/:id')
    // Get a todo by id
    .get((req: Request, res: Response) => {
        const id: string = req.params.id;
        try {
            const todo = todoList.read(id);
            res.status(200).json(todo);
        } catch (e: any) {
            res.status(400).json({ error: e });
        }
    })

    // Update an existing todo
    .patch((req: Request, res: Response) => {
        const id: string = req.params.id;
        const description: string = req.body.description;
        try {
            const todo = todoList.update(id, description);
            res.status(200).json(todo);
        } catch (e: any) {
            res.status(400).json({ error: e });
        }
    })

    // Delete a todo
    .delete((req: Request, res: Response) => {
        const id: string = req.params.id;
        try {
            todoList.remove(id);
            res.sendStatus(204);
        } catch (e: any) {
            res.status(400).json({ error: e });
        }
    });

export default router;