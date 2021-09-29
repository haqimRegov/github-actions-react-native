import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { AdvanceTextInputArea, AdvanceToggleButton, CheckBox, CustomSpacer, ToggleButton, UploadWithModal } from "../../../../components";
import { Language } from "../../../../constants";
import { OPTIONS_FATCA_NO_CERTIFICATE } from "../../../../data/dictionary";
import { flexRow, fs12BoldBlack2, fs16SemiBoldBlack2, sh16, sh20, sh32, sh40, sh8, sw200 } from "../../../../styles";
import { FatcaAddress, FatcaAddressProps } from "./AddressConfirmation";

const { DECLARATIONS } = Language.PAGE;

interface FatcaUSBornProps extends FatcaAddressProps {
  handleSave: (value: boolean) => void;
  certificate: FileBase64 | undefined;
  noCertificate: boolean;
  explanation: string;
  explanationSaved: boolean;
  reason: TypeAdvanceToggleButtonValue;
  setCertificate: (value: FileBase64 | undefined) => void;
  setNoCertificate: (value: boolean) => void;
  setExplanation: (value: string) => void;
  setReason: (value: TypeAdvanceToggleButtonValue) => void;
  setUsBorn: (value: TypeToggleButtonValue) => void;
  usBorn: TypeToggleButtonValue;
  uploadNoLostYes: boolean;
  uploadNoLostNo: boolean;
}

export const FatcaUSBorn: FunctionComponent<FatcaUSBornProps> = ({
  handleSave,
  certificate,
  noCertificate,
  explanation,
  explanationSaved,
  reason,
  setCertificate,
  setNoCertificate,
  setExplanation,
  setReason,
  setUsBorn,
  usBorn,
  uploadNoLostNo,
  uploadNoLostYes,
  ...addressProps
}: FatcaUSBornProps) => {
  const handleNoCertificate = () => {
    setNoCertificate(!noCertificate);
  };

  return (
    <Fragment>
      <CustomSpacer space={sh32} />
      <Text style={fs16SemiBoldBlack2}>{DECLARATIONS.BORN_US}</Text>
      <CustomSpacer space={sh8} />
      <ToggleButton value={usBorn} onSelect={setUsBorn} />
      {usBorn === 0 ? (
        <Fragment>
          <CustomSpacer space={sh32} />
          <Text style={fs12BoldBlack2}>{DECLARATIONS.UPLOAD}</Text>
          <CustomSpacer space={sh16} />
          <UploadWithModal
            features={["camera", "file", "gallery"]}
            label={DECLARATIONS.LABEL_LOSS}
            value={certificate}
            setValue={setCertificate}
            onSuccess={setCertificate}
          />
          <CustomSpacer space={sh32} />
          {certificate !== undefined ? null : (
            <CheckBox toggle={noCertificate} onPress={handleNoCertificate} label={DECLARATIONS.LABEL_CANT} />
          )}
          {noCertificate ? (
            <Fragment>
              <CustomSpacer space={sh40} />
              <Text style={fs12BoldBlack2}>{DECLARATIONS.LABEL_CANT_CONFIRM}</Text>
              <Text style={fs12BoldBlack2}>{DECLARATIONS.LABEL_REASON}</Text>
              <CustomSpacer space={sh8} />
              <AdvanceToggleButton labels={OPTIONS_FATCA_NO_CERTIFICATE} onSelect={setReason} value={reason} />
              {reason === 1 ? (
                <View style={flexRow}>
                  <CustomSpacer isHorizontal={true} space={sw200} />
                  <View>
                    <CustomSpacer space={sh20} />
                    <AdvanceTextInputArea
                      handleContinue={setExplanation}
                      handleSave={handleSave}
                      placeholder={DECLARATIONS.PLACEHOLDER}
                      saved={explanationSaved}
                      value={explanation}
                    />
                    <CustomSpacer space={sh32} />
                  </View>
                </View>
              ) : null}
              {reason === 0 ? <CustomSpacer space={sh40} /> : null}
            </Fragment>
          ) : null}
          {certificate !== undefined || uploadNoLostYes || uploadNoLostNo ? (
            <Fragment>
              <FatcaAddress {...addressProps} />
            </Fragment>
          ) : null}
        </Fragment>
      ) : null}
    </Fragment>
  );
};
