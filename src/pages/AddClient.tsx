import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useState } from "react";
import { Image, ImageStyle, ScrollView, Text, View } from "react-native";
import { Image as ImageCropType } from "react-native-image-crop-picker";

import { LocalAssets } from "../assets/LocalAssets";
import {
  ConfirmationModal,
  CustomSpacer,
  CustomTextInput,
  LabeledTitle,
  RadioButtonGroup,
  RoundedButton,
  SafeAreaPage,
} from "../components";
import { UploadPhoto } from "../components/Photo";
import { Language } from "../constants";
import { imageOpenCamera, imageOpenPicker } from "../integrations/react-native-image-crop-picker";
import { SAMPLE_CLIENT } from "../mocks";
import {
  centerHV,
  colorGray,
  flexChild,
  flexRow,
  fs12SemiBoldBlack2,
  fs16SemiBoldBlack4,
  fs18SemiBoldBlack2,
  fs24RegBlack2,
  fs36SemiBoldBlack2,
  fullWidth,
  px,
  sh10,
  sh12,
  sh16,
  sh20,
  sh24,
  sh30,
  sh60,
  sh8,
  sh92,
  sw12,
  sw126,
  sw205,
  sw36,
  sw372,
  sw56,
  sw96,
} from "../styles";
import { RequestActionButton, RequestActionUtil } from "../utils";

interface PageProps {
  navigation: StackNavigationProp<RootNavigatorType>;
}

const { ADD_CLIENT } = Language.PAGE;

export const AddClientPage = ({ navigation }: PageProps) => {
  const [radioId, setRadioId] = useState<string>(ADD_CLIENT.NRIC);
  const [uploadImage, setUploadImage] = useState<FileBase64 | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleHideModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    handleHideModal();
    navigation.navigate("RiskAppetite");
  };

  // eslint-disable-next-line consistent-return
  const handleImageResult = (results: ImageCropType | ImageCropType[]) => {
    if (!Array.isArray(results)) {
      const { data, filename, size, mime, creationDate, path } = results;
      const selectedImage: FileBase64 = { base64: data || "", name: filename, size, type: mime, date: creationDate, path };
      handleShowModal();
      return setUploadImage(selectedImage);
    }
  };

  const handleOpenCamera = () => {
    imageOpenCamera(handleImageResult);
  };

  const handleOpenPicker = () => {
    imageOpenPicker(handleImageResult);
  };

  const handleAddMedia = () => {
    const takePhoto: RequestActionButton = { onPress: handleOpenCamera, text: "Take a Photo" };
    const choosePhoto: RequestActionButton = { onPress: handleOpenPicker, text: "Photo Library" };
    const buttons = [takePhoto, choosePhoto];
    RequestActionUtil({
      title: "Upload your ID",
      buttons: buttons,
    });
  };

  const labeledTitleProps = { labelStyle: fs12SemiBoldBlack2, titleStyle: fs16SemiBoldBlack4 };
  const logoStyle: ImageStyle = { height: sh60, resizeMode: "contain", width: sw126 };

  return (
    <Fragment>
      <SafeAreaPage>
        <ScrollView bounces={false}>
          <View style={{ ...flexChild, backgroundColor: colorGray._3 }}>
            <CustomSpacer space={sh12} />
            <View style={px(sw36)}>
              <Image source={LocalAssets.logo.kenanga} style={logoStyle} />
            </View>
            <CustomSpacer space={sh92} />
            <View style={{ ...flexRow, ...px(sw96) }}>
              <View>
                <Text style={fs36SemiBoldBlack2}>{ADD_CLIENT.HEADING}</Text>
                <Text style={fs24RegBlack2}>{ADD_CLIENT.SUBHEADING}</Text>
                <CustomSpacer space={sh24} />
                <View style={px(sw12)}>
                  <Text style={fs12SemiBoldBlack2}>{ADD_CLIENT.LABEL_ID_TYPE}</Text>
                  <CustomSpacer space={sh8} />
                  <RadioButtonGroup
                    direction="row"
                    labels={[ADD_CLIENT.NRIC, ADD_CLIENT.PASSPORT]}
                    selected={radioId}
                    setSelected={setRadioId}
                    space={sw56}
                  />
                </View>
                <CustomSpacer space={sh16} />
                <CustomTextInput
                  label={ADD_CLIENT.LABEL_NAME}
                  labelStyle={fs12SemiBoldBlack2}
                  onChangeText={undefined}
                  spaceToLabel={sh10}
                />
                <CustomSpacer space={sh20} />
                <CustomTextInput
                  label={ADD_CLIENT.LABEL_NRIC}
                  labelStyle={fs12SemiBoldBlack2}
                  onChangeText={undefined}
                  spaceToLabel={sh10}
                />
                <CustomSpacer space={sh30} />
                <RoundedButton buttonStyle={fullWidth} onPress={handleShowModal} text={ADD_CLIENT.BUTTON_STARTED} />
              </View>
              <View style={{ ...centerHV, ...flexChild, ...flexRow }}>
                <Text style={fs18SemiBoldBlack2}>{ADD_CLIENT.OR}</Text>
              </View>
              <UploadPhoto
                data={uploadImage}
                guidelines={ADD_CLIENT.UPLOAD_DOCUMENT_GUIDE}
                label={ADD_CLIENT.LABEL_UPLOAD}
                onPress={handleAddMedia}
                subtitle={ADD_CLIENT.UPLOAD_DOCUMENT_HINT}
                title={ADD_CLIENT.UPLOAD_DOCUMENT}
              />
            </View>
            <CustomSpacer space={sh16} />
          </View>
        </ScrollView>
      </SafeAreaPage>
      <ConfirmationModal
        buttons={[
          { onPress: handleAddMedia, text: ADD_CLIENT.DETAILS_BUTTON_RE_UPLOAD, secondary: true, buttonStyle: { width: sw205 } },
          { onPress: handleConfirm, text: ADD_CLIENT.DETAILS_BUTTON_CONFIRM, buttonStyle: { width: sw205 } },
        ]}
        handleClose={handleHideModal}
        title={ADD_CLIENT.DETAILS_TITLE}
        visible={modalVisible}>
        <Fragment>
          <LabeledTitle {...labeledTitleProps} label={ADD_CLIENT.DETAILS_NAME} spaceToBottom={sh24} title={SAMPLE_CLIENT.name} />
          <LabeledTitle {...labeledTitleProps} label={ADD_CLIENT.DETAILS_LABEL_ID} spaceToBottom={sh24} title={SAMPLE_CLIENT.id} />
          <LabeledTitle {...labeledTitleProps} label={ADD_CLIENT.DETAILS_LABEL_GENDER} spaceToBottom={sh24} title={SAMPLE_CLIENT.gender} />
          <LabeledTitle
            label={ADD_CLIENT.DETAILS_LABEL_DOB}
            spaceToBottom={sh24}
            title={SAMPLE_CLIENT.dateOfBirth}
            {...labeledTitleProps}
          />
          <LabeledTitle
            label={ADD_CLIENT.DETAILS_LABEL_ADDRESS}
            spaceToBottom={sh24}
            title={SAMPLE_CLIENT.address}
            titleStyle={{ ...fs16SemiBoldBlack4, width: sw372 }}
            labelStyle={fs12SemiBoldBlack2}
          />
        </Fragment>
      </ConfirmationModal>
    </Fragment>
  );
};
