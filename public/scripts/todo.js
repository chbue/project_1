export default class Todo {
  #title;
  #description;
  #importance;
  #createDate;
  #dueDate;
  #state;

  constructor(title, description, importance, createDate, dueDate, state) {
    this.#title = title;
    this.#description = description;
    this.#setImportance(importance);
    this.#createDate = createDate || new Date();
    this.#dueDate = dueDate;
    this.#setState(state);
  }

  toJSON() {
    return {
      title: this.#title,
      description: this.#description,
      importance: this.#importance,
      createDate: this.#createDate,
      dueDate: this.#dueDate,
      state: this.#state,
    };
  }

  getTitle() {
    return this.#title;
  }

  getDescription() {
    return this.#description;
  }

  getImportance() {
    return this.#importance;
  }

  getCreateDate() {
    return this.#createDate;
  }

  getDueDate() {
    return this.#dueDate;
  }

  getState() {
    return this.#state;
  }

  #setImportance(importance) {
    if (importance >= 4 || importance <= 0) {
      this.#importance = 0;
    } else {
      this.#importance = importance;
    }
  }

  #setState(state) {
    if (state === 'opened' || state === 'closed') {
      this.#state = state;
    }
  }
}

Todo.counter = 0;
