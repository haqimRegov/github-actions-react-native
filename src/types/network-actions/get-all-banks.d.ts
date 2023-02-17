declare interface IGetAllBanksRequest {
  accountNo: string;
}

declare interface IGetAllBanksResult {
  localBank: IBankDetailsState[];
  foreignBank?: IBankDetailsState[];
}

declare type IGetAllBanksResponse = IQueryResponse<IGetAllBanksResult> | undefined;

declare interface IGetAllBanksQuery {
  getAllBanksInAccount: IGetAllBanksResponse;
}
