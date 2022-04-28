import React, { Fragment, FunctionComponent, useRef } from "react";
import { Alert, ViewStyle } from "react-native";
import { Text, View } from "react-native-animatable";

import { AdvanceTable, CustomFlexSpacer, CustomSpacer, RoundedButton } from "../../../../components";
import { Language } from "../../../../constants";
import { RNInAppBrowser } from "../../../../integrations/react-native-inapp-browser-reborn";
import { orderTrackingSummary } from "../../../../network-actions";
import {
  colorBlack,
  flexRow,
  fs12BoldGray5,
  fs24BoldBlue1,
  fsTransformNone,
  px,
  sh24,
  sw1,
  sw104,
  sw120,
  sw16,
  sw186,
  sw24,
  sw376,
} from "../../../../styles";
import { CustomTableItem } from "./CustomTableItem";

const { DASHBOARD_TRACKING } = Language.PAGE;

declare interface ITrackingProps {
  data: IDashboardOrderSummary;
}

export const Tracking: FunctionComponent<ITrackingProps> = ({ data }: ITrackingProps) => {
  const fetching = useRef<boolean>(false);
  const { trackingSummary, orderNumber } = data;
  // button styling
  const buttonStyle: ViewStyle = { ...px(sw16), borderWidth: sw1, height: sw24, width: "auto" };

  // handle Export pdf
  const handleExportPDF = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      const request = { orderNo: orderNumber };
      const response: IOrderTrackingSummaryResponse = await orderTrackingSummary(request);
      fetching.current = false;
      if (response !== undefined) {
        const { data: responseData, error } = response;
        if (error === null && responseData !== null) {
          if (responseData.result.status === true) {
            RNInAppBrowser.openLink(responseData.result.pdf.url);
          }
        }
        if (error !== null) {
          setTimeout(() => {
            Alert.alert(error.message);
          }, 100);
        }
      }
    }
  };

  // table columns
  const columns: ITableColumn[] = [
    { customItem: true, key: [{ key: "createdOn" }], title: DASHBOARD_TRACKING.LABEL_DATE, viewStyle: { width: sw120 } },
    {
      customItem: true,
      key: [{ key: "status" }],
      title: DASHBOARD_TRACKING.LABEL_STATUS,
      viewStyle: { width: sw186 },
      textStyle: { fontWeight: "normal" },
    },
    {
      key: [{ key: "level" }],
      title: DASHBOARD_TRACKING.LABEL_LEVEL,
      viewStyle: { width: sw104 },
      textStyle: { fontWeight: "normal", ...fsTransformNone },
    },
    { customItem: true, key: [{ key: "remark" }], title: DASHBOARD_TRACKING.LABEL_REMARKS, viewStyle: { width: sw376 } },
  ];

  return (
    <Fragment>
      {/* upper section */}
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <View style={flexRow}>
          <View>
            <Text style={fs24BoldBlue1}>{DASHBOARD_TRACKING.HEADING}</Text>
          </View>
          <CustomFlexSpacer />
          <View>
            <RoundedButton
              text="Export PDF"
              onPress={handleExportPDF}
              textStyle={fs12BoldGray5}
              secondary={true}
              buttonStyle={buttonStyle}
              icon="export"
              iconColor={colorBlack._2}
            />
          </View>
        </View>
        {/* table */}
        <AdvanceTable
          data={trackingSummary}
          columns={columns}
          RenderCustomItem={(tableData: ITableCustomItem) => <CustomTableItem {...tableData} sortedColumns={[]} />}
        />
      </View>
    </Fragment>
  );
};
