import { SAMPLE_CLIENT_4 } from "../../mocks";

export const uploadClientId = (token: string, params: FileBase64) => {
  if (token === "debug") {
    // eslint-disable-next-line no-console
    console.log(token, params);
  }
  const results = SAMPLE_CLIENT_4;
  return results;
};
