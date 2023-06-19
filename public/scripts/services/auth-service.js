import { httpService } from './http-service.js';

class AuthService {
  // eslint-disable-next-line class-methods-use-this
  async login(userName, pwd) {
    const token = await httpService.ajax('POST', '/login/', {
      email: userName,
      pwd,
    });
    httpService.setAuthToken(token);
    return token;
  }

  // eslint-disable-next-line class-methods-use-this
  logout() {
    httpService.removeAuthToken();
  }

  // eslint-disable-next-line class-methods-use-this
  isLoggedIn() {
    return httpService.hasAuthToken();
  }
}

// eslint-disable-next-line import/prefer-default-export
export const authService = new AuthService();
