export const deleteKey = <T extends object, U extends keyof T>(object: T, keys: U[]) => {
  let tempObject: object = { ...object };
  keys.forEach((eachKey: U) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (eachKey in tempObject) {
      const { [eachKey]: deletedKey, ...rest } = tempObject;
      tempObject = { ...rest };
    }
  });
  return tempObject;
};
