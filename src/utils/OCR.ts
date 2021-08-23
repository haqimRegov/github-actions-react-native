import vision from "@react-native-firebase/ml-vision";
import moment from "moment";

import { NRIC_DATE_FORMAT } from "../constants";
import { DICTIONARY_PLACE_OF_BIRTH, ERROR, ERROR_CODE } from "../data/dictionary";
import { titleCaseString } from "./Value";

const processMykadFront = async (filePath: string) => {
  let rightBounds = 0;
  let leftBounds = 0;
  const processed: VisionText = await vision().textRecognizerProcessImage(filePath);

  if (processed.blocks.length > 0 && processed.text.toLowerCase().includes("mykad")) {
    processed.blocks.forEach((block) => {
      rightBounds = block.boundingBox[2] > rightBounds ? block.boundingBox[2] : rightBounds;
      const compareBounds = block.boundingBox[0] < leftBounds ? block.boundingBox[0] : leftBounds;
      leftBounds = leftBounds === 0 ? block.boundingBox[0] : compareBounds;
    });
    const cleanBlocks: (VisionTextBlock | undefined)[] = processed.blocks.map((block) => {
      if (block.boundingBox[0] < leftBounds + 100) {
        return block;
      }
      if (block.boundingBox[2] < rightBounds / 2) {
        return block;
      }
      return undefined;
    });

    return { blocks: cleanBlocks.filter((block) => block !== undefined), text: processed.text };
  }

  return { error: { code: ERROR_CODE.invalidNric, message: ERROR.OCR_INVALID_NRIC } };
};

const mykadBack = async (filePath: string) => {
  const processed: VisionText = await vision().textRecognizerProcessImage(filePath);

  if (processed.blocks.length > 0 && processed.text.toLowerCase().includes("pendaftaran negara")) {
    return {};
  }

  return { error: { code: ERROR_CODE.invalidNric, message: ERROR.OCR_INVALID_NRIC } };
};

const mykadFront = async (filePath: string) => {
  const mykad: IOCRNricData = {
    idNumber: "",
    name: "",
    dateOfBirth: new Date(),
    address: "",
    placeOfBirth: "",
    postCode: "",
    city: "",
    state: "",
    gender: "",
    country: "Malaysia",
  };
  let idNumberIndex = -1;
  const mykadBlocks = await processMykadFront(filePath);
  if ("error" in mykadBlocks && mykadBlocks.error !== undefined) {
    return mykadBlocks;
  }
  mykad.gender = mykadBlocks.text.toLowerCase().includes("lelaki") ? "Male" : "Female";
  mykadBlocks.blocks.forEach((block, blockIndex) => {
    const { text } = block!;
    if (text.match("^([0-9]){6}-([0-9]){2}-([0-9]){4}$")) {
      mykad.idNumber = text;
      idNumberIndex = blockIndex;
      const capturedDate = moment(text.substr(0, 6), NRIC_DATE_FORMAT);
      const placeOfBirth = DICTIONARY_PLACE_OF_BIRTH.filter((code) => code.code === text.substr(7, 2));
      mykad.placeOfBirth = placeOfBirth[0].location;
      mykad.dateOfBirth = moment(capturedDate).isAfter() ? capturedDate.subtract(100, "years").toDate() : capturedDate.toDate();
    } else if (text.match("[0-9]{5}")) {
      const postCodeBlock = text.match("[0-9]{5} ");
      if (postCodeBlock !== null) {
        let postCodeIndex = -1;
        const split = text.split("\n");
        const postCodeCity = split.filter((value, index) => {
          postCodeIndex = index;
          return value.match("^[0-9]{4,5}");
        });
        const [postCode] = postCodeCity[0].split(" ");
        const [state] = split.slice(-1);
        mykad.postCode = postCode;
        mykad.city = titleCaseString(postCodeCity[0].split(" ").slice(1).join(" "));
        mykad.address = split.slice(0, postCodeIndex - 1).join(" ");
        if (state.toLowerCase().includes("kl")) {
          mykad.state = "Wilayah Persekutuan";
        } else if (state.toLowerCase().includes("putra")) {
          mykad.state = "Wilayah Persekutuan Putrajaya";
        } else if (state.toLowerCase().includes("labuan")) {
          mykad.state = "Wilayah Persekutuan Labuan";
        } else {
          mykad.state = titleCaseString(state);
        }
      }
    }
  });

  if (idNumberIndex > -1) {
    mykad.name = mykadBlocks.blocks[idNumberIndex + 1]?.text!.split("\n").join(" ");
  }
  if (mykad.address === "" || mykad.postCode === "" || mykad.city === "" || mykad.state === "") {
    return { error: { code: ERROR_CODE.invalidNricData, message: ERROR.OCR_INVALID_NRIC_DATA } };
  }

  return mykad;
};

export const OCRUtils = { mykadFront, mykadBack };
