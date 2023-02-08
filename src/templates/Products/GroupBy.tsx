import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer } from "../../components";
import { colorGray, fs10RegBlack2, py, rowCenterVertical, sh6, sh8, sw56 } from "../../styles";

export const ProductsGroupBy: FunctionComponent<ITableGroupBy> = ({ row, index, data }: ITableGroupBy) => {
  const uniqueUtmc = data.map((eachData: ITableData) => eachData.issuingHouse).filter((_, utmcIndex: number) => utmcIndex <= index);

  return (
    <View>
      {index !== 0 ? <CustomSpacer space={sh8} /> : null}
      {row.issuingHouse === uniqueUtmc[uniqueUtmc.length - 1] && row.issuingHouse !== uniqueUtmc[uniqueUtmc.length - 2] ? (
        <Fragment>
          <View style={{ ...rowCenterVertical, ...py(sh6), backgroundColor: colorGray._2 }}>
            <CustomSpacer isHorizontal={true} space={sw56} />
            <Text style={fs10RegBlack2}>{row.issuingHouse}</Text>
          </View>
        </Fragment>
      ) : null}
      {index === 0 ? <CustomSpacer space={sh8} /> : null}
    </View>
  );
};
