import { todoService } from '../services/todo-service.js';
import { authService } from '../services/auth-service.js';

const buttonTranslations = {
  buttonSortTitle: 'title',
  buttonSortDueDate: 'due date',
  buttonSortCreationDate: 'create date',
  buttonSortImportance: 'importance',
  buttonSortState: 'state',
};

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
            let importanceFormat = '';
            if (todo.importance === 1) {
              importanceFormat += '⚡';
            }
            if (todo.importance === 2) {
              importanceFormat += '⚡⚡';
            }
            if (todo.importance === 3) {
              importanceFormat += '⚡⚡⚡';
            }
            return {
              id: todo.id,
              createdBy: todo.createdBy,
              name: todo.name,
              status: todo.status,
              description: todo.description,
              dueDate: formattedDueDate,
              importance: importanceFormat,
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

  // eslint-disable-next-line class-methods-use-this
  #translateButton(buttonId) {
    return buttonTranslations[buttonId];
  }

  #initEventHandlers() {
    this.#buttonFilterStatus.addEventListener('click', this.#setFilterStatus.bind(this));

    const sortButtons = document.querySelectorAll('.sort-buttons button');
    sortButtons.forEach((button) => {
      const sortMethod = button.getAttribute('data-sort');
      button.addEventListener('click', () => {
        this.sortMethod = sortMethod;
        this.sortStatus = todoService.setSortStatus(sortMethod);
        this.#refreshSortButtons();
        this.renderTodoView();
      });
    });

    this.#todoTemplateContainer.addEventListener('click', (event) => {
      const { action } = event.target.dataset;
      if (action === 'editTodo') {
        this.#editTodo(event);
      }

      if (action === 'toggleStatus') {
        this.#toggleTodoStatus(event);
      }
    });

    const buttonCreateTodo = document.getElementById('buttonCreateTodo');
    buttonCreateTodo.addEventListener('click', () => {
      this.#showTodoForm();
    });
  }

  #refreshSortButtons() {
    const sortButtons = document.querySelectorAll('.sort-buttons button');
    sortButtons.forEach((button) => {
      const sortButton = button;
      const buttonSortBy = button.getAttribute('data-sort');
      sortButton.classList.remove('pressed');
      if (buttonSortBy !== this.sortMethod) {
        sortButton.innerHTML = this.#translateButton(button.id);
      }
    });

    const selectedButton = document.querySelector(`.sort-buttons button[data-sort="${this.sortMethod}"]`);
    const buttonName = this.#translateButton(selectedButton.id);
    selectedButton.classList.add('pressed');
    if (this.sortStatus === 'ascending') {
      selectedButton.innerHTML = `${buttonName} ᐁ`;
    } else {
      selectedButton.innerHTML = `${buttonName} ᐃ`;
    }
  }

  #loadTodoTemplate() {
    fetch('views/todo-list.hbs')
      .then((response) => response.text())
      .then((html) => {
        this.#todoTemplateCompiled = Handlebars.compile(html);
        this.renderTodoView();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Template not found: ', error);
      });
  }

  #showTodoForm(todo) {
    const currentTodo = todo;
    this.#todoTemplateContainer.style.display = 'none';
    this.#editTodoContainer.style.display = 'block';

    let templatePath = '';
    if (todo != null) {
      templatePath = 'views/edit-todo.hbs';
    } else {
      templatePath = 'views/create-todo.hbs';
    }

    fetch(templatePath)
      .then((response) => response.text())
      .then((html) => {
        this.#editTodoContainer.innerHTML = html;
        const todoForm = document.getElementById('todo-form');
        const backButton = document.getElementById('backButton');

        todoForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const buttonAction = event.submitter.dataset.action;

          if (buttonAction === 'save') {
            this.leaveTodoForm = false;
            this.#submitTodoForm(currentTodo);
          } else if (buttonAction === 'saveAndBack') {
            this.leaveTodoForm = true;
            const isValid = this.#submitTodoForm(currentTodo);
            if (isValid) {
              this.#showTodoList();
            }
          }
        });

        backButton.addEventListener('click', () => {
          this.#showTodoList();
        });

        const nameInput = document.getElementById('todo-name');
        const descriptionInput = document.getElementById('todo-description');
        const dueDateInput = document.getElementById('todo-due-date');
        const importanceInput = document.getElementById('todo-importance');

        // Prefill values
        dueDateInput.value = new Date().toISOString().slice(0, 10);

        if (todo) {
          nameInput.value = todo.name;
          descriptionInput.value = todo.description;
          dueDateInput.value = new Date(todo.dueDate).toISOString().slice(0, 10);
          importanceInput.value = todo.importance;
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Template not found: ', error);
      });
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
        if (!this.leaveTodoForm) {
          this.#showTodoForm(createdTodo);
        }
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

  #toggleTodoStatus(event) {
    const { todoId } = event.target.dataset;
    todoService
      .getTodo(todoId)
      .then((todo) => {
        if (todo != null) {
          const updatedStatus = !todo.status;

          todoService
            .updateTodoStatus(todoId, updatedStatus)
            .then(() => {
              this.renderTodoView();
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.error("error getting todo's:", error);
            });
        }
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

  #setFilterStatus() {
    if (!this.#filterStatus) {
      this.#buttonFilterStatus.textContent = 'show done';
    } else {
      this.#buttonFilterStatus.textContent = 'suppress done';
    }
    this.#filterStatus = !this.#filterStatus;
    this.renderTodoView();
  }

  // eslint-disable-next-line class-methods-use-this
  #formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}

new TodoController().initialize();
