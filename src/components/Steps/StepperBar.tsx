import React, { forwardRef, Fragment, MutableRefObject, ReactElement, Ref, useImperativeHandle } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import { IcoMoon } from "../../icons";
import {
  borderBottomGray2,
  circle,
  colorBlue,
  colorRed,
  colorTransparent,
  colorWhite,
  disabledOpacity6,
  flexRow,
  fs12BoldBlue1,
  fs12BoldGray6,
  fs12RegGray4,
  fs12RegGray6,
  fs14BoldGray6,
  fs14RegGray4,
  px,
  py,
  rowCenterVertical,
  sh16,
  sh20,
  sh24,
  sh32,
  sh8,
  sw112,
  sw124,
  sw16,
  sw2,
  sw20,
  sw200,
  sw24,
  sw4,
  sw8,
  zIndexTop,
} from "../../styles";
import { SideMenu } from "../Nav";
import { IconText } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer } from "../Views";
import { Step } from "./Step";

interface StepperBarProps<TKeys> {
  activeContent?: IStepperBarContentItem<TKeys> | IStep<TKeys>;
  activeSection: number;
  activeStepHeaderTextStyle?: TextStyle;
  disabledSteps?: TKeys[];
  disableNextSteps?: boolean;
  editMode?: boolean;
  finishedSteps?: TKeys[];
  handleBackToDashboard: () => void;
  handleContentChange: (item: IStepperBarContentItem<TKeys> | IStep<TKeys>) => void;
  handleCheckRoute?: (route: IStep<TKeys>, index: number) => boolean;
  setActiveContent: (content: IStepperBarContentItem<TKeys> | IStep<TKeys>) => void;
  setActiveSection: (section: number) => void;
  setFinishedStep: (step: TKeys[]) => void;
  steps: IStep<TKeys>[];
}

const StepperBarBase = <TKeys extends string>(props: StepperBarProps<TKeys>, ref: Ref<IStepperBarRef<TKeys>>) => {
  const {
    activeStepHeaderTextStyle,
    activeContent,
    activeSection,
    disabledSteps,
    disableNextSteps,
    editMode,
    finishedSteps,
    handleBackToDashboard,
    handleCheckRoute,
    handleContentChange,
    setActiveContent,
    setActiveSection,
    steps,
  } = props;

  const setSections = (sections: number[]) => {
    if (sections.length > 0) {
      const sectionIndex = sections[0];
      const selectedSection = steps[sectionIndex];
      const checkRoute = handleCheckRoute !== undefined ? handleCheckRoute(selectedSection, sectionIndex) : true;
      if (checkRoute === true) {
        setActiveSection(sectionIndex);
        if (selectedSection.route !== undefined) {
          handleContentChange(steps[sectionIndex]);
        }
      }
    }
  };

  const accordionHeader = (step: IStep<TKeys>, stepIndex: number, isActive: boolean) => {
    const visited = finishedSteps !== undefined ? finishedSteps.some((visitedStep) => visitedStep === step.key) : false;
    const currentStep = (stepIndex + 1).toString();
    const activeTextStyle: TextStyle = fs14BoldGray6;
    const textStyle: TextStyle = isActive ? { ...activeTextStyle, ...activeStepHeaderTextStyle } : { ...fs14RegGray4, ...disabledOpacity6 };

    const handleChange = () => {
      if (editMode === false) {
        if (disabledSteps !== undefined && disabledSteps.includes(step.key) === false) {
          setSections([stepIndex]);
        }
      }
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
              <Text style={{ ...textStyle, lineHeight: sh24, width: sw124 }}>{step.label}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const accordionContent = (step: IStep<TKeys>) => {
    const activeContainer: ViewStyle = { backgroundColor: colorWhite._1 };
    if (step.content === undefined) {
      return <View />;
    }

    return (
      <View style={flexRow}>
        <CustomSpacer isHorizontal={true} space={sw20} />
        <View style={activeContainer}>
          {step.content.map((item: IStepperBarContentItem<TKeys>, index: number) => {
            const handleNavigateToContent = () => {
              handleContentChange(item);
            };
            const activeKey = activeContent !== undefined && "key" in activeContent ? activeContent.key : "";
            const disabledContent = disabledSteps !== undefined && disabledSteps.includes(item.key) === true;
            const defaultTextStyle = disabledContent === true ? fs12RegGray4 : fs12RegGray6;
            const textStyle: TextStyle = item.key === activeKey ? fs12BoldGray6 : defaultTextStyle;
            const onPress = disabledContent === true ? undefined : handleNavigateToContent;
            const isFinished = finishedSteps !== undefined && finishedSteps.some((visitedStep) => visitedStep === item.key);

            return (
              <TouchableWithoutFeedback key={index} onPress={onPress}>
                <View style={{ width: sw112 }}>
                  <CustomSpacer space={sh16} />
                  <View style={rowCenterVertical}>
                    {item.key === activeKey ? (
                      <Fragment>
                        <CustomSpacer isHorizontal={true} space={sw2} />
                        <View style={{ width: sw8 }}>
                          <View style={circle(sw4, colorRed._1)} />
                        </View>
                        <CustomSpacer isHorizontal={true} space={sw2} />
                      </Fragment>
                    ) : (
                      <Fragment>
                        <View style={{ width: sw8 }}>
                          {isFinished === true ? <IcoMoon color={textStyle.color} name="check" size={sh8} /> : null}
                        </View>
                        <CustomSpacer isHorizontal={true} space={sw4} />
                      </Fragment>
                    )}
                    <Text style={textStyle}>{item.title}</Text>
                  </View>
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
    const parentRoute = steps.filter((item: IStep<TKeys>, index: number) => {
      if (item.route === nextRoute) {
        newIndex = index;
      }
      return item.route === nextRoute;
    });

    const childRoute = steps.map((item: IStep<TKeys>) => {
      if (item.content !== undefined) {
        return item.content.filter((contentItem: IStepperBarContentItem<TKeys>) => {
          const newChildRoute = contentItem.route === nextRoute ? contentItem.route : "";
          return newChildRoute;
        });
      }
      return [];
    });
    const singleChildRoute = childRoute.filter((content: IStepperBarContentItem<TKeys>[], index: number) => {
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

  useImperativeHandle(ref, () => ({ handleNextStep }));

  return (
    <View style={{ ...flexRow, ...zIndexTop }}>
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
          <IconText
            color={colorBlue._1}
            name="arrow-left"
            onPress={handleBackToDashboard}
            iconSize={sw16}
            text="Back to Dashboard"
            textStyle={fs12BoldBlue1}
          />
        </View>
      </SideMenu>
      <CustomSpacer isHorizontal={true} space={sw200} />
    </View>
  );
};

export const StepperBar = forwardRef(StepperBarBase) as <TKeys extends string>(
  props: StepperBarProps<TKeys> & { ref: MutableRefObject<IStepperBarRef<TKeys> | undefined> },
) => ReactElement;
