import TodoService from "../services/todo-service.js";

export default class TodoController {
  constructor() {
    this.todoService = new TodoService();
    this.container = document.getElementById("todoTableContainer");
  }

  createTodo() {
    const nameInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const importanceInput = document.getElementById("importance");
    const dueDateInput = document.getElementById("dueDate");

    if(this.todoService.createTodo(nameInput.value, descriptionInput.value, importanceInput.value, dueDateInput.value)) {
      this.#renderToDoTable(this.todoService.getTodos());
      this.#deleteInputFields(nameInput, descriptionInput, importanceInput, dueDateInput);
    }
  }

  #deleteInputFields(nameInput, descriptionInput, importanceInput, dueDateInput) {
    nameInput.value = '';
    descriptionInput.value = '';
    importanceInput.value = '';
    dueDateInput.value = '';
  }

  #initEventHandlers() {
    const createTodoButton = document.getElementById("btnSave");
    createTodoButton.addEventListener("click", () => {
      this.createTodo();
    });

    const deleteButton = document.getElementById("btnDeleteAll");
    deleteButton.addEventListener("click", () => {
      this.todoService.deleteAll();
      this.#renderToDoTable(this.todoService.getTodos());
    });

    const dropdown = document.getElementById("dropdown");
    dropdown.addEventListener("change", () => {
      const selectedValue = dropdown.value;
      this.todoService.sort(selectedValue);
      this.#renderToDoTable(this.todoService.getTodos());
    });

  }


  initialize() {
    this.#initEventHandlers();
  }

  // eslint-disable-next-line class-methods-use-this
  #renderToDoTable(todos) {
    while(this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    const table = document.createElement("table");

    // Create table headers
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Id", "Title", "Description", "Importance", "Create Date", "Due Date", "State"];

    headers.forEach(headerText => {
      const header = document.createElement("th");
      header.textContent = headerText;
      headerRow.appendChild(header);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");

    todos.forEach(todo => {
      const row = document.createElement("tr");
      const { id, title, description, importance, createDate, dueDate, state } = todo.toJSON();

      const properties = [id, title, description, importance, createDate, dueDate, state];
      properties.forEach(property => {
        this.extracted(property, row);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    this.container.appendChild(table);

  }

  // eslint-disable-next-line class-methods-use-this
  extracted(id, row) {
    const cell = document.createElement("td");
    cell.textContent = id;
    row.appendChild(cell);
  }
}

new TodoController().initialize();