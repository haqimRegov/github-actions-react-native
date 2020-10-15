import { API, graphqlOperation } from "aws-amplify";
import { Alert } from "react-native";

export const gqlOperation = async <ResultType extends {}, VariablesType extends {}, HeadersType extends {} = {}>(
  query: string,
  variables?: VariablesType,
  headers?: HeadersType,
  handleError?: TypeIntegrationError,
) => {
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
    Alert.alert("Internal Server Error");
    // eslint-disable-next-line no-console
    console.log("Error in gqlOperation line 23 at integrations/graphql/functions.ts", JSON.stringify(error));
    if (handleError !== undefined) {
      handleError(error);
    }
    return undefined;
  }
};
