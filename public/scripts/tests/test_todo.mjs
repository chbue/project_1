import * as assert from 'assert';
import Todo from '../services/todo.js';
import 'mocha';

describe('ToDo', () => {
  describe('getId', () => {
    it('set and get id', () => {
      const testee1 = new Todo('', '', 0, new Date());
      assert.equal(testee1.getId(), 0);
      const testee2 = new Todo('', '', 0, new Date());
      assert.equal(testee2.getId(), 1);
    });
  });

  describe('getTitle', () => {
    it('set and get title', () => {
      const expectedValue = 'test';
      const testee = new Todo(0, expectedValue, '', 0, new Date());
      assert.equal(testee.getTitle(), expectedValue);
    });
  });

  describe('getDescription', () => {
    it('set and get description', () => {
      const expectedValue = 'test';
      const testee = new Todo(0, '', expectedValue, 0, new Date());
      assert.equal(testee.getDescription(), expectedValue);
    });
  });

  describe('getImportance', () => {
    it('GIVEN ToDo with importance of -1 WHEN getting importance THEN importance is 0', () => {
      const importance = -1;
      const expectedImportance = 0;
      const testee = new Todo('', '', importance, new Date());
      assert.equal(testee.getImportance(), expectedImportance);
    });

    it('GIVEN ToDo with importance of 6 WHEN getting importance THEN importance is 0', () => {
      const importance = 6;
      const expectedImportance = 0;
      const testee = new Todo('', '', importance, new Date());
      assert.equal(testee.getImportance(), expectedImportance);
    });
  });

  describe('getDueDate', () => {
    it('get set due date', () => {
      const date = new Date('1995-12-17T03:24:00');
      const testee = new Todo(1, 'title', 'description', 0, date);
      assert.equal(testee.getDueDate(), date);
    });
  });

  describe('getState', () => {
    it('open is default', () => {
      const testee = new Todo(1, 'title', 'description', 0, new Date());
      assert.equal(testee.getState(), 'opened');
    });
  });

  describe('toJSON', () => {
    it('should return the properties in JSON format', () => {
      const date = new Date('1995-12-17T03:24:00');
      const testee = new Todo(1, 'title', 'description', 2, date);
      const expectedJsonRegex =
        /^{"id":1,"title":"title","description":"description","importance":2,"createDate":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z","dueDate":"1995-12-17T02:24:00.000Z","state":"opened"}$/;
      const actualJson = testee.toJSON();
      assert.match(actualJson, expectedJsonRegex);
    });
  });
});
