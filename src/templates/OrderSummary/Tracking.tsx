import React, { Fragment, FunctionComponent } from "react";
import { ViewStyle } from "react-native";
import { Text, View } from "react-native-animatable";

import { AdvanceTable, CustomFlexSpacer, Loader, RoundedButton } from "../../components";
import { Language } from "../../constants";
import {
  colorBlue,
  flexRow,
  fs10BoldGray6,
  fs12RegBlue1,
  fs18BoldBlue1,
  fsTransformNone,
  px,
  py,
  sh24,
  sh64,
  sw1,
  sw104,
  sw11,
  sw120,
  sw16,
  sw186,
  sw24,
  sw376,
  sw96,
} from "../../styles";
import { CustomTableItem } from "./CustomTableItem";

const { DASHBOARD_TRACKING } = Language.PAGE;

declare interface ITrackingProps {
  data: IDashboardOrderSummary;
  handleExportPDF: () => void;
  loading: boolean;
}

export const Tracking: FunctionComponent<ITrackingProps> = ({ data, handleExportPDF, loading }: ITrackingProps) => {
  const { trackingSummary } = data;

  const buttonStyle: ViewStyle = { ...px(sw16), borderColor: colorBlue._1, borderWidth: sw1, height: sh24, width: sw96 };

  const columns: ITableColumn[] = [
    {
      customItem: true,
      key: [{ key: "createdOn" }],
      title: DASHBOARD_TRACKING.LABEL_DATE,
      viewStyle: { width: sw120, ...px(sw16) },
    },
    {
      customItem: true,
      key: [{ key: "status" }],
      title: DASHBOARD_TRACKING.LABEL_STATUS,
      viewStyle: { width: sw186 },
    },
    {
      key: [{ key: "level", textStyle: fs12RegBlue1 }],
      title: DASHBOARD_TRACKING.LABEL_LEVEL,
      viewStyle: { width: sw104 },
      textStyle: fsTransformNone,
    },
    { customItem: true, key: [{ key: "remark" }], title: DASHBOARD_TRACKING.LABEL_REMARKS, viewStyle: { width: sw376 } },
  ];

  return (
    <Fragment>
      <View style={px(sw24)}>
        <View style={{ ...flexRow, ...py(sh24) }}>
          <Text style={fs18BoldBlue1}>{DASHBOARD_TRACKING.HEADING}</Text>
          <CustomFlexSpacer />
          <RoundedButton
            buttonStyle={buttonStyle}
            icon="export"
            iconColor={colorBlue._1}
            iconSize={sw11}
            onPress={handleExportPDF}
            secondary={true}
            text={DASHBOARD_TRACKING.BUTTON_EXPORT}
            textStyle={{ ...fs10BoldGray6, ...fsTransformNone }}
          />
        </View>
        <AdvanceTable
          data={trackingSummary as unknown as ITableData[]}
          columns={columns}
          RenderCustomItem={(tableData: ITableCustomItem) => (
            <CustomTableItem
              {...tableData}
              item={{ ...tableData.item, rawData: { ...tableData.item.rawData, dueDate: null } }}
              sortedColumns={[]}
            />
          )}
          rowContainerStyle={{ minHeight: sh64 }}
        />
      </View>
      <Loader visible={loading} />
    </Fragment>
  );
};
