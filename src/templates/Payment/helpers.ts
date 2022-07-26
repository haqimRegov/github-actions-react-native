import moment from "moment";

import { DICTIONARY_KIB_BANK_ACCOUNTS, ERROR, ERRORS } from "../../data/dictionary";
import { S3UrlGenerator, StorageUtil } from "../../integrations";
import { deleteKey, extractKey, isAlphaNumeric, isAmount, isNumber, parseAmount, parseAmountToString } from "../../utils";

export const generateNewInfo = (
  paymentType: TypePaymentType,
  allowedRecurringType: string[],
  currencies: TypeCurrencyLabelValue,
  orderNumber: string,
  epfAccountNumber?: string | null,
  accountNames?: TypeLabelValue[],
  amount?: string,
) => {
  const kibCurrencyIndex = DICTIONARY_KIB_BANK_ACCOUNTS.findIndex((bank) => bank.currency === currencies.value);
  const kibBank = kibCurrencyIndex !== -1 ? DICTIONARY_KIB_BANK_ACCOUNTS[kibCurrencyIndex] : DICTIONARY_KIB_BANK_ACCOUNTS[0];

  const info: IPaymentInfo = {
    amount: amount !== undefined ? amount : "",
    bankAccountName: accountNames !== undefined && accountNames.length === 1 ? accountNames[0].value : "",
    bankAccountNumber: "",
    bankName: "",
    checkNumber: "",
    clientName: accountNames !== undefined && accountNames.length === 1 ? accountNames[0].value : "",
    clientTrustAccountNumber: "",
    currency: currencies.value,
    // deleted: false,
    epfReferenceNumber: "",
    epfReferenceNo: [],
    epfAccountNumber: epfAccountNumber !== null && epfAccountNumber !== undefined ? epfAccountNumber : "",
    frequency: "15th of the month",
    kibBankAccountNumber: kibBank.bankAccountNumber,
    kibBankName: kibBank.bankName,
    orderNumber: orderNumber,
    paymentMethod: paymentType !== "Cash" ? paymentType : "Online Banking / TT / ATM",
    paymentType: paymentType,
    proof: undefined,
    recurringBank: allowedRecurringType.length > 0 && allowedRecurringType.includes("FPX") ? "" : "Public Bank",
    recurringType: allowedRecurringType.length > 1 ? "FPX" : "DDA",
    referenceNumber: "",
    remark: undefined,
    transactionDate: undefined,

    action: undefined,
    belongsTo: undefined,
    combinedBankAccountName: undefined,
    excess: undefined,
    isEditable: undefined,
    new: true,
    parent: undefined,
    paymentId: undefined,
    saved: false,
    sharedTo: undefined,
    tag: undefined,
    usePreviousRecurring: undefined,
    utilised: undefined,

    ctaTag: undefined,
    ctaParent: undefined,
    ctaUsedBy: undefined,
  };

  return info;
};

export const generatePaymentRequest = (paymentInfo: IPaymentInfo, customKeys?: TPaymentInfoKey[]) => {
  let updatedPaymentInfo = {};
  const isCombined: TPaymentInfoKey[] = paymentInfo.isCombined !== undefined ? ["isCombined"] : [];
  const additionalKeys = customKeys !== undefined ? [...customKeys] : [];
  switch (paymentInfo.paymentMethod) {
    case "Online Banking / TT / ATM":
      updatedPaymentInfo = extractKey(paymentInfo, [
        "amount",
        "currency",
        "paymentMethod",
        "kibBankAccountNumber",
        "kibBankName",
        "bankName",
        "referenceNumber",
        "transactionDate",
        // "proof",
        "remark",
        ...additionalKeys,
      ]);
      break;
    case "Cheque":
      updatedPaymentInfo = extractKey(paymentInfo, [
        "amount",
        "currency",
        "paymentMethod",
        "kibBankAccountNumber",
        "kibBankName",
        "bankName",
        "transactionDate",
        // "proof",
        "remark",
        "checkNumber",
        ...additionalKeys,
      ]);
      break;
    case "Recurring":
      updatedPaymentInfo = extractKey(paymentInfo, [
        "recurringType",
        "recurringBank",
        "frequency",
        "bankAccountNumber",
        "bankAccountName",
        "paymentMethod",
        "remark",
        ...isCombined,
        ...additionalKeys,
      ]);
      break;
    case "EPF":
      updatedPaymentInfo = extractKey(paymentInfo, [
        // "amount",
        "currency",
        "paymentMethod",
        "epfAccountNumber",
        "epfReferenceNumber",
        "remark",
        "utmc",
        ...additionalKeys,
      ]);
      break;
    case "Client Trust Account (CTA)":
      updatedPaymentInfo = extractKey(paymentInfo, [
        "amount",
        "currency",
        "paymentMethod",
        "clientName",
        "clientTrustAccountNumber",
        // "proof",
        "remark",
        ...additionalKeys,
      ]);
      break;

    default:
      break;
  }

  return updatedPaymentInfo;
};

export const getAmount = (amounts: IOrderAmount[], currency: TypeCurrency) => {
  const findAmount = amounts.findIndex((bal) => bal.currency === currency);
  return findAmount !== -1 ? parseInt(parseAmountToString(amounts[findAmount].amount), 10) : 0;
};

export const handleReduceAmount = (amounts: IOrderAmount[]) => {
  const cloneAmounts = [...amounts];
  const reducedAmount = cloneAmounts.reduce((accumulator: IOrderAmount[], current: IOrderAmount) => {
    const currencyIndex = accumulator.findIndex((value: IOrderAmount) => value.currency === current.currency);
    if (currencyIndex === -1) {
      accumulator.push(current);
    } else {
      const sum = parseAmount(accumulator[currencyIndex].amount) + parseAmount(current.amount);
      accumulator[currencyIndex].amount = `${sum}`;
    }
    return accumulator;
  }, []);

  return reducedAmount;
};

export const calculateAvailableBalance = (applicationBalance: IPaymentInfo[], payment: IPaymentInfo, removeUseOfSurplus: boolean) => {
  const newApplicationBalance = [...applicationBalance];
  const updatedPayment = { ...payment };
  const findSurplusTag = newApplicationBalance.findIndex((bal) => bal.parent === updatedPayment.tag!.uuid);
  const hasBeenUtilised = findSurplusTag !== -1 && newApplicationBalance[findSurplusTag].utilised!.length > 0;
  const findUtilisedAmount =
    hasBeenUtilised === true
      ? newApplicationBalance[findSurplusTag].utilised!.findIndex((bal) => bal.paymentId === updatedPayment.paymentId)
      : -1;

  const utilisedAmount = parseInt(parseAmountToString(updatedPayment.amount), 10);

  // check if surplus has been utilised before
  if (findUtilisedAmount !== -1) {
    // remove utilised amount
    if (removeUseOfSurplus === true) {
      newApplicationBalance[findSurplusTag].utilised!.splice(findUtilisedAmount, 1);
      updatedPayment.tag = undefined;
    } else {
      // update existing utilised amount
      newApplicationBalance[findSurplusTag].utilised![findUtilisedAmount] = {
        amount: utilisedAmount.toString(),
        orderNumber: updatedPayment.orderNumber,
        paymentId: updatedPayment.paymentId!,
      };
    }
  } else {
    // add new utilised amount
    newApplicationBalance[findSurplusTag].utilised!.push({
      amount: utilisedAmount.toString(),
      orderNumber: updatedPayment.orderNumber,
      paymentId: updatedPayment.paymentId!,
    });
  }

  return newApplicationBalance;
};

export const generatePaymentWithKeys = async (
  payments: IPaymentInfo[],
  paymentType: TypePaymentType,
  orderNumber: string,
  clientId: string,
  channel: "Onboarding" | "Dashboard",
) => {
  const paymentWithKeys = await Promise.all(
    payments
      .filter((pay) => pay.saved === true)
      .map(async (paymentInfo: IPaymentInfo, index: number) => {
        try {
          if (
            channel === "Onboarding" ||
            (channel === "Dashboard" && paymentInfo.isEditable === undefined) ||
            (channel === "Dashboard" &&
              paymentInfo.isEditable !== undefined &&
              "action" in paymentInfo === true &&
              paymentInfo.action !== undefined)
          ) {
            let proofWithUrl: FileBase64 | undefined;
            if (paymentType === "Cash" && paymentInfo.proof?.base64 !== undefined && paymentInfo.tag === undefined) {
              const url = S3UrlGenerator.payment(clientId, orderNumber, paymentType, paymentInfo.paymentMethod, paymentInfo.proof.type);
              const uploadedFile = await StorageUtil.put(paymentInfo.proof.path!, url, paymentInfo.proof.type);
              if (uploadedFile === undefined) {
                throw ERRORS.storage;
              }
              proofWithUrl = { ...paymentInfo.proof, url: uploadedFile.key ? uploadedFile.key : undefined, base64: undefined };
            }

            const dynamicKeys: TPaymentInfoKey[] = [];
            if (paymentInfo.parent !== undefined) {
              dynamicKeys.push("parent");
            }
            if (paymentInfo.ctaParent !== undefined) {
              dynamicKeys.push("ctaParent");
            }
            if (paymentInfo.lastAmountUpdate !== undefined) {
              dynamicKeys.push("lastAmountUpdate");
            }
            if (paymentInfo.action !== undefined) {
              dynamicKeys.push("action");
            }
            if (
              paymentInfo.tag === undefined &&
              paymentInfo.ctaTag === undefined &&
              paymentInfo.paymentMethod !== "EPF" &&
              paymentInfo.paymentMethod !== "Recurring"
            ) {
              dynamicKeys.push("proof");
            }
            if (paymentInfo.tag !== undefined) {
              if (paymentInfo.action === undefined) {
                dynamicKeys.push("tag");
              }
            }
            if (paymentInfo.ctaTag !== undefined) {
              if (paymentInfo.action === undefined) {
                dynamicKeys.push("ctaTag");
              }
            }

            const modifiedPaymentInfo: IPaymentInfo = {
              ...paymentInfo,
              bankAccountName:
                paymentInfo.combinedBankAccountName !== undefined && paymentInfo.combinedBankAccountName !== ""
                  ? paymentInfo.combinedBankAccountName
                  : paymentInfo.bankAccountName,
            };

            const cleanPaymentInfo = generatePaymentRequest(modifiedPaymentInfo, dynamicKeys.length > 0 ? dynamicKeys : undefined);

            const temporaryReference =
              paymentInfo.paymentMethod === "Client Trust Account (CTA)" && paymentInfo.isEditable !== false
                ? { referenceNumber: `${orderNumber}${index}${moment().format("x")}` }
                : {};

            // we don't send orderNumber if the POP being used is from BE
            const optimizedTag =
              paymentInfo.tag !== undefined && channel === "Dashboard" && paymentInfo.action === undefined
                ? { tag: deleteKey(paymentInfo.tag, ["orderNumber"]) }
                : {};

            // using the length of ctaTag.uuid from BE to know if the CTA Parent is already an existing saved CTA
            // we don't send orderNumber if the POP being used is from BE
            const optimizedCtaTag =
              paymentInfo.ctaTag !== undefined &&
              channel === "Dashboard" &&
              (orderNumber !== paymentInfo.orderNumber || (orderNumber === paymentInfo.orderNumber && paymentInfo.ctaTag.uuid.length < 16))
                ? { ctaTag: deleteKey(paymentInfo.ctaTag, ["orderNumber"]) }
                : {};

            const updatedPaymentInfo = {
              ...cleanPaymentInfo,
              amount: paymentType === "Recurring" ? undefined : parseAmountToString(paymentInfo.amount),
              currency: paymentType === "Recurring" ? "MYR" : paymentInfo.currency,
              transactionDate: paymentType === "EPF" ? undefined : moment(paymentInfo.transactionDate).valueOf(),
              proof: paymentInfo.tag !== undefined ? undefined : proofWithUrl, // proof not needed for use of surplus
              ...optimizedTag,
              ...optimizedCtaTag,
              ...temporaryReference, // TODO temporary
            };

            // isEditable false means one of the children utilising its surplus has been submitted
            // only remark can be updated
            if (paymentInfo.isEditable === false) {
              const actionRemark: Partial<IPaymentInfo> = deleteKey(updatedPaymentInfo as IPaymentInfo, ["parent"]);

              return { ...actionRemark, amount: parseAmountToString(actionRemark.amount!) };
            }

            return updatedPaymentInfo;
          }

          return undefined;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return ERRORS.storage;
        }
      }),
  );

  if (paymentWithKeys === undefined || paymentWithKeys.some((pay) => pay !== undefined && "errorCode" in pay)) {
    // AlertDialog(ERRORS.storage.message, () => setLoading(false));
    throw ERRORS.storage;
  }
  const payment = paymentWithKeys.filter((pay) => pay !== undefined && "errorCode" in pay === false);

  return payment;
};

export const handleAvailableBalance = (latestPayments: IPaymentInfo[], totalInvestment: IOrderAmount[]) => {
  const totalAvailableBalance = totalInvestment.map(({ amount, currency }) => {
    const paymentsByCurrency = latestPayments
      .filter((value) => value.currency === currency)
      .map((payment: IPaymentInfo) => {
        return parseAmount(payment.amount || "0");
      });
    const total =
      paymentsByCurrency.length === 0
        ? 0
        : paymentsByCurrency
            .map((currencyAmount) => currencyAmount)
            .reduce((totalAmount: number, currentAmount: number) => totalAmount + currentAmount);

    return { currency: currency, amount: `${total - parseAmount(amount)}` };
  });

  return totalAvailableBalance;
};

export const calculateEachOrderBalance = (
  proofOfPayment: IPaymentRequired,
  balancePayments: IOrderAmount[],
  applicationBalance?: IPaymentInfo[],
) => {
  const balancePerOrder: IOrderAmount[] = [...balancePayments];
  let filterPOP: IPaymentInfo[] = [];
  if (applicationBalance !== undefined && applicationBalance.length > 0) {
    filterPOP = proofOfPayment.payments.filter(
      (eachPOP: IPaymentInfo) => applicationBalance.findIndex((eachBalance) => eachBalance.parent === eachPOP.parent) === -1,
    );
  }
  const tempPayments = applicationBalance === undefined ? proofOfPayment.payments : filterPOP;
  if (proofOfPayment.payments.length > 0) {
    tempPayments.forEach((eachPOP: IPaymentInfo) => {
      const negationValue = (parseAmount(eachPOP.amount) * -1).toString();
      const currencyIndex = balancePerOrder.findIndex((eachDeviation: IOrderAmount) => eachDeviation.currency === eachPOP.currency);
      if (eachPOP.tag === undefined && eachPOP.initialExcess !== undefined && eachPOP.initialExcess !== null) {
        const updatedAmount =
          eachPOP.initialExcess !== undefined && eachPOP.initialExcess !== null ? eachPOP.initialExcess?.amount : negationValue;
        if (currencyIndex !== -1) {
          balancePerOrder[currencyIndex] = {
            amount: (parseAmount(balancePerOrder[currencyIndex].amount) + parseAmount(updatedAmount)).toString(),
            currency: eachPOP.currency as TypeCurrency,
          };
        } else {
          balancePerOrder.push({
            amount: updatedAmount,
            currency: eachPOP.currency as TypeCurrency,
          });
        }
      }
    });
  }
  return balancePerOrder;
};

export const calculateBalances = (proofOfPayments: IPaymentRequired[]): IOrderAmount[] => {
  let balancePayments: IOrderAmount[] = [];
  if (proofOfPayments !== undefined) {
    proofOfPayments.forEach((eachOrder: IPaymentRequired) => {
      balancePayments = calculateEachOrderBalance(eachOrder, balancePayments);
    });
  }
  return balancePayments;
};

export const calculateExcess = (availableBalance: IPaymentInfo[]) => {
  if (availableBalance.length > 0) {
    const balancePayments: IOrderAmount[] = [];
    availableBalance.forEach((eachSurplusBalance: IPaymentInfo) => {
      const utilisedAmount = [...eachSurplusBalance.utilised!];
      const totalUtilisedAmount =
        utilisedAmount.length > 0
          ? utilisedAmount
              .map((util) => parseInt(util.amount, 10))
              .reduce((totalAmount: number, currentAmount: number) => totalAmount + currentAmount)
          : 0;
      const updatedExcessAmount = parseInt(eachSurplusBalance.initialExcess!.amount, 10) - totalUtilisedAmount;
      const findSurplusIndex = balancePayments.findIndex(
        (eachPaymentDeviation: IOrderAmount) => eachPaymentDeviation.currency === eachSurplusBalance.excess!.currency,
      );
      if (findSurplusIndex !== -1) {
        balancePayments[findSurplusIndex] = {
          ...balancePayments[findSurplusIndex],
          amount: (parseInt(balancePayments[findSurplusIndex].amount, 10) + updatedExcessAmount).toString(),
        };
      } else {
        balancePayments.push({ amount: updatedExcessAmount.toString(), currency: eachSurplusBalance.excess!.currency });
      }
    });
    return balancePayments;
  }
  return [];
};

export const checkCurrencyCompleted = (proofOfPayment: IPaymentRequired, currency: TypeCurrency) => {
  const filteredProofs =
    proofOfPayment.payments.length > 0
      ? proofOfPayment.payments.filter((eachCheckPOP: IPaymentInfo) => eachCheckPOP.currency === currency)
      : [];
  const totalCurrency =
    filteredProofs.length > 0
      ? filteredProofs
          .map((payment: IPaymentInfo) => parseAmount(payment.amount))
          .reduce((totalAmount: number, currentAmount: number) => totalAmount + currentAmount)
      : 0;
  const findIndex = proofOfPayment.totalInvestment.findIndex((eachTotal: IOrderAmount) => eachTotal.currency === currency);
  return proofOfPayment !== undefined && findIndex !== -1 && proofOfPayment.totalInvestment[findIndex] !== undefined
    ? totalCurrency >= parseAmount(proofOfPayment.totalInvestment[findIndex].amount)
    : false;
};

export const handleEPFStructuring = (proofOfPayments: IPaymentInfo[]) => {
  const structuredPayments: IPaymentInfo[] = [];
  proofOfPayments.forEach((eachPayment: IPaymentInfo) => {
    if (eachPayment.paymentType === "EPF") {
      if (eachPayment.epfReferenceNo.length > 1) {
        eachPayment.epfReferenceNo.forEach((eachEpf: IEpfReferenceNo) => {
          structuredPayments.push({
            ...eachPayment,
            epfReferenceNumber: eachEpf.referenceNo,
            utmc: eachEpf.utmc,
            amount: eachEpf.amount.toString(),
            epfReferenceNo: [],
          });
        });
      } else {
        structuredPayments.push({
          ...eachPayment,
          epfReferenceNumber: eachPayment.epfReferenceNo[0].referenceNo,
          utmc: eachPayment.epfReferenceNo[0].utmc,
          amount: eachPayment.epfReferenceNo[0].amount.toString(),
          epfReferenceNo: [],
        });
      }
    } else {
      structuredPayments.push({ ...eachPayment, epfReferenceNo: [] });
    }
  });
  return structuredPayments;
};

export const validateAmount = (payment: IPaymentInfo) => {
  const cleanValue = payment.amount.replace(/[,]/g, "");

  if (isAmount(cleanValue) === false) {
    return ERROR.INVESTMENT_INVALID_AMOUNT;
  }
  if (parseAmount(cleanValue) === 0) {
    return ERROR.INVESTMENT_MIN_AMOUNT;
  }

  return undefined;
};

export const validateCtaNumber = (payment: IPaymentInfo) => {
  return isAlphaNumeric(payment.clientTrustAccountNumber) === false || payment.clientTrustAccountNumber.length !== 9
    ? ERROR.INVALID_CTA_NUMBER
    : undefined;
};

export const validateChequeNumber = (payment: IPaymentInfo) => {
  return isNumber(payment.checkNumber) === false ? ERROR.INVALID_CHEQUE_NUMBER : undefined;
};

export const updateCtaUsedBy = (latestCtaDetails: TypeCTADetails[], latestPayment: IPaymentInfo) => {
  // check if current CTA POP is already an existing Use of CTA and if it's in the parent ctaUsedBy
  const findOldParentCta = latestCtaDetails.findIndex((findCta: TypeCTADetails) => {
    const checkInUsedBy =
      findCta.ctaUsedBy !== undefined ? findCta.ctaUsedBy.findIndex((findOldUsedBy) => findOldUsedBy.uuid === latestPayment.paymentId) : -1;
    return checkInUsedBy !== -1;
  });

  // existing parent CTA has been found
  if (findOldParentCta !== -1) {
    const copyCtaUsedBy =
      "ctaUsedBy" in latestCtaDetails[findOldParentCta] && latestCtaDetails[findOldParentCta].ctaUsedBy !== undefined
        ? [...latestCtaDetails[findOldParentCta].ctaUsedBy!]
        : [];

    // remove CTA child from ctaUsedBy
    // TODO Scenario: Edit CTA Child to CTA Parent (remove child in ctaUsedBy of the old parent)
    const updatedCtaUsedBy = copyCtaUsedBy.filter((oldUsedBy) => oldUsedBy.uuid !== latestPayment.paymentId);

    return { index: findOldParentCta, ctaUsedBy: updatedCtaUsedBy };
  }

  return undefined;
};

export const filterDeletedSavedChild = (latestPayments: IPaymentInfo[], currentIndex: number, oldPaymentId?: string | number) => {
  const paymentId = oldPaymentId !== undefined ? oldPaymentId : latestPayments[currentIndex].paymentId;
  const filtered = latestPayments
    .filter((eachPOP) => eachPOP.isEditable === true && eachPOP.ctaTag !== undefined && eachPOP.ctaTag.uuid === paymentId)
    .map((eachFilteredPOP: IPaymentInfo) => ({
      ...eachFilteredPOP,
      action: { id: eachFilteredPOP.paymentId!, option: "delete" as TypePaymentInfoActionOption },
    }));

  return filtered;
};
