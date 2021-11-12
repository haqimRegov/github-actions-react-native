export const validateSubmitCase = (dataToValidate: IEDDResponse, checkAnswer: boolean) => {
  const { questions } = dataToValidate;
  const questionsArray = questions.map((question: IEDDQuestion) => {
    const { options, data } = question;
    let optionsValid: boolean[] = [];
    if (data !== undefined && data.answers.length > 0) {
      if (options !== undefined && options !== null) {
        optionsValid =
          options !== undefined
            ? options.map((option: IOptionField) => {
                const { type, title: optionTitle } = option;
                let findIndex = -1;
                findIndex = data.answers.findIndex(
                  (stateData: IQuestionData) => stateData.answer?.answer !== undefined && stateData.answer.answer === optionTitle,
                );
                let nestedOptionValid: boolean[] = [];
                if (findIndex !== -1) {
                  if (option.options !== undefined && option.options !== null) {
                    nestedOptionValid =
                      option.options !== undefined
                        ? option.options.map((nestedOption: IOptionField) => {
                            const { type: nestedType, options: innerNestedOptions, id: optionId } = nestedOption;
                            const defaultKey = optionId !== null ? optionId : "remark";
                            // Check for each nested option depending on the type and check whether they are empty
                            switch (nestedType) {
                              case "inputtext":
                                return type === "checkbox"
                                  ? data.answers[findIndex].subSection![defaultKey].answer === ""
                                  : !("subSection" in data.answers[findIndex]) ||
                                      !(defaultKey in data.answers[findIndex].subSection!) ||
                                      data.answers[findIndex].subSection![defaultKey].answer === "" ||
                                      data.answers[findIndex].subSection![defaultKey].error !== undefined;
                              case "textarea":
                                return type === "checkbox" || (type === "radiobutton" && option.options!.length === 1)
                                  ? false
                                  : !("subSection" in data.answers[findIndex]) ||
                                      !(defaultKey in data.answers[findIndex].subSection!) ||
                                      data.answers[findIndex].subSection![defaultKey].answer === "" ||
                                      data.answers[findIndex].subSection![defaultKey].error !== undefined;
                              case "dropdown":
                                return type === "checkbox"
                                  ? !(defaultKey in data.answers[findIndex].subSection!) ||
                                      data.answers[findIndex].subSection![defaultKey].answer!.length === 0
                                  : !("subSection" in data.answers[findIndex]) ||
                                      !(defaultKey in data.answers[findIndex].subSection!) ||
                                      data.answers[findIndex].subSection![defaultKey].answer === "" ||
                                      data.answers[findIndex].subSection![defaultKey].error !== undefined;
                              case "label":
                                // Case label will have an additional inner nested options
                                if (innerNestedOptions !== undefined && innerNestedOptions.length > 0) {
                                  const innerNestedValid = innerNestedOptions.map((innerNestedOption: IOptionField) => {
                                    const { type: innerNestedType, title: innerNestedTitle } = innerNestedOption;
                                    if (!("subSection" in data.answers[findIndex])) {
                                      return true;
                                    }

                                    if (innerNestedType === "radiobutton") {
                                      if (data.answers[findIndex].subSection![optionId] === innerNestedTitle) {
                                        return (
                                          !(optionId in data.answers[findIndex].subSection!) ||
                                          data.answers[findIndex].subSection![optionId] === undefined ||
                                          data.answers[findIndex].subSection![optionId].answer === ""
                                        );
                                      }
                                      return false;
                                    }
                                    return false;
                                  });
                                  return innerNestedValid.includes(true);
                                }
                                return false;

                              default:
                                return false;
                            }
                          })
                        : [false];
                  }
                  // Check for remark and documents
                  return (
                    (data.answers[findIndex].hasRemark === true && data.answers[findIndex].remark === "") ||
                    (data.answers[findIndex].hasDoc === true && data.answers[findIndex].document === undefined) ||
                    nestedOptionValid.includes(true)
                  );
                }
                if (type === "label" || type === "reroute" || type === "default") {
                  return (
                    (data.answers[0].hasRemark === false && data.answers[0].hasDoc === false) ||
                    (data.answers[0].hasRemark === true && data.answers[0].remark === "") ||
                    (data.answers[0].hasDoc === true && data.answers[0].document === undefined)
                  );
                }
                return false;
              })
            : [false];
        const valid =
          checkAnswer === true
            ? optionsValid.includes(true) ||
              data.answers.filter((singleData: IQuestionData) => singleData.answer?.answer !== undefined && singleData.answer.answer === "")
                .length !== 0 ||
              data.answers.length === 0
            : optionsValid.includes(true);
        return valid;
      }
    }
    return checkAnswer;
  });
  return questionsArray.includes(true);
};
