declare interface IMutationResponse<T> {
  data: IResponseResult<T> | null;
  error: IResponseError | null;
}

declare interface IResponseError {
  errorCode: string;
  errorList: string[];
  message: string;
  statusCode: string;
  [key: string]: any;
}

declare interface IResponseResult<T> {
  result: T;
}
