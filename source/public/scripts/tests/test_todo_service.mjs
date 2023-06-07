import * as assert from "assert";
import "mocha";
import TodoService from "../services/todo-service.js";
import TodoStorage from "../services/data/todo-storage.js";
import Todo from "../services/todo.js";

function createSixDefaultTodos(todoService) {
  todoService.createTodo("a_t", "d_d", 1, new Date());
  todoService.createTodo("c_t", "e_d", 1, new Date());
  todoService.createTodo("f_t", "b_d", 0, new Date());
  todoService.createTodo("d_t", "a_d", 4, new Date());
  todoService.createTodo("b_t", "f_d", 3, new Date());
  todoService.createTodo("e_t", "c_d", 2, new Date());
}

function compareToDos(left, right) {
  assert.equal(left.getId(),right.getId());
  assert.equal(left.getTitle() ,right.getTitle());
  assert.equal(left.getDescription() ,right.getDescription());
  assert.equal(left.getImportance() ,right.getImportance());
}

describe("ToDo-Service", () => {
  describe("add todo", () => {
    it("set and get id", () => {
      const testee = new TodoService(new TodoStorage());
      assert.equal(testee.addTodo("a", "b", 0, new Date()), true);
    });
  });

  describe("sort", () => {
    it("set and get id", () => {
      const testee = new TodoService(new TodoStorage());
      createSixDefaultTodos(testee);
      assert.equal(testee.getTodos().length, 6)
    });
  });

    describe("sort", () => {
        it("set and get id", () => {
            const testee = new TodoService(new TodoStorage());
            createSixDefaultTodos(testee);
          testee.sort();
          compareToDos(testee.getTodos().at(0), new Todo(3,"d_t", "a_d", 4, new Date()));
          compareToDos(testee.getTodos().at(1), new Todo(4,"b_t", "f_d", 3, new Date()));
          compareToDos(testee.getTodos().at(2), new Todo(5,"e_t", "c_d", 2, new Date()));
          compareToDos(testee.getTodos().at(3), new Todo(0,"a_t", "d_d", 1, new Date()));
          compareToDos(testee.getTodos().at(4), new Todo(1,"c_t", "e_d", 1, new Date()));
          compareToDos(testee.getTodos().at(5), new Todo(2,"f_t", "b_d", 0, new Date()));
        });
    });

  describe("sort importance", () => {
    it("set and get id", () => {
      const testee = new TodoService(new TodoStorage());
      createSixDefaultTodos(testee);
      testee.sort();

      compareToDos(testee.getTodos().at(0), new Todo(0,"a_t", "d_d", 1, new Date()));
      compareToDos(testee.getTodos().at(1), new Todo(1,"c_t", "e_d", 1, new Date()));
      compareToDos(testee.getTodos().at(2), new Todo(2,"f_t", "b_d", 0, new Date()));
      compareToDos(testee.getTodos().at(3), new Todo(3,"d_t", "a_d", 4, new Date()));
      compareToDos(testee.getTodos().at(4), new Todo(4,"b_t", "f_d", 3, new Date()));
      compareToDos(testee.getTodos().at(5), new Todo(5,"e_t", "c_d", 2, new Date()));
    });
  });
});
