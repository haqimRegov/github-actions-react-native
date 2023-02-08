import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getProductList = async (
  variables: IProductListRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IProductListQuery = await responseHandler<IProductListQuery, IProductListRequest>(
      GQL_QUERIES.productList,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "productList" in data === false) {
      throw data;
    }

    return data.productList;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.warn("Error in getProductList at ProductList.ts", error);
    return error;
  }
};
