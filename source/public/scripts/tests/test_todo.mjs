import * as assert from "assert";
import { Todo } from "../todo.js";
import "mocha";

describe("Array", () => {
  it("should multiply two numbers", () => {
    const testee = new Todo("title", "description", 2, new Date());
    assert.equal(testee.isDueDateInPast(), false);
  });
});
