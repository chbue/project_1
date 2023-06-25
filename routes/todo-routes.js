import express from 'express';
import { todoController } from '../controller/todo-controller.js';

const router = express.Router();

router.post('/', todoController.getTodos);
router.post('/create', todoController.createTodo);
router.get('/:id/', todoController.getTodo);
router.put('/:id/', todoController.updateTodo);
router.patch('/:id/', todoController.updateTodoStatus);

// eslint-disable-next-line import/prefer-default-export
export const todoRoutes = router;
