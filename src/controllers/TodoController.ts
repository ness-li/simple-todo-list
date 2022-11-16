import { Request, Response } from 'express';
import { TodoService } from '../services/TodoService';

const todoService = new TodoService();

export async function listTodo(req: Request, res: Response) {
    try {
        const todos = await todoService.list();
        return res.status(200).json(todos);
    } catch (e: any) {
        res.status(400).send(e);
    }
}

export async function createTodo(req: Request, res: Response) {
    const { description } = req.body;

    try {
        const todo = await todoService.create(description);
        return res.status(201).json(todo);
    } catch (e: any) {
        res.status(400).send(e);
    }
}

export async function readTodo(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const todo = await todoService.read(id);
        res.status(200).json(todo);
    } catch (e: any) {
        res.status(400).json({ error: e });
    }
}

export async function updateTodo(req: Request, res: Response) {
    const { id } = req.params;
    const { description } = req.body;

    try {
        todoService.update(id, description);
        res.sendStatus(204);
    } catch (e: any) {
        res.status(400).json({ error: e });
    }
}

export async function deleteTodo(req: Request, res: Response) {
    const { id } = req.params;

    try {
        todoService.remove(id);
        res.sendStatus(204);
    } catch (e: any) {
        res.status(400).json({ error: e });
    }
}