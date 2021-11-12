declare interface IObject {
  [key: string]: unknown;
}
export const deleteKey = (object: IObject, keys: string[]) => {
  let tempObject = { ...object };
  keys.forEach((eachKey: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [eachKey]: deletedKey, ...rest } = tempObject;
    tempObject = { ...rest };
  });
  return tempObject;
};
