import { camelCase } from "camel-case";

export const camelCaseString = (value: string) => {
  return camelCase(value);
};

export const parseAmount = (input: string) => {
  const defaultInput = input || "0";
  return parseFloat(defaultInput.replace(/[,]/g, ""));
};

export const parseAmountToString = (input: string) => {
  const defaultInput = input || "0";
  return parseFloat(defaultInput.replace(/[,]/g, "")).toString();
};

export const formatAmount = (input: number | string) => {
  const value = typeof input === "number" ? input : parseAmount(input);
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/[^0-9,.]/g, "");
};

export const formatNumber = (input: string) => {
  return input.replace(/[^0-9]/g, "");
};

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
  keys.forEach((key: string) => {
    if (firstObject[key] !== secondObject[key]) {
      equal = false;
    }
    return false;
  });

  return equal;
};

export const titleCaseString = (text: string) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join(" ");
};

export const splitString = (str: string, max: number) => {
  if (str.length <= max) {
    return [str];
  }
  const newString: string[] = [];
  str.split(" ").forEach((word: string) => {
    const prevWord = newString.length === 0 || newString[newString.length - 1].length === 0 ? "" : `${newString[newString.length - 1]} `;
    const updatedWord = `${prevWord}${word}`;
    if (updatedWord.length <= max && newString.length > 0) {
      newString[newString.length - 1] = updatedWord;
    } else {
      newString.push(word);
    }
  });
  return newString;
};

export const isArrayNotEmpty = (value: unknown[] | null | undefined) => {
  return value !== null && value !== undefined && value.length > 0;
};

export const isNotEmpty = (value: string | number | boolean | object | undefined | null) => {
  return value !== null && value !== undefined;
};

export const isEmpty = (value: string | number | boolean | object | undefined | null) => {
  return value === null || value === undefined;
};
