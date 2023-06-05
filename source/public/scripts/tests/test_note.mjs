import * as assert from "assert";
import {Note} from "../note.js";
import "mocha";


describe("Array", () => {
    it("should multiply two numbers", () => {
      const testee = new Note("title", "description", 2, new Date());
      assert.equal(testee.isDueDateInPast(), false);
    });
});
