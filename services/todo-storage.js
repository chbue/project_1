import Datastore from 'nedb-promises';
import Todo from './todo.js';

export class TodoStorage {
  constructor(db) {
    const options = process.env.DB_TYPE === 'FILE' ? { filename: './data/todos.db', autoload: true } : {};
    this.db = db || new Datastore(options);
  }

  async add(id, createdBy, name, status, description, importance, dueDate) {
    const todo = new Todo(
      await this.#generateRandomString(16),
      createdBy,
      name,
      false,
      description,
      importance,
      dueDate
    );
    return this.db.insert(todo);
  }

  // eslint-disable-next-line class-methods-use-this
  async #generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let index = 0; index < length; index++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  async update(id, createdBy, name, description, importance, dueDate) {
    await this.db.update(
      { id, createdBy },
      {
        $set: {
          name,
          description,
          importance,
          dueDate,
        },
      }
    );
    return this.get(id, createdBy);
  }

  async updateStatus(id, createdBy, status) {
    await this.db.update({ id, createdBy }, { $set: { status } });
    return this.get(id, createdBy);
  }

  async get(id, currentUser) {
    return this.db.findOne({ id, createdBy: currentUser });
  }

  async getTodos(currentUser, sortMethod, sortOrder, filterStatus) {
    const sortOptions = {
      name: { key: 'name', compareFn: this.#compareByName },
      dueDate: { key: 'dueDate', compareFn: this.#compareByDueDate },
      creationDate: {
        key: 'creationDate',
        compareFn: this.#compareByCreationDate,
      },
      importance: { key: 'importance', compareFn: this.#compareByImportance },
      status: { key: 'status', compareFn: this.#compareByStatus },
    };

    const sortOption = sortOptions[sortMethod];
    if (!sortOption) {
      if (filterStatus === true) {
        return this.db.find({ createdBy: currentUser, status: false }).sort({}).exec();
      }
      return this.db.find({ createdBy: currentUser }).sort({}).exec();
    }

    const { key } = sortOption;
    const sortQuery = {};
    sortQuery[key] = sortOrder === 'ascending' ? 1 : -1;

    if (filterStatus === true) {
      return this.db.find({ createdBy: currentUser, status: false }).sort(sortQuery).exec();
    }
    return this.db.find({ createdBy: currentUser }).sort(sortQuery).exec();
  }

  // eslint-disable-next-line class-methods-use-this
  #compareByName(a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }

  // eslint-disable-next-line class-methods-use-this
  #compareByDueDate(a, b) {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  }

  // eslint-disable-next-line class-methods-use-this
  #compareByCreationDate(a, b) {
    const dateA = new Date(a.creationDate);
    const dateB = new Date(b.creationDate);
    return dateA - dateB;
  }

  // eslint-disable-next-line class-methods-use-this
  #compareByImportance(a, b) {
    return a.importance - b.importance;
  }

  // eslint-disable-next-line class-methods-use-this
  #compareByStatus(a, b) {
    return a.status - b.status;
  }
}

export const todoStore = new TodoStorage();
