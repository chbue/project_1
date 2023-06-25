class ValueStorage {
  // eslint-disable-next-line class-methods-use-this
  setItem(name, value) {
    if (value) {
      localStorage.setItem(name, JSON.stringify(value));
    } else {
      localStorage.removeItem(name);
    }
    return value;
  }

  // eslint-disable-next-line class-methods-use-this
  getItem(name) {
    return JSON.parse(localStorage.getItem(name) || null);
  }
}

// eslint-disable-next-line import/prefer-default-export
export const valueStorage = new ValueStorage();
