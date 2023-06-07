import TodoService from "../services/todo-service.js";
import TodoListRendering from "../views/todo-list-rendering.js";
import Todo from "../services/todo.js";

export default class TodoController {
  #todoService;
  #container;
  #todoListRendering;

  constructor() {
    this.#todoService = new TodoService();
    this.#container = document.getElementById("todoTableContainer");
    this.#todoListRendering = new TodoListRendering(this.#container);
    this.#todoListRendering.renderToDoTable(this.#todoService.getTodos());
    this.#initialize();
  }

  #initialize() {
    this.#initEventHandlers();
  }

  #createTodo() {
    const nameInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const importanceInput = document.getElementById("importance");
    const dueDateInput = document.getElementById("dueDate");

    const todo = new Todo(
      nameInput.value,
      descriptionInput.value,
      importanceInput.value,
      dueDateInput.value
    );
    if (todo) {
      this.#todoService.addTodo(todo);
      this.#todoListRendering.renderToDoTable(this.#todoService.getTodos());
      this.#deleteInputFields(
        nameInput,
        descriptionInput,
        importanceInput,
        dueDateInput
      );
    }
  }

  #initEventHandlers() {
    const createTodoButton = document.getElementById("btnSave");
    createTodoButton.addEventListener("click", () => {
      this.#createTodo();
    });

    const deleteButton = document.getElementById("btnDeleteAll");
    deleteButton.addEventListener("click", () => {
      this.#todoService.deleteAll();
      this.#todoListRendering.renderToDoTable(this.#container.getTodos());
    });

    const dropdown = document.getElementById("dropdown");
    dropdown.addEventListener("change", () => {
      // const selectedValue = dropdown.value;
      this.#todoService.sort();
      this.#todoListRendering.renderToDoTable(this.#container.getTodos());
    });
  }

  #deleteInputFields(
    nameInput,
    descriptionInput,
    importanceInput,
    dueDateInput
  ) {
    nameInput.value = "";
    descriptionInput.value = "";
    importanceInput.value = "";
    dueDateInput.value = "";
  }
}

const todoController = new TodoController();
