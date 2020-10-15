import CryptoJS from "react-native-crypto-js";

export const Encrypt = async (text: string, token: string) => {
  const encryptedPassword = CryptoJS.AES.encrypt(text, token).toString();
  return encryptedPassword;
};
