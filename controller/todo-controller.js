import { todoStore } from '../services/todo-storage.js';
import { SecurityUtil } from '../utils/security.js';

export class TodoController {
  // eslint-disable-next-line class-methods-use-this
  getTodos = async (req, res) => {
    res.json(
      (await todoStore.getTodos(
        SecurityUtil.currentUser(req),
        req.body.sortMethod,
        req.body.sortOrder,
        req.body.filterStatus
      )) || []
    );
  };

  // eslint-disable-next-line class-methods-use-this
  createTodo = async (req, res) => {
    res.json(
      await todoStore.add(
        req.body.id,
        SecurityUtil.currentUser(req),
        req.body.name,
        req.body.status,
        req.body.description,
        req.body.importance,
        req.body.dueDate
      )
    );
  };

  // eslint-disable-next-line class-methods-use-this
  getTodo = async (req, res) => {
    res.json(await todoStore.get(req.params.id, SecurityUtil.currentUser(req)));
  };

  // eslint-disable-next-line class-methods-use-this
  updateTodo = async (req, res) => {
    res.json(
      await todoStore.update(
        req.params.id,
        SecurityUtil.currentUser(req),
        req.body.name,
        req.body.description,
        req.body.importance,
        req.body.dueDate
      )
    );
  };

  // eslint-disable-next-line class-methods-use-this
  updateTodoStatus = async (req, res) => {
    res.json(await todoStore.updateStatus(req.params.id, SecurityUtil.currentUser(req), req.body.status));
  };
}

export const todoController = new TodoController();
