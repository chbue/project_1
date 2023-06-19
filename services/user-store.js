import Datastore from 'nedb-promises';
import {CryptoUtil} from '../utils/crypto-util.js';
import {User} from "./user.js";

export class UserStore {
  constructor(db) {
    this.db = db || new Datastore({ filename: './data/user.db', autoload: true });
  }

  async initData() {
    const admin = await this.findByEmail('admin@admin.ch');
    if (!admin) {
      await this.registerAdmin('admin@admin.ch', '123456');
    }
  }

  async all() {
    return this.db.find({});
  }

  async findByEmail(email) {
    return this.db.findOne({ email });
  }

  async registerAdmin(email, passwort) {
    if (!(email && passwort)) {
      throw new Error('missing data');
    }
    const user = new User(email, passwort, true);
    return this.db.insert(user);
  }

  async register(email, passwort) {
    if (!(email && passwort)) {
      throw new Error('missing data');
    }
    const user = new User(email, passwort, false);
    return this.db.insert(user);
  }

  async authenticate(email, passwort) {
    if (!(email && passwort)) {
      return false;
    }
    const user = await this.db.findOne({ email });
    if (user == null) {
      await this.register(email, passwort);
      return true;
    }
    return user.passwortHash === CryptoUtil.hashPwd(passwort);
  }
}

export const userStore = new UserStore();
await userStore.initData();
