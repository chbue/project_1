export default class AuthenticationView {
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
    this.#sortButtons = document.querySelectorAll('.sort-buttons button');
  }

  setLoggedIn(isLoggedIn) {
    this.#setHeaderButtons(isLoggedIn);
    this.#setLoginButton(isLoggedIn);
  }

  #setLoginButton(isLoggedIn) {
    this.#buttonLogin.innerHTML = isLoggedIn ? 'logout' : 'login';
  }

  // eslint-disable-next-line class-methods-use-this
  #setHeaderButtons(isLoggedIn) {
    document.querySelectorAll('.logged-in').forEach((loggedInElements) => {
      // eslint-disable-next-line no-param-reassign
      loggedInElements.style.visibility = isLoggedIn ? 'visible' : 'hidden';
    });
  }
}
