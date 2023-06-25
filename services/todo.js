export default class Todo {
  constructor(id, createdBy, title, status, description, importance, dueDate) {
    this.id = id;
    this.createdBy = createdBy;
    this.name = title || 'unknown';
    this.status = status || false;
    this.description = description || '';
    this.importance = importance;
    this.creationDate = new Date();
    this.dueDate = dueDate;
  }
}
