declare interface ITableData {
  [key: string]: any;
}

declare interface ITableIcon {
  color?: string;
  name: string;
  size?: number;
}

declare interface ITableColumn {
  icon?: ITableIcon;
  itemStyle?: import("react-native").ViewStyle;
  itemTextStyle?: (item: IColumnItemAccordion) => import("react-native").TextStyle;
  key: string;
  onPressHeader?: () => void;
  onPressItem?: (item: IColumnItemAccordion) => void;
  textStyle?: import("react-native").ViewStyle;
  title: string;
  type?: "checkbox" | "radio";
  viewStyle?: import("react-native").ViewStyle;
}

declare interface IColumnItemAccordion {
  index: number;
  key: string;
  rawData: ITableData;
  value: string;
}

interface CustomTableProps {
  activeAccordion?: number[];
  columns: ITableColumn[];
  data: ITableData[];
  onChangeAccordion?: (indexes: number[]) => void;
  onRowSelect?: (record: ITableData[]) => void;
  RenderAccordion?: (record: ITableData) => JSX.Element;
  RenderOptions?: (record: ITableData) => JSX.Element;
  rowSelection?: ITableData[];
}
