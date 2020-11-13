declare interface ITableData {
  [key: string]: any;
}

declare interface ITableIcon {
  color?: string;
  name: string;
  onPress?: () => void;
  size?: number;
  style?: import("react-native").ViewStyle;
}

declare interface ITableItemPrefix {
  key: string;
  value?: string;
  targetKey: string;
  textStyle?: import("react-native").TextStyle;
}

declare interface ITableItemKey {
  key: string;
  textStyle?: import("react-native").TextStyle;
}

declare interface IColumnItem {
  label: string;
  prefix?: string;
  prefixStyle?: import("react-native").TextStyle;
  textStyle?: import("react-native").TextStyle;
}

declare interface ITableColumn {
  customItem?: boolean;
  icon?: ITableIcon;
  itemIcon?: ITableIcon;
  itemStyle?: import("react-native").ViewStyle;
  itemTextStyle?: (item: ITableRowData) => import("react-native").TextStyle;
  key: ITableItemKey[];
  onPressHeader?: () => void;
  onPressItem?: (item: ITableRowData) => void;
  prefix?: ITableItemPrefix[];
  textStyle?: import("react-native").ViewStyle;
  title: string;
  titleStyle?: import("react-native").TextStyle;
  type?: "checkbox" | "radio";
  viewStyle?: import("react-native").ViewStyle;
  withAccordion?: boolean;
}

declare interface ITableOptions {
  data: ITableRowData;
  onClose: () => void;
}

declare interface ITableRowData {
  index: number;
  rawData: ITableData;
}

declare interface CustomTableProps {
  activeAccordion?: number[];
  columns: ITableColumn[];
  data: ITableData[];
  onChangeAccordion?: (indexes: number[]) => void;
  onRowSelect?: (record: ITableData[]) => void;
  RenderAccordion?: (record: ITableData) => JSX.Element;
  RenderOptions?: (props: ITableOptions) => JSX.Element;
  RenderCustomItem?: (record: ITableData, key: string) => JSX.Element;
  rowSelection?: ITableData[];
  rowSelectionLabel?: string;
}

declare interface ITableCustomItem {
  accordionIcon?: ITableIcon;
  item: ITableRowData;
  keyName: ITableItemKey;
  lastIndex: boolean;
}
