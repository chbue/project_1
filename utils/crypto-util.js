import crypto from "crypto";

// eslint-disable-next-line import/prefer-default-export
export class CryptoUtil {
  static hashPwd(pwd) {
    return crypto
      .createHmac('sha256', 'secret!') // more information: https://nodejs.org/api/crypto.html
      .update(pwd)
      .digest('hex');
  }
}
