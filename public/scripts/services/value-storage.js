class ValueStorage {
  setItem(name, value) {
    if (value) {
      localStorage.setItem(name, JSON.stringify(value));
    } else {
      localStorage.removeItem(name);
    }
    return value;
  }

  getItem(name) {
    return JSON.parse(localStorage.getItem(name) || null);
  }
}

export const valueStorage = new ValueStorage();