import express from 'express';
import * as TodoController from '../controllers/TodoController';

const router = express.Router();

router.route('/')
    // Get all todos
    .get(TodoController.listTodo)

    // Create a new todo
    .post(TodoController.createTodo);
    
router.route('/:id')
    // Get a todo by id
    .get(TodoController.readTodo)

    // Update an existing todo
    .patch(TodoController.updateTodo)

    // Delete a todo
    .delete(TodoController.deleteTodo);

export default router;