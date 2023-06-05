// eslint-disable-next-line import/prefer-default-export
export default class Todo {
  #id;

  #title;

  #description;

  #importance;

  #createDate;

  #dueDate;

  #state;

  getId() {
    return this.#id;
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

  getDueDate() {
    return this.#dueDate;
  }

  getState() {
    return this.#state;
  }


  constructor(id, title, description, importance, dueDate) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#setImportance(importance);
    this.#createDate = new Date();
    this.#dueDate = dueDate;
    this.setState("opened");
  }

  getImportance() {
    return this.#importance;
  }

  #setImportance(importance) {
    if (importance >= 4 || importance <= 0) {
      this.#importance = 0;
    } else {
      this.#importance = importance;
    }
  }

  isDueDateInPast() {
    return new Date() > this.#dueDate;
  }

  setState(state) {
    if (state === "opened" || state === "closed") {
      this.#state = state;
    }
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      importance: this.#importance,
      createDate: this.#createDate,
      dueDate: this.#dueDate,
      state: this.#state,
    };
  }
}
