declare interface IMutationResponse<T> extends IResponseErrorResult {
  data: IResponseResult<T> | null;
}

declare interface IQueryResponse<T> extends IResponseErrorResult {
  data: IResponseResult<T> | null;
}

declare interface IResponseError {
  errorCode: string;
  errorList?: string[];
  message: string;
  statusCode: string;
}

declare interface IResponseErrorResult {
  error: IResponseError | null;
}

declare type ErrorType = IResponseError | undefined;

declare interface IResponseResult<T> {
  result: T;
}

declare type ResponseErrorType = (error: ErrorType) => void;
