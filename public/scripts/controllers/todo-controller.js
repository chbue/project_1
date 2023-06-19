import { todoService } from '../services/todo-service.js';
import { authService } from '../services/auth-service.js';

export default class TodoController {
  #filterStatus;
  #sortMethod;
  #sortStatus;
  #buttonFilterStatus;
  #todoTemplateContainer;
  #editTodoContainer;
  #todoTemplateCompiled;
  constructor() {
    this.#todoTemplateCompiled = Handlebars.compile(document.getElementById('todo-list').innerHTML);
    this.#filterStatus = false;
    this.#sortMethod = 'name';
    this.#sortStatus = 'ascending';
    this.#buttonFilterStatus = document.getElementById('buttonFilterStatus');
    this.#todoTemplateContainer = document.getElementById('todo-container');
    this.#editTodoContainer = document.getElementById('edit-todo-container');
    this.#loadTodoTemplate();
  }

  renderTodoView() {
    if (authService.isLoggedIn()) {
      todoService
        .getTodos(this.sortMethod, this.sortStatus, this.#filterStatus)
        .then((todos) => {
          const formattedTodos = todos.map((todo) => {
            const formattedDueDate = todo.dueDate ? this.#formatDate(new Date(todo.dueDate)) : '';

            return {
              id: todo.id,
              createdBy: todo.createdBy,
              name: todo.name,
              status: todo.status,
              description: todo.description,
              dueDate: formattedDueDate,
              importance: todo.importance,
            };
          });

          this.#todoTemplateContainer.innerHTML = this.#todoTemplateCompiled(
            { todos: formattedTodos },
            { allowProtoPropertiesByDefault: true }
          );
        })
        .catch((error) => {
          console.error("error getting todo's:", error);
        });
    }
  }

  initialize() {
    this.#initEventHandlers();
  }

  #initEventHandlers() {
    this.#buttonFilterStatus.addEventListener('click');

    const sortButtons = document.querySelectorAll('.sortButtons button');
    sortButtons.forEach((button) => {
      const sortMethod = button.getAttribute('data-sort');
      button.addEventListener('click', () => {
        this.sortMethod = sortMethod;
        this.sortStatus = todoService.setSortStatus(sortMethod);
        this.renderTodoView();
      });
    });

    this.#todoTemplateContainer.addEventListener('click', (event) => {
      const { action } = event.target.dataset;
      if (action === 'editTodo') {
        this.#editTodo(event);
      }
    });

    const buttonCreateTodo = document.getElementById('buttonCreateTodo');
    buttonCreateTodo.addEventListener('click', () => {
      this.#showTodoForm();
    });
  }

  #loadTodoTemplate() {

  }

  #showTodoForm(todo) {

  }

  #submitTodoForm(todo) {
    const todoForm = document.getElementById('todo-form');
    const isFormValid = todoForm.checkValidity();
    if (!isFormValid) {
      return false;
    }
    if (todo) {
      this.#updateTodo(todo.id, todoForm);
    } else {
      this.#createTodo(todoForm);
    }
    return true;
  }

  #showTodoList() {
    this.renderTodoView();
    this.#editTodoContainer.innerHTML = '';
    this.#editTodoContainer.style.display = 'none';

    this.#todoTemplateContainer.style.display = 'block';
  }

  #createTodo() {
    const nameInput = document.getElementById('todo-name');
    const descriptionInput = document.getElementById('todo-description');
    const dueDateInput = document.getElementById('todo-due-date');
    const importanceInput = document.getElementById('todo-importance');

    const name = nameInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;
    const importance = parseInt(importanceInput.value, 10);

    todoService
      .createTodo(name, description, dueDate, importance)
      .then((createdTodo) => {
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("error getting todo's:", error);
      });
  }

  #editTodo(event) {
    const { todoId } = event.target.dataset;
    todoService
      .getTodo(todoId)
      .then((todo) => {
        this.#showTodoForm(todo);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("error getting todo's:", error);
      });
  }


  #updateTodo(todoId) {
    const nameInput = document.getElementById('todo-name');
    const descriptionInput = document.getElementById('todo-description');
    const dueDateInput = document.getElementById('todo-due-date');
    const importanceInput = document.getElementById('todo-importance');

    const todo = todoService.getTodo(todoId);

    todo.name = nameInput.value;
    todo.description = descriptionInput.value;
    todo.dueDate = new Date(dueDateInput.value);
    todo.importance = parseInt(importanceInput.value, 10);

    todoService
      .updateTodo(todoId, todo.name, todo.description, todo.dueDate, todo.importance)
      .then(() => {
        this.renderTodoView();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('ups: ', error);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  #formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}

new TodoController().initialize();
