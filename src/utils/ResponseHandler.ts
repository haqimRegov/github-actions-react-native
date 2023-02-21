import NetInfo from "@react-native-community/netinfo";
import { Auth } from "aws-amplify";

import { ERRORS } from "../data/dictionary";
import { gqlOperation } from "../integrations";
import { ErrorHandler } from "./ErrorHandler";

export const responseHandler = async <
  ResultType extends Record<string, unknown>,
  VariablesType extends Record<string, unknown>,
  HeadersType extends Record<string, unknown> = Record<string, never>,
>(
  query: string,
  variables?: VariablesType,
  headers?: HeadersType,
  navigation?: IStackNavigationProp,
  handleError?: ResponseErrorType,
  handleLoading?: (loading: boolean) => void,
  tokenCheck?: boolean,
) => {
  try {
    const netInfo = await NetInfo.fetch().then((state) => {
      // // eslint-disable-next-line no-console
      return { isInternetReachable: state.isInternetReachable, isConnected: state.isConnected };
    });
    // TODO check for scenarios where it is connected but internet is not reachable
    // netInfo.isInternetReachable === false
    if (netInfo.isConnected === false) {
      throw ERRORS.network;
    }
    if (tokenCheck !== false) {
      await Auth.currentSession();
      // // eslint-disable-next-line no-console
    }
    // eslint-disable-next-line no-console
    console.log("request", variables);
    // // eslint-disable-next-line no-console
    const data: ResultType = await gqlOperation<string, VariablesType, HeadersType>(query, variables, headers);
    // eslint-disable-next-line no-console
    console.log("response", data);

    if ("errors" in data) {
      throw data;
    }

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in ResponseHandler", error);
    let err = error;

    if (
      JSON.stringify(error).includes("No current user") ||
      ("message" in error && JSON.stringify(error.message).includes("Refresh Token has expired"))
    ) {
      err = ERRORS.unauthenticated;
    } else {
      err = ERRORS.internal;
    }

    if (handleError !== undefined) {
      return handleError(err);
    }

    return ErrorHandler(err, navigation, handleLoading);
  }
};
