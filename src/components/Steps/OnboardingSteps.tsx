import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import {
  centerVertical,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs16RegBlack2,
  fs24RegBlack2,
  px,
  py,
  sh24,
  sh49,
  sh8,
  sw16,
  sw40,
} from "../../styles";
import { SideMenu } from "../Nav";
import { CustomSpacer } from "../Views";
import { Step } from "./Step";

export const OnboardingSteps = ({
  activeContent,
  activeSection,
  collapse,
  handleContentChange,
  onPressBackdrop,
  onPressExpand,
  overlay,
  RenderContent,
  setActiveContent,
  setActiveSection,
  setFinishedStep,
  steps,
  visitedSections,
}: OnboardingStepsProps) => {
  const accordionHeader = (step: IOnboarding, stepIndex: number, isActive: boolean) => {
    const visited = visitedSections.some((visitedStep) => visitedStep === stepIndex);
    const currentStep = (stepIndex + 1).toString();

    const stepStyle: ViewStyle = collapse === true && isActive === true ? { height: sh49 } : {};
    const headerContainer: ViewStyle = { ...centerVertical, ...flexRow, ...py(sh8), backgroundColor: colorWhite._1, ...stepStyle };
    const labelOpacity = isActive || !visited ? { opacity: 1 } : { opacity: 0.5 };
    const textStyle: TextStyle = isActive ? { ...fs24RegBlack2, ...labelOpacity } : { ...fs16RegBlack2, ...labelOpacity };

    return (
      <View style={headerContainer}>
        <Step active={isActive} step={currentStep} visited={visited} />
        <CustomSpacer isHorizontal={true} space={sw16} />
        {collapse === true ? null : <Text style={textStyle}>{step.label}</Text>}
      </View>
    );
  };

  const accordionContent = (step: IOnboarding) => {
    const activeContainer: ViewStyle = { backgroundColor: colorWhite._1 };
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
          const textStyle: TextStyle = item.title === activeTitle ? fs12BoldBlack2 : fs16RegBlack2;
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

    //  TODO handle finished steps
    setFinishedStep([]);
  };

  return (
    <View style={flexRow}>
      <SideMenu collapse={collapse} onPressBackdrop={onPressBackdrop} onPressExpand={onPressExpand} overlay={overlay}>
        <Accordion
          activeSections={[activeSection]}
          duration={400}
          onChange={setSections}
          renderContent={accordionContent}
          renderHeader={accordionHeader}
          sections={steps}
          touchableProps={{ underlayColor: colorTransparent }}
        />
      </SideMenu>
      <View style={flexChild}>
        <RenderContent handleNextStep={handleNextStep} />
      </View>
    </View>
  );
};
