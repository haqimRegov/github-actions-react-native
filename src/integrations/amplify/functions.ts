import { Storage } from "aws-amplify";

const put = async (path: string, url: string, type: string) => {
  try {
    const response = await fetch(path);
    const blob = await response.blob();
    const res = await Storage.put(url, blob, {
      contentType: type,
      // If not specified, the upload will go by default inside a public directory.
      level: "public",
      customPrefix: { public: "" },
      progressCallback: (_status) => {},
    });
    // eslint-disable-next-line no-console
    return res;
  } catch (error) {
    console.warn("Error in Storage.Put integrations/amplify/functions.ts", error);
    return undefined;
  }
};

export const StorageUtil = { put };
