export default class TodoStorage {
  #todos;

  constructor() {
    try {
      this.#todos = JSON.parse(localStorage.getItem("todoStorage") || "[ ]");
      localStorage.setItem("todoStorage_v1", JSON.stringify(this.#todos));
    }
    catch (error) {
      // TODO: only for test purpose
    }
  }

  getAll() {
    return this.#todos;
  }

  update(todos) {
    try {
      localStorage.setItem("todoStorage", JSON.stringify(todos));
      return this.#todos;
    }
    catch (error) {
      // TODO: only for test purpose
      return this.#todos;
    }
  }
}
