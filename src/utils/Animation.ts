import { LayoutAnimation, LayoutAnimationConfig } from "react-native";

type ArrowFunctionType = () => void;

const layout = (config?: LayoutAnimationConfig, onAnimationDidEnd?: ArrowFunctionType) => {
  LayoutAnimation.configureNext(
    {
      duration: 150,
      update: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      ...config,
    },
    onAnimationDidEnd,
  );
};

export const AnimationUtils = { layout };
