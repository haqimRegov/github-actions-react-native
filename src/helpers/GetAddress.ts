import { isArrayNotEmpty, isNotEmpty } from "../utils";

export const getAddress = (address: IAddressState) => {
  const cleanAddressLines = isNotEmpty(address.address)
    ? Object.values(address.address!).filter((eachAddress) => isNotEmpty(eachAddress))
    : [];

  const addressLines = isArrayNotEmpty(cleanAddressLines)
    ? cleanAddressLines.map((eachAddress, index) => (index !== cleanAddressLines.length - 1 ? `${eachAddress} ` : eachAddress)).join("")
    : undefined;

  const cleanAddress = isNotEmpty(address)
    ? {
        address: isNotEmpty(addressLines) ? `${addressLines}, ` : undefined,
        postCode: isNotEmpty(address.postCode) ? `${address.postCode} ` : undefined,
        city: isNotEmpty(address.city) ? `${address.city}, ` : undefined,
        state: isNotEmpty(address.state) ? `${address.state}, ` : undefined,
        country: isNotEmpty(address.country) ? `${address.country}` : undefined,
      }
    : undefined;

  const fatcaAddress = isNotEmpty(cleanAddress) ? Object.values(cleanAddress!).join("") : undefined;

  return fatcaAddress;
};
