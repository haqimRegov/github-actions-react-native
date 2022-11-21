import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { IconText } from "../../../../components";
import { borderBottomGray2, fs12BoldBlue1, px, sh48, sw16, sw184, sw8 } from "../../../../styles";

export interface ProductOptionsProps extends ITableOptions {
  handleShareDocuments: (fund: IProduct) => void;
  handleShowPerformance?: (data: ITableRowData) => void;
  handleViewDetails: (fund: IProduct) => void;
  shareSuccess?: boolean;
}

export const ProductOptions: FunctionComponent<ProductOptionsProps> = ({
  data,
  // handleShareDocuments,
  // handleShowPerformance,
  handleViewDetails,
  onClose,
  shareSuccess,
}: ProductOptionsProps) => {
  // const handleDownload = () => {
  //   handleShareDocuments(data.rawData as IProduct);
  // };

  // const handlePerformance = () => {
  //   onClose();
  //   if (handleShowPerformance !== undefined) {
  //     handleShowPerformance(data);
  //   }
  // };

  const handleDetails = () => {
    onClose();
    handleViewDetails(data.rawData as IProduct);
  };

  if (shareSuccess !== undefined && shareSuccess === true) {
    onClose();
  }

  const itemStyle: ViewStyle = {
    ...borderBottomGray2,
    ...fs12BoldBlue1,
    ...px(sw16),
    height: sh48,
    width: sw184,
  };

  return (
    <View style={{ borderRadius: sw8 }}>
      <IconText name="eye-show" onPress={handleDetails} text="View Details" style={itemStyle} />
      {/* <IconText name="performance" onPress={handlePerformance} text="Performance" style={itemStyle}  /> */}
      {/* <IconText name="download" onPress={handleDownload} text="Download Reports" style={itemStyle} /> */}
    </View>
  );
};
