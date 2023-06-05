// eslint-disable-next-line import/prefer-default-export
export class Note {
  #title;

  #description;

  #importance;

  #createDate;

  #dueDate;

  #state;

  constructor(title, description, importance, dueDate) {
    this.#title = title;
    this.#description = description;
    this.#setImportance(importance);
    this.#createDate = new Date();
    this.#dueDate = dueDate;
    this.setState("opened");
  }

  getTitle() {
    return this.#title;
  }

  #setImportance(importance) {
    if (importance >= 5 || importance <= 0) {
      this.#importance = 0;
    } else {
      this.#importance = importance;
    }
  }

  isDueDateInPast() {
    return new Date() > this.#dueDate;
  }

  getNote() {
    return JSON.stringify(this, null, 2);
  }

  setState(state) {
    if (state === "opened" || state === "closed") {
      this.#state = state;
    }
  }
}

