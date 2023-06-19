import {CryptoUtil} from "../utils/crypto-util.js";

// eslint-disable-next-line import/prefer-default-export
export class User {
    constructor(email, password, isAdmin = false) {
        this.email = email;
        this.passwortHash = CryptoUtil.hashPwd(password);
        this.isAdmin = isAdmin;
    }
}