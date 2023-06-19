import { httpService } from './http-service.js';

class TodoService {
  // eslint-disable-next-line class-methods-use-this
  async createTodo(name, description, dueDate, importance) {
    return httpService.ajax('POST', '/todos/create', {
      name,
      description,
      dueDate,
      importance,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async getTodos(sortMethod, sortOrder, filterStatus) {
    return httpService.ajax('POST', '/todos/', {
      sortMethod,
      sortOrder,
      filterStatus,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async getTodo(id) {
    return httpService.ajax('GET', `/todos/${id}`, undefined);
  }

  // eslint-disable-next-line class-methods-use-this
  setSortStatus(sortMethod) {
    return httpService.setSortStatus(sortMethod);
  }

  // eslint-disable-next-line class-methods-use-this
  async updateTodo(id, name, description, dueDate, importance) {
    return httpService.ajax('PUT', `/todos/${id}`, {
      name,
      description,
      dueDate,
      importance,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async updateTodoStatus(id, status) {
    return httpService.ajax('PATCH', `/todos/${id}`, {
      status,
    });
  }
}

// eslint-disable-next-line import/prefer-default-export
export const todoService = new TodoService();
