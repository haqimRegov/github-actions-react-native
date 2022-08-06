declare interface ISubmitChangeRequestRequest {
  clientId: string;
  clientInfo: {
    contactDetails: ISubmitContactDetails;
    declaration?: {
      crs?: ISubmitCrs;
      fatca?: ISubmitFatca;
      fea?: ISubmitFea;
    };
  };
  id: string;
  initId: string;
}

declare interface ISubmitChangeRequestResult {
  message: string;
}

declare type ISubmitChangeRequestResponse = IMutationResponse<ISubmitChangeRequestResult> | undefined;

declare interface ISubmitChangeRequestMutation {
  submitCr: ISubmitChangeRequestResponse;
}
