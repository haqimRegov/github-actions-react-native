import Share from "react-native-share";

import { updateStorageData } from "../async-storage";

const filesBase64 = async (base64List: string[]) => {
  const share = await Share.open({ urls: base64List })
    .then((res) => res)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
  return share;
};

const modalCheckFilesBase64 = async (base64List: string[]) => {
  await updateStorageData("thirdPartyModal", true);
  await filesBase64(base64List);
  await updateStorageData("thirdPartyModal", false);
};

export const RNShareApi = {
  filesBase64,
  modalCheckFilesBase64,
};
