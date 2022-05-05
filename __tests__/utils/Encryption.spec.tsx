import { Decrypt, Encrypt } from "../../src/utils";

it("encrypted and decrypted correctly", () => {
  const token = "token";
  const value = "test";
  const encryptedValue = Encrypt(value, token);
  const decryptedValue = Decrypt(encryptedValue, token);

  expect(decryptedValue).toBe(value);
});
