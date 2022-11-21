declare interface IAxisY {
  y: number;
}

declare interface IDimensions {
  height: number;
  width: number;
}

declare interface IBasicLayout extends IAxisY, IDimensions {
  x: number;
}
