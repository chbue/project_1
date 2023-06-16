export default class TodoListRendering {
  constructor(container) {
    this.container = container;
  }
  // TODO: consider refactoring
  // eslint-disable-next-line class-methods-use-this
  renderToDoTable(todos) {
    // Define the template string
    const templateString = `
        <div class="todo">
            <h2>{{title}}</h2>
            <p><strong>Due Date:</strong> {{dueDate}}</p>
            <p><strong>Importance:</strong> {{importance}}</p>
            <p><strong>State:</strong> {{state}}</p>
            <p><strong>Description:</strong> {{description}}</p>
        </div>
    `;

    // Compile the template
    const template = Handlebars.compile(templateString);

    // Create a div element to hold the rendered HTML
    const todoContainer = document.createElement("div");
    todoContainer.id = "todo-container";

    // Clear the todoContainer before rendering new todos
    todoContainer.innerHTML = "";

    // Append the todoContainer to the document body
    const cont = document.getElementById("todoTableContainer");
    cont.innerHTML = "";
    cont.appendChild(todoContainer);

    // Iterate over todos and render each todo
    todos.forEach((todo) => {
      // Render the compiled template with the todo data
      const html = template(todo.toJSON());

      // Create a div element for each rendered todo
      const todoDiv = document.createElement("div");
      todoDiv.innerHTML = html;

      // Apply CSS styles for the todo element
      todoDiv.style.border = "1px solid black";
      todoDiv.style.padding = "10px";
      todoDiv.style.marginBottom = "10px";

      // Append the todo div to the todoContainer
      todoContainer.appendChild(todoDiv);
    });
    cont.appendChild(todoContainer);
  }
}
