import Share from "react-native-share";

const filesBase64 = async (base64List: string[]) => {
  const share = await Share.open({ urls: base64List })
    .then((res) => res)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
  return share;
};

export const RNShareApi = {
  filesBase64,
};
