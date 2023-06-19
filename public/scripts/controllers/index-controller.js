import TodoController from './todo-controller.js';
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

    this.#setLoginState();
    this.#buttonLogin.addEventListener('click', () => {
      // eslint-disable-next-line no-unused-expressions
      authService.isLoggedIn() ? this.#logout() : this.#login();
    });
  }

  #setLoginButton() {
    this.#buttonLogin.innerHTML = authService.isLoggedIn() ? 'Logout' : 'Login';
  }

  #setHeaderButtons() {
    const state = authService.isLoggedIn() ? 'visible' : 'hidden';
    this.#sortButtons.forEach((button) => {
      // eslint-disable-next-line no-param-reassign
      button.style.visibility = state;
    });

    this.#buttonCreateTodo.style.visibility = state;
    this.#buttonFilterStatus.style.visibility = state;
  }

  #setLoginState() {
    this.#setHeaderButtons();
    this.#setLoginButton();
  }

  #login() {
    authService
      .login('admin@admin.ch', '123456')
      .then(() => {
        const todoController = new TodoController();
        todoController.renderTodoView();
        this.#buttonLogin.innerHTML = 'Logout';
        this.#setLoginState();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('login error:', error);
      });
  }

  #logout() {
    authService.logout();
    this.#todoContainer.innerHTML = '';
    this.#buttonLogin.innerHTML = 'Login';
    this.#setLoginState();
  }
}

new IndexController().initialize();
