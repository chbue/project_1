import * as assert from 'assert';
import 'mocha';
import TodoService from '../services/todo-service.js';
import Todo from '../services/todo.js';
import TodoStorageMock from './todo_storage_mock.js';

function createFiveDefaultTodos(todoService) {
  const todo1 = new Todo('b_t', 'a_d', 0, new Date(), new Date(), 'opened');
  const todo2 = new Todo('c_t', 'b_d', 2, new Date(), new Date(), 'closed');
  const todo3 = new Todo('a_t', 'c_d', 1, new Date(), new Date(), 'closed');
  const todo4 = new Todo('d_t', 'd_d', 3, new Date(), new Date(), 'opened');
  const todo5 = new Todo('d_t', 'd_d', 3, new Date(), new Date(), 'opened');

  todoService.addTodo(todo1);
  todoService.addTodo(todo2);
  todoService.addTodo(todo3);
  todoService.addTodo(todo4);
  todoService.addTodo(todo5);
}

describe('ToDo-Service', () => {
  describe('sort', () => {
    it('sort by title', () => {
      const testee = new TodoService(new TodoStorageMock());
      createFiveDefaultTodos(testee);
      assert.equal(testee.getTodos().at(0).getTitle(), 'b_t');
      assert.equal(testee.getTodos().at(1).getTitle(), 'c_t');
      assert.equal(testee.getTodos().at(2).getTitle(), 'a_t');
      assert.equal(testee.getTodos().at(3).getTitle(), 'd_t');
      assert.equal(testee.getTodos().at(4).getTitle(), 'd_t');
      testee.sort('Title');
      assert.equal(testee.getTodos().at(0).getTitle(), 'a_t');
      assert.equal(testee.getTodos().at(1).getTitle(), 'b_t');
      assert.equal(testee.getTodos().at(2).getTitle(), 'c_t');
      assert.equal(testee.getTodos().at(3).getTitle(), 'd_t');
      assert.equal(testee.getTodos().at(4).getTitle(), 'd_t');
      testee.sort('Title');
      assert.equal(testee.getTodos().at(0).getTitle(), 'd_t');
      assert.equal(testee.getTodos().at(1).getTitle(), 'd_t');
      assert.equal(testee.getTodos().at(2).getTitle(), 'c_t');
      assert.equal(testee.getTodos().at(3).getTitle(), 'b_t');
      assert.equal(testee.getTodos().at(4).getTitle(), 'a_t');
    });

    it('sort by importance', () => {
      const testee = new TodoService(new TodoStorageMock());
      createFiveDefaultTodos(testee);
      assert.equal(testee.getTodos().at(0).getImportance(), 0);
      assert.equal(testee.getTodos().at(1).getImportance(), 2);
      assert.equal(testee.getTodos().at(2).getImportance(), 1);
      assert.equal(testee.getTodos().at(3).getImportance(), 3);
      assert.equal(testee.getTodos().at(4).getImportance(), 3);
      testee.sort('Importance');
      assert.equal(testee.getTodos().at(0).getImportance(), 0);
      assert.equal(testee.getTodos().at(1).getImportance(), 1);
      assert.equal(testee.getTodos().at(2).getImportance(), 2);
      assert.equal(testee.getTodos().at(3).getImportance(), 3);
      assert.equal(testee.getTodos().at(4).getImportance(), 3);
      testee.sort('Importance');
      assert.equal(testee.getTodos().at(0).getImportance(), 3);
      assert.equal(testee.getTodos().at(1).getImportance(), 3);
      assert.equal(testee.getTodos().at(2).getImportance(), 2);
      assert.equal(testee.getTodos().at(3).getImportance(), 1);
      assert.equal(testee.getTodos().at(4).getImportance(), 0);
    });
  });
});
