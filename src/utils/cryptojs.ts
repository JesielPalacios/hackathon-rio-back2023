import CryptoJS from 'crypto-js';
import config from './config';

export function encryptPassword(password: string): string {
  return CryptoJS.AES.encrypt(password, config.jwtPassSec!).toString();
}

export function decryptPassword(password: string) {
  let decryptedText = CryptoJS.AES.decrypt(password, config.jwtPassSec!);
  let originalText = decryptedText.toString(CryptoJS.enc.Utf8);

  return originalText;
}
