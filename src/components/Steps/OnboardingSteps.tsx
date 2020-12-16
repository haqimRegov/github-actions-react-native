import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import {
  borderBottomGray4,
  colorBlue,
  colorTransparent,
  colorWhite,
  flexRow,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs14BoldBlack2,
  fs14RegBlack2,
  fs14RegGray7,
  fullHW,
  px,
  py,
  sh16,
  sh20,
  sh32,
  sw112,
  sw120,
  sw200,
  sw24,
  sw40,
  sw8,
} from "../../styles";
import { SideMenu } from "../Nav";
import { IconText } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer } from "../Views";
import { Step } from "./Step";

export const OnboardingSteps: FunctionComponent<OnboardingStepsProps> = ({
  activeContent,
  activeSection,
  disableNextSteps,
  handleContentChange,
  handleBackToDashboard,
  RenderContent,
  setActiveContent,
  setActiveSection,
  steps,
  finishedSteps,
}: OnboardingStepsProps) => {
  const setSections = (sections: number[]) => {
    if (sections.length > 0) {
      const sectionIndex = sections[0];
      const selectedSection = steps[sectionIndex];
      setActiveSection(sectionIndex);
      if (selectedSection.route !== undefined) {
        handleContentChange(steps[sectionIndex]);
      }
    }
  };

  const accordionHeader = (step: IOnboarding, stepIndex: number, isActive: boolean) => {
    const visited = finishedSteps !== undefined ? finishedSteps.some((visitedStep) => visitedStep === step.key) : false;
    const currentStep = (stepIndex + 1).toString();
    const activeTextStyle: TextStyle = step.content !== undefined ? fs14RegBlack2 : fs14BoldBlack2;
    const textStyle: TextStyle = isActive ? { ...activeTextStyle, width: sw120 } : { ...fs14RegGray7, width: sw120 };

    const handleChange = () => {
      if (finishedSteps!.indexOf(step.route!) !== -1) {
        setSections([stepIndex]);
      }
    };

    const pointerEvents = disableNextSteps === true ? undefined : "none";

    return (
      <Fragment>
        {stepIndex === 0 ? null : <CustomSpacer space={sh32} />}
        <TouchableWithoutFeedback onPress={handleChange}>
          <View pointerEvents={pointerEvents} style={flexRow}>
            <Step active={isActive} step={currentStep} visited={visited} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={textStyle}>{step.label}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Fragment>
    );
  };

  const accordionContent = (step: IOnboarding) => {
    const activeContainer: ViewStyle = { backgroundColor: colorWhite._1 };
    if (step.content === undefined) {
      return <View />;
    }

    return (
      <View style={flexRow}>
        <CustomSpacer isHorizontal={true} space={sw40} />
        <View style={activeContainer}>
          {step.content.map((item: IContentItem, index: number) => {
            const handleNavigateToContent = () => {
              handleContentChange(item);
            };
            const activeTitle = activeContent !== undefined && "title" in activeContent ? activeContent.title : "";
            const textStyle: TextStyle = item.title === activeTitle ? fs12BoldBlack2 : fs12RegBlack2;
            const onPress = disableNextSteps === true ? undefined : handleNavigateToContent;

            return (
              <TouchableWithoutFeedback key={index} onPress={onPress}>
                <View style={{ width: sw112 }}>
                  <CustomSpacer space={sh16} />
                  <Text style={{ ...textStyle, lineHeight: sh16 }}>{item.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    );
  };

  const handleNextStep = (nextRoute: string) => {
    let newIndex: number = 0;
    const parentRoute = steps.filter((item: IOnboarding, index: number) => {
      if (item.route === nextRoute) {
        newIndex = index;
      }
      return item.route === nextRoute;
    });

    const childRoute = steps.map((item: IOnboarding) => {
      if (item.content !== undefined) {
        return item.content.filter((contentItem: IContentItem) => {
          const newChildRoute = contentItem.route === nextRoute ? contentItem.route : "";
          return newChildRoute;
        });
      }
      return [];
    });
    const singleChildRoute = childRoute.filter((content: IContentItem[], index: number) => {
      if (content.length !== 0) {
        newIndex = index;
      }
      return content.length !== 0;
    });

    // TODO null pointer exception
    const singleChild = singleChildRoute[0] !== undefined ? singleChildRoute[0] : [];
    const newRoute = parentRoute.length !== 0 ? parentRoute[0] : singleChild[0];

    setActiveSection(newIndex);
    setActiveContent(newRoute);
  };

  const touchablePress = disableNextSteps === true ? { onPress: undefined } : {};

  return (
    <View style={{ ...flexRow, ...fullHW }}>
      <SideMenu spaceToBottom={0}>
        <View style={px(sw24)}>
          <Accordion
            activeSections={[activeSection]}
            duration={300}
            onChange={setSections}
            renderContent={accordionContent}
            renderHeader={accordionHeader}
            sections={steps}
            touchableProps={{ underlayColor: colorTransparent, ...touchablePress }}
          />
        </View>
        <CustomFlexSpacer />
        <View style={borderBottomGray4} />
        <View style={{ ...px(sw24), ...py(sh20) }}>
          <IconText
            color={colorBlue._2}
            name="arrow-left"
            onPress={handleBackToDashboard}
            iconSize={sw24}
            text="Back to Dashboard"
            textStyle={fs12RegBlack2}
          />
        </View>
      </SideMenu>
      <CustomSpacer isHorizontal={true} space={sw200} />
      <RenderContent handleNextStep={handleNextStep} />
    </View>
  );
};
