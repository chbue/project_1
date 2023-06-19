import { valueStorage } from './value-storage.js';

const tokenKey = 'token';

class HttpService {
  ajax(method, url, data, headers) {
    const fetchHeaders = new Headers({
      'content-type': 'application/json',
      ...(headers || {}),
    });

    if (valueStorage.getItem(tokenKey)) {
      fetchHeaders.append('authorization', `Bearer ${valueStorage.getItem(tokenKey)}`);
    }

    return fetch(url, {
      method,
      headers: fetchHeaders,
      body: JSON.stringify(data),
    }).then((x) => x.json());
  }

  // eslint-disable-next-line class-methods-use-this
  setAuthToken(token) {
    valueStorage.setItem(tokenKey, token);
  }

  // eslint-disable-next-line class-methods-use-this
  hasAuthToken() {
    return Boolean(valueStorage.getItem(tokenKey));
  }

  // eslint-disable-next-line class-methods-use-this
  removeAuthToken() {
    valueStorage.setItem(tokenKey, undefined);
  }

  // eslint-disable-next-line class-methods-use-this
  getSortKey(sortMethod) {
    const prefix = 'sortMethod_';
    return prefix + sortMethod;
  }

  setSortStatus(sortMethod) {
    const sortKey = this.getSortKey(sortMethod);
    let sortBy = valueStorage.getItem(sortKey);
    if (sortBy === null || sortBy === 'ascending') {
      sortBy = 'descending';
    } else {
      sortBy = 'ascending';
    }
    return valueStorage.setItem(sortKey, sortBy);
  }

  getSortStatus(sortMethod) {
    const sortKey = this.getSortKey(sortMethod);
    return valueStorage.getItem(sortKey);
  }
}

export const httpService = new HttpService();
