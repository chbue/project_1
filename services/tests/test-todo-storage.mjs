import { TodoStorage } from "../todo-storage.js";
import * as assert from "assert";

const user = "admin";
const title = ["Buy groceries", "Do some exercise", "Finish the homework"];
const description = ["Buy milk, eggs, and bread", "Three squads one push up", "Send email to teacher"];
const date = ["1970-12-30", "2021-01-01", "2023-06-25"];
const importance = [1, 3, 2];
const done = [false, false, false];

async function addOneTodo(testee) {
  await testee.add(
    "",
    user,
    title[0],
    done[0],
    description[0],
    importance[0],
    new Date(date[0])
  );
}

async function addTwoTodos(testee) {
  await addOneTodo(testee);
  await testee.add(
    "",
    user,
    title[1],
    done[1],
    description[1],
    importance[1],
    new Date(date[1])
  );
}

async function addThreeTodos(testee) {
  await addTwoTodos(testee);
  await testee.add(
    "",
    user,
    title[2],
    done[2],
    description[2],
    importance[2],
    new Date(date[2])
  );
}

function assertATodo(todo, definedIndex) {
  assert.equal(todo.createdBy, user);
  assert.equal(todo.name, title[definedIndex]);
  assert.equal(todo.status, done[definedIndex]);
  assert.equal(todo.description, description[definedIndex]);
  assert.equal(todo.importance, importance[definedIndex]);
  assert.deepEqual(todo.dueDate, new Date(date[definedIndex]));
}

describe("TodoStorage", () => {
  describe("adding and getting todos", () => {
    it("should add a new todo to the storage and get one todo", async () => {
      const testee = new TodoStorage();
      await addOneTodo(testee);
      const todos = await testee.getTodos(user, "importance", "ascending", true);
      assert.equal(todos.length, 1);
    });

    it("should add two new todos to the storage and get two todos", async () => {
      const testee = new TodoStorage();
      await addTwoTodos(testee);
      const todos = await testee.getTodos(user, "importance", "ascending", true);
      assert.equal(todos.length, 2);
    });

    it("should add three new todos to the storage and get three todos", async () => {
      const testee = new TodoStorage();
      await addThreeTodos(testee);
      const todos = await testee.getTodos(user, "importance", "ascending", true);
      assert.equal(todos.length, 3);
    });

    it("should add 10000 new todos to the storage and get 10000 todos", async () => {
      const testee = new TodoStorage();
      const numberOfTodos = 10000;
      for (let index = 0; index < numberOfTodos; index += 1) {
        await addOneTodo(testee);
      }
      const todos = await testee.getTodos(user, "importance", "ascending", true);
      assert.equal(todos.length, numberOfTodos);
    });

    it("should add three new todos to the storage and get three todos with a wrong user will return 0 todos", async () => {
      const testee = new TodoStorage();
      await addThreeTodos(testee);
      const todos = await testee.getTodos("wrong user", "importance", "ascending", true);
      assert.equal(todos.length, 0);
    });

    it("get a todo", async () => {
      const testee = new TodoStorage();
      await addThreeTodos(testee);
      let todos = await testee.getTodos(user, "importance", "ascending", true);
      let todo = await testee.get(todos[0].id, user);
      assertATodo(todo, 0);
    });
  });
  describe("sorting", () => {
    it("sort by importance", async () => {
      const testee = new TodoStorage();
      await addThreeTodos(testee);
      let todos = await testee.getTodos(user, "importance", "ascending", true);
      assertATodo(todos[0], 0);
      assertATodo(todos[1], 2);
      assertATodo(todos[2], 1);

      todos = await testee.getTodos(user, "importance", "descending", true);
      assertATodo(todos[0], 1);
      assertATodo(todos[1], 2);
      assertATodo(todos[2], 0);
    });

    it("sort by name", async () => {
      const testee = new TodoStorage();
      await addThreeTodos(testee);
      let todos = await testee.getTodos(user, "name", "ascending", true);
      assertATodo(todos[0], 0);
      assertATodo(todos[1], 1);
      assertATodo(todos[2], 2);

      todos = await testee.getTodos(user, "name", "descending", true);
      assertATodo(todos[0], 2);
      assertATodo(todos[1], 1);
      assertATodo(todos[2], 0);
    });

    it("sort by description", async () => {
      const testee = new TodoStorage();
      await addThreeTodos(testee);
      let todos = await testee.getTodos(user, "dueDate", "ascending", true);
      assertATodo(todos[0], 0);
      assertATodo(todos[1], 1);
      assertATodo(todos[2], 2);

      todos = await testee.getTodos(user, "dueDate", "descending", true);
      assertATodo(todos[0], 2);
      assertATodo(todos[1], 1);
      assertATodo(todos[2], 0);
    });

  });
  describe("filter", () => {
    it("add three todos update one todo, then only two todos will be returned if filter status is true", async () => {
      const testee = new TodoStorage();
      await addThreeTodos(testee);

      const todos = await testee.getTodos(user, "importance", "ascending", false);
      await testee.updateStatus(todos[0].id, user, true);
      const updatedTodos = await testee.getTodos(user, "importance", "ascending", false);
      assert.equal(updatedTodos.length, 3);
      assert.equal(updatedTodos[0].status, true);
      const updatedTodosWithFilterStatus = await testee.getTodos(user, "importance", "ascending", true);
      assert.equal(updatedTodosWithFilterStatus.length, 2);
    });

  });
  describe("update", () => {
    it("update a todos name, the other todos gets untouched", async () => {
      const testee = new TodoStorage();
      await addThreeTodos(testee);
      let todos = await testee.getTodos(user, "importance", "ascending", true);
      assertATodo(todos[0], 0);
      assertATodo(todos[1], 2);
      assertATodo(todos[2], 1);
      const newName = "new name";
      await testee.update(todos[1].id, user, newName, todos[1].description, todos[1].importance, todos[1].dueDate);
      todos = await testee.getTodos(user, "importance", "ascending", true);
      assertATodo(todos[0], 0);
      assertATodo(todos[2], 1);
      assert.equal(todos[1].createdBy, user);
      assert.equal(todos[1].name, newName);
      assert.equal(todos[1].status, done[2]);
      assert.equal(todos[1].description, description[2]);
      assert.equal(todos[1].importance, importance[2]);
      assert.deepEqual(todos[1].dueDate, new Date(date[2]));
    });

    it("update a todos, the other todos gets untouched", async () => {
      const testee = new TodoStorage();
      await addThreeTodos(testee);
      let todos = await testee.getTodos(user, "importance", "ascending", true);
      assertATodo(todos[0], 0);
      assertATodo(todos[1], 2);
      assertATodo(todos[2], 1);
      const newName = "new name";
      const newDescription = "new description";
      const newImportance = 2;
      const newDueDate = new Date("2030-01-01");
      await testee.update(todos[1].id, user, newName, newDescription, newImportance, newDueDate);
      todos = await testee.getTodos(user, "importance", "ascending", true);
      assertATodo(todos[0], 0);
      assertATodo(todos[2], 1);
      assert.equal(todos[1].createdBy, user);
      assert.equal(todos[1].name, newName);
      assert.equal(todos[1].status, done[2]);
      assert.equal(todos[1].description, newDescription);
      assert.equal(todos[1].importance, newImportance);
      assert.deepEqual(todos[1].dueDate, newDueDate);
    });
  });
});
