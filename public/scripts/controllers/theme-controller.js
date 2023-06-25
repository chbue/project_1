export default class ThemeController {
  #buttonToggleTheme;

  initialize() {
    this.#buttonToggleTheme = document.getElementById('buttonToggleTheme');
    this.#initEventHandlers();
  }

  // eslint-disable-next-line class-methods-use-this
  #toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

  #initEventHandlers() {
    this.#buttonToggleTheme.addEventListener('click', () => {
      this.#toggleDarkMode();
    });
  }
}

new ThemeController().initialize();
