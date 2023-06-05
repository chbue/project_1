export default class TodoListRendering {

    constructor(container) {
        this.container = container;
    }
    // TODO: consider refactoring
    // eslint-disable-next-line class-methods-use-this
    renderToDoTable(todos) {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        const table = document.createElement("table");

        // Create table headers
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const headers = ["Id", "Title", "Description", "Importance", "Create Date", "Due Date", "State"];

        headers.forEach(headerText => {
            const header = document.createElement("th");
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement("tbody");

        todos.forEach(todo => {
            const row = document.createElement("tr");
            const {id, title, description, importance, createDate, dueDate, state} = todo.toJSON();

            const properties = [id, title, description, importance, createDate, dueDate, state];
            properties.forEach(property => {
                this.#extracted(property, row);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        this.container.appendChild(table);
    }

    // eslint-disable-next-line class-methods-use-this
    #extracted(id, row) {
        const cell = document.createElement("td");
        cell.textContent = id;
        row.appendChild(cell);
    }
}