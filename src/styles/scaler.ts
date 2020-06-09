import { Dimensions, PixelRatio } from "react-native";

const { height, width } = Dimensions.get("window");

const baseHeight = 800;
const baseWidth = 1280;
const baseHypotenuse = Math.sqrt(baseWidth * baseWidth + baseHeight * baseHeight);
const deviceHypotenuse = Math.sqrt(width * width + height * height);

export const scaleHeight = (size: number) => {
  return deviceHypotenuse < baseHypotenuse ? PixelRatio.roundToNearestPixel((height / baseHeight) * size) : size;
};

export const scaleWidth = (size: number) => {
  return deviceHypotenuse < baseHypotenuse ? PixelRatio.roundToNearestPixel((width / baseWidth) * size) : size;
};
