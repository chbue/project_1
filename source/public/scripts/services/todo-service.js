import TodoStorage from "./data/todo-storage.js";
import Todo from "./todo.js";

export default class TodoService {
  #storage;
  #todos;
  #idCounter;

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
  sort() {
    this.#todos.sort((a, b) => {
      if (a.getImportance() > b.getImportance()) return -1;
      if (a.getImportance() < b.getImportance()) return 1;
      return 0;
    });
  }

  addTodo(todo) {
 this.#todos.push(todo);
    this.#save();
    // TODO: return false if todo is not correct
    return true;
  }
}
