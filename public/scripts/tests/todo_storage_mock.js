import sinon from "sinon";

// Create a mock for the TodoStorage class
const TodoStorageMock = sinon.stub().returns({
  getAll: sinon.stub().returns([]),
  update: sinon.stub().returns([]),
});

export default TodoStorageMock;
