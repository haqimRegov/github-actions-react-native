declare interface IContentItem {
  title: string;
  route: string;
}

declare interface IOnboarding {
  content?: IContentItem[];
  label: string;
  route?: string;
}
