import React, { Fragment, FunctionComponent } from "react";

import { MenuItem, MenuItemProps } from "../Touchables";

interface MenuListProps {
  activeIndex?: number;
  items: MenuItemProps[];
}

export const MenuList: FunctionComponent<MenuListProps> = ({ activeIndex, items }: MenuListProps) => {
  return (
    <Fragment>
      {items.map((item: MenuItemProps, index: number) => (
        <MenuItem active={activeIndex === index} key={index} {...item} />
      ))}
    </Fragment>
  );
};
