import { httpService } from './http-service.js';

class TodoService {
  async createTodo(name, description, dueDate, importance) {
    return httpService.ajax('POST', '/todos/create', {
      name,
      description,
      dueDate,
      importance,
    });
  }

  async getTodos(sortMethod, sortOrder, filterStatus) {
    return httpService.ajax('POST', '/todos/', {
      sortMethod,
      sortOrder,
      filterStatus,
    });
  }

  async getTodo(id) {
    return httpService.ajax('GET', `/todos/${id}`, undefined);
  }

  getSortStatus(sortMethod) {
    return httpService.getSortStatus(sortMethod);
  }

  setSortStatus(sortMethod) {
    return httpService.setSortStatus(sortMethod);
  }

  async updateTodo(id, name, description, dueDate, importance) {
    return httpService.ajax('PUT', `/todos/${id}`, {
      name,
      description,
      dueDate,
      importance,
    });
  }

  async updateTodoStatus(id, status) {
    return httpService.ajax('PATCH', `/todos/${id}`, {
      status,
    });
  }
}

export const todoService = new TodoService();
