declare interface ITableData {
  [key: string]: unknown;
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
  targetKey: string;
  textStyle?: import("react-native").TextStyle;
  value?: string;
}

declare interface ITableItemKey {
  key: string;
  textStyle?: import("react-native").TextStyle;
  name?: string;
}

declare interface IColumnItem {
  label: string;
  prefix?: string;
  prefixStyle?: import("react-native").TextStyle;
  textStyle?: import("react-native").TextStyle;
}

declare interface ITableColumn {
  customHeader?: boolean;
  customItem?: boolean;
  icon?: ITableIcon;
  itemIcon?: ITableIcon;
  itemStyle?: import("react-native").ViewStyle;
  itemTextStyle?: (item: ITableRowData) => import("react-native").TextStyle;
  key: ITableItemKey[];
  onPressHeader?: () => void;
  onPressItem?: (item: ITableRowData) => void;
  prefix?: ITableItemPrefix[];
  textStyle?: import("react-native").TextStyle;
  title: string;
  titleStyle?: import("react-native").TextStyle;
  type?: "checkbox" | "radio";
  viewStyle?: import("react-native").ViewStyle;
  withAccordion?: boolean;
  withHeaderPopup?: boolean;
}

declare interface ITableOptions {
  data: ITableRowData;
  onClose: () => void;
}

declare interface ITableRowData {
  index: number;
  rawData: ITableData;
}

declare interface ITableCustomItem {
  accordionIcon?: ITableIcon;
  item: ITableRowData;
  keyName: ITableItemKey;
  lastIndex: boolean;
}

declare interface ITableGroupBy {
  row: ITableData;
  data: ITableData[];
  index: number;
}

declare interface BaseTableProps {
  activeAccordion?: number[];
  columns: ITableColumn[];
  handleRowNavigation?: (item: ITableData) => void;
  onRowSelect?: (record: ITableData) => void;
  RenderAccordion?: (record: ITableData, index: number) => JSX.Element;
  RenderCustomItem?: (customItem: ITableCustomItem) => JSX.Element;
  RenderEmptyState?: () => JSX.Element;
  RenderOptions?: (props: ITableOptions) => JSX.Element;
  rowContainerStyle?: import("react-native").ViewStyle;
  rowSelection?: ITableData[];
  rowSelectionKey?: string;
}

declare interface BaseTableHeaderProps {
  headerPopup?: TableHeaderPopupProps;
  RenderCustomHeader?: RenderCustomHeaderType;
  RowSelectionItem?: () => JSX.Element;
}

declare type RenderCustomHeaderType = (props: RenderCustomHeaderProps) => JSX.Element;

declare interface RenderCustomHeaderProps {
  item: ITableColumn;
}

declare interface AdvanceTableProps extends BaseTableProps, BaseTableHeaderProps {
  data: ITableData[];
  disabledIndex?: number[];
  RenderGroupByLabel?: (props: ITableGroupBy) => JSX.Element;
  spaceToHeader?: number;
}

declare interface AdvanceTableRowProps extends BaseTableProps {
  disabled?: boolean;
  index: number;
  item: ITableData;
  lastIndex: boolean;
  rowContainerStyle?: import("react-native").ViewStyle;
  // itemSelected?: boolean;
}

declare interface TableHeaderProps extends BaseTableHeaderProps {
  columns: ITableColumn[];
  withActions?: boolean;
}

declare interface IHeaderPopupContent {
  icon?: IIcon;
  key?: string;
  text: string;
  textStyle?: import("react-native").TextStyle;
}

declare interface TableHeaderPopupProps {
  content: IHeaderPopupContent[];
  onPressContent: (props: { hide: () => void; text: string; key?: string }) => void;
  onPressTitle?: (props: { show: () => void }) => void;
  selectedIndex?: number[];
  title?: string;
  titleIcon?: IIcon;
  titleStyle?: import("react-native").TextStyle;
  viewStyle?: import("react-native").ViewStyle;
}
