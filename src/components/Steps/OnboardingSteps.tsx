import React from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import {
  colorTransparent,
  colorWhite,
  flexRow,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs14RegBlack2,
  fullHW,
  px,
  sh16,
  sh40,
  sw112,
  sw120,
  sw200,
  sw24,
  sw40,
  sw8,
} from "../../styles";
import { SideMenu } from "../Nav";
import { CustomSpacer } from "../Views";
import { Step } from "./Step";

export const OnboardingSteps = ({
  activeContent,
  activeSection,
  disableNextSteps,
  handleContentChange,
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
    const visited = finishedSteps !== undefined ? finishedSteps.some((visitedStep) => visitedStep === step.route) : false;
    const currentStep = (stepIndex + 1).toString();

    const labelOpacity = isActive || !visited ? { opacity: 1 } : { opacity: 0.5 };
    const textStyle: TextStyle = isActive
      ? { ...fs14RegBlack2, width: sw120, ...labelOpacity }
      : { ...fs14RegBlack2, width: sw120, ...labelOpacity };

    const handleChange = () => {
      if (finishedSteps!.indexOf(step.route!) !== -1) {
        setSections([stepIndex]);
      }
    };

    const pointerEvents = disableNextSteps === true ? undefined : "none";

    return (
      <View>
        <CustomSpacer space={sh40} />
        <TouchableWithoutFeedback onPress={handleChange}>
          <View pointerEvents={pointerEvents} style={flexRow}>
            <Step active={isActive} step={currentStep} visited={visited} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={textStyle}>{step.label}</Text>
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
      <SideMenu>
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
      </SideMenu>
      <CustomSpacer isHorizontal={true} space={sw200} />
      <RenderContent handleNextStep={handleNextStep} />
    </View>
  );
};
