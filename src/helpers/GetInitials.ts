import { isNotEmpty } from "../utils";

const REGEX_BASIC = /[^a-zA-Z 0-9]/g;

export const getInitials = (name: string | undefined): string => {
  if (name !== undefined && name !== "" && isNotEmpty(name)) {
    return name
      .replace(REGEX_BASIC, "")
      .split(" ")
      .filter((text) => text !== "")
      .map((text, index) => (index < 2 ? text.substring(0, 1) : ""))
      .join("")
      .toUpperCase();
  }

  return "";
};
