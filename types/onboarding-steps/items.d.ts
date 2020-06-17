declare interface IContentItem {
  title: string;
  route: string;
}

declare interface IAccordionContent {
  content?: IContentItem[];
  label: string;
  route?: string;
}
