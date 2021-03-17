import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getProductList = async (variables: IProductListRequest, navigation: IStackNavigationProp, handleError?: ResponseErrorType) => {
  try {
    const data: IProductListQuery = await responseHandler<IProductListQuery, IProductListRequest>(
      GQL_QUERIES.productList,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "productList" in data === false) {
      throw data;
    }

    return data.productList;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getProductList at ProductList.ts", error);
    return error;
  }
};
