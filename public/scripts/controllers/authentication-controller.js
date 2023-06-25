import TodoController from './todo-controller.js';
import { authService } from '../services/auth-service.js';
import AuthenticationView from '../../views/authentication-view.js';

export default class AuthenticationController {
  #buttonLogin;
  #indexView;

  constructor(indexView) {
    this.#indexView = indexView;
    this.#indexView.initialize();
  }

  initialize() {
    this.#buttonLogin = document.getElementById('buttonLogin');
    this.#indexView.setLoggedIn(authService.isLoggedIn());
    this.#buttonLogin.addEventListener('click', () => {
      // eslint-disable-next-line no-unused-expressions
      this.#changeLoginState();
    });
  }

  #changeLoginState() {
    if (authService.isLoggedIn()) {
      this.#logout();
      this.#indexView.setLoggedIn(false);
    } else {
      this.#login();
      this.#indexView.setLoggedIn(true);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #login() {
    authService
      .login('admin@admin.ch', '123456')
      .then(() => {
        const todoController = new TodoController();
        todoController.renderTodoView();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('login error:', error);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  #logout() {
    authService.logout();
  }
}

new AuthenticationController(new AuthenticationView()).initialize();
