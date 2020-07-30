import RNFS from "react-native-fs";

const readFile = async (path: string) => {
  try {
    return await RNFS.readFile(path, "base64");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return "An Error Occurred";
  }
};

const readFileTemp = async (fileName: string) => {
  try {
    return await RNFS.readFile(`${RNFS.TemporaryDirectoryPath}/${fileName}`, "base64");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return "An Error Occurred";
  }
};

const writeFile = async (path: string, base64: string) => {
  try {
    return await RNFS.writeFile(path, base64, "base64");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return "An Error Occurred";
  }
};

const writeFileTemp = async (fileName: string, base64: string) => {
  try {
    const path = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
    await RNFS.writeFile(path, base64, "base64");
    return { path };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return "An Error Occurred";
  }
};

export const ReactFileSystem = { readFile, readFileTemp, writeFile, writeFileTemp };
