import React from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import {
  centerVertical,
  colorGray,
  colorWhite,
  flexChild,
  flexRow,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs24RegBlack2,
  fullHW,
  px,
  py,
  sh24,
  sh8,
  sw16,
  sw398,
  sw40,
} from "../../styles";
import { CustomSpacer } from "../Views";
import { Step } from "./Step";

export const OnboardingSteps = ({
  activeContent,
  activeSection,
  handleContentChange,
  RenderContent,
  setActiveSection,
  setActiveContent,
  setFinishedStep,
  steps,
  visitedSections,
}: OnboardingStepsProps) => {
  const stepsContainer: ViewStyle = { width: sw398, ...px(sw40), backgroundColor: colorWhite._1 };
  const headerContainer: ViewStyle = { backgroundColor: colorWhite._1, ...py(sh8), ...flexRow, ...centerVertical };
  const contentContainer: ViewStyle = { backgroundColor: colorWhite._1 };

  const accordionHeader = (step: IAccordionContent, stepIndex: number, isActive: boolean) => {
    const currentStep = (stepIndex + 1).toString();
    const visited = visitedSections.some((visitedStep) => visitedStep === stepIndex);
    const labelOpacity = isActive || !visited ? { opacity: 1 } : { opacity: 0.5 };
    const textStyle: TextStyle = isActive ? { ...fs24RegBlack2, ...labelOpacity } : { ...fs16RegBlack2, ...labelOpacity };
    return (
      <View style={headerContainer}>
        <Step active={isActive} step={currentStep} visited={visited} />
        <CustomSpacer isHorizontal={true} space={sw16} />
        <Text style={textStyle}>{step.label}</Text>
      </View>
    );
  };

  const accordionContent = (step: IAccordionContent) => {
    const activeContainer: ViewStyle = { ...contentContainer };
    if (step.content === undefined) {
      return <View />;
    }

    return (
      <View style={activeContainer}>
        {step.content.map((item: IContentItem, index: number) => {
          const handleNavigateToContent = () => {
            handleContentChange(item);
          };
          const activeTitle = activeContent !== undefined && "title" in activeContent ? activeContent.title : "";
          const textStyle: TextStyle = item.title === activeTitle ? fs16BoldBlack2 : fs16RegBlack2;
          return (
            <View key={index} style={{ ...py(sh8), ...px(sw40) }}>
              <Text onPress={handleNavigateToContent} key={index} style={textStyle}>
                {item.title}
              </Text>
            </View>
          );
        })}
        <CustomSpacer space={sh24} />
      </View>
    );
  };

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

  const handleNextStep = (nextRoute: string) => {
    let newIndex: number = 0;
    const parentRoute = steps.filter((item: IAccordionContent, index: number) => {
      if (item.route === nextRoute) {
        newIndex = index;
      }
      return item.route === nextRoute;
    });

    const childRoute = steps.map((item: IAccordionContent) => {
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

    //  TODO handle finished steps
    setFinishedStep([]);
  };

  const pageContainer: ViewStyle = { ...flexChild, backgroundColor: colorGray._1 };
  const container: ViewStyle = { ...fullHW, ...flexRow, backgroundColor: colorWhite._1 };
  return (
    <View style={container}>
      <View style={stepsContainer}>
        <Accordion
          activeSections={[activeSection]}
          duration={400}
          onChange={setSections}
          renderContent={accordionContent}
          renderHeader={accordionHeader}
          sections={steps}
          touchableComponent={TouchableWithoutFeedback}
        />
      </View>
      <View style={pageContainer}>
        <RenderContent handleNextStep={handleNextStep} />
      </View>
    </View>
  );
};
