import React, { Fragment, useState } from "react";
import { View, ViewStyle } from "react-native";
import { Menu, Position } from "react-native-enhanced-popup-menu";

interface MenuContentProps {
  hide: () => void;
}

interface MenuButtonProps {
  show: () => void;
}

interface ElementToStickProps extends MenuButtonProps {
  RenderChildren: (props: MenuButtonProps) => JSX.Element;
  style?: ViewStyle;
}

interface MenuPopupProps {
  RenderButton: (props: MenuButtonProps) => JSX.Element;
  RenderContent: (props: MenuContentProps) => JSX.Element;
}

const ElementToStick = React.forwardRef<View, ElementToStickProps>(({ RenderChildren, show }, ref) => {
  return (
    <View ref={ref}>
      <RenderChildren show={show} />
    </View>
  );
});

export const MenuPopup = ({ RenderButton, RenderContent }: MenuPopupProps) => {
  const [menuRef, setMenuRef] = useState<Menu | null>(null);
  const [elementRef, setElementRef] = useState<View | null>(null);

  const hideMenu = () => {
    if (menuRef !== null) {
      menuRef.hide();
    }
  };

  const showMenu = () => {
    if (menuRef !== null && elementRef !== null) {
      menuRef.show(elementRef, Position.BOTTOM_CENTER);
    }
  };

  return (
    <Fragment>
      <ElementToStick show={showMenu} ref={setElementRef} RenderChildren={() => <RenderButton show={showMenu} />} />
      <Menu ref={setMenuRef}>
        <RenderContent hide={hideMenu} />
      </Menu>
    </Fragment>
  );
};
