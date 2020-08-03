import React, { Fragment, useEffect, useState } from "react";
import { Alert, Text, TextStyle, View } from "react-native";

import { CheckBox, ContentPage, CustomSpacer, CustomTextInput, TextInputArea, TextSpaceArea, UploadWithModal } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { SAMPLE_CLIENT } from "../../mocks";
import { fs12BoldBlack2, fs16RegBlack2, fs16SemiBoldBlack2, px, sh16, sh20, sh24, sh32, sh40, sh8, sw16, sw24 } from "../../styles";
import { AlertDialog } from "../../utils";

const { PROOF_OF_ADDRESS } = Language.PAGE;

const SAMPLE_NAME: string = "Edgar";
const GREETINGS: string = `${SAMPLE_NAME}.`;

interface AddressProps {
  handleNextStep: (route: string) => void;
}

export const Address = ({ handleNextStep }: AddressProps) => {
  const [continueDisabled, setContinueDisabled] = useState<boolean>(false);
  const [inputMailingAddress, setInputMailingAddress] = useState<string>(SAMPLE_CLIENT.address);
  const [inputPostCode, setInputPostCode] = useState<string>(SAMPLE_CLIENT.postCode);
  const [proofOfAddress, setProofOfAddress] = useState<FileBase64 | undefined>(undefined);
  const [sameAddressToggle, setSameAddressToggle] = useState<boolean>(true);
  const [uploadLater, setUploadLater] = useState<boolean>(false);

  const handleAddressToggle = () => {
    if (sameAddressToggle) {
      setSameAddressToggle(false);
      setInputMailingAddress("");
      setInputPostCode("");
    } else {
      setSameAddressToggle(true);
      setInputMailingAddress(SAMPLE_CLIENT.address);
      setInputPostCode(SAMPLE_CLIENT.postCode);
    }
    setProofOfAddress(undefined);
    setUploadLater(false);
  };

  const handleButtonPress = () => {
    Alert.alert("test");
  };

  const handleNavigate = () => {
    handleNextStep(ONBOARDING_ROUTES.PersonalDetails);
  };

  const handleSubmit = () => {
    const details = `${inputMailingAddress} ${inputPostCode}`;
    AlertDialog(details, handleNavigate);
  };

  const handleUpload = (uploaded: FileBase64) => {
    setProofOfAddress(uploaded);
    setUploadLater(false);
  };

  const handleUploadLater = () => {
    setUploadLater(!uploadLater);
  };

  const labelStyle: TextStyle = { ...fs16SemiBoldBlack2, letterSpacing: -0.1 };

  useEffect(() => {
    const sameAddress = inputMailingAddress === SAMPLE_CLIENT.address && inputPostCode === SAMPLE_CLIENT.postCode;
    const noProofOfAddress = sameAddress === false && proofOfAddress === undefined;
    const uploadLaterToggled = sameAddress === false && proofOfAddress === undefined && uploadLater === true;
    const disabled = uploadLater === true ? !uploadLaterToggled : noProofOfAddress;

    setContinueDisabled(disabled);
    setSameAddressToggle(sameAddress);
  }, [inputMailingAddress, inputPostCode, proofOfAddress, uploadLater]);

  return (
    <ContentPage
      continueDisabled={continueDisabled}
      handleCancel={handleButtonPress}
      handleContinue={handleSubmit}
      heading={GREETINGS}
      subheading={PROOF_OF_ADDRESS.SUBHEADING}
      subtitle={PROOF_OF_ADDRESS.TITLE}
      subtitleStyle={fs16RegBlack2}>
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh20} spaceToTop={sh40} style={fs16RegBlack2} text={PROOF_OF_ADDRESS.LABEL_PERMANENT_ADDRESS} />
        <CheckBox
          label={PROOF_OF_ADDRESS.LABEL_CHECKBOX}
          labelStyle={fs12BoldBlack2}
          onPress={handleAddressToggle}
          toggle={sameAddressToggle}
        />
        <TextSpaceArea spaceToTop={sh24} spaceToBottom={sh8} style={px(sw16)} text={PROOF_OF_ADDRESS.LABEL_MAILING_ADDRESS} />
        <TextInputArea onChangeText={setInputMailingAddress} value={inputMailingAddress} />
        <CustomTextInput label={PROOF_OF_ADDRESS.LABEL_POST_CODE} onChangeText={setInputPostCode} spaceToTop={sh24} value={inputPostCode} />
        {sameAddressToggle === true ? null : (
          <Fragment>
            <CustomSpacer space={sh32} />
            <Text style={labelStyle}>{PROOF_OF_ADDRESS.LABEL_UPLOAD_PROOF}</Text>
            <CustomSpacer space={sh16} />
            <UploadWithModal
              features={["camera", "gallery", "file"]}
              label={PROOF_OF_ADDRESS.LABEL_PROOF}
              onSuccess={handleUpload}
              setValue={setProofOfAddress}
              value={proofOfAddress}
            />
            {proofOfAddress !== undefined ? null : (
              <Fragment>
                <CustomSpacer space={sh24} />
                <CheckBox
                  label={PROOF_OF_ADDRESS.LABEL_UPLOAD_LATER}
                  labelStyle={fs12BoldBlack2}
                  onPress={handleUploadLater}
                  toggle={uploadLater}
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </View>
    </ContentPage>
  );
};
