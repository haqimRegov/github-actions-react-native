import ImagePicker, { Image, Options } from "react-native-image-crop-picker";

const defaultOptions: Options = {
  cropping: false,
  forceJpg: true,
  includeBase64: true,
  mediaType: "photo",
  multiple: false,
  // android
  freeStyleCropEnabled: true,
};

const SIZES = {
  height: 1500,
  width: 2000,
};

type SuccessCallback = (image: Image | Image[]) => void;

export const imageOpenPicker = async (handleSuccess: SuccessCallback, options?: Options) => {
  try {
    const image = await ImagePicker.openPicker({
      ...defaultOptions,
      height: SIZES.height,
      width: SIZES.width,
      ...options,
    });
    handleSuccess(image);
  } catch (error) {
    if (JSON.stringify(error).includes("cancelled")) {
      // // eslint-disable-next-line no-console
      return "";
    }
    // eslint-disable-next-line no-console
    return console.warn("Error", error);
  }
  return false;
};

export const imageOpenCamera = async (handleSuccess: SuccessCallback, options?: Options) => {
  try {
    const image = await ImagePicker.openCamera({
      ...defaultOptions,
      height: SIZES.height,
      width: SIZES.width,
      ...options,
    });
    handleSuccess(image);
  } catch (error) {
    if (JSON.stringify(error).includes("cancelled")) {
      // // eslint-disable-next-line no-console
      return "";
    }
    // eslint-disable-next-line no-console
    return console.warn("Error", error);
  }
  return false;
};
