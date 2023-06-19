import { SecurityUtil } from '../utils/security.js';

export class IndexController {
  // eslint-disable-next-line class-methods-use-this
  login = async (req, res) => {
    await SecurityUtil.handleLogin(req, res);
  };
}

export const indexController = new IndexController();
