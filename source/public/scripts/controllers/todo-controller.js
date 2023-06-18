import TodoService from "../services/todo-service.js";
import TodoListRendering from "../views/todo-list-rendering.js";
import Todo from "../services/todo.js";
import { authService } from '../services/auth-service.js'

export default class TodoController {
  #todoService;
  #container;
  #todoListRendering;
  #btnLogin;

  constructor() {
    this.#todoService = new TodoService();
    this.#container = document.getElementById("todoTableContainer");
    this.#todoListRendering = new TodoListRendering(this.#container);
    this.#todoListRendering.renderToDoTable(this.#todoService.getTodos());
    this.favDialog = document.getElementById("favDialog");
    this.btnLogin = document.getElementById("login");
    this.#initialize();
  }

  #initialize() {
    this.#initEventHandlers();
  }

  // eslint-disable-next-line class-methods-use-this
  #createTodo() {
    const nameInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const importanceInput = document.getElementById("importance");
    const dueDateInput = document.getElementById("dueDate")

    const todo = new Todo(
      nameInput.value,
      descriptionInput.value,
      importanceInput.value,
      undefined,
      dueDateInput.value,
      "opened"
    );
    if (todo) {
      this.#todoService.addTodo(todo);
      this.#todoListRendering.renderToDoTable(this.#todoService.getTodos());
      document.getElementById("form").reset();
    }
  }

  #initEventHandlers() {
    this.btnLogin.addEventListener("click", async () => {
      await authService.login("admin@admin.ch", "123456");
      this.updateStatus();
    });


    const newTodoButton = document.getElementById("newTodoButton");
    newTodoButton.addEventListener("click", () => {
      this.favDialog.showModal();
    });

    const confirmButton = document.getElementById("form");
    confirmButton.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#createTodo();
      this.favDialog.close();
    });

    const filterByTitleButton = document.getElementById("filterByTitleButton");
    filterByTitleButton.addEventListener("click", () => {
      this.#todoService.sort("Title");
      this.#todoListRendering.renderToDoTable(this.#todoService.getTodos());
    });

    const filterByDueDateButton = document.getElementById(
      "filterByDueDateButton"
    );
    filterByDueDateButton.addEventListener("click", () => {
      this.#todoService.sort("DueDate");
      this.#todoListRendering.renderToDoTable(this.#todoService.getTodos());
    });

    const filterByCreationDateButton = document.getElementById(
      "filterByCreationDateButton"
    );
    filterByCreationDateButton.addEventListener("click", () => {
      this.#todoService.sort("CreationDate");
      this.#todoListRendering.renderToDoTable(this.#todoService.getTodos());
    });

    const filterByImportanceButton = document.getElementById(
      "filterByImportanceButton"
    );
    filterByImportanceButton.addEventListener("click", () => {
      this.#todoService.sort("Importance");
      this.#todoListRendering.renderToDoTable(this.#todoService.getTodos());
    });

    const deleteAll = document.getElementById("deleteAll");
    deleteAll.addEventListener("click", () => {
      this.#todoService.deleteAll();
      this.#todoListRendering.renderToDoTable(this.#todoService.getTodos());
    });
  }

  updateStatus() {
    Array.from(document.querySelectorAll(".js-non-user")).forEach(x=>x.classList.toggle("hidden", authService.isLoggedIn()))
    Array.from(document.querySelectorAll(".js-user")).forEach(x=>x.classList.toggle("hidden", !authService.isLoggedIn()))

    if (authService.isLoggedIn()) {
      const a = 0;
    //  renderOrders();
    }
  }
}

// eslint-disable-next-line no-new
new TodoController();
