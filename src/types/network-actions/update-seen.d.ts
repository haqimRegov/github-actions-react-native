declare interface IUpdateSeenRequest {
  dashboard: string;
  referenceKey?: string;
  tab: string[];
}

declare interface IUpdateSeenResult {
  message: string;
  status: string;
}

declare type IUpdateSeenResponse = IQueryResponse<IUpdateSeenResult> | undefined;

declare interface IUpdateSeenQuery {
  updateSeen: IUpdateSeenResponse;
}
