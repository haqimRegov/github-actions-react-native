import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { IconText } from "../../../../components";
import { borderBottomGray4, colorBlue, fs12BoldBlue2, px, sh48, sw16, sw184, sw8 } from "../../../../styles";

export interface ProductOptionsProps extends ITableOptions {
  handleShowPerformance: (data: IColumnItemAccordion) => void;
}

export const ProductOptions: FunctionComponent<ProductOptionsProps> = ({ onClose, data, handleShowPerformance }: ProductOptionsProps) => {
  const handleSelect = () => {
    onClose();
  };

  const handlePerformance = () => {
    onClose();
    handleShowPerformance(data);
  };

  const itemStyle: ViewStyle = {
    ...borderBottomGray4,
    ...fs12BoldBlue2,
    ...px(sw16),
    height: sh48,
    width: sw184,
  };

  return (
    <View style={{ borderRadius: sw8 }}>
      <IconText color={colorBlue._2} name="eye-show" onPress={handleSelect} text=" View Details" style={itemStyle} />
      <IconText color={colorBlue._2} name="performance" onPress={handlePerformance} text="Performance" style={itemStyle} />
      <IconText color={colorBlue._2} name="download" onPress={handleSelect} text="Download Reports" style={itemStyle} />
    </View>
  );
};
