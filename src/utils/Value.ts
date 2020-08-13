export const maskedString = (input: string, maskFrom?: number, maskTo?: number, mask?: string) => {
  const start = maskFrom !== undefined ? maskFrom : 0;
  const end = maskTo !== undefined ? maskTo : input.length;
  const maskedCharacter = mask !== undefined ? mask : "*";

  return input
    .split("")
    .map((char, index) => {
      if (index >= start && index < end) {
        return maskedCharacter;
      }
      return char;
    })
    .join("");
};

export const shortenString = (str: string, max: number, index: number, noDots?: boolean) => {
  if (str.length <= max) {
    return str;
  }

  return `${str.substring(0, index)}${noDots === true ? "" : "..."}`;
};

export const isObjectEqual = (firstObject: object, secondObject: object) => {
  const keys = Object.keys(firstObject);
  let equal = true;
  keys.map((key: string) => {
    if (firstObject[key] !== secondObject[key]) {
      equal = false;
    }
    return false;
  });

  return equal;
};
