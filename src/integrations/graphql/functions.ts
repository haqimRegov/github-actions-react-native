import { API, graphqlOperation } from "aws-amplify";
import { Alert } from "react-native";

export const gqlOperation = async <ResultType extends {}, VariablesType extends {}, HeadersType extends {} = {}>(
  query: string,
  variables?: VariablesType,
  headers?: HeadersType,
  handleError?: ResponseErrorType,
) => {
  const serverError = { error: { errorCode: "EMXXX", message: "Internal Server Error", statusCode: "401" } };

  const errorHandling = () => {
    if (handleError !== undefined) {
      return handleError(serverError);
    }
    return Alert.alert(serverError.error.message);
  };
  try {
    const response = (await API.graphql(graphqlOperation(query, { input: variables }), { ...headers })) as {
      data: ResultType;
    };
    // eslint-disable-next-line no-console
    console.log("Response", response);
    if ("error" in response.data) {
      throw Error;
    }
    return response.data;
  } catch (error) {
    // Alert.alert("Internal Server Error");
    // const serverError = { data: { error: { errorCode: "EMXXX", message: "Internal Server Error", statusCode: "401" } } };
    // eslint-disable-next-line no-console
    console.log("Error in gqlOperation line 23 at integrations/graphql/functions.ts", JSON.stringify(error));
    errorHandling();
    return error;
  }
};
