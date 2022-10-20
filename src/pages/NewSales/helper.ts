import { DEVICE, sw30, sw32 } from "../../styles";

export const scaledSpaceBetween = () => {
  const width = DEVICE.SCREEN.WIDTH;
  let scaledSpace: number = sw32;
  if (width > 1080) {
    scaledSpace = sw30;
    return scaledSpace;
  }
  return scaledSpace;
};
