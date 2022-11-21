declare interface IInvestorAccountDetailsRequest {
  accountNumber?: string;
  clientId: string;
}

declare type IInvestorAccountDetailsResult = IInvestorAccount;

declare type IInvestorAccountDetailsResponse = IQueryResponse<IInvestorAccountDetailsResult> | undefined;

declare interface IInvestorAccountDetailsQuery {
  investorAccountDetails: IInvestorAccountDetailsResponse;
}
