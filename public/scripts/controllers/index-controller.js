import { authService } from '../services/auth-service.js';

export default class IndexController {
  #todoContainer;
  #buttonLogin;
  #buttonCreateTodo;
  #buttonFilterStatus;
  #sortButtons;
  initialize() {
    this.#todoContainer = document.getElementById('todo-container');
    this.#buttonLogin = document.getElementById('buttonLogin');
    this.#buttonCreateTodo = document.getElementById('buttonCreateTodo');
    this.#buttonFilterStatus = document.getElementById('buttonFilterStatus');
    this.#sortButtons = document.querySelectorAll('.sortButtons button');

    this.#buttonLogin.addEventListener('click', () => {
      // eslint-disable-next-line no-unused-expressions
      authService.isLoggedIn() ? this.#logout() : this.#login();
    });
  }
  // eslint-disable-next-line class-methods-use-this
  #login() {
    authService.login('admin@admin.ch', '123456');
  }

  #logout() {
    authService.logout();
  }
}

new IndexController().initialize();
