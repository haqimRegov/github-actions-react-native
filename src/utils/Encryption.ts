import CryptoJS from "react-native-crypto-js";

export const Encrypt = (text: string, token: string) => {
  const encryptedText = CryptoJS.AES.encrypt(text, token).toString();
  return encryptedText;
};

export const Decrypt = (text: string, token: string) => {
  const bytes = CryptoJS.AES.decrypt(text, token);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};
