import React, { Fragment, FunctionComponent } from "react";

import { MenuItem, MenuItemProps } from "../Touchables";

interface MenuListProps {
  items: MenuItemProps[];
}

export const MenuList: FunctionComponent<MenuListProps> = ({ items }: MenuListProps) => {
  return (
    <Fragment>
      {items.map((item: MenuItemProps, index: number) => (
        <MenuItem key={index} {...item} />
      ))}
    </Fragment>
  );
};
