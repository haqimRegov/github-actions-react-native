declare interface ITableData {
  [key: string]: any;
}

declare interface ITableIcon {
  color?: string;
  name: string;
  size?: number;
}

declare interface ITableItemPrefix {
  key: string;
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
  icon?: ITableIcon;
  itemIcon?: ITableIcon;
  itemStyle?: import("react-native").ViewStyle;
  itemTextStyle?: (item: IColumnItemAccordion) => import("react-native").TextStyle;
  key: ITableItemKey[];
  onPressHeader?: () => void;
  onPressItem?: (item: IColumnItemAccordion) => void;
  prefix?: ITableItemPrefix[];
  textStyle?: import("react-native").ViewStyle;
  title: string;
  type?: "checkbox" | "radio";
  viewStyle?: import("react-native").ViewStyle;
  withAccordion?: boolean;
}

declare interface ITableOptions {
  data: IColumnItemAccordion;
  onClose: () => void;
}

declare interface IColumnItemAccordion {
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
  rowSelection?: ITableData[];
  rowSelectionLabel?: string;
}
