export const deleteKey = <T extends object, U extends keyof T>(object: T, keys: U[]) => {
  let tempObject: object = { ...object };
  keys.forEach((eachKey: U) => {
    if (eachKey in tempObject) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [eachKey]: deletedKey, ...rest } = tempObject;
      tempObject = { ...rest };
    }
  });
  return tempObject;
};

export const extractKey = <T extends object, U extends keyof T>(object: T, keys: U[]) => {
  let tempObject: object = {};
  keys.forEach((eachKey: U) => {
    if (eachKey in object) {
      // const { [eachKey]: deletedKey, ...rest } = tempObject;
      tempObject = { ...tempObject, [eachKey]: object[eachKey] };
    }
  });
  return tempObject;
};

export const validateObject = <T extends object, U extends keyof T>(object: T, keys: U[]) => {
  const validation = keys.map((eachKey: U) => {
    if (object[eachKey]) {
      return true;
    }
    return false;
  });
  return validation.includes(false) === false;
};

// TODO smart check
// export const validateObject = <T extends object, U extends keyof T>(object: T, keys: U[] | { key: U; type: TInputs }[]) => {
//   const validation = keys.map((eachKey: U | { key: U; type: TInputs }) => {
//     if (typeof eachKey === "string" && object[eachKey]) {
//       return true;
//     }
//     if (typeof eachKey === "object") {
//       switch (eachKey.type) {
//         case "amount":
//           return isAmount(object[eachKey.key as string]);
//         case "number":
//           return isNumber(object[eachKey.key as string]);
//         case "alphanumeric":
//           return isAlphaNumeric(object[eachKey.key as string]);
//         case "string":
//           if (object[eachKey.key]) {
//             return true;
//           }
//           break;
//         case "Date":
//           return moment(object[eachKey.key]).isValid();

//         default:
//           break;
//       }
//     }
//     return false;
//   });
//   return validation.includes(false) === false;
// };
