import TodoStorage from "./data/todo-storage.js";
import Todo from "./todo.js";

export default class TodoService {
  #storage;
  #todos;
  #idCounter;
  #currentSortBy;
  #currentDirection;

  constructor(storage) {
    this.#storage = storage || new TodoStorage();
    this.#todos = [];

    this.#todos = this.#storage
        .getAll()
        .map(
            (u) =>
                new Todo(
                    u.title,
                    u.description,
                    u.importance,
                    new Date(u.dueDate)
                )
        );
    this.#idCounter = 0;
  }

  getTodos() {
    return this.#todos;
  }

  #save() {
    this.#storage.update(this.#todos.map((f) => f.toJSON()));
  }

  deleteAll() {
    this.#todos = [];
    this.#save();
  }

  // TODO: consider refactoring
  sort(sortBy) {
    if(sortBy === this.#currentSortBy) {
      this.#currentDirection = this.#currentDirection === "Ascending" ? "Descending" : "Ascending";
    }
    else {
      this.#currentDirection = "Ascending";
    }
    let compareFunction;
    switch (sortBy) {
      case "Title":
        compareFunction = (item) => item.getTitle();
        break;
      case "Description":
        compareFunction = (item) => item.getDescription();
        break;
      case "Importance":
        compareFunction = (item) => item.getImportance();
        break;
      case "CreateDate":
        compareFunction = (item) => item.getCreateDate();
        break;
      case "DueDate":
        compareFunction = (item) => item.getDueDate();
        break;
      case "State":
        compareFunction = (item) => item.getState();
        break;
      default:
        break;
    }
    this.#currentSortBy = sortBy;
        this.#todos.sort((a, b) => {
          if (compareFunction(a) > compareFunction(b)) return (this.#currentDirection === "Ascending") ? 1 : -1;
          if (compareFunction(a) < compareFunction(b)) return (this.#currentDirection === "Ascending") ? -1 : 1;
          return 0;
        });


        this.#save();

  }

  addTodo(todo) {
 this.#todos.push(todo);
    this.#save();
    // TODO: return false if todo is not correct
    return true;
  }
}
