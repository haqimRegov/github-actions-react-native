import React from "react";
import { Alert, Text, TouchableWithoutFeedback, View } from "react-native";

import { CustomSpacer, MenuPopup } from "../../../components";
import { IcoMoon } from "../../../icons";
import { centerHV, flexRow, fs13RegBlue, py, sh18, sw184, sw20, sw36 } from "../../../styles";

export interface ProductOptionsProps {
  item: ITableData;
}

export const ProductOptions = ({ item }: ProductOptionsProps) => {
  return (
    <MenuPopup
      RenderButton={({ show }) => {
        return (
          <View style={flexRow}>
            <TouchableWithoutFeedback onPress={show}>
              <IcoMoon name="action-menu" size={sw20} />
            </TouchableWithoutFeedback>
            <CustomSpacer isHorizontal={true} space={sw36} />
          </View>
        );
      }}
      RenderContent={({ hide }) => {
        const handleSelect = () => {
          hide();
          Alert.alert(item.name);
        };
        return (
          <View style={{ width: sw184, ...centerHV }}>
            <Text onPress={handleSelect} style={{ ...fs13RegBlue, ...py(sh18) }}>
              View Details
            </Text>
          </View>
        );
      }}
    />
  );
};
