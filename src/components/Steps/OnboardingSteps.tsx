import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import {
  borderBottomGray2,
  colorTransparent,
  colorWhite,
  disabledOpacity6,
  flexRow,
  fs12BoldGray6,
  fs12RegGray4,
  fs12RegGray6,
  fs14BoldGray6,
  fs14RegGray4,
  fs14RegGray6,
  fullHW,
  px,
  py,
  sh16,
  sh20,
  sh24,
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
  disabledSteps,
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
    const activeTextStyle: TextStyle = step.content !== undefined ? fs14RegGray6 : fs14BoldGray6;
    const textStyle: TextStyle = isActive ? activeTextStyle : { ...fs14RegGray4, ...disabledOpacity6 };

    const handleChange = () => {
      if (disabledSteps !== undefined && disabledSteps.includes(step.key) === true) {
        return null;
      }
      if (finishedSteps !== undefined && finishedSteps.indexOf(step.key) !== -1) {
        return setSections([stepIndex]);
      }
      return null;
    };

    const pointerEvents =
      disableNextSteps === true || (disabledSteps !== undefined && disabledSteps.includes(step.key) === true) ? undefined : "none";

    return (
      <View>
        <TouchableWithoutFeedback onPress={handleChange}>
          <View pointerEvents={pointerEvents}>
            {stepIndex === 0 ? null : <CustomSpacer space={sh32} />}
            <View style={flexRow}>
              <Step active={isActive} step={currentStep} visited={visited} />
              <CustomSpacer isHorizontal={true} space={sw8} />
              <Text style={{ ...textStyle, lineHeight: sh24, width: sw120 }}>{step.label}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
            const activeKey = activeContent !== undefined && "title" in activeContent ? activeContent.key : "";
            const disabledContent = disabledSteps !== undefined && disabledSteps.includes(item.key) === true;
            const defaultTextStyle = disabledContent === true ? fs12RegGray4 : fs12RegGray6;
            const textStyle: TextStyle = item.key === activeKey ? fs12BoldGray6 : defaultTextStyle;
            const onPress = disabledContent === true ? undefined : handleNavigateToContent;

            return (
              <TouchableWithoutFeedback key={index} onPress={onPress}>
                <View style={{ width: sw112 }}>
                  <CustomSpacer space={sh16} />
                  <Text style={textStyle}>{item.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    );
  };

  const handleNextStep = (nextRoute: string) => {
    let newIndex = 0;
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
        <View style={borderBottomGray2} />
        <View style={{ ...px(sw24), ...py(sh20) }}>
          <IconText name="arrow-left" onPress={handleBackToDashboard} iconSize={sw24} text="Back to Dashboard" textStyle={fs12RegGray6} />
        </View>
      </SideMenu>
      <CustomSpacer isHorizontal={true} space={sw200} />
      <RenderContent handleNextStep={handleNextStep} />
    </View>
  );
};
