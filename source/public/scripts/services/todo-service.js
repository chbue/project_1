import TodoStorage from "./data/todo-storage.js";
import Todo from "./todo.js";

export default class TodoService {
  constructor(storage) {
    this.storage = storage || new TodoStorage();
    this.todos = [];
    this.idCounter = 0;
  }

  getTodos() {
    return this.todos;
  }

  save() {
    this.storage.update(this.todos.map((f) => f.toJSON()));
  }

  deleteAll() {
    this.todos = [];
    this.save();
  }

  sort() {
    this.todos.sort( function( a , b){
      if(a.getImportance() > b.getImportance()) return -1;
      if(a.getImportance() < b.getImportance()) return 1;
      return 0;
    });
  }

  createTodo(title, description, importance, dueDate) {
    const id = this.idCounter;
    this.idCounter += 1;
    const todo = new Todo(
      id,
      title,
      description,
      importance,
        dueDate,
    );
    this.todos.push(todo);
    this.save();
    return true;
  }
}

export const todoService = new TodoService();
