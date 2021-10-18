declare interface IUpdateSeenRequest {
  dashboard: string;
  tab: string[];
  referenceKey?: string;
}

declare interface IUpdateSeenResult {
  status: string;
  message: string;
}

declare type IUpdateSeenResponse = IQueryResponse<IUpdateSeenResult> | undefined;

declare interface IUpdateSeenQuery {
  updateSeen: IUpdateSeenResponse;
}
