import TodoService from "../services/todo-service.js";
import TodoListRendering from "../views/todo-list-rendering.js";

export default class TodoController {
  #todoService;
  #container;
  #todoListRendering;

  constructor() {
    this.#todoService = new TodoService();
    this.#container = document.getElementById("todoTableContainer");
    this.#todoListRendering = new TodoListRendering(this.#container);

    this.#initEventHandlers();
  }

  #createTodo() {
    const nameInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const importanceInput = document.getElementById("importance");
    const dueDateInput = document.getElementById("dueDate");

    if (
      this.#todoService.createTodo(
        nameInput.value,
        descriptionInput.value,
        importanceInput.value,
        dueDateInput.value
      )
    ) {
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
      const selectedValue = dropdown.value;
      this.#todoService.sort(selectedValue);
      this.#todoListRendering.renderToDoTable(this.#container.getTodos());
    });
  }

  #deleteInputFields(
    nameInput,
    descriptionInput,
    importanceInput,
    dueDateInput
  ) {
    // eslint-disable-next-line no-param-reassign
    nameInput.value = "";
    descriptionInput.value = "";
    importanceInput.value = "";
    dueDateInput.value = "";
  }
}

const todoController = new TodoController();
