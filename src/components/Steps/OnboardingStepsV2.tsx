import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import {
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlack6,
  fs12RegBlack6,
  fs14RegularBlack6,
  sh16,
  sh24,
  sh40,
  sw104,
  sw120,
  sw40,
  sw8,
} from "../../styles";
import { SideMenuV2 } from "../Nav";
import { CustomSpacer } from "../Views";
import { Step } from "./Step";

export const OnboardingStepsV2 = ({
  activeContent,
  activeSection,
  handleContentChange,
  RenderContent,
  setActiveContent,
  setActiveSection,
  setFinishedStep,
  steps,
  visitedSections,
}: OnboardingStepsV2Props) => {
  const accordionHeader = (step: IOnboarding, stepIndex: number, isActive: boolean) => {
    const visited = visitedSections.some((visitedStep) => visitedStep === stepIndex);
    const currentStep = (stepIndex + 1).toString();

    const labelOpacity = isActive || !visited ? { opacity: 1 } : { opacity: 0.5 };
    const textStyle: TextStyle = isActive
      ? { ...fs14RegularBlack6, width: sw120, ...labelOpacity }
      : { ...fs14RegularBlack6, width: sw120, ...labelOpacity };

    return (
      <View>
        <View style={flexRow}>
          <Step active={isActive} step={currentStep} visited={visited} />
          <CustomSpacer isHorizontal={true} space={sw8} />
          <Text style={textStyle}>{step.label}</Text>
        </View>
        <CustomSpacer space={sh40} />
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
            const textStyle: TextStyle = item.title === activeTitle ? fs12BoldBlack6 : fs12RegBlack6;
            return (
              <View key={index} style={{ width: sw104 }}>
                <Text onPress={handleNavigateToContent} key={index} style={textStyle}>
                  {item.title}
                </Text>
                <CustomSpacer space={sh16} />
              </View>
            );
          })}
          <CustomSpacer space={sh24} />
        </View>
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
      <SideMenuV2>
        <Accordion
          activeSections={[activeSection]}
          duration={400}
          onChange={setSections}
          renderContent={accordionContent}
          renderHeader={accordionHeader}
          sections={steps}
          touchableProps={{ underlayColor: colorTransparent }}
        />
      </SideMenuV2>
      <View style={flexChild}>
        <RenderContent handleNextStep={handleNextStep} />
      </View>
    </View>
  );
};