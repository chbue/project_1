export default class TodoStorage {
  #todos;

  constructor() {
    this.#todos = JSON.parse(localStorage.getItem("todoStorage_v1") || "[ ]");
    localStorage.setItem("todoStorage_v1", JSON.stringify(this.#todos));
  }

  getAll() {
    return this.#todos;
  }

  update(todos) {
    localStorage.setItem("todoStorage_v1", JSON.stringify(todos));
    return this.#todos;
  }
}
